import { Component, Input } from '@angular/core';
import { AlertaComponent } from '../alert/alerta.component';
import { AlertaService, TipoAlerta } from '../alert/service/alerta.service';



@Component({
  selector: 'app-code-box',
  standalone: true,
  imports: [AlertaComponent],
  providers: [AlertaService],
  templateUrl: './code-box.component.html',
  styleUrl: './code-box.component.scss'
})
export class CodeBoxComponent {

  constructor(private alertaService: AlertaService) {

  }

  @Input() code: string = '';

  copyCode(){
    navigator.clipboard.writeText(this.code).then(
      () => this.alertaService.mostrar(TipoAlerta.Exito, '¡Error!', 'Texto Copiado', false),
      (err) => this.alertaService.mostrar(TipoAlerta.Error, '¡Error!', 'Error al copiar texto', false)
    );
  }
}
