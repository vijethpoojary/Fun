import React, { useEffect, useMemo, useState } from "react";

function QuestionCard({
  question,
  inputValue,
  onInputChange,
  onSubmit,
  feedback,
  canGoNext,
  canGoPrev,
  onNext,
  onPrev,
  onYes,
  onNo,
  giftOpen,
  imageShown,
  questionNumber,
  totalQuestions,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [noDisabled, setNoDisabled] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [noJitter, setNoJitter] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 60);
    return () => clearTimeout(timer);
  }, [question]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  const isTextQuestion = question?.type === "text";
  const isYesNo = question?.type === "yesno";
  const isImageOnlyYes = question?.type === "imageOnlyYes";
  const isSingleYesQuestion =
    question?.type === "imageOnlyYes" || question?.type === "messageOnlyYes";

  const noStyle = useMemo(
    () => ({
      transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
    }),
    [noOffset]
  );

  const dodgeNo = () => {
    if (noDisabled) return;
    const x = (Math.random() - 0.5) * 180;
    const y = (Math.random() - 0.5) * 90;
    setNoOffset({ x, y });
    setNoDisabled(true);
    setNoJitter((n) => n + 1);
    window.setTimeout(() => setNoDisabled(false), 800);
  };

  const handleNoClick = () => {
    if (noDisabled) return;
    onNo?.();
    dodgeNo();
  };

  const handleNoHover = () => {
    // Extra playful: if they chase it, it dodges.
    if (noJitter < 2) dodgeNo();
  };

  return (
    <div className={`glass-card question-card ${isVisible ? "show" : ""}`}>
      <p className="subtle-note">Onjonji Answer malth submit click malpule , bokka next click malpule 😃</p>
      <p className="question-count">
        Question {questionNumber} / {totalQuestions}
      </p>

      <h1 className="question-title">{question.prompt}</h1>

      <form onSubmit={handleSubmit} className="answer-form">
        {isTextQuestion ? (
          <input
            type="text"
            className="romantic-input"
            value={inputValue}
            onChange={(event) => onInputChange(event.target.value)}
            placeholder="Type your answer..."
            autoFocus
          />
        ) : isYesNo ? (
          <div className="yesno-wrap">
            <button
              type="button"
              className="romantic-button yes"
              onClick={onYes}
              disabled={canGoNext}
            >
              Yes 💗
            </button>

            <button
              type="button"
              className="romantic-button no"
              onClick={handleNoClick}
              onMouseEnter={handleNoHover}
              disabled={noDisabled || canGoNext}
              style={noStyle}
            >
              No
            </button>
          </div>
        ) : isSingleYesQuestion ? (
          <div className="yes-only-wrap">
            <button
              type="button"
              className="romantic-button yes"
              onClick={onYes}
              disabled={canGoNext}
            >
              Yes 💗
            </button>
          </div>
        ) : (
          <div />
        )}

        <div className="button-row">
          <button type="button" className="romantic-button ghost" onClick={onPrev} disabled={!canGoPrev}>
            Previous
          </button>

          {isTextQuestion ? (
            <button type="submit" className="romantic-button">
              Submit ❤️
            </button>
          ) : (
            <div />
          )}

          <button type="button" className="romantic-button" onClick={onNext} disabled={!canGoNext}>
            Next
          </button>
        </div>
      </form>

      {isYesNo && (
        <div className={`gift-stage ${giftOpen ? "open" : ""}`} aria-hidden="true">
          <div className="gift">
            <div className="gift-lid" />
            <div className="gift-box" />
            <div className="gift-ribbon" />
          </div>
        </div>
      )}

      {isImageOnlyYes && imageShown && (
        <div className="reveal-image-wrap">
          <img
            src={question.imageSrc}
            alt={question.imageAlt || "Lover monkeys"}
            className="reveal-image"
          />
        </div>
      )}

      <p className={`feedback ${feedback ? "visible" : ""}`}>
        {feedback || " "}
      </p>
    </div>
  );
}

export default QuestionCard;
