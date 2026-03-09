// src/components/Sidebar.tsx
'use client';

import { useState } from 'react';

interface SidebarProps {
  onModeChange: (mode: string) => void;
  currentMode: string;
}

const modes = ["极致杠精 💢", "极致舔狗 ❤️", "阴阳怪气 🍵"];

export default function Sidebar({ onModeChange, currentMode }: SidebarProps) {
  const [selectedMode, setSelectedMode] = useState(currentMode);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMode(e.target.value);
    onModeChange(e.target.value);
  };

  return (
    <div className="w-72 bg-white p-6 flex flex-col justify-between h-full border-r border-gray-100 shadow-sm">
      <div>
        <h2 className="text-2xl font-black text-blue-600 mb-6 tracking-tight">小贺 AI 情绪盒</h2>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">切换人格模式</label>
          <select
            value={selectedMode}
            onChange={handleChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            {modes.map(mode => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-2xl">
          <p className="text-sm text-blue-800 leading-relaxed">
            💡 <b>玩法建议：</b><br/>
            试试在“极致杠精”模式下问它：1+1为什么等于2？
          </p>
        </div>
      </div>

      {/* 你的收款码区域 */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-center text-sm font-bold text-gray-800 mb-4">觉得准？请作者喝杯咖啡 ☕</p>
        <div className="grid grid-cols-1 gap-4">
          <div className="text-center">
            <img 
              src="https://tu.xiaohelei.us.ci/1773052266470_npv070_wx.png" 
              alt="微信收款" 
              className="w-full rounded-xl shadow-md border border-gray-50 hover:scale-105 transition-transform"
            />
            <span className="text-[10px] text-gray-400 mt-1 uppercase">WeChat Pay</span>
          </div>
          <div className="text-center">
            <img 
              src="https://tu.xiaohelei.us.ci/1773052264106_ua93cj_zf.png" 
              alt="支付宝收款" 
              className="w-full rounded-xl shadow-md border border-gray-50 hover:scale-105 transition-transform"
            />
            <span className="text-[10px] text-gray-400 mt-1 uppercase">Alipay</span>
          </div>
        </div>
        <p className="text-center text-[11px] text-gray-400 mt-4 italic">点击图片可长按保存</p>
      </div>
    </div>
  );
}
