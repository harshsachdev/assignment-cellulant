import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditMarketsComponent } from './add-edit-markets/add-edit-markets.component';
import { MarketsComponent } from './markets.component';

const routes: Routes = [
  {path:'',component:MarketsComponent},
  {path:'add', component:AddEditMarketsComponent},
  {path:'edit/:id', component:AddEditMarketsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketsRoutingModule { }
