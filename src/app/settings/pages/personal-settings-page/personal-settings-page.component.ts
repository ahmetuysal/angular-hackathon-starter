import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { StateService } from '../../../core/services/state.service';
import * as moment from 'moment';

@Component({
  selector: 'app-personal-settings-page',
  templateUrl: './personal-settings-page.component.html',
  styleUrls: ['./personal-settings-page.component.scss']
})
export class PersonalSettingsPageComponent implements OnInit {
  formGroup: FormGroup;
  currentDate = moment();
  constructor(
    private readonly stateService: StateService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const currentUser = this.stateService.getCurrentUser();
    const name = currentUser.middleName
      ? `${currentUser.firstName} ${currentUser.middleName}`
      : currentUser.firstName;
    this.formGroup = this.formBuilder.group({
      name: new FormControl(name, {
        validators: [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$')
        ]
      }),
      lastName: new FormControl(currentUser.lastName, {
        validators: [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$')
        ]
      }),
      image: new FormControl(currentUser.image),
      birthDate: new FormControl(currentUser.birthDate)
    });
  }
}
