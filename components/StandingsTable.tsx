'use client';

interface Standing {
  id: number;
  team: { name: string; logo: string | null };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export default function StandingsTable({ data }: { data: Standing[] }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-600 rounded-full block"></span>
          Regular Season
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-400 font-bold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-4 text-center">Rank</th>
              <th className="px-6 py-4">Team</th>
              <th className="px-4 py-4 text-center">Match</th>
              <th className="px-4 py-4 text-center">W-D-L</th>
              <th className="px-4 py-4 text-center">GD</th>
              <th className="px-6 py-4 text-center">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row, index) => {
              const rank = index + 1;
              let rankStyle = "text-gray-500 font-bold";
              let rowBg = "hover:bg-gray-50 transition";
              
              // MPL Style Ranking Colors
              if (rank === 1) rankStyle = "text-yellow-500 font-black text-lg"; // Gold
              if (rank === 2) rankStyle = "text-slate-400 font-black text-lg";  // Silver
              if (rank === 3) rankStyle = "text-orange-400 font-black text-lg"; // Bronze

              return (
                <tr key={row.id} className={rowBg}>
                  <td className="px-6 py-4 text-center">
                    <span className={rankStyle}>#{rank}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center overflow-hidden border border-gray-100 p-1">
                        {row.team.logo ? <img src={row.team.logo} className="w-full h-full object-contain" /> : <div className="w-full h-full bg-gray-200 rounded-full"/>}
                      </div>
                      <span className="font-bold text-gray-900 text-base">{row.team.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center font-medium text-gray-600">{row.played}</td>
                  <td className="px-4 py-4 text-center font-medium text-gray-600">
                    <span className="text-green-600">{row.won}</span> - <span className="text-gray-400">{row.drawn}</span> - <span className="text-red-500">{row.lost}</span>
                  </td>
                  <td className="px-4 py-4 text-center font-bold text-gray-500">
                    {row.goalsFor - row.goalsAgainst > 0 ? `+${row.goalsFor - row.goalsAgainst}` : row.goalsFor - row.goalsAgainst}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-black text-base">
                      {row.points}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}