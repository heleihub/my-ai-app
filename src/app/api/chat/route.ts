import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, mode, fileData, mimeType } = await req.json();
    
    // 1. 获取你在 Netlify 设置的那个 LiteRouter Key (65ea57c3...)
    const API_KEY = process.env.GOOGLE_API_KEY;
    
    // 2. 根据指南，Base URL 必须加 /v1
    const BASE_URL = "https://api.literouter.com/v1/chat/completions";

    if (!API_KEY) return NextResponse.json({ reply: "❌ Netlify 环境变量中未找到 Key" }, { status: 500 });

    // 3. 构造 OpenAI 兼容格式的请求体
    // 注意：这里的 model 填的是你截图中看到的免费模型名称
    const payload = {
      model: "gemini-2.5-flash-lite", // 或者是 "gemini-1.5-flash"
      messages: [
        {
          role: "system",
          content: `你现在的人格是：${mode}。请直接开始回复，不要有废话。`
        },
        {
          role: "user",
          content: message
        }
      ],
      stream: false
    };

    // 如果有图片附件，OpenAI 格式需要特殊处理内容（这里先保证文字通畅）
    if (fileData && mimeType) {
      payload.messages[1].content = [
        { type: "text", text: message },
        { type: "image_url", image_url: { url: `data:${mimeType};base64,${fileData}` } }
      ] as any;
    }

    // 4. 发起请求
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ reply: `❌ LiteRouter 报错: ${data.error?.message || '未知错误'}` }, { status: response.status });
    }

    // 5. 解析返回内容 (OpenAI 格式的路径是 choices[0].message.content)
    const replyText = data.choices[0].message.content;
    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error("DEBUG:", error);
    return NextResponse.json({ reply: `❌ 连接失败：${error.message}` }, { status: 500 });
  }
}
