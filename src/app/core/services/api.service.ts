import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    readonly #httpCliente = inject(HttpClient);

    baseUrl = environment.SERVER_URL;

    getCharacters(url: string, page?: number): Observable<any> {
        return this.#httpCliente.get(`${this.baseUrl}${url}?page=${page}`);
    }

    getEpisodes(url: string, episode:[] ): Observable<any> {
        return this.#httpCliente.get(`${this.baseUrl}${url}/${episode}`);
    }

    getLocations(url: string, location:[]): Observable<any> {
        return this.#httpCliente.get(`${this.baseUrl}${url}/${location}`);
    }
}
