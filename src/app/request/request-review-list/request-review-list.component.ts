import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/lineitem/lineitem.class';
import { LineItemService } from 'src/app/lineitem/lineitem.service';
import { SystemService } from 'src/app/system.service';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-review-list',
  templateUrl: './request-review-list.component.html',
  styleUrls: ['./request-review-list.component.css']
})
export class RequestReviewListComponent implements OnInit {

  requests: Request[] = [];
  users: User[] = [];
  lineitems: LineItem[] = [];
  id: number;

  constructor(
    private sys: SystemService,
    private rsqsrv: RequestService,
    private lis: LineItemService,
    private usr: UserService,
    private router: Router,
    private route: ActivatedRoute

  ) { }


  ngOnInit(): void {
    this.sys.chkLogin();
    this.rsqsrv.list().subscribe(
      res => {
        console.log("Request:", res)
        this.requests = res as unknown as Request[];
      },
      err => { console.error(err); }
    );

  }

}
