import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('admnistration') administration!: MatMenuTrigger;
  mostrarElemento: boolean = false;

  constructor(private oidcSecurityService: OidcSecurityService) {}

  openMenu() {
    this.administration.openMenu();
  }

  ngOnInit(){
    const userRole = sessionStorage.getItem('userRole');
    if(userRole=="Administrador"){
      this.mostrarElemento= true;
    }
  }

  cerrarSesion() {
    this.oidcSecurityService.logoff();
  }
}
