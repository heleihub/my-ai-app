import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, mode, fileData, mimeType } = await req.json();
    const API_KEY = process.env.GOOGLE_API_KEY;

    if (!API_KEY) return NextResponse.json({ reply: "❌ 密钥配置错误" }, { status: 500 });

    const genAI = new GoogleGenerativeAI(API_KEY);
    // 修正模型名称为全称，确保 API 识别
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompts = {
      "极致杠精 💢": "你是一个职业杠精，无论用户说什么，你都要刁钻地反驳。请用中文回复。",
      "极致舔狗 ❤️": "你是一个毫无原则的舔狗，极度赞美用户。请用中文回复。",
      "阴阳怪气 🍵": "你说话表面客气实则讽刺。请用中文回复。"
    };

    let promptParts: any[] = [{ text: prompts[mode] + "\n用户：" + message }];
    if (fileData && mimeType) {
      promptParts.push({ inlineData: { data: fileData, mimeType: mimeType } });
    }

    const result = await model.generateContent(promptParts);
    return NextResponse.json({ reply: result.response.text() });
  } catch (error: any) {
    return NextResponse.json({ reply: `❌ 连接失败：${error.message}` }, { status: 500 });
  }
}
