import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvisageTimelogComponent } from './envisage-timelog.component';

describe('EnvisageTimelogComponent', () => {
  let component: EnvisageTimelogComponent;
  let fixture: ComponentFixture<EnvisageTimelogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvisageTimelogComponent]
    });
    fixture = TestBed.createComponent(EnvisageTimelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
