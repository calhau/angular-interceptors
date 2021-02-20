import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'projeto-interceptor';

  constructor(private http: HttpClient){

  }

  ngOnInit(){
    this.http.get('http://jsonplaceholder.typicode.com/users')
      .subscribe( data =>
        console.log('Aqui Bruno: ', data))
  }
}

