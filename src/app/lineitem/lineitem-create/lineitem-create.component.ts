import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';
import { RequestService } from 'src/app/request/request.service';
import { LineItem } from '../lineitem.class';
import { LineItemService } from '../lineitem.service';

@Component({
  selector: 'app-lineitem-create',
  templateUrl: './lineitem-create.component.html',
  styleUrls: ['./lineitem-create.component.css']
})
export class LineitemCreateComponent implements OnInit {

  lineitems: LineItem = new LineItem();
  products: Product[] = [];
  request: Request = null;

  constructor(
    private lis: LineItemService,
    private rqs: RequestService,
    private prdsvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  compFn(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }

  save(): void {
    console.log("Before create", this.lineitems);
    this.lis.create(this.lineitems).subscribe(
      res => {
        console.log("Create Successful");
        this.router.navigateByUrl("requests/list");
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
    this.prdsvc.list().subscribe(
      res => {
        console.log("Products:", res)
        this.products = res as Product[];
      },
      err => { console.error(err); }
    );
    let rid = this.route.snapshot.params.rid;
    this.rqs.get(+rid).subscribe(
      res => {
        console.log("Successful");
        this.lineitems.request = res;
        },
        err => {
          console.error(err);
        }
    );
  }
    
}
