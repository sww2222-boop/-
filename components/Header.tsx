import React from 'react';
import { ModuleType } from '../types';
import { Leaf, Map, BookOpen, Briefcase, Compass, BarChart3 } from 'lucide-react';

interface HeaderProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeModule, setActiveModule }) => {
  const navItems = [
    { id: ModuleType.MAP_SYSTEM, label: '政策与数据地图', icon: <Map size={18} /> },
    { id: ModuleType.ACADEMIC, label: '学术研究枢纽', icon: <BookOpen size={18} /> },
    { id: ModuleType.CAREER, label: '职业发展平台', icon: <Briefcase size={18} /> },
    { id: ModuleType.TRIP_PLANNER, label: '游客服务规划', icon: <Compass size={18} /> },
    { id: ModuleType.DASHBOARD, label: '智慧管理驾驶舱', icon: <BarChart3 size={18} /> },
  ];

  return (
    <header className="bg-emerald-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setActiveModule(ModuleType.HOME)}
          >
            <div className="bg-emerald-500 p-2 rounded-full mr-3">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none tracking-wide">EcoPark Wisdom</h1>
              <p className="text-xs text-emerald-300 font-light">国家公园一站式知识平台</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeModule === item.id
                    ? 'bg-emerald-700 text-white shadow-inner'
                    : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-emerald-700 flex items-center justify-center border border-emerald-500 text-xs font-bold">
              User
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Placeholder (Not fully implemented for brevity) */}
      <div className="md:hidden border-t border-emerald-800 bg-emerald-900 overflow-x-auto whitespace-nowrap py-2 px-2">
         {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`inline-flex items-center px-3 py-2 rounded-md text-xs font-medium mr-2 ${
                  activeModule === item.id
                    ? 'bg-emerald-700 text-white'
                    : 'text-emerald-100'
                }`}
              >
                {item.label}
              </button>
            ))}
      </div>
    </header>
  );
};

export default Header;