import { Application } from 'express';
import { initAuth, RouteGenerator } from '@baijanstack/express-auth';
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

  return routeGenerator;
}
