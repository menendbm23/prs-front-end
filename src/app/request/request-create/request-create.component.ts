import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/system.service';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service'

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  request: Request = new Request();
  users: User[] = [];

  constructor(
    private sys: SystemService,
    private rqs: RequestService,
    private usrsvc: UserService,
    private Route: ActivatedRoute,
    private router: Router
  ) { }

  save(): void {
    console.log("Before Create", this.request);
    this.rqs.create(this.request).subscribe(
      res => {
        console.log("Create Successful!");
        this.router.navigateByUrl("requests/list");
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
    this.sys.chkLogin();
    this.request.user = this.sys.loggedInUser;
  }

}
