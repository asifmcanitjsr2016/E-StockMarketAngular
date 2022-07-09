import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Company } from '../Models/Company';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyService } from '../services/company.service';
import { NotificationService } from '../services/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  isDataAvailable = false;  
  isDataAvailable1 = false;
  isStockAvailable = false;
  inputValue = "";
  min:number=0;
  max:number=0;
  avg:number=0.0;
  companyDetails!: Company;
  allCompanyData!:Company[];
  companyDetails1!: any;  
  dataSource!: MatTableDataSource<Company>;  
  dataSource1!: MatTableDataSource<Company>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;  

  displayedColumns = ['StockPrice', 'Date', 'Time']; 
  allCompanyCodes = ['Select Company'];
  companyCodes="";
  companyForm: any;
  range: any;
  stockForm:any;

  stockPrice:number=0;

  Company: Company = {
    code: '',
    name: '',
    ceo: '',
    turnOver: 0,
    website: '',
    stockExcehange: '',    
    stocks: []
  };

  constructor(private _spinner: NgxSpinnerService,
    private _companyService: CompanyService,
    private _notification: NotificationService
    ) {

    this.companyForm = new FormGroup({
      companyCode: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      comapanyCeo: new FormControl('', [Validators.required]),
      comapanyTurnover: new FormControl('', [Validators.required, Validators.min(100000001)]),
      companyWebsite: new FormControl('', [Validators.required]),
      companySockExchange: new FormControl('', [Validators.required])      
    });

    this.stockForm = new FormGroup({
      price: new FormControl('', [Validators.required, Validators.min(1)])
    });

    this.range = new FormGroup({
      start: new FormControl('', Validators.required),
      end: new FormControl('',Validators.required),
    });
   }

   getAllStocks() {  
    let startdate = this.range.value['start'];
    let enddate = this.range.value['end'];
    if(startdate && enddate){
      startdate = startdate?.toLocaleDateString('en-GB');
      enddate = enddate?.toLocaleDateString('en-GB');
      
      this._spinner.show();

    this._companyService.getStocks(this.companyDetails1.code, startdate, enddate)
      .subscribe(
        data => {

          this._spinner.hide();
          if (data == null || data.length == 0) {
            this._notification.infoMessage({ message: 'Stocks', subText: 'No data available!' });
          }
          console.log("Observable Data:", data);          
          this.dataSource1 = new MatTableDataSource(data);
          this.dataSource1.paginator = this.paginator;
          this.isStockAvailable=true;

          this.min = Math.min.apply(null, data.map((item: { price: any; }) => item.price));
          this.max = Math.max.apply(null, data.map((item: { price: any; }) => item.price));
          this.avg = parseFloat((data.filter((x: { price: any; }) => x.price).reduce((acc: any,x: { price: any; }) => acc + x.price, 0) / data.length).toFixed(2));
           
        },
        err => {
          let errMessage = err;
          this._spinner.hide();
          console.log(errMessage);
          this._notification.errorMessage(errMessage);
        });
    }            
    
  }

   onChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    console.log(tab);
    if (tab === "List All Companies" || tab === "Add Stock") {
      this.loadData();
    }
  }

  loadData() {
    this._spinner.show();

    this._companyService.getAllCompany()
      .subscribe(
        data => {

          this._spinner.hide();
          if (data == null || data.length == 0) {
            this._notification.infoMessage({ message: 'Companies', subText: 'No data available!' });
          }
          console.log("Observable Data:", data);          
          this.allCompanyData=data;
          this.allCompanyCodesData(this.allCompanyData);          
        },
        err => {
          let errMessage = err;
          this._spinner.hide();
          console.log(errMessage);
          this._notification.errorMessage(errMessage);
        });
  }
  getCompanyCode(event:any){
    this.companyCodes=event;
  }

  onItemChanged(event:any) {
    let item1 = this.allCompanyData.find(i => i.code == event);
    if(item1){
      this.companyDetails1=item1;
      this.isDataAvailable1=true;
      this.dataSource1 = new MatTableDataSource(this.companyDetails1.stocks);
      this.dataSource1.paginator = this.paginator;
    }
    else{
      this.isDataAvailable1=false;
    }
  }

  allCompanyCodesData(data:Company[]){
    data.forEach(element => {
      if(this.allCompanyCodes.indexOf(element.code) === -1){
        this.allCompanyCodes.push(element.code)
      }          
  });    
  }

  onStockSubmit(formDirective: FormGroupDirective){
    if (this.stockForm.valid && this.companyCodes) {
      this._spinner.show();
            var price=new Object({
                  price:this.stockPrice
            });
        this._companyService.AddStock(this.companyCodes, price)
          .subscribe(
            data => {

              this._spinner.hide();
              if (data) {                
                this._notification.successMessage({ responseType: 'Company Stock', message: 'Company Stock has been added successfully!' });
              }
              else {
                this._notification.errorMessage('Company Stock has not been added');
              }

              console.log("Observable Data:", data);

            },
            err => {
              let errMessage = err.error;
              this._spinner.hide();
              console.log(errMessage);
              this._notification.errorMessage(errMessage);
            });      
    }
  }

  onSubmit(formDirective: FormGroupDirective) {

    if (this.companyForm.valid) {
      this._spinner.show();
            
        this._companyService.AddCompany(this.Company)
          .subscribe(
            data => {

              this._spinner.hide();
              if (data) {                
                this._notification.successMessage({ responseType: 'Company', message: 'Company has been added successfully!' });
              }
              else {
                this._notification.errorMessage('Company has not been added');
              }

              console.log("Observable Data:", data);

            },
            err => {
              let errMessage = err.error;
              this._spinner.hide();
              console.log(errMessage);
              this._notification.errorMessage(errMessage);
            });      
    }
  }
  searchCompany(code: any) {
    this._spinner.show();
    this._companyService.getSpecificCompany(code)
      .subscribe(
        data => {
          this._spinner.hide();
          if (data != null) {
            this.companyDetails = data;
            console.log("Observable Data:", data);
            this.isDataAvailable = true;
            this.dataSource = new MatTableDataSource(data.stocks);
          }
          else {
            this.isDataAvailable = false;
            this._notification.infoMessage({ message: 'Company', subText: 'No data available for this comany code' });
          }
        },
        err => {
          let errMessage = err;
          this._spinner.hide();
          console.log(errMessage);
          this._notification.errorMessage(errMessage);
        });
  }
  ngOnInit(): void {
  }

}
