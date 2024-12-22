import {
  ISignUpHandler,
  ILoginHandler,
  ILogoutHandler,
  IRefreshHandler,
  IResetPasswordHandler,
  IMeRouteHandler,
  IVerifyEmailHandler,
  IForgotPasswordHandler,
  ISendOtpHandler,
} from '@baijanstack/express-auth';
import { userRepo } from '../../../../libs/lms-prisma/src/user-repo';

export type TUser = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  is_email_verified: boolean;
};

type TEmailObj = {
  email: string;
};

interface TSignUpBodyInput extends TEmailObj {
  fullname: string;
  username: string;
  password: string;
}

export class SignUpHandler implements ISignUpHandler {
  constructor() {}
  doesUserExists: (body: TSignUpBodyInput) => Promise<boolean> = async (
    body
  ) => {
    const user = await userRepo.findByEmail(body.email);
    return !!user;
  };
  saveUser: (body: TSignUpBodyInput, hashedPassword: string) => Promise<void> =
    async (body, hashedPassword) => {
      await userRepo.create({
        id: crypto.randomUUID(),
        fullname: body.fullname,
        username: body.username,
        email: body.email,
        password: hashedPassword,
        is_email_verified: false,
      });
    };
}

export class LoginHandler implements ILoginHandler {
  getUserByEmail: (email: string) => Promise<TUser | null> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return null;
    }

    return {
      fullname: user?.fullname,
      username: user?.username,
      email: user?.email,
      password: user?.password,
      is_email_verified: user?.is_email_verified,
    };
  };

  getTokenPayload: (email: string) => Promise<{
    fullname: string;
    username: string;
    email: string;
  } | null> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return null;
    }

    return {
      email: user?.email,
      username: user?.username,
      fullname: user?.fullname,
    };
  };
}

export class LogoutHandler implements ILogoutHandler {
  shouldLogout: () => Promise<boolean> = async () => {
    return true;
  };
}

export class RefreshHandler implements IRefreshHandler {
  getTokenPayload: (email: string) => Promise<{
    fullname: string;
    username: string;
    email: string;
  } | null> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return null;
    }

    return {
      email: user?.email,
      username: user?.username,
      fullname: user?.fullname,
    };
  };
}

export class ResetPasswordHandler implements IResetPasswordHandler {
  saveHashedPassword: (email: string, hashedPassword: string) => Promise<void> =
    async (email, hashedPassword) => {
      await userRepo.updateByEmail(email, {
        password: hashedPassword,
      });
    };
  getOldPasswordHash: (email: string) => Promise<string> = async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return '';
    }
    return user.password;
  };
}

export class MeRouteHandler implements IMeRouteHandler {
  getMeByEmail: (
    email: string
  ) => Promise<{ email: string; username: string; fullname: string } | null> =
    async (email) => {
      const user = await userRepo.findByEmail(email);

      if (!user) {
        return null;
      }

      return {
        fullname: user?.fullname,
        username: user?.username,
        email: user?.email,
      };
    };
}

export class VerifyEmailHandler implements IVerifyEmailHandler {
  updateIsEmailVerifiedField: (email: string) => Promise<void> = async (
    email
  ) => {
    await userRepo.updateByEmail(email, { is_email_verified: true });
  };

  isEmailAlreadyVerified: (email: string) => Promise<boolean> = async (
    email
  ) => {
    const user = await userRepo.findByEmail(email);
    return !user?.is_email_verified;
  };
}

export class SendOtpHandler implements ISendOtpHandler {
  doesUserExists: (email: string) => Promise<boolean> = async (email) => {
    const user = await userRepo.findByEmail(email);
    return !!user;
  };
}

export class ForgotPasswordHandler implements IForgotPasswordHandler {
  saveNewPassword: (email: string, password: string) => Promise<void> = async (
    email,
    password
  ) => {
    await userRepo.updateByEmail(email, {
      password,
    });
  };
}
