export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface TranslationResponse {
  translatedText: string;
  detectedSourceLanguage?: string;
}
