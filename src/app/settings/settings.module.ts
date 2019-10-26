import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [CommonModule, SettingsRoutingModule, SharedModule, MaterialModule]
})
export class SettingsModule {}
