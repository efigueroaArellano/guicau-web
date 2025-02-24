import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Paginado } from '../../models/compartido.model';
import { Paginator, PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-paginador',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './paginador.component.html',
  styleUrl: './paginador.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginadorComponent implements OnInit{

    @Input() totalElements: number;
    @Output() private paginado:  EventEmitter<Paginado> = new EventEmitter();
    @Input() pushBuscar : boolean = false;
    @Input() paginaChecked : boolean = false; 

    size : number = 10;
    paginaActual : number = 0;
    rowsPerPageOptions : number [] = [10, 25, 50, 100];

    @ViewChild('p') paginator!: Paginator;

  constructor ()  {

  }

  ngOnInit(): void {
      
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pushBuscar && this.paginator) { 
        setTimeout(() => {
            this.paginator.changePage(0);
        }, 0);
    }
}

  onPageChange(data : any)  {
    this.paginado.emit(data);
  }

}
