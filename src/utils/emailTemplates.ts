import Handlebars from 'handlebars';

export const paymentSuccessTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { padding: 20px; font-family: Arial, sans-serif; }
    .header { color: #4F46E5; font-size: 24px; margin-bottom: 20px; }
    .details { margin: 20px 0; }
    .amount { font-size: 20px; font-weight: bold; }
    .footer { margin-top: 30px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Payment Successful</div>
    <p>Dear {{firstName}},</p>
    <p>Your payment has been processed successfully.</p>
    
    <div class="details">
      <p>Transaction Details:</p>
      <p>Amount: ₦{{amount}}</p>
      <p>Transaction ID: {{transactionId}}</p>
      <p>Date: {{date}}</p>
      <p>Payment Method: {{paymentMethod}}</p>
      {{#if description}}
      <p>Description: {{description}}</p>
      {{/if}}
    </div>

    <p>Your new wallet balance is: ₦{{newBalance}}</p>
    
    <div class="footer">
      <p>This is an automated message, please do not reply.</p>
      <p>If you did not authorize this transaction, please contact our support immediately.</p>
    </div>
  </div>
</body>
</html>
`;

export const paymentFailedTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { padding: 20px; font-family: Arial, sans-serif; }
    .header { color: #DC2626; font-size: 24px; margin-bottom: 20px; }
    .details { margin: 20px 0; }
    .footer { margin-top: 30px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Payment Failed</div>
    <p>Dear {{firstName}},</p>
    <p>We were unable to process your payment.</p>
    
    <div class="details">
      <p>Transaction Details:</p>
      <p>Amount: ₦{{amount}}</p>
      <p>Transaction ID: {{transactionId}}</p>
      <p>Date: {{date}}</p>
      <p>Reason: {{reason}}</p>
    </div>

    <p>Please try again or contact our support if you need assistance.</p>
    
    <div class="footer">
      <p>This is an automated message, please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;

export const lowBalanceTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { padding: 20px; font-family: Arial, sans-serif; }
    .header { color: #F59E0B; font-size: 24px; margin-bottom: 20px; }
    .details { margin: 20px 0; }
    .footer { margin-top: 30px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Low Balance Alert</div>
    <p>Dear {{firstName}},</p>
    <p>Your wallet balance is running low.</p>
    
    <div class="details">
      <p>Current Balance: ₦{{balance}}</p>
      <p>Threshold: ₦{{threshold}}</p>
    </div>

    <p>To ensure uninterrupted service, please top up your wallet.</p>
    
    <div class="footer">
      <p>This is an automated message, please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;

export const compileTemplate = (template: string, data: any) => {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(data);
};