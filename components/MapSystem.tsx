import React, { useState } from 'react';
import { Layers, FileText, Filter, Info, MapPin, X } from 'lucide-react';
import { PolicyDoc } from '../types';

const MOCK_POLICIES: PolicyDoc[] = [
  { id: '1', title: '国家公园空间布局方案', level: 'Central', date: '2022-11', category: '规划' },
  { id: '2', title: '三江源国家公园条例', level: 'Provincial', date: '2023-01', category: '法规' },
  { id: '3', title: '自然保护地生态旅游特许经营管理办法', level: 'Central', date: '2023-05', category: '经营' },
  { id: '4', title: '关于推进国家公园建设若干财政政策的意见', level: 'Central', date: '2022-09', category: '财政' },
  { id: '5', title: '海南热带雨林国家公园保护条例', level: 'Provincial', date: '2021-12', category: '法规' },
];

const LAYERS = [
  { id: 'national_parks', label: '国家公园分布' },
  { id: '5a_scenic', label: '5A级景区监测' },
  { id: 'three_north', label: '三北工程范围' },
  { id: 'heritage', label: '自然遗产地' },
  { id: 'island', label: '和美海岛' },
];

const MapSystem: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('national_parks');
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyDoc | null>(null);
  const [mapFeature, setMapFeature] = useState<{name: string, desc: string} | null>(null);

  const handleFeatureClick = (name: string, desc: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clearing when clicking a feature
    setMapFeature({ name, desc });
  };

  const renderMapVisual = () => {
    return (
      <div 
        className="relative w-full h-full bg-blue-50 overflow-hidden rounded-lg border border-gray-300 shadow-inner group"
        onClick={() => setMapFeature(null)} // Click background to clear selection
      >
        {/* Abstract Map Background */}
        <svg className="w-full h-full absolute inset-0 text-gray-200 pointer-events-none" fill="currentColor">
           <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
             <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#cbd5e1"></circle>
           </pattern>
           <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
        
        {/* Layer Content Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          
          {/* Layer: National Parks */}
          {activeLayer === 'national_parks' && (
             <div className="relative w-3/4 h-3/4 opacity-90 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                  <path d="M20,30 Q40,5 60,30 T90,30" fill="none" stroke="#166534" strokeWidth="0.5" strokeDasharray="2,2" />
                  
                  <g className="cursor-pointer pointer-events-auto hover:scale-110 transition-transform group/item" 
                     onClick={(e) => handleFeatureClick("三江源国家公园", "面积: 19.07万平方公里\n特产: 雪豹, 藏羚羊\n中华水塔，长江、黄河、澜沧江发源地。", e)}>
                    <path d="M15,40 Q25,30 35,45 T15,60 Z" fill="#4ade80" stroke="#14532d" strokeWidth="1" className="group-hover/item:fill-emerald-400"/>
                    <text x="20" y="50" fontSize="3" fill="#064e3b" fontWeight="bold">三江源</text>
                  </g>
                  
                   <g className="cursor-pointer pointer-events-auto hover:scale-110 transition-transform group/item"
                      onClick={(e) => handleFeatureClick("大熊猫国家公园", "跨越川陕甘三省。\n保护国宝大熊猫及其栖息地。", e)}>
                    <circle cx="50" cy="55" r="8" fill="#4ade80" stroke="#14532d" strokeWidth="1" className="group-hover/item:fill-emerald-400"/>
                    <text x="45" y="56" fontSize="3" fill="#064e3b" fontWeight="bold">大熊猫</text>
                  </g>
                  
                   <g className="cursor-pointer pointer-events-auto hover:scale-110 transition-transform group/item"
                      onClick={(e) => handleFeatureClick("海南热带雨林国家公园", "位于海南岛中部。\n保存了中国最完好、连片面积最大的热带雨林。", e)}>
                    <path d="M60,80 L70,75 L75,85 Z" fill="#4ade80" stroke="#14532d" strokeWidth="1" className="group-hover/item:fill-emerald-400"/>
                    <text x="65" y="88" fontSize="3" fill="#064e3b" fontWeight="bold">热带雨林</text>
                  </g>
                  
                   <g className="cursor-pointer pointer-events-auto hover:scale-110 transition-transform group/item"
                      onClick={(e) => handleFeatureClick("武夷山国家公园", "世界文化与自然双遗产。\n丹霞地貌与红茶文化的发源地。", e)}>
                    <rect x="75" y="65" width="10" height="8" fill="#4ade80" stroke="#14532d" strokeWidth="1" className="group-hover/item:fill-emerald-400"/>
                    <text x="76" y="70" fontSize="3" fill="#064e3b" fontWeight="bold">武夷山</text>
                  </g>
                  
                   <g className="cursor-pointer pointer-events-auto hover:scale-110 transition-transform group/item"
                      onClick={(e) => handleFeatureClick("东北虎豹国家公园", "横跨吉林和黑龙江。\n野生东北虎、东北豹种群恢复地。", e)}>
                    <path d="M80,20 Q90,10 95,25" fill="#4ade80" stroke="#14532d" strokeWidth="1" className="group-hover/item:fill-emerald-400"/>
                    <text x="85" y="25" fontSize="3" fill="#064e3b" fontWeight="bold">东北虎豹</text>
                  </g>
                </svg>
             </div>
          )}
          
          {/* Layer: 5A Scenic */}
           {activeLayer === '5a_scenic' && (
             <div className="absolute inset-0 pointer-events-none">
               {[...Array(8)].map((_, i) => (
                 <div key={i} 
                      className="absolute text-red-600 animate-pulse cursor-pointer pointer-events-auto hover:scale-125 transition-transform" 
                      onClick={(e) => handleFeatureClick(`5A景区监测点 #${i+1}`, "实时游客流量: 适中\n当前承载力: 45%", e)}
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`
                      }}>
                   <MapPin size={24} fill="currentColor" className="text-red-100 drop-shadow-md" />
                 </div>
               ))}
             </div>
           )}

           {/* Other Layers Placeholders */}
           {(activeLayer === 'three_north' || activeLayer === 'heritage' || activeLayer === 'island') && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-lg text-center pointer-events-auto">
                   <Info size={40} className="text-blue-500 mx-auto mb-2" />
                   <h3 className="font-bold text-gray-800">{LAYERS.find(l => l.id === activeLayer)?.label}</h3>
                   <p className="text-sm text-gray-500 mt-1">该图层数据正在接入中...</p>
                </div>
             </div>
           )}
        </div>
        
        {/* Map Feature Popup (Bottom Center) */}
        {mapFeature && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur shadow-xl rounded-lg p-4 border-l-4 border-emerald-500 w-80 animate-fade-in z-20">
             <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900">{mapFeature.name}</h3>
                <button onClick={(e) => { e.stopPropagation(); setMapFeature(null); }} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
             </div>
             <p className="text-sm text-gray-600 whitespace-pre-line">{mapFeature.desc}</p>
             <button className="mt-3 text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded hover:bg-emerald-200 transition">
               查看详细数据
             </button>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow border border-gray-200 text-xs z-10">
          <h4 className="font-bold mb-2">图例</h4>
          <div className="flex items-center mb-1"><span className="w-3 h-3 bg-green-400 border border-green-800 mr-2"></span> 国家公园核心区</div>
          <div className="flex items-center mb-1"><span className="w-3 h-3 bg-red-400 border border-red-800 rounded-full mr-2"></span> 5A级景区</div>
          <div className="flex items-center"><span className="w-3 h-3 border-t-2 border-dashed border-gray-600 mr-2"></span> 生态廊道</div>
        </div>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs text-gray-500 z-10 shadow-sm">
           数据源: 天地图 · 自然资源部
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-100">
      {/* Sidebar: Layers & Filters */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col z-20 shadow-lg">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-emerald-800 flex items-center">
            <Layers className="mr-2" size={20} /> 数据图层
          </h2>
        </div>
        <div className="p-2 space-y-1 overflow-y-auto flex-1">
          {LAYERS.map((layer) => (
            <button 
              key={layer.id}
              onClick={() => { setActiveLayer(layer.id); setMapFeature(null); }}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                activeLayer === layer.id 
                  ? 'bg-emerald-100 text-emerald-800 border-l-4 border-emerald-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>

        {/* Policy Filter Section */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h3 className="text-sm font-bold text-gray-700 flex items-center mb-3">
            <Filter className="mr-2" size={16} /> 政策筛选
          </h3>
          <div className="space-y-2">
            <select className="w-full text-xs border-gray-300 rounded shadow-sm p-1 border focus:ring-1 focus:ring-emerald-500 outline-none">
              <option>全部级别 (中央/地方)</option>
              <option>中央政策</option>
              <option>地方性法规</option>
            </select>
            <select className="w-full text-xs border-gray-300 rounded shadow-sm p-1 border focus:ring-1 focus:ring-emerald-500 outline-none">
              <option>全部主题</option>
              <option>生态补偿</option>
              <option>特许经营</option>
              <option>空间规划</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 p-4 relative z-0">
        {renderMapVisual()}
      </div>

      {/* Right Panel: Policy & Details */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col z-20 shadow-lg">
        <div className="p-4 border-b border-gray-100 bg-emerald-50">
          <h2 className="text-lg font-bold text-emerald-900 flex items-center">
            <FileText className="mr-2" size={20} /> 政策文献库
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {MOCK_POLICIES.map((policy) => (
            <div 
              key={policy.id} 
              onClick={() => setSelectedPolicy(policy)}
              className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${selectedPolicy?.id === policy.id ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-gray-200 bg-white'}`}
            >
              <div className="flex justify-between items-start">
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${policy.level === 'Central' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                  {policy.level === 'Central' ? '中央' : '地方'}
                </span>
                <span className="text-[10px] text-gray-400">{policy.date}</span>
              </div>
              <h4 className="text-sm font-medium text-gray-800 mt-2 line-clamp-2">{policy.title}</h4>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-0.5 rounded">{policy.category}</span>
              </div>
            </div>
          ))}
        </div>
        
        {selectedPolicy && (
          <div className="p-4 bg-gray-50 border-t border-gray-200 min-h-[150px]">
             <h4 className="font-bold text-sm text-gray-800 mb-2">政策详情摘要</h4>
             <p className="text-xs text-gray-600 leading-relaxed">
               该文件（{selectedPolicy.title}）发布于{selectedPolicy.date}，属于{selectedPolicy.level === 'Central' ? '国家级' : '省级'}重要文件。
               <br/><br/>
               <span className="text-emerald-600 cursor-pointer hover:underline flex items-center" onClick={() => alert("即将跳转到PDF全文阅读器...")}>
                 <Info size={12} className="mr-1"/> 查看全文及智能解读
               </span>
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSystem;