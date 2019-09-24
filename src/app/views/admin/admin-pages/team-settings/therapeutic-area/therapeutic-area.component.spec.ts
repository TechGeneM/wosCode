import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapeuticAreaComponent } from './therapeutic-area.component';

describe('TherapeuticAreaComponent', () => {
  let component: TherapeuticAreaComponent;
  let fixture: ComponentFixture<TherapeuticAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapeuticAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapeuticAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
