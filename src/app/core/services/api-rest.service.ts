import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  readonly #apiSvc = inject(ApiService);
  constructor() { }

  getCharacters(page: number = 1, search?: string): Observable<any> {
    return this.#apiSvc.getCharacters(`character`, page,search);
  }

  getEpidodes(episode: []): Observable<any> {
    return this.#apiSvc.getEpisodes(`episode`, episode);
  }

  getLocations(location: []): Observable<any> {
    return this.#apiSvc.getLocations(`location`, location);
  }
}
