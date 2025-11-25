export default function MatchCard({ match }: { match: any }) {
  const date = new Date(match.date);
  
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      {/* Header: Status & Tanggal (Tanpa Jam) */}
      <div className="flex justify-between items-center mb-6">
        <div className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${match.isFinished ? 'bg-gray-100 text-gray-500' : 'bg-blue-50 text-blue-600'}`}>
          {match.isFinished ? 'Finished' : 'Upcoming'}
        </div>
        <div className="text-[10px] font-bold text-gray-400 uppercase">
          {/* Format: Senin, 12 Mei 2025 */}
          {date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* Content: Tim vs Tim (Sama seperti sebelumnya) */}
      <div className="flex justify-between items-center">
        {/* Home */}
        <div className="flex flex-col items-center w-1/3 gap-2">
          <div className="w-14 h-14 p-1 rounded-full border border-gray-100 bg-white shadow-sm group-hover:scale-110 transition-transform">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
               {match.homeTeam.logo ? <img src={match.homeTeam.logo} className="object-contain w-full h-full"/> : <div className="bg-gray-200 w-full h-full"/>}
            </div>
          </div>
          <span className="text-xs font-bold text-center leading-tight line-clamp-1">{match.homeTeam.name}</span>
        </div>

        {/* Score / VS */}
        <div className="w-1/3 flex flex-col items-center justify-center">
          {match.isFinished ? (
            <div className="flex items-center gap-1 bg-gray-900 text-white px-3 py-1.5 rounded-lg">
              <span className="text-xl font-black">{match.homeScore}</span>
              <span className="text-gray-500 text-xs font-bold">:</span>
              <span className="text-xl font-black">{match.awayScore}</span>
            </div>
          ) : (
            <span className="text-2xl font-black text-gray-200 italic">VS</span>
          )}
        </div>

        {/* Away */}
        <div className="flex flex-col items-center w-1/3 gap-2">
          <div className="w-14 h-14 p-1 rounded-full border border-gray-100 bg-white shadow-sm group-hover:scale-110 transition-transform">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
               {match.awayTeam.logo ? <img src={match.awayTeam.logo} className="object-contain w-full h-full"/> : <div className="bg-gray-200 w-full h-full"/>}
            </div>
          </div>
          <span className="text-xs font-bold text-center leading-tight line-clamp-1">{match.awayTeam.name}</span>
        </div>
      </div>
    </div>
  );
}