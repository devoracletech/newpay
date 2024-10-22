import nodemailer from 'nodemailer';
import { compileTemplate, paymentSuccessTemplate, paymentFailedTemplate, lowBalanceTemplate } from './emailTemplates';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const sendEmail = async (options: EmailOptions) => {
  try {
    await transporter.sendMail({
      from: `"PayEase" <${process.env.SMTP_USER}>`,
      ...options,
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

export const sendPaymentSuccessEmail = async (user: any, payment: any) => {
  const html = compileTemplate(paymentSuccessTemplate, {
    firstName: user.firstName,
    amount: payment.amount.toLocaleString(),
    transactionId: payment.id,
    date: new Date(payment.createdAt).toLocaleString(),
    paymentMethod: payment.method,
    description: payment.description,
    newBalance: user.balance.toLocaleString(),
  });

  return sendEmail({
    to: user.email,
    subject: 'Payment Successful',
    html,
  });
};

export const sendPaymentFailedEmail = async (user: any, payment: any, reason: string) => {
  const html = compileTemplate(paymentFailedTemplate, {
    firstName: user.firstName,
    amount: payment.amount.toLocaleString(),
    transactionId: payment.id,
    date: new Date(payment.createdAt).toLocaleString(),
    reason,
  });

  return sendEmail({
    to: user.email,
    subject: 'Payment Failed',
    html,
  });
};

export const sendLowBalanceAlert = async (user: any, threshold: number) => {
  const html = compileTemplate(lowBalanceTemplate, {
    firstName: user.firstName,
    balance: user.balance.toLocaleString(),
    threshold: threshold.toLocaleString(),
  });

  return sendEmail({
    to: user.email,
    subject: 'Low Balance Alert',
    html,
  });
};