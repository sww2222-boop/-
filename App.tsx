import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MapSystem from './components/MapSystem';
import AcademicHub from './components/AcademicHub';
import CareerCenter from './components/CareerCenter';
import TripPlanner from './components/TripPlanner';
import Dashboard from './components/Dashboard';
import { ModuleType } from './types';
import { Leaf, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.HOME);

  const renderContent = () => {
    switch (activeModule) {
      case ModuleType.MAP_SYSTEM:
        return <MapSystem />;
      case ModuleType.ACADEMIC:
        return <AcademicHub />;
      case ModuleType.CAREER:
        return <CareerCenter />;
      case ModuleType.TRIP_PLANNER:
        return <TripPlanner />;
      case ModuleType.DASHBOARD:
        return <Dashboard />;
      case ModuleType.HOME:
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex flex-col justify-center items-center p-4">
             <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
               <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
                 <Leaf className="w-16 h-16 text-emerald-600" />
               </div>
               <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                 EcoPark Wisdom
               </h1>
               <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                 赋能国家公园建设，服务自然保护事业。<br/>
                 集成政策地图、学术洞察、职业发展与智慧管理的一站式专业平台。
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
                 <div 
                   onClick={() => setActiveModule(ModuleType.MAP_SYSTEM)}
                   className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-emerald-500 group"
                 >
                   <h3 className="text-xl font-bold text-gray-800 flex items-center group-hover:text-emerald-600">
                     政策与数据地图 <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={18}/>
                   </h3>
                   <p className="text-gray-500 mt-2">天地图数据集成，自然保护地空间可视化与政策智能检索。</p>
                 </div>
                 
                 <div 
                   onClick={() => setActiveModule(ModuleType.DASHBOARD)}
                   className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-blue-500 group"
                 >
                   <h3 className="text-xl font-bold text-gray-800 flex items-center group-hover:text-blue-600">
                     智慧管理驾驶舱 <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={18}/>
                   </h3>
                   <p className="text-gray-500 mt-2">实时游客流量监测、生态环境感知与AI辅助决策。</p>
                 </div>

                 <div 
                   onClick={() => setActiveModule(ModuleType.TRIP_PLANNER)}
                   className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-yellow-500 group"
                 >
                   <h3 className="text-xl font-bold text-gray-800 flex items-center group-hover:text-yellow-600">
                     游客服务规划 <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={18}/>
                   </h3>
                   <p className="text-gray-500 mt-2">AI 生成个性化考察路线，AR 虚拟导览与承载力预警。</p>
                 </div>

                 <div 
                   onClick={() => setActiveModule(ModuleType.ACADEMIC)}
                   className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-purple-500 group"
                 >
                   <h3 className="text-xl font-bold text-gray-800 flex items-center group-hover:text-purple-600">
                     学术研究枢纽 <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" size={18}/>
                   </h3>
                   <p className="text-gray-500 mt-2">核心期刊文献库，支持智能摘要与科研趋势分析。</p>
                 </div>
               </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50">
      <Header activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;