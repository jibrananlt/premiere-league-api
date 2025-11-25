'use client';

import { useEffect, useState } from 'react';
import { Calendar, CheckCircle } from 'lucide-react';

// 1. DEFINISIKAN TIPE DATA (INTERFACE)
interface Team {
  id: number;
  name: string;
  logo: string | null;
}

interface Match {
  id: number;
  date: string;
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number | null;
  awayScore: number | null;
  isFinished: boolean;
  homeTeam: Team; // Relasi
  awayTeam: Team; // Relasi
}

export default function MatchesPage() {
  // 2. GUNAKAN GENERICS PADA USESTATE <Match[]>
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  
  // State Form Schedule
  const [schedule, setSchedule] = useState({ homeTeamId: '', awayTeamId: '', date: '' });
  
  // State Edit Score
  const [editingId, setEditingId] = useState<number | null>(null);
  const [score, setScore] = useState({ homeScore: 0, awayScore: 0 });

  const fetchData = async () => {
    try {
      const resMatches = await fetch('/api/matches');
      const resTeams = await fetch('/api/teams');
      setMatches(await resMatches.json());
      setTeams(await resTeams.json());
    } catch (error) {
      console.error("Gagal ambil data", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/matches', {
      method: 'POST',
      body: JSON.stringify(schedule),
    });
    setSchedule({ homeTeamId: '', awayTeamId: '', date: '' });
    fetchData();
  };

  const handleUpdateScore = async (matchId: number) => {
    await fetch(`/api/matches/${matchId}`, {
      method: 'PATCH',
      body: JSON.stringify({ ...score, isFinished: true }),
    });
    setEditingId(null);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 pb-24">
      <div className="max-w-4xl mx-auto">
        
        {/* Form Schedule Match */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
           <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar size={20}/> Schedule Match</h2>
           <form onSubmit={handleSchedule} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select className="p-3 border rounded-xl" required value={schedule.homeTeamId} onChange={e=>setSchedule({...schedule, homeTeamId: e.target.value})}>
                 <option value="">Home Team</option>
                 {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <select className="p-3 border rounded-xl" required value={schedule.awayTeamId} onChange={e=>setSchedule({...schedule, awayTeamId: e.target.value})}>
                 <option value="">Away Team</option>
                 {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <input type="datetime-local" className="p-3 border rounded-xl" required value={schedule.date} onChange={e=>setSchedule({...schedule, date: e.target.value})} />
              <button className="bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">Create</button>
           </form>
        </div>

        {/* List Matches */}
        <h2 className="text-xl font-black mb-6">Fixture List</h2>
        <div className="space-y-4">
           {/* Karena sudah didefinisikan di useState<Match[]>, TypeScript sekarang tahu 'match' itu apa */}
           {matches.map((match) => (
             <div key={match.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between shadow-sm">
                
                {/* Tanggal */}
                <div className="text-xs font-bold text-gray-400 uppercase w-32 text-center mb-4 md:mb-0">
                   {new Date(match.date).toLocaleDateString()}
                   <br/>
                   {match.isFinished ? <span className="text-green-500">Finished</span> : <span className="text-orange-500">Upcoming</span>}
                </div>

                {/* Score Box */}
                <div className="flex items-center gap-6 flex-1 justify-center">
                   <div className="text-right w-1/3 font-bold">{match.homeTeam.name}</div>
                   
                   {/* Score Input Area */}
                   <div className="flex gap-2 items-center bg-gray-50 px-4 py-2 rounded-xl">
                      {match.isFinished && editingId !== match.id ? (
                        <span className="text-2xl font-black tracking-widest">{match.homeScore} - {match.awayScore}</span>
                      ) : (
                        <>
                           <input type="number" className="w-10 text-center font-bold p-1 rounded" placeholder="0" 
                             onChange={e => {
                               setEditingId(match.id);
                               setScore({...score, homeScore: parseInt(e.target.value)})
                             }} 
                           />
                           <span>-</span>
                           <input type="number" className="w-10 text-center font-bold p-1 rounded" placeholder="0" 
                             onChange={e => {
                               setEditingId(match.id);
                               setScore({...score, awayScore: parseInt(e.target.value)})
                             }}
                           />
                        </>
                      )}
                   </div>

                   <div className="text-left w-1/3 font-bold">{match.awayTeam.name}</div>
                </div>

                {/* Action Button */}
                <div className="w-32 flex justify-end">
                   {editingId === match.id ? (
                      <button onClick={() => handleUpdateScore(match.id)} className="bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1">
                        <CheckCircle size={14}/> Save
                      </button>
                   ) : (
                      !match.isFinished && <button onClick={() => setEditingId(match.id)} className="text-gray-400 text-xs hover:text-black">Update Score</button>
                   )}
                </div>

             </div>
           ))}
        </div>

      </div>
    </div>
  );
}