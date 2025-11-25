import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { Plus, MapPin } from 'lucide-react';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function TeamsPage() {
  const teams = await prisma.team.findMany({ include: { players: true } });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
           <div>
             <h1 className="text-3xl font-black text-gray-900 tracking-tight">Clubs</h1>
             <p className="text-gray-500 font-medium">Manage participating teams</p>
           </div>
           {/* Tombol Add Team (Logic bisa ditambah nanti) */}
           <button className="bg-black text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:bg-gray-800 transition">
             <Plus size={18}/> New Club
           </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teams.map((team: any) => (
            <Link href={`/teams/${team.id}`} key={team.id} className="group bg-white p-6 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
              
              <div className="flex flex-col items-center pt-4">
                <div className="w-28 h-28 p-2 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-gray-50 group-hover:scale-105 transition-transform duration-300">
                   {team.logo ? <img src={team.logo} className="w-full h-full object-contain"/> : <div className="w-full h-full bg-gray-100 rounded-full"/>}
                </div>
                
                <h2 className="text-xl font-black text-gray-900 text-center mb-1">{team.name}</h2>
                
                <div className="flex items-center gap-1 text-gray-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <MapPin size={12}/> {team.stadium || 'Unknown'}
                </div>
                
                <div className="w-full grid grid-cols-2 gap-2 border-t border-gray-50 pt-4">
                   <div className="text-center">
                     <span className="block text-xs text-gray-400 font-bold uppercase">Coach</span>
                     <span className="font-bold text-gray-900 text-sm truncate">{team.coach}</span>
                   </div>
                   <div className="text-center border-l border-gray-50">
                     <span className="block text-xs text-gray-400 font-bold uppercase">Squad</span>
                     <span className="font-bold text-blue-600 text-sm">{team.players.length}</span>
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}