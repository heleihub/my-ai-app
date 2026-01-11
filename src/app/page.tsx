'use client';
import { useState, useRef, useEffect } from 'react';

export default function XiaoHeAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("极致杠精 💢");
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);
  const chatEnd = useRef(null);

  // 语音识别：真实起作用，自动将语音转为文字填入输入框
  const startSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("当前浏览器不支持语音识别");
    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.onresult = (e) => setInput(e.results[0][0].transcript);
    recognition.start();
  };

  // 附件处理：支持图片识别
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAttachedFile({ data: reader.result.split(',')[1], type: file.type, name: file.name });
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !attachedFile) return;
    const userMsg = { role: 'user', content: input, fileName: attachedFile?.name };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, mode, fileData: attachedFile?.data, mimeType: attachedFile?.type })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
      setAttachedFile(null);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', content: "API 未响应，请检查环境变量设置" }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f8fafd', fontFamily: 'Inter, sans-serif' }}>
      {/* 顶部标题 */}
      <div style={{ padding: '20px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#0b57d0' }}>
        小何 AI 情绪盒
      </div>

      {/* 聊天内容区 - 宽屏居中显示 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 10%' }}>
        {messages.length === 0 && (
          <div style={{ marginTop: '15vh', textAlign: 'center' }}>
            <h1 style={{ fontSize: '48px', color: '#1f1f1f', marginBottom: '20px' }}>你好，我是小何。</h1>
            <p style={{ fontSize: '24px', color: '#444746' }}>今天想聊点什么？（当前模式：{mode}）</p>
          </div>
        )}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 0' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ 
                padding: '16px 24px', borderRadius: '24px', fontSize: '18px', lineHeight: '1.6',
                backgroundColor: msg.role === 'user' ? '#e9eef6' : 'transparent',
                color: '#1f1f1f', maxWidth: '90%'
              }}>
                {msg.fileName && <div style={{ fontSize: '12px', color: '#0b57d0', marginBottom: '8px' }}>📎 附件: {msg.fileName}</div>}
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div style={{ textAlign: 'left', color: '#c4c7c5', fontSize: '16px' }}>AI 正在构思回复...</div>}
          <div ref={chatEnd} />
        </div>
      </div>

      {/* 底部功能区 */}
      <div style={{ padding: '20px 10%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* 输入胶囊：集成模式选择、加号、话筒 */}
        <div style={{ width: '100%', maxWidth: '800px', backgroundColor: '#f0f4f9', borderRadius: '35px', padding: '10px 25px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
          
          <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ background: 'none', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginRight: '10px', outline: 'none' }}>
            {["极致杠精 💢", "极致舔狗 ❤️", "阴阳怪气 🍵"].map(m => <option key={m}>{m}</option>)}
          </select>

          <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} />
          <button onClick={() => fileInputRef.current.click()} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>{attachedFile ? '✅' : '➕'}</button>
          
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="问问小何..." 
            style={{ flex: 1, border: 'none', background: 'none', padding: '15px', outline: 'none', fontSize: '20px' }} 
          />
          
          <button onClick={startSpeech} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer', marginRight: '15px' }}>🎙️</button>
          <button onClick={handleSend} style={{ backgroundColor: '#0b57d0', color: 'white', border: 'none', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px' }}>➔</button>
        </div>

        {/* 打赏区域：位于输入框下方 */}
        <div style={{ marginTop: '25px', textAlign: 'center' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#444746' }}>🍵 请作者喝杯白茶 · 打赏 👈</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
            <div style={{ textAlign: 'center' }}>
              <img src="https://youke3.picui.cn/s1/2026/01/12/6963e20a9d019.png" style={{ width: '120px', borderRadius: '15px', border: '2px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} alt="微信" />
              <div style={{ fontSize: '12px', color: '#707070', marginTop: '5px' }}>微信扫一扫</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src="https://youke3.picui.cn/s1/2026/01/12/6963e23771e4a.png" style={{ width: '120px', borderRadius: '15px', border: '2px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} alt="支付宝" />
              <div style={{ fontSize: '12px', color: '#707070', marginTop: '5px' }}>支付宝扫一扫</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
