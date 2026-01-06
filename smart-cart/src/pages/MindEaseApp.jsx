// import { useState } from "react";

// function Practice() {
//   const [title, setTitle] = useState(0);
//   return (
//     <div className="h-screen bg-gray-100 flex flex-col items-center justify-center gap-2">
//       <h1 className=" flex items-center justify-center bg-black text-white w-100 h-10 ">{title}</h1>
//       <input
//         className=" p-3 bg-black text-white w-100 h-10"
//         placeholder="enter title "
//         maxLength={10}
//         value={title}
//         onChange={(e)=>{
//             setTitle(Number(e.target.value))
//         }}
//         type="number"
//       ></input>
//       <h4></h4>
//       <button onClick={()=>{
//         setTitle(prev=>prev+1)
//         setTitle(prev=>prev+1)
//         setTitle(prev=>prev+1)
//         setTitle(prev=>prev+1)
//         setTitle(prev=>prev+1)
//       }}
//       className="mb-19 bg-black text-white p-3 rounded-lg text-xl w-100 h-10">hello</button>
//     </div>
//   );
// }

// export default Practice;




import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Brain, Lock, Phone, TrendingUp, Menu, X, Award, Timer, Smile, Frown, Meh } from 'lucide-react';

const MindEaseApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [moodData, setMoodData] = useState([]);
  const [dailyMood, setDailyMood] = useState(null);
  const [screenTime, setScreenTime] = useState({ limit: 120, used: 0, locked: false });
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loadMoodData();
    loadScreenTimeData();
  }, []);

  const loadMoodData = () => {
    const saved = localStorage.getItem('moodData');
    if (saved) {
      setMoodData(JSON.parse(saved));
    }
  };

  const loadScreenTimeData = () => {
    const saved = localStorage.getItem('screenTime');
    if (saved) {
      setScreenTime(JSON.parse(saved));
    }
  };

  const saveMood = (mood) => {
    const newEntry = {
      date: new Date().toLocaleDateString(),
      mood: mood,
      timestamp: Date.now()
    };
    const updated = [...moodData, newEntry];
    setMoodData(updated);
    localStorage.setItem('moodData', JSON.stringify(updated));
    setDailyMood(mood);
  };

  const updateScreenTime = (minutes) => {
    const updated = { ...screenTime, used: screenTime.used + minutes };
    if (updated.used >= updated.limit) {
      updated.locked = true;
    }
    setScreenTime(updated);
    localStorage.setItem('screenTime', JSON.stringify(updated));
  };

  const resetScreenTime = () => {
    const reset = { ...screenTime, used: 0, locked: false };
    setScreenTime(reset);
    localStorage.setItem('screenTime', JSON.stringify(reset));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-purple-600">MindEase</h1>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <nav className={`${menuOpen ? 'block' : 'hidden'} md:flex absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}>
            <div className="flex flex-col md:flex-row gap-2 p-4 md:p-0">
              <NavButton icon={Home} label="Home" active={activeTab === 'home'} onClick={() => { setActiveTab('home'); setMenuOpen(false); }} />
              <NavButton icon={Brain} label="Games" active={activeTab === 'games'} onClick={() => { setActiveTab('games'); setMenuOpen(false); }} />
              <NavButton icon={Award} label="Quiz" active={activeTab === 'quiz'} onClick={() => { setActiveTab('quiz'); setMenuOpen(false); }} />
              <NavButton icon={Lock} label="Screen Time" active={activeTab === 'screentime'} onClick={() => { setActiveTab('screentime'); setMenuOpen(false); }} />
              <NavButton icon={BookOpen} label="Books" active={activeTab === 'books'} onClick={() => { setActiveTab('books'); setMenuOpen(false); }} />
              <NavButton icon={Phone} label="Doctors" active={activeTab === 'doctors'} onClick={() => { setActiveTab('doctors'); setMenuOpen(false); }} />
              <NavButton icon={TrendingUp} label="Progress" active={activeTab === 'progress'} onClick={() => { setActiveTab('progress'); setMenuOpen(false); }} />
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && <HomeTab saveMood={saveMood} dailyMood={dailyMood} />}
        {activeTab === 'games' && <GamesTab />}
        {activeTab === 'quiz' && <QuizTab currentQuiz={currentQuiz} setCurrentQuiz={setCurrentQuiz} quizScore={quizScore} setQuizScore={setQuizScore} />}
        {activeTab === 'screentime' && <ScreenTimeTab screenTime={screenTime} updateScreenTime={updateScreenTime} resetScreenTime={resetScreenTime} />}
        {activeTab === 'books' && <BooksTab />}
        {activeTab === 'doctors' && <DoctorsTab />}
        {activeTab === 'progress' && <ProgressTab moodData={moodData} />}
      </main>
    </div>
  );
};

const NavButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
      active ? 'bg-purple-600 text-white' : 'hover:bg-purple-100 text-gray-700'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </button>
);

const HomeTab = ({ saveMood, dailyMood }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to MindEase</h2>
      <p className="text-gray-600 mb-6">Your personal companion for managing social anxiety and building confidence</p>
      
      <div className="bg-purple-50 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">How are you feeling today?</h3>
        <div className="flex justify-center gap-4">
          <MoodButton mood="happy" label="Great" onClick={() => saveMood(5)} selected={dailyMood === 5} />
          <MoodButton mood="good" label="Good" onClick={() => saveMood(4)} selected={dailyMood === 4} />
          <MoodButton mood="okay" label="Okay" onClick={() => saveMood(3)} selected={dailyMood === 3} />
          <MoodButton mood="sad" label="Not Great" onClick={() => saveMood(2)} selected={dailyMood === 2} />
          <MoodButton mood="anxious" label="Anxious" onClick={() => saveMood(1)} selected={dailyMood === 1} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <FeatureCard title="Relaxing Games" desc="Play mindful games to reduce stress" color="blue" />
        <FeatureCard title="Learn & Grow" desc="Take quizzes to improve social awareness" color="green" />
        <FeatureCard title="Track Progress" desc="See your improvement over time" color="purple" />
      </div>
    </div>
  </div>
);

const MoodButton = ({ mood, label, onClick, selected }) => {
  const icons = {
    happy: <Smile className="w-8 h-8" />,
    good: <Smile className="w-8 h-8" />,
    okay: <Meh className="w-8 h-8" />,
    sad: <Frown className="w-8 h-8" />,
    anxious: <Frown className="w-8 h-8" />
  };
  
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-lg transition ${
        selected ? 'bg-purple-600 text-white' : 'bg-white hover:bg-purple-100'
      }`}
    >
      {icons[mood]}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

const FeatureCard = ({ title, desc, color }) => (
  <div className={`bg-${color}-50 rounded-lg p-6 border-2 border-${color}-200`}>
    <h4 className={`text-lg font-semibold text-${color}-800 mb-2`}>{title}</h4>
    <p className={`text-${color}-600 text-sm`}>{desc}</p>
  </div>
);

const GamesTab = () => {
  const [memoryGame, setMemoryGame] = useState({ cards: [], flipped: [], matched: [], moves: 0 });
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');

  useEffect(() => {
    initMemoryGame();
  }, []);

  useEffect(() => {
    if (breathingActive) {
      const phases = ['inhale', 'hold', 'exhale', 'hold'];
      const durations = [4000, 2000, 6000, 2000];
      let currentPhase = 0;

      const interval = setInterval(() => {
        currentPhase = (currentPhase + 1) % phases.length;
        setBreathPhase(phases[currentPhase]);
      }, durations[currentPhase]);

      return () => clearInterval(interval);
    }
  }, [breathingActive, breathPhase]);

  const initMemoryGame = () => {
    const emojis = ['😊', '🌟', '🎨', '🎵', '🌈', '🦋', '🌺', '🎯'];
    const cards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false }));
    setMemoryGame({ cards, flipped: [], matched: [], moves: 0 });
  };

  const flipCard = (id) => {
    if (memoryGame.flipped.length === 2 || memoryGame.matched.includes(id)) return;
    
    const newFlipped = [...memoryGame.flipped, id];
    setMemoryGame({ ...memoryGame, flipped: newFlipped });

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = memoryGame.cards.find(c => c.id === first);
      const secondCard = memoryGame.cards.find(c => c.id === second);

      if (firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          setMemoryGame(prev => ({
            ...prev,
            matched: [...prev.matched, first, second],
            flipped: [],
            moves: prev.moves + 1
          }));
        }, 500);
      } else {
        setTimeout(() => {
          setMemoryGame(prev => ({ ...prev, flipped: [], moves: prev.moves + 1 }));
        }, 1000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Mind Refreshment Games</h2>

        {/* Breathing Exercise */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Breathing Exercise</h3>
          <div className="text-center">
            <div className={`w-32 h-32 mx-auto rounded-full transition-all duration-1000 ${
              breathPhase === 'inhale' ? 'bg-blue-400 scale-150' :
              breathPhase === 'exhale' ? 'bg-blue-300 scale-75' :
              'bg-blue-350 scale-110'
            }`}></div>
            <p className="text-2xl font-bold mt-4 text-blue-600 capitalize">{breathPhase}</p>
            <button
              onClick={() => setBreathingActive(!breathingActive)}
              className={`mt-4 px-6 py-2 rounded-lg font-medium ${
                breathingActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {breathingActive ? 'Stop' : 'Start'} Exercise
            </button>
          </div>
        </div>

        {/* Memory Game */}
        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Memory Match Game</h3>
            <div className="flex gap-4 items-center">
              <span className="text-gray-600">Moves: {memoryGame.moves}</span>
              <button onClick={initMemoryGame} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                New Game
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {memoryGame.cards.map(card => (
              <button
                key={card.id}
                onClick={() => flipCard(card.id)}
                className={`aspect-square rounded-lg text-4xl font-bold transition ${
                  memoryGame.flipped.includes(card.id) || memoryGame.matched.includes(card.id)
                    ? 'bg-white'
                    : 'bg-purple-300 hover:bg-purple-400'
                }`}
              >
                {(memoryGame.flipped.includes(card.id) || memoryGame.matched.includes(card.id)) ? card.emoji : '?'}
              </button>
            ))}
          </div>
          {memoryGame.matched.length === memoryGame.cards.length && (
            <div className="mt-4 text-center text-xl font-bold text-green-600">
              🎉 Congratulations! You won in {memoryGame.moves} moves!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuizTab = ({ currentQuiz, setCurrentQuiz, quizScore, setQuizScore }) => {
  const quizzes = [
    {
      question: "What is a healthy way to handle social anxiety before a presentation?",
      options: [
        "Avoid the presentation entirely",
        "Practice deep breathing and positive self-talk",
        "Stay up all night worrying",
        "Ignore your feelings completely"
      ],
      correct: 1
    },
    {
      question: "Which is an effective way to start a conversation?",
      options: [
        "Wait for others to always approach you",
        "Ask open-ended questions and show genuine interest",
        "Talk only about yourself",
        "Avoid eye contact"
      ],
      correct: 1
    },
    {
      question: "What should you do if you feel overwhelmed in a social setting?",
      options: [
        "Leave immediately without telling anyone",
        "Take a short break in a quiet space and practice grounding techniques",
        "Force yourself to stay no matter what",
        "Pretend everything is fine and ignore your feelings"
      ],
      correct: 1
    },
    {
      question: "How can active listening improve your social interactions?",
      options: [
        "It doesn't really matter",
        "It helps build trust and shows respect for others",
        "It makes conversations longer",
        "It's only useful in professional settings"
      ],
      correct: 1
    },
    {
      question: "What is a good mindset when facing social challenges?",
      options: [
        "Everyone is judging me negatively",
        "I should be perfect in every interaction",
        "Growth comes from practice and small steps",
        "Social skills can't be improved"
      ],
      correct: 2
    }
  ];

  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    setSelected(index);
    setShowResult(true);
    if (index === quizzes[currentQuiz].correct) {
      setQuizScore(quizScore + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setQuizScore(0);
    setSelected(null);
    setShowResult(false);
  };

  const quiz = quizzes[currentQuiz];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Social Awareness Quiz</h2>
          <span className="text-lg font-semibold text-purple-600">Score: {quizScore}/{quizzes.length}</span>
        </div>

        {currentQuiz < quizzes.length ? (
          <div>
            <div className="mb-4">
              <span className="text-sm text-gray-500">Question {currentQuiz + 1} of {quizzes.length}</span>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuiz + 1) / quizzes.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-6">{quiz.question}</h3>

            <div className="space-y-3">
              {quiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg text-left transition ${
                    showResult
                      ? index === quiz.correct
                        ? 'bg-green-100 border-2 border-green-500'
                        : selected === index
                        ? 'bg-red-100 border-2 border-red-500'
                        : 'bg-gray-100'
                      : 'bg-gray-50 hover:bg-purple-100 border-2 border-transparent'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="mt-6">
                {selected === quiz.correct ? (
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-green-800">
                    ✅ Correct! Great job!
                  </div>
                ) : (
                  <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 text-red-800">
                    ❌ Not quite. The correct answer was: {quiz.options[quiz.correct]}
                  </div>
                )}
                <button
                  onClick={nextQuestion}
                  className="mt-4 w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                >
                  {currentQuiz < quizzes.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-3xl font-bold mb-4">Quiz Complete! 🎉</h3>
            <p className="text-2xl text-purple-600 mb-6">Your Score: {quizScore}/{quizzes.length}</p>
            <p className="text-gray-600 mb-6">
              {quizScore === quizzes.length ? 'Perfect score! You have excellent social awareness!' :
               quizScore >= quizzes.length * 0.7 ? 'Great job! Keep learning and growing!' :
               'Keep practicing! Every step forward counts.'}
            </p>
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ScreenTimeTab = ({ screenTime, updateScreenTime, resetScreenTime }) => {
  const [newLimit, setNewLimit] = useState(screenTime.limit);

  const updateLimit = () => {
    const updated = { ...screenTime, limit: parseInt(newLimit) };
    localStorage.setItem('screenTime', JSON.stringify(updated));
    window.location.reload();
  };

  const percentage = (screenTime.used / screenTime.limit) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Screen Time Manager</h2>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold">Today's Usage</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {screenTime.used} / {screenTime.limit} minutes
              </p>
            </div>
            <Timer className="w-16 h-16 text-purple-600" />
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className={`h-4 rounded-full transition-all ${
                percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>

          {screenTime.locked && (
            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 text-red-800 flex items-center gap-3">
              <Lock className="w-6 h-6" />
              <div>
                <p className="font-bold">Screen Time Limit Reached!</p>
                <p className="text-sm">Take a break and focus on other activities.</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Set Daily Limit</h3>
            <input
              type="number"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
              className="w-full p-3 border-2 border-blue-300 rounded-lg mb-3"
              placeholder="Minutes per day"
            />
            <button
              onClick={updateLimit}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Update Limit
            </button>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <button
              onClick={resetScreenTime}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium mb-3"
            >
              Reset Today's Timer
            </button>
            <p className="text-sm text-gray-600">Note: This simulates screen time tracking. Full app blocking requires native mobile app integration.</p>
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>⚠️ Important:</strong> This feature tracks time within the app. To block other social media apps on your device, you would need device-level permissions (Android/iOS) or a browser extension.
          </p>
        </div>
      </div>
    </div>
  );
};

const BooksTab = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const books = [
    {
      id: 1,
      title: "Overcoming Social Anxiety",
      author: "Dr. Sarah Miller",
      content: `Social anxiety is more common than you think. It affects millions of people worldwide, but the good news is that it can be managed effectively.

Understanding Social Anxiety:
Social anxiety disorder goes beyond normal nervousness. It involves intense fear of social situations where you might be judged, embarrassed, or humiliated.

Common Symptoms:
• Excessive worry before social events
• Fear of talking to strangers
• Avoidance of situations where you're the center of attention
• Physical symptoms like sweating, trembling, or rapid heartbeat

Evidence-Based Strategies:
1. Cognitive Behavioral Therapy (CBT) - Challenge negative thought patterns
2. Gradual Exposure - Start with small social interactions and build up
3. Mindfulness - Stay present instead of worrying about judgment
4. Self-Compassion - Treat yourself with kindness

Remember: Progress, not perfection, is the goal. Every small step counts toward building confidence.`,
      category: "Self-Help"
    },
    {
      id: 2,
      title: "The Art of Conversation",
      author: "James Cooper",
      content: `Meaningful conversations are the foundation of strong relationships. Here's how to improve your conversational skills.

Starting Conversations:
• Use open-ended questions that can't be answered with just "yes" or "no"
• Comment on your shared environment
• Give genuine compliments
• Show curiosity about the other person

Active Listening:
The most important conversational skill isn't talking—it's listening. When you truly listen:
• Maintain appropriate eye contact
• Nod and provide verbal acknowledgments
• Ask follow-up questions
• Avoid interrupting

Body Language:
• Face the person you're talking to
• Smile naturally
• Maintain an open posture
• Mirror their energy level (within reason)

Keeping Conversations Flowing:
• Share related personal experiences
• Ask "how" and "why" questions
• Be comfortable with brief silences
• Show enthusiasm about topics they care about

Practice makes progress. Start with small talk and work your way up to deeper conversations.`,
      category: "Communication"
    },
    {
      id: 3,
      title: "Mindfulness for Students",
      author: "Dr. Emma Watson",
      content: `College life can be overwhelming. Mindfulness offers practical tools to stay grounded and focused.

What is Mindfulness?
Mindfulness means paying attention to the present moment without judgment. It's about being aware of your thoughts, feelings, and surroundings.

Benefits for Students:
• Reduced stress and anxiety
• Improved focus and concentration
• Better sleep quality
• Enhanced emotional regulation
• Stronger academic performance

Simple Mindfulness Practices:

1. Five-Minute Breathing Exercise
   Sit comfortably, close your eyes, and focus on your breath. Count to 4 as you inhale, hold for 4, exhale for 6. Repeat for 5 minutes.

2. Body Scan
   Lie down and mentally scan from your toes to your head, noticing any tension or sensations without trying to change them.

3. Mindful Walking
   Walk slowly, noticing each step, the ground beneath your feet, and your surroundings.

4. Gratitude Practice
   Each night, write down three things you're grateful for. This shifts focus from stress to appreciation.

Start with just 5 minutes a day. Consistency matters more than duration.`,
      category: "Wellness"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Reading Library</h2>

        {!selectedBook ? (
          <div className="grid md:grid-cols-3 gap-6">
            {books.map(book => (
              <div key={book.id} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border-2 border-purple-200 hover:shadow-lg transition cursor-pointer"
                   onClick={() => setSelectedBook(book)}>
                <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                <span className="inline-block bg-purple-200 text-purple-800 text-xs px-3 py-1 rounded-full">{book.category}</span>
                <button className="mt-4 w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                  Read Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedBook(null)}
              className="mb-4 flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
            >
              ← Back to Library
            </button>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-8">
              <h3 className="text-3xl font-bold mb-2">{selectedBook.title}</h3>
              <p className="text-gray-600 mb-1">by {selectedBook.author}</p>
              <span className="inline-block bg-purple-200 text-purple-800 text-sm px-3 py-1 rounded-full mb-6">
                {selectedBook.category}
              </span>
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                  {selectedBook.content}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DoctorsTab = () => {
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const doctors = [
    { id: 1, name: "Dr. Anjali Sharma", specialty: "Clinical Psychologist", phone: "+91-98765-43210", distance: "2.5 km", rating: 4.8 },
    { id: 2, name: "Dr. Rajesh Kumar", specialty: "Psychiatrist", phone: "+91-98765-43211", distance: "3.1 km", rating: 4.7 },
    { id: 3, name: "Dr. Priya Patel", specialty: "Counseling Psychologist", phone: "+91-98765-43212", distance: "4.0 km", rating: 4.9 },
    { id: 4, name: "Dr. Amit Verma", specialty: "Mental Health Specialist", phone: "+91-98765-43213", distance: "5.2 km", rating: 4.6 }
  ];

  const handleSearch = () => {
    setSearchResults(doctors);
  };

  const initiateCall = (doctor) => {
    alert(`This feature would integrate with your phone's call app to dial ${doctor.phone}. 

In a production app, this would:
1. Request phone permissions
2. Access device call logs via native APIs
3. Initiate a call through the phone app

For web implementation, you would need:
- Backend server to handle Google Voice API
- OAuth authentication
- Proper API credentials from Google`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Mental Health Professionals</h2>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Search Nearby Doctors</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location (e.g., Mumbai, Pune)"
              className="flex-1 p-3 border-2 border-blue-300 rounded-lg"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Search
            </button>
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Available Professionals Near You</h3>
            {searchResults.map(doctor => (
              <div key={doctor.id} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800">{doctor.name}</h4>
                    <p className="text-gray-600">{doctor.specialty}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>📍 {doctor.distance} away</span>
                      <span>⭐ {doctor.rating}/5.0</span>
                    </div>
                  </div>
                  <button
                    onClick={() => initiateCall(doctor)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </button>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  📞 {doctor.phone}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>🔔 Integration Note:</strong> This feature demonstrates the UI for doctor consultation.
          </p>
          <p className="text-sm text-gray-700">
            <strong>To fully implement:</strong>
            <br />• Backend API to fetch real doctor data from healthcare databases
            <br />• Google API integration for call logs (requires OAuth + backend)
            <br />• Native mobile app permissions for direct calling
            <br />• Integration with appointment booking systems
          </p>
        </div>
      </div>
    </div>
  );
};

const ProgressTab = ({ moodData }) => {
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return days;
  };

  const getMoodForDay = (dayLabel) => {
    const entry = moodData.find(m => {
      const date = new Date(m.timestamp);
      const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return label === dayLabel;
    });
    return entry ? entry.mood : 0;
  };

  const days = getLast7Days();
  const maxMood = 5;

  const averageMood = moodData.length > 0
    ? (moodData.reduce((sum, m) => sum + m.mood, 0) / moodData.length).toFixed(1)
    : 0;

  const improvement = moodData.length >= 2
    ? ((moodData[moodData.length - 1].mood - moodData[0].mood) / moodData[0].mood * 100).toFixed(0)
    : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Progress</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-purple-200">
            <p className="text-gray-600 mb-2">Average Mood</p>
            <p className="text-4xl font-bold text-purple-600">{averageMood}/5</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200">
            <p className="text-gray-600 mb-2">Total Check-ins</p>
            <p className="text-4xl font-bold text-green-600">{moodData.length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
            <p className="text-gray-600 mb-2">Improvement</p>
            <p className="text-4xl font-bold text-blue-600">{improvement > 0 ? '+' : ''}{improvement}%</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-6">7-Day Mood Trend</h3>
          <div className="flex items-end justify-between gap-2 h-64">
            {days.map(day => {
              const mood = getMoodForDay(day);
              const height = (mood / maxMood) * 100;
              return (
                <div key={day} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '100%' }}>
                    {mood > 0 && (
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg transition-all"
                        style={{ height: `${height}%` }}
                      >
                        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-bold text-purple-600">
                          {mood}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center">{day}</p>
                </div>
              );
            })}
          </div>
        </div>

        {moodData.length === 0 && (
          <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
            <p className="text-gray-700">Start tracking your mood daily to see your progress over time!</p>
          </div>
        )}

        <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h4 className="font-semibold text-green-800 mb-2">🎉 Keep Going!</h4>
          <p className="text-gray-700">
            Consistent mood tracking helps you understand patterns and celebrate progress. Even small improvements matter!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MindEaseApp;