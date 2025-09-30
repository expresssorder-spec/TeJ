import React, { useState } from 'react';
import { generateVoucherDataFromText } from '../services/geminiService';
import { VoucherData } from '../types';
import { SparklesIcon } from './Icons';

interface VoucherGeneratorProps {
  apiKey: string;
  setVoucherData: React.Dispatch<React.SetStateAction<VoucherData[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const VoucherGenerator: React.FC<VoucherGeneratorProps> = ({ apiKey, setVoucherData, setIsLoading, setError }) => {
  const [text, setText] = useState('');

  const handleGenerate = async () => {
    if (!apiKey) {
      setError("الرجاء إدخال مفتاح Gemini API أولاً.");
      return;
    }
    if (!text.trim()) {
      setError("الرجاء إدخال تفاصيل التوصيل.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setVoucherData([]);

    try {
      const data = await generateVoucherDataFromText(apiKey, text);
      setVoucherData(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">إنشاء قسائم الدفع</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder="دخل هنا تفاصيل التوصيل... مثلا:
- محمد: 350 درهم، التوصيلات 1Z456, 1Z789
- فاطمة: 500 درهم، التوصيلات 1Z123, 1Z457, 1Z990"
        className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm transition-all duration-200"
      />
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleGenerate}
          className="inline-flex items-center gap-x-2 rounded-md bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={!apiKey || !text}
        >
          <SparklesIcon className="h-5 w-5" />
          إنشاء القسائم بالذكاء الاصطناعي
        </button>
      </div>
    </div>
  );
};

export default VoucherGenerator;