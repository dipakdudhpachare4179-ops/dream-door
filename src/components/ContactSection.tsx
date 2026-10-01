import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MessageCircle, Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { PROPERTIES } from '../data/properties';

interface ContactSectionProps {
  initialProperty?: string;
}

export default function ContactSection({ initialProperty }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: initialProperty || 'General Portfolio Consultation',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and phone number.');
      return;
    }

    if (!formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate luxury API submission
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  return (
    <section id="contact" className="py-28 md:py-36 bg-[#FAF8F5] text-[#24150E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 cols): Narrative & Contact Direct Links */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <span className="w-5 h-[1px] bg-[#C4A47C]" />
              <span className="text-xs uppercase tracking-[0.26em] font-semibold text-[#8A6D56]">
                Private Consultation
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif-luxury text-3xl sm:text-5xl text-[#24150E] font-light leading-[1.15] tracking-tight mb-6"
            >
              Your Next Address Could Be One Conversation Away.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-base text-[#5A3825] font-light leading-relaxed mb-10"
            >
              Whether you are acquiring a signature private residence, commissioning an architectural brief, or scheduling an unhurried property viewing, our partners are ready to assist.
            </motion.p>

            {/* Direct Contact Channels */}
            <div className="space-y-6 pt-6 border-t border-[#331E14]/10">
              <a
                href={COMPANY_INFO.contactPlaceholder.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A6D56] block">
                    Instant Discretion
                  </span>
                  <span className="text-sm font-medium text-[#24150E] group-hover:text-[#8A6D56] transition-colors">
                    Direct WhatsApp Advisory
                  </span>
                </div>
              </a>

              <a
                href={`tel:${COMPANY_INFO.contactPlaceholder.phone}`}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#C4A47C]/15 flex items-center justify-center text-[#331E14] group-hover:bg-[#331E14] group-hover:text-[#FAF8F5] transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A6D56] block">
                    Phone Inquiries
                  </span>
                  <span className="text-sm font-medium text-[#24150E] group-hover:text-[#8A6D56] transition-colors">
                    {COMPANY_INFO.contactPlaceholder.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.contactPlaceholder.email}`}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#C4A47C]/15 flex items-center justify-center text-[#331E14] group-hover:bg-[#331E14] group-hover:text-[#FAF8F5] transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A6D56] block">
                    Confidential Email
                  </span>
                  <span className="text-sm font-medium text-[#24150E] group-hover:text-[#8A6D56] transition-colors">
                    {COMPANY_INFO.contactPlaceholder.email}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-10 h-10 rounded-full bg-[#331E14]/5 flex items-center justify-center text-[#8A6D56]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A6D56] block">
                    Consultation Hours
                  </span>
                  <span className="text-xs text-[#5A3825]">
                    {COMPANY_INFO.contactPlaceholder.hours}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Consultation Form */}
          <div className="lg:col-span-7 bg-[#F5F2EB] p-8 md:p-12 border border-[#331E14]/15 shadow-sm">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#331E14] text-[#C4A47C] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif-luxury text-3xl text-[#24150E] mb-3">
                  Consultation Request Received
                </h3>
                <p className="text-sm text-[#5A3825] font-light max-w-md mx-auto mb-8">
                  Thank you for entrusting Dream Door Properties. Our designated property advisor will contact you privately within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      property: 'General Portfolio Consultation',
                      message: ''
                    });
                  }}
                  className="px-6 py-3 border border-[#331E14] text-[#331E14] text-xs uppercase tracking-widest font-semibold hover:bg-[#331E14] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8A6D56] font-medium mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Julian Vance"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8A6D56] font-medium mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8A6D56] font-medium mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="julian@estate.com"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8A6D56] font-medium mb-1.5">
                      Preferred Residence / Subject
                    </label>
                    <select
                      value={formData.property}
                      onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14] transition-colors"
                    >
                      <option value="General Portfolio Consultation">
                        General Portfolio Consultation
                      </option>
                      {PROPERTIES.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title} ({p.price})
                        </option>
                      ))}
                      <option value="Off-Market Architectural Search">
                        Off-Market Architectural Search
                      </option>
                      <option value="Property Selling / Advisory">
                        Property Selling / Advisory
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8A6D56] font-medium mb-1.5">
                    Your Requirements &amp; Spatial Preferences
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your desired timeline, architectural preferences, or specific inquiries..."
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14] transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs text-rose-700 bg-rose-50 p-3 border border-rose-200">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-[#331E14] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#24150E] disabled:opacity-75 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <span>Transmitting Details...</span>
                  ) : (
                    <>
                      <span>Request A Consultation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#8A6D56] text-center pt-2">
                  All inquiries remain strictly confidential. No unsolicited contact.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
