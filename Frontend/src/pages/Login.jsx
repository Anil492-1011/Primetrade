import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthForm } from '../components/forms/AuthForm';
import { loginRequest } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/card';
 

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      console.log('Anil /............')
      setLoading(true);
      setServerError('');
      const { data } = await loginRequest(values);
      console.log('hiiiiiiiiiiiiiiiii')
      login(data.data);
      navigate('/dashboard');
    } catch (error) {
      console.log(error.message);
      setServerError(error.response?.data?.message || 'Unable to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-6 py-16 text-white">
        <div className="max-w-md space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-200">Primetrade Auth Athen</p>
          <h1 className="text-4xl font-semibold leading-tight">Premium access to your productivity cockpit</h1>
          <p className="text-sm text-white/80">
            Manage accounts, tasks, and insights in one calming space. Built with security-first controls and crafted with modern UI
            polish.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white/90 px-6 py-16">
        <Card className="w-full max-w-md border-none bg-white shadow-2xl">
          <CardContent className="space-y-6 p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Welcome back</p>
              <h2 className="text-2xl font-semibold">Sign in to continue</h2>
            </div>
            <AuthForm type="login" onSubmit={handleSubmit} serverError={serverError} loading={loading} />
            <p className="text-center text-sm text-muted-foreground">
              New here?{' '}
              <Link className="font-semibold text-primary" to="/signup">
                Create an account
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

