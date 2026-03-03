"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, PenTool, Code, Rocket } from "lucide-react"
import SectionWrapper from "./section-wrapper"

const steps = [
  {
    icon: Search,
    title: "Analysis",
    description: "We dive deep into understanding your business requirements, target audience, and project goals.",
    color: "#2563EB",
    step: "01",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Our designers create stunning mockups and prototypes that align with your brand and user needs.",
    color: "#7C3AED",
    step: "02",
  },
  {
    icon: Code,
    title: "Development",
    description: "Our engineers bring the designs to life with clean, efficient, and scalable code.",
    color: "#06B6D4",
    step: "03",
  },
  {
    icon: Rocket,
    title: "Delivery",
    description: "We deploy, test, and optimize your project, ensuring a flawless launch and ongoing support.",
    color: "#2563EB",
    step: "04",
  },
]

function ProcessStep({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex items-start gap-6"
    >
      {/* Vertical line + circle */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center relative z-10"
          style={{
            background: `${step.color}15`,
            border: `2px solid ${step.color}40`,
          }}
        >
          <step.icon className="w-6 h-6" style={{ color: step.color }} />
        </div>
        {!isLast && (
          <div
            className="w-0.5 h-20 mt-2"
            style={{
              background: `linear-gradient(to bottom, ${step.color}40, transparent)`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pt-2 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-xs font-mono font-bold"
            style={{ color: step.color }}
          >
            STEP {step.step}
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#E2E8F0] mb-2">{step.title}</h3>
        <p className="text-[#94A3B8] leading-relaxed max-w-md text-pretty">{step.description}</p>
      </div>
    </motion.div>
  )
}

export default function ProcessSection() {
  return (
    <SectionWrapper id="process">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-block text-sm font-medium text-[#06B6D4] tracking-wide uppercase mb-4">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#E2E8F0] text-balance">
              How We Work
            </h2>
            <p className="mt-4 text-[#94A3B8] leading-relaxed text-pretty">
              Our proven four-step process ensures every project is delivered on time,
              within budget, and exceeding expectations. We keep you involved at every
              stage for complete transparency.
            </p>

            {/* Mini stats */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { value: "100%", label: "On-Time Delivery" },
                { value: "4 Steps", label: "Clear Process" },
                { value: "24/7", label: "Support Available" },
                { value: "Agile", label: "Methodology" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4">
                  <div className="text-lg font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-[#94A3B8] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
