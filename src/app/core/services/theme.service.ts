import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  themes:any [] = [
    {
        empresa: 'default',
        colors: {
            primary: '#7C3AED',
            secondary: '#F59E0B',
            warn: '#a53860',
            onWarn: '#fdf2f8',
        },
    },
    {
        empresa: 'green',
        colors: {
            primary: '#16A34A',
            secondary: '#EAB308',
            warn: '#02c39a',
            onWarn: '#fdf2f8',
        },
    },
    {
        empresa: 'morado',
        colors: {
            primary: '#2ae19b',
            secondary: '#F472B6',
            warn: '#7209b7',
            onWarn: '#fdf2f8',
        },
    },
    {
        empresa: 'cyan',
        colors: {
            primary: '#FF00FF',
            secondary: '#02c39a',
            warn: '#fb6f92',
            onWarn: '#fdf2f8',
        },
    },

];

  currentTHehe = signal<string>('default');
  
  constructor() { }
}
