import { Component, OnInit } from '@angular/core';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  vendors: Vendor[] = [];
  searchCriteria: string = "";

  constructor(
    private vndsvc: VendorService
  ) { }

  ngOnInit(): void {
    this.vndsvc.list().subscribe(
      res => {
        console.log("Vendor:", res)
        this.vendors = res as Vendor[];
      },
      err => { console.error(err); }
    );
  }

}
