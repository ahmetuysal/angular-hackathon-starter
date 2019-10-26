import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { PersonalSettingsPageComponent } from './pages/personal-settings-page/personal-settings-page.component';
import { AccountSettingsPageComponent } from './pages/account-settings-page/account-settings-page.component';
import { SecuritySettingsPageComponent } from './pages/security-settings-page/security-settings-page.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
    children: [
      { path: 'personal', component: PersonalSettingsPageComponent },
      { path: 'account', component: AccountSettingsPageComponent },
      { path: 'security', component: SecuritySettingsPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
