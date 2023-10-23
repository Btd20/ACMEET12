import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'listUser', pathMatch: 'full'
  },
  {
    path: 'listUser', component: ListUsersComponent
  },

  {
    path: 'addUser', component: AddEditUsersComponent
  },
  {     
    path: 'editUser/:id',  component: AddEditUsersComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule { }
