import React, { useState } from 'react';
import { Compass, Calendar, Map, CheckCircle, Sparkles, AlertTriangle } from 'lucide-react';
import { generateTripPlan } from '../services/geminiService';

const TripPlanner: React.FC = () => {
  const [formData, setFormData] = useState({
    destination: '武夷山国家公园',
    days: 3,
    type: '生态旅游', // Ecological Tourism, Scientific Expedition, Internship
    interests: '观鸟, 茶文化, 摄影'
  });
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setPlan(null);
    try {
      const result = await generateTripPlan(formData.destination, formData.days, formData.type, formData.interests);
      setPlan(result);
    } catch (err) {
      setError('生成路线失败，请稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <Sparkles className="mr-3 text-yellow-300" /> AI 智能行程规划
          </h2>
          <p className="text-emerald-100 max-w-2xl">
            基于Tripplanner智能算法，结合实时潮汐气象与承载力数据，为您定制个性化的国家公园考察与旅游路线。
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
          <Compass size={200} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 h-fit">
          <h3 className="font-bold text-gray-800 mb-6 border-b pb-2">定制您的行程</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">目的地</label>
              <select 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 border"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
              >
                <option>武夷山国家公园</option>
                <option>三江源国家公园</option>
                <option>大熊猫国家公园</option>
                <option>海南热带雨林国家公园</option>
                <option>东北虎豹国家公园</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">天数</label>
              <input 
                type="number" 
                min="1" 
                max="15"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 border"
                value={formData.days}
                onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">出行类型</label>
              <select 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 border"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="生态旅游">生态旅游 (休闲观光)</option>
                <option value="科研考察">科研考察 (深度调研)</option>
                <option value="专业实习">专业实习 (学习实践)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">兴趣偏好 / 重点关注</label>
              <textarea 
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2 border"
                rows={3}
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
                placeholder="例如：观鸟、地质地貌、当地文化..."
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-bold transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl'}`}
            >
              {loading ? '正在规划中...' : '生成智能行程'}
            </button>
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-lg flex items-start">
             <CheckCircle className="text-blue-600 mr-2 flex-shrink-0 mt-0.5" size={16} />
             <p className="text-xs text-blue-800">
               行程生成后，支持AR场景导览预览（虚拟考察功能）。
             </p>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
              <AlertTriangle className="mr-2" size={20}/> {error}
            </div>
          )}

          {!plan && !loading && !error && (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl h-96 flex flex-col items-center justify-center text-gray-400">
              <Map size={48} className="mb-4" />
              <p>请在左侧填写信息并生成行程</p>
            </div>
          )}

          {loading && (
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-96 flex flex-col items-center justify-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
               <p className="text-emerald-700 font-medium">AI 正在分析生态数据与路线可行性...</p>
             </div>
          )}

          {plan && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-emerald-500">
                <h3 className="text-xl font-bold text-gray-900 mb-2">行程综述</h3>
                <p className="text-gray-600 leading-relaxed">{plan.summary}</p>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-3 rounded border border-orange-100">
                    <h4 className="font-bold text-orange-800 text-sm mb-1">必备装备</h4>
                    <p className="text-xs text-orange-700">{plan.gear || "徒步鞋, 防晒霜, 雨具, 望远镜"}</p>
                  </div>
                   <div className="bg-green-50 p-3 rounded border border-green-100">
                    <h4 className="font-bold text-green-800 text-sm mb-1">生态贴士</h4>
                    <p className="text-xs text-green-700">{plan.tips || "请勿投喂野生动物，带走所有垃圾"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                 {plan.itinerary?.map((day: any, index: number) => (
                   <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                     <div className="flex items-center mb-3">
                       <div className="bg-emerald-600 text-white font-bold rounded-lg w-10 h-10 flex items-center justify-center mr-4">
                         D{index + 1}
                       </div>
                       <h4 className="text-lg font-bold text-gray-800">第 {index + 1} 天行程</h4>
                     </div>
                     <div className="ml-14 space-y-2 text-gray-600 text-sm whitespace-pre-line">
                       {/* Assuming the API returns text or simple structure, render simply */}
                       {JSON.stringify(day).replace(/["{}[\]]/g, ' ').slice(0, 300)}...
                     </div>
                     <div className="ml-14 mt-3 flex items-center text-xs text-blue-600 cursor-pointer hover:underline">
                        <Map size={14} className="mr-1"/> 查看当日AR虚拟导览
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;