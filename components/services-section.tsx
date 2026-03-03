"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Globe, Smartphone, Palette, Wrench } from "lucide-react"
import SectionWrapper from "./section-wrapper"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern frameworks for exceptional performance and scalability.",
    color: "#2563EB",
    features: ["Next.js & React", "Responsive Design", "SEO Optimized", "Fast & Secure"],
  },
  {
    icon: Smartphone,
    title: "Web Applications",
    description:
      "Full-stack applications with rich user interfaces, real-time features, and robust backend architecture.",
    color: "#7C3AED",
    features: ["Full-Stack", "Real-Time", "Cloud Deployed", "API Integration"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered design that combines aesthetics with functionality to create intuitive digital experiences.",
    color: "#06B6D4",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description:
      "Ongoing technical support, performance monitoring, and continuous improvements to keep your project running smoothly.",
    color: "#2563EB",
    features: ["24/7 Monitoring", "Bug Fixes", "Updates", "Performance"],
  },
]

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative glass rounded-2xl p-8 hover:bg-[#1E293B]/80 transition-all duration-500 hover:shadow-xl"
      style={{
        boxShadow: `0 0 0 rgba(${
          service.color === "#2563EB"
            ? "37, 99, 235"
            : service.color === "#7C3AED"
            ? "124, 58, 237"
            : "6, 182, 212"
        }, 0)`,
      }}
      onMouseEnter={(e) => {
        const rgb =
          service.color === "#2563EB"
            ? "37, 99, 235"
            : service.color === "#7C3AED"
            ? "124, 58, 237"
            : "6, 182, 212"
        e.currentTarget.style.boxShadow = `0 0 30px rgba(${rgb}, 0.15), 0 0 60px rgba(${rgb}, 0.05)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 rgba(0, 0, 0, 0)`
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
        style={{ background: `${service.color}20` }}
      >
        <service.icon className="w-6 h-6" style={{ color: service.color }} />
      </div>

      <h3 className="text-xl font-bold text-[#E2E8F0] mb-3">{service.title}</h3>
      <p className="text-[#94A3B8] leading-relaxed mb-6 text-pretty">{service.description}</p>

      <div className="flex flex-wrap gap-2">
        {service.features.map((feature) => (
          <span
            key={feature}
            className="text-xs px-3 py-1 rounded-full text-[#94A3B8]"
            style={{ background: `${service.color}10`, border: `1px solid ${service.color}25` }}
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Decorative corner glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `${service.color}10` }}
      />
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <SectionWrapper id="services">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#06B6D4] tracking-wide uppercase mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E2E8F0] text-balance">
            What We Do Best
          </h2>
          <p className="mt-4 text-[#94A3B8] max-w-2xl mx-auto leading-relaxed text-pretty">
            We offer comprehensive digital services to help your business thrive in the modern
            landscape, from concept to deployment and beyond.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
