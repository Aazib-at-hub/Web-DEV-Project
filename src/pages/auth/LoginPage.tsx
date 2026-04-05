import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { GraduationCap, ArrowLeft, ShieldCheck, Mail, Lock } from 'lucide-react';
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
      toast.success('Access Granted. Welcome back!');
    } catch (err: any) {
      toast.error(err.message || 'Authentication Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-6 relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      
      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground mb-8 transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold tracking-tight">Back to Portal</span>
        </Link>
        
        <Card className="border-0 shadow-2xl rounded-[2.5rem] bg-card/95 backdrop-blur-2xl overflow-hidden">
          <CardHeader className="text-center pt-10 pb-6 px-8 bg-gradient-to-br from-muted/50 to-transparent">
            <div className="w-16 h-16 rounded-3xl gradient-primary mx-auto mb-6 flex items-center justify-center shadow-xl shadow-primary/30 ring-4 ring-white/10">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-heading font-black text-foreground tracking-tight mb-2 uppercase italic">Portal Access</CardTitle>
            <p className="text-sm text-muted-foreground font-medium opacity-70">Secured Gateway for Campus Connect Staff</p>
          </CardHeader>
          <CardContent className="p-10 pt-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Official Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="email" 
                    placeholder="name@college.edu" 
                    className="h-14 pl-12 rounded-2xl bg-muted/30 border-0 ring-offset-background focus-visible:ring-2 focus-visible:ring-primary font-medium"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    maxLength={255} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="h-14 pl-12 rounded-2xl bg-muted/30 border-0 ring-offset-background focus-visible:ring-2 focus-visible:ring-primary font-medium"
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full h-14 gradient-primary text-primary-foreground border-0 font-black text-lg rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wider">
                {loading ? 'Verifying...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-8 p-6 rounded-[2rem] bg-[#0f172a] text-[10px] text-muted-foreground space-y-3 ring-1 ring-white/5 border border-white/5">
              <p className="font-black text-white/50 uppercase tracking-[0.2em] mb-4 border-b border-white/5 pb-2">System Diagnostics:</p>
              <div className="flex justify-between items-center">
                <span className="opacity-60">ADMIN ROLE:</span>
                <span className="text-accent font-bold">admin@college.edu / admin123</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-60">TEACHER ROLE:</span>
                <span className="text-accent font-bold">sarah@college.edu / teacher123</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
