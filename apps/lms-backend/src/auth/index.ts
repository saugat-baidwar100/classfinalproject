import { Application } from 'express';
import {
  initAuth,
  RouteGenerator,
  validateAccessToken,
} from '@baijanstack/express-auth';
import { config } from './config';
import { EmailNotificationService } from './notifier';
import {
  SignUpHandler,
  LoginHandler,
  LogoutHandler,
  RefreshHandler,
  ResetPasswordHandler,
  MeRouteHandler,
  VerifyEmailHandler,
  ForgotPasswordHandler,
  SendOtpHandler,
} from './handler';

export function createAuth(app: Application) {
  const notificationService = new EmailNotificationService();

  const routeGenerator = new RouteGenerator(app, notificationService, config);

  initAuth({
    routeGenerator,
    signUpHandler: new SignUpHandler(),
    loginHandler: new LoginHandler(),
    logoutHandler: new LogoutHandler(),
    refreshHandler: new RefreshHandler(),
    resetPasswordHandler: new ResetPasswordHandler(),
    meRouteHandler: new MeRouteHandler(),
    verifyEmailHandler: new VerifyEmailHandler(),
    forgotPasswordHandler: new ForgotPasswordHandler(),
    sendOtpHandler: new SendOtpHandler(),
  });
  // Protect all authenticated routes with validateAccessToken
  app.use('/protected', validateAccessToken);
  return routeGenerator;
}
