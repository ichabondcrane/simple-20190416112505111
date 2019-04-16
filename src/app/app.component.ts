
import { Component} from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {Http, Response} from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'app';
  myData: Array <any> ;
  displayedColumns = ['ID', 'STATUS', 'DESCRIPTION'];
  dataSource: MyDataSource;

  constructor(private http: Http) {
    this.getData();
  }

  public getData() {
    let url = '/api/posts/db2.service/selectdata';
    this.http.get(url)
      .map(response => response.json())
      .subscribe(res => {
        this.myData = res;
        this.dataSource = new MyDataSource(this.myData);
      });
  }
}

export class MyDataSource extends DataSource<any> {
  constructor(private data: Post[]) {
    super();
  }
  connect(): Observable<Post[]> {
    return Observable.of(this.data);
  }

  disconnect() {}

  }
// eol: cloud be placed on a model folder
  export class Post {
    constructor (
        public ID: String,
        public STATUS: String,
        public DESCRIPTION: String
    ) { }
}