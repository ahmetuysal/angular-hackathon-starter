import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { uniqueUsernameValidator } from '../../validators/unique-username.validator';
import { SignupRequest } from '../../request/signup-request.model';
import { uniqueEmailValidator } from '../../validators/unique-email-validator';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPageComponent implements OnInit, AfterViewInit {
  credentials: FormGroup;
  waiting = false;
  @ViewChild('focusInitial') focusInitial: ElementRef<
    HTMLInputElement
  >;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      name: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$')
        ]
      }),
      lastName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$')
        ]
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          uniqueEmailValidator(this.authService, this.changeDetectorRef)
        ]
      }),
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9\\-]+$'),
          Validators.maxLength(20)
        ],
        asyncValidators: [
          uniqueUsernameValidator(this.authService, this.changeDetectorRef)
        ]
      }),
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.focusInitial.nativeElement.focus());
  }

  async submit() {
    if (this.credentials.invalid || this.waiting) {
      return;
    }

    this.waiting = true;

    const name = this.credentials.controls.name.value.trim();
    const indexSpace = name.indexOf(' ');

    const firstName = indexSpace !== -1 ? name.substring(0, indexSpace) : name;

    const signupRequest = new SignupRequest(
      firstName,
      this.credentials.controls.lastName.value.trim(),
      this.credentials.controls.email.value.trim(),
      this.credentials.controls.username.value.trim(),
      this.credentials.controls.password.value.trim()
    );

    // Don't have to check indexSpace == name.length - 1 due to trim
    if (indexSpace !== -1) {
      signupRequest.middleName = name.substring(indexSpace + 1);
    }

    const success = await this.authService.attemptSignup(signupRequest);

    if (success) {
      this.router.navigateByUrl('/login');
    } else {
      this.waiting = false;
      this.changeDetectorRef.markForCheck();
    }
  }
}
