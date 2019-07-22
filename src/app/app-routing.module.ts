import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployDetailComponent } from './components/employ-detail/employ-detail.component';
import { EmployListComponent } from './components/employ-list/employ-list.component';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  {
    path: 'employlist/:id',
    component: EmployDetailComponent
  },
  {
    path: 'employlist',
    component: EmployListComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'employlist'
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [EmployDetailComponent, EmployListComponent, Page404Component];
