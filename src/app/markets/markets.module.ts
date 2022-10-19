import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketsComponent } from './markets.component';
import { MaterialComponentsModule } from '../shared/material-module/material.module';
import { MarketsRoutingModule } from './market-routing.module';
import { AddEditMarketsComponent } from './add-edit-markets/add-edit-markets.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';



@NgModule({
  declarations: [
    MarketsComponent,
    AddEditMarketsComponent,
    DeleteModalComponent
  ],
  imports: [
    MarketsRoutingModule,
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule
  ]
})
export class MarketsModule { }
