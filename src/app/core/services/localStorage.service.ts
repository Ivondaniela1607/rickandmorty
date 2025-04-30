import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { signal } from "@angular/core";
import { isPlatformBrowser, NgClass } from '@angular/common';

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private idModeDarkSignal = signal(this.getLanguage());
  private readonly platform = inject(PLATFORM_ID);
  constructor() {
    if (isPlatformBrowser(this.platform)) {
      window.addEventListener("storage", () => {
        this.idModeDarkSignal.set(this.getLanguage());
      });
    }
  }

  private getLanguage(): string {
    if (isPlatformBrowser(this.platform)) {
      return localStorage.getItem("color-theme") || "dark";
    }
    return 'dark';
  }

  setIsModoDark(opc: string) {
    if (isPlatformBrowser(this.platform)) {
      localStorage.setItem("color-theme", opc);
    }
    this.idModeDarkSignal.set(opc);
  }

  getIsModoDark() {
    return this.idModeDarkSignal;
  }
}
