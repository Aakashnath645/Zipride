import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import SideNav from './SideNav';

export default function AppShell() {
  return (
    <div className="flex h-full w-full overflow-hidden bg-[var(--background)]">
      <SideNav />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
