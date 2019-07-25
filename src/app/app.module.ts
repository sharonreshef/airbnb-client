import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApartmentsComponent } from './apartments/apartments.component';
import { ApartmentComponent } from './apartment/apartment.component';
import {
  MatCardModule,
  MatSelectModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';
import { NewApartmentComponent } from './new-apartment/new-apartment.component';
import { TypeFilterComponent } from './type-filter/type-filter.component';

export const API_URL = 'http://localhost:3000';

@NgModule({
  declarations: [
    AppComponent,
    ApartmentsComponent,
    ApartmentComponent,
    ApartmentDetailsComponent,
    NewApartmentComponent,
    TypeFilterComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
