import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRoleComponent } from './agent-role.component';

describe('AgentRoleComponent', () => {
  let component: AgentRoleComponent;
  let fixture: ComponentFixture<AgentRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
