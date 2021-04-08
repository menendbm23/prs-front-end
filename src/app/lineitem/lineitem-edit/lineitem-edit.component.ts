import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';
import { RequestService } from 'src/app/request/request.service';
import { LineItem } from '../lineitem.class';
import { LineItemService } from '../lineitem.service';

@Component({
  selector: 'app-lineitem-edit',
  templateUrl: './lineitem-edit.component.html',
  styleUrls: ['./lineitem-edit.component.css']
})
export class LineitemEditComponent implements OnInit {

  lineitems: LineItem = null;
  products: Product[] = [];
  requests: Request = null;
  id: number = 0;


  constructor(
    private lis: LineItemService,
    private prdsvc: ProductService,
    private rqs: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  compFn(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }


  save(): void {
    console.log("Before change:", this.lineitems);
    this.lis.update(this.lineitems).subscribe(
      res => {
        console.log("Edit Successful!");
        this.router.navigateByUrl(`/requestline/list/${this.lineitems.request.id}`)
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
  
    let id = this.route.snapshot.params.id;
    this.lis.get(+id).subscribe(
      res => {
        console.log("Line Item:", res);
        this.lineitems = res;
      },
      err => {
        console.error(err);
      }
    );
  }

}
