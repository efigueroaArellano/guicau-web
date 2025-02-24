import { Injectable } from "@angular/core";
import { Observable, Observer, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
// import { OpcionesArchivos } from "../../models/opciones-archivos.interface";


@Injectable()
export class DescargaArchivosService {

  readonly pdf_ext = { 'application/pdf': ['.pdf'] };
  readonly pdf_nom = "PDF";
  readonly excel_ext = { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] };
  readonly excel_nom = "Excel workbook";

  // base64_2Blob(base64: string, contentType: string): Blob {
  //   const byteCharacters: string = window.atob(base64);
  //   const byteNumbers: any[] = new Array(byteCharacters.length);
  //   for (let i: number = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   const byteArray = new Uint8Array(byteNumbers);
  //   return new Blob([byteArray], { type: contentType });
  // }

  // obtenerContentType(options: OpcionesArchivos = {}): string {
  //   const ext: "pdf" | "xlsx" | "csv" | "zip" = options.ext ?? "pdf";
  //   switch (ext) {
  //     case 'pdf':
  //       return 'application/pdf';
  //     case 'xlsx':
  //     case 'csv':
  //       return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  //     default:
  //       return 'application/octet-stream';
  //   }
  // }

  // descargarArchivo(archivo$: Observable<Blob>, options: OpcionesArchivos = {}) {
  //   const nombreArchivo: string = options.nombreArchivo ?? "documento";
  //   const ext: "pdf" | "xlsx" | "csv" | "zip" = options.ext ?? "pdf";
  //   const configuracion: SaveFilePickerOptions = {
  //     suggestedName: `${nombreArchivo}.${ext}`,
  //     types: [
  //       {
  //         description: ext === "pdf" ? this.pdf_nom : this.excel_nom,
  //         accept: ext === "pdf" ? this.pdf_ext : this.excel_ext
  //       },
  //     ],
  //   };
  // }
  // descargarArchivo(archivo$: Observable<Blob>, options: OpcionesArchivos = {}): Observable<boolean> {
  //   const nombreArchivo: string = options.nombreArchivo ?? "documento";
  //   const ext: "pdf" | "xlsx" | "csv" | "zip" = options.ext ?? "pdf";
  //   const configuracion: SaveFilePickerOptions = {
  //     suggestedName: `${nombreArchivo}.${ext}`,
  //     types: [
  //       {
  //         description: ext === "pdf" ? this.pdf_nom : this.excel_nom,
  //         accept: ext === "pdf" ? this.pdf_ext : this.excel_ext
  //       },
  //     ],
  //   };
  //   return archivo$.pipe(
  //     switchMap((archivoBlob: Blob) => {

  //       // Firefox
  //       if (typeof window.showSaveFilePicker === 'undefined') {
  //         const downloadURL: string = window.URL.createObjectURL(archivoBlob);
  //         const link: HTMLAnchorElement = document.createElement('a');
  //         link.href = downloadURL;
  //         link.download = `${nombreArchivo}.${ext}`;
  //         console.log(link.download);
  //         document.body.appendChild(link);
  //         link.click();
  //         document.body.removeChild(link);
  //         return of(true)
  //       }

  //       // (Chrome, Edge)
  //       return window.showSaveFilePicker(configuracion).then((fileHandle: FileSystemFileHandle) => {
  //         return fileHandle.createWritable().then((writable: FileSystemWritableFileStream): boolean => {
  //           void writable.write(archivoBlob);
  //           void writable.close();
  //           return true;
  //         });
  //       });
  //     }),
  //     catchError((error) => {
  //       if(error.toString().includes('The user aborted a request')) return of(false);
  //       console.log(error.toString())
  //       throw new Error('Error al guardar el archivo.');
  //     })
  //   );
  // }
}
