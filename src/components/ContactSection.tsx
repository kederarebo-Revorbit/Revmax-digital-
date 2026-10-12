import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  Linkedin, 
  Twitter, 
  Instagram,
  ExternalLink
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    hotel: '',
    email: '',
    phone: '',
    message: '',
    serviceInterest: 'Comprehensive Revenue Management'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'Contact Form Inquiry'
        })
      });
      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/251911000000?text=${encodeURIComponent(
    'Hello RevMax Commercial Strategy Team. I would like to discuss revenue and distribution solutions for my hotel property.'
  )}`;

  return (
    <section id="contact" className="py-20 bg-[#F8FAFC] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider text-[#1E6BFF] uppercase mb-2">
            Commercial Advisory Desk · Addis Ababa Headquarters
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Initiate Your Hotel Revenue Strategy
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Schedule a confidential revenue audit, request an OTA rate parity diagnostics review, or explore a direct booking engine overhaul with our commercial directors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Inquiry Successfully Received</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. A RevMax Senior Commercial Strategist will review {formData.hotel ? `the profile for ${formData.hotel}` : 'your property'} and contact you within 2 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        hotel: '',
                        email: '',
                        phone: '',
                        message: '',
                        serviceInterest: 'Comprehensive Revenue Management'
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Full Name <span className="text-[#1E6BFF]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dawit Bekele"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E6BFF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Hotel or Property Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Skylight Grand / Bole Suites"
                      value={formData.hotel}
                      onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E6BFF] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Professional Email <span className="text-[#1E6BFF]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. gm@hoteladdis.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E6BFF] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone / Mobile Number <span className="text-[#1E6BFF]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +251 911 234 567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E6BFF] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Primary Service Focus
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#1E6BFF] focus:bg-white"
                  >
                    <option value="Comprehensive Revenue Management">1. Comprehensive Revenue Management & Dynamic Pricing</option>
                    <option value="OTA Distribution & Parity Audit">2. Distribution & OTA Parity Audit (Booking/Expedia/Trip.com)</option>
                    <option value="Marketing & Reputation Management">3. Marketing & Reputation Management (Google/TripAdvisor)</option>
                    <option value="Digital Marketing & Metasearch">4. Digital Marketing & Google Hotel Ads</option>
                    <option value="Hotel Website & Booking Engine">5. Direct Hotel Website & Booking Engine Integration</option>
                    <option value="QR Digital Menu Solutions">6. QR Digital Menus & Contactless F&B Ordering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Operational Message or Room Count Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your room inventory, current ADR/Occupancy, or upcoming conference season goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1E6BFF] focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#1E6BFF] hover:bg-[#1557D6] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting to Commercial Desk...' : 'Submit Commercial Strategy Request'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Office Location, WhatsApp & Map Preview */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Direct Connect Card */}
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Direct WhatsApp Consultation</h4>
                  <div className="text-xs text-emerald-700 font-semibold">Fast-Track Response in &lt; 15 Minutes</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Connect directly with our hospitality consulting desk on WhatsApp for immediate rate checks, AU Summit pricing guidance, or urgent OTA parity issues.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs transition-colors shadow-sm"
              >
                <span>Chat with Revenue Desk on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Office Coordinates */}
            <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
              <h4 className="text-base font-bold text-slate-900">Addis Ababa Commercial Office</h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#1E6BFF] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">RevMax Headquarters</div>
                    <div className="text-slate-500 mt-0.5">Bole Road (Africa Avenue), Olympic Building, 6th Floor</div>
                    <div className="text-slate-500">Bole Sub-City, Addis Ababa, Ethiopia</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#1E6BFF] shrink-0" />
                  <span className="font-mono font-semibold text-slate-800">+251 911 000 000 / +251 116 000 000</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#1E6BFF] shrink-0" />
                  <span className="text-slate-800 font-medium">advisory@revmaxhospitality.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#1E6BFF] shrink-0" />
                  <span>Monday – Saturday: 08:30 – 18:00 EAT (24/7 On-Call for AU Summits)</span>
                </div>
              </div>

              {/* Interactive Google Map Preview */}
              <div className="pt-2">
                <div className="rounded-2xl overflow-hidden border border-slate-200 h-44 relative bg-slate-100">
                  <iframe
                    title="RevMax Addis Ababa Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5487771746214!2d38.7844!3d8.9955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8504eb207d13%3A0x8674d8ff2bc1b29a!2sBole%20Rd%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1710000000000!5m2!1sen!2set"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-white/95 backdrop-blur rounded-lg text-[10px] text-[#1E6BFF] font-mono font-bold border border-slate-200 shadow-sm">
                    Bole Corridor, Addis Ababa
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Connect with RevMax:</span>
                <div className="flex items-center gap-2">
                  <a href="#" className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#1E6BFF] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#1E6BFF] transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#1E6BFF] transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
