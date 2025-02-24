import * as CryptoJS from 'crypto-js';
import { StateStorage } from '@ngneat/elf-persist-state';

/**
 * @ngdoc service
 * @name app.services:ElfEncryptedStorage
 * @description
 * Clase personalizada que implementa la interfaz `StateStorage` de `@ngneat/elf-persist-state` para proporcionar
 * un almacenamiento encriptado en el `sessionStorage` del navegador. Los datos son encriptados utilizando AES antes
 * de ser almacenados, y se desencriptan al recuperarlos.
 *
 * @example
 * <pre>
 * // Uso dentro de la configuración de @ngneat/elf-persist-state
 * persistState({
 *   key: 'my-app-state',
 *   storage: new ElfEncryptedStorage()
 * });
 * </pre>
 */
export class ElfEncryptedStorage implements StateStorage {

    /**
     * @ngdoc property
     * @name secretKey
     * @propertyOf app.services:ElfEncryptedStorage
     * @description
     * La clave secreta utilizada para encriptar y desencriptar los datos almacenados. Esta clave debe ser
     * única y segura en un entorno de producción.
     * 
     * @type {string}
     */
    private readonly secretKey: string = 'D4cV454-X';

    /**
     * @ngdoc property
     * @name storage
     * @propertyOf app.services:ElfEncryptedStorage
     * @description
     * Referencia al `sessionStorage` del navegador donde se almacenarán los datos encriptados.
     * 
     * @type {Storage}
     */
    private storage = window.sessionStorage;

    /**
     * @ngdoc method
     * @name getItem
     * @methodOf app.services:ElfEncryptedStorage
     * @description
     * Recupera un elemento del almacenamiento, desencriptándolo antes de devolverlo. Si el elemento no existe,
     * retorna `null`.
     * 
     * @param {string} key La clave del elemento a recuperar.
     * @returns {Promise<T | null>} Una promesa que resuelve con el valor desencriptado o `null` si no existe.
     * 
     * @example
     * <pre>
     * const value = await storage.getItem('my-key');
     * </pre>
     */
    async getItem<T>(key: string): Promise<T | null> {
        const encryptedValue = this.storage.getItem(key);
        if (encryptedValue) {
            const bytes = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decrypted) as T;
        }
        return null;
    }

    /**
     * @ngdoc method
     * @name setItem
     * @methodOf app.services:ElfEncryptedStorage
     * @description
     * Almacena un valor en el almacenamiento encriptado con AES antes de guardarlo.
     * 
     * @param {string} key La clave bajo la cual se almacenará el valor.
     * @param {T} value El valor a almacenar.
     * @returns {Promise<void>} Una promesa que se resuelve cuando el valor ha sido almacenado.
     * 
     * @example
     * <pre>
     * await storage.setItem('my-key', { id: 123 });
     * </pre>
     */
    async setItem<T>(key: string, value: T): Promise<void> {
        const jsonValue = JSON.stringify(value);
        const encryptedValue = CryptoJS.AES.encrypt(
            jsonValue,
            this.secretKey
        ).toString();
        this.storage.setItem(key, encryptedValue);
    }

    /**
     * @ngdoc method
     * @name removeItem
     * @methodOf app.services:ElfEncryptedStorage
     * @description
     * Elimina un elemento del almacenamiento utilizando la clave proporcionada.
     * 
     * @param {string} key La clave del elemento a eliminar.
     * @returns {Promise<void>} Una promesa que se resuelve cuando el elemento ha sido eliminado.
     * 
     * @example
     * <pre>
     * await storage.removeItem('my-key');
     * </pre>
     */
    async removeItem(key: string): Promise<void> {
        this.storage.removeItem(key);
    }
}
