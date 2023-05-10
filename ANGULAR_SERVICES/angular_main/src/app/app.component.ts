import { Component, OnInit } from '@angular/core';
import { ChatDemoDTO } from './dtos/ChatDemoDTO';
import { MainChatDemoComponent } from './componentes/main-chat-demo/main-chat-demo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}

