import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UserRound, StickyNote, LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Profile', to: '/profile', icon: UserRound },
  { label: 'Tasks', to: '/dashboard', icon: StickyNote },
];

export const Sidebar = ({ open, onClose }) => {
  const { logout } = useAuth();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-64 flex-col border-r bg-white/90 px-4 py-6 shadow-sm lg:flex">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Auth Athen</p>
          <h1 className="text-2xl font-bold text-foreground">Control Hub</h1>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map(({ label, to, icon }) => {
            const IconComponent = icon;
            return (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`
                }
              >
                <IconComponent className="h-4 w-4" />
                {label}
              </NavLink>
            );
          })}
        </nav>

        <Button variant="outline" className="mt-auto w-full gap-2" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform border-r bg-white/90 px-4 py-6 shadow-lg transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Auth Athen</p>
            <h1 className="text-2xl font-bold text-foreground">Control Hub</h1>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map(({ label, to, icon }) => {
            const IconComponent = icon;
            return (
              <NavLink
                key={label}
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`
                }
              >
                <IconComponent className="h-4 w-4" />
                {label}
              </NavLink>
            );
          })}
        </nav>

        <Button variant="outline" className="mt-auto w-full gap-2" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </aside>
    </>
  );
};

