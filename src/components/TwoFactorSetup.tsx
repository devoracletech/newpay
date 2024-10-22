import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const setupSchema = z.object({
  method: z.enum(['2FA_EMAIL', '2FA_AUTHENTICATOR']),
  code: z.string().min(6, 'Code must be 6 digits').max(6, 'Code must be 6 digits'),
});

type SetupFormData = z.infer<typeof setupSchema>;

export default function TwoFactorSetup({ onComplete }: { onComplete: () => void }) {
  const { user } = useAuth();
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [setupStep, setSetupStep] = useState<'METHOD' | 'VERIFY'>('METHOD');
  const [selectedMethod, setSelectedMethod] = useState<'2FA_EMAIL' | '2FA_AUTHENTICATOR' | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
  });

  const initSetupMutation = useMutation(
    async (method: '2FA_EMAIL' | '2FA_AUTHENTICATOR') => {
      const response = await axios.post('/api/auth/2fa/setup', { method });
      return response.data;
    },
    {
      onSuccess: (data) => {
        if (data.qrCodeUrl) {
          setQrCode(data.qrCodeUrl);
        }
        setSetupStep('VERIFY');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Failed to initialize 2FA setup');
      },
    }
  );

  const verifySetupMutation = useMutation(
    async (data: SetupFormData) => {
      const response = await axios.post('/api/auth/2fa/verify-setup', data);
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('Two-factor authentication enabled successfully');
        onComplete();
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Failed to verify code');
      },
    }
  );

  const handleMethodSelect = (method: '2FA_EMAIL' | '2FA_AUTHENTICATOR') => {
    setSelectedMethod(method);
    initSetupMutation.mutate(method);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Set Up Two-Factor Authentication</h2>

      {setupStep === 'METHOD' && (
        <div className="space-y-4">
          <button
            onClick={() => handleMethodSelect('2FA_EMAIL')}
            className="w-full p-4 border rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <h3 className="text-lg font-medium">Email Authentication</h3>
            <p className="text-sm text-gray-500">
              Receive verification codes via email
            </p>
          </button>

          <button
            onClick={() => handleMethodSelect('2FA_AUTHENTICATOR')}
            className="w-full p-4 border rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <h3 className="text-lg font-medium">Authenticator App</h3>
            <p className="text-sm text-gray-500">
              Use Google Authenticator or similar apps
            </p>
          </button>
        </div>
      )}

      {setupStep === 'VERIFY' && selectedMethod && (
        <div className="space-y-6">
          {selectedMethod === '2FA_AUTHENTICATOR' && qrCode && (
            <div className="text-center">
              <p className="mb-4 text-sm text-gray-600">
                Scan this QR code with your authenticator app
              </p>
              <img
                src={qrCode}
                alt="QR Code"
                className="mx-auto"
              />
            </div>
          )}

          {selectedMethod === '2FA_EMAIL' && (
            <p className="text-sm text-gray-600">
              We've sent a verification code to {user?.email}
            </p>
          )}

          <form onSubmit={handleSubmit((data) => verifySetupMutation.mutate({ ...data, method: selectedMethod }))} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                type="text"
                {...register('code')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter 6-digit code"
              />
              {errors.code && (
                <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={verifySetupMutation.isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {verifySetupMutation.isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}