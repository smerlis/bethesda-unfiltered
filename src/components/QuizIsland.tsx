import { useState, useMemo } from 'react';
import { quizQuestions } from '../data/quiz';
import { neighborhoods } from '../data/neighborhoods';
import type { Neighborhood } from '../data/neighborhoods';
import NeighborhoodCard from './NeighborhoodCard';

export default function QuizIsland() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: string, tags: string[]) => {
    const newAnswers = { ...answers, [questionId]: tags };
    setAnswers(newAnswers);

    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResults(true);
    }
  };

  const results: Neighborhood[] = useMemo(() => {
    if (!showResults) return [];

    const allTags = Object.values(answers).flat();
    if (allTags.length === 0) return neighborhoods.slice(0, 5);

    const tagCounts: Record<string, number> = {};
    allTags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });

    const scored = neighborhoods.map((n) => {
      let score = 0;
      n.tags.forEach((tag) => {
        if (tagCounts[tag]) score += tagCounts[tag];
      });
      return { neighborhood: n, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 6).map((s) => s.neighborhood);
  }, [answers, showResults]);

  const restart = () => {
    setCurrentQ(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Top Matches</h1>
          <p className="text-gray-600">
            Based on your answers, these neighborhoods are your best fit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {results.map((n) => (
            <NeighborhoodCard key={n.id} neighborhood={n} />
          ))}
        </div>

        <div className="text-center space-x-4">
          <button
            onClick={restart}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Take Quiz Again
          </button>
          <a
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-block"
          >
            Browse All Neighborhoods
          </a>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Find Your Fit</h1>
          <span className="text-sm text-gray-500">
            {currentQ + 1} of {quizQuestions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(question.id, option.tags)}
            className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-gray-700 font-medium"
          >
            {option.label}
          </button>
        ))}
      </div>

      {currentQ > 0 && (
        <button
          onClick={() => setCurrentQ(currentQ - 1)}
          className="mt-6 text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; Previous question
        </button>
      )}
    </div>
  );
}
