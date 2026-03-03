'use client'

import dynamic from 'next/dynamic'

// ⚠️ Important : Scene3D ne doit jamais être SSR
const Scene3D = dynamic(() => import('./scene-3d'), { ssr: false })

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Scene3D />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <h1 className="text-5xl font-bold text-white z-10">
          Welcome to My Portfolio
        </h1>
      </div>
    </section>
  )
}