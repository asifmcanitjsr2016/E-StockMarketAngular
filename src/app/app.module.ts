import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AllCompanyComponent } from './all-company/all-company.component';
import { SearchCompanyComponent } from './search-company/search-company.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { InfoMessageComponent } from './info-message/info-message.component';
import { HttpClientModule } from '@angular/common/http';
import { EStockTabsComponent } from './e-stock-tabs/e-stock-tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCompanyComponent,
    AllCompanyComponent,
    SearchCompanyComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    InfoMessageComponent,
    EStockTabsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
