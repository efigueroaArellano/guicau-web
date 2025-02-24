import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from './service/loader.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {
  @Input()
  activarLoaderNavegacionRutas = false;

  constructor(
      public loaderService: LoaderService,
      private router: Router
  ) {}

  ngOnInit() {
      if (this.activarLoaderNavegacionRutas) {
          this.router.events.subscribe(event => {
              if (
                  event instanceof NavigationStart ||
                  event instanceof RouteConfigLoadStart
              ) {
                  this.loaderService.activar();
              } else if (
                  event instanceof NavigationEnd ||
                  event instanceof NavigationError ||
                  event instanceof NavigationCancel ||
                  event instanceof RouteConfigLoadEnd
              ) {
                  this.loaderService.desactivar();
              }
          });
      }
  }
}
