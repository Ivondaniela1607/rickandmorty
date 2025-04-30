import { Component } from '@angular/core';
import { TableCharacterComponent } from "./table-character/table-character.component";
import { FilterCharacterComponent } from "./filter-character/filter-character.component";
import { DetailCharacterComponent } from "./detail-character/detail-character.component";
import { TotalesComponent } from "./totales/totales.component";

@Component({
  selector: 'app-characters',
  imports: [TableCharacterComponent, FilterCharacterComponent, DetailCharacterComponent, TotalesComponent],
  templateUrl: './characters.component.html'
})
export class CharactersComponent {

}
