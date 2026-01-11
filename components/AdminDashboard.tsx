
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { AssessmentResult, DonorType } from '../types';
import { DONOR_TYPES_INFO } from '../constants';

const AdminDashboard: React.FC = () => {
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'data'>('overview');

  useEffect(() => {
    const stored = localStorage.getItem('donor_assessments');
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  const clearData = () => {
    if (confirm("Permanently delete all donor insights data?")) {
      localStorage.removeItem('donor_assessments');
      setResults([]);
    }
  };

  const donorTypeCounts = results.reduce((acc, curr) => {
    acc[curr.donorType] = (acc[curr.donorType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(donorTypeCounts).map(([name, value]) => ({
    name: name.split(' ').pop(),
    fullName: name,
    value
  }));

  const pieData = chartData;

  const COLORS = ['#00adef', '#ffc20e', '#80bc00', '#d80b8c', '#1c3041', '#1cabe2', '#e2231a', '#94a3b8'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex-grow w-full font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <span className="text-[10px] font-black text-unicef-cyan uppercase tracking-[0.4em] mb-2 block">Staff Only</span>
          <h1 className="text-4xl font-black text-unicef-dark uppercase tracking-tight">Intelligence Dashboard</h1>
          <p className="text-slate-400 font-bold text-sm">Aggregated data from {results.length} unique profiles.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={clearData}
            className="px-6 py-3 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 rounded-full transition-colors"
          >
            Wipe Database
          </button>
          <button className="px-8 py-3 bg-unicef-dark text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-unicef-dark/20">
            Export Dataset
          </button>
        </div>
      </div>

      <div className="flex gap-8 border-b-2 border-slate-100 mb-12">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'overview' ? 'text-unicef-cyan' : 'text-slate-300 hover:text-slate-500'}`}
        >
          Visual Analytics
          {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-1 bg-unicef-cyan -mb-0.5 rounded-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('data')}
          className={`pb-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'data' ? 'text-unicef-cyan' : 'text-slate-300 hover:text-slate-500'}`}
        >
          Raw Respondents
          {activeTab === 'data' && <div className="absolute bottom-0 left-0 w-full h-1 bg-unicef-cyan -mb-0.5 rounded-full"></div>}
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 ring-4 ring-unicef-slate">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Total Profiles</span>
            <span className="text-5xl font-black text-unicef-dark">{results.length}</span>
            <div className="mt-4 flex items-center gap-1 text-unicef-green text-[10px] font-black">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" className="rotate-180"/></svg>
              12.4% MONTHLY GROWTH
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 ring-4 ring-unicef-slate">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Lead Capture</span>
            <span className="text-5xl font-black text-unicef-cyan">
              {results.length > 0 ? Math.round((results.filter(r => r.userData).length / results.length) * 100) : 0}%
            </span>
            <div className="mt-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Completed Opt-ins</div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 ring-4 ring-unicef-slate">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Dominant Persona</span>
            <div className="flex items-center gap-2">
               <span className="text-2xl font-black text-unicef-magenta">
                {chartData.sort((a,b) => b.value - a.value)[0]?.fullName.split(' ').pop() || 'None'}
              </span>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 ring-4 ring-unicef-slate">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Engagement Score</span>
            <span className="text-5xl font-black text-unicef-yellow">8.9</span>
            <div className="mt-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Avg. Motivation Level</div>
          </div>
        </div>
      ) : null}

      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 ring-4 ring-unicef-slate">
            <h3 className="text-xs font-black text-unicef-dark uppercase tracking-[0.2em] mb-10">Volume by Segment</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '1rem'}}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={50}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 ring-4 ring-unicef-slate">
            <h3 className="text-xs font-black text-unicef-dark uppercase tracking-[0.2em] mb-10">Persona Concentration</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {chartData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                  <span className="text-slate-500 truncate">{entry.fullName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden ring-4 ring-unicef-slate">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Collected</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identified Persona</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Respondent Name</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {results.length > 0 ? (
                  results.map((r) => (
                    <tr key={r.id} className="hover:bg-unicef-slate/50 transition-colors group">
                      <td className="px-10 py-6 text-[11px] font-bold text-slate-400">
                        {new Date(r.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-10 py-6">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${DONOR_TYPES_INFO[r.donorType].color} text-white`}>
                          {r.donorType}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-sm font-black text-unicef-dark uppercase tracking-tight">
                        {r.userData?.name || <span className="text-slate-300 italic font-medium lowercase">anon-{r.id}</span>}
                      </td>
                      <td className="px-10 py-6 text-[11px] font-bold text-unicef-cyan lowercase">
                        {r.userData?.email || <span className="text-slate-200">—</span>}
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200 px-3 py-1 rounded-lg">
                          {r.userData?.status || 'anonymous'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-10 py-32 text-center">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <p className="text-slate-300 font-black uppercase tracking-widest text-xs">Awaiting respondents</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
