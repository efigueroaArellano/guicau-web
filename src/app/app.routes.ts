import { Routes } from '@angular/router';
import { AuthGuardHelper } from './shared/interceptors/authentication-guard';
import { VisorReporteComponent } from './modules/public/visor-reporte/visor-reporte.component';
import { MainComponent } from './modules/public/main/main.component';
import { HomeComponent } from './modules/public/home/home.component';

const privado : string = 'privado/';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },


    {
        path: 'publico',
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                component: HomeComponent,
            }
        ],
    },

    {
        path: '**',
        redirectTo: 'publico',
    }

];
