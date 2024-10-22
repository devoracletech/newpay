import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import TwoFactorVerify from './TwoFactorVerify';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const registerSchema = loginSchema.extend({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthFormProps {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
  const navigate = useNavigate();
  const { login, register: registerUser } = useAuth();
  const [twoFactorData, setTwoFactorData] = useState<{ tempToken: string; method: '2FA_EMAIL' | '2FA_AUTHENTICATOR' } | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(type === 'login' ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      if (type === 'login') {
        const response = await login((data as LoginFormData).email, (data as LoginFormData).password);
        if (response.requiresTwoFactor) {
          setTwoFactorData({
            tempToken: response.tempToken,
            method: response.method,
          });
        } else {
          navigate('/');
          toast.success('Welcome back!');
        }
      } else {
        await registerUser(data as RegisterFormData);
        navigate('/');
        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleTwoFactorSuccess = (token: string) => {
    localStorage.setItem('token', token);
    navigate('/');
    toast.success('Welcome back!');
  };

  if (twoFactorData) {
    return (
      <TwoFactorVerify
        tempToken={twoFactorData.tempToken}
        method={twoFactorData.method}
        onSuccess={handleTwoFactorSuccess}
      />
    );
  }

  // Rest of the AuthForm component remains the same...
  // [Previous AuthForm JSX code continues here]
}