// Simple rhyming detection based on word endings
export function getRhymingScore(word1: string, word2: string): number {
  word1 = word1.toLowerCase();
  word2 = word2.toLowerCase();

  // Perfect rhyme (last syllable matches)
  const lastSyllable1 = getLastSyllable(word1);
  const lastSyllable2 = getLastSyllable(word2);
  if (lastSyllable1 === lastSyllable2) return 1;

  // Partial rhyme (last few letters match)
  const minLength = Math.min(word1.length, word2.length);
  let matchingEnd = 0;
  for (let i = 1; i <= minLength; i++) {
    if (word1.slice(-i) === word2.slice(-i)) {
      matchingEnd = i;
    } else {
      break;
    }
  }

  return matchingEnd / Math.max(word1.length, word2.length);
}

function getLastSyllable(word: string): string {
  const vowels = 'aeiouy';
  let lastVowelIndex = -1;

  // Find the last vowel
  for (let i = word.length - 1; i >= 0; i--) {
    if (vowels.includes(word[i])) {
      lastVowelIndex = i;
      break;
    }
  }

  if (lastVowelIndex === -1) return word;
  return word.slice(lastVowelIndex);
}