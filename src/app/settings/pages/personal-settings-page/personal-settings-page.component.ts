import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { StateService } from '../../../core/services/state.service';
import * as moment from 'moment';
import { UserService } from '../../../core/http/user.service';

@Component({
  selector: 'app-personal-settings-page',
  templateUrl: './personal-settings-page.component.html',
  styleUrls: ['./personal-settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalSettingsPageComponent implements OnInit {
  formGroup: FormGroup;
  currentDate = moment.utc();
  waiting = false;

  constructor(
    private readonly stateService: StateService,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef
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

  async updatePersonalSettings() {
    if (this.formGroup.invalid) {
      return;
    }
    this.waiting = true;

    const currentUser = this.stateService.getCurrentUser();

    const name = this.formGroup.controls.name.value.trim();
    const indexSpace = name.indexOf(' ');

    const firstName = indexSpace !== -1 ? name.substring(0, indexSpace) : name;
    currentUser.firstName = firstName;

    if (indexSpace !== -1) {
      currentUser.middleName = name.substring(indexSpace + 1);
    }

    currentUser.lastName = this.formGroup.controls.lastName.value.trim();

    currentUser.image = this.formGroup.controls.image.value.trim();

    currentUser.birthDate = this.formGroup.controls.birthDate.value;

    this.userService.updateUser(currentUser).subscribe(isUpdated => {
      this.waiting = false;
      this.changeDetectorRef.markForCheck();
      // TODO: notify user with snackbar
      console.log(isUpdated);
    });
  }
}
