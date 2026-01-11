import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, mode, fileData, mimeType } = await req.json();
    const API_KEY = process.env.GOOGLE_API_KEY;

    if (!API_KEY) return NextResponse.json({ reply: "❌ 密钥配置错误" }, { status: 500 });

    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // 使用你指定的 Gemini 2.5 Flash-Lite 模型
    // 这是目前免费请求额度最高的模型 ID
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompts = {
      "极致杠精 💢": "你是一个职业杠精，无论用户说什么，你都要刁钻地反驳。请用中文回复。",
      "极致舔狗 ❤️": "你是一个毫无原则的舔狗，极度赞美用户。请用中文回复。",
      "阴阳怪气 🍵": "你说话表面客气实则讽刺。请用中文回复。"
    };

    let promptParts: any[] = [{ text: prompts[mode] + "\n用户：" + message }];
    
    // 该模型同样支持多模态图片识别
    if (fileData && mimeType) {
      promptParts.push({ inlineData: { data: fileData, mimeType: mimeType } });
    }

    const result = await model.generateContent(promptParts);
    return NextResponse.json({ reply: result.response.text() });
  } catch (error: any) {
    // 如果还是报错，我们会看到具体的错误信息
    console.error("DEBUG:", error.message);
    return NextResponse.json({ reply: `❌ 连接失败：${error.message}` }, { status: 500 });
  }
}
