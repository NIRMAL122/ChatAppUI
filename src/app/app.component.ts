import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http:HttpClient){ }

  username= 'username';
  message='';
  messages:any=[];

  ngOnInit():void{

    Pusher.logToConsole = true;

    const pusher = new Pusher('6339958fab01b621d248', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('Chat');
    channel.bind('message', (data: string) => {
      this.messages.push(data);
    });
  }

  submit():void{
    this.http.post('https://localhost:7145/api/messages',{
      Username:this.username,
      Message:this.message
    }).subscribe(()=>this.message='');

  }
}
