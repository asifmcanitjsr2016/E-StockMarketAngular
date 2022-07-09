import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatSnackBarRef, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar'

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<SuccessMessageComponent>, @Inject(MAT_SNACK_BAR_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
