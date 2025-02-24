import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AlertaComponent } from './shared/components/alert/alerta.component';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { SidebarModule } from 'primeng/sidebar';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from "./shared/components/header/header.component";


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, AlertaComponent, ToastModule, NgxSpinnerComponent, SidebarModule, FooterComponent, HeaderComponent, FooterComponent, ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [MessageService]
})
export class AppComponent {

    title = 'guicau-web';

    constructor(private primengConfig: PrimeNGConfig, private translateService: TranslateService) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.translateService.setDefaultLang('es');
    }

    translateChange(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
    }

    ngAfterViewInit(): void {
        this.translateChange('es');
    }
}
