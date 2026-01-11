'use client';

import { useState, useRef, useEffect } from 'react';

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState("极致杠精 💢");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    const newMessage = { role: 'user', content: inputMessage };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage, mode: currentMode }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'ai', content: data.reply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'ai', content: "网络被气断了..." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6' }}>
      {/* 侧边栏 */}
      <div style={{ width: '280px', backgroundColor: 'white', padding: '24px', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '24px', marginBottom: '24px' }}>小何 AI 情绪盒</h2>
        <label style={{ fontSize: '14px', color: '#374151', marginBottom: '8px', display: 'block' }}>切换人格模式</label>
        <select 
          value={currentMode} 
          onChange={(e) => setCurrentMode(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', marginBottom: '20px' }}
        >
          {["极致杠精 💢", "极致舔狗 ❤️", "阴阳怪气 🍵"].map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <div style={{ flex: 1, overflowY: 'auto', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>☕ 请作者喝杯咖啡</p>
          <img src="https://youke3.picui.cn/s1/2026/01/12/6963e20a9d019.png" style={{ width: '100%', borderRadius: '12px', marginBottom: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
          <img src="https://youke3.picui.cn/s1/2026/01/12/6963e23771e4a.png" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
          <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '10px' }}>点击图片可长按保存</p>
        </div>
      </div>

      {/* 聊天主区 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
              <div style={{ 
                padding: '12px 16px', borderRadius: '12px', 
                backgroundColor: msg.role === 'user' ? '#2563eb' : 'white',
                color: msg.role === 'user' ? 'white' : '#1f2937',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '20px', backgroundColor: 'white', borderTop: '1px solid #e5e7eb', display: 'flex' }}>
          <input 
            type="text" 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="输入你的消息..."
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
          />
          <button onClick={sendMessage} style={{ marginLeft: '12px', padding: '10px 24px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            发送
          </button>
        </div>
      </div>
    </div>
  );
}
