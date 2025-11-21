import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../schemas/profileSchema';
import { AppLayout } from '../components/layout/AppLayout';
import { useAuth } from '../context/AuthContext';
import { updateProfileRequest } from '../services/userService';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';

const Profile = () => {
  const { user, login, token } = useAuth();
  const [serverMessage, setServerMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      BOD: user?.BOD || '',
      ContactNumber: user?.ContactNumber || '',
      image: user?.image || '',
    },
  });

  useEffect(() => {
    form.reset({
      name: user?.name || '',
      BOD: user?.BOD || '',
      ContactNumber: user?.ContactNumber || '',
      image: user?.image || '',
    });
  }, [user, form]);

  const handleSubmit = async (values) => {
    try {
      setServerMessage('');
      const { data } = await updateProfileRequest(values);
      login({ token, user: data.data });
      setServerMessage('Profile updated');
      setIsEditing(false);
    } catch (error) {
      setServerMessage(error.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <AppLayout title="Profile" actions={null}>
      <div className="mx-auto max-w-2xl rounded-3xl border bg-white/80 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">Personal details</h2>
        <p className="text-sm text-muted-foreground">Update your display details and role preferences.</p>

        {isEditing ? (
          <Form {...form}>
            <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Alex Mercer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="BOD"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ContactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://example.com/avatar.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              {serverMessage && <p className="text-sm text-muted-foreground">{serverMessage}</p>}

              <div className="flex gap-2">
                <Button type="submit" className="rounded-full px-6">
                  Save changes
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    form.reset({
                      name: user?.name || '',
                      BOD: user?.BOD || '',
                      ContactNumber: user?.ContactNumber || '',
                      image: user?.image || '',
                    });
                    setIsEditing(false);
                  }}
                  className="rounded-full px-6"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              {user?.image ? (
                <img src={user.image} alt={user.name} className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-lg font-semibold">{(user?.name || 'U').slice(0,1)}</div>
              )}
              <div>
                <div className="text-lg font-semibold">{user?.name || '—'}</div>
                <div className="text-sm text-muted-foreground">{user?.role || 'Student'}</div>
                <div className="text-sm text-muted-foreground">{user?.email || '—'}</div>
              </div>
              <div className="ml-auto">
                <Button onClick={() => setIsEditing(true)} className="rounded-full px-4">
                  Edit
                </Button>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <div className="text-sm">
                <strong>Date of birth:</strong> {user?.BOD || '—'}
              </div>
              <div className="text-sm">
                <strong>Contact:</strong> {user?.ContactNumber || '—'}
              </div>
              <div className="text-sm">
                <strong>Joined:</strong>{' '}
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Profile;

