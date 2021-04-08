import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { User } from 'src/app/user/user.class';
import { LineItem } from 'src/app/lineitem/lineitem.class';
import { LineItemService } from 'src/app/lineitem/lineitem.service';


@Component({
  selector: 'app-requestline-list',
  templateUrl: './requestline-list.component.html',
  styleUrls: ['./requestline-list.component.css']
})
export class RequestlineListComponent implements OnInit {

  request: Request = null;
  users: User[] = [];
  lineitems: LineItem[] = [];

  id: number = 0;



  constructor(
    private sys: SystemService,
    private rqs: RequestService,
    private router: Router,
    private lis: LineItemService,
    private route: ActivatedRoute
  ) { }

  create(requestId: number) {
    this.router.navigateByUrl(`/lineitem/create/${requestId}`);
  }

  
  review(): void {
    this.rqs.getReviewed(this.request).subscribe(
      res => { console.log(res); this.refresh(); },
      err => { console.error(err); }
    )
  }

  edit(id: number) {
    this.router.navigateByUrl(`/lineitem/edit/${id}`);
  }

  delete(lineitems: LineItem) : void {
    this.rqs.remove(this.request).subscribe(
      res => { console.log(res); },
      err => { console.error(err); } 
    );
  }
  refresh(): void {
    this.id = this.route.snapshot.params.id;
    this.lis.getLinesByPr(this.id).subscribe(
      res => {
        console.log("LineItems:", res);
        this.lineitems = res;
      },
      err => {
        console.error(err);
      }
    );
    this.rqs.get(+this.id).subscribe(
      res => {
        console.log("Request:", res);
        this.request = res;
      },
      err => {
        console.error(err);
  }
    );
  }

  ngOnInit(): void {
    this.refresh();
}
}
