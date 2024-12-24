import {TConfig} from "@baijanstack/express-auth"
export const config: TConfig={
   ACCESS_TOKEN_AGE:Number(process.env['Access_Token_Age'])|| 120,
   BASE_PATH:'/auth',
   OTP_AGE:Number(process.env['OTP_AGE'])||60,
   OTP_SECRET:process.env["OTP_SECRET"]||'',
   REFRESH_TOKEN_AGE:Number(process.env['REFRESH_TOKEN_AGE'])||172800,
   SALT_ROUNDS:Number(process.env['SALT_ROUNDS'])||10,
   TOKEN_SECRET:process.env['TOKEN_SECRET']||'',
}