import { getState, patchState, withState, signalStore, withComputed, withHooks, withMethods } from "@ngrx/signals";
import { ApiRestService } from "../core/services/api-rest.service";
import { computed, inject, signal } from "@angular/core";
import { forkJoin, pipe, switchMap } from "rxjs";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";
import { Character } from "../model/character.model";
import { PageEvent } from "@angular/material/paginator";

interface PaginationResponse {
  length?: number;
  size?: number;
  page?: number;
}


interface CharacterState {
  characters: Character[];
  isLoading: boolean;
  filter: "Todos" | "Male" | "Female" | "unknown";
  searchTerm: string;
  paginationCharacters: PaginationResponse
  totales: {
    species: [{name: string, count: number}];
    types: [{name: string, count: number}];
  }
};

const initialState: CharacterState = {
  characters: [],
  isLoading: false,
  filter: "Todos",
  searchTerm: "",
  paginationCharacters: {
    length: 0,
    size: 20,
    page: 0
  },
  totales: {
    species: [{name: 'Sin especie', count: 0}],
    types: [{name: 'Sin tipo', count: 0}],
  }
};

//Estado inicial

export const CharacterStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withComputed( (store) => ({
    selectedCharacter: signal<Character | null>(null),
    selectedFavoriteCharacter: signal<Character | null>(null),
    isLoading: signal<boolean>(false),
    pagination: computed(() => {
      return store.paginationCharacters() ?? { length: 0, size: 10, page: 0 } ;
    }),

    filteredCharecters: computed(() => {
      const allCharacters = store.characters();
      const filter = store.filter();
      const search = store.searchTerm().toLowerCase();

      const filtered = allCharacters.filter((char) => {
        const matchesSearch = char.name.toLowerCase().includes(search);
        const matchesFilter = filter === "Todos" || char.gender === filter;
        return matchesSearch && matchesFilter;
      });

      return filtered;
    })
  })
  ),
  withMethods(
    (
      store, 
      apiRestService = inject(ApiRestService)
    ) => ({
      stateSnapshot: computed(() => getState(store)),
    
      loadCharacter: rxMethod(
        pipe(
          switchMap((page: number) => {
            patchState(store, { isLoading: true });
            const pageNew = page + 1;
            return apiRestService.getCharacters((pageNew)).pipe(
              tapResponse({
                next: (res: any) => {
                  const allCharacters = res.results;
                  const speciesIds:any = [...new Set(allCharacters.map((c:any) => c.species))];
                  const typeIds:any = [...new Set(allCharacters.map((c:any) => c.type))];

                  const speciesCount = speciesIds.map((species: string) => {
                    const count = allCharacters.filter((c: any) => (c.species || 'Sin especie') === species).length;
                    return {
                      name: species || 'Sin especie',
                      count: count
                    };
                  });
                  
                  const typeCount = typeIds.map((type: string) => {
                    const count = allCharacters.filter((c: any) => (c.type || 'Sin tipo') === type).length;
                    return {
                      name: type || 'Sin tipo',
                      count: count
                    };
                  });
                  
        
                  const episodeIds:any = [...new Set(allCharacters.map((c:any) => Number(c.episode[0].split('/').pop())))];
                  const locationIds:any = [...new Set(allCharacters.map((c:any) => Number(c.location.url.split('/').pop())))];
                  
                  const episodeRequest = apiRestService.getEpidodes(episodeIds); 
                  const locationRequest = apiRestService.getLocations(locationIds);
                  
                  forkJoin([episodeRequest, locationRequest]).subscribe(([episodesResponse, locationsResponse]) => {
                    const episodes = Array.isArray(episodesResponse) ? episodesResponse : [episodesResponse];
                    const locations = Array.isArray(locationsResponse) ? locationsResponse : [locationsResponse];
                  
                    allCharacters.forEach((character: Character) => {
                      const episodeId = Number(character.episode[0].split('/').pop());
                      const locationId = Number(character.location.url.split('/').pop());
                      const originId = Number(character.origin.url.split('/').pop());
                  
                      const episode = episodes.find(ep => Number(ep.id) === episodeId);
                      const location = locations.find(loc => Number(loc.id) === locationId);
                      const locationOrigin = locations.find(loc => Number(loc.id) === originId);
                  
                      const anotherResidentFromOrigin = locationOrigin?.residents.find((url:any) => url !== character.url);
                      const anotherResidentFromLocation = location?.residents.find((url:any) => url !== character.url);
                  
                      const residentOriginName = allCharacters.find((c:any) => c.url === anotherResidentFromOrigin)?.name || "Sin residentes";
                      const residentLocationName = allCharacters.find((c:any) => c.url === anotherResidentFromLocation)?.name || "Sin residentes";
                  
                      character.nameEpisode = episode?.name || "Sin episodio";
                      character.residentLocation = residentLocationName;
                      character.residentOrigen = residentOriginName;
                    });
                  });
                  
                  
                  patchState(store, {
                    characters: allCharacters,
                    paginationCharacters: {
                      ...store.paginationCharacters(),
                      length: res.info.count, 
                      page: 0, 
                    },
                    isLoading: false,
                    totales: {
                      species: speciesCount,
                      types: typeCount,
                    }
                  });
                },
                error: (error) => console.error("Error getting characters:", error),
              }),
            );
          })
        )
      ),
      setSearchTerm: (term: string) => {
        patchState(store, { searchTerm: term });
      },

      setFilter(id: any) {
        patchState(store, {
          filter: id as "Todos" | "Male" | "Female" | "unknown",
        });
      },
      setPage(event: PageEvent) {
        patchState(store, {
          paginationCharacters: {
            ...store.paginationCharacters(),
            page: event.pageIndex,
            size: event.pageSize,
          }
        });
      }
    }),
  ),
  withHooks((store) => ({
    onInit: () => {
      store.loadCharacter(0);
    },
    onDestroy: () => {
      console.log('onDestroy');
    }
  })),
)