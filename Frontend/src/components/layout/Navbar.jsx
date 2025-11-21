import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const Navbar = ({ title, actions, onMenuClick }) => {
  const { user, logout } = useAuth();

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex items-center justify-between border-b bg-white/70 px-6 py-4 backdrop-blur-lg">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="rounded-full border p-2 hover:bg-muted lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Overview</p>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {actions}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-full border border-border/60 px-3 py-1.5 shadow-sm">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{initials || 'AA'}</AvatarFallback>
              </Avatar>
              <div className="hidden text-left text-sm leading-tight md:block">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => (window.location.href = '/profile')}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => (window.location.href = '/dashboard')}>Dashboard</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

