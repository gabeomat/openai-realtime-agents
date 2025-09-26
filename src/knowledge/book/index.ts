// Mike's Book Content - Structured Knowledge Base
// This file will contain the structured content from Mike's book

import { KnowledgeChunk } from '../index';

// Book metadata
export const bookMetadata = {
  title: "Mike's Coaching Book", // Replace with actual title
  author: "Mike", // Replace with full name
  chapters: [
    // Will be populated with actual chapter structure
  ],
  keyThemes: [
    "mindset",
    "goal-setting", 
    "resilience",
    "hard-work",
    "belief",
    "overcoming-obstacles"
  ]
};

// Sample structure - replace with actual book content
export const bookChunks: KnowledgeChunk[] = [
  // Example structure - replace with actual content
  {
    id: "book-intro-001",
    content: "Sample content from book introduction about the underdog mindset...",
    source: "book",
    chapter: "Introduction",
    topic: "mindset",
    framework: "underdog-mindset",
    keywords: ["underdog", "mindset", "belief", "determination"],
    confidence: 1.0
  },
  {
    id: "book-ch1-001", 
    content: "Sample content about goal setting and the importance of believing in yourself...",
    source: "book",
    chapter: "Chapter 1",
    topic: "goal-setting",
    framework: "belief-based-goals",
    keywords: ["goals", "belief", "planning", "vision"],
    confidence: 1.0
  }
  // Add more chunks as you process the book content
];

// Key concepts from the book
export const bookConcepts = {
  "underdog-mindset": {
    definition: "The mental framework of someone who succeeds despite being underestimated",
    keyPrinciples: [
      "Use doubt as fuel",
      "Outwork the competition", 
      "Believe when others don't",
      "Turn obstacles into opportunities"
    ],
    source: "book-chapter-1"
  },
  "grit-over-talent": {
    definition: "The principle that persistent effort matters more than natural ability",
    keyPrinciples: [
      "Talent gets you noticed, grit gets results",
      "Practice with purpose",
      "Embrace the grind",
      "Consistency beats intensity"
    ],
    source: "book-chapter-3"
  }
  // Add more concepts as you extract them from the book
};

// Mike's personal stories from the book
export const bookStories = [
  {
    id: "draft-day-rejection",
    title: "The Draft Day That Changed Everything",
    content: "Sample story about being passed over in the draft...",
    lesson: "Every rejection is redirection toward your true path",
    framework: "failure-as-fuel",
    keywords: ["rejection", "draft", "perseverance", "redirection"]
  },
  {
    id: "size-doesnt-matter",
    title: "Too Small to Play",
    content: "Sample story about being told he was too small for hockey...",
    lesson: "Your limitations are often other people's assumptions",
    framework: "overcoming-limitations", 
    keywords: ["size", "limitations", "assumptions", "proving-doubters-wrong"]
  }
  // Add more stories as you extract them from the book
];

// Exercises and actionable content from the book
export const bookExercises = [
  {
    id: "belief-audit",
    title: "Personal Belief Audit",
    description: "Exercise to identify and strengthen core beliefs",
    steps: [
      "List your current goals",
      "Rate your belief level (1-10) for each goal", 
      "Identify evidence that supports higher belief",
      "Create daily affirmations based on evidence"
    ],
    framework: "belief-building",
    source: "book-chapter-2"
  }
  // Add more exercises from the book
];

// Function to get all book content as knowledge chunks
export function getBookKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [...bookChunks];
  
  // Convert concepts to chunks
  Object.entries(bookConcepts).forEach(([key, concept]) => {
    chunks.push({
      id: `book-concept-${key}`,
      content: `${concept.definition}\n\nKey Principles:\n${concept.keyPrinciples.join('\n')}`,
      source: "book",
      topic: "concepts",
      framework: key,
      keywords: [key, ...concept.keyPrinciples.map(p => p.toLowerCase())],
      confidence: 1.0
    });
  });
  
  // Convert stories to chunks
  bookStories.forEach(story => {
    chunks.push({
      id: `book-story-${story.id}`,
      content: `${story.content}\n\nLesson: ${story.lesson}`,
      source: "book",
      topic: "stories",
      framework: story.framework,
      keywords: story.keywords,
      confidence: 1.0
    });
  });
  
  // Convert exercises to chunks
  bookExercises.forEach(exercise => {
    chunks.push({
      id: `book-exercise-${exercise.id}`,
      content: `${exercise.description}\n\nSteps:\n${exercise.steps.join('\n')}`,
      source: "book", 
      topic: "exercises",
      framework: exercise.framework,
      keywords: [exercise.title.toLowerCase(), ...exercise.steps.map(s => s.toLowerCase())],
      confidence: 1.0
    });
  });
  
  return chunks;
}