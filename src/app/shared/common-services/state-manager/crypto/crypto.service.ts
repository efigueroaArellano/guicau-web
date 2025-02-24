import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

/**
 * @ngdoc service
 * @name app.services:CryptoService
 * @description
 * Servicio para encriptar y desencriptar datos utilizando el algoritmo AES (Advanced Encryption Standard).
 * Este servicio puede ser utilizado en cualquier parte de la aplicación para asegurar datos sensibles.
 *
 * @example
 * <pre>
 * // Inyectar el servicio en un componente
 * constructor(private cryptoService: CryptoService) {}
 *
 * // Encriptar un objeto
 * const encryptedData = this.cryptoService.encrypt({ id: 123, nombre: 'Juan' });
 * 
 * // Desencriptar un string
 * const decryptedData = this.cryptoService.decrypt(encryptedData);
 * </pre>
 */
@Injectable({ providedIn: 'root' })
export class CryptoService {

    /**
     * @ngdoc property
     * @name secretKey
     * @propertyOf app.services:CryptoService
     * @description
     * La clave secreta utilizada para encriptar y desencriptar los datos.
     * Es recomendable que esta clave sea única y segura en un entorno de producción.
     * 
     * @type {string}
     */
    private readonly secretKey: string = 'D4cV454-X';

    /**
     * @ngdoc method
     * @name encrypt
     * @methodOf app.services:CryptoService
     * @description
     * Encripta un objeto o string utilizando el algoritmo AES y la clave secreta definida.
     * 
     * @param {any} data Los datos que serán encriptados (pueden ser un objeto o un string).
     * @returns {string} Retorna los datos encriptados en formato de string.
     * 
     * @example
     * <pre>
     * const encrypted = this.cryptoService.encrypt({ id: 123 });
     * </pre>
     */
    encrypt(data: any): string {
        return CryptoJS.AES.encrypt(
            JSON.stringify(data),
            this.secretKey
        ).toString();
    }

    /**
     * @ngdoc method
     * @name decrypt
     * @methodOf app.services:CryptoService
     * @description
     * Desencripta un string encriptado previamente con AES y devuelve los datos originales.
     * 
     * @param {string} ciphertext El string encriptado que será desencriptado.
     * @returns {any} Retorna los datos desencriptados en su formato original, o `null` si no se puede desencriptar.
     * 
     * @example
     * <pre>
     * const decrypted = this.cryptoService.decrypt(encryptedData);
     * </pre>
     */
    decrypt(ciphertext: string): any {
        const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData ? JSON.parse(decryptedData) : null;
    }
}
