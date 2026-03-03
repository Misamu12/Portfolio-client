"use client"

import { Code2 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t border-[#334155]/50 bg-[#0B1120]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-[#FFFFFF]" />
              </div>
              <span className="font-sans font-bold text-[#E2E8F0]">
                Dev<span className="text-gradient">Agency</span>
              </span>
            </a>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Building powerful digital solutions for businesses worldwide. Innovation meets execution.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-[#E2E8F0] mb-4">Services</h4>
            <ul className="flex flex-col gap-3">
              {["Web Development", "Web Applications", "UI/UX Design", "Maintenance"].map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm text-[#94A3B8] hover:text-[#E2E8F0] transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-[#E2E8F0] mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              {["About Us", "Projects", "Process", "Contact"].map((s) => (
                <li key={s}>
                  <a
                    href={`#${s.toLowerCase().replace(" ", "")}`}
                    className="text-sm text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#E2E8F0] mb-4">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-[#94A3B8]">contact@devagency.com</li>
              <li className="text-sm text-[#94A3B8]">+1 (555) 123-4567</li>
              <li className="text-sm text-[#94A3B8]">123 Tech Street, Digital City</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#334155]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#94A3B8]">
            2026 DevAgency Manager. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((link) => (
              <a key={link} href="#" className="text-sm text-[#94A3B8] hover:text-[#E2E8F0] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
