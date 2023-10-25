import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { users } from '../../../shared/interfaces/users';
import { UsersService } from '../../../shared/services/users.service';
import { EditarUsuariosComponent } from '../../users/editar-usuarios/editar-usuarios.component';
import { MatDialog } from '@angular/material/dialog';
import { PopRemoveQuestionComponent } from '../../alerts/alert.component';
import { RolsService } from '../../../shared/services/rols.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { profile } from '../../../shared/interfaces/profile';
import { map } from 'rxjs/internal/operators/map';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  mostrarElemento?:boolean;
  displayedColumns: string[] = ['userName', 'email','phone','isAdministrador','Acciones'];
  dataSource = new MatTableDataSource<users>();
  loading: boolean = false;

  userProfile? : profile
  userId !: string;
  isAdministrador ?: boolean;
  userNameSession? : string;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 constructor(private _snackBar: MatSnackBar,
  private _UsersService: UsersService,
  private dialog: MatDialog,
  private _rolService : RolsService,
  private _userProfile : ProfileService
  ) {

  }


  ngOnInit(): void {
    const userRole = sessionStorage.getItem('userRole');
    if(userRole=="Administrador"){
      this.mostrarElemento= true;
    }
    this.getuser();
    const userName = sessionStorage.getItem('user');
    if(userName != null){
      this.userNameSession = userName;
    }
    
    
  }

  //Pop up
  openDialogEditar(idUsuario:string): void {
    const dialogRef = this.dialog.open(EditarUsuariosComponent, {data: {idUsuario}});
  }

  //Paginaciones y ordenar
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página'
    }
  }

  //Filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getuser() {
    this.loading = true;
    this._UsersService.getusers().subscribe(data => {
      this.loading = false;
      const filterData = data.filter(user => user.userName !== 'adm' && !( user.userName === this.userNameSession));
      this.dataSource.data = filterData;
      const userNames = data.map(user => user.userName);
  
      forkJoin(userNames.map(userName => this.getUserId(userName)))
        .subscribe(userIds => {
          for (let i = 0; i < userIds.length; i++) {
            const userId = userIds[i];
            this._rolService.AdministratorVerification(userId).subscribe(
              isAdmin => {
                // Actualiza la propiedad isAdmin del usuario correspondiente
                data[i].isAdmin = isAdmin;
              }
            );
          }
        });
    });
  }
  

  getUserId(userName: string): Observable<string>{
    return this._userProfile.getUserProfile(userName).pipe(
      map(data => data.id)

    );
  }
  
  onToggleChange(event: any, userName: string) {
    const isAdministrador = event.checked;

    this.getUserId(userName).subscribe(userId => {
      if(isAdministrador){
        this.addRoleToUser(userId,'Administrador');
      }else{
        this.addRoleToUser(userId,'User');
      }
    });
  }

  addRoleToUser( userId : string, rol : string){
    this._rolService.AddRoleToUser(userId, rol).subscribe(
      data => {
      }
    );
  }


  openDialog(identificationUser: string){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identificationUser, pathname}});
  }

  mensajeExito() {
    this._snackBar.open('El usuario fue ${texto} con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }


}
