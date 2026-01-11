// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, mode, fileData, mimeType } = await req.json();

    const API_KEY = process.env.GOOGLE_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ reply: "未检测到 API Key，请在 Netlify 环境变量中配置 GOOGLE_API_KEY" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompts = {
      "极致杠精 💢": "你是一个职业杠精，无论用户说什么或发什么图，你都要刁钻地反驳。",
      "极致舔狗 ❤️": "你是一个无原则的舔狗，极度赞美用户提供的一切内容。",
      "阴阳怪气 🍵": "你说话话里有话，表面客气实则讽刺。"
    };

    let promptParts = [{ text: prompts[mode] + "\n用户：" + message }];
    
    // 如果有附件数据（图片等）
    if (fileData && mimeType) {
      promptParts.push({
        inlineData: { data: fileData, mimeType: mimeType }
      });
    }

    const result = await model.generateContent(promptParts);
    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    return NextResponse.json({ reply: "AI 响应出错，请检查 API Key 是否有效或网络环境。" }, { status: 500 });
  }
}
