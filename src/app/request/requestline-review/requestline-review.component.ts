import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/lineitem/lineitem.class';
import { LineItemService } from 'src/app/lineitem/lineitem.service';
import { SystemService } from 'src/app/system.service';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { RequestService } from '../request.service';
import { Request } from '../request.class';

@Component({
  selector: 'app-requestline-review',
  templateUrl: './requestline-review.component.html',
  styleUrls: ['./requestline-review.component.css']
})
export class RequestlineReviewComponent implements OnInit {

  request: Request = null;
 
  users: User[] = [];
  lineitems: LineItem[] = [];
  requestId: number = 0;
  id: number = 0;
  showVerify: boolean = false;

  constructor(
    private sys: SystemService,
    private rqs: RequestService,
    private usrsvc: UserService,
    private lis: LineItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  approve(): void {
    this.rqs.approve(this.request).subscribe(
      res => { console.log("Success", res); this.refresh(); },

      err => { console.error(err);
      }
    )
  }

  reject(): void {
    this.rqs.reject(this.request).subscribe(
      res => { console.log("Success", res); this.refresh(); },

      err => { console.error(err); 
      } 
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
    this.requestId = +this.route.snapshot.params.id;
    let id = this.route.snapshot.params.id;
    this.rqs.get(+id).subscribe(
      res => {
        console.log(res);
        this.request = res;
      },
      err => {console.error(err); }
    );
    this.lis.getLinesByPr(+this.requestId).subscribe(
      res => {
        console.log("LineItems", res)
        this.lineitems = res as LineItem[];
      },
      err => {console.error(err); }
    );
   
  }

}
