import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { InfoMessageComponent } from '../info-message/info-message.component';
import { SuccessMessageComponent } from '../success-message/success-message.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackbar:MatSnackBar) { }

  errorMessage(message:any){
    this._snackbar.openFromComponent(ErrorMessageComponent, {
      duration:2000,
      panelClass: 'errorSnackbar',
      horizontalPosition: 'end',
      data: message
    });
  }

  successMessage(messageData:any){
    this._snackbar.openFromComponent(SuccessMessageComponent, {
          duration:2000,
          panelClass: 'successSnackbar',
          horizontalPosition: 'end',
          data: messageData
        });
  }

  infoMessage(message:any){
    this._snackbar.openFromComponent(InfoMessageComponent, {
      duration:2000,
      panelClass: 'infoSnackbar',
      horizontalPosition: 'end',
      data: message
    });
  }
}