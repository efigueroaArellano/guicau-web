import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, of, throwError } from "rxjs";
import { String } from 'typescript-string-operations';
import { Router } from "@angular/router";
import { ModalDialogService } from "../../shared/components/message-dialog/service/modal-dialog.service";
import { TIPO_MODAL } from "../../shared/components/message-dialog/enum/tipo-modal.enum";
import { TokenSesionService } from "../common-services/state-manager/elf/token-session/token-session.service";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class AutenticacionInterceptor implements HttpInterceptor {

    private spinner = inject(NgxSpinnerService);

    private modalDialogService = inject(ModalDialogService);

    constructor(private tokenSesionService: TokenSesionService,
        private router: Router) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 403) {
            if (err.statusText.toUpperCase() == 'UNAUTHORIZED') {
                const message = '<h2 style="color: #B38E5D;"><i class="icon-exclamation-sign"></i></h2><h4>Por razones de seguridad, su sesión expiró</h4>';
                this.modalDialogService.openDialog({
                    titulo: '¡Alerta!',
                    mensaje: message,
                    visible: true,
                    aceptar: false,
                    cancelar: false,
                    continuar: false,
                    tipoModal: TIPO_MODAL.DANGER
                });
                return throwError(err);
            } else {
                this.spinner.hide();
                this.router.navigate(['']);
                return of();
            }
        }

        if (err.status === 400 || err.status === 401) {
            return throwError(err);  // Retornamos el error para que el componente lo maneje (Verificación de CURP)
        }

        return throwError(err);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const emptyAuthHeader = String.IsNullOrWhiteSpace(request.headers.get('Authorization'));

        /* Para servicios que no contienen token y se excluyen de autorización */
        if (request.headers.get('Anonymous') != undefined) {
            const newHeaders = request.headers.delete('Anonymous')
            const newRequest = request.clone({ headers: newHeaders });
            return next.handle(newRequest);
        }

        /* Inyección de token */
        if (this.tokenSesionService.obtenerTokenSesion() != '' && emptyAuthHeader) {
            request = request.clone({
                setHeaders: {
                    Authorization: ('Bearer ' + this.tokenSesionService.obtenerTokenSesion()).replace("\"", "").replace("\"", "")
                }
            });
        }

        return next.handle(request).pipe(catchError(err => {
            return this.handleAuthError(err);
        }));
    }

}
