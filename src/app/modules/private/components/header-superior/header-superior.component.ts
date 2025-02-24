import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
import { RUTA } from '../../../../shared/constants/navigation-routes';
import { TokenSesionService } from '../../../../shared/common-services/state-manager/elf/token-session/token-session.service';
import { UsuarioSesion } from '../../../../shared/common-services/state-manager/elf/token-session/token.repository';


@Component({
  selector: 'app-header-superior',
  standalone: true,
  imports: [AsyncPipe, CommonModule, FormsModule, AvatarModule, MatMenuModule],
  templateUrl: './header-superior.component.html',
  styleUrl: './header-superior.component.scss',
  providers:[TokenSesionService]
})
export class HeaderSuperiorComponent implements OnInit{

  public usuarioSesion$ : any; 
  public usuarioSesion : any; 

  constructor(private router: Router, private tokenSesionService : TokenSesionService) {
      this.usuarioSesion$ = this.tokenSesionService.obtenerUsuarioSesion$();
  }

  ngOnInit(): void {

    
  }

  getInicialesUsuario(usuario: UsuarioSesion): string {
    const iniciales =
      (usuario.nombre ? usuario.nombre.charAt(0) : '') +
      (usuario.apellidoPaterno ? usuario.apellidoPaterno.charAt(0) : '');
    return iniciales.toUpperCase();
  }

  cerrarSesion () {
    // this.router.navigate([RUTA.PUBLICO.LOGIN])
  }

}
        