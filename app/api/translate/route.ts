import { NextRequest, NextResponse } from "next/server";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

export async function POST(request: NextRequest) {
  const { text } = await request.json();
  const systemTemplate = "Translate the following from English into {language}";
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
  ]);
  const promptValue = await promptTemplate.invoke({
    language: "italian",
    text,
  });
  const model = new ChatOpenAI({ model: "gpt-4o-mini" });
  const response = await model.invoke(promptValue);
  const translatedText = response.content;

  return NextResponse.json({ translatedText });
}
