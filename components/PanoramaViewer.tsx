'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Maximize2, Minimize2, RotateCcw, Play, Pause, MapPin, Eye, Building, Compass, Dumbbell, Swords } from 'lucide-react';
import { Language, content } from '@/data/content';

interface PanoramaViewerProps {
  lang: Language;
  isModal?: boolean;
}

type PanoKey = 'rdc' | 'muscu' | 'combat';

const panos: Record<PanoKey, { src: string; key: PanoKey }> = {
  rdc: { src: '/images/360/reception_entrance_360.jpg', key: 'rdc' },
  muscu: { src: '/images/360/musculation_360.jpg', key: 'muscu' },
  combat: { src: '/images/360/crossfit_combat_360.jpg', key: 'combat' },
};

const floorIcons: Record<PanoKey, React.ComponentType<{ className?: string }>> = {
  rdc: Building,
  muscu: Dumbbell,
  combat: Swords,
};

export default function PanoramaViewer({ lang, isModal = false }: PanoramaViewerProps) {
  const isAr = lang === 'ar';
  const t = content[lang].tour360;
  const [activePano, setActivePano] = useState<PanoKey>('muscu');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  // In modal mode, touch interaction is immediately enabled without requiring a tap barrier
  const [isTouchActive, setIsTouchActive] = useState<boolean>(isModal);

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

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

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
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
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

  const viewerContent = (
    <>
      {/* 360 Viewer Card with INTEGRATED Controls */}
      <div
        id="tour-360-container"
        data-lenis-prevent
        className="relative w-full rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl"
      >
        {/* Top Left: Active Area Label */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 rtl:left-auto rtl:right-3 sm:rtl:right-4 z-20 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/10 text-xs text-white max-w-[calc(100%-130px)] sm:max-w-none shadow-lg">
          <span className="w-2 h-2 rounded-full bg-adrena-gold animate-pulse shrink-0" />
          <span className="font-extrabold uppercase tracking-wider text-[11px] sm:text-xs shrink-0">
            {t.floors[activePano].badge}
          </span>
          <span className="text-neutral-500 hidden sm:inline">•</span>
          <span className="font-semibold text-neutral-200 hidden sm:inline truncate">
            {t.floors[activePano].title}
          </span>
        </div>

        {/* Top Right: Rotation & Fullscreen Utility */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 rtl:right-auto rtl:left-3 sm:rtl:left-4 z-20 flex items-center gap-1 sm:gap-1.5 bg-slate-950/85 backdrop-blur-md p-1 sm:p-1.5 rounded-lg border border-white/10 shadow-lg">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            title={isAutoRotating ? 'Pause rotation' : 'Rotation auto'}
            className={`p-2 rounded-md transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer ${
              isAutoRotating ? 'bg-adrena-gold text-slate-950 shadow-sm' : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={resetView}
            title="Réinitialiser la vue"
            className="p-2 rounded-md text-neutral-300 hover:text-white hover:bg-white/10 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            title="Plein écran"
            className="p-2 rounded-md text-neutral-300 hover:text-white hover:bg-white/10 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Subtle mobile gesture indicator inside modal */}
        {isModal && (
          <div className="sm:hidden absolute top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-slate-950/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10.5px] text-slate-300 flex items-center gap-1.5 shadow-md">
            <Eye className="w-3 h-3 text-adrena-gold shrink-0" />
            <span>{isAr ? 'اسحب بإصبعك للاستكشاف 360°' : 'Glissez pour pivoter à 360°'}</span>
          </div>
        )}

        {/* Canvas Viewport */}
        <div
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onWheel={onWheel}
          style={{ touchAction: isTouchActive ? 'none' : 'pan-y' }}
          className={`w-full h-[380px] xs:h-[420px] sm:h-[500px] md:h-[580px] select-none ${
            isTouchActive ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
        />

        {/* Mobile Tap-To-Interact Barrier (Prevents Scroll Trapping ONLY when embedded directly on page) */}
        {!isModal && !isTouchActive && (
          <div
            onClick={() => setIsTouchActive(true)}
            className="md:hidden absolute inset-0 z-[25] bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center cursor-pointer"
          >
            <div className="p-4 rounded-2xl bg-slate-900/95 border border-adrena-gold/50 shadow-2xl flex flex-col items-center gap-2 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-adrena-gold/20 text-adrena-gold flex items-center justify-center animate-pulse">
                <Compass className="w-5 h-5" />
              </div>
              <p className="font-bold text-base text-white">
                {isAr ? 'المس لتفعيل جولة 360°' : 'Touchez pour activer la visite 360°'}
              </p>
              <p className="text-xs text-slate-300 font-medium">
                {isAr
                  ? 'تحريك الغرفة بحرية بدون إيقاف تمرير الصفحة'
                  : 'Activez la vue panoramique sans bloquer le défilement de la page'}
              </p>
            </div>
          </div>
        )}

        {/* Active Mobile Lock Button to Resume Page Scrolling (only when embedded on page) */}
        {!isModal && isTouchActive && (
          <button
            onClick={() => setIsTouchActive(false)}
            className="md:hidden absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900/95 border border-adrena-gold/60 text-xs font-bold text-white shadow-2xl backdrop-blur-md cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-adrena-gold" />
            <span>{isAr ? 'إنهاء التدوير / تمرير الصفحة' : 'Terminer rotation / Défiler'}</span>
          </button>
        )}

        {isLoading && (
          <div className="absolute inset-0 z-30 bg-slate-950/90 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-adrena-gold/20 border-t-adrena-gold rounded-full animate-spin" />
            <p className="text-xs text-neutral-300 font-mono">
              {isAr ? 'جاري تحميل فضاءات 360°...' : 'Chargement des espaces 360°...'}
            </p>
          </div>
        )}

        {/* Integrated Floor Navigation Dock (Directly placed inside the bottom of the viewer) */}
        <div className="absolute bottom-3 sm:bottom-4 left-2.5 right-2.5 sm:left-4 sm:right-4 z-30 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 pointer-events-none">
          {/* Hand drag hint (desktop only) */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 text-xs font-bold text-neutral-200 pointer-events-auto shadow-lg">
            <Eye className="w-4 h-4 text-adrena-gold" />
            <span>{t.tip}</span>
          </div>

          {/* The 3 Floor Switchers: 3-column responsive grid on mobile, flex on desktop */}
          <div className="w-full sm:w-auto grid grid-cols-3 sm:flex items-center gap-1 sm:gap-1.5 bg-slate-950/90 backdrop-blur-md p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-white/20 pointer-events-auto shadow-2xl">
            {(['rdc', 'muscu', 'combat'] as PanoKey[]).map((key) => {
              const floor = t.floors[key];
              const isActive = activePano === key;
              const Icon = floorIcons[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => switchPano(key)}
                  className={`flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10.5px] xs:text-[11px] sm:text-xs md:text-sm font-extrabold transition-all min-h-[42px] sm:min-h-[44px] cursor-pointer ${
                    isActive
                      ? 'bg-adrena-gold text-slate-950 shadow-md shadow-adrena-gold/30'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="sm:hidden whitespace-nowrap text-[10.5px] xs:text-[11px] font-bold">
                    {key === 'combat'
                      ? (isAr ? 'حلبة القتال' : 'Combat & Ring')
                      : (floor.shortTitle || floor.title)}
                  </span>
                  <span className="hidden sm:inline whitespace-nowrap">{floor.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Active Room Description Card */}
      <div className="mt-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-adrena-gold/15 text-adrena-gold border border-adrena-gold/30 text-[10px] sm:text-xs font-black uppercase tracking-wider">
            {t.floors[activePano].badge}
          </span>
          <h4 className="text-sm sm:text-base font-extrabold text-white">
            {t.floors[activePano].title}
          </h4>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
          {t.floors[activePano].desc}
        </p>
      </div>
    </>
  );

  if (isModal) {
    return <div>{viewerContent}</div>;
  }

  return (
    <section id="tour-360" className="py-20 scroll-mt-28 relative bg-adrena-black border-b border-adrena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="mt-2 text-base text-adrena-stone max-w-[60ch] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <a
            href="https://maps.app.goo.gl/6YJepRtyWvXcrZoV9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all self-start md:self-auto shadow-sm"
          >
            <MapPin className="w-4 h-4 text-adrena-gold" />
            <span>{t.googleMapsBtn}</span>
          </a>
        </div>

        {viewerContent}
      </div>
    </section>
  );
}
