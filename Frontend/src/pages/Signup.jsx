import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthForm } from '../components/forms/AuthForm';
import { signupRequest } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/card';

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setServerError('');
      const { data } = await signupRequest(values);
      console.log(data);
      login(data.data);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setServerError(error.response?.data?.message || 'Unable to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-gradient-to-br from-stone-900 via-slate-900 to-slate-800 lg:grid-cols-2">
      <div className="flex items-center justify-center bg-white px-6 py-16">
        <Card className="w-full max-w-md border-none shadow-2xl">
          <CardContent className="space-y-6 p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Join Auth Athen</p>
              <h2 className="text-2xl font-semibold">Create a premium workspace</h2>
            </div>
            <AuthForm type="signup" onSubmit={handleSubmit} serverError={serverError} loading={loading} />
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link className="font-semibold text-primary" to="/login">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="hidden flex-col items-center justify-center px-6 py-16 text-white lg:flex">
        <div className="max-w-md space-y-6 text-right">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-200">Primetrade.ai</p>
          <h1 className="text-4xl font-semibold leading-tight">Granular access and dashboard clarity</h1>
          <p className="text-sm text-white/80">
            Experience a design-forward dashboard UI built with ShadCN, Tailwind, and context-driven auth state. Zero noise, just control.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

