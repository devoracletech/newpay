import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './useAuth';

export function usePayment() {
  const { user } = useAuth();

  const processPaymentMutation = useMutation(
    async (data: any) => {
      const response = await axios.post('/api/payments/process', data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success('Payment processed successfully');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Payment failed');
      },
    }
  );

  const verifyPaymentMutation = useMutation(
    async (reference: string) => {
      const response = await axios.post('/api/payments/verify', { reference });
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success('Payment verified successfully');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Payment verification failed');
      },
    }
  );

  return {
    processPayment: processPaymentMutation.mutate,
    verifyPayment: verifyPaymentMutation.mutate,
    isProcessing: processPaymentMutation.isLoading,
    isVerifying: verifyPaymentMutation.isLoading,
  };
}