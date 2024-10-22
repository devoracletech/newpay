import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '../hooks/usePayment';

interface PaymentStatusProps {
  reference: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function PaymentStatus({ reference, onSuccess, onError }: PaymentStatusProps) {
  const navigate = useNavigate();
  const { verifyPayment, isVerifying } = usePayment();

  useEffect(() => {
    if (reference) {
      verifyPayment(reference, {
        onSuccess: () => {
          onSuccess?.();
          navigate('/dashboard');
        },
        onError: () => {
          onError?.();
          navigate('/wallet');
        },
      });
    }
  }, [reference]);

  if (isVerifying) {
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-900">Verifying your payment...</p>
          <p className="mt-2 text-sm text-gray-500">Please do not close this window.</p>
        </div>
      </div>
    );
  }

  return null;
}