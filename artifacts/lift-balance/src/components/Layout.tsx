import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Dumbbell, History, BarChart2, Activity, ClipboardList } from 'lucide-react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-[100dvh] w-full bg-black flex justify-center overflow-hidden">
      <div className="w-full h-full max-w-[430px] bg-background flex flex-col relative shadow-2xl shadow-primary/5 border-x border-border/50">
        <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
          {children}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

function BottomNav() {
  const [location] = useLocation();
  
  const navItems = [
    { path: '/', label: 'Log', icon: Dumbbell },
    { path: '/builder', label: 'Builder', icon: ClipboardList },
    { path: '/history', label: 'History', icon: History },
    { path: '/summary', label: 'Summary', icon: BarChart2 },
    { path: '/balance', label: 'Balance', icon: Activity },
  ];

  return (
    <div className="absolute bottom-0 w-full max-w-[430px] bg-background/90 backdrop-blur-xl border-t border-border px-6 py-3 pb-6 z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path} className="flex flex-col items-center gap-1.5 focus:outline-none flex-1">
              <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
