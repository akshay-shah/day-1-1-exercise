import { generateQuestions } from '../questions.js';
import { writeFileSync } from 'node:fs';
const questions = generateQuestions();
if (questions.length !== 200) throw new Error(`Expected 200 questions, got ${questions.length}`);
writeFileSync('questions.json', JSON.stringify(questions, null, 2) + '\n', 'utf8');
console.log(`Wrote ${questions.length} questions to questions.json`);
