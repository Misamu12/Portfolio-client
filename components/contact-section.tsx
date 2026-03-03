"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Phone } from "lucide-react"
import SectionWrapper from "./section-wrapper"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormState({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <SectionWrapper id="contact">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#06B6D4] tracking-wide uppercase mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E2E8F0] text-balance">
            Start Your Project Today
          </h2>
          <p className="mt-4 text-[#94A3B8] max-w-2xl mx-auto leading-relaxed text-pretty">
            Have an idea in mind? We{"'"}d love to hear about it. Reach out and let{"'"}s
            discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="glass rounded-2xl p-8 flex flex-col gap-8">
              <div>
                <h3 className="text-lg font-bold text-[#E2E8F0] mb-2">Contact Information</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  { icon: Mail, label: "Email", value: "contact@devagency.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                  { icon: MapPin, label: "Address", value: "123 Tech Street, Digital City" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#94A3B8]">{item.label}</div>
                      <div className="text-sm text-[#E2E8F0]">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-3 mt-auto">
                {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-[#0F172A] border border-[#334155] flex items-center justify-center text-xs font-medium text-[#94A3B8] hover:text-[#E2E8F0] hover:border-[#2563EB]/50 transition-all"
                  >
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 flex flex-col gap-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#E2E8F0]">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-sm text-[#E2E8F0] placeholder-[#475569] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#E2E8F0]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-sm text-[#E2E8F0] placeholder-[#475569] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-[#E2E8F0]">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-sm text-[#E2E8F0] placeholder-[#475569] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-[#E2E8F0]">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-3 text-sm text-[#E2E8F0] placeholder-[#475569] focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-[#FFFFFF] font-medium hover:shadow-xl hover:shadow-[#2563EB]/20 transition-shadow"
              >
                {submitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
