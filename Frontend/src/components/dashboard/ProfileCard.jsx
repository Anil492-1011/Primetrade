import { CalendarDays, Mail, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';

export const ProfileCard = ({ user }) => {
  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Card className="border-none bg-white/80">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg font-semibold">{initials || 'AA'}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">Staying on top of priorities</p>
          </div>
        </div>
        <div className="grid gap-3 text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Mail className="h-4 w-4" />
            {user?.email}
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Shield className="h-4 w-4" />
            Role: <span className="font-medium capitalize text-foreground">{user?.role}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            Joined:{' '}
            <span className="font-medium text-foreground">
              {user?.createdAt ? format(new Date(user.createdAt), 'MMM dd, yyyy') : '—'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

