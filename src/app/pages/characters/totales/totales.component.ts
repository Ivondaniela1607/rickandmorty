import { Component, effect, inject } from '@angular/core';
import { CharacterStore } from '../../../state/character.store';

@Component({
  selector: 'app-totales',
  imports: [],
  templateUrl: './totales.component.html'
})
export class TotalesComponent {
  readonly characterStore = inject(CharacterStore);
}
