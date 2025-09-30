import React, { useState } from 'react';
import CredentialsForm from './components/CredentialsForm';
import VoucherGenerator from './components/VoucherGenerator';
import ResultDisplay from './components/ResultDisplay';
import { VoucherData } from './types';
import { LogoIcon } from './components/Icons';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [voucherData, setVoucherData] = useState<VoucherData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="flex flex-col items-center text-center mb-8">
          <LogoIcon className="h-16 w-16 text-cyan-400 mb-4" />
          <h1 className="text-4xl font-bold text-white tracking-tight">مساعد Joud Express الذكي</h1>
          <p className="mt-2 text-lg text-gray-400">
            هاد الأداة كاتعاونك تعالج بيانات التوصيل باش تصايب بونات الخلاص لليڤرورات ديالك
          </p>
        </header>

        <main className="space-y-8">
          <CredentialsForm onApiKeyChange={setApiKey} />
          <div className="border-t border-gray-700 my-8"></div>
          <VoucherGenerator 
            apiKey={apiKey} 
            setVoucherData={setVoucherData} 
            setIsLoading={setIsLoading}
            setError={setError}
          />
          <ResultDisplay 
            data={voucherData} 
            isLoading={isLoading} 
            error={error} 
          />
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>تم التطوير بواسطة الذكاء الاصطناعي. جميع الحقوق محفوظة © 2024</p>
        </footer>
      </div>
    </div>
  );
};

export default App;