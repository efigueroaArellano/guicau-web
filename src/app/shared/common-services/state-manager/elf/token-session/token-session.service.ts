import { Injectable } from '@angular/core';
import { TokenSesionProps, tokenStore, user$, UsuarioSesion } from './token.repository';
import { Observable } from 'rxjs';
import { select } from '@ngneat/elf';

/**
 * @description
 * Servicio para gestionar los tokens de sesión y la información del usuario. 
 * Proporciona métodos para guardar y obtener el estado de la sesión en el store de `@ngneat/elf`.
 */
@Injectable({
    providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación.
})
export class TokenSesionService {

    constructor() { }

    /**
     * @description
     * Guarda los tokens (`access_token` y `refresh_token`) y la información del usuario en el store.
     * Actualiza el estado del store con los nuevos valores de la sesión.
     * 
     * @param {TokenSesionProps} token Objeto que contiene los tokens y el usuario a guardar en el store.
     */
    public guardarTokenSesion(token: TokenSesionProps) {
        tokenStore.update(state => ({
            ...state,
            token: token.token,
            user: token.user
        }));
    }

    /**
     * @description
     * Obtiene el `access_token` guardado en el store.
     * 
     * @returns {string | undefined} El token de acceso o `undefined` si no está definido.
     */
    public obtenerTokenSesion(): string | undefined {
        return tokenStore.getValue().token;
    }

    /**
     * @description
     * Retorna un observable que emite la información del usuario actualmente en sesión.
     * Se puede suscribir a este observable para recibir actualizaciones cuando la información
     * del usuario cambie en el store.
     * 
     * @returns {Observable<UsuarioSesion | undefined>} Observable del usuario en sesión o `undefined` si no hay usuario.
     */
    public obtenerUsuarioSesion$(): Observable<UsuarioSesion | undefined> {
        return user$.pipe(select(state => state.user));
    }

    /**
     * @description
     * Obtiene la información del usuario en sesión de forma sincrónica desde el store.
     * 
     * @returns {UsuarioSesion | undefined} El usuario actualmente en sesión o `undefined` si no hay un usuario.
     */
    public obtenerUsuarioSesion(): UsuarioSesion | undefined {
        return tokenStore.getValue().user;
    }
}
