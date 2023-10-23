import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private _userService: ProfileService){}

  ngOnInit(){

    const userName = sessionStorage.getItem('user');
    if(userName){
      this.ObtenerUsuario(userName);
    }
    const userId = sessionStorage.getItem('userId')
  }

  ObtenerUsuario(userName: string){
    this._userService.getUserProfile(userName).subscribe(dataUser => {
      const userId =  dataUser.id;
      if(userId){
        sessionStorage.setItem('userId',userId);
      }
    });
  }


}
