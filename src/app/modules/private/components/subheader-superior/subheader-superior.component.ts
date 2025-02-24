import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RUTA } from '../../../../shared/constants/navigation-routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subheader-superior',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subheader-superior.component.html',
  styleUrl: './subheader-superior.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class SubheaderSuperiorComponent implements OnInit {

  @Input() titulo!: string;
  @Input() mensajeInfo?: string;

  @Input() isMostrarAtras: boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit(): void { }

  public regresar() {
    let vistaActual = window.location.href;
    

    if (vistaActual.includes('listado-reportes')) {
      this.router.navigate([RUTA.PRIVADO.CONSULTA_REPORTE]);
      return;
    }

  }

}
