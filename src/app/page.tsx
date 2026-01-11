const [isListening, setIsListening] = useState(false); // 新增状态

  const startSpeech = () => {
    const Win: any = window;
    const SpeechRecognition = Win.webkitSpeechRecognition || Win.SpeechRecognition;
    
    if (!SpeechRecognition) return alert("浏览器不支持语音");
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    
    recognition.onstart = () => setIsListening(true); // 开始录音时显示状态
    recognition.onend = () => setIsListening(false);  // 结束录音时消失

    recognition.onresult = (e: any) => {
      const result = e.results[0][0].transcript;
      setInput(result);
    };

    recognition.onerror = (e: any) => {
      setIsListening(false);
      alert("语音出错: " + e.error);
    };

    recognition.start();
  };

  // 在 Return 里的输入框 placeholder 处可以加上：
  // placeholder={isListening ? "正在聆听..." : "问问小何..."}
