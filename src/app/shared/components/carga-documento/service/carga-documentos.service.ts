import { Injectable } from "@angular/core";
import { Observable, Observer, of, throwError } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { HttpClient, HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { String } from "typescript-string-operations";
import { AlertaService, TipoAlerta } from "../../../../../shared/components/alerta/service/alerta.service";
import { LoaderService } from "../../../../../shared/components/loader/service/loader.service";
import { TIPO_MODAL } from "../../../../../shared/components/message-dialog/enum/tipo-modal.enum";
import { ModalDialogService } from "../../../../../shared/components/message-dialog/service/modal-dialog.service";
import { CoreHttpService } from "../../../../../core/http/core-http.service";


@Injectable()
export class CargaDocumentosService extends CoreHttpService {

  constructor(private http: HttpClient, private loaderService: LoaderService, private modalDialogService: ModalDialogService, private alertaService: AlertaService) {
    super();
  }

  // public getDocumento(idSolicitud: number): Observable<File> {
    // return this.http.get<any>(String.format(`${ENDPOINT.PRIVADO.VISOR.DESCARGAR_DOCUMENTO}`, idSolicitud), { headers: this.httpHeadersAnon }).pipe(
    //   map((response: any) => {
    //     this.loaderService.desactivar();

    //     const byteCharacters = atob(response.datos);
    //     const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    //     const byteArray = new Uint8Array(byteNumbers);
    //     const blob = new Blob([byteArray], { type: 'application/pdf' });

    //     const file = new File([blob], `documento_${idSolicitud}.pdf`, { type: 'application/pdf' });
    //     return file;
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     this.loaderService.desactivar();
    //     return this.handleError(error);
    //   })
    // );
  // }

  // public deleteDocumento(idSolicitud: number): Observable<void> {
    // return this.http.delete<any>(String.format(`${ENDPOINT.PRIVADO.VISOR.ELIMINAR_DOCUMENTO}`, idSolicitud), { headers: this.httpHeadersAnon }).pipe(
    //   map(() => {
    //     this.loaderService.desactivar();
    //     return;
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     this.loaderService.desactivar();
    //     return this.handleError(error);
    //   })
    // );
  // }

  // public postDocumento(body: any): Observable<any> {
    // return this.http.post<any>(ENDPOINT.PRIVADO.VISOR.GUARDAR_DOCUMENTO, body, { headers: this.httpHeadersAnon }).pipe(
    //   map((response: any) => {
    //     return response;
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     return this.handleError(error);
    //   })
    // );
  // }

  // private handleError(error: HttpErrorResponse, mensajeCustom: boolean = false): Observable<never> {
  //   this.loaderService.desactivar();
  //   if (error.status === HttpStatusCode.Unauthorized) {
  //     this.modalDialogService.openDialog('Error', 'No autorizado', true, false, false, TIPO_MODAL.DANGER);
  //   }

  //   if (mensajeCustom) {
  //     this.alertaService.mostrar(TipoAlerta.Precaucion, '¡Alerta!', MENSAJE_SISTEMA.MSG053, false);
  //   } else {
  //     if (error.status === HttpStatusCode.InternalServerError) {
  //       this.modalDialogService.openDialog('Error', MENSAJE_SISTEMA.MSG001, true, false, false, TIPO_MODAL.DANGER);
  //     } else {
  //       this.modalDialogService.openDialog('Error', MENSAJE_SISTEMA.MSG001, true, false, false, TIPO_MODAL.DANGER);
  //     }
  //   }
  //   return throwError(() => error);
  // }

}
