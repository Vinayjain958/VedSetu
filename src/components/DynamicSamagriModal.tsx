import React, { useState } from 'react';
import { POPULAR_PUJAS } from '../data/mockData';
import { X, Package, Check, Copy, Calendar } from 'lucide-react';

interface DynamicSamagriModalProps {
  isOpen: boolean;
  onClose: () => void;
  pujaTitle?: string;
  onOpenBooking: (pujaType?: string) => void;
}

export const DynamicSamagriModal: React.FC<DynamicSamagriModalProps> = ({
  isOpen,
  onClose,
  pujaTitle,
  onOpenBooking,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentPuja = POPULAR_PUJAS.find(p => p.title === pujaTitle) || POPULAR_PUJAS[0];

  const handleToggleItem = (itemKey: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const handleCopyChecklist = () => {
    const text = currentPuja.samagriList
      .map((s, i) => `${i + 1}. ${s.item} (${s.quantity}) - ${s.description || ''}`)
      .join('\n');
    navigator.clipboard.writeText(`*Vedsetu Samagri Checklist for ${currentPuja.title}:*\n\n${text}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = currentPuja.samagriList.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-orange-100 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-5 text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">100% Pure Samagri Checklist</h3>
              <p className="text-xs text-orange-100 font-spiritual">{currentPuja.title} · “आपकी आस्था, हमारी व्यवस्था”</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          
          {/* Top Info Banner */}
          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-orange-800 uppercase tracking-wider">
                  Organic & Lab-Tested
                </span>
                <span className="text-xs font-medium text-slate-600">
                  ({completedCount}/{totalItems} items checked)
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                You can tick off items if arranging locally, or let our Pandit arrive with the sealed kit (+₹{currentPuja.samagriPrice}).
              </p>
            </div>

            <button
              onClick={handleCopyChecklist}
              className="px-3 py-1.5 rounded-lg bg-white border border-orange-200 text-orange-700 hover:bg-orange-100 text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              {isCopied ? 'Copied to Clipboard!' : 'Copy WhatsApp List'}
            </button>
          </div>

          {/* Checklist of Samagri */}
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {currentPuja.samagriList.map((item, idx) => {
              const isChecked = !!checkedItems[item.item];
              return (
                <div
                  key={idx}
                  onClick={() => handleToggleItem(item.item)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-white border-slate-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <h5 className={`text-xs sm:text-sm font-bold ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {item.item}
                      </h5>
                      {item.description && (
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-bold text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded flex-shrink-0">
                    {item.quantity}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-[11px] text-slate-500 font-medium">Kit price when Pandit brings:</p>
              <div className="text-lg font-extrabold text-slate-900">
                ₹{currentPuja.samagriPrice.toLocaleString()}{' '}
                <span className="text-xs font-normal text-slate-500">(100% Sealed & Sanitized)</span>
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking(currentPuja.title);
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book This Puja
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
