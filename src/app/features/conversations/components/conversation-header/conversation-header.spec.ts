import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationHeader } from './conversation-header';

describe('ConversationHeader', () => {
  let component: ConversationHeader;
  let fixture: ComponentFixture<ConversationHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
