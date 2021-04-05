import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  vendor: Vendor = null;
  id: number = 0;
  showVerify: boolean = false;

  constructor(
    private vndsvc: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  toggleVerify(): void {
    this.showVerify = !this.showVerify;
  }

  delete(): void {
    this.vndsvc.remove(this.vendor).subscribe(
      res => {
        console.log("Delete was successful!");
        this.router.navigateByUrl("/vendors/list");
      },
      err => {
        console.error(err);
      }
    );
  }

  edit(): void {
    this.router.navigateByUrl(`/vendors/edit/${this.id}`);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.vndsvc.get(+this.id).subscribe(
      res => {
        console.log("User:", res);
        this.vendor = res;
      },
      err => {
        console.error(err);
      }
    );
  }
}
