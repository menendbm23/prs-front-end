import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Request } from '../request.class';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {

  request: Request = null;

  constructor(
    private rqs: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  save(): void {
    console.log("Before Change", this.request);
    this.rqs.update(this.request).subscribe(
      res => {
        console.log("Edit Successful!");
        this.router.navigateByUrl("requests/list");
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.rqs.get(+id).subscribe(
      res => {
        console.log("Request: ", res);
        this.request = res;
      },
      err => {
        console.error(err);
      }
    );
  }

}
