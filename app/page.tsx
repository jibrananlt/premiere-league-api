export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">API Health Check</h1>
        <p className="text-slate-500 mb-6">System is running normally</p>
        
        <div className="bg-slate-100 rounded-lg p-4 text-left text-sm font-mono text-slate-600">
          <div className="flex justify-between mb-2">
            <span>Status:</span>
            <span className="text-green-600 font-bold">Active</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Environment:</span>
            <span>Production</span>
          </div>
          <div className="flex justify-between">
            <span>Timestamp:</span>
            <span>{new Date().toISOString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
