import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { LoginRequest } from '../../request/login-request.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit, AfterViewInit {
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
      identifier: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    if (this.focusInitial !== undefined) {
      this.focusInitial.nativeElement.focus();
    }
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.focusInitial.nativeElement.focus());
  }

  async submit() {
    if (this.credentials.invalid) {
      return;
    }
    this.waiting = true;
    const loginRequest = new LoginRequest(
      this.credentials.value.identifier,
      this.credentials.value.password
    );

    const success = await this.authService.attemptAuth(loginRequest);

    if (success) {
      this.router.navigateByUrl('/');
    } else {
      this.waiting = false;
      this.changeDetectorRef.markForCheck();
    }
  }
}
