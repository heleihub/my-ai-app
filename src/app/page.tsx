'use client';
import { useState, useRef, useEffect } from 'react';

export default function GeminiStylePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("极致杠精 💢");
  const chatEnd = useRef(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, mode })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply || "API 未响应，请检查 Netlify 变量设置" }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', content: "连接失败，请稍后重试。" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8fafd', color: '#1f1f1f', fontFamily: 'Segoe UI, Roboto, sans-serif' }}>
      {/* 侧边栏：极简清爽 */}
      <div style={{ width: '260px', backgroundColor: '#f0f4f9', padding: '20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #dee2e6' }}>
        <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '30px', color: '#0b57d0' }}>Gemini Pro Max</div>
        
        <label style={{ fontSize: '12px', fontWeight: '600', color: '#444746', marginBottom: '8px' }}>人格设定</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: '10px', borderRadius: '12px', border: '1px solid #c4c7c5', backgroundColor: 'white', marginBottom: '20px', outline: 'none' }}>
          {["极致杠精 💢", "极致舔狗 ❤️", "阴阳怪气 🍵"].map(m => <option key={m}>{m}</option>)}
        </select>

        <div style={{ flex: 1 }} />
        
        {/* 收款码：优化比例，不挡视线 */}
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '12px', marginBottom: '10px', color: '#444746' }}>支持作者</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <img src="https://youke3.picui.cn/s1/2026/01/12/6963e20a9d019.png" style={{ width: '46%', borderRadius: '8px' }} alt="微信" />
            <img src="https://youke3.picui.cn/s1/2026/01/12/6963e23771e4a.png" style={{ width: '46%', borderRadius: '8px' }} alt="支付宝" />
          </div>
        </div>
      </div>

      {/* 主聊天区 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '40px 10%' }}>
          {messages.length === 0 && (
            <div style={{ marginTop: '15vh', fontSize: '32px', color: '#c4c7c5', fontWeight: '500' }}>
              你好，我是小何 AI。<br/><span style={{ fontSize: '20px' }}>今天想听点什么？（当前模式：{mode}）</span>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: '30px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '80%', padding: '12px 20px', borderRadius: '18px', lineHeight: '1.6', backgroundColor: msg.role === 'user' ? '#e9eef6' : 'transparent', border: msg.role === 'user' ? 'none' : 'none' }}>
                {msg.role === 'ai' && <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#0b57d0' }}>AI Response</div>}
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div style={{ color: '#c4c7c5', fontSize: '14px' }}>AI 正在思考...</div>}
          <div ref={chatEnd} />
        </div>

        {/* 输入框区域：Gemini 风格胶囊设计 */}
        <div style={{ padding: '20px 10%', backgroundColor: '#f8fafd' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f4f9', borderRadius: '32px', padding: '8px 20px', border: '1px solid transparent', transition: '0.3s' }}>
            {/* 附件图标 */}
            <button style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '8px' }}>➕</button>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="在这里输入提示词..."
              style={{ flex: 1, background: 'none', border: 'none', padding: '12px', outline: 'none', fontSize: '16px' }}
            />
            {/* 语音图标 */}
            <button style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '8px' }}>🎙️</button>
            {/* 发送按钮 */}
            <button onClick={handleSend} style={{ background: '#0b57d0', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', marginLeft: '10px' }}>➔</button>
          </div>
          <div style={{ textAlign: 'center', fontSize: '11px', color: '#707070', marginTop: '10px' }}>
            Gemini 可能会产生错误信息，请核实重要回复。
          </div>
        </div>
      </div>
    </div>
  );
}
