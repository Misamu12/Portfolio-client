"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import SectionWrapper from "./section-wrapper"

const technologies = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#E2E8F0" },
  { name: "Node.js", color: "#68A063" },
  { name: "Java", color: "#ED8B00" },
  { name: "Spring Boot", color: "#6DB33F" },
  { name: "MySQL", color: "#00758F" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Tailwind CSS", color: "#06B6D4" },
  { name: "MongoDB", color: "#47A248" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Docker", color: "#2496ED" },
  { name: "Git", color: "#F05032" },
]

function TechCard({
  tech,
  index,
}: {
  tech: (typeof technologies)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative glass rounded-xl p-6 flex flex-col items-center gap-4 hover:bg-[#1E293B]/80 transition-all duration-300"
      style={{
        boxShadow: `0 0 0 rgba(0, 0, 0, 0)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 25px ${tech.color}15, 0 0 50px ${tech.color}08`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 rgba(0, 0, 0, 0)`
      }}
    >
      {/* Tech icon placeholder: stylized letter */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${tech.color}15`,
          color: tech.color,
          border: `1px solid ${tech.color}30`,
        }}
      >
        {tech.name.charAt(0)}
      </div>
      <span className="text-sm font-medium text-[#94A3B8] group-hover:text-[#E2E8F0] transition-colors">
        {tech.name}
      </span>
    </motion.div>
  )
}

export default function TechnologiesSection() {
  return (
    <SectionWrapper id="technologies">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#06B6D4] tracking-wide uppercase mb-4">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E2E8F0] text-balance">
            Technologies We Use
          </h2>
          <p className="mt-4 text-[#94A3B8] max-w-2xl mx-auto leading-relaxed text-pretty">
            We leverage the latest and most reliable technologies to build scalable,
            performant, and maintainable solutions.
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>

        {/* Orbiting animation visual */}
        <div className="mt-20 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center glow-blue z-10">
              <span className="text-[#FFFFFF] font-bold text-xs">DEV</span>
            </div>

            {/* Orbit ring 1 */}
            <div className="absolute inset-4 rounded-full border border-[#334155]/50 animate-[spin_20s_linear_infinite]">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#61DAFB] shadow-lg shadow-[#61DAFB]/30" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#68A063] shadow-lg shadow-[#68A063]/30" />
            </div>

            {/* Orbit ring 2 */}
            <div className="absolute inset-0 rounded-full border border-[#334155]/30 animate-[spin_30s_linear_infinite_reverse]">
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#ED8B00] shadow-lg shadow-[#ED8B00]/30" />
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#3178C6] shadow-lg shadow-[#3178C6]/30" />
            </div>

            {/* Orbit ring 3 */}
            <div className="absolute -inset-6 rounded-full border border-[#334155]/20 animate-[spin_40s_linear_infinite]">
              <div className="absolute -top-1.5 left-1/3 w-3 h-3 rounded-full bg-[#06B6D4] shadow-lg shadow-[#06B6D4]/30" />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
