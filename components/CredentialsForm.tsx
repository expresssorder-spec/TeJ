import React, { useState } from 'react';
import { KeyIcon, UserIcon, LockIcon, EyeIcon, EyeOffIcon } from './Icons';

interface CredentialsFormProps {
  onApiKeyChange: (key: string) => void;
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({ onApiKeyChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gemini API Key */}
        <div className="md:col-span-3">
          <label htmlFor="api-key" className="block text-sm font-medium text-cyan-400 mb-2">
            مفتاح Gemini API (مطلوب)
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <KeyIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="api-key"
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="دخل مفتاح Gemini API ديالك هنا"
              className="block w-full rounded-md border-0 bg-white/5 py-2 pr-10 pl-3 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Delivery Company Credentials */}
        <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-white mb-3 border-b border-gray-700 pb-2">معلومات الدخول لشركة التوصيل (Admin.joud-express.com)</h3>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            الإيمايل / اسم المستخدم
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              placeholder="exemple@joud-express.com"
              className="block w-full rounded-md border-0 bg-white/5 py-2 pr-10 pl-3 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
            كلمة السر
          </label>
          <div className="relative">
             <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <LockIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="••••••••"
              className="block w-full rounded-md border-0 bg-white/5 py-2 pr-10 pl-3 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm"
            />
            <button
                type="button"
                className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-500 text-center">
        إخلاء مسؤولية: معلومات الدخول ديالك ماكاتسجلش وكاتستعمل غير كمرجع للذكاء الاصطناعي. هاد الأداة ماكادخلش للحساب ديالك أوتوماتيكيا.
      </p>
    </div>
  );
};

export default CredentialsForm;