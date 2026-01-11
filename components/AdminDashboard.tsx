
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
    if (confirm("Are you sure you want to clear all assessment data?")) {
      localStorage.removeItem('donor_assessments');
      setResults([]);
    }
  };

  const donorTypeCounts = results.reduce((acc, curr) => {
    acc[curr.donorType] = (acc[curr.donorType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(donorTypeCounts).map(([name, value]) => ({
    name: name.split(' ').pop(), // Short name
    fullName: name,
    value
  }));

  const pieData = chartData;

  const COLORS = ['#6366f1', '#2563eb', '#059669', '#d97706', '#4f46e5'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex-grow w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-500">Real-time insights from {results.length} completed assessments.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={clearData}
            className="px-4 py-2 text-rose-600 text-sm font-bold hover:bg-rose-50 rounded-lg transition-colors"
          >
            Clear Data
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-200 mb-8">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('data')}
          className={`pb-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'data' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Respondent Data
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-2">Total Completions</span>
            <span className="text-3xl font-extrabold text-slate-900">{results.length}</span>
            <div className="mt-2 text-emerald-600 text-xs font-bold">↑ 12% from last month</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-2">Lead Conversion</span>
            <span className="text-3xl font-extrabold text-slate-900">
              {results.length > 0 ? Math.round((results.filter(r => r.userData).length / results.length) * 100) : 0}%
            </span>
            <div className="mt-2 text-slate-400 text-xs">Users who left contact details</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-2">Dominant Type</span>
            <span className="text-xl font-extrabold text-indigo-600">
              {chartData.sort((a,b) => b.value - a.value)[0]?.fullName || 'N/A'}
            </span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-2">Avg. Score</span>
            <span className="text-3xl font-extrabold text-slate-900">18.4</span>
            <div className="mt-2 text-slate-400 text-xs">Total affinity points</div>
          </div>
        </div>
      ) : null}

      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-8">Personality Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-8">Segmentation Breakdown</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {chartData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                  <span className="text-slate-600 truncate">{entry.fullName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Donor Profile</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Email</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {results.length > 0 ? (
                  results.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(r.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${DONOR_TYPES_INFO[r.donorType].color} text-white`}>
                          {r.donorType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                        {r.userData?.name || <span className="text-slate-300 italic">Anonymous</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {r.userData?.email || <span className="text-slate-300">—</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 capitalize">
                        {r.userData?.status || <span className="text-slate-300">—</span>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-slate-400 italic">
                      No assessment data available yet.
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
