// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 增加 image 数据接收
    const { message, mode, imageData, imageInlineData } = await req.json();

    if (!message || !mode) {
      return NextResponse.json({ error: "内容和模式不能为空" }, { status: 400 });
    }

    const API_KEY = process.env.GOOGLE_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ error: "API密钥未配置" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    // 使用 flash 模型以获得极速响应和多模态能力
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompts = {
      "极致杠精 💢": "你是一个职业杠精。语气刻薄幽默，绝对反驳。请根据用户语言（中/英）回复。",
      "极致舔狗 ❤️": "你是一个无原则的舔狗。极度赞美，自卑卑微。请根据用户语言（中/英）回复。",
      "阴阳怪气 🍵": "你说话表面客气实则讽刺，多用'呵呵'。请根据用户语言（中/英）回复。"
    };

    let contentParts: any[] = [{ text: prompts[mode] + "\n用户说：" + message }];

    // 如果前端传了图片数据，将其加入请求
    if (imageInlineData && imageData) {
      contentParts.push({
        inlineData: {
          data: imageData, // Base64字符串
          mimeType: imageInlineData // 例如 "image/jpeg"
        }
      });
    }

    const result = await model.generateContent(contentParts);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "AI 暂时断网了，请检查设置" }, { status: 500 });
  }
}
