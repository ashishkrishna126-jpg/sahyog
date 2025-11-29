import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { LAUNCH_DATE } from '../config/launch';

interface InauguralLandingProps {
  onLaunch: () => void;
}

export default function InauguralLanding({ onLaunch }: InauguralLandingProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isExploding, setIsExploding] = useState(false);
  const launchAudioRef = useRef<HTMLAudioElement | null>(null);

  function calculateTimeLeft() {
    const difference = +new Date(LAUNCH_DATE) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    // Happy, uplifting music celebrating a good initiative
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2024/08/04/audio_a567036ee6.mp3?filename=happy-happy-happy-hop-along-248421.mp3');
    audio.volume = 0.7;
    audio.preload = 'auto';
    launchAudioRef.current = audio;

    // Preload the audio
    audio.load();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleLaunch = () => {
    const audio = launchAudioRef.current;
    if (audio) {
      audio.currentTime = 0;
      // Try to play with better error handling
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playing successfully');
          })
          .catch((error) => {
            console.error('Audio play failed:', error);
            // Try again with user interaction
            setTimeout(() => {
              audio.play().catch(e => console.log('Retry failed:', e));
            }, 100);
          });
      }
    }

    setIsExploding(true);
    setTimeout(() => {
      onLaunch();
    }, 5000); // Extended to 5s to let the music play longer
  };

  // Enable button if time is up OR if user wants to manually launch (hidden feature or just always available for inauguration?)
  // The requirement says "whenever is launching or clicking some inauguration animation".
  // Let's make the button available but maybe styled as "Inaugurate Now"
  // For strict time enforcement, we would hide it. But for an "Inaugural" page, usually someone clicks a button to open it.
  // Let's show the button when time is up, OR allow a "bypass" click on the logo for admins?
  // Actually, let's just make the button visible but maybe pulsing when time is close?
  // Re-reading: "only active till Dec 1 5:00 PM".
  // Let's show the countdown. When countdown ends, show "Enter Site" button.
  // AND, let's add a "Inaugurate" button that is always there but maybe subtle, or just the main action.
  // "whenever is launching or clicking some inauguration animation it should be open home page"
  // I will make a big "Inaugurate" button.

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden relative flex flex-col items-center justify-center font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {isExploding && <Confetti numberOfPieces={500} recycle={false} colors={['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#ffffff']} />}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-full opacity-50 blur-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <div className="relative bg-gradient-to-br from-red-600 to-red-700 p-6 md:p-8 rounded-full shadow-2xl">
                <span className="text-6xl md:text-8xl drop-shadow-2xl">🎗️</span>
              </div>
            </div>
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-8xl font-black mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-red-500">
              SAHYOG
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-3xl text-gray-300 font-light mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Voices of Hope & Awareness
          </motion.p>
          <motion.p 
            className="text-sm md:text-base text-gray-500 font-medium mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            An Initiative by Art Care Plus Center, Thrissur
          </motion.p>
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600/20 to-rose-600/20 rounded-full border border-red-500/30"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl">🎙️</span>
            <span className="text-sm md:text-base text-gray-300 font-semibold uppercase tracking-wider">
              Platform Launch Event
            </span>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isExploding ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
              className="space-y-12"
            >
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <p className="text-sm md:text-base tracking-[0.3em] uppercase text-red-400 font-bold mb-2">
                  Launching In
                </p>
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full" />
              </motion.div>
              <div className="grid grid-cols-4 gap-4 md:gap-8">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.label} 
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + idx * 0.1 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-red-600/20 to-rose-600/20 backdrop-blur-lg border-2 border-red-500/40 rounded-3xl p-4 md:p-8 w-full aspect-square flex items-center justify-center shadow-2xl"
                      whileHover={{ scale: 1.05, borderColor: 'rgba(239, 68, 68, 0.6)' }}
                    >
                      <span className="text-3xl md:text-6xl font-black font-mono bg-clip-text text-transparent bg-gradient-to-br from-white to-red-200">
                        {String(item.value).padStart(2, '0')}
                      </span>
                    </motion.div>
                    <span className="mt-4 text-xs md:text-sm uppercase tracking-widest text-gray-400 font-bold">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLaunch}
                  className="group relative px-10 py-5 bg-gradient-to-r from-red-600 to-rose-600 rounded-full overflow-hidden shadow-2xl"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-rose-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  
                  <span className="relative flex items-center gap-3 text-white font-bold text-lg md:text-xl uppercase tracking-wider">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🎉
                    </motion.span>
                    <span>Launch Sahyog</span>
                  </span>
                </motion.button>
                <p className="mt-4 text-xs md:text-sm text-gray-500">
                  Experience begins with hope
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="launching"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                className="text-6xl mb-8"
              >
                🌍
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Launching Sahyog...
              </h2>
              <p className="text-slate-400 text-lg">
                Connecting communities, spreading hope.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <footer className="absolute bottom-8 text-center w-full text-slate-600 text-xs">
        &copy; 2025 Art Care Plus Center, Thrissur. All Rights Reserved.
      </footer>
    </div>
  );
}
