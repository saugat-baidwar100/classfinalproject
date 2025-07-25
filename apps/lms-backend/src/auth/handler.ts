import { Request } from 'express';
import { Role } from '@prisma/client';
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
  validateAccessToken,
} from '@baijanstack/express-auth';
import { userRepo } from '../../../../libs/lms-prisma/src/user-repo';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export type TUser = {
  id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: Role;
};

interface TSignUpBodyInput {
  fullname: string;
  role: Role;
  username: string;
  email: string;
  password: string;
}

export class SignUpHandler implements ISignUpHandler {
  doesUserExists = async (body: TSignUpBodyInput): Promise<boolean> => {
    const user = await userRepo.findByEmail(body.email);
    return !!user;
  };

  saveUser = async (
    body: TSignUpBodyInput,
    hashedPassword: string
  ): Promise<void> => {
    console.log('Saving User with Role:', body.role);
    await userRepo.create({
      id: crypto.randomUUID(),
      fullname: body.fullname,
      username: body.username,
      email: body.email,
      role: body.role as Role,
      password: hashedPassword,
      is_email_verified: false,
    });
  };
}

export class LoginHandler implements ILoginHandler {
  getUserByEmail = async (email: string): Promise<TUser | null> => {
    const user = await userRepo.findByEmail(email);
    if (!user) return null;
    return user;
  };

  comparePassword = async (
    email: string,
    enteredPassword: string
  ): Promise<boolean> => {
    const user = await this.getUserByEmail(email);
    if (!user || !user.password) {
      throw new Error('User not found or password is missing');
    }
    const match = await bcrypt.compare(enteredPassword, user.password);
    return match;
  };

  getTokenPayload = async (
    email: string
  ): Promise<{
    fullname: string;
    username: string;
    role: Role;
    email: string;
  } | null> => {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    return {
      fullname: user.fullname,
      username: user.username,
      role: user.role,
      email: user.email,
    };
  };
}

export class LogoutHandler implements ILogoutHandler {
  shouldLogout = async (): Promise<boolean> => true;
}

export class RefreshHandler implements IRefreshHandler {
  getTokenPayload = async (
    email: string
  ): Promise<{
    fullname: string;
    username: string;
    role: Role;
    email: string;
  } | null> => {
    const user = await userRepo.findByEmail(email);
    if (!user) return null;
    return {
      fullname: user.fullname,
      username: user.username,
      role: user.role,
      email: user.email,
    };
  };
}

export class ResetPasswordHandler implements IResetPasswordHandler {
  saveHashedPassword = async (
    email: string,
    hashedPassword: string
  ): Promise<void> => {
    await userRepo.updateByEmail(email, { password: hashedPassword });
  };

  getOldPasswordHash = async (email: string): Promise<string> => {
    const user = await userRepo.findByEmail(email);
    return user ? user.password : '';
  };
}

export class MeRouteHandler implements IMeRouteHandler {
  getMeByEmail = async (
    email: string
  ): Promise<{
    fullname: string;
    username: string;
    role: Role;
    email: string;
  } | null> => {
    const user = await userRepo.findByEmail(email);
    if (!user) return null;
    return {
      fullname: user.fullname,
      username: user.username,
      role: user.role,
      email: user.email,
    };
  };
}

export class VerifyEmailHandler implements IVerifyEmailHandler {
  updateIsEmailVerifiedField = async (email: string): Promise<void> => {
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
  doesUserExists = async (email: string): Promise<boolean> => {
    const user = await userRepo.findByEmail(email);
    return !!user;
  };
}

export class ForgotPasswordHandler implements IForgotPasswordHandler {
  saveNewPassword = async (email: string, password: string): Promise<void> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepo.updateByEmail(email, { password: hashedPassword });
  };
}
