import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { PersonalSettingsPageComponent } from './pages/personal-settings-page/personal-settings-page.component';
import { AccountSettingsPageComponent } from './pages/account-settings-page/account-settings-page.component';
import { SecuritySettingsPageComponent } from './pages/security-settings-page/security-settings-page.component';
import { ChangeUsernameComponent } from './components/change-username/change-username.component';

@NgModule({
  declarations: [
    SettingsPageComponent,
    PersonalSettingsPageComponent,
    AccountSettingsPageComponent,
    SecuritySettingsPageComponent,
    ChangeUsernameComponent
  ],
  imports: [CommonModule, SettingsRoutingModule, SharedModule, MaterialModule]
})
export class SettingsModule {}
