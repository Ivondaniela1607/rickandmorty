import { Component, effect, inject } from '@angular/core';
import { CharacterStore } from '../../../state/character.store';
import { ImgErrorDirective } from '../../../shared/directives/img-error.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-character',
  imports: [ImgErrorDirective, CommonModule],
  templateUrl: './detail-character.component.html',
})
export class DetailCharacterComponent {
  readonly characterStore = inject(CharacterStore);
}
