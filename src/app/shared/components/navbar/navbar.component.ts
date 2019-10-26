import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { StateService } from '../../../core/services/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    readonly authService: AuthService,
    readonly stateService: StateService
  ) {}

  ngOnInit() {}

  logOut() {
    this.authService.signOut();
  }
}
