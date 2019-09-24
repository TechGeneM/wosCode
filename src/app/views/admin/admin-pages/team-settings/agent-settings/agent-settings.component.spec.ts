import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSettingsComponent } from './agent-settings.component';

describe('AgentSettingsComponent', () => {
  let component: AgentSettingsComponent;
  let fixture: ComponentFixture<AgentSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
