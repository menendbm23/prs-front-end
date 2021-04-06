import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/system.service';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products: Product[] = [];
  vendors: Vendor[] = [];
  searchCriteria: string = "";


  constructor(
    private sys: SystemService,
    private prdsvc: ProductService,
    private vnd: VendorService
  ) { }

  ngOnInit(): void {
    this.vnd.list().subscribe(
      res => {
        console.log("Vendor", res)
        this.vendors = res as Vendor[];
      },
      err => {console.error(err); }
    );
    this.prdsvc.list().subscribe(
      res => {
        console.log("Product:", res)
        this.products = res as Product[];
      },
      err => { console.error(err); }
    );
  }
}
