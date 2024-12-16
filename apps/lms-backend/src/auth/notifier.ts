import { INotifyService } from '@baijanstack/express-auth';
import { logger } from '@skillprompt-lms/libs/api-contract/utils/logger';
import { text } from 'stream/consumers';
import { sendingEmail } from '../utils/mailer';


export class EmailNotificationService implements INotifyService {
  async sendTokenStolen(email: string): Promise<void> {
    logger.info(`Notifying | TOKEN_STOLEN | Email: ${email}`);
  }
  async sendOtp(
    email: string,
    payload: { code: string; generatedAt: number }
  ): Promise<void> {
    sendingEmail({to:email,subject:`Your Otp`, text:`The Otp for your email verification is ${payload.code}`})
    logger.info({ payload }, `Notifying | OTP | Email: ${email}`);
  }
  async notifyEmailVerified(email: string): Promise<void> {
    sendingEmail({to:email,subject:`Your Otp`, text:`Congratulations!! Your OTP is verified successfully `})
    logger.info(`Notifying | EMAIL_VERIFIED | Email: ${email}`);
  }
}
