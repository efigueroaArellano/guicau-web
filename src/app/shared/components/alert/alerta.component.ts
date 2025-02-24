import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-alerta',
    templateUrl: './alerta.component.html',
    styleUrls: ['./alerta.component.scss'],
})

export class AlertaComponent {
    @Input()
    message!: any;
}
