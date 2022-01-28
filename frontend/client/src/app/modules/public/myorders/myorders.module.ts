import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyordersRoutingModule } from './myorders-routing.module';
import { MyordersPageComponent } from './pages/myorders-page/myorders-page.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

//NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { USER_STATE_NAME } from 'src/app/state/user/user.selector';
import { UserReducer } from 'src/app/state/user/user.reducer';
import { UserEffects } from 'src/app/state/user/user.effects';

@NgModule({
  declarations: [
    MyordersPageComponent
  ],
  imports: [
    CommonModule,
    MyordersRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature(USER_STATE_NAME, UserReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class MyordersModule { }
