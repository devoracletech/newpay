# PayEase - Nigerian FinTech Platform

A comprehensive fintech platform built for the Nigerian market, offering a wide range of financial services including payments, investments, crypto trading, and more.

## Features

- **Secure Authentication**
  - Two-Factor Authentication (2FA)
  - Email and Google Authenticator support
  - Session management

- **Payments & Transfers**
  - Bank transfers
  - Bill payments (Utilities, TV, Internet, etc.)
  - Bulk payments
  - Payment notifications
  - Transaction history

- **Digital Wallet**
  - Multiple funding options
  - Bank transfer top-up
  - Card payments via Flutterwave
  - Virtual cards

- **Smart Savings**
  - Automated savings
  - Goal-based savings
  - Flexible withdrawal options
  - Interest earnings

- **Investments**
  - Multiple investment plans
  - Investment certificates
  - Auto-reinvestment options
  - ROI tracking

- **Cryptocurrency**
  - Buy and sell crypto
  - Multiple crypto support (BTC, ETH, USDT)
  - Crypto wallet addresses
  - Market rates

- **Travel & Flights**
  - Flight booking
  - Multiple airlines support
  - Ticket management
  - Travel insurance

- **Security Features**
  - KYC verification
  - Fraud reporting
  - Live crime reporting
  - Transaction limits

- **Admin Features**
  - User management
  - Transaction monitoring
  - Feature management
  - Bulk SMS system

## Installation Guide

### Prerequisites

1. Node.js (v16 or higher)
2. npm or yarn package manager
3. Git
4. A Flutterwave account for payment processing
5. MongoDB database (local or cloud)
6. SMTP server for email notifications

### Step-by-Step Installation

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/payease.git
cd payease
```

2. **Install Dependencies**
```bash
npm install
# or using yarn
yarn install
```

3. **Environment Setup**

Create a `.env` file in the root directory:
```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Flutterwave Configuration
VITE_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
VITE_FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key

# Database Configuration
DATABASE_URL="mongodb://localhost:27017/payease"

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password

# SMS Configuration
AFRICASTALKING_API_KEY=your_africastalking_api_key
AFRICASTALKING_USERNAME=your_username
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token

# Optional: Third-party API keys
CRYPTO_API_KEY=your_crypto_api_key
FLIGHT_API_KEY=your_flight_api_key
```

4. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

5. **Start Development Server**
```bash
npm run dev
# or using yarn
yarn dev
```

The application will be available at `http://localhost:5173`

### Setting Up Payment Integration

1. Create a Flutterwave account at [Flutterwave](https://flutterwave.com)
2. Get your API keys from the dashboard
3. Update your `.env` file with the keys

### Additional Setup

#### Email Notifications
1. Enable 2-factor authentication in your Gmail account
2. Generate an app password
3. Use the app password in your `.env` file

#### SMS System
1. Create accounts with AfricasTalking or Twilio
2. Get API credentials
3. Update `.env` with SMS provider details

#### KYC Integration
1. Set up your preferred KYC provider
2. Update the KYC configuration in the backend
3. Test the KYC flow in development mode

### Security Recommendations

1. **Environment Variables**
   - Never commit .env files
   - Use strong, unique keys
   - Rotate keys regularly

2. **API Security**
   - Implement rate limiting
   - Use HTTPS in production
   - Validate all inputs

3. **Database Security**
   - Use strong passwords
   - Enable authentication
   - Regular backups

### Deployment Checklist

- [ ] Update all environment variables
- [ ] Build the application
- [ ] Test all features
- [ ] Configure SSL certificate
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Test payment integration
- [ ] Verify email sending
- [ ] Check database connections
- [ ] Test SMS functionality
- [ ] Verify KYC flow
- [ ] Check investment features
- [ ] Test crypto trading
- [ ] Verify flight booking

## Support

For support, please email support@payease.com or visit our documentation at https://docs.payease.com

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details