import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-e-stock-tabs',
  templateUrl: './e-stock-tabs.component.html',
  styleUrls: ['./e-stock-tabs.component.css']
})
export class EStockTabsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    console.log(tab);
    if (tab === "Flight Details") {
      
    }
  }

}
