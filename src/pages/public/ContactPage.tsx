import { useState } from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { contactApi } from '@/services/api';
import { MapPin, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    setSubmitting(true);
    try {
      await contactApi.submit(form);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Contact Us</h1>
          <p className="text-muted-foreground">Get in touch with Apex College</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            {[
              { icon: MapPin, label: 'Address', value: '123 University Avenue, Academic City, AC 12345' },
              { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
              { icon: Mail, label: 'Email', value: 'info@apexcollege.edu' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  maxLength={100}
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  maxLength={255}
                />
                <Textarea
                  placeholder="Your message"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={4}
                  maxLength={1000}
                />
                <Button type="submit" disabled={submitting} className="w-full gradient-primary text-primary-foreground border-0">
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ContactPage;
