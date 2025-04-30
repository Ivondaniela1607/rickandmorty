import { Component } from '@angular/core';
import { ThemeModeComponent } from "../../shared/theme-mode/theme-mode.component";

@Component({
  selector: 'app-header',
  imports: [ThemeModeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
}
