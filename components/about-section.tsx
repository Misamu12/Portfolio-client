"use client"

import { Target, Eye, Lightbulb } from "lucide-react"
import SectionWrapper from "./section-wrapper"

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block text-sm font-medium text-[#06B6D4] tracking-wide uppercase mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#E2E8F0] leading-tight text-balance">
              Crafting Digital Excellence Since Day One
            </h2>
            <p className="mt-6 text-[#94A3B8] leading-relaxed text-pretty">
              DevAgency Manager is a forward-thinking digital agency dedicated to building
              exceptional web experiences and software solutions. We combine cutting-edge
              technology with creative design to deliver products that make an impact.
            </p>
            <p className="mt-4 text-[#94A3B8] leading-relaxed text-pretty">
              Our team of experienced developers, designers, and strategists work
              collaboratively to transform your vision into reality with precision and passion.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  desc: "To empower businesses with innovative digital solutions that drive measurable growth and success.",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  desc: "To be the leading digital agency recognized for transforming ideas into world-class digital products.",
                },
                {
                  icon: Lightbulb,
                  title: "Our Approach",
                  desc: "We blend creativity with technical expertise to build solutions that are both beautiful and functional.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#E2E8F0]">{item.title}</h3>
                    <p className="text-sm text-[#94A3B8] mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl glass p-8 glow-blue">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
                {/* Decorative code lines */}
                <div className="w-full max-w-xs space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444]/60" />
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]/60" />
                    <div className="w-3 h-3 rounded-full bg-[#22C55E]/60" />
                  </div>
                  <div className="text-[#7C3AED]">
                    {'const'} <span className="text-[#06B6D4]">agency</span> <span className="text-[#94A3B8]">=</span> <span className="text-[#2563EB]">{'{'}</span>
                  </div>
                  <div className="pl-4 text-[#94A3B8]">
                    name: <span className="text-[#22C55E]">{'"DevAgency Manager"'}</span>,
                  </div>
                  <div className="pl-4 text-[#94A3B8]">
                    passion: <span className="text-[#22C55E]">{'"Infinite"'}</span>,
                  </div>
                  <div className="pl-4 text-[#94A3B8]">
                    stack: <span className="text-[#2563EB]">{'['}</span>
                    <span className="text-[#22C55E]">{'"React"'}</span>,
                    <span className="text-[#22C55E]"> {'"Node.js"'}</span>,
                    <span className="text-[#22C55E]"> {'"Next.js"'}</span>
                    <span className="text-[#2563EB]">{']'}</span>,
                  </div>
                  <div className="pl-4 text-[#94A3B8]">
                    quality: <span className="text-[#F59E0B]">Infinity</span>,
                  </div>
                  <div className="text-[#2563EB]">{'}'}</div>
                  <div className="mt-4 text-[#7C3AED]">
                    {'agency'}.<span className="text-[#06B6D4]">build</span>(<span className="text-[#22C55E]">{'"Your Vision"'}</span>)
                  </div>
                </div>

                {/* Glow effects */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#2563EB]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#7C3AED]/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
