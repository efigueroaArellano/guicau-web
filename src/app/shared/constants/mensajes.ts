/**
 * @ngdoc constant
 * @name app.constants:MENSAJES_ERROR
 * @description
 * Constantes que contienen los mensajes de error relacionados con las respuestas HTTP del servidor.
 * Estos mensajes pueden ser utilizados en cualquier parte de la aplicación para mostrar al usuario
 * un mensaje adecuado dependiendo del tipo de error recibido.
 *
 * @example
 * <pre>
 * // Acceder a los mensajes de error
 * console.log(MENSAJES_ERROR.http500); // 'El servidor no está disponible temporalmente. Favor de intentar más tarde.'
 * </pre>
 */
export const MENSAJES_ERROR = {
  http500: 'El servidor no está disponible temporalmente. Favor de intentar más tarde.',
  http403: 'La información no está disponible temporalmente. Favor de intentar más tarde.',
  http204: 'No existen datos para la consulta solicitada.'
};

/**
 * @ngdoc constant
 * @name app.constants:MENSAJES_FORMULARIO
 * @description
 * Constantes que contienen los mensajes de validación de formularios. Estos mensajes pueden ser utilizados
 * para mostrar al usuario mensajes claros cuando un campo en el formulario no cumple con los requisitos.
 *
 * @example
 * <pre>
 * // Acceder a los mensajes de validación
 * console.log(MENSAJES_FORMULARIO.requerido); // 'Este campo es obligatorio.'
 * </pre>
 */
export const MENSAJES_FORMULARIO = {
  requerido: 'Este campo es obligatorio.',
};

export const MENSAJES_DOCUMENTOS = {
  documentoNoDisponible: 'No se encuentra el archivo disponible para descargar.',
  documentoDescargado: '<b>El archivo</b> se descargó correctamente.',
  documentoNoEncontrado: 'No se pudo encontrar el documento',
  CURP_INVALIDO: 'Formato de CURP vacío o invalido.',
};

