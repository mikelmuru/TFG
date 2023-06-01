import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatDemoComponent } from './main-chat-demo.component';

describe('MainChatDemoComponent', () => {
  let component: MainChatDemoComponent;
  let fixture: ComponentFixture<MainChatDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainChatDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainChatDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
