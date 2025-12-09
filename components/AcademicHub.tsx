import React, { useState } from 'react';
import { Search, BookOpen, Cpu, Users, ArrowRight, FileText } from 'lucide-react';
import { AcademicPaper } from '../types';
import { summarizePaper } from '../services/geminiService';

const MOCK_PAPERS: AcademicPaper[] = [
  { 
    id: '1', 
    title: '基于游憩机会谱(ROS)的国家公园特许经营适宜性评价', 
    authors: ['张三', '李四'], 
    journal: '自然资源学报', 
    year: 2023, 
    abstract: '本研究构建了基于ROS理论的国家公园特许经营适宜性评价指标体系，以三江源国家公园为例，探讨了不同管控分区的经营活动准入机制。结果表明...'
  },
  { 
    id: '2', 
    title: '智慧技术在国家公园生态监测中的应用现状与展望', 
    authors: ['王五', '赵六'], 
    journal: '生态学报', 
    year: 2024, 
    abstract: '随着物联网和人工智能技术的发展，智慧监测已成为国家公园管理的重要手段。本文综述了红外相机、无人机及卫星遥感在生物多样性监测中的应用案例...'
  },
  {
    id: '3',
    title: '游客拥挤感知对国家公园环境责任行为的影响机制',
    authors: ['陈七', '刘八'],
    journal: '旅游学刊',
    year: 2023,
    abstract: '基于刺激-机体-反应(S-O-R)理论，构建了游客拥挤感知、环境情感与环境责任行为的关系模型。实证分析发现，感知拥挤通过负面情绪显著抑制环境责任行为...'
  }
];

const AcademicHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activePaper, setActivePaper] = useState<AcademicPaper | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleSummarize = async (paper: AcademicPaper) => {
    setActivePaper(paper);
    setLoadingSummary(true);
    setSummary('');
    const result = await summarizePaper(paper.title, paper.abstract);
    setSummary(result || '无法生成摘要');
    setLoadingSummary(false);
  };

  const handlePlaceholderClick = (feature: string) => {
    alert(`【${feature}】模块正在接入学术数据库API，敬请期待！`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-emerald-900">学术研究枢纽</h2>
        <p className="text-gray-600 mt-2">聚合核心期刊、学位论文与前沿报告，AI赋能科研创新</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Tools & Topics */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <Cpu className="mr-2 text-emerald-600" /> AI 科研助手
            </h3>
            <div className="space-y-3">
              <button 
                className="w-full flex items-center justify-between p-3 bg-emerald-50 rounded-lg text-emerald-800 text-sm font-medium hover:bg-emerald-100 transition"
              >
                文献智能摘要 <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => handlePlaceholderClick('研究趋势分析')}
                className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
              >
                研究趋势分析 <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => handlePlaceholderClick('合作机构发现')}
                className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
              >
                合作机构发现 <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen className="mr-2 text-emerald-600" /> 专题专栏
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-2"></span>
                <span className="text-gray-700 cursor-pointer hover:text-emerald-700 hover:underline">国家公园适度旅游发展</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-2"></span>
                <span className="text-gray-700 cursor-pointer hover:text-emerald-700 hover:underline">智慧保护地技术应用</span>
              </li>
               <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-2"></span>
                <span className="text-gray-700 cursor-pointer hover:text-emerald-700 hover:underline">生态系统服务价值评估</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Paper List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="搜索论文标题、作者或关键词..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>

          {/* Results */}
          <div className="space-y-4">
            {MOCK_PAPERS.filter(p => p.title.includes(searchTerm)).map((paper) => (
              <div key={paper.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{paper.title}</h3>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">{paper.year}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Users size={14} className="mr-1" />
                  <span className="mr-4">{paper.authors.join(', ')}</span>
                  <BookOpen size={14} className="mr-1" />
                  <span>{paper.journal}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {paper.abstract}
                </p>
                <div className="flex space-x-3">
                   <button className="text-sm text-emerald-600 font-medium hover:underline flex items-center">
                    <FileText size={14} className="mr-1" /> 阅读全文
                   </button>
                   <button 
                    onClick={() => handleSummarize(paper)}
                    className="text-sm text-blue-600 font-medium hover:underline flex items-center"
                   >
                    <Cpu size={14} className="mr-1" /> AI 智能摘要
                   </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* AI Summary Result Modal Area (Inline for simplicity) */}
          {activePaper && (
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl border border-emerald-200 mt-6 animate-fade-in scroll-mt-20" id="summary-result">
              <h4 className="font-bold text-emerald-900 mb-2 flex items-center">
                <Cpu className="mr-2" size={18}/> AI 摘要: {activePaper.title}
              </h4>
              {loadingSummary ? (
                <div className="flex items-center space-x-2 text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-150"></div>
                  <span className="text-sm">Gemini 正在分析文献... (若网络受限将使用演示模式)</span>
                </div>
              ) : (
                <div className="prose prose-sm text-gray-700 max-w-none">
                  <p className="whitespace-pre-line leading-relaxed">{summary}</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AcademicHub;