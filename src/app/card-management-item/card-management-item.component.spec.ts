import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardManagementItemComponent } from './card-management-item.component';

describe('CardManagementItemComponent', () => {
  let component: CardManagementItemComponent;
  let fixture: ComponentFixture<CardManagementItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardManagementItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardManagementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
