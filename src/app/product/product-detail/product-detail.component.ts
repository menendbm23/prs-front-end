import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = null;
  vendors: Vendor = null;
  id: number = 0;
  showVerify: boolean = false;

  constructor(
    private prdsvc: ProductService,
    private vndsvc: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  delete(): void {
    this.prdsvc.remove(this.product).subscribe(
      res => {
        console.log("Delete was successful!");
        this.router.navigateByUrl("/products/list");
      },
      err => {
        console.error(err);
      }
    );
  }

  edit(): void {
    this.router.navigateByUrl(`/vendors/edit/${this.vendors}`);
    this.router.navigateByUrl(`/products/edit/${this.id}`);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.prdsvc.get(+this.id).subscribe(
      res => {
        console.log("Users:", res);
        this.product = res;
      },
      err => {
        console.error(err);
      }
    );
  }
}
