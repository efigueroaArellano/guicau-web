import { createStore, withProps, select } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { ElfEncryptedStorage } from '../elf-encrypted-storage';


/**
 * @description
 * Definición de un almacén (store) para manejar el estado de la sesión, incluyendo el `access_token`, 
 * `refresh_token` y la información del usuario (`UsuarioSesion`). Utiliza `@ngneat/elf` para la gestión del estado 
 * y la persistencia de datos en almacenamiento encriptado usando `ElfEncryptedStorage`.
 */

export interface TokenSesionProps {
    token?: string;
    user?: UsuarioSesion
}

export interface UsuarioSesion {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno?: string | null;
    idUsuario?: number;
    roles?: Rol[];
}

export interface Rol {
    idRol?: number;
    desRol?: string;
    cveEscuela?: string;
    nomEscuela?: string;
    refTurno?: string;
    idTurno?: number;
}

// Creación del store que maneja el estado de la sesión (tokens y usuario).
export const tokenStore = createStore(
    { name: 'session' }, // Nombre del store
    withProps<TokenSesionProps>({
        token: undefined,  
        user: undefined        
    })
);

/**
* @description
* Persistencia del estado del store en `sessionStorage` usando la clase `ElfEncryptedStorage` 
* para encriptar la información almacenada. Se guarda con la clave `'session'`.
*/
export const persist = persistState(tokenStore, {
    key: 'session', // Clave bajo la cual se almacenará el estado
    storage: new ElfEncryptedStorage(), // Utiliza almacenamiento encriptado
});

/**
* @description
* Observable que emite el estado completo del store `tokenStore`, que incluye la información 
* de los tokens y del usuario actualmente en sesión.
* 
* @returns {Observable<TokenSesionProps>} Observable del estado actual del store.
*/
export const user$ = tokenStore.pipe(select(state => state));
