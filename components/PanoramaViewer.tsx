'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Maximize2, Minimize2, RotateCcw, Play, Pause, MapPin, Eye, Building, Compass } from 'lucide-react';
import { Language, content } from '@/data/content';

interface PanoramaViewerProps {
  lang: Language;
}

type PanoKey = 'rdc' | 'muscu' | 'combat';

const panos: Record<PanoKey, { src: string; key: PanoKey }> = {
  rdc: { src: '/images/360/reception_entrance_360.jpg', key: 'rdc' },
  muscu: { src: '/images/360/musculation_360.jpg', key: 'muscu' },
  combat: { src: '/images/360/crossfit_combat_360.jpg', key: 'combat' },
};

export default function PanoramaViewer({ lang }: PanoramaViewerProps) {
  const t = content[lang].tour360;
  const [activePano, setActivePano] = useState<PanoKey>('muscu');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isTouchActive, setIsTouchActive] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialsRef = useRef<Record<PanoKey, THREE.MeshBasicMaterial> | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Interaction coordinates
  const isUserInteracting = useRef<boolean>(false);
  const onPointerDownPointerX = useRef<number>(0);
  const onPointerDownPointerY = useRef<number>(0);
  const onPointerDownLon = useRef<number>(0);
  const onPointerDownLat = useRef<number>(0);
  const lon = useRef<number>(0);
  const lat = useRef<number>(0);
  const phi = useRef<number>(0);
  const theta = useRef<number>(0);

  // Setup Three.js scene and preload all 3 panoramas
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    const cameraTarget = new THREE.Vector3(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Inverted sphere for 360 panoramic projection
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    setIsLoading(true);

    // Preload all 3 textures so switching is instant and foolproof
    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= 1) {
        setIsLoading(false);
      }
    };

    const texRdc = textureLoader.load(panos.rdc.src, checkAllLoaded);
    texRdc.colorSpace = THREE.SRGBColorSpace;

    const texMuscu = textureLoader.load(panos.muscu.src, checkAllLoaded);
    texMuscu.colorSpace = THREE.SRGBColorSpace;

    const texCombat = textureLoader.load(panos.combat.src, checkAllLoaded);
    texCombat.colorSpace = THREE.SRGBColorSpace;

    const materials: Record<PanoKey, THREE.MeshBasicMaterial> = {
      rdc: new THREE.MeshBasicMaterial({ map: texRdc }),
      muscu: new THREE.MeshBasicMaterial({ map: texMuscu }),
      combat: new THREE.MeshBasicMaterial({ map: texCombat }),
    };
    materialsRef.current = materials;

    const mesh = new THREE.Mesh(geometry, materials[activePano]);
    meshRef.current = mesh;
    scene.add(mesh);

    let isVisible = true;
    let isLoopRunning = false;

    // Throttled animation loop (only renders when visible in viewport)
    const animate = () => {
      if (!isVisible) {
        isLoopRunning = false;
        return;
      }
      isLoopRunning = true;
      reqIdRef.current = requestAnimationFrame(animate);

      if (isAutoRotating && !isUserInteracting.current) {
        lon.current += 0.08;
      }

      lat.current = Math.max(-85, Math.min(85, lat.current));
      phi.current = THREE.MathUtils.degToRad(90 - lat.current);
      theta.current = THREE.MathUtils.degToRad(lon.current);

      cameraTarget.x = 500 * Math.sin(phi.current) * Math.cos(theta.current);
      cameraTarget.y = 500 * Math.cos(phi.current);
      cameraTarget.z = 500 * Math.sin(phi.current) * Math.sin(theta.current);

      camera.lookAt(cameraTarget);
      renderer.render(scene, camera);
    };

    // Viewport intersection observer to save mobile battery
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && !isLoopRunning) {
          animate();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      renderer.dispose();
      geometry.dispose();
      Object.values(materials).forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Instant material switch without reloading or WebGL bugs
  const switchPano = (key: PanoKey) => {
    setActivePano(key);
    if (meshRef.current && materialsRef.current) {
      meshRef.current.material = materialsRef.current[key];
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' && !isTouchActive) {
      return;
    }
    isUserInteracting.current = true;
    onPointerDownPointerX.current = e.clientX;
    onPointerDownPointerY.current = e.clientY;
    onPointerDownLon.current = lon.current;
    onPointerDownLat.current = lat.current;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isUserInteracting.current) return;
    lon.current = (onPointerDownPointerX.current - e.clientX) * 0.16 + onPointerDownLon.current;
    lat.current = (e.clientY - onPointerDownPointerY.current) * 0.16 + onPointerDownLat.current;
  };

  const onPointerUp = () => {
    isUserInteracting.current = false;
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!cameraRef.current) return;
    const fov = cameraRef.current.fov + e.deltaY * 0.05;
    cameraRef.current.fov = THREE.MathUtils.clamp(fov, 40, 90);
    cameraRef.current.updateProjectionMatrix();
  };

  const resetView = () => {
    lon.current = 0;
    lat.current = 0;
    if (cameraRef.current) {
      cameraRef.current.fov = 75;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const toggleFullscreen = () => {
    const el = document.getElementById('tour-360-container');
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(console.error);
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(console.error);
    }
  };

  return (
    <section id="tour-360" className="py-20 scroll-mt-28 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: direct and clean without generic kicker pills */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-adrena-bone tracking-tight uppercase leading-none">
              {t.title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-adrena-stone max-w-[65ch] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <a
            href="https://www.google.com/maps/place/Adr%C3%A9na+club/@36.731219,3.185733,17z/data=!4m6!3m5!1s0x128e510838572915:0x98c81818d117e070!8m2!3d36.731219!4d3.185733!16s%2Fg%2F11v402rb1s"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-adrena-card hover:bg-adrena-gold hover:text-[#111215] border border-adrena-border text-sm font-bold uppercase tracking-wider text-adrena-bone transition-all self-start md:self-auto shadow-sm"
          >
            <MapPin className="w-4 h-4 text-adrena-gold" />
            <span>{t.googleMapsBtn}</span>
          </a>
        </div>

        {/* 360 Viewer Card with INTEGRATED Controls */}
        <div
          id="tour-360-container"
          className="relative w-full rounded-2xl border border-adrena-border bg-adrena-dark overflow-hidden shadow-2xl"
        >
          {/* Top Left: Active Area Label */}
          <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-20 flex items-center gap-2.5 bg-black/85 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-xs text-white">
            <span className="w-2 h-2 rounded-full bg-adrena-gold animate-pulse" />
            <span className="font-extrabold uppercase tracking-wider">{t.floors[activePano].badge}</span>
            <span className="text-neutral-500">•</span>
            <span className="font-semibold text-neutral-200">{t.floors[activePano].title}</span>
          </div>

          {/* Top Right: Rotation & Fullscreen Utility */}
          <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 flex items-center gap-1.5 bg-black/85 backdrop-blur-md p-1.5 rounded-lg border border-white/10">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              title={isAutoRotating ? 'Pause rotation' : 'Rotation auto'}
              className={`p-2 rounded-md transition-colors ${
                isAutoRotating ? 'bg-adrena-gold text-black' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={resetView}
              title="Réinitialiser la vue"
              className="p-2 rounded-md text-neutral-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              title="Plein écran"
              className="p-2 rounded-md text-neutral-400 hover:text-white transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Canvas Viewport */}
          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onWheel={onWheel}
            style={{ touchAction: isTouchActive ? 'none' : 'pan-y' }}
            className={`w-full h-[450px] sm:h-[550px] md:h-[650px] select-none ${
              isTouchActive ? 'cursor-grab active:cursor-grabbing' : ''
            }`}
          />

          {/* Mobile Tap-To-Interact Barrier (Prevents Scroll Trapping) */}
          {!isTouchActive && (
            <div
              onClick={() => setIsTouchActive(true)}
              className="md:hidden absolute inset-0 z-25 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center cursor-pointer"
            >
              <div className="p-4 rounded-2xl bg-[#111215]/95 border border-adrena-gold/50 shadow-2xl flex flex-col items-center gap-2 max-w-xs">
                <div className="w-10 h-10 rounded-full bg-adrena-gold/20 text-adrena-gold flex items-center justify-center animate-pulse">
                  <Compass className="w-5 h-5" />
                </div>
                <p className="font-display font-black text-base uppercase text-adrena-bone tracking-wide">
                  {lang === 'fr' ? 'Touchez pour activer la visite 360°' : 'المس لتفعيل جولة 360°'}
                </p>
                <p className="text-xs text-adrena-stone font-medium">
                  {lang === 'fr'
                    ? 'Activez la vue panoramique sans bloquer le défilement de la page'
                    : 'تحريك الغرفة بحرية بدون إيقاف تمرير الصفحة'}
                </p>
              </div>
            </div>
          )}

          {/* Active Mobile Lock Button to Resume Page Scrolling */}
          {isTouchActive && (
            <button
              onClick={() => setIsTouchActive(false)}
              className="md:hidden absolute top-4 left-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111215]/95 border border-adrena-border text-xs font-bold text-adrena-bone shadow-lg"
            >
              <RotateCcw className="w-3.5 h-3.5 text-adrena-gold" />
              <span>{lang === 'fr' ? 'Verrouiller / Défiler' : 'قفل / تمرير الصفحة'}</span>
            </button>
          )}

          {isLoading && (
            <div className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-adrena-gold/20 border-t-adrena-gold rounded-full animate-spin" />
              <p className="text-xs text-neutral-300 font-mono">Chargement des espaces 360°...</p>
            </div>
          )}

          {/* Integrated Floor Navigation Dock (Directly placed inside the bottom of the viewer) */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
            {/* Hand drag hint */}
            <div className="hidden sm:flex items-center gap-2 bg-black/85 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 text-xs font-bold text-neutral-200 pointer-events-auto shadow-lg">
              <Eye className="w-4 h-4 text-adrena-gold" />
              <span>{t.tip}</span>
            </div>

            {/* The 3 Floor Switchers: Integrated directly into the viewer */}
            <div className="flex items-center gap-2 bg-black/90 backdrop-blur-md p-2 rounded-2xl border border-white/20 pointer-events-auto max-w-full overflow-x-auto shadow-2xl">
              {(['rdc', 'muscu', 'combat'] as PanoKey[]).map((key) => {
                const floor = t.floors[key];
                const isActive = activePano === key;
                return (
                  <button
                    key={key}
                    onClick={() => switchPano(key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-display text-sm font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-adrena-gold text-black shadow-md'
                        : 'text-neutral-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>{floor.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Active Room Description */}
        <div className="mt-4 px-2 text-sm sm:text-base text-neutral-300 font-medium">
          <strong className="text-white font-extrabold">{t.floors[activePano].title} :</strong>{' '}
          {t.floors[activePano].desc}
        </div>
      </div>
    </section>
  );
}
