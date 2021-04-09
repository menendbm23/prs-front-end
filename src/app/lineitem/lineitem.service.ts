import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Request } from '../request/request.class';
import { LineItem } from "./lineitem.class";

@Injectable({
    providedIn: 'root'
})

export class LineItemService {
    
    baseurl: string = "http://localhost:8080/api/line-items/";

    constructor(
        private http:HttpClient
    ) { }

    getLinesByPr(id: number): Observable<LineItem[]> {
        return this.http.get(`${this.baseurl}/lines-for-pr/${id}`) as Observable<LineItem[]>;

    }

    get(id: number): Observable<LineItem> {
        return this.http.get(`${this.baseurl}/${id}`) as Observable<LineItem>;
    }

    create(lineitem: LineItem): Observable<LineItem> {
    return this.http.post(`${this.baseurl}`, lineitem) as Observable<LineItem>;

    }

    update(lineitem: LineItem): Observable<LineItem> {
        return this.http.put(`${this.baseurl}`, lineitem) as Observable<LineItem>;
    }

    remove(lineitem: LineItem): Observable<LineItem> {
        return this.http.delete(`${this.baseurl}/${lineitem.id}`) as Observable<LineItem>;
      }
}