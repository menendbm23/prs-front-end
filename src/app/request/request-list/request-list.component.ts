import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/system.service';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requests: Request[] = [];
  users: User[] = [];
  searchCriteria: string = "";

  constructor(
    private sys: SystemService,
    private rqs: RequestService,
    private usrsvc: UserService
  ) { }

  ngOnInit(): void {
    this.usrsvc.list().subscribe(
      res => {
        console.log("User", res)
        this.users = res as User[];
      },
      err => {console.error(err); }
    );
    this.rqs.list().subscribe(
      res => {
        console.log("Request:", res)
        this.requests = res as unknown as Request[];
      },
      err => { console.error(err); }
    );
  }

}
