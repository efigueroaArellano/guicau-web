import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { TokenSesionService } from '../common-services/state-manager/elf/token-session/token-session.service';
import { UsuarioSesion } from '../common-services/state-manager/elf/token-session/token.repository';


@Injectable({ providedIn: "root" })
export class AuthGuardHelper implements CanActivate {

    public usuario : UsuarioSesion | undefined;

    constructor(
        private router : Router,
        private tokenSesionService: TokenSesionService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.usuario = this.tokenSesionService.obtenerUsuarioSesion();
          if (!this.userRolValid(this.usuario, route)) {
              this.router.navigate(['']);
              return false;
          }
          return true;
      }
  
      private userRolValid(usuario: UsuarioSesion | undefined, route: ActivatedRouteSnapshot): boolean {
          if (!usuario?.roles || !route || !route.url) {
              return false;
          }
          if (route.data && route.data?.['roles']) {
              return route.data?.['roles'].includes(usuario.roles[0]);
          }
          return true;
      }
}