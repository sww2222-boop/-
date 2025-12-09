import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// We use a safe initialization that won't crash if the key is missing immediately, 
// but calls will fail and be caught by our mock handlers.
const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;
try {
  ai = new GoogleGenAI({ apiKey });
} catch (e) {
  console.warn("Gemini Client Init Warning:", e);
}

const MODEL_NAME = 'gemini-2.5-flash';

// --- MOCK DATA FOR FALLBACKS ---

const MOCK_TRIP_PLAN = {
  summary: "为您规划的武夷山3日生态之旅，重点涵盖九曲溪生态观测与岩茶文化体验。行程强度适中，兼顾自然教育与休闲摄影。",
  itinerary: [
    "D1: 上午抵达武夷山，入住度假区。下午前往天游峰进行地质地貌考察，观察丹霞地貌特征。傍晚探访武夷宫，了解宋代理学文化。",
    "D2: 清晨前往九曲溪进行竹筏漂流（观察水生生态系统）。下午深入桐木关自然保护区（需预约），参观国家公园宣教馆，进行生物多样性速览。",
    "D3: 上午探访大红袍母树景区，体验岩骨花香的茶文化生态。下午整理考察笔记，返程。"
  ],
  tips: "保护区内严禁烟火；观察野生猴群时请保持距离；建议携带长焦镜头拍摄鸟类。",
  gear: "防滑徒步鞋, 速干衣裤, 望远镜 (8x42推荐), 防蚊液, 广角相机"
};

const MOCK_SUMMARY = "1. 研究构建了基于游憩机会谱(ROS)的评价体系，将国家公园划分为严格保护、生态保育、传统利用等不同管控区。\n2. 实证分析表明，核心保护区应严格禁止特许经营，而一般控制区可适度开展生态教育与低干扰游憩活动。\n3. 提出了特许经营准入的“正面清单”与“负面清单”管理机制，为政策制定提供了量化依据。";

const MOCK_INSIGHT = "当前游客流量接近承载力警戒线（80%），且主要集中在核心景观区。建议立即启动二级分流预案，通过智慧广播引导游客前往非热点区域（如生态科普馆），同时暂停特定入口的检票，以降低生态干扰风险。";

// --- SERVICE FUNCTIONS ---

export const generateTripPlan = async (destination: string, days: number, type: string, interests: string) => {
  if (!ai || !apiKey) {
    console.warn("Using Mock Trip Data (No API Key)");
    return new Promise(resolve => setTimeout(() => resolve(MOCK_TRIP_PLAN), 1500));
  }

  try {
    const prompt = `
      Create a detailed ${days}-day itinerary for a ${type} trip to ${destination}.
      Focus on ${interests}.
      Include:
      1. Daily schedule with times.
      2. Specific spots to visit (focus on ecological and educational value).
      3. Tips for sustainable travel in this protected area.
      4. Required gear or preparation.
      
      Format the output as a structured JSON object with keys: 'summary', 'itinerary' (array of strings, one per day), 'tips', 'gear'.
      Do not use markdown formatting in the JSON string.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Trip Plan Error (Falling back to mock):", error);
    // Fallback to mock data on error (e.g., 403 Region not supported)
    return MOCK_TRIP_PLAN;
  }
};

export const summarizePaper = async (paperTitle: string, abstract: string) => {
  if (!ai || !apiKey) {
    return new Promise<string>(resolve => setTimeout(() => resolve(MOCK_SUMMARY), 1000));
  }

  try {
    const prompt = `
      Act as an academic researcher in the field of National Parks and Tourism Management.
      Summarize the following paper abstract into 3 key bullet points focusing on practical implications for park management.
      
      Title: ${paperTitle}
      Abstract: ${abstract}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Summary Error (Falling back to mock):", error);
    return MOCK_SUMMARY;
  }
};

export const getSmartInsight = async (query: string, contextData: string) => {
  if (!ai || !apiKey) {
    return new Promise<string>(resolve => setTimeout(() => resolve(MOCK_INSIGHT), 1000));
  }

    try {
        const prompt = `
          You are an expert AI consultant for the "National Park Smart Management Cockpit".
          Based on the user query and the provided dashboard data context, provide a strategic insight or recommendation.
          Keep it concise (under 100 words) and professional.
          
          Context Data: ${contextData}
          User Query: ${query}
        `;
    
        const response = await ai.models.generateContent({
          model: MODEL_NAME,
          contents: prompt,
        });
    
        return response.text;
      } catch (error) {
        console.error("Gemini Insight Error (Falling back to mock):", error);
        return MOCK_INSIGHT;
      }
}