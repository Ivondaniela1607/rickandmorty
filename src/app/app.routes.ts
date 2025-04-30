import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { CharactersComponent } from './pages/characters/characters.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CharactersComponent
      }
    ]
  }
];
