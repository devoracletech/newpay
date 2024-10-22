import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const verifySchema = z.object({
  code: z.string().min(6, 'Code must be 6 digits').max(6, 'Code must be 6 digits'),
});

type VerifyFormData = z.infer<typeof verifySchema>;

interface TwoFactorVerifyProps {
  tempToken: string;
  method: '2FA_EMAIL' | '2FA_AUTHENTICATOR';
  onSuccess: (token: string) => void;
}

export default function TwoFactorVerify({ tempToken, method, onSuccess }: TwoFactorVerifyProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
  });

  const verifyMutation = useMutation(
    async (data: VerifyFormData) => {
      const response = await axios.post('/api/auth/2fa/verify', {
        code: data.code,
        tempToken,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        onSuccess(data.token);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Invalid verification code');
      },
    }
  );

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Two-Factor Authentication</h2>
      <p className="mb-6 text-gray-600">
        {method === '2FA_EMAIL'
          ? 'Please enter the verification code sent to your email'
          : 'Please enter the code from your authenticator app'}
      </p>

      <form onSubmit={handleSubmit((data) => verifyMutation.mutate(data))} className="space-y-6">
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
          disabled={verifyMutation.isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {verifyMutation.isLoading ? 'Verifying...' : 'Verify Code'}
        </button>
      </form>
    </div>
  );
}