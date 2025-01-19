'use server';

import { TranslationResponse } from '@/types';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';

export async function translateText(
  text: string,
  targetLanguage: string
): Promise<TranslationResponse> {
  const systemTemplate = 'Translate the following from English into {language}';
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['user', '{text}'],
  ]);
  const promptValue = await promptTemplate.invoke({
    language: targetLanguage,
    text,
  });
  const model = new ChatOpenAI({ model: 'gpt-4o-mini' });
  const response = await model.invoke(promptValue);
  const translatedText = String(response.content);

  return {
    translatedText: translatedText,
    detectedSourceLanguage: targetLanguage,
  };
}
