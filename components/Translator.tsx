'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { translateText } from '@/lib/translate-actions';
import { Language } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
].sort((a, b) => a.name.localeCompare(b.name));

export default function Translator() {
  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleTranslate = async () => {
    if (!inputText || !targetLanguage) return;

    setIsLoading(true);
    setError(null);
    setTranslatedText(''); // Clear previous translation

    try {
      const result = await translateText(inputText, targetLanguage);
      setTranslatedText(result.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setError('An error occurred during translation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-purple-100">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl p-8 rounded-xl bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Modern Translator
          </h1>

          <div className="mb-4">
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select target language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="mr-2">{lang.flag}</span> {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder="Enter text to translate (English)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="h-32 resize-none bg-white bg-opacity-70"
            />

            <Button
              onClick={handleTranslate}
              disabled={isLoading || !inputText || !targetLanguage}
              className="w-full"
            >
              {isLoading ? 'Translating...' : 'Translate'}
            </Button>

            <Textarea
              value={translatedText}
              readOnly
              className="h-32 resize-none bg-white bg-opacity-70"
              placeholder={
                isLoading ? 'Translating...' : 'Translation will appear here'
              }
            />
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <Toast variant="destructive" className="fixed bottom-4 right-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <ToastTitle>Error</ToastTitle>
                </div>
                <ToastDescription>{error}</ToastDescription>
              </Toast>
            </motion.div>
          )}
        </AnimatePresence>

        <ToastViewport />
      </div>
    </ToastProvider>
  );
}
