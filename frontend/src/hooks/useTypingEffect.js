// src/hooks/useTypingEffect.js
import { useState, useEffect } from 'react';

const useTypingEffect = (
  words,
  typingSpeed = 150,
  deletingSpeed = 100,
  typingDelay = 2000, // delay after the word is fully typed
  deletingDelay = 2000 // delay after the word is fully deleted
) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;

    if (!isDeleting && subIndex === words[index].length) {
      setPause(true);
      setTimeout(() => {
        setIsDeleting(true);
        setPause(false);
      }, typingDelay);
      return;
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      setPause(true);
      setTimeout(() => {
        setPause(false);
      }, deletingDelay);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index, words, typingDelay, deletingDelay, typingSpeed, deletingSpeed, pause]);

  useEffect(() => {
    const blinkTimeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(blinkTimeout);
  }, [blink]);

  return `${words[index].substring(0, subIndex)}${blink ? '|' : ' '}`;
};

export default useTypingEffect;
