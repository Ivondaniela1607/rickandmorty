import { Component, inject, PLATFORM_ID, signal } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { LocalStorageService } from '../../core/services/localStorage.service';
import { CharacterStore } from '../../state/character.store';



@Component({
  selector: 'app-theme-mode',
  imports: [OverlayModule, CommonModule],
  templateUrl: './theme-mode.component.html',
  styleUrl: './theme-mode.component.css'
})
export class ThemeModeComponent {

  currentTheme: string | null = null;
  isPopoverThemeColor = signal<boolean>(false);
  themeToggleDarkIcon = signal<boolean>(false);
  themeToggleLightIcon = signal<boolean>(false);

  private readonly platform = inject(PLATFORM_ID);
  readonly #themeService = inject(ThemeService);
  colors = signal<any[]>(this.#themeService.themes) ;
  private localStorageService = inject(LocalStorageService);

  readonly characterStore = inject(CharacterStore);


  ngOnInit(): void {
    this.seleccionTema();
  
    if (isPlatformBrowser(this.platform)) {
      const savedTheme = localStorage.getItem('theme-empresa');
  
      if (savedTheme) {
        this.applyTheme(savedTheme);
      } else {
        const defaultTheme = 'cyan'; 
        this.applyTheme(defaultTheme);
      }
    }
  }

  toggoleThemeColor() {
    this.isPopoverThemeColor.set(!this.isPopoverThemeColor());
  }

  showDetailCharacter() {
      if(this.characterStore.selectedFavoriteCharacter()?.id){
        this.characterStore.isLoading.set(true);
        setTimeout(() => {
          this.characterStore.isLoading.set(false);
          this.characterStore.selectedCharacter.set(this.characterStore.selectedFavoriteCharacter());
        }, 600);
      }
  }

  applyTheme(empresa: string): void {
    const theme = this.colors().find((item: any) => item.empresa === empresa);
    if (theme) {
        const colors: any = theme.colors;
        Object.keys(colors).forEach((key) => {
            document.documentElement.style.setProperty(`--theme-${key}`, colors[key]);
        });
        
        if (this.currentTheme) {
            document.documentElement.classList.remove(`theme-${this.currentTheme}`);
        }
        document.documentElement.classList.add(`theme-${empresa}`);
        
        this.currentTheme = empresa;

        if (isPlatformBrowser(this.platform)) {
            localStorage.setItem('theme-empresa', empresa);
        }
    } else {
        console.warn(`No se encontró el tema para la empresa: ${empresa}`);
    }
}

themeToggleBtn() {
  this.themeToggleDarkIcon.set(!this.themeToggleDarkIcon);
  this.themeToggleLightIcon.set(!this.themeToggleLightIcon);
  if (isPlatformBrowser(this.platform)) {
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        this.localStorageService.setIsModoDark("dark");
        this.themeToggleLightIcon.set(false);
  
        this.themeToggleDarkIcon.set(true);
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        this.localStorageService.setIsModoDark("light");
        this.themeToggleLightIcon.set(true);
        this.themeToggleDarkIcon.set(false);
      }
  
      // If NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        this.localStorageService.setIsModoDark("light");
        this.themeToggleLightIcon.set(true);
        this.themeToggleDarkIcon.set(false);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        this.localStorageService.setIsModoDark("dark");
        this.themeToggleDarkIcon.set(true);
        this.themeToggleLightIcon.set(false);
      }
    }
  }
}

seleccionTema() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (isPlatformBrowser(this.platform)) {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      this.themeToggleLightIcon.set(false);
      this.themeToggleDarkIcon.set(true);
    } else {
      document.documentElement.classList.remove("dark");
    
      this.themeToggleLightIcon.set(true);
      this.themeToggleDarkIcon.set(false);
    }
  }

}


  
}
