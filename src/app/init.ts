import { AuthService } from './core/auth/auth.service';

export function init(authService: AuthService) {
  return async () => {
    await init_auth(authService);
  };
}

export async function init_auth(authService: AuthService) {
  await authService.populate();
}
