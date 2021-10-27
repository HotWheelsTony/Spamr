import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComposePageRoutingModule } from './compose-routing.module';

import { ComposePage } from './compose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComposePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ComposePage]
})
export class ComposePageModule {}
