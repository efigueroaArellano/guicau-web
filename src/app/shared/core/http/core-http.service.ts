import { HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class CoreHttpService  {

  constructor() { }

  public httpHeadersToken = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });

  public httpHeadersAnon = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8', 'Anonymous': '' });

  public handleError(error: HttpErrorResponse) {
    if (error.status === HttpStatusCode.Unauthorized) {
        return new Promise((resolve) => {
            resolve(error);
        });
    }
    if (error.status === HttpStatusCode.Conflict) {
        return new Promise((resolve) => {
            resolve(error);
        });
    }
    if (error.status === HttpStatusCode.InternalServerError) {
        // this.modalDialogService.openDialog('Error', MENSAJES_ERROR.http500, true, false, false, TIPO_MODAL.DANGER);
    } else {
        // this.modalDialogService.openDialog('Error', MENSAJE_SISTEMA.MSG001, true, false, false, TIPO_MODAL.DANGER);
    }
    return throwError(() => error);
}

}
