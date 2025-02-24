import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    of,
    tap,
    concatMap,
    finalize,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    private activaciones: number[] = [];

    private loaderSubject = new BehaviorSubject<boolean>(false);

    loader$: Observable<boolean> = this.loaderSubject.asObservable();

    mostrarLoaderHastaCompletar<T>(obs$: Observable<T>): Observable<T> {
        return of(null).pipe(
            tap(() => this.activar()),
            concatMap(() => obs$),
            finalize(() => this.desactivar())
        );
    }

    activar() {
        this.activaciones.push(1);
        this.loaderSubject.next(true);
    }

    desactivar() {
        this.activaciones.pop();
        if (this.activaciones.length === 0) {
            this.loaderSubject.next(false);
        }
    }
}
