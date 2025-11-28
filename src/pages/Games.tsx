import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import RedRibbon from '../components/common/RedRibbon';

interface GameCard {
  id: string;
  title: string;
  description: string;
  emoji: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  playCount: number;
  color: string;
  requiredScore?: number;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const games: GameCard[] = [
  {
    id: 'myth-or-fact',
    title: 'Myth or Fact',
    description: 'Test your HIV knowledge',
    emoji: '❓',
    difficulty: 'Easy',
    playCount: 1250,
    color: 'from-primary-500 to-primary-600',
    requiredScore: 0,
  },
  {
    id: 'prevention-steps',
    title: 'Prevention Steps',
    description: 'Real-life situations',
    emoji: '🎯',
    difficulty: 'Medium',
    playCount: 890,
    color: 'from-gold-500 to-gold-600',
    requiredScore: 2, // Need at least 2/3 from myth-or-fact
  },
  {
    id: 'safe-choices',
    title: 'Safe Choices',
    description: 'Make informed decisions',
    emoji: '🛡️',
    difficulty: 'Medium',
    playCount: 756,
    color: 'from-slate-500 to-slate-600',
    requiredScore: 4, // Need at least 4/6 from prevention-steps
  },
  {
    id: 'knowledge-quest',
    title: 'Knowledge Quest',
    description: 'Advanced clinical knowledge',
    emoji: '🏆',
    difficulty: 'Hard',
    playCount: 542,
    color: 'from-ribbon-500 to-ribbon-600',
    requiredScore: 1, // Need at least 1/2 from safe-choices
  },
];

const gameQuestions: Record<string, Question[]> = {
  'myth-or-fact': [
    {
      id: 1,
      question: 'Can HIV be transmitted through casual contact like handshakes?',
      options: ['Yes, easily', 'No, never', 'Only in rare cases', 'Depends on temperature'],
      correct: 1,
      explanation: 'HIV cannot be transmitted through casual contact. It requires specific blood-to-blood or sexual contact.',
    },
    {
      id: 2,
      question: 'Is it possible for an HIV-positive person with undetectable viral load to transmit HIV?',
      options: ['Yes, always', 'No, never (U=U)', 'Sometimes', 'Only to partners'],
      correct: 1,
      explanation: 'U=U: Undetectable = Untransmittable. With proper treatment, HIV cannot be passed on.',
    },
    {
      id: 3,
      question: 'Can you get HIV from sharing food or drinks?',
      options: ['Yes', 'No', 'Maybe', 'Only if bleeding'],
      correct: 1,
      explanation: 'No. HIV is destroyed by stomach acid and cannot survive in saliva.',
    },
  ],
  'prevention-steps': [
    {
      id: 1,
      question: 'Your friend confides in you that they had unprotected sex last night and are worried about HIV. What should you advise them to do first?',
      options: ['Wait and see if symptoms appear', 'Get PEP (Post-Exposure Prophylaxis) within 72 hours', 'Take an HIV test immediately', 'Use extra protection next time'],
      correct: 1,
      explanation: 'PEP (Post-Exposure Prophylaxis) must be started within 72 hours of possible exposure. It\'s a 28-day course that can prevent HIV infection. Getting tested immediately won\'t show recent exposure.',
    },
    {
      id: 2,
      question: 'You\'re in a new relationship. Your partner says they tested negative 6 months ago, so protection isn\'t needed. What\'s the best response?',
      options: ['Trust them and skip protection', 'Suggest you both get tested now and use protection until results', 'End the relationship immediately', 'Only use protection sometimes'],
      correct: 1,
      explanation: 'A test from 6 months ago doesn\'t reflect current status. Both partners should get tested together and use protection (condoms, PrEP) to stay safe. Open communication builds trust.',
    },
    {
      id: 3,
      question: 'You notice a needle on the ground at a park. A child is playing nearby. What should you do?',
      options: ['Pick it up with bare hands', 'Ignore it - not your problem', 'Use a stick or gloves to safely dispose in a sharps container', 'Kick it away from the child'],
      correct: 2,
      explanation: 'Never touch needles with bare hands. Use protective barriers (gloves, stick, thick paper) to pick it up and dispose in a proper sharps container or call local health services. This prevents HIV and other bloodborne disease transmission.',
    },
    {
      id: 4,
      question: 'Your sibling just disclosed they are HIV positive and on treatment with undetectable viral load. They ask if it\'s safe to share kitchen utensils. What do you say?',
      options: ['No, keep separate utensils to be safe', 'Yes, completely safe - HIV doesn\'t spread through saliva or casual contact', 'Only if you wash them with hot water immediately', 'Maybe, but use disposable plates'],
      correct: 1,
      explanation: 'HIV cannot be transmitted through saliva, sharing utensils, or casual contact. Plus, undetectable = untransmittable (U=U). Your sibling deserves love and normal family interactions without stigma.',
    },
    {
      id: 5,
      question: 'You\'re planning to get a tattoo. How can you reduce HIV risk?',
      options: ['Go to the cheapest place available', 'Ensure the artist uses new, sterile needles and equipment for each client', 'Bring your own needle', 'Get it done at a friend\'s home'],
      correct: 1,
      explanation: 'Always choose licensed, reputable tattoo parlors that follow strict sterilization protocols. Watch them open new needles. Contaminated equipment can transmit HIV and hepatitis.',
    },
    {
      id: 6,
      question: 'A healthcare worker accidentally pricks themselves with a needle used on an HIV-positive patient. What\'s the correct protocol?',
      options: ['Squeeze the wound and wash with soap immediately, then report for PEP within hours', 'Wait to see if they develop symptoms', 'Apply alcohol and continue working', 'Only report if the patient had high viral load'],
      correct: 0,
      explanation: 'Immediate action is critical: wash the wound, report the incident immediately, and start PEP as soon as possible (ideally within 2 hours, maximum 72 hours). Needle-stick injuries require urgent medical attention.',
    },
  ],
  'safe-choices': [
    {
      id: 1,
      question: 'In which situation should you get tested for HIV?',
      options: ['Only if symptomatic', 'After unprotected sex', 'Regularly (at least once)', 'All of the above'],
      correct: 3,
      explanation: 'Regular testing is recommended, especially after risky situations.',
    },
    {
      id: 2,
      question: 'What should you do if you think you have been exposed to HIV?',
      options: ['Wait and see', 'Visit a clinic immediately', 'Get PEP within 72 hours', 'Tell someone you trust'],
      correct: 2,
      explanation: 'Post-Exposure Prophylaxis (PEP) is effective if taken within 72 hours of potential exposure.',
    },
  ],
  'knowledge-quest': [
    {
      id: 1,
      question: 'A patient presents with CD4 count of 180 cells/μL. What stage of HIV infection is this?',
      options: ['Stage 1 (Acute)', 'Stage 2 (Chronic)', 'Stage 3 (AIDS)', 'Normal range'],
      correct: 2,
      explanation: 'CD4 count below 200 cells/μL indicates Stage 3 (AIDS). Normal CD4 count is 500-1500 cells/μL. Immediate ART initiation is critical.',
    },
    {
      id: 2,
      question: 'What is the "window period" in HIV testing and why is it clinically significant?',
      options: ['Time between exposure and symptoms', 'Time between exposure and detectable antibodies (10-90 days)', 'Time to start treatment', 'Recovery period'],
      correct: 1,
      explanation: 'The window period is 10-90 days when HIV is present but antibodies aren\'t detectable yet. During this time, a person can test negative but still transmit HIV. 4th generation tests detect earlier.',
    },
    {
      id: 3,
      question: 'A patient on ART shows viral load <50 copies/mL for 6+ months. What does this mean?',
      options: ['HIV is cured', 'Undetectable = Untransmittable (U=U)', 'Treatment failed', 'Needs stronger medication'],
      correct: 1,
      explanation: 'U=U is scientifically proven: people with undetectable viral loads cannot sexually transmit HIV. This revolutionized HIV prevention and reduced stigma.',
    },
    {
      id: 4,
      question: 'Which opportunistic infection is the leading cause of death in AIDS patients with CD4 <100?',
      options: ['Common cold', 'Tuberculosis (TB)', 'Seasonal flu', 'Food poisoning'],
      correct: 1,
      explanation: 'Tuberculosis is the #1 killer of people with HIV/AIDS globally. TB and HIV co-infection requires specialized treatment. Prevention through TB screening is crucial.',
    },
    {
      id: 5,
      question: 'What is the mechanism of action of NRTIs (Nucleoside Reverse Transcriptase Inhibitors)?',
      options: ['Block virus entry into cells', 'Prevent viral DNA integration', 'Inhibit reverse transcriptase enzyme', 'Boost immune system'],
      correct: 2,
      explanation: 'NRTIs (like AZT, 3TC) block reverse transcriptase, preventing HIV from converting its RNA into DNA. This stops viral replication. They\'re backbone drugs in ART regimens.',
    },
    {
      id: 6,
      question: 'A pregnant woman tests HIV positive. What intervention prevents mother-to-child transmission?',
      options: ['C-section delivery only', 'ART during pregnancy + safe delivery practices + infant prophylaxis', 'Avoid breastfeeding only', 'Wait until after delivery'],
      correct: 1,
      explanation: 'PMTCT (Prevention of Mother-to-Child Transmission) involves: maternal ART, safe delivery, infant prophylaxis. This reduces transmission from 25% to <1%. Breastfeeding is safe with undetectable viral load.',
    },
    {
      id: 7,
      question: 'What does drug resistance mean in HIV treatment, and how does it develop?',
      options: ['Virus mutates when medication is taken inconsistently', 'Patient becomes allergic', 'Medication becomes toxic', 'Virus dies'],
      correct: 0,
      explanation: 'HIV mutates rapidly. Missing doses allows resistant strains to multiply. Adherence >95% is critical. Resistance testing guides treatment changes. Prevention: take meds daily, same time.',
    },
    {
      id: 8,
      question: 'What is the significance of viral load blips in patients on stable ART?',
      options: ['Treatment failure - change meds immediately', 'Normal fluctuations, monitor if <200 copies/mL', 'Patient is non-adherent', 'HIV is mutating'],
      correct: 1,
      explanation: 'Blips (temporary increases <200 copies/mL) are common due to infections, vaccinations, or test variability. Single blip doesn\'t mean failure. Sustained increase >200 needs investigation.',
    },
  ],
};

const difficultyColors: Record<string, string> = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-gold-100 text-gold-700',
  Hard: 'bg-primary-100 text-primary-700',
};

// Helper functions for game progress
const getGameProgress = (gameId: string): number => {
  const stored = localStorage.getItem(`game_${gameId}_score`);
  return stored ? parseInt(stored) : 0;
};

const saveGameProgress = (gameId: string, score: number) => {
  localStorage.setItem(`game_${gameId}_score`, score.toString());
};

const isGameUnlocked = (gameIndex: number): boolean => {
  if (gameIndex === 0) return true;
  const prevGame = games[gameIndex - 1];
  const prevScore = getGameProgress(prevGame.id);
  const currentGame = games[gameIndex];
  // Check if previous game score meets the requirement to unlock current game
  return prevScore >= (currentGame.requiredScore || 0);
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function GameGrid() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white overflow-hidden font-sans text-slate-850">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group"
          >
            <RedRibbon size="sm" />
            <span className="text-xl font-bold text-slate-850 group-hover:text-primary-600 transition-colors">HIV Awareness</span>
          </button>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-gold-50" />
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 right-10 w-72 h-72 bg-gold-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-gold-500">Learning Games</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Learn about HIV/AIDS through engaging, interactive games that make education fun and memorable.
          </p>
        </motion.div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game, index) => {
            const isUnlocked = isGameUnlocked(index);
            const score = getGameProgress(game.id);
            const totalQuestions = gameQuestions[game.id]?.length || 0;
            const isCompleted = score > 0;

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={isUnlocked ? { translateY: -8 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                onClick={() => isUnlocked && navigate(`/games/${game.id}`)}
                className={`relative group ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
              >
                {/* Lock Overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm rounded-2xl">
                    <div className="text-center">
                      <div className="text-5xl mb-2">🔒</div>
                      <p className="text-white font-bold text-sm">Complete previous game</p>
                    </div>
                  </div>
                )}

                {/* Completed Badge */}
                {isCompleted && (
                  <div className="absolute top-4 right-4 z-20 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    ✓ {score}/{totalQuestions}
                  </div>
                )}

                {/* Glowing Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${game.color} rounded-2xl opacity-0 blur-xl group-hover:opacity-40 transition-all duration-300 -z-10`}
                />

                {/* Card */}
                <div className="relative bg-white border border-slate-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col items-center text-center">
                    {/* Animated Icon */}
                    <motion.div
                      className="text-6xl mb-6 p-4 bg-slate-50 rounded-full"
                      whileHover={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {game.emoji}
                    </motion.div>

                  {/* Difficulty Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${difficultyColors[game.difficulty]}`}>
                    {game.difficulty}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{game.title}</h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm mb-6 flex-1">{game.description}</p>

                  {/* Play Count */}
                  <div className="flex items-center justify-center gap-2 mb-6 text-xs text-slate-500 font-medium">
                    <span>👥 {game.playCount.toLocaleString()} played</span>
                  </div>

                  {/* Play Button */}
                  <div className={`w-full bg-gradient-to-r ${game.color} text-white font-bold py-3 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}>
                    Play Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GamePlay() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const game = games.find((g) => g.id === gameId);

  // Shuffle questions on component mount
  useEffect(() => {
    const originalQuestions = gameQuestions[gameId || ''] || [];
    setShuffledQuestions(shuffleArray(originalQuestions));
  }, [gameId]);

  const questions = shuffledQuestions;

  if (!game || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Game Not Found</h2>
          <button
            onClick={() => navigate('/games')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    // Save progress
    if (gameId && score > getGameProgress(gameId)) {
      saveGameProgress(gameId, score);
    }

    const percentage = (score / questions.length) * 100;
    let resultEmoji = '🏆';
    let resultTitle = '';
    let resultMessage = '';
    
    if (percentage === 100) {
      resultEmoji = '🌟';
      resultTitle = 'Perfect Score!';
      resultMessage = 'You\'re a true HIV awareness champion! Your knowledge can save lives. Keep spreading the facts and fighting stigma!';
    } else if (percentage >= 80) {
      resultEmoji = '💪';
      resultTitle = 'Excellent Work!';
      resultMessage = 'You\'re a fighter! Great job on understanding HIV prevention. Review the missed questions to become even stronger!';
    } else if (percentage >= 60) {
      resultEmoji = '👍';
      resultTitle = 'Good Effort!';
      resultMessage = 'You\'re on the right track! Keep learning and you\'ll master these prevention strategies. Every question you answer helps you protect yourself and others.';
    } else {
      resultEmoji = '📚';
      resultTitle = 'Keep Learning!';
      resultMessage = 'Don\'t give up! Knowledge is power. Retake this quiz and review the explanations carefully. You\'ve got this - every expert was once a beginner!';
    }

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-850">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100"
        >
          <div className="text-6xl mb-6">{resultEmoji}</div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{resultTitle}</h2>
          <p className="text-slate-600 mb-6 text-lg">
            You scored <span className="text-primary-600 font-bold text-2xl">{score}</span> out of <span className="font-bold text-2xl">{questions.length}</span>
          </p>
          
          {/* Personalized Message */}
          <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 mb-8">
            <p className="text-slate-700 leading-relaxed">
              {resultMessage}
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                setShowResult(false);
                setCurrentQuestion(0);
                setScore(0);
                setSelectedOption(null);
                setIsAnswered(false);
                // Reshuffle questions for replay
                const originalQuestions = gameQuestions[gameId || ''] || [];
                setShuffledQuestions(shuffleArray(originalQuestions));
              }}
              className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
            >
              Play Again
            </button>
            <button
              onClick={() => navigate('/games')}
              className="w-full bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Back to Games
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-850">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/games')}
            className="flex items-center gap-2 text-slate-600 hover:text-primary-600 transition-colors font-medium"
          >
            ← Exit Game
          </button>
          <div className="font-bold text-slate-900 text-lg">
            {game.title} <span className="ml-2 text-2xl">{game.emoji}</span>
          </div>
          <div className="text-sm font-medium bg-slate-100 px-3 py-1 rounded-full text-slate-600">
            {currentQuestion + 1} / {questions.length}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-primary-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-snug">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 flex justify-between items-center group ${
                        isAnswered
                          ? index === questions[currentQuestion].correct
                            ? 'bg-green-50 border-green-500 text-green-800'
                            : index === selectedOption
                            ? 'bg-red-50 border-red-500 text-red-800'
                            : 'bg-slate-50 border-transparent text-slate-400'
                          : 'bg-white border-slate-100 hover:border-primary-200 hover:bg-primary-50 text-slate-700'
                      }`}
                    >
                      <span className="font-medium text-lg">{option}</span>
                      {isAnswered && index === questions[currentQuestion].correct && (
                        <span className="text-green-600 text-xl">✓</span>
                      )}
                      {isAnswered && index === selectedOption && index !== questions[currentQuestion].correct && (
                        <span className="text-red-600 text-xl">✗</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Explanation & Next Button */}
              {isAnswered && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="bg-slate-50 p-8 border-t border-slate-100"
                >
                  {/* Correct/Wrong Message */}
                  <div className={`mb-6 p-4 rounded-xl ${
                    selectedOption === questions[currentQuestion].correct
                      ? 'bg-green-100 border border-green-300'
                      : 'bg-red-100 border border-red-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">
                        {selectedOption === questions[currentQuestion].correct ? '✅' : '❌'}
                      </span>
                      <div>
                        <h3 className={`font-bold text-lg ${
                          selectedOption === questions[currentQuestion].correct
                            ? 'text-green-800'
                            : 'text-red-800'
                        }`}>
                          {selectedOption === questions[currentQuestion].correct ? 'Correct!' : 'Incorrect'}
                        </h3>
                        <p className={`text-sm ${
                          selectedOption === questions[currentQuestion].correct
                            ? 'text-green-700'
                            : 'text-red-700'
                        }`}>
                          {selectedOption === questions[currentQuestion].correct
                            ? 'Great job! You got it right.'
                            : `The correct answer is: "${questions[currentQuestion].options[questions[currentQuestion].correct]}"`
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="flex gap-4 mb-6">
                    <div className="text-2xl">💡</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Why?</h4>
                      <p className="text-slate-600 leading-relaxed">
                        {questions[currentQuestion].explanation}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={nextQuestion}
                    className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Games() {
  const { gameId } = useParams();
  return gameId ? <GamePlay /> : <GameGrid />;
}
