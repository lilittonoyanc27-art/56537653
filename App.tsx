import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  HelpCircle, 
  Languages, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Trophy, 
  Eye, 
  Award,
  KeyRound,
  BookOpen
} from 'lucide-react';
import { QUESTIONS, SECRET_WORD, SECRET_WORD_HINT, WHEEL_SECTORS } from './questions';
import { WheelSector, QuizQuestion } from './types';
import { sounds } from './audio';

export default function App() {
  // Game state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(1000);
  const [activeSector, setActiveSector] = useState<WheelSector>(WHEEL_SECTORS[0]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Secret word state
  const [revealedLetters, setRevealedLetters] = useState<boolean[]>(
    () => new Array(SECRET_WORD.length).fill(false)
  );
  const [isWordGuessed, setIsWordGuessed] = useState<boolean>(false);
  const [showWordModal, setShowWordModal] = useState<boolean>(false);
  const [wordGuessInput, setWordGuessInput] = useState<string>('');
  const [wordGuessFeedback, setWordGuessFeedback] = useState<string | null>(null);

  // Letter guess modal (for Sector +, quiz reward, or manual guess)
  const [showLetterModal, setShowLetterModal] = useState<boolean>(false);
  const [sectorPlusActive, setSectorPlusActive] = useState<boolean>(false);
  const [letterModalReason, setLetterModalReason] = useState<'quiz_reward' | 'sector_plus' | 'manual'>('manual');
  const [letterFeedback, setLetterFeedback] = useState<{ text: string; success: boolean } | null>(null);
  const [pendingLetterPicks, setPendingLetterPicks] = useState<number>(0);

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showQuestionTranslation, setShowQuestionTranslation] = useState<boolean>(false);
  const [revealedOptionTranslations, setRevealedOptionTranslations] = useState<Record<string, boolean>>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, boolean>>({});

  // Canvas confetti ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastSoundTickAngle = useRef<number>(0);

  const currentQuestion: QuizQuestion = QUESTIONS[currentQuestionIndex];

  // Sync sound settings
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
  };

  // Canvas Confetti generator
  const launchConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      vRot: number;
      alpha: number;
    }> = [];

    const colors = ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24', '#a855f7'];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 3,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        alpha: 1,
      });
    }

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // gravity
        p.rotation += p.vRot;
        p.alpha -= 0.008;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (alive) {
        animationId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Spin Wheel function with tick sounds and authentic deceleration
  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    sounds.playTick();

    // Random turns between 4 and 7 full rotations + random sector target
    const randomSectorIndex = Math.floor(Math.random() * WHEEL_SECTORS.length);
    const sectorAngle = 360 / WHEEL_SECTORS.length;
    // Pointer is at the top (270 degrees in SVG circle or 0 at top)
    // To land on sector index i:
    const targetSector = WHEEL_SECTORS[randomSectorIndex];
    
    // Calculate final rotation
    const fullTurns = 360 * (4 + Math.floor(Math.random() * 3));
    // In our SVG: Sector 0 starts at angle 0 to 30 deg. Top pointer is at 270 deg (top).
    // Angle that lands on top (270 deg) is: (270 - (index * 30 + 15))
    const offset = 270 - (randomSectorIndex * sectorAngle + sectorAngle / 2);
    const newTargetRotation = rotation + fullTurns + ((offset - (rotation % 360) + 360) % 360);

    const startTime = performance.now();
    const duration = 4200; // ms
    const startRotation = rotation;
    lastSoundTickAngle.current = startRotation;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quintic ease-out for realistic heavy mechanical wheel deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentRot = startRotation + (newTargetRotation - startRotation) * easeOut;

      setRotation(currentRot);

      // Play tick sound whenever a sector boundary crosses the pointer
      if (Math.abs(currentRot - lastSoundTickAngle.current) >= sectorAngle) {
        sounds.playTick();
        lastSoundTickAngle.current = currentRot;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setActiveSector(targetSector);

        // Handle special sectors
        if (targetSector.type === 'plus') {
          sounds.playPrize();
          setSectorPlusActive(true);
          setLetterModalReason('sector_plus');
          setLetterFeedback(null);
          setShowLetterModal(true);
        } else if (targetSector.type === 'multiplier') {
          sounds.playPrize();
        } else if (targetSector.type === 'prize') {
          sounds.playPrize();
          setScore((prev) => prev + 1000);
          launchConfetti();
        } else {
          sounds.playCorrect();
        }
      }
    };

    requestAnimationFrame(animate);
  };

  // Open a specific letter in the secret word
  const revealLetter = (letterToReveal: string) => {
    const char = letterToReveal.toUpperCase();
    let count = 0;
    const newRevealed = [...revealedLetters];

    for (let i = 0; i < SECRET_WORD.length; i++) {
      if (SECRET_WORD[i] === char && !newRevealed[i]) {
        newRevealed[i] = true;
        count++;
      }
    }

    if (count > 0) {
      setRevealedLetters(newRevealed);
      sounds.playLetterReveal();
      setScore((prev) => prev + count * 500);
      setPendingLetterPicks((prev) => Math.max(0, prev - 1));

      // Check if all letters are now revealed
      const isComplete = newRevealed.every((r) => r);
      if (isComplete) {
        setIsWordGuessed(true);
        sounds.playFanfare();
        launchConfetti();
        setLetterFeedback({
          text: `🎉 Есть буква «${char}» (${count} шт.)! Все 9 букв открыты — ПОБЕДА!`,
          success: true,
        });
        setTimeout(() => {
          setShowLetterModal(false);
          setSectorPlusActive(false);
          setLetterFeedback(null);
        }, 2200);
      } else {
        setLetterFeedback({
          text: `🎉 Есть такая буква! Открыто ${count} шт. «${char}» (+${count * 500} очков)`,
          success: true,
        });
        setTimeout(() => {
          setShowLetterModal(false);
          setSectorPlusActive(false);
          setLetterFeedback(null);
        }, 1300);
      }
    } else {
      sounds.playIncorrect();
      setLetterFeedback({
        text: `Буквы «${char}» нет в слове «PROFESORA». Попробуйте другую букву или нажмите на закрытую ячейку [•] выше!`,
        success: false,
      });
    }
  };

  // Open letter by directly selecting a slot position on the board
  const revealSlot = (slotIndex: number) => {
    if (slotIndex < 0 || slotIndex >= SECRET_WORD.length) return;
    if (revealedLetters[slotIndex]) return;

    const char = SECRET_WORD[slotIndex];
    revealLetter(char);
  };

  // Handle answer selection
  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;

    setSelectedOption(optionId);
    setIsAnswered(true);

    const correct = optionId === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setAnsweredQuestions((prev) => ({ ...prev, [currentQuestion.id]: correct }));

    if (correct) {
      sounds.playCorrect();
      // Calculate score based on active sector
      let pointsEarned = 500;
      if (activeSector.type === 'points') {
        pointsEarned = activeSector.value;
      } else if (activeSector.type === 'multiplier') {
        pointsEarned = 500 * activeSector.value;
      } else if (activeSector.type === 'plus') {
        pointsEarned = activeSector.value;
      } else if (activeSector.type === 'prize') {
        pointsEarned = 1000;
      }

      setScore((prev) => prev + pointsEarned);

      // User requested: "сделай так чтобы я я сама выбрала буквы после каждого верного ответа"
      // After each correct answer, give the user the right to choose the letter herself!
      const isComplete = revealedLetters.every((r) => r);
      if (!isComplete && !isWordGuessed) {
        setPendingLetterPicks((prev) => prev + 1);
        setTimeout(() => {
          setLetterFeedback(null);
          setLetterModalReason('quiz_reward');
          setShowLetterModal(true);
        }, 450);
      }
    } else {
      // Non-punitive game: "если ответ неверный пусть всё равно продолжиться игра"
      sounds.playIncorrect();
      // Score is NOT wiped out! Game continues smoothly.
    }
  };

  // Navigate to question
  const goToQuestion = (index: number) => {
    if (index < 0 || index >= QUESTIONS.length) return;
    setCurrentQuestionIndex(index);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    setShowQuestionTranslation(false);
    setRevealedOptionTranslations({});
  };

  // Toggle individual option translation
  const toggleOptionTranslation = (optId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedOptionTranslations((prev) => ({
      ...prev,
      [optId]: !prev[optId],
    }));
  };

  // Submit full word guess
  const handleFullWordGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = wordGuessInput.trim().toUpperCase();

    if (cleanInput === SECRET_WORD) {
      setRevealedLetters(new Array(SECRET_WORD.length).fill(true));
      setIsWordGuessed(true);
      setScore((prev) => prev + 5000);
      sounds.playFanfare();
      launchConfetti();
      setWordGuessFeedback('Браво! Вы угадали главное слово: PROFESORA! (+5000 очков)');
      setTimeout(() => {
        setShowWordModal(false);
        setWordGuessFeedback(null);
        setWordGuessInput('');
      }, 2500);
    } else {
      sounds.playIncorrect();
      setWordGuessFeedback('Пока неверно, но игра продолжается! Попробуйте снова.');
    }
  };

  // Alphabet for letter picking
  const spanishAlphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-start p-3 sm:p-5 md:p-6 select-none relative overflow-x-hidden font-sans">
      {/* Confetti canvas overlay */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      />

      {/* Top Header with Bento Capsules */}
      <header className="w-full max-w-7xl flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 bg-[#38BDF8] rounded-xl flex items-center justify-center font-black text-slate-900 shadow-lg shadow-sky-500/20 text-lg tracking-wider">
            ES
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Поле Чудес <span className="text-sky-400">Gramática</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Испанский язык • Presente de Indicativo (50 заданий)
            </p>
          </div>
        </div>

        {/* Bento Stat Capsules */}
        <div className="flex items-center space-x-3">
          <div className="bento-card !py-2.5 !px-5 flex-row items-center space-x-3 !rounded-2xl">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">PUNTOS:</span>
            <span className="text-xl font-mono font-bold text-amber-400">{score.toLocaleString()}</span>
          </div>

          <div className="bento-card !py-2.5 !px-5 flex-row items-center space-x-3 !rounded-2xl hidden sm:flex">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">NIVEL:</span>
            <span className="text-xl font-mono font-bold text-sky-400">{currentQuestionIndex + 1}/{QUESTIONS.length}</span>
          </div>

          <button
            id="sound-toggle-btn"
            onClick={toggleSound}
            aria-label="Переключить звук"
            className="bento-card !p-3 !rounded-2xl text-sky-400 hover:text-white cursor-pointer transition-colors"
            title={soundEnabled ? 'Выключить звук' : 'Включить звук'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} className="text-slate-500" />}
          </button>
        </div>
      </header>

      {/* Main Bento Grid */}
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Column: Tableau & Wheel (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          
          {/* Main Board: Secret Word (PROFESORA) */}
          <section className="bento-card relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                  El Tablero Principal
                </div>
                <div className="text-xs text-sky-400 font-medium mt-0.5">
                  Главное слово тура (9 букв)
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/60 border border-sky-500/30 px-3 py-1 rounded-full">
                {revealedLetters.filter(Boolean).length} / {SECRET_WORD.length} открыто
              </span>
            </div>

            {/* Alphabet slots */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 my-4">
              {SECRET_WORD.split('').map((letter, idx) => {
                const isRev = revealedLetters[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (!isRev) {
                        revealSlot(idx);
                      }
                    }}
                    disabled={isRev}
                    title={isRev ? `Буква ${letter}` : `Нажмите, чтобы выбрать и открыть эту букву (${idx + 1}-я ячейка)`}
                    className={`alphabet-slot ${
                      isRev
                        ? 'letter-revealed cursor-default'
                        : 'cursor-pointer hover:border-sky-400 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-sky-400/50'
                    }`}
                  >
                    {isRev ? letter : '•'}
                  </button>
                );
              })}
            </div>

            {/* Pending letter picks banner if user answered correctly */}
            {pendingLetterPicks > 0 && !isWordGuessed && (
              <div className="mb-2 py-2 px-3.5 rounded-xl bg-sky-500/15 border border-sky-400/50 text-sky-200 text-xs flex flex-wrap items-center justify-between gap-2 shadow-inner">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping inline-block" />
                  <span className="font-bold">
                    Вам доступен выбор буквы ({pendingLetterPicks})! Нажмите на скрытую ячейку «•» на табло или выберите из алфавита:
                  </span>
                </div>
                <button
                  type="button"
                  id="claim-letter-pick-btn"
                  onClick={() => {
                    setLetterFeedback(null);
                    setLetterModalReason('quiz_reward');
                    setShowLetterModal(true);
                  }}
                  className="px-3 py-1 rounded-lg bg-sky-400 text-slate-900 font-extrabold text-xs hover:bg-sky-300 transition-colors cursor-pointer"
                >
                  Выбрать букву
                </button>
              </div>
            )}

            {/* Word Hint & Actions */}
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-300 flex items-center space-x-1.5 flex-1 min-w-[240px]">
                <Sparkles size={15} className="text-amber-400 shrink-0" />
                <span>{SECRET_WORD_HINT}</span>
              </p>

              <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                <button
                  id="open-letter-btn"
                  onClick={() => {
                    setLetterFeedback(null);
                    setLetterModalReason('manual');
                    setShowLetterModal(true);
                  }}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-400 hover:border-sky-400 transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <KeyRound size={14} />
                  <span>Назвать букву</span>
                </button>

                <button
                  id="open-word-btn"
                  onClick={() => setShowWordModal(true)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center space-x-1.5 active:scale-95"
                >
                  <Award size={14} />
                  <span>Назвать слово</span>
                </button>
              </div>
            </div>

            {/* Victory banner */}
            {isWordGuessed && (
              <div className="mt-4 p-3.5 bg-emerald-950/80 border-2 border-emerald-400 rounded-2xl text-center shadow-lg animate-fade-in">
                <p className="text-sm font-black text-emerald-300">
                  🎉 СЛОВО УГАДАНО: «{SECRET_WORD}»! БРАВО ЗНАТОКУ ИСПАНСКОГО!
                </p>
                <p className="text-xs text-emerald-400/80 mt-0.5">
                  Вы можете продолжать отвечать на все 50 заданий и закреплять грамматику!
                </p>
              </div>
            )}
          </section>

          {/* Wheel of Fortune Bento Card */}
          <section className="bento-card relative overflow-hidden flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Барабан фортуны
                </span>
                <span className="text-[10px] bg-sky-950/80 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Без банкрота
                </span>
              </div>
              <div className="text-xs font-mono font-bold text-slate-300">
                СЕКТОР:{' '}
                <span className="text-amber-400 font-extrabold">
                  {activeSector.label} {activeSector.sublabel || ''}
                </span>
              </div>
            </div>

            {/* Rotating Wheel Container */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-2 flex items-center justify-center">
              {/* Pointer Needle */}
              <div className="absolute -top-3 z-30 flex flex-col items-center filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                <div className="w-5 h-7 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-full border-2 border-slate-900 shadow-md transform -rotate-180" />
                <div className="w-2 h-2 rounded-full bg-rose-500 -mt-1" />
              </div>

              {/* Wheel SVG */}
              <svg
                id="wheel-svg"
                viewBox="0 0 400 400"
                className="w-full h-full rounded-full shadow-2xl"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: 'center center',
                  transition: isSpinning ? 'none' : 'transform 0.1s ease-out',
                }}
              >
                <circle cx="200" cy="200" r="198" fill="#1E293B" stroke="#334155" strokeWidth="4" />
                {WHEEL_SECTORS.map((sec, idx) => {
                  const sectorAngle = 360 / WHEEL_SECTORS.length;
                  const startAngle = idx * sectorAngle;
                  const endAngle = (idx + 1) * sectorAngle;
                  const r = 190;
                  const cx = 200;
                  const cy = 200;
                  const x1 = cx + r * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = cy + r * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = cx + r * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = cy + r * Math.sin((Math.PI * endAngle) / 180);
                  const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
                  const textAngle = startAngle + sectorAngle / 2;
                  const textRad = 135;
                  const tx = cx + textRad * Math.cos((Math.PI * textAngle) / 180);
                  const ty = cy + textRad * Math.sin((Math.PI * textAngle) / 180);

                  return (
                    <g key={sec.id}>
                      <path d={pathData} fill={sec.color} stroke="#0F172A" strokeWidth="2.5" />
                      <line x1={cx} y1={cy} x2={x1} y2={y1} stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.3" />
                      <text
                        x={tx}
                        y={ty}
                        fill={sec.textColor}
                        fontSize={sec.label.length > 3 ? "18" : "24"}
                        fontWeight="900"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${textAngle + 90}, ${tx}, ${ty})`}
                        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
                      >
                        {sec.label}
                      </text>
                    </g>
                  );
                })}
                <circle cx="200" cy="200" r="46" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
              </svg>

              {/* Center Spin Button with Bento Orange Glow */}
              <button
                id="spin-center-btn"
                onClick={spinWheel}
                disabled={isSpinning}
                aria-label="Вращать барабан"
                className="spin-btn absolute z-20 flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <RotateCw size={20} className={isSpinning ? 'animate-spin' : ''} />
                <span className="text-[11px] mt-0.5 tracking-wider font-extrabold">КРУТИТЬ</span>
              </button>
            </div>

            {/* Spin Bar */}
            <div className="w-full mt-3 flex flex-col gap-2">
              <button
                id="spin-main-btn"
                onClick={spinWheel}
                disabled={isSpinning}
                className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 cursor-pointer transition-all active:scale-98 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-2"
              >
                <Sparkles size={18} />
                <span>{isSpinning ? 'Барабан вращается...' : 'Вращать барабан'}</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center">
                Очки за верный ответ рассчитываются сектором. Сектор «+» открывает любую букву!
              </p>
            </div>
          </section>
        </div>

        {/* Right Column: Question, Tutor, and Progress (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* Question Card: Pregunta Actual */}
          <section className="bento-card flex-grow flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div>
                  <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Pregunta Actual
                  </h2>
                  <span className="text-xs text-sky-400 font-semibold">
                    {currentQuestion.grammarTopic}
                  </span>
                </div>

                {/* Question Navigator */}
                <div className="flex items-center space-x-1.5">
                  <button
                    id="prev-question-btn"
                    onClick={() => goToQuestion(currentQuestionIndex - 1)}
                    disabled={currentQuestionIndex === 0}
                    aria-label="Предыдущий вопрос"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <select
                    id="question-select"
                    aria-label="Выбрать номер вопроса"
                    value={currentQuestionIndex}
                    onChange={(e) => goToQuestion(Number(e.target.value))}
                    className="bg-slate-800 text-xs font-mono font-bold text-sky-300 px-2 py-1.5 rounded-lg border border-slate-700 cursor-pointer focus:outline-none focus:border-sky-400"
                  >
                    {QUESTIONS.map((q, idx) => (
                      <option key={q.id} value={idx}>
                        №{q.id} {answeredQuestions[q.id] !== undefined ? (answeredQuestions[q.id] ? '✓' : '•') : ''}
                      </option>
                    ))}
                  </select>
                  <button
                    id="next-question-btn"
                    onClick={() => goToQuestion(currentQuestionIndex + 1)}
                    disabled={currentQuestionIndex === QUESTIONS.length - 1}
                    aria-label="Следующий вопрос"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Question Statement with Translation Hover & Click */}
              <div
                id="question-container"
                onClick={() => {
                  setShowQuestionTranslation((prev) => !prev);
                  sounds.playTick();
                }}
                className="relative group cursor-pointer p-4 rounded-2xl bg-[#1E293B]/80 border border-slate-700 hover:border-sky-400 transition-all duration-200 mb-5"
              >
                {/* Floating Translation Popup */}
                <div className={`transition-all duration-200 ${showQuestionTranslation ? 'block' : 'hidden group-hover:block'} bg-sky-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-md mb-2 inline-flex items-center space-x-1 shadow-md`}>
                  <Languages size={13} />
                  <span>{currentQuestion.russian}</span>
                </div>

                <p className="text-xl sm:text-2xl font-medium leading-relaxed text-slate-100">
                  {currentQuestion.spanish.split('___').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="text-sky-400 border-b-2 border-sky-400 px-2 font-bold inline-block mx-1">
                          {isAnswered ? currentQuestion.options.find(o => o.id === currentQuestion.correctAnswer)?.text : '___'}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </p>

                <div className="mt-2 flex items-center space-x-1 text-[11px] text-slate-400">
                  <Eye size={12} className="text-sky-400" />
                  <span>Нажмите для {showQuestionTranslation ? 'скрытия' : 'показа'} перевода</span>
                </div>
              </div>

              {/* Options A, B, C, D */}
              <div className="space-y-3 mb-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  const isOptCorrect = opt.id === currentQuestion.correctAnswer;
                  const showTranslation = revealedOptionTranslations[opt.id];

                  let customBorder = 'border-[#334155]';
                  let customBg = 'bg-[#1E293B]';
                  let textClass = 'text-white';

                  if (isAnswered) {
                    if (isOptCorrect) {
                      customBorder = 'border-emerald-400 ring-2 ring-emerald-400/40';
                      customBg = 'bg-emerald-950/80';
                      textClass = 'text-emerald-200';
                    } else if (isSelected) {
                      customBorder = 'border-rose-400';
                      customBg = 'bg-rose-950/80';
                      textClass = 'text-rose-200';
                    } else {
                      customBg = 'bg-slate-900/40 opacity-50';
                      textClass = 'text-slate-500';
                    }
                  }

                  return (
                    <div
                      key={opt.id}
                      id={`option-${opt.id}`}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`btn-option group relative ${customBg} ${customBorder} ${textClass}`}
                    >
                      {/* Floating option translation pill on hover or toggled */}
                      <div className={`text-xs font-semibold text-sky-300 bg-sky-950/95 border border-sky-500/40 px-2.5 py-0.5 rounded-md absolute -top-3 right-4 ${showTranslation ? 'block' : 'hidden group-hover:block'} shadow-lg z-10`}>
                        {opt.translation}
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-sky-400">{opt.id}.</span>
                        <span className="font-medium text-base sm:text-lg">{opt.text}</span>
                      </div>

                      <button
                        id={`translate-opt-${opt.id}`}
                        onClick={(e) => toggleOptionTranslation(opt.id, e)}
                        title="Перевод варианта"
                        className="p-1 rounded-md text-slate-400 hover:text-sky-300 transition-colors"
                      >
                        <BookOpen size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Answer Explanation & Feedback */}
            {isAnswered && (
              <div className={`mt-3 p-4 rounded-2xl border transition-all ${
                isCorrect
                  ? 'bg-emerald-950/70 border-emerald-400/60 text-emerald-200'
                  : 'bg-amber-950/70 border-amber-400/60 text-amber-200'
              }`}>
                <div className="flex items-start space-x-2.5">
                  {isCorrect ? (
                    <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <HelpCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="font-extrabold text-sm">
                      {isCorrect
                        ? `¡Correcto! (+${activeSector.type === 'multiplier' ? 500 * activeSector.value : activeSector.value} очков)`
                        : 'Не совсем верно, но игра без штрафов!'}
                    </div>
                    <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                  {isCorrect && !isWordGuessed && (
                    <button
                      id="pick-letter-reward-btn"
                      type="button"
                      onClick={() => {
                        setLetterFeedback(null);
                        setLetterModalReason('quiz_reward');
                        setShowLetterModal(true);
                      }}
                      className="px-3.5 py-2 text-xs font-extrabold rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md transition-all active:scale-95 cursor-pointer flex items-center space-x-1.5"
                    >
                      <KeyRound size={14} />
                      <span>Выбрать букву на табло {pendingLetterPicks > 0 ? `(${pendingLetterPicks})` : ''}</span>
                    </button>
                  )}

                  <button
                    id="continue-quiz-btn"
                    onClick={() => {
                      if (currentQuestionIndex < QUESTIONS.length - 1) {
                        goToQuestion(currentQuestionIndex + 1);
                      } else {
                        goToQuestion(0);
                      }
                    }}
                    className="px-4 py-2 text-xs font-extrabold rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-900 shadow-md transition-all active:scale-95 cursor-pointer ml-auto"
                  >
                    {currentQuestionIndex < QUESTIONS.length - 1 ? 'Следующий вопрос ➜' : 'В начало викторины'}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Instrucción del Tutor Bento Card */}
          <section className="bento-card bg-gradient-to-br from-sky-500/10 to-transparent border-sky-500/20">
            <h3 className="text-xs font-bold uppercase text-sky-400 mb-2 tracking-widest flex items-center space-x-2">
              <Sparkles size={14} />
              <span>Instrucción del Tutor</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              «{currentQuestion.explanation}»
            </p>
          </section>

          {/* 50 Questions Map Bento Card */}
          <section className="bento-card py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Карта 50 заданий
              </span>
              <span className="text-xs font-mono font-bold text-sky-400">
                {Object.values(answeredQuestions).filter(Boolean).length} / 50 пройдено
              </span>
            </div>

            <div className="grid grid-cols-10 gap-1.5 max-h-32 overflow-y-auto pr-1">
              {QUESTIONS.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const status = answeredQuestions[q.id];

                let dotColor = 'bg-[#1E293B] text-slate-400 border border-[#334155] hover:border-sky-400';
                if (status === true) {
                  dotColor = 'bg-emerald-600 text-white font-bold border-emerald-500';
                } else if (status === false) {
                  dotColor = 'bg-amber-600 text-white font-bold border-amber-500';
                }

                if (isCurrent) {
                  dotColor += ' ring-2 ring-sky-400 text-sky-300';
                }

                return (
                  <button
                    key={q.id}
                    id={`jump-question-${q.id}`}
                    onClick={() => goToQuestion(idx)}
                    title={`Вопрос ${q.id}: ${q.grammarTopic}`}
                    className={`h-6 text-[10px] rounded-md flex items-center justify-center transition-all cursor-pointer ${dotColor}`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Верно</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                <span>Изучено</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-slate-700 inline-block" />
                <span>Ожидает</span>
              </span>
            </div>
          </section>
        </div>
      </main>

      {/* Bento Footer */}
      <footer className="mt-6 bento-card py-3 flex-row justify-between items-center w-full max-w-7xl bg-transparent border-none !px-2">
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-rose-500 border-2 border-[#0F172A] flex items-center justify-center text-[10px] font-bold">ES</div>
            <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-[#0F172A] flex items-center justify-center text-[10px] font-bold">RU</div>
            <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-[#0F172A] flex items-center justify-center text-[10px] font-bold">★</div>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">3 других ученика онлайн • Режим практики</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setRevealedLetters(new Array(SECRET_WORD.length).fill(false));
              setIsWordGuessed(false);
              setAnsweredQuestions({});
              setScore(1000);
              goToQuestion(0);
            }}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Сброс
          </button>
          <button
            onClick={() => {
              if (currentQuestionIndex < QUESTIONS.length - 1) {
                goToQuestion(currentQuestionIndex + 1);
              }
            }}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-xs font-bold uppercase tracking-widest border border-slate-700 hover:border-sky-400 text-slate-200 transition-colors cursor-pointer"
          >
            Пропустить вопрос
          </button>
        </div>
      </footer>

      {/* Modal: Guess Full Word */}
      {showWordModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bento-card max-w-md w-full !bg-[#1E293B] !border-sky-400/40 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Award className="text-sky-400" size={22} />
                <h3 className="font-extrabold text-base sm:text-lg text-white uppercase tracking-tight">
                  Назвать слово целиком
                </h3>
              </div>
              <button
                id="close-word-modal-btn"
                onClick={() => {
                  setShowWordModal(false);
                  setWordGuessFeedback(null);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              Главное слово игры состоит из 9 букв. Тема: испанский язык (Presente).
              <br />
              <span className="text-sky-400 font-semibold">Подсказка: </span>
              {SECRET_WORD_HINT}
            </p>

            <form onSubmit={handleFullWordGuess} className="space-y-4">
              <div>
                <input
                  id="word-guess-input"
                  type="text"
                  value={wordGuessInput}
                  onChange={(e) => setWordGuessInput(e.target.value)}
                  placeholder="Введите слово (на исп.)..."
                  autoFocus
                  maxLength={15}
                  className="w-full px-4 py-3 bg-[#0F172A] border border-sky-400/40 rounded-xl text-center text-xl font-black tracking-widest text-sky-300 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 uppercase"
                />
              </div>

              {wordGuessFeedback && (
                <div className="text-xs font-semibold p-2.5 rounded-lg text-center bg-[#0F172A] border border-sky-400/30 text-sky-200">
                  {wordGuessFeedback}
                </div>
              )}

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  id="cancel-word-guess-btn"
                  onClick={() => setShowWordModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  id="submit-word-guess-btn"
                  className="px-5 py-2 text-xs font-extrabold rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 shadow-lg cursor-pointer transition-all"
                >
                  Проверить слово
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Guess / Pick a Letter (Sector +, Quiz Reward, or Manual) */}
      {showLetterModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bento-card max-w-lg w-full !bg-[#1E293B] !border-sky-400/50 p-6 shadow-2xl relative animate-fade-in">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <KeyRound className="text-sky-400" size={22} />
                <h3 className="font-extrabold text-base sm:text-lg text-white uppercase tracking-tight">
                  {letterModalReason === 'quiz_reward'
                    ? '🎉 Награда за верный ответ: выберите букву!'
                    : sectorPlusActive
                    ? '⭐ Сектор «+»: откройте букву!'
                    : 'Назовите букву на табло'}
                </h3>
              </div>
              <button
                id="close-letter-modal-btn"
                onClick={() => {
                  setShowLetterModal(false);
                  setSectorPlusActive(false);
                  setLetterFeedback(null);
                }}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Dynamic Status / Feedback Message */}
            {letterFeedback ? (
              <div className={`mb-4 p-3 rounded-xl border text-xs sm:text-sm font-bold leading-relaxed flex items-center space-x-2 ${
                letterFeedback.success
                  ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-950/50'
                  : 'bg-amber-950/90 border-amber-400 text-amber-200 shadow-lg shadow-amber-950/50'
              }`}>
                {letterFeedback.success ? (
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                ) : (
                  <HelpCircle size={18} className="text-amber-400 shrink-0" />
                )}
                <span>{letterFeedback.text}</span>
              </div>
            ) : (
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                {letterModalReason === 'quiz_reward'
                  ? 'Вы верно ответили на вопрос! Выберите, какую букву открыть:'
                  : 'Выберите букву для проверки в главном слове (9 букв):'}
              </p>
            )}

            {/* Option 1: Direct Slot Choice */}
            <div className="mb-4 bg-[#0F172A] p-3 rounded-2xl border border-white/10 shadow-inner">
              <div className="text-[11px] text-sky-400 font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Способ 1: Нажмите на скрытую ячейку на табло:</span>
                <span className="text-slate-400 text-[10px]">Гарантированное открытие</span>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {SECRET_WORD.split('').map((letter, idx) => {
                  const isRev = revealedLetters[idx];
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isRev}
                      onClick={() => revealSlot(idx)}
                      title={isRev ? `Открыта: ${letter}` : `Нажмите, чтобы открыть букву #${idx + 1}`}
                      className={`w-8 h-11 sm:w-9 sm:h-12 rounded-lg font-black text-base sm:text-lg transition-all flex items-center justify-center border ${
                        isRev
                          ? 'bg-sky-400 text-slate-900 border-sky-300 shadow-sm cursor-default'
                          : 'bg-slate-800 hover:bg-sky-500/20 text-sky-300 border-sky-400/50 hover:border-sky-300 cursor-pointer active:scale-95 shadow-inner hover:scale-105'
                      }`}
                    >
                      {isRev ? letter : '•'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Option 2: Alphabet Choice */}
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">
              Способ 2: Или назовите букву из испанского алфавита:
            </div>

            {/* Letter Grid */}
            <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5">
              {spanishAlphabet.map((char) => {
                const alreadyFound = SECRET_WORD.split('').some(
                  (l, idx) => l === char && revealedLetters[idx]
                );

                return (
                  <button
                    key={char}
                    id={`letter-pick-${char}`}
                    onClick={() => revealLetter(char)}
                    disabled={alreadyFound}
                    className={`h-10 rounded-lg font-black text-sm transition-transform active:scale-95 cursor-pointer flex items-center justify-center border ${
                      alreadyFound
                        ? 'bg-slate-950 border-slate-800 text-slate-600 opacity-40 cursor-not-allowed'
                        : 'bg-slate-800 hover:bg-sky-500/25 border-slate-700 hover:border-sky-400 text-sky-200 hover:text-white'
                    }`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Подсказка: открываются все совпадения буквы</span>
              <button
                type="button"
                onClick={() => {
                  setShowLetterModal(false);
                  setSectorPlusActive(false);
                  setLetterFeedback(null);
                }}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
