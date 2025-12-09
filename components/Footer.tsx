import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">平台简介</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              EcoPark Wisdom 致力于为国家公园管理者、研究者及公众提供最权威的政策数据、学术资源与智慧化工具，推动自然保护地高质量发展。
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">核心功能</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>政策与数据交互地图</li>
              <li>国家公园学术研究枢纽</li>
              <li>生态旅游职业发展中心</li>
              <li>智慧管理数据驾驶舱</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">友情链接 / 合作机构</h3>
            <ul className="space-y-2 text-sm text-emerald-700 font-medium">
              <li><a href="#" className="hover:underline">中南林业科技大学国家公园与旅游学院</a></li>
              <li><a href="#" className="hover:underline">湖南师范大学旅游学院</a></li>
              <li><a href="#" className="hover:underline">中国社会科学院旅游研究中心</a></li>
              <li><a href="#" className="hover:underline">国家林业和草原局</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-xs text-gray-400">
            &copy; 2024 EcoPark Wisdom. All rights reserved. Powered by React, Tailwind & Gemini.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;