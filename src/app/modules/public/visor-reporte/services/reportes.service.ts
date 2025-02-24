import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, throwError } from 'rxjs';
import { API } from '../../../../shared/constants/api';
import { CoreHttpService } from '../../../../shared/core/http/core-http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportesService extends CoreHttpService {

  constructor(private http: HttpClient, private spinnerService: NgxSpinnerService) { 
    super();
  }
  


  //Descargar Reporte Alumno
  public descargarReporte(idAtencion: string, cveUsuario: string){
    this.spinnerService.show();

    const params = new HttpParams()
    .set('idAtencion', String(idAtencion))
    .set('cveUsuario', String(cveUsuario));

    return this.http.get<Blob>(API.PRIVATE.REPORTES.DESCARGAR_REPORTE,
      {
        params: params,
        responseType: 'blob' as 'json', 
        headers: this.httpHeadersAnon
      }
    ).pipe(
      finalize(() => this.spinnerService.hide()),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al descargar el archivo', error);
        return throwError(error);
      })
    );
  }
}
