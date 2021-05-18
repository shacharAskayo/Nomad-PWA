import React, { useEffect, useState } from 'react'

export function useTypewriter(words, speed = 100, delay = 1000) {

    const [wordIndex, setwordIndex] = useState(0)
    const [wordSubIndex, setWordSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (wordIndex === words.length) return;
        if (wordSubIndex === words[wordIndex].length + 1 && !reverse) {
            setTimeout(() => {
                setReverse(true)
            }, delay);
            return;
        }

        if (wordSubIndex === 0 && reverse) {
            setReverse(false);
            console.log(wordIndex);
            setwordIndex(prev => prev === words.length - 1 ? 0 : prev + 1);
            return;
        }
        const timeout = setTimeout(() => {
            setWordSubIndex(prev => prev + (reverse ? -1 : 1));
        }, speed);

        return () => clearTimeout(timeout);
    }, [wordSubIndex, wordIndex, reverse]);

    return words[wordIndex].substring(0, wordSubIndex)
}
