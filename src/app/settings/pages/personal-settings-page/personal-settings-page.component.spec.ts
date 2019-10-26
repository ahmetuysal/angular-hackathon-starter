import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSettingsPageComponent } from './personal-settings-page.component';

describe('PersonalSettingsPageComponent', () => {
  let component: PersonalSettingsPageComponent;
  let fixture: ComponentFixture<PersonalSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
