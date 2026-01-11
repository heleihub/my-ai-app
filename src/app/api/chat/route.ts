import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, mode, fileData, mimeType } = await req.json();
    const API_KEY = process.env.GOOGLE_API_KEY;

    if (!API_KEY) {
      return NextResponse.json({ reply: "⚠️ 后端未读取到 API Key，请检查 Netlify 环境变量名是否为 GOOGLE_API_KEY" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    // 使用 flash 模型以获得最快响应
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompts = {
      "极致杠精 💢": "你是一个职业杠精，无论用户说什么，你都要刁钻地反驳，字数不要太多。",
      "极致舔狗 ❤️": "你是一个无原则的舔狗，极度赞美用户。",
      "阴阳怪气 🍵": "你说话表面客气实则讽刺，话里有话。"
    };

    let promptParts: any[] = [{ text: prompts[mode] + "\n用户：" + message }];
    
    if (fileData && mimeType) {
      promptParts.push({ inlineData: { data: fileData, mimeType: mimeType } });
    }

    const result = await model.generateContent(promptParts);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error("DEBUG ERROR:", error);
    // 这里会返回具体的报错信息，比如：API Key Invalid 或者 地区不支持
    return NextResponse.json({ 
      reply: `❌ 连接失败：${error.message || "未知错误"}` 
    }, { status: 500 });
  }
}
