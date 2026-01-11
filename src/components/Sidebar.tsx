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
    <div className="w-64 bg-gray-100 p-4 flex flex-col justify-between h-full border-r border-gray-200">
      <div>
        <h2 className="text-xl font-bold mb-4">🎭 AI 情绪盲盒</h2>
        <h3 className="text-lg font-semibold mb-2">模式选择</h3>
        <select
          value={selectedMode}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          {modes.map(mode => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </select>
        <p className="text-sm text-gray-600">
          选择一个AI人格，体验不同的情绪互动！
        </p>
      </div>

      {/* 收款码区域 */}
      <div className="mt-8 text-center pt-4 border-t border-gray-200">
        <p className="text-md font-semibold mb-2">☕ 请作者喝杯咖啡</p>
        <div className="space-y-4">
          <img 
            src="你的微信收款码图片链接" // <-- 替换为你的微信收款码图片链接
            alt="微信支付" 
            className="w-full rounded-lg shadow-sm border border-gray-300"
          />
          <img 
            src="你的支付宝收款码图片链接" // <-- 替换为你的支付宝收款码图片链接
            alt="支付宝支付" 
            className="w-full rounded-lg shadow-sm border border-gray-300"
          />
        </div>
        <small className="text-gray-500 mt-2 block">觉得有趣就赏两块钱</small>
      </div>
    </div>
  );
}
