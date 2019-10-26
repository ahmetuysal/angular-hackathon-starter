import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { StateService } from '../../../core/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    readonly stateService: StateService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  logOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/');
  }
}
