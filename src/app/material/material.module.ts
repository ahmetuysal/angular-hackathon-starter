import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatMenuModule],
  exports: [MatButtonModule, MatToolbarModule, MatMenuModule]
})
export class MaterialModule {}
