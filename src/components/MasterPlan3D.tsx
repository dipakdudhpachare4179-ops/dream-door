import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Sunset,
  Moon,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Phone,
  MessageCircle,
  Calendar,
  Layers,
  X,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Box
} from 'lucide-react';
import { MasterPlanPlot, Property } from '../types/property';
import { MASTER_PLAN_INFO, MASTER_PLAN_PLOTS, CAR_TRACKS } from '../data/masterPlanData';

interface MasterPlan3DProps {
  isOpen: boolean;
  initialSelectedPlotId?: string;
  onClose: () => void;
  onViewProperty: (property: Property) => void;
  propertiesList: Property[];
}

type TimeOfDay = 'day' | 'afternoon' | 'night';

export default function MasterPlan3D({
  isOpen,
  initialSelectedPlotId = 'plot-44',
  onClose,
  onViewProperty,
  propertiesList
}: MasterPlan3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active plot states
  const [hoveredPlot, setHoveredPlot] = useState<MasterPlanPlot | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<MasterPlanPlot>(
    () => MASTER_PLAN_PLOTS.find((p) => p.id === initialSelectedPlotId) || MASTER_PLAN_PLOTS[3]
  );

  // Modals
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [crmModalOpen, setCrmModalOpen] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '11:00 AM'
  });

  // Car animation state (progress 0-1 for each car)
  const [carProgress, setCarProgress] = useState<{ [id: string]: number }>(() => {
    const initial: { [id: string]: number } = {};
    CAR_TRACKS.forEach((c) => {
      initial[c.id] = c.initialProgress;
    });
    return initial;
  });

  // RequestAnimationFrame loop for silky 60fps car movement
  useEffect(() => {
    if (!isOpen) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      setCarProgress((prev) => {
        const next = { ...prev };
        CAR_TRACKS.forEach((track) => {
          const step = track.speed * (delta / 16.66);
          next[track.id] = (next[track.id] + step) % 1;
        });
        return next;
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isOpen]);

  // When initialSelectedPlotId changes
  useEffect(() => {
    if (initialSelectedPlotId) {
      const target = MASTER_PLAN_PLOTS.find((p) => p.id === initialSelectedPlotId);
      if (target) setSelectedPlot(target);
    }
  }, [initialSelectedPlotId]);

  // Zoom controls
  const handleZoomIn = () => setZoomLevel((z) => Math.min(2.2, z + 0.25));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.85, z - 0.25));
  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Interpolate car position and angle from waypoints
  const getCarState = useCallback((track: (typeof CAR_TRACKS)[0], p: number) => {
    const pts = track.waypoints;
    const totalSegments = pts.length - 1;
    const scaledP = p * totalSegments;
    const segIdx = Math.min(totalSegments - 1, Math.floor(scaledP));
    const t = scaledP - segIdx;

    const p1 = pts[segIdx];
    const p2 = pts[segIdx + 1];

    const x = p1.x + (p2.x - p1.x) * t;
    const y = p1.y + (p2.y - p1.y) * t;
    const angle = p1.angle + (p2.angle - p1.angle) * t;

    return { x, y, angle };
  }, []);

  // Connected Property lookup
  const activePlot = hoveredPlot || selectedPlot;
  const connectedProperty =
    propertiesList.find((p) => p.id === activePlot.propertyId) || propertiesList[0];

  const handleViewPropertyClick = () => {
    onClose();
    // Pass connected property and attach plot info
    const fullProp: Property = {
      ...connectedProperty,
      title: `${connectedProperty.title} (${activePlot.plotNumber})`,
      plotNumber: activePlot.plotNumber,
      facing: activePlot.facing,
      dimensions: activePlot.dimensions,
      areaSqYd: activePlot.areaSqYd,
      areaSqMtr: activePlot.areaSqMtr,
      plcCharge: activePlot.plcCharge,
      image: activePlot.image || connectedProperty.image || connectedProperty.images[0]
    };
    onViewProperty(fullProp);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleSuccess(true);
    setTimeout(() => {
      setScheduleSuccess(false);
      setScheduleModalOpen(false);
    }, 2400);
  };

  const handleWhatsAppClick = () => {
    const msg = encodeURIComponent(
      `Hi, I am interested in ${selectedPlot.plotNumber} at ${MASTER_PLAN_INFO.projectTitle}. I would like to know more details and schedule a visit.`
    );
    window.open(`https://wa.me/${MASTER_PLAN_INFO.contact.whatsappNumber}?text=${msg}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 bg-[#16120F] text-[#FAF8F5] overflow-hidden select-none"
      >
        {/* ================= FIXED 3D MASTER PLAN VIEWPORT ================= */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className={`relative w-full h-full overflow-hidden flex items-center justify-center ${
            zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
          }`}
        >
          {/* Main Visual Container - Transformable for user zoom/pan only (no auto-movement!) */}
          <div
            className="relative w-full h-full max-w-[1920px] max-h-[1080px] transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `scale(${zoomLevel}) translate3d(${panOffset.x}px, ${panOffset.y}px, 0)`
            }}
          >
            {/* The Master Plan Architectural Visualization Base */}
            <div className="absolute inset-0 z-0">
              <svg
                viewBox="0 0 1600 900"
                className="w-full h-full object-cover"
                style={{
                  filter:
                    timeOfDay === 'day'
                      ? 'brightness(1.02) contrast(1.04)'
                      : timeOfDay === 'afternoon'
                      ? 'brightness(0.98) sepia(0.24) saturate(1.22) hue-rotate(-8deg)'
                      : 'brightness(0.55) contrast(1.18) saturate(1.15) hue-rotate(180deg)'
                }}
              >
                <defs>
                  {/* Terrain and grass patterns */}
                  <linearGradient id="grassGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7E9F4A" />
                    <stop offset="50%" stopColor="#8BAF55" />
                    <stop offset="100%" stopColor="#6C8D3C" />
                  </linearGradient>

                  <linearGradient id="roadAsphalt" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#55585D" />
                    <stop offset="50%" stopColor="#61656B" />
                    <stop offset="100%" stopColor="#4E5156" />
                  </linearGradient>

                  <linearGradient id="villaRoof" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ECE7DC" />
                    <stop offset="100%" stopColor="#D5CBB9" />
                  </linearGradient>

                  <linearGradient id="villaGreenRoof" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#4F7932" />
                    <stop offset="100%" stopColor="#3B5D23" />
                  </linearGradient>

                  <linearGradient id="solarPanel" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#253549" />
                    <stop offset="100%" stopColor="#1B2838" />
                  </linearGradient>

                  {/* Shadows */}
                  <filter id="buildingShadow" x="-10%" y="-10%" width="140%" height="140%">
                    <feDropShadow dx="-8" dy="12" stdDeviation="6" floodColor="#1B1612" floodOpacity="0.35" />
                  </filter>
                  <filter id="plotGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#E07830" floodOpacity="0.85" />
                  </filter>
                </defs>

                {/* Background Terrain: Lush manicured grounds */}
                <rect width="1600" height="900" fill="url(#grassGrad)" />

                {/* Perimeter Tree Clusters along upper and lateral boundaries */}
                <g opacity="0.88">
                  {/* Trees around the perimeter */}
                  {[
                    [120, 100, 36], [220, 90, 42], [350, 110, 48], [480, 85, 40],
                    [620, 95, 45], [750, 90, 50], [920, 105, 44], [1050, 115, 38],
                    [1180, 130, 42], [1320, 140, 45], [1450, 160, 46], [40, 240, 40],
                    [70, 340, 46], [90, 460, 44], [140, 560, 42], [650, 180, 52]
                  ].map(([tx, ty, tr], i) => (
                    <g key={i}>
                      <ellipse cx={tx - 6} cy={ty + 10} rx={tr * 0.9} ry={tr * 0.5} fill="#263816" opacity="0.32" />
                      <circle cx={tx} cy={ty} r={tr} fill={i % 2 === 0 ? '#486C27' : '#578230'} />
                      <circle cx={tx - 4} cy={ty - 6} r={tr * 0.65} fill={i % 2 === 0 ? '#639237' : '#71A33F'} opacity="0.8" />
                    </g>
                  ))}
                </g>

                {/* ================= ROADS NETWORK ================= */}
                {/* 1. FRONT: 45M WIDE SECTOR ROAD (Bottom Horizontal) */}
                <g>
                  {/* Road Base */}
                  <polygon
                    points="0,730 1600,600 1600,860 0,990"
                    fill="url(#roadAsphalt)"
                    stroke="#D2CBBA"
                    strokeWidth="3"
                  />
                  {/* Curbs and sidewalk */}
                  <polygon points="0,724 1600,594 1600,600 0,730" fill="#CEC7B7" />
                  <polygon points="0,860 1600,730 1600,738 0,868" fill="#B8B1A0" />

                  {/* Center median with green strip and street palms */}
                  <polygon points="0,795 1600,665 1600,695 0,825" fill="#6A8E38" stroke="#ECE7DA" strokeWidth="2" />
                  {[120, 300, 480, 660, 840, 1020, 1200, 1380].map((mx, idx) => (
                    <g key={idx} transform={`translate(${mx}, ${795 - mx * 0.081})`}>
                      <ellipse cx="-2" cy="8" rx="14" ry="7" fill="#1A280F" opacity="0.4" />
                      <circle cx="0" cy="0" r="13" fill="#D34B36" />
                      <circle cx="2" cy="-2" r="9" fill="#E86E58" />
                    </g>
                  ))}

                  {/* Road Dashed Centerlines */}
                  <line
                    x1="0"
                    y1="760"
                    x2="1600"
                    y2="630"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeDasharray="28,24"
                    opacity="0.85"
                  />
                  <line
                    x1="0"
                    y1="835"
                    x2="1600"
                    y2="705"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeDasharray="28,24"
                    opacity="0.85"
                  />

                  {/* Painted Road Text Markings on Sector Road */}
                  <text
                    x="620"
                    y="768"
                    transform="rotate(-4.6, 620, 768)"
                    fill="#FFFFFF"
                    opacity="0.8"
                    fontSize="22"
                    fontWeight="700"
                    letterSpacing="6"
                    fontFamily="sans-serif"
                  >
                    45M WIDE SECTOR ROAD
                  </text>
                </g>

                {/* 2. FRONT SERVICE ROAD 12M WIDE */}
                <g>
                  <polygon points="0,670 1200,572 1200,622 0,720" fill="#585B60" stroke="#CEC8B8" strokeWidth="2" />
                  <text
                    x="120"
                    y="695"
                    transform="rotate(-4.6, 120, 695)"
                    fill="#FFFFFF"
                    opacity="0.75"
                    fontSize="13"
                    fontWeight="600"
                    letterSpacing="3"
                    fontFamily="sans-serif"
                  >
                    SERVICE ROAD 12M WIDE
                  </text>
                  <text
                    x="1020"
                    y="622"
                    transform="rotate(-4.6, 1020, 622)"
                    fill="#FFFFFF"
                    opacity="0.75"
                    fontSize="13"
                    fontWeight="600"
                    letterSpacing="3"
                    fontFamily="sans-serif"
                  >
                    SERVICE ROAD 12M WIDE
                  </text>
                </g>

                {/* 3. DIAGONAL 12M SERVICE ROAD ON RIGHT */}
                <g>
                  <polygon
                    points="1140,578 1520,180 1600,240 1220,640"
                    fill="url(#roadAsphalt)"
                    stroke="#CEC8B8"
                    strokeWidth="2"
                  />
                  {/* Dashed line */}
                  <line
                    x1="1180"
                    y1="610"
                    x2="1560"
                    y2="210"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeDasharray="24,20"
                    opacity="0.8"
                  />
                  {/* Diagonal text */}
                  <text
                    x="1260"
                    y="500"
                    transform="rotate(-46, 1260, 500)"
                    fill="#FFFFFF"
                    opacity="0.78"
                    fontSize="17"
                    fontWeight="700"
                    letterSpacing="5"
                    fontFamily="sans-serif"
                  >
                    SERVICE 12M WIDE
                  </text>
                  <text
                    x="1380"
                    y="380"
                    transform="rotate(-46, 1380, 380)"
                    fill="#FFFFFF"
                    opacity="0.82"
                    fontSize="21"
                    fontWeight="700"
                    letterSpacing="6"
                    fontFamily="sans-serif"
                  >
                    45M WIDE SECTOR ROAD
                  </text>
                </g>

                {/* 4. INTERNAL ENCLAVE AVENUES: 9M WIDE ROAD */}
                <g>
                  {/* Internal road between Row 3 and Row 4 */}
                  <polygon
                    points="540,380 1140,240 1160,265 560,405"
                    fill="#4E5256"
                    stroke="#DDD8CB"
                    strokeWidth="1.5"
                  />
                  <text
                    x="790"
                    y="330"
                    transform="rotate(-13, 790, 330)"
                    fill="#FFFFFF"
                    opacity="0.8"
                    fontSize="15"
                    fontWeight="700"
                    letterSpacing="3"
                    fontFamily="sans-serif"
                  >
                    9M WIDE ROAD
                  </text>

                  {/* Internal road between Row 2 and Row 3 */}
                  <polygon
                    points="420,490 1020,350 1040,375 440,515"
                    fill="#4E5256"
                    stroke="#DDD8CB"
                    strokeWidth="1.5"
                  />
                  <text
                    x="680"
                    y="440"
                    transform="rotate(-13, 680, 440)"
                    fill="#FFFFFF"
                    opacity="0.8"
                    fontSize="15"
                    fontWeight="700"
                    letterSpacing="3"
                    fontFamily="sans-serif"
                  >
                    9M WIDE ROAD
                  </text>

                  {/* Central connector road from Entrance Gate */}
                  <polygon points="720,620 760,617 730,480 690,483" fill="#4E5256" />
                </g>

                {/* ================= CLUBHOUSE & AMENITIES PLAZA (LEFT) ================= */}
                <g filter="url(#buildingShadow)">
                  {/* Amenity Paved Promenade */}
                  <polygon
                    points="220,590 510,565 470,410 180,430"
                    fill="#DCD6C8"
                    stroke="#C4BAA6"
                    strokeWidth="2"
                  />
                  {/* Circular Plaza with Concentric Patterns */}
                  <ellipse cx="320" cy="510" rx="65" ry="32" fill="#E8E2D5" stroke="#331E14" strokeWidth="2.5" />
                  <ellipse cx="320" cy="510" rx="42" ry="21" fill="#7FA9BA" stroke="#FFFFFF" strokeWidth="2" />
                  <ellipse cx="320" cy="510" rx="18" ry="9" fill="#1C3F54" />

                  {/* Clubhouse Pavilion Building Structure */}
                  <polygon points="210,480 460,460 450,410 200,430" fill="#FAF7F2" stroke="#4A2C1D" strokeWidth="2" />
                  {/* Glass curtain facade roof */}
                  <polygon points="200,430 450,410 470,390 220,410" fill="#B3D3E0" stroke="#7E9FAD" strokeWidth="1.5" />
                  {/* Entrance canopy */}
                  <polygon points="280,485 360,480 355,470 275,475" fill="#C4A47C" />
                </g>

                {/* ================= CENTRAL LANDSCAPED PARK WITH RED TREE ================= */}
                <g>
                  {/* Circular Island Walkway */}
                  <ellipse cx="1100" cy="460" rx="60" ry="32" fill="#759D40" stroke="#EFEBE0" strokeWidth="3" />
                  <ellipse cx="1100" cy="460" rx="42" ry="22" fill="#587A2D" />
                  {/* Central Red Flame / Blossom Tree as shown in reference! */}
                  <ellipse cx="1095" cy="465" rx="36" ry="18" fill="#18230D" opacity="0.45" />
                  <ellipse cx="1100" cy="450" rx="32" ry="26" fill="#C83626" />
                  <ellipse cx="1092" cy="442" rx="24" ry="20" fill="#E4523E" />
                  <ellipse cx="1105" cy="446" rx="20" ry="16" fill="#F17B6A" opacity="0.9" />
                </g>

                {/* ================= GATEWAY & SECURITY ENTRANCE ================= */}
                <g filter="url(#buildingShadow)">
                  <polygon points="720,630 770,626 770,580 720,584" fill="#EFEBE0" stroke="#331E14" strokeWidth="2" />
                  <polygon points="785,625 835,621 835,575 785,579" fill="#EFEBE0" stroke="#331E14" strokeWidth="2" />
                  {/* Overhead gateway beam */}
                  <polygon points="710,585 845,575 845,565 710,575" fill="#331E14" />
                  <text
                    x="755"
                    y="577"
                    fill="#C4A47C"
                    fontSize="10"
                    fontWeight="bold"
                    letterSpacing="3"
                    fontFamily="sans-serif"
                  >
                    OSIYAN
                  </text>
                  {/* Barrier Arms */}
                  <line x1="770" y1="602" x2="785" y2="601" stroke="#D32F2F" strokeWidth="3" />
                </g>

                {/* ================= 4 ROWS OF LUXURY VILLAS / PLOTS ================= */}
                {MASTER_PLAN_PLOTS.map((plot) => {
                  const isHovered = hoveredPlot?.id === plot.id;
                  const isSelected = selectedPlot?.id === plot.id;
                  const isHighlighted = isHovered || isSelected;

                  // Compute absolute pixel coordinates from percentages
                  const px = (plot.x / 100) * 1600;
                  const py = (plot.y / 100) * 900;
                  const pw = (plot.width / 100) * 1600;
                  const ph = (plot.height / 100) * 900;

                  return (
                    <g
                      key={plot.id}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredPlot(plot)}
                      onMouseLeave={() => setHoveredPlot(null)}
                      onClick={() => setSelectedPlot(plot)}
                    >
                      {/* Drop shadow */}
                      <polygon
                        points={`${px - 6},${py + ph + 8} ${px + pw - 6},${py + ph + 8} ${px + pw + 4},${py + ph} ${px + 4},${py + ph}`}
                        fill="#1C150F"
                        opacity="0.38"
                      />

                      {/* Isometric Villa Ground Footprint / Base */}
                      <polygon
                        points={`${px},${py + ph} ${px + pw},${py + ph - 8} ${px + pw},${py + 8} ${px},${py + 16}`}
                        fill={isHighlighted ? '#F08A38' : '#FAF6ED'}
                        stroke={isHighlighted ? '#E07830' : '#C8BFAD'}
                        strokeWidth={isHighlighted ? '3' : '1.5'}
                        filter={isHighlighted ? 'url(#plotGlow)' : 'url(#buildingShadow)'}
                        className="transition-colors duration-200"
                      />

                      {/* 3D Villa Front Facade Wall */}
                      <polygon
                        points={`${px},${py + ph} ${px + pw},${py + ph - 8} ${px + pw},${py + ph - 24} ${px},${py + ph - 16}`}
                        fill={isHighlighted ? '#D86E24' : '#E8DFCE'}
                        stroke={isHighlighted ? '#C25A14' : '#B8AC98'}
                        strokeWidth="1"
                      />

                      {/* 3D Villa Rooftop Terrace (Green garden + Solar panels) */}
                      <polygon
                        points={`${px},${py + 16} ${px + pw},${py + 8} ${px + pw},${py + ph - 24} ${px},${py + ph - 16}`}
                        fill={isHighlighted ? 'url(#villaRoof)' : '#EFEAE0'}
                      />

                      {/* Green rooftop garden patch */}
                      <polygon
                        points={`${px + 4},${py + 22} ${px + pw - 4},${py + 15} ${px + pw - 4},${py + ph - 38} ${px + 4},${py + ph - 30}`}
                        fill={isHighlighted ? '#5F923B' : 'url(#villaGreenRoof)'}
                      />

                      {/* Mini Solar panel array on roof */}
                      <polygon
                        points={`${px + 6},${py + 26} ${px + pw - 6},${py + 20} ${px + pw - 6},${py + 32} ${px + 6},${py + 38}`}
                        fill="url(#solarPanel)"
                        stroke="#7E9EB8"
                        strokeWidth="0.8"
                      />

                      {/* Luminous Highlight Pulse when Selected/Hovered (Exact match to PLOT-44 reference) */}
                      {isHighlighted && (
                        <polygon
                          points={`${px - 2},${py + ph + 2} ${px + pw + 2},${py + ph - 10} ${px + pw + 2},${py + 6} ${px - 2},${py + 14}`}
                          fill="rgba(224, 120, 48, 0.45)"
                          stroke="#FFA94D"
                          strokeWidth="2.5"
                          className="animate-pulse"
                        />
                      )}

                      {/* Plot label badge */}
                      <text
                        x={px + pw / 2}
                        y={py + ph - 6}
                        fill={isHighlighted ? '#FFFFFF' : '#331E14'}
                        fontSize="9.5"
                        fontWeight="700"
                        letterSpacing="0.5"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                      >
                        {plot.plotNumber}
                      </text>
                    </g>
                  );
                })}

                {/* ================= ANIMATED MOVING CARS ================= */}
                {CAR_TRACKS.map((track) => {
                  const progress = carProgress[track.id] || 0;
                  const { x: pctX, y: pctY, angle } = getCarState(track, progress);

                  const cx = (pctX / 100) * 1600;
                  const cy = (pctY / 100) * 900;

                  const isRed = track.color === 'red';
                  const carBodyColor = isRed ? '#D32F2F' : track.color === 'white' ? '#FFFFFF' : '#8A8F98';
                  const carRoofColor = isRed ? '#9A1C1C' : track.color === 'white' ? '#ECECEC' : '#6B717B';

                  return (
                    <g key={track.id} transform={`translate(${cx}, ${cy}) rotate(${angle})`}>
                      {/* Car ground shadow */}
                      <ellipse cx="-1" cy="2" rx="15" ry="7" fill="#000000" opacity="0.45" />

                      {/* Car Body (Length ~26px, Width ~12px) */}
                      <rect
                        x="-13"
                        y="-6"
                        width="26"
                        height="12"
                        rx="3.5"
                        fill={carBodyColor}
                        stroke="#1C1814"
                        strokeWidth="0.8"
                      />

                      {/* Roof / Windshield Cabin */}
                      <rect
                        x="-8"
                        y="-4.5"
                        width="15"
                        height="9"
                        rx="2"
                        fill={carRoofColor}
                      />
                      {/* Front Windshield */}
                      <polygon points="5,-4 7,-4 7,4 5,4" fill="#24374A" opacity="0.8" />
                      {/* Rear Windshield */}
                      <polygon points="-6,-3.5 -8,-3.5 -8,3.5 -6,3.5" fill="#24374A" opacity="0.8" />

                      {/* Headlights: In Night mode they project bright luminous beams forward! */}
                      {timeOfDay === 'night' ? (
                        <g>
                          {/* Left beam */}
                          <polygon
                            points="13,-4 55,-16 55,-2 13,-2"
                            fill="url(#headlightBeam)"
                            opacity="0.65"
                          />
                          {/* Right beam */}
                          <polygon
                            points="13,2 55,2 55,16 13,4"
                            fill="url(#headlightBeam)"
                            opacity="0.65"
                          />
                          {/* Headlight bulb glows */}
                          <circle cx="12" cy="-3.5" r="2.5" fill="#FFF9C4" />
                          <circle cx="12" cy="3.5" r="2.5" fill="#FFF9C4" />
                        </g>
                      ) : (
                        <g>
                          <circle cx="12" cy="-3.5" r="1.5" fill="#FFE082" />
                          <circle cx="12" cy="3.5" r="1.5" fill="#FFE082" />
                        </g>
                      )}

                      {/* Red taillights */}
                      <rect x="-13" y="-4.5" width="1.5" height="2" fill="#FF1744" />
                      <rect x="-13" y="2.5" width="1.5" height="2" fill="#FF1744" />
                    </g>
                  );
                })}

                {/* Night Mode Street Lamp Glows */}
                {timeOfDay === 'night' && (
                  <g>
                    <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFE082" stopOpacity="0.75" />
                      <stop offset="40%" stopColor="#FFB300" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#FFB300" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="headlightBeam" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#FFF9C4" stopOpacity="0" />
                    </linearGradient>

                    {/* Street lamps along front 45M sector road */}
                    {[140, 360, 580, 800, 1020, 1240, 1460].map((lx, i) => (
                      <circle
                        key={i}
                        cx={lx}
                        cy={735 - lx * 0.081}
                        r="60"
                        fill="url(#lampGlow)"
                      />
                    ))}

                    {/* Lamps along internal avenues */}
                    {[580, 780, 980].map((lx, i) => (
                      <circle
                        key={`internal-${i}`}
                        cx={lx}
                        cy={440 - (lx - 580) * 0.23}
                        r="50"
                        fill="url(#lampGlow)"
                      />
                    ))}
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* ================= TOP-LEFT FLOATING PROJECT & PLOT CARD ================= */}
        <div className="absolute top-6 left-6 z-30 w-72 sm:w-80 bg-[#FAF8F5]/95 backdrop-blur-md p-6 border border-[#331E14]/15 shadow-[0_16px_40px_rgba(30,17,11,0.25)] text-[#24150E]">
          {/* Project Title Header */}
          <div className="border-b border-[#331E14]/10 pb-4 mb-4">
            <h2 className="font-serif-luxury text-2xl font-semibold text-[#24150E] tracking-tight">
              {MASTER_PLAN_INFO.projectTitle}
            </h2>
            <div className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8A6D56]">
              {MASTER_PLAN_INFO.subtitle}
            </div>
          </div>

          {/* Plot Information Block */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8A6D56]">
                {hoveredPlot ? 'Hovering Over' : 'Selected Plot'}
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 bg-[#FAF1E6] text-[#A25022] border border-[#E07830]/40 rounded-xs">
                {activePlot.facing}
              </span>
            </div>

            {/* Plot Identifier */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E07830] animate-pulse" />
              <h3 className="font-serif-luxury text-2xl font-medium text-[#24150E]">
                {activePlot.plotNumber}
              </h3>
            </div>

            {/* Metrics Grid (Matching reference screenshot exactly) */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-[#331E14]/10 text-xs">
              <div>
                <span className="text-[9.5px] uppercase tracking-wider text-[#8A6D56] font-medium block">
                  Area
                </span>
                <span className="font-mono font-semibold text-[#24150E]">
                  {activePlot.areaSqYd}
                </span>
              </div>

              <div>
                <span className="text-[9.5px] uppercase tracking-wider text-[#8A6D56] font-medium block">
                  Dimensions
                </span>
                <span className="font-mono font-semibold text-[#24150E]">
                  {activePlot.dimensions}
                </span>
              </div>

              <div>
                <span className="text-[9.5px] uppercase tracking-wider text-[#8A6D56] font-medium block">
                  Area (MT)
                </span>
                <span className="font-mono font-semibold text-[#24150E]">
                  {activePlot.areaSqMtr}
                </span>
              </div>

              <div>
                <span className="text-[9.5px] uppercase tracking-wider text-[#8A6D56] font-medium block">
                  PLC Charge
                </span>
                <span className="font-mono font-semibold text-[#A25022]">
                  {activePlot.plcCharge}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 pt-4 border-t border-[#331E14]/10 flex flex-col gap-2">
              <button
                onClick={handleViewPropertyClick}
                className="w-full py-2.5 bg-[#331E14] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#24150E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>View Property</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setScheduleModalOpen(true)}
                className="w-full py-2 border border-[#331E14] text-[#331E14] text-xs uppercase tracking-widest font-semibold hover:bg-[#331E14]/5 transition-colors cursor-pointer"
              >
                Schedule Visit
              </button>
            </div>
          </div>
        </div>

        {/* ================= TOP-RIGHT TIME OF DAY SEGMENTED CONTROL ================= */}
        <div className="absolute top-6 right-20 z-30">
          <div className="flex items-center gap-1 p-1 bg-[#FAF8F5]/95 backdrop-blur-md rounded-full border border-[#331E14]/15 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            <button
              onClick={() => handleReset()}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-[#24150E] hover:bg-[#331E14]/10 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Box className="w-3.5 h-3.5 text-[#8A6D56]" />
              <span>3D View</span>
            </button>

            <button
              onClick={() => setTimeOfDay('day')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                timeOfDay === 'day'
                  ? 'bg-[#331E14] text-[#FAF8F5] shadow-xs'
                  : 'text-[#4A2C1D] hover:bg-[#331E14]/10'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Day</span>
            </button>

            <button
              onClick={() => setTimeOfDay('afternoon')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                timeOfDay === 'afternoon'
                  ? 'bg-[#331E14] text-[#FAF8F5] shadow-xs'
                  : 'text-[#4A2C1D] hover:bg-[#331E14]/10'
              }`}
            >
              <Sunset className="w-3.5 h-3.5" />
              <span>Afternoon</span>
            </button>

            <button
              onClick={() => setTimeOfDay('night')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                timeOfDay === 'night'
                  ? 'bg-[#331E14] text-[#FAF8F5] shadow-xs'
                  : 'text-[#4A2C1D] hover:bg-[#331E14]/10'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Night</span>
            </button>
          </div>
        </div>

        {/* Exit / Close 3D View Button (Top Right Corner) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-40 w-10 h-10 rounded-full bg-[#FAF8F5]/95 text-[#24150E] hover:bg-[#331E14] hover:text-[#FAF8F5] transition-all flex items-center justify-center shadow-lg border border-[#331E14]/15 cursor-pointer"
          title="Return to website"
          aria-label="Close 3D View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================= RIGHT-SIDE VERTICAL ACTIONS STACK ================= */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          <button
            onClick={toggleFullscreen}
            className="w-11 h-11 rounded-full bg-[#FAF8F5]/95 text-[#24150E] hover:bg-[#331E14] hover:text-[#FAF8F5] transition-colors flex items-center justify-center shadow-md border border-[#331E14]/15 cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleZoomIn}
            className="w-11 h-11 rounded-full bg-[#FAF8F5]/95 text-[#24150E] hover:bg-[#331E14] hover:text-[#FAF8F5] transition-colors flex items-center justify-center shadow-md border border-[#331E14]/15 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={handleZoomOut}
            className="w-11 h-11 rounded-full bg-[#FAF8F5]/95 text-[#24150E] hover:bg-[#331E14] hover:text-[#FAF8F5] transition-colors flex items-center justify-center shadow-md border border-[#331E14]/15 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="w-11 h-11 rounded-full bg-[#FAF8F5]/95 text-[#24150E] hover:bg-[#331E14] hover:text-[#FAF8F5] transition-colors flex items-center justify-center shadow-md border border-[#331E14]/15 cursor-pointer"
            title="Reset View Position"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* ================= BOTTOM-LEFT CALL & WHATSAPP BUTTONS ================= */}
        <div className="absolute bottom-8 left-8 z-30 flex flex-col gap-3">
          <a
            href={`tel:${MASTER_PLAN_INFO.contact.phone}`}
            className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#24150E] hover:bg-[#331E14] hover:text-[#FAF8F5] transition-all flex items-center justify-center shadow-lg border border-[#331E14]/15 cursor-pointer"
            title={`Call Direct: ${MASTER_PLAN_INFO.contact.phone}`}
          >
            <Phone className="w-5 h-5 text-[#8A6D56]" />
          </a>

          <button
            onClick={handleWhatsAppClick}
            className="w-12 h-12 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-all flex items-center justify-center shadow-lg cursor-pointer"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
          </button>
        </div>

        {/* ================= BOTTOM-RIGHT SCHEDULE VISIT & CRM BUTTONS ================= */}
        <div className="absolute bottom-8 right-8 z-30 flex flex-col items-center gap-3">
          {/* Circular Brown Schedule Visit Button (matching reference) */}
          <button
            onClick={() => setScheduleModalOpen(true)}
            className="w-16 h-16 rounded-full bg-[#A25022] hover:bg-[#883F16] text-white flex flex-col items-center justify-center shadow-xl transition-transform hover:scale-105 cursor-pointer p-1 text-center border-2 border-white/20"
            title="Schedule a Visit"
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span className="text-[8.5px] uppercase font-bold leading-tight tracking-wider">
              Schedule<br />Visit
            </span>
          </button>

          {/* Circular Navy/Dark CRM Button (matching reference) */}
          <button
            onClick={() => setCrmModalOpen(true)}
            className="w-14 h-14 rounded-full bg-[#243346] hover:bg-[#1A2635] text-white flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer p-1 text-center border border-white/10"
            title="CRM Lead Portal"
          >
            <Layers className="w-4 h-4 mb-0.5" />
            <span className="text-[9px] uppercase font-semibold tracking-wider">
              CRM
            </span>
          </button>
        </div>

        {/* ================= SCHEDULE VISIT MODAL ================= */}
        <AnimatePresence>
          {scheduleModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#FAF8F5] text-[#24150E] p-7 border border-[#331E14]/15 shadow-2xl relative"
              >
                <button
                  onClick={() => setScheduleModalOpen(false)}
                  className="absolute top-5 right-5 p-1 text-[#8A6D56] hover:text-[#24150E] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#A25022]" />
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#8A6D56]">
                    Private Tour Booking
                  </span>
                </div>

                <h3 className="font-serif-luxury text-2xl font-medium text-[#24150E] mb-1">
                  Schedule A Visit
                </h3>
                <p className="text-xs text-[#5A3825] font-light mb-5">
                  Selected: <strong>{selectedPlot.plotNumber}</strong> ({selectedPlot.title})
                </p>

                {scheduleSuccess ? (
                  <div className="py-8 text-center">
                    <CheckCircle2 className="w-10 h-10 text-[#A25022] mx-auto mb-2" />
                    <h4 className="font-serif-luxury text-xl text-[#24150E]">
                      Appointment Requested
                    </h4>
                    <p className="text-xs text-[#5A3825] font-light mt-1">
                      Our relationship director will call to finalize your itinerary.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleScheduleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={scheduleForm.name}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={scheduleForm.phone}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={scheduleForm.email}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, email: e.target.value })}
                          placeholder="client@mail.com"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          value={scheduleForm.date}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#8A6D56] font-medium mb-1">
                          Preferred Time
                        </label>
                        <select
                          value={scheduleForm.time}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#331E14]/15 text-xs text-[#24150E] focus:outline-none focus:border-[#331E14]"
                        >
                          <option>10:00 AM</option>
                          <option>11:30 AM</option>
                          <option>02:00 PM</option>
                          <option>04:30 PM</option>
                          <option>06:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#A25022] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#883F16] transition-colors mt-2 cursor-pointer shadow-sm"
                    >
                      Confirm Schedule Visit
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================= CRM LEAD PORTAL MODAL ================= */}
        <AnimatePresence>
          {crmModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm bg-[#FAF8F5] text-[#24150E] p-6 border border-[#331E14]/15 shadow-2xl relative"
              >
                <button
                  onClick={() => setCrmModalOpen(false)}
                  className="absolute top-4 right-4 p-1 text-[#8A6D56] hover:text-[#24150E] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-[#243346]" />
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#8A6D56]">
                    CRM Portal
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl font-medium text-[#24150E] mb-2">
                  Inquiry Registered
                </h3>
                <p className="text-xs text-[#5A3825] font-light mb-4">
                  Viewing data for <strong>{selectedPlot.plotNumber}</strong> has been logged to your CRM session.
                </p>

                <div className="p-3 bg-white border border-[#331E14]/10 text-[11px] font-mono space-y-1 mb-4 text-[#5A3825]">
                  <div>REF_PLOT: {selectedPlot.plotNumber}</div>
                  <div>FACING: {selectedPlot.facing}</div>
                  <div>EST_VALUE: {selectedPlot.price}</div>
                  <div>STATUS: {selectedPlot.status}</div>
                </div>

                <button
                  onClick={() => setCrmModalOpen(false)}
                  className="w-full py-2.5 bg-[#243346] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#1A2635] transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
