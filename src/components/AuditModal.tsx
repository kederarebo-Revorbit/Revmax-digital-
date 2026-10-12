import { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Send } from 'lucide-react';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTitle?: string;
}

export default function AuditModal({ isOpen, onClose, defaultTitle }: AuditModalProps) {
  const [name, setName] = useState('');
  const [hotel, setHotel] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rooms, setRooms] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          hotel,
          email,
          phone,
          rooms,
          type: defaultTitle || 'Free Revenue Audit'
        })
      });
      setIsDone(true);
    } catch {
      setIsDone(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Commercial Consultation Scheduled</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Our lead hospitality strategist will conduct a pre-audit of your property profile and reach out via email/phone within 2 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsDone(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold cursor-pointer shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#1E6BFF] mb-1 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#1E6BFF]" />
              <span>REVMAX COMMERCIAL INTAKE</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {defaultTitle || 'Book a Free Hotel Revenue Audit'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              We analyze your OTA rate parity, Google Hotels visibility, and compression yield strategy across Addis Ababa and East Africa.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Almaz Tadesse"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E6BFF] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hotel / Property</label>
                  <input
                    type="text"
                    placeholder="e.g. Grand Bole Hotel"
                    value={hotel}
                    onChange={(e) => setHotel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E6BFF] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Room Count</label>
                  <input
                    type="text"
                    placeholder="e.g. 85 Rooms"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E6BFF] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="gm@hotel.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E6BFF] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+251 911 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E6BFF] focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Confirming...' : 'Request Confidential Audit'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
