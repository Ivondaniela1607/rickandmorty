import { Component, inject } from '@angular/core';
import { CharacterStore } from '../../../state/character.store';

@Component({
  selector: 'app-filter-character',
  imports: [],
  templateUrl: './filter-character.component.html'
})
export class FilterCharacterComponent {

  readonly characterStore = inject(CharacterStore);

  gender = [
    { name: 'Todos', value: 'todos' },
    { name: 'Male', value: '1' },
    { name: 'Female', value: '2' },
    { name: 'unknown', value: '3' },
  ]
  searchName( event: Event ): void {
    if (event.target instanceof HTMLInputElement) {
      this.characterStore.setSearchTerm(event.target.value);
    }
  }

  cleanSearch() {
    this.characterStore.setSearchTerm('');
  }

  selectGender(value: Event) {
    if (value.target instanceof HTMLSelectElement) {
      this.characterStore.setFilter(value.target.value);
    }
  }
}
