import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import {
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTabsModule,
  MatSelectModule,
  MatTooltipModule,
  MatTableModule
} from '@angular/material';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPagesModule } from './admin-pages/admin-pages.module';


@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    AdminRoutingModule,
    AdminPagesModule,
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  exports: [
    AdminLayoutComponent
  ]
})
export class AdminModule { }
