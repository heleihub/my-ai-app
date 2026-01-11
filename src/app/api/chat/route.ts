import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, mode, fileData, mimeType } = await req.json();
    const API_KEY = process.env.GOOGLE_API_KEY;

    if (!API_KEY) {
      return NextResponse.json({ reply: "API Key 未配置，请在 Netlify 设置中添加 GOOGLE_API_KEY" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompts = {
      "极致杠精 💢": "你是一个职业杠精。无论用户发什么，你都要刁钻地反驳。请根据用户语言回复。",
      "极致舔狗 ❤️": "你是一个毫无原则的舔狗。极度赞美用户的一切。请根据用户语言回复。",
      "阴阳怪气 🍵": "你说话话里有话，表面客气实则讽刺。请根据用户语言回复。"
    };

    // 核心修正：使用 inlineData 确保部署通过
    let promptParts: any[] = [{ text: prompts[mode] + "\n用户：" + message }];
    
    if (fileData && mimeType) {
      promptParts.push({
        inlineData: {
          data: fileData,
          mimeType: mimeType
        }
      });
    }

    const result = await model.generateContent(promptParts);
    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    return NextResponse.json({ reply: "AI 暂时走神了，请稍后再试。" }, { status: 500 });
  }
}
