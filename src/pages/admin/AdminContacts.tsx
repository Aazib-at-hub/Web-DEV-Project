import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { contactApi } from '@/services/api';
import { ContactSubmission } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const AdminContacts = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { contactApi.getAll().then(setContacts).finally(() => setLoading(false)); }, []);

  if (loading) return <DashboardLayout><Skeleton className="h-64 w-full rounded-lg" /></DashboardLayout>;

  return (
    <DashboardLayout>
      <Card>
        <CardHeader><CardTitle>Contact Submissions</CardTitle></CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No contact submissions yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Message</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map(c => (
                  <TableRow key={c._id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.email}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground truncate max-w-xs">{c.message}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminContacts;
