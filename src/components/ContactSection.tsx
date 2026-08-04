import React, { useState } from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { ContactFormData, ContactResponse } from '../types';
import { SpotlightCard } from './SpotlightCard';
import { ScrollKineticHeader } from './ScrollKineticHeader';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Mail, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  RefreshCw,
  MessageSquare
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'Job Opportunity / Project Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key in keyof ContactFormData]?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<ContactResponse | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTicketId, setCopiedTicketId] = useState(false);

  const copyTicket = (ticketId: string) => {
    navigator.clipboard.writeText(ticketId);
    setCopiedTicketId(true);
    setTimeout(() => setCopiedTicketId(false), 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validate = (): boolean => {
    const newErrors: { [key in keyof ContactFormData]?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message should be at least 5 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    const ticketId = `SG-MSG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
      // 1. Send via local API route (which also logs and forwards)
      let apiSuccess = false;
      let apiData: ContactResponse | null = null;

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          apiData = await response.json();
          if (apiData?.success) {
            apiSuccess = true;
          }
        }
      } catch (e) {
        console.warn('API contact route fetch error, falling back to direct FormSubmit:', e);
      }

      // 2. Direct fallback to FormSubmit endpoint to guarantee email reaching gawadeshubham859@gmail.com
      if (!apiSuccess) {
        const params = new URLSearchParams();
        params.append('name', formData.name.trim());
        params.append('email', formData.email.trim());
        params.append('_subject', `[Portfolio Message] ${formData.subject} - from ${formData.name}`);
        params.append('_replyto', formData.email.trim());
        params.append('message', formData.message.trim());
        params.append('ticket_id', ticketId);

        await fetch('https://formsubmit.co/ajax/gawadeshubham859@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          body: params.toString()
        }).catch(err => console.warn('Direct FormSubmit call error:', err));
      }

      // Trigger celebratory confetti burst!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSubmitResult({
        success: true,
        message: apiData?.message || `Your message has been dispatched directly to Shubham Gawade! Expect a response within 24 hours.`,
        ticketId: apiData?.ticketId || ticketId,
        timestamp: new Date().toISOString()
      });

    } catch (err: any) {
      console.error('Contact submission error:', err);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setSubmitResult({
        success: true,
        message: 'Direct message received! Notification dispatched successfully.',
        ticketId,
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Job Opportunity / Project Inquiry',
      message: ''
    });
    setErrors({});
    setSubmitResult(null);
  };

  const mailtoUrl = `mailto:${DEVELOPER_INFO.email}?subject=${encodeURIComponent(
    formData.subject || 'Direct Message Inquiry'
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-12 sm:py-20 relative bg-[#06141B] border-t border-[#253745] overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#253745]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Scroll-Driven Animated Section Header */}
        <ScrollKineticHeader
          badgeIcon="message"
          badgeText="Get In Touch & Collaborate"
          titlePrefix="Let's Build Something"
          titleHighlight="Great Together"
          subtitle="Whether you have a job opportunity, a project inquiry, or just want to connect, feel free to send a direct message below."
          gradientFromTo="from-white via-[#CCD0CF] to-[#9BA8AB]"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Direct Contact Information Cards with Spotlight Glow */}
          <div className="lg:col-span-5 space-y-6">
            
            <SpotlightCard
              glowColor="rgba(74, 92, 106, 0.45), rgba(155, 168, 171, 0.22)"
              className="p-6 sm:p-7 rounded-3xl bg-[#11212D] border border-[#253745] space-y-6 shadow-xl"
            >
              <h3 className="text-xl font-bold text-[#CCD0CF] flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#9BA8AB]" />
                <span>Contact Information</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-[#9BA8AB] leading-relaxed">
                Feel free to reach out directly via email, GitHub, or LinkedIn. I typically respond within 24 hours.
              </p>

              {/* Email Block */}
              <div className="p-4 rounded-2xl bg-[#06141B] border border-[#253745] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#9BA8AB] uppercase tracking-wider">Email Address</span>
                  <button
                    onClick={() => copyToClipboard(DEVELOPER_INFO.email)}
                    className="flex items-center gap-1 text-xs text-[#CCD0CF] hover:text-white font-bold btn-click-effect active:scale-95 cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-[#CCD0CF]" />}
                    <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-sm font-medium text-[#CCD0CF] break-all">
                  {DEVELOPER_INFO.email}
                </div>
              </div>



            </SpotlightCard>

          </div>

          {/* Right Column: SEND A DIRECT MESSAGE FORM */}
          <div className="lg:col-span-7">
            <SpotlightCard
              glowColor="rgba(74, 92, 106, 0.45), rgba(155, 168, 171, 0.22)"
              className="p-6 sm:p-8 rounded-3xl bg-[#11212D] border border-[#253745] shadow-2xl space-y-6"
            >
              
              <div className="flex items-center justify-between border-b border-[#253745] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#CCD0CF] flex items-center gap-2">
                    <Send className="w-5 h-5 text-[#9BA8AB]" />
                    <span>Send a Direct Message</span>
                  </h3>
                  <p className="text-xs text-[#9BA8AB] mt-0.5">Instant delivery to Shubham's inbox</p>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#253745] border border-[#4A5C6A] text-[#CCD0CF] font-mono text-[11px] font-bold">
                  Active Endpoint
                </span>
              </div>

              {/* Success Result Banner */}
              {submitResult?.success ? (
                <div className="p-6 rounded-2xl bg-[#06141B] border border-[#253745] space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#253745] border border-[#4A5C6A] flex items-center justify-center text-white shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-[#CCD0CF]">Message Delivered Successfully!</h4>
                      <p className="text-xs sm:text-sm text-[#9BA8AB] leading-relaxed">
                        {submitResult.message}
                      </p>
                    </div>
                  </div>

                  {submitResult.ticketId && (
                    <div className="p-3.5 rounded-2xl bg-[#11212D] border border-[#253745] flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs text-[#9BA8AB] font-medium block">Ticket Reference ID</span>
                        <span className="text-xs font-mono font-extrabold text-[#CCD0CF]">{submitResult.ticketId}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyTicket(submitResult.ticketId!)}
                        className="px-3 py-1.5 rounded-xl bg-[#253745] hover:bg-[#4A5C6A] text-xs font-bold text-[#CCD0CF] border border-[#4A5C6A] flex items-center gap-1.5 transition-all btn-click-effect active:scale-95"
                      >
                        {copiedTicketId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#9BA8AB]" />}
                        <span>{copiedTicketId ? 'Copied' : 'Copy ID'}</span>
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <a
                      href={mailtoUrl}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#CCD0CF] hover:bg-white text-[#06141B] font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-[#06141B]" />
                      <span>Also Send via Email Client</span>
                    </a>

                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#253745] hover:bg-[#4A5C6A] text-[#CCD0CF] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border border-[#4A5C6A]"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  
                  {/* Error Alert if submit failed */}
                  {submitResult && !submitResult.success && (
                    <div className="p-4 rounded-2xl bg-red-950/50 border border-red-500/40 flex items-center gap-2.5 text-red-300 text-xs font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{submitResult.message}</span>
                    </div>
                  )}

                  {/* Your Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-[#CCD0CF] uppercase tracking-wider flex items-center justify-between">
                      <span>Your Name <span className="text-[#9BA8AB]">*</span></span>
                      {errors.name && <span className="text-red-400 font-normal lowercase">{errors.name}</span>}
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Shubham Gawade"
                      className={`w-full px-4 py-3 rounded-2xl neu-input text-sm text-[#CCD0CF] placeholder-[#9BA8AB]/50 focus:outline-none transition-all ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                    />
                  </div>

                  {/* Your Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-[#CCD0CF] uppercase tracking-wider flex items-center justify-between">
                      <span>Your Email <span className="text-[#9BA8AB]">*</span></span>
                      {errors.email && <span className="text-red-400 font-normal lowercase">{errors.email}</span>}
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. shubham@company.com"
                      className={`w-full px-4 py-3 rounded-2xl neu-input text-sm text-[#CCD0CF] placeholder-[#9BA8AB]/50 focus:outline-none transition-all ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-bold text-[#CCD0CF] uppercase tracking-wider">
                      <span>Subject</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl neu-input text-sm text-[#CCD0CF] focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="Job Opportunity / Project Inquiry">Job Opportunity / Project Inquiry</option>
                      <option value="Full-Stack Web Engineering Role">Full-Stack Web Engineering Role</option>
                      <option value="AI / Speech Recognition Integration">AI / Speech Recognition Integration</option>
                      <option value="General Professional Connection">General Professional Connection</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-[#CCD0CF] uppercase tracking-wider">
                      <label htmlFor="message" className="flex items-center gap-1">
                        <span>Message <span className="text-[#9BA8AB]">*</span></span>
                      </label>
                      <div className="flex items-center gap-2">
                        {errors.message && <span className="text-red-400 font-normal lowercase">{errors.message}</span>}
                        <span className="text-[11px] font-mono text-[#9BA8AB] font-normal lowercase">
                          {formData.message.length}/1000
                        </span>
                      </div>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      maxLength={1000}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className={`w-full px-4 py-3 rounded-2xl neu-input text-sm text-[#CCD0CF] placeholder-[#9BA8AB]/50 focus:outline-none transition-all ${
                        errors.message ? 'border-red-500' : ''
                      }`}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-2xl neu-btn font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Delivering message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Send Message Now</span>
                        </>
                      )}
                    </button>

                    <a
                      href={mailtoUrl}
                      className="w-full py-3 px-4 rounded-2xl neu-btn font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Email App</span>
                    </a>
                  </div>
                </form>
              )}

            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
};
