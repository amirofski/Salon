import React, { useState, useEffect } from 'react';
import { SalonService } from '../types';
import { SALON_SERVICES, SALON_ARTISANS } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { X, CheckCircle2, Sparkles } from 'lucide-react';

interface SalonBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: SalonService | null;
}

export const SalonBookingModal: React.FC<SalonBookingModalProps> = ({
  isOpen,
  onClose,
  selectedService,
}) => {
  const { language, t } = useLanguage();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [serviceId, setServiceId] = useState<string>(selectedService?.id || SALON_SERVICES[0].id);
  const [stylist, setStylist] = useState<string>('any');
  const [date, setDate] = useState<string>('2026-09-02');
  const [time, setTime] = useState<string>('11:00 AM');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (selectedService) {
      setServiceId(selectedService.id);
    }
  }, [selectedService]);

  if (!isOpen) return null;

  const currentSelectedService = SALON_SERVICES.find(s => s.id === serviceId) || SALON_SERVICES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const resetAndClose = () => {
    setStep('form');
    onClose();
  };

  const getStylistDisplayName = () => {
    if (stylist === 'any') return t.modalStylistAny;
    const found = SALON_ARTISANS.find(a => a.avatarText === stylist);
    return found ? found.name[language] : t.modalStylistAny;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="glass-panel w-full max-w-lg rounded-2xl p-6 sm:p-8 bg-stone-900/95 border border-stone-800 text-stone-100 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-stone-100 font-light">
                {t.modalTitle}
              </h2>
              <p className="text-[11px] font-sans text-amber-400/90 tracking-wide">
                {t.modalSub}
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Service Selection */}
            <div>
              <label className="block text-stone-300 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                {t.modalServiceLabel}
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400"
              >
                {SALON_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name[language]} — {s.price[language]} ({s.duration[language]})
                  </option>
                ))}
              </select>
            </div>

            {/* Stylist Selection */}
            <div>
              <label className="block text-stone-300 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                {t.modalStylistLabel}
              </label>
              <select
                value={stylist}
                onChange={(e) => setStylist(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400"
              >
                <option value="any">{t.modalStylistAny}</option>
                {SALON_ARTISANS.map((a) => (
                  <option key={a.avatarText} value={a.avatarText}>
                    {a.name[language]} ({a.role[language]})
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-300 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                  {t.modalDateLabel}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-300 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                  {t.modalTimeLabel}
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400"
                >
                  {['09:00 AM', '11:00 AM', '01:30 PM', '03:30 PM', '05:30 PM', '07:00 PM'].map((tVal) => (
                    <option key={tVal} value={tVal}>{tVal}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Details */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-300 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                  {t.modalNameLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.modalNamePlaceholder}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-300 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                  {t.modalPhoneLabel}
                </label>
                <input
                  type="tel"
                  placeholder={t.modalPhonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-start"
                  required
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-stone-300 font-medium mb-1.5 uppercase tracking-wider text-[10px]">
                {t.modalNotesLabel}
              </label>
              <textarea
                rows={2}
                placeholder={t.modalNotesPlaceholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Submit */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
              >
                {t.modalSubmitBtn}
              </button>
              <p className="text-[10px] text-stone-400 text-center mt-2 font-sans">
                {t.teaNote}
              </p>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl text-stone-100 font-light">
              {t.modalSuccessTitle}
            </h3>

            <p className="text-stone-300 text-xs max-w-sm mx-auto leading-relaxed">
              {fullName ? `${fullName} ` : ''}
              {t.modalSuccessDesc}
            </p>

            <div className="p-4 rounded-xl bg-stone-800/40 border border-stone-700/60 max-w-xs mx-auto text-start text-[11px] space-y-1.5 font-sans text-stone-300">
              <div><span className="text-stone-500">{t.modalServiceLabel}:</span> <strong className="text-amber-300">{currentSelectedService.name[language]}</strong></div>
              <div><span className="text-stone-500">{t.modalStylistLabel}:</span> {getStylistDisplayName()}</div>
              <div><span className="text-stone-500">{t.suiteLabel}</span> {t.suiteValue}</div>
              <div><span className="text-stone-500">{t.durationLabel}</span> {currentSelectedService.duration[language]}</div>
              <div><span className="text-stone-500">{t.priceLabel}</span> {currentSelectedService.price[language]}</div>
            </div>

            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs transition-colors"
            >
              {t.modalReturnBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
