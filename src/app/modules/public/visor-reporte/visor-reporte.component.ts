import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReportesService } from './services/reportes.service';
import { AlertaService, TipoAlerta } from '../../../shared/components/alert/service/alerta.service';
import { MENSAJES_DOCUMENTOS, MENSAJES_ERROR } from '../../../shared/constants/mensajes';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visor-reporte',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  providers:[ReportesService, AlertaService],
  templateUrl: './visor-reporte.component.html',
  styleUrl: './visor-reporte.component.scss'
})
export class VisorReporteComponent implements OnInit{

  public vistaReporte : boolean = undefined;
  public src : string = '';
  public curp : string = '';

  private route = inject(ActivatedRoute);

  constructor(
    private reportesServices: ReportesService, 
    private alertaService: AlertaService, 
    private cdr: ChangeDetectorRef,) {}

  ngOnInit(): void {
    this.obtenerpathCURP() ;
    this.showDocument();  
    console.log("validCURP",this.validaCURP(this.curp));
    
  }

  private obtenerpathCURP() {
    this.curp = this.route.snapshot.paramMap.get('curp');
    console.log("curp param",this.curp);   
  }

  public validaCURP(curp: string): boolean { 
    const curpPattern = /^[A-Z][AEIOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]\d$/;
    
    if (!curp) {
      return false;
    }

    return curpPattern.test(curp);
  }

  showDocument(): void {
    if(this.validaCURP(this.curp))  {
      this.reportesServices.descargarReporte('129', '2')
      .subscribe((blob: Blob): void => { 
        if(blob != null)  {
          this.vistaReporte = true;
          const file = new Blob([blob], {type: 'application/pdf'});
          const fileURL = URL.createObjectURL(file);
          this.src = fileURL;

          setTimeout(() => {
            this.src = fileURL;
            this.cdr.detectChanges();
          }, 0);
        } else  {
          this.vistaReporte = false;
          this.alertaService.mostrar(TipoAlerta.Error, '¡Error!', MENSAJES_DOCUMENTOS.documentoNoEncontrado , false);
        }
    
      }, (error: any) =>  {
        if(error.status == 404 )  {
          this.vistaReporte = false;
          this.alertaService.mostrar(TipoAlerta.Error, '¡Error!', MENSAJES_DOCUMENTOS.documentoNoEncontrado , false);
        }
      });
    } else  {
      this.alertaService.mostrar(TipoAlerta.Error, '¡Error!', MENSAJES_DOCUMENTOS.CURP_INVALIDO , false);
    }
  }
}
