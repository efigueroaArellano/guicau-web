import { Routes } from '@angular/router';
import { AuthGuardHelper } from './shared/interceptors/authentication-guard';
import { VisorReporteComponent } from './modules/public/visor-reporte/visor-reporte.component';

const privado : string = 'privado/';

export const routes: Routes = [
    { path: '', redirectTo: 'visor-reporte', pathMatch: 'full' },

    //Publico
    {
        path: 'publico',
        children: [
            {
                path: '',
                redirectTo: 'visor-reporte',
                pathMatch: 'full',
            },
            {
                path: 'visor-reporte',
                component: VisorReporteComponent,
            },
            {
                path: 'visor-reporte/:curp',
                component: VisorReporteComponent,
            },
        ],
    },

    {
        path: '**',
        redirectTo: 'publico',
    }

];
