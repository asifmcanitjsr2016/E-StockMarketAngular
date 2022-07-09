import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../Models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private _http:HttpClient) { }

  AddCompany(companyData: Company): Observable<any>{    
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(companyData);

    return this._http.post<any>(environment.baseUrl[0] + '/register', body, {'headers':headers})
    .pipe(
      map(res =>{
        console.log("data:", res);
        return res;
      }),      
         catchError((err) => {
           console.error(err);
           throw err;
         })
    );
  }  

  AddStock(companyCode:any, stockPrice: any): Observable<any>{    
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(stockPrice);

    return this._http.post<any>(environment.baseUrl[1] + '/add?companycode='+companyCode, body, {'headers':headers})
    .pipe(
      map(res =>{
        console.log("data:", res);
        return res;
      }),      
         catchError((err) => {
           console.error(err);
           throw err;
         })
    );
  }

  getAllCompany(): Observable<any>{
    
    const headers = { 'content-type': 'application/json'}      

    return this._http.get<any>(environment.baseUrl[0] + '/getall', {'headers':headers})
    .pipe(
      map(res =>{
        console.log("data:", res);
        return res;
      }),      
         catchError((err) => {
           console.error(err);
           throw err;
         })
    );
  }  

  getSpecificCompany(companyCode:any): Observable<any>{
    
    const headers = { 'content-type': 'application/json'}      

    return this._http.get<any>(environment.baseUrl[0] + '/info?companycode='+companyCode, {'headers':headers})
    .pipe(
      map(res =>{
        console.log("data:", res);
        return res;
      }),      
         catchError((err) => {
           console.error(err);
           throw err;
         })
    );
  }

  getStocks(companyCode:any, startDate:any, endDate:any): Observable<any>{
    
    const headers = { 'content-type': 'application/json'}      

    return this._http.get<any>(environment.baseUrl[1] + '/get?companycode='+companyCode+'&startdate='+startDate+'&enddate='+endDate, {'headers':headers})
    .pipe(
      map(res =>{
        console.log("data:", res);
        return res;
      }),      
         catchError((err) => {
           console.error(err);
           throw err;
         })
    );
  }
}