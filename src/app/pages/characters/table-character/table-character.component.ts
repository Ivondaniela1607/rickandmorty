import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import { CharacterStore } from '../../../state/character.store';
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Character } from '../../../model/character.model';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-table-character',
  imports: [  MatSortModule, MatTableModule,MatPaginator,  MatPaginatorModule, CommonModule, MatTooltipModule],
  templateUrl: './table-character.component.html',
  styleUrl: './table-character.component.css'
})
export class TableCharacterComponent {

  isLoading = signal<boolean>(false);

  readonly characterStore = inject(CharacterStore);

  showDetailCharacter(item: Character) {
    this.characterStore.isLoading.set(true);
    setTimeout(() => {
      this.characterStore.isLoading.set(false);
      this.characterStore.selectedCharacter.set(item);
    }, 600);
  }

  selectFavoriteCharacter(item: Character) {
    this.characterStore.selectedFavoriteCharacter.set(item);
  }

  cambiarPagina(event: PageEvent){
    this.characterStore.loadCharacter(event.pageIndex);
  }


}
