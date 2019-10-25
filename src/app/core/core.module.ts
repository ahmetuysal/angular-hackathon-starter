import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './pages/core/core.component';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MaterialModule } from '../material/material.module';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

@NgModule({
  declarations: [CoreComponent, LoginPageComponent, SignupPageComponent],
  imports: [CommonModule, CoreRoutingModule, SharedModule, MaterialModule]
})
export class CoreModule {}
