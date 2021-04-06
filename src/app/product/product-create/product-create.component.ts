import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = new Product();
  vendors: Vendor[] = [];

  constructor(
    private prdsvc: ProductService,
    private vndsvc: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  save(): void {
    console.log("Before Create", this.product);
    this.prdsvc.create(this.product).subscribe(
      res => {
        console.log("Create Successful");
        this.router.navigateByUrl("products/list");
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
    this.vndsvc.list().subscribe(
      res => { 
        console.log(res) 
        this.vendors = res;
      },
      err => { console.error(err); }
    );
  }

}
