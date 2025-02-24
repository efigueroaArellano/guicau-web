import { Component, HostListener } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { MenuListComponent } from './menu-list/menu-list.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, MenuListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isMobile: boolean = false;
  visibleSidebar: boolean = false;

  constructor(){
    this.checkScreenSize();
  }

  @HostListener("window:resize",[])
  checkScreenSize(){
    this.isMobile = window.innerWidth <= 860;
  }

  toggleSidebar(){
    this.visibleSidebar = !this.visibleSidebar;
  }
}
