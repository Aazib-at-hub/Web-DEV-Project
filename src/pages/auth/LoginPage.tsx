import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const stored = localStorage.getItem('cms_user');
      const user = stored ? JSON.parse(stored) : null;
      navigate(user?.role === 'admin' ? '/admin' : '/teacher');
      toast.success('Login successful!');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <Card className="w-full max-w-md relative z-10">
        <CardHeader className="text-center">
          <div className="w-14 h-14 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-heading">Sign In</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Enter your credentials to access your dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="admin@college.edu" value={email} onChange={e => setEmail(e.target.value)} required maxLength={255} />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground border-0">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-3 rounded-lg bg-muted text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Demo Credentials:</p>
            <p>Admin: admin@college.edu / admin123</p>
            <p>Teacher: sarah@college.edu / teacher123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
