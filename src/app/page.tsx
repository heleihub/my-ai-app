'use client';
import { useState, useRef, useEffect } from 'react';

export default function XiaoHeAI() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("极致杠精 💢");
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEnd = useRef<HTMLDivElement>(null);

  const startSpeech = () => {
    const Win: any = window;
    const SpeechRecognition = Win.webkitSpeechRecognition || Win.SpeechRecognition;
    if (!SpeechRecognition) return alert("浏览器不支持语音识别");
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: any) => setInput(e.results[0][0].transcript);
    recognition.start();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAttachedFile({ data: (reader.result as string).split(',')[1], type: file.type, name: file.name });
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
      setMessages(prev => [...prev, { role: 'ai', content: "连接失败，请稍后重试。" }]);
    } finally { setLoading(false); }
  };

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f8fafd' }}>
      <div style={{ padding: '15px', textAlign: 'center', fontSize: '26px', fontWeight: 'bold', color: '#0b57d0' }}>小何 AI 情绪盒</div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 5%' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', padding: '20px 0' }}>
          {messages.length === 0 && (
            <div style={{ marginTop: '10vh', textAlign: 'center' }}>
              <h1 style={{ fontSize: '42px', color: '#1f1f1f' }}>你好，我是小何。</h1>
              <p style={{ fontSize: '22px', color: '#444746' }}>{isListening ? "🎤 正在聆听你的声音..." : `开始你的表演（当前：${mode}）`}</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: '35px', display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ padding: '18px 28px', borderRadius: '28px', fontSize: '22px', lineHeight: '1.5', backgroundColor: msg.role === 'user' ? '#e9eef6' : 'transparent', color: '#1f1f1f', maxWidth: '85%' }}>
                {msg.fileName && <div style={{ fontSize: '13px', color: '#0b57d0', marginBottom: '5px' }}>📎 已上传: {msg.fileName}</div>}
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEnd} />
        </div>
      </div>

      <div style={{ padding: '15px 5%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 微信风格语音提示条 */}
        {isListening && <div style={{ marginBottom: '10px', color: '#0b57d0', fontWeight: 'bold', animation: 'pulse 1.5s infinite' }}>松开话筒或停止说话即可识别</div>}
        
        <div style={{ width: '100%', maxWidth: '850px', backgroundColor: '#f0f4f9', borderRadius: '40px', padding: '8px 25px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ background: 'none', border: 'none', fontWeight: 'bold', fontSize: '16px', outline: 'none' }}>
            {["极致杠精 💢", "极致舔狗 ❤️", "阴阳怪气 🍵"].map(m => <option key={m}>{m}</option>)}
          </select>
          <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} />
          <button onClick={() => fileInputRef.current?.click()} style={{ border: 'none', background: 'none', fontSize: '28px', cursor: 'pointer', marginLeft: '10px' }}>{attachedFile ? '✅' : '➕'}</button>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={isListening ? "正在聆听..." : "问问小何..."} style={{ flex: 1, border: 'none', background: 'none', padding: '15px', outline: 'none', fontSize: '20px' }} />
          <button onClick={startSpeech} style={{ border: 'none', background: 'none', fontSize: '28px', cursor: 'pointer', color: isListening ? '#0b57d0' : 'inherit' }}>🎙️</button>
          <button onClick={handleSend} style={{ backgroundColor: '#0b57d0', color: 'white', border: 'none', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer' }}>➔</button>
        </div>

        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#444746' }}>🍵 请作者喝杯白茶 · 打赏 👇</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '10px' }}>
            <img src="https://youke3.picui.cn/s1/2026/01/12/6963e20a9d019.png" style={{ width: '120px', borderRadius: '15px' }} />
            <img src="https://youke3.picui.cn/s1/2026/01/12/6963e23771e4a.png" style={{ width: '120px', borderRadius: '15px' }} />
          </div>
        </div>
      </div>
      <style>{`@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`}</style>
    </div>
  );
}
