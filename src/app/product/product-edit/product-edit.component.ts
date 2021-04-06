import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product = null;
  vendors: Vendor [] = [];

  constructor(
    private sys: SystemService,
    private prdsvc: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private vnd: VendorService
  ) { }

  compFn(a: Vendor, b: Vendor): boolean {
    return a && b && a.id === b.id;
  }
  
  save(): void {
    console.log("Before change:", this.product);
    this.prdsvc.update(this.product).subscribe(
      res => {
        console.log("Edit Succesful!");
        this.router.navigateByUrl("/products/list");
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
    this.vnd.list().subscribe(
      res => { 
        console.log(res) 
        this.vendors = res;
      },
      err => { console.error(err); }
    );
    let id = this.route.snapshot.params.id;
    this.prdsvc.get(+id).subscribe(
      res => {
        console.log("Product: ", res)
        this.product = res;
      },
      err => {
        console.error(err);
      }
    );
  }
}
