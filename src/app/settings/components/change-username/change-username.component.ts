import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StateService } from '../../../core/services/state.service';
import { uniqueUsernameValidator } from '../../../core/validators/unique-username.validator';
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../core/http/user.service';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeUsernameComponent implements OnInit {
  waiting = false;
  usernameControl: FormControl;

  constructor(
    private readonly stateService: StateService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.usernameControl = new FormControl(
      this.stateService.getCurrentUser().username,
      {
        validators: [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9\\-]+$'),
          Validators.maxLength(20)
        ],
        asyncValidators: [
          uniqueUsernameValidator(this.authService, this.changeDetectorRef)
        ]
      }
    );
  }

  async updateUsername() {
    if (this.usernameControl.invalid) {
      return;
    }
    this.waiting = true;
    const currentUser = this.stateService.getCurrentUser();
    currentUser.username = this.usernameControl.value.trim();

    this.userService.updateUser(currentUser).subscribe(isUpdated => {
      this.waiting = false;
      this.changeDetectorRef.markForCheck();
      // TODO: notify user with snackbar
      console.log(isUpdated);
    });
  }
}
