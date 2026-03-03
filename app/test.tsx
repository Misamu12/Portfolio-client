// app/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Setup scène, caméra, renderer ---
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);
    
    // Petit brouillard pour la profondeur
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.002);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 12);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Lumières
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(1, 3, 2);
    dirLight.castShadow = true;
    dirLight.receiveShadow = true;
    scene.add(dirLight);
    
    const backLight = new THREE.PointLight(0x4466ff, 0.8);
    backLight.position.set(-2, 1, -4);
    scene.add(backLight);
    
    const pointLight2 = new THREE.PointLight(0xffaa88, 1);
    pointLight2.position.set(3, 1, 4);
    scene.add(pointLight2);

    // --- Création d'éléments visuels ---
    const geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    
    // Groupe principal
    const mainGroup = new THREE.Group();
    
    // Couleurs
    const colors = [0x4a80f0, 0xa36eff, 0x5ac8fa, 0xff9f4b, 0x6ce0b0];
    
    // Constellation de formes
    for (let i = 0; i < 40; i++) {
      let mesh;
      if (Math.random() > 0.4) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ 
          color: colors[Math.floor(Math.random() * colors.length)], 
          emissive: 0x111122, 
          roughness: 0.2, 
          metalness: 0.3 
        }));
      } else {
        const sphereGeo = new THREE.SphereGeometry(0.22, 16, 16);
        mesh = new THREE.Mesh(sphereGeo, new THREE.MeshStandardMaterial({ 
          color: 0x88aaff, 
          emissive: 0x111830, 
          roughness: 0.15 
        }));
      }
      
      const angle = (i / 40) * Math.PI * 2;
      const radius = 3.5 + Math.sin(i * 1.5) * 1.2;
      const x = Math.cos(angle * 2.3) * radius * 0.8;
      const y = Math.sin(i * 0.9) * 2.5;
      const z = Math.sin(angle * 1.7) * radius * 1.2 - 3;
      
      mesh.position.set(x, y, z);
      
      mesh.userData = { 
        speed: 0.005 + Math.random() * 0.01, 
        offset: Math.random() * 100, 
        originalY: y, 
        originalX: x, 
        originalZ: z 
      };
      
      mainGroup.add(mesh);
    }
    
    // Ajout d'éléments filaires
    const torusGeo = new THREE.TorusKnotGeometry(0.9, 0.22, 128, 16);
    const torusMat = new THREE.MeshStandardMaterial({ 
      color: 0x3a5faa, 
      emissive: 0x0f1a30, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.25 
    });
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    torusKnot.scale.set(1.2, 1.2, 1.2);
    torusKnot.position.set(-1, 0.5, -4);
    mainGroup.add(torusKnot);
    
    const sphereBigGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const sphereBigMat = new THREE.MeshStandardMaterial({ 
      color: 0x2a3f77, 
      emissive: 0x0a1025, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.18 
    });
    const sphereWire = new THREE.Mesh(sphereBigGeo, sphereBigMat);
    sphereWire.position.set(2.2, -0.8, -6);
    mainGroup.add(sphereWire);
    
    scene.add(mainGroup);

    // Particules (étoiles)
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 800;
    const posArray = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 40;
      posArray[i+1] = (Math.random() - 0.5) * 30;
      posArray[i+2] = (Math.random() - 0.5) * 40 - 15;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xaab9ff, size: 0.08, transparent: true, opacity: 0.7 });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    // --- Animation et scroll ---
    let targetRotationY = 0;
    let targetCameraY = 2;
    
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(1, window.scrollY / (maxScroll * 0.7));
      
      targetRotationY = progress * Math.PI * 1.5;
      targetCameraY = 2 + progress * 2.5;
      
      mainGroup.rotation.x = progress * 0.3;
      stars.rotation.y = progress * 0.5;
    };

    window.addEventListener('scroll', handleScroll);

    // Animation loop
    let animationFrame: number;
    
    function animate() {
      // Interpolation fluide
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.03;
      
      camera.position.y += (targetCameraY - camera.position.y) * 0.02;
      camera.position.x = Math.sin(Date.now() * 0.0005) * 0.8;
      camera.position.z = 12 + Math.sin(Date.now() * 0.0003) * 0.4;
      
      // Animation individuelle des objets
      mainGroup.children.forEach(child => {
        if (child.geometry && (child.geometry.type === 'BoxGeometry' || child.geometry.type === 'SphereGeometry')) {
          child.position.y = (child.userData.originalY || 0) + 
            Math.sin(Date.now() * (child.userData.speed || 0.005) * 100 + (child.userData.offset || 0)) * 0.2;
          
          if (child.geometry.type === 'BoxGeometry') {
            child.rotation.x += 0.005;
            child.rotation.y += 0.007;
          }
        }
      });
      
      torusKnot.rotation.x += 0.001;
      torusKnot.rotation.y += 0.002;
      
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    }
    
    animate();

    // Gestion du redimensionnement
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Nettoyage
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Canvas Three.js */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          display: 'block',
        }}
      />

      {/* Contenu overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          pointerEvents: 'auto',
          minHeight: '200vh',
          paddingBottom: '20vh',
          color: '#f0f0f0',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Navigation */}
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.8rem 4rem',
            maxWidth: '1400px',
            margin: '0 auto',
            backdropFilter: 'blur(8px)',
            background: 'rgba(10, 10, 15, 0.4)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '0 0 24px 24px',
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: '1.8rem',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #a0e9ff, #6b8cff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            APEX
          </span>
          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
              alignItems: 'center',
              fontWeight: 500,
            }}
          >
            <a href="#" style={{ color: '#ddd', textDecoration: 'none', fontSize: '1rem' }}>
              Fonctionnalités
            </a>
            <a href="#" style={{ color: '#ddd', textDecoration: 'none', fontSize: '1rem' }}>
              Tarifs
            </a>
            <a href="#" style={{ color: '#ddd', textDecoration: 'none', fontSize: '1rem' }}>
              Docs
            </a>
            <a href="#" style={{ color: '#ddd', textDecoration: 'none', fontSize: '1rem' }}>
              Blog
            </a>
            <a
              href="#"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '0.5rem 1.2rem',
                borderRadius: '40px',
                background: 'rgba(255,255,255,0.02)',
                color: '#ddd',
                textDecoration: 'none',
              }}
            >
              Connexion
            </a>
            <a
              href="#"
              style={{
                background: 'white',
                color: '#0a0a0f',
                padding: '0.5rem 1.5rem',
                borderRadius: '40px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Commencer
            </a>
          </div>
        </nav>

        {/* Hero section */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '8rem auto 0',
            padding: '0 3rem',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(107, 140, 255, 0.12)',
              border: '1px solid rgba(107, 140, 255, 0.3)',
              backdropFilter: 'blur(4px)',
              padding: '0.5rem 1.4rem',
              borderRadius: '60px',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.3px',
              color: '#b5ccff',
              marginBottom: '2rem',
            }}
          >
            ✨ MAINTENANT EN BÊTA PUBLIQUE
          </div>
          <h1
            style={{
              fontSize: '5.5rem',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(to right, #ffffff, #c0d0ff, #a2b8ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
            }}
          >
            Ship faster.<br />Scale smarter.
          </h1>
          <div
            style={{
              fontSize: '1.8rem',
              fontWeight: 400,
              color: '#cbd5e1',
              marginBottom: '1.2rem',
            }}
          >
            La plateforme moderne pour les équipes qui déploient vite.
          </div>
          <div
            style={{
              fontSize: '1.2rem',
              maxWidth: '600px',
              color: '#a0a8b8',
              marginBottom: '2.8rem',
              lineHeight: 1.5,
            }}
          >
            Conçue pour l&apos;échelle, pensée pour la vitesse. Tout ce dont vous avez besoin pour builder, déployer et évoluer.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a
              href="#"
              style={{
                background: 'white',
                color: '#0a0a0f',
                padding: '1rem 2.8rem',
                borderRadius: '60px',
                fontWeight: 600,
                fontSize: '1.2rem',
                textDecoration: 'none',
                boxShadow: '0 10px 20px -8px rgba(255,255,255,0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 18px 30px -8px rgba(160, 200, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 20px -8px rgba(255,255,255,0.2)';
              }}
            >
              Commencer →
            </a>
            <a
              href="#"
              style={{
                color: 'white',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '1rem 2.5rem',
                borderRadius: '60px',
                fontWeight: 500,
                fontSize: '1.2rem',
                textDecoration: 'none',
                backdropFilter: 'blur(4px)',
              }}
            >
              Voir la démo
            </a>
          </div>
        </div>

        {/* Features section */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '18rem auto 6rem',
            padding: '0 3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {[
            {
              title: '⚡ Déploiements instantanés',
              desc: 'Git push et c\'est en ligne. Rollbacks automatiques, prévisualisations pour chaque branche.',
            },
            {
              title: '📈 Scalabilité intelligente',
              desc: 'Infrastructure auto-scalable gérée par ML. De 0 à 1 million d\'utilisateurs sans effort.',
            },
            {
              title: '🔒 Sécurité renforcée',
              desc: 'Chiffrement de bout en bout, DDoS protection, et audits automatisés intégrés.',
            },
            {
              title: '🌍 Edge par défaut',
              desc: 'Contenu distribué sur 300+ points de présence. Latence minimale, partout.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(20, 22, 32, 0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.03)',
                borderRadius: '36px',
                padding: '2.5rem 2rem',
                boxShadow: '0 30px 40px -20px rgba(0,0,0,0.8)',
                transform: 'translateY(30px)',
                opacity: 0,
                animation: `fadeUp 0.8s forwards ${index * 0.1}s`,
              }}
            >
              <h3
                style={{
                  fontSize: '2rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  background: 'linear-gradient(145deg, #f0f4ff, #c7d7ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {feature.title}
              </h3>
              <p style={{ color: '#b0b8cc', lineHeight: 1.6, fontSize: '1.1rem' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '5rem',
            fontSize: '0.9rem',
            color: '#5c6a87',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          ↓ Faites défiler pour ressentir l&apos;animation 3D ↓
        </div>
      </div>

      {/* Styles pour l'animation */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background-color: #0a0a0f;
          overflow-x: hidden;
        }
        
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 800px) {
          nav {
            padding: 1.5rem 2rem;
            flex-wrap: wrap;
          }
          .nav-links {
            gap: 1.2rem;
          }
          h1 {
            font-size: 3.5rem !important;
          }
          .subtitle {
            font-size: 1.4rem !important;
          }
        }
        
        @media (max-width: 600px) {
          .cta-group {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}