import React from 'react';
import { VoucherData } from '../types';
import { UserCircleIcon, CashIcon, ClipboardListIcon } from './Icons';

interface ResultDisplayProps {
  data: VoucherData[];
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold text-gray-300">...جاري الإنشاء</p>
        <p className="text-gray-500">الذكاء الاصطناعي كايعالج الطلب ديالك...</p>
    </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
        <p className="font-bold">حدث خطأ</p>
        <p>{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-10 px-4 border-2 border-dashed border-gray-700 rounded-lg">
        <p className="text-gray-500">النتائج غادي تبان هنا من بعد الإنشاء.</p>
      </div>
    );
  }

  return (
    <div>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">قسائم الدفع الجاهزة</h2>
        <div className="space-y-4">
        {data.map((voucher, index) => (
            <div key={index} className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md transform hover:scale-[1.02] hover:border-cyan-500 transition-all duration-300">
            <div className="flex items-center mb-3">
                <UserCircleIcon className="h-6 w-6 text-cyan-400 ml-2" />
                <h3 className="text-lg font-bold text-white">{voucher.driverName}</h3>
            </div>
            <div className="space-y-2">
                <div className="flex items-center text-gray-300">
                    <CashIcon className="h-5 w-5 text-green-400 ml-2" />
                    <span className="font-semibold">المبلغ الإجمالي:</span>
                    <span className="mr-2 font-mono">{voucher.totalAmount.toLocaleString('ar-MA', { style: 'currency', currency: 'MAD' })}</span>
                </div>
                <div className="flex items-start text-gray-300">
                    <ClipboardListIcon className="h-5 w-5 text-yellow-400 ml-2 mt-1 flex-shrink-0" />
                    <div>
                        <span className="font-semibold">أرقام التوصيلات:</span>
                        <ul className="list-inside list-disc mt-1 mr-4">
                        {voucher.deliveryIds.map((id, idIndex) => (
                            <li key={idIndex} className="text-sm font-mono text-gray-400">{id}</li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default ResultDisplay;