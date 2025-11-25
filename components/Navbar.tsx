'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Users, Calendar, LayoutGrid } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItem = (path: string, icon: React.ReactNode, label: string) => {
    const isActive = pathname === path;
    return (
      <Link 
        href={path} 
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 
        ${isActive ? "bg-black text-white shadow-lg shadow-gray-200" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}
      >
        {icon} <span>{label}</span>
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">
            L
          </div>
          <span className="text-lg font-black tracking-tighter text-gray-900">LEAGUE<span className="text-blue-600">APP</span></span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-2">
          {navItem('/', <LayoutGrid size={18} />, 'Dashboard')}
          {navItem('/teams', <Users size={18} />, 'Clubs')}
          {navItem('/matches', <Calendar size={18} />, 'Matches')}
        </div>
      </div>
    </nav>
  );
}