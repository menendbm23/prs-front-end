import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  vendor: Vendor = null;

  constructor(
    private vndsvc: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  save(): void {
    console.log("Before Change", this.vendor);
    this.vndsvc.update(this.vendor).subscribe(
      res => {
        console.log("Edit Successful!");
        this.router.navigateByUrl("/vendors/list");
      },
      err => {
        console.error(err);
      }
    );
  }
  
  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.vndsvc.get(+id).subscribe(
      res => {
        console.log("Vendor:", res);
        this.vendor = res;
      },
      err => {
        console.error(err);
      }
    );
  }

}
