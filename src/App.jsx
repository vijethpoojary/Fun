import React, { useMemo, useState } from "react";
import QuestionCard from "./components/QuestionCard.jsx";

const QUESTIONS = [
  {
    type: "text",
    prompt: "Erna Puder dade",
    answer: "Apulu",
    incorrectMessage: "Undu atth , Yan deethina puder dade👊",
    revealMessage: "Correct answer Apulu' 😌",
    successMessage: "Ushar jojja😘",
  },
  {
    type: "text",
    prompt: "What makes Viju happy?",
    answer: "Cheepeda",
    incorrectMessage: "Undu atth 😏🤷‍♂️",
    revealMessage: "correct answer Cheepeda😔",
    successMessage: "Ushar jojja Korle cheepeda🥳",
  },
  {
    type: "yesno",
    prompt: "Enk cheepeda korpara ?",
    successMessage: "Ende dethonle 🥳🥳🥳🥳...",
  },
  {
    type: "imageOnlyYes",
    prompt: "Do you want to know two lover monkeys ?",
    successMessage: "Tule tule enchundu rudla😃",
    imageSrc: "/lover-monkeys.jpg",
    imageAlt: "Two lover monkeys",
  },
  {
    type: "messageOnlyYes",
    prompt: "do you know one thing ?",
    successMessage: "My heart says this always ❤️",
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attemptsByQuestion, setAttemptsByQuestion] = useState(() =>
    QUESTIONS.map(() => 0)
  );
  const [inputByQuestion, setInputByQuestion] = useState(() =>
    QUESTIONS.map(() => "")
  );
  const [feedbackByQuestion, setFeedbackByQuestion] = useState(() =>
    QUESTIONS.map(() => "")
  );
  const [resolvedByQuestion, setResolvedByQuestion] = useState(() =>
    QUESTIONS.map(() => false)
  );
  const [giftOpenByQuestion, setGiftOpenByQuestion] = useState(() =>
    QUESTIONS.map(() => false)
  );
  const [kissBurstByQuestion, setKissBurstByQuestion] = useState(() =>
    QUESTIONS.map(() => [])
  );
  const [imageShownByQuestion, setImageShownByQuestion] = useState(() =>
    QUESTIONS.map(() => false)
  );
  const [loveCardsByQuestion, setLoveCardsByQuestion] = useState(() =>
    QUESTIONS.map(() => [])
  );
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = useMemo(
    () => QUESTIONS[currentQuestionIndex],
    [currentQuestionIndex]
  );

  const normalize = (value) => value.trim().toLowerCase();

  const handleSubmit = () => {
    if (isComplete) {
      return;
    }

    if (currentQuestion.type !== "text") {
      return;
    }

    const inputValue = inputByQuestion[currentQuestionIndex];
    const attempts = attemptsByQuestion[currentQuestionIndex];
    const isCorrect =
      normalize(inputValue) === normalize(currentQuestion.answer);

    if (isCorrect) {
      setFeedbackByQuestion((prev) => {
        const next = [...prev];
        next[currentQuestionIndex] = currentQuestion.successMessage;
        return next;
      });
      setResolvedByQuestion((prev) => {
        const next = [...prev];
        next[currentQuestionIndex] = true;
        return next;
      });
      return;
    }

    const nextAttempts = attempts + 1;
    setAttemptsByQuestion((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = nextAttempts;
      return next;
    });

    if (nextAttempts >= 2) {
      setFeedbackByQuestion((prev) => {
        const next = [...prev];
        next[currentQuestionIndex] = currentQuestion.revealMessage;
        return next;
      });
      setResolvedByQuestion((prev) => {
        const next = [...prev];
        next[currentQuestionIndex] = true;
        return next;
      });
      return;
    }

    setFeedbackByQuestion((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = currentQuestion.incorrectMessage;
      return next;
    });
  };

  const handleInputChange = (value) => {
    if (currentQuestion.type === "yesno") {
      return;
    }
    setInputByQuestion((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = value;
      return next;
    });
  };

  const canGoPrev = currentQuestionIndex > 0 && !isComplete;
  const canGoNext = resolvedByQuestion[currentQuestionIndex] && !isComplete;

  const handlePrev = () => {
    if (!canGoPrev) return;
    setCurrentQuestionIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    if (!canGoNext) return;

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= QUESTIONS.length) {
      setIsComplete(true);
      return;
    }
    setCurrentQuestionIndex(nextIndex);
  };

  const createKissBurst = (count = 220) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      left: Math.random() * 100,
      size: 14 + Math.random() * 18,
      delay: Math.random() * 0.12,
      duration: 2.2 + Math.random() * 2.1,
      drift: (Math.random() - 0.5) * 80,
      opacity: 0.65 + Math.random() * 0.35,
    }));
  };

  const createLoveCards = (count = 24) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `love-${Date.now()}-${i}`,
      left: 5 + Math.random() * 90,
      top: 8 + Math.random() * 84,
      rotate: (Math.random() - 0.5) * 14,
      delay: Math.random() * 0.35,
      duration: 3.8 + Math.random() * 1.8,
      scale: 0.9 + Math.random() * 0.35,
    }));
  };

  const handleYes = () => {
    if (isComplete) return;
    if (
      currentQuestion.type !== "yesno" &&
      currentQuestion.type !== "imageOnlyYes" &&
      currentQuestion.type !== "messageOnlyYes"
    ) {
      return;
    }

    setFeedbackByQuestion((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = currentQuestion.successMessage || "Yes ❤️";
      return next;
    });

    if (currentQuestion.type === "yesno") {
      setGiftOpenByQuestion((prev) => {
        const next = [...prev];
        next[currentQuestionIndex] = true;
        return next;
      });

      const burst = createKissBurst(260);
      setKissBurstByQuestion((prev) => {
        const next = [...prev];
        next[currentQuestionIndex] = burst;
        return next;
      });
    }

    if (currentQuestion.type === "imageOnlyYes") {
      setImageShownByQuestion((prev) => {
        const next = [...prev];
        next[currentQuestionIndex] = true;
        return next;
      });
    }

    if (currentQuestion.type === "messageOnlyYes") {
      const questionIdx = currentQuestionIndex;
      const cards = createLoveCards(28);
      setLoveCardsByQuestion((prev) => {
        const next = [...prev];
        next[questionIdx] = cards;
        return next;
      });

      window.setTimeout(() => {
        setLoveCardsByQuestion((prev) => {
          const next = [...prev];
          next[questionIdx] = [];
          return next;
        });
        if (questionIdx === QUESTIONS.length - 1) {
          setIsComplete(true);
        }
      }, 2000);
    }

    setResolvedByQuestion((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = true;
      return next;
    });

    window.setTimeout(() => {
      setKissBurstByQuestion((prev) => {
        const next = [...prev];
        next[currentQuestionIndex] = [];
        return next;
      });
    }, 5200);
  };

  const handleNo = () => {
    if (isComplete) return;
    if (currentQuestion.type !== "yesno") return;
    // Button behavior handled inside QuestionCard; this is just for optional feedback.
    setFeedbackByQuestion((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = "No? Hmm... try catching it 😌";
      return next;
    });
  };

  const hearts = Array.from({ length: 14 });
  const activeKisses = kissBurstByQuestion[currentQuestionIndex] || [];
  const activeLoveCards = loveCardsByQuestion[currentQuestionIndex] || [];

  return (
    <main className="app">
      {/* Put your image in public/girlfriend.jpg (or change this path) */}
      <div
        className="bg-image"
        style={{
          backgroundImage: "url('/girlfriend.jpg')",
        }}
      />

      <div className="bg-overlay" />

      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((_, index) => (
          <span
            key={index}
            className="heart"
            style={{
              left: `${(index + 1) * 7}%`,
              animationDelay: `${(index % 7) * 0.8}s`,
              animationDuration: `${6 + (index % 4)}s`,
            }}
          >
            ❤
          </span>
        ))}
      </div>

      <div className="kiss-overlay" aria-hidden="true">
        {activeKisses.map((k) => (
          <span
            key={k.id}
            className="kiss fullscreen"
            style={{
              left: `${k.left}%`,
              fontSize: `${k.size}px`,
              opacity: k.opacity,
              animationDelay: `${k.delay}s`,
              animationDuration: `${k.duration}s`,
              "--drift": `${k.drift}px`,
            }}
          >
            💋
          </span>
        ))}
      </div>

      <div className="love-card-overlay" aria-hidden="true">
        {activeLoveCards.map((card) => (
          <div
            key={card.id}
            className="love-card"
            style={{
              left: `${card.left}%`,
              top: `${card.top}%`,
              transform: `translate(-50%, -50%) rotate(${card.rotate}deg) scale(${card.scale})`,
              animationDelay: `${card.delay}s`,
              animationDuration: `${card.duration}s`,
            }}
          >
            i love you cho much bangaru , i love you cho much kinni
          </div>
        ))}
      </div>

      <section className="content">
        {!isComplete ? (
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={QUESTIONS.length}
            inputValue={inputByQuestion[currentQuestionIndex]}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            feedback={feedbackByQuestion[currentQuestionIndex]}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            onPrev={handlePrev}
            onNext={handleNext}
            onYes={handleYes}
            onNo={handleNo}
            giftOpen={giftOpenByQuestion[currentQuestionIndex]}
            imageShown={imageShownByQuestion[currentQuestionIndex]}
          />
        ) : (
          <div className="glass-card final-card final-love-page show">
            <div className="final-heart-glow" aria-hidden="true">
              <span>❤</span>
            </div>
            <p className="subtle-note">Enna muddu kinni jojja😘❤️</p>
            <h1 className="question-title">I love you cho much much enna muddu bangaru kinni bodedi😘❤️🫂🫂</h1>
            <p className="final-text">
            Appu erna babe kathondundu bega bale 😋😘❤️
            </p>
            <p className="final-text">
              i love you cho much bangaru, i love you cho much kinni 🫂🫂
            </p>
            <p className="final-sign">- Yours, always</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
