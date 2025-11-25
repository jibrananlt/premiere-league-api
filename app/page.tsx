import { PrismaClient } from '@prisma/client';
import StandingsTable from '@/components/StandingsTable';
import MatchCard from '@/components/MatchCard';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

async function getData() {
  const standings = await prisma.standing.findMany({
    include: { team: true },
    orderBy: [{ points: 'desc' }, { goalsFor: 'desc' }]
  });
  
  const recentMatches = await prisma.match.findMany({
    include: { homeTeam: true, awayTeam: true },
    orderBy: { date: 'desc' },
    take: 4 // Tampilkan 4 match terakhir/terjadwal
  });

  return { standings, recentMatches };
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { standings, recentMatches } = await getData();

  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-12">
      {/* Hero Banner (MPL Style Header) */}
      <div className="px-6 mb-8">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-900 to-black rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10">
            <span className="bg-white/10 text-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block backdrop-blur-sm border border-white/10">
              Season 2025
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">OFFICIAL LEAGUE <br/> DATABASE</h1>
            <p className="text-gray-400 max-w-lg mb-6">Real-time standings, match schedules, and score updates managed directly by the official committee.</p>
            
            <div className="flex gap-3">
              <Link href="/matches" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-900/50">
                View Schedule
              </Link>
              <Link href="/teams" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition backdrop-blur-sm">
                Manage Clubs
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Klasemen (Lebar) */}
        <div className="lg:col-span-2">
          <StandingsTable data={standings} />
        </div>

        {/* Kolom Kanan: Match Center (Sempit) */}
        <div className="space-y-6">
          <div className="flex justify-between items-end px-2">
             <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full block"></span>
              Matches
            </h3>
            <Link href="/matches" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center">
              View All <ChevronRight size={14}/>
            </Link>
          </div>
          
          <div className="grid gap-4">
            {recentMatches.map((match: any) => (
              <MatchCard key={match.id} match={match} />
            ))}
            {recentMatches.length === 0 && (
              <div className="bg-white p-8 text-center rounded-2xl border border-dashed border-gray-300 text-gray-400 font-medium">
                No active matches found.
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}