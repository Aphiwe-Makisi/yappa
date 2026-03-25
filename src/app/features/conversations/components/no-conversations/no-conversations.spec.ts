import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoConversations } from './no-conversations';

describe('NoConversations', () => {
  let component: NoConversations;
  let fixture: ComponentFixture<NoConversations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoConversations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoConversations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
