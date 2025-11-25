'use client';

import { useEffect, useState, use } from 'react';
import { Plus, User, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TeamDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [team, setTeam] = useState<any>(null);
  
  // State Form Pemain
  const [newPlayer, setNewPlayer] = useState({ name: '', number: '', position: 'FW' });

  const fetchTeam = async () => {
    const res = await fetch(`/api/teams/${id}`);
    const data = await res.json();
    setTeam(data);
  };

  useEffect(() => { fetchTeam(); }, [id]);

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/players', {
      method: 'POST',
      body: JSON.stringify({ ...newPlayer, teamId: id, photo: '' }), // photo optional
    });
    setNewPlayer({ name: '', number: '', position: 'FW' });
    fetchTeam(); // Refresh
  };

  const handleDeletePlayer = async (playerId: number) => {
    if(!confirm('Remove player?')) return;
    await fetch(`/api/players/${playerId}`, { method: 'DELETE' });
    fetchTeam();
  };

  if (!team) return <div className="p-10 text-center">Loading Team...</div>;

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Tim */}
        <div className="flex items-center gap-6 mb-10">
          <div className="w-24 h-24 bg-gray-50 rounded-full border border-gray-200 overflow-hidden">
             {team.logo && <img src={team.logo} className="w-full h-full object-cover"/>}
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900">{team.name}</h1>
            <p className="text-gray-500 font-medium">Coach: <span className="text-black">{team.coach}</span></p>
          </div>
        </div>

        {/* Form Tambah Pemain (Inline) */}
        <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-200">
           <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Add to Squad</h3>
           <form onSubmit={handleAddPlayer} className="flex gap-4">
              <input required placeholder="Player Name" className="flex-1 p-3 rounded-xl border border-gray-200" value={newPlayer.name} onChange={e=>setNewPlayer({...newPlayer, name: e.target.value})} />
              <input required placeholder="#" type="number" className="w-20 p-3 rounded-xl border border-gray-200" value={newPlayer.number} onChange={e=>setNewPlayer({...newPlayer, number: e.target.value})} />
              <select className="p-3 rounded-xl border border-gray-200 bg-white" value={newPlayer.position} onChange={e=>setNewPlayer({...newPlayer, position: e.target.value})}>
                 <option value="GK">GK</option>
                 <option value="DF">DF</option>
                 <option value="MF">MF</option>
                 <option value="FW">FW</option>
              </select>
              <button type="submit" className="bg-black text-white px-6 rounded-xl font-bold hover:bg-gray-800"><Plus/></button>
           </form>
        </div>

        {/* List Pemain */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {team.players.map((player: any) => (
             <div key={player.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400">
                      {player.number}
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900">{player.name}</h4>
                      <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{player.position}</span>
                   </div>
                </div>
                <button onClick={() => handleDeletePlayer(player.id)} className="text-gray-300 hover:text-red-500 transition"><Trash2 size={16}/></button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}