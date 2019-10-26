import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const routes: Routes = [
  { path: '', component: SettingsPageComponent, children: [] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
