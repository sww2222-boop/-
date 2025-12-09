import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { ShieldCheck, Users, Activity, Droplets, AlertCircle, MessageSquare } from 'lucide-react';
import { getSmartInsight } from '../services/geminiService';

const VISITOR_DATA = [
  { time: '08:00', visitors: 120 },
  { time: '10:00', visitors: 450 },
  { time: '12:00', visitors: 1200 },
  { time: '14:00', visitors: 980 },
  { time: '16:00', visitors: 600 },
  { time: '18:00', visitors: 200 },
];

const ECO_DATA = [
  { month: 'Jan', aqi: 20, water: 95 },
  { month: 'Feb', aqi: 25, water: 94 },
  { month: 'Mar', aqi: 35, water: 92 },
  { month: 'Apr', aqi: 40, water: 90 },
  { month: 'May', aqi: 30, water: 93 },
  { month: 'Jun', aqi: 22, water: 96 },
];

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState('');
  const [loadingInsight, setLoadingInsight] = useState(false);

  const generateInsight = async () => {
    setLoadingInsight(true);
    // Mock context data for the AI
    const context = "Current visitor peak at 12:00 is 1200, nearing capacity (1500). Water quality index is 96 (Excellent).";
    const result = await getSmartInsight("分析当前游客流量与生态承载力风险", context);
    setInsight(result || "无法获取分析");
    setLoadingInsight(false);
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wider">智慧管理驾驶舱</h2>
          <p className="text-slate-400 text-sm">Smart Management Cockpit · 祁连山数据中心镜像</p>
        </div>
        <div className="flex space-x-4">
           <div className="text-right">
             <div className="text-3xl font-bold text-emerald-400">98.5%</div>
             <div className="text-xs text-slate-400">生态合规率</div>
           </div>
           <div className="text-right border-l border-slate-700 pl-4">
             <div className="text-3xl font-bold text-blue-400">12,450</div>
             <div className="text-xs text-slate-400">今日累计入园</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-4 rounded-lg border-t-4 border-blue-500 shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-400 text-sm">实时在园人数</h3>
            <Users size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-white">3,245</p>
          <div className="mt-2 text-xs text-green-400">▼ 12% 较昨日同时段</div>
        </div>
        
        <div className="bg-slate-800 p-4 rounded-lg border-t-4 border-emerald-500 shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-400 text-sm">生物多样性指数</h3>
            <Activity size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-white">8.4/10</p>
          <div className="mt-2 text-xs text-slate-400">红外相机监测正常</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg border-t-4 border-cyan-500 shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-400 text-sm">水质监测 (I类)</h3>
            <Droplets size={16} className="text-cyan-500" />
          </div>
          <p className="text-2xl font-bold text-white">优</p>
          <div className="mt-2 text-xs text-slate-400">DO: 8.5mg/L</div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg border-t-4 border-yellow-500 shadow-lg cursor-pointer hover:bg-slate-750" onClick={generateInsight}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-slate-400 text-sm">智能预警</h3>
            <AlertCircle size={16} className="text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-white">{loadingInsight ? '分析中...' : '点击获取'}</p>
          <div className="mt-2 text-xs text-yellow-400">AI 辅助决策支持</div>
        </div>
      </div>
      
      {/* AI Insight Overlay */}
      {insight && (
        <div className="mb-6 bg-indigo-900/50 border border-indigo-500 p-4 rounded-lg flex items-start animate-fade-in">
           <MessageSquare className="text-indigo-400 mt-1 mr-3 flex-shrink-0" />
           <div>
             <h4 className="font-bold text-indigo-300 text-sm mb-1">AI 决策建议</h4>
             <p className="text-sm text-indigo-100 leading-relaxed">{insight}</p>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor Flow Chart */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded"></span>
            游客实时流量监测 (人次)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={VISITOR_DATA}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVis)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Eco Monitor Chart */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center">
             <span className="w-1 h-6 bg-emerald-500 mr-3 rounded"></span>
            生态环境质量趋势
          </h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ECO_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                />
                <Line type="monotone" dataKey="water" name="水质指数" stroke="#22d3ee" strokeWidth={2} />
                <Line type="monotone" dataKey="aqi" name="AQI (低优)" stroke="#34d399" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-slate-800 rounded-xl p-6">
         <h3 className="text-lg font-bold text-white mb-4">最新监测警报</h3>
         <div className="overflow-x-auto">
           <table className="w-full text-sm text-left text-slate-400">
             <thead className="text-xs text-slate-500 uppercase bg-slate-700/50">
               <tr>
                 <th className="px-6 py-3">时间</th>
                 <th className="px-6 py-3">区域</th>
                 <th className="px-6 py-3">事件类型</th>
                 <th className="px-6 py-3">状态</th>
               </tr>
             </thead>
             <tbody>
               <tr className="border-b border-slate-700 hover:bg-slate-700/50">
                 <td className="px-6 py-4">10:42:15</td>
                 <td className="px-6 py-4">核心保护区 A03</td>
                 <td className="px-6 py-4 text-yellow-500">疑似人类活动闯入</td>
                 <td className="px-6 py-4"><span className="bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded-full text-xs">处理中</span></td>
               </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-700/50">
                 <td className="px-6 py-4">09:15:00</td>
                 <td className="px-6 py-4">一般控制区 B12</td>
                 <td className="px-6 py-4 text-emerald-500">红外相机捕捉雪豹影像</td>
                 <td className="px-6 py-4"><span className="bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded-full text-xs">已归档</span></td>
               </tr>
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;