import { MessageSquare } from 'lucide-react';

export default function StickyWhatsApp() {
  const whatsappUrl = `https://wa.me/251911000000?text=${encodeURIComponent(
    'Hello RevMax Digital Hospitality Team. I would like to inquire about hotel revenue management and market intelligence.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Consultation with RevMax"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-2xl transition-all transform hover:scale-105 group border border-white/20"
      >
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="text-xs font-bold whitespace-nowrap hidden sm:inline-block">
          WhatsApp Commercial Desk
        </span>
      </a>
    </div>
  );
}
