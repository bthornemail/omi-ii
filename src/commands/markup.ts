// Simple config type
type NGramConfig = {
    minGram: number;
    maxGram: number;
    metaTags: string[];
};

// Simple token type
type Token = {
    text: string;
    start: number;
    end: number;
};

// Check if char is letter or digit
const isTokenChar = (char: string, config: NGramConfig): boolean => {
    const isLetter = /[a-zA-Z]/.test(char);
    const isDigit = /[0-9]/.test(char);
    
    return (isLetter && config.tokenChars.includes('letter')) ||
           (isDigit && config.tokenChars.includes('digit'));
};

// Main tokenizer function
export const tokenize = (input: string, config: NGramConfig): Token[] => {
    const tokens: Token[] = [];
    let currentWord = '';
    let wordStart = 0;
    let inWord = false;
    
    // Loop through each character
    for (let i = 0; i <= input.length; i++) {
        const char = input[i] || '';
        const isValid = isTokenChar(char, config);
        
        if (isValid) {
            // Start or continue word
            if (!inWord) {
                inWord = true;
                wordStart = i;
            }
            currentWord += char;
        } else {
            // End of word - generate n-grams
            if (inWord && currentWord.length > 0) {
                const maxN = Math.min(config.maxGram, currentWord.length);
                const minN = Math.min(config.minGram, currentWord.length);
                
                for (let n = minN; n <= maxN; n++) {
                    tokens.push({
                        text: currentWord.substring(0, n),
                        start: wordStart,
                        end: wordStart + n
                    });
                }
                
                currentWord = '';
                inWord = false;
            }
        }
    }
    
    return tokens;
};

// Usage
const config: NGramConfig = {
    minGram: 2,
    maxGram: 10,
    tokenChars: ['letter', 'digit']
};

const result = tokenize("Hello world 123!", config);
console.log(result);
// [
//   { text: 'He', start: 0, end: 2 },
//   { text: 'Hel', start: 0, end: 3 },
//   { text: 'Hell', start: 0, end: 4 },
//   { text: 'Hello', start: 0, end: 5 },
//   { text: 'wo', start: 6, end: 8 },
//   { text: 'wor', start: 6, end: 9 },
//   { text: 'worl', start: 6, end: 10 },
//   { text: 'world', start: 6, end: 11 },
//   { text: '12', start: 12, end: 14 },
//   { text: '123', start: 12, end: 15 }
// ];
