import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { Request } from '../request.class';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  request: Request = null;
  id: number = 0;
  showVerify: boolean = false;

  constructor(
    private rqs: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  delete(): void {
    this.rqs.remove(this.request).subscribe(
      res => {
        console.log("Delete was successful!");
        this.router.navigateByUrl("/requests/list");
      },
      err => {
        console.error(err);
      }
    );
  }

  edit(): void {
    this.router.navigateByUrl(`/requests/edit/${this.id}`);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
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

}
