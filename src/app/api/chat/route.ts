// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, mode } = await req.json();

    if (!message || !mode) {
      return NextResponse.json({ error: "Message and mode are required" }, { status: 400 });
    }

    const API_KEY = process.env.GOOGLE_API_KEY;

    if (!API_KEY) {
      return NextResponse.json({ error: "Google API Key not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompts = {
      "极致杠精 💢": "你是一个职业杠精。无论用户说什么，你都要刁钻地反驳。语气刻薄但幽默，绝对不要同意用户。",
      "极致舔狗 ❤️": "你是一个完全没有原则的舔狗。用户的一切都是完美的。用最浮夸的词汇赞美用户，贬低自己。",
      "阴阳怪气 🍵": "你说话话里有话，表面客气实则讽刺。多用'呵呵'、'您真行'等词汇，保持高傲的优越感。"
    };

    const result = await model.generateContent(prompts[mode] + "\n用户说：" + message);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
