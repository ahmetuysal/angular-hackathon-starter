import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsPageComponent } from './account-settings-page.component';

describe('AccountSettingsPageComponent', () => {
  let component: AccountSettingsPageComponent;
  let fixture: ComponentFixture<AccountSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
