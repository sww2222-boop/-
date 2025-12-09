import React from 'react';
import { Briefcase, MapPin, Award, UserCheck, TrendingUp } from 'lucide-react';
import { JobListing } from '../types';

const MOCK_JOBS: JobListing[] = [
  { id: '1', title: '国家公园规划设计师', organization: '国家林草局规划设计院', location: '北京', type: 'Government', salary: '15k-25k' },
  { id: '2', title: '自然教育专员', organization: '三江源国家公园管理局', location: '青海·玉树', type: 'Government', salary: '8k-12k' },
  { id: '3', title: '生态旅游产品经理', organization: '某知名文旅集团', location: '成都', type: 'Enterprise', salary: '20k-35k' },
  { id: '4', title: '生物多样性监测研究员', organization: '中科院动物所', location: '野外台站', type: 'Research', salary: '12k-20k' },
];

const EXPERTS = [
  { name: '陈教授', title: '国家公园研究院院长', field: '管理体制改革' },
  { name: '李博士', title: '首席生态学家', field: '生物多样性保护' },
  { name: '王总工', title: '资深规划师', field: '游憩设施规划' },
];

const CareerCenter: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-emerald-900">国家公园人才发展中心</h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          连接体制内外优质机会，助力生态保护与旅游管理专业人才成长
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Career Tools */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
             <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="mr-2 text-emerald-600" /> 职业成长工具
            </h3>
            <button 
              onClick={() => alert('正在加载专业能力评估模型...')}
              className="w-full mb-3 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded transition text-sm shadow-sm"
            >
              专业能力评估
            </button>
             <button 
              onClick={() => alert('请先完善简历信息以获取智能推荐')}
              className="w-full bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-2 px-4 rounded transition text-sm"
            >
              职业路径推荐
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <UserCheck className="mr-2 text-emerald-600" /> 专家名录库
            </h3>
            <div className="space-y-4">
              {EXPERTS.map((expert, idx) => (
                <div key={idx} className="flex items-start pb-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 p-2 -mx-2 rounded transition cursor-pointer">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 flex items-center justify-center font-bold mr-3">
                    {expert.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{expert.name}</div>
                    <div className="text-xs text-gray-500">{expert.title}</div>
                    <div className="text-xs text-emerald-600 mt-1">{expert.field}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-center text-gray-500 hover:text-emerald-600 underline">查看更多专家</button>
          </div>
        </div>

        {/* Right: Job Listings */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">最新机遇</h3>
            <div className="flex space-x-2">
               <span className="px-3 py-1 bg-white border rounded-full text-xs cursor-pointer hover:border-emerald-500 hover:text-emerald-600 transition">全部</span>
               <span className="px-3 py-1 bg-white border rounded-full text-xs cursor-pointer hover:border-emerald-500 hover:text-emerald-600 transition">管理局/事业单位</span>
               <span className="px-3 py-1 bg-white border rounded-full text-xs cursor-pointer hover:border-emerald-500 hover:text-emerald-600 transition">科研院校</span>
            </div>
          </div>

          <div className="grid gap-4">
            {MOCK_JOBS.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 border-emerald-500 flex flex-col sm:flex-row sm:items-center justify-between group">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-lg font-bold text-gray-900 flex items-center group-hover:text-emerald-700 transition-colors">
                    {job.title}
                    {job.type === 'Government' && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase">体制内</span>}
                  </h4>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Briefcase size={14} className="mr-1" /> {job.organization}
                    <span className="mx-2">|</span>
                    <MapPin size={14} className="mr-1" /> {job.location}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-emerald-600 font-bold text-lg">{job.salary}</span>
                   <button className="mt-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded text-sm hover:bg-emerald-100 font-medium transition-colors">
                     查看详情
                   </button>
                </div>
              </div>
            ))}
          </div>

          {/* UGC Section Hint */}
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
            <h4 className="text-blue-900 font-bold mb-2">分享你的岗位经验</h4>
            <p className="text-sm text-blue-700 mb-4">我们在建立真实的行业岗位评价数据库，帮助更多人了解国家公园行业现状。</p>
            <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm shadow-sm">
              提交匿名评价
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerCenter;