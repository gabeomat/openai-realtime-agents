// Mike's Course Content - Structured Knowledge Base
// This file will contain the structured content from Mike's course

import { KnowledgeChunk } from '../index';

// Course metadata
export const courseMetadata = {
  title: "Mike's Coaching Course", // Replace with actual title
  instructor: "Mike", // Replace with full name
  modules: [
    // Will be populated with actual module structure
  ],
  keyOutcomes: [
    "Develop unshakeable self-belief",
    "Create actionable goal plans",
    "Build resilience through setbacks",
    "Master the underdog mindset"
  ]
};

// Sample structure - replace with actual course content
export const courseChunks: KnowledgeChunk[] = [
  // Example structure - replace with actual content
  {
    id: "course-mod1-001",
    content: "Sample content from Module 1 about foundations of the underdog mindset...",
    source: "course",
    module: "Module 1: Foundations",
    topic: "mindset",
    framework: "underdog-foundations",
    keywords: ["foundations", "mindset", "underdog", "basics"],
    confidence: 1.0
  },
  {
    id: "course-mod2-001",
    content: "Sample content from Module 2 about goal setting with the underdog approach...",
    source: "course", 
    module: "Module 2: Goal Setting",
    topic: "goal-setting",
    framework: "underdog-goal-setting",
    keywords: ["goals", "planning", "strategy", "underdog-approach"],
    confidence: 1.0
  }
  // Add more chunks as you process the course content
];

// Course modules structure
export const courseModules = {
  "module-1-foundations": {
    title: "Foundations of the Underdog Mindset",
    description: "Building the mental framework for success against the odds",
    lessons: [
      "Understanding the underdog advantage",
      "Reframing limitations as strengths", 
      "Building unshakeable self-belief",
      "The power of proving doubters wrong"
    ],
    keyTakeaways: [
      "Your biggest disadvantage can become your greatest strength",
      "Belief is a skill that can be developed",
      "External doubt fuels internal fire"
    ]
  },
  "module-2-goal-setting": {
    title: "Goal Setting the Underdog Way",
    description: "Creating goals that inspire action and build momentum",
    lessons: [
      "Beyond SMART goals: Adding grit and belief",
      "Breaking down impossible dreams",
      "Creating accountability systems",
      "Measuring progress vs. perfection"
    ],
    keyTakeaways: [
      "Goals without belief are just wishes",
      "Small wins build unstoppable momentum", 
      "Progress beats perfection every time"
    ]
  }
  // Add more modules as you structure the course
};

// Course exercises and assignments
export const courseExercises = [
  {
    id: "underdog-story-mapping",
    module: "Module 1",
    title: "Your Underdog Story Mapping",
    description: "Identify and reframe your personal underdog experiences",
    instructions: [
      "List 3 times you were underestimated or counted out",
      "Identify what you learned from each experience",
      "Rewrite each story as a strength-building moment",
      "Create your personal underdog narrative"
    ],
    framework: "story-reframing",
    timeRequired: "30 minutes"
  },
  {
    id: "belief-building-plan",
    module: "Module 2", 
    title: "90-Day Belief Building Plan",
    description: "Create a systematic approach to building unshakeable belief in your goals",
    instructions: [
      "Choose one major goal you want to achieve",
      "Rate your current belief level (1-10)",
      "Identify 5 pieces of evidence that support your capability",
      "Create daily practices to reinforce belief",
      "Set weekly belief check-ins"
    ],
    framework: "belief-building",
    timeRequired: "45 minutes"
  }
  // Add more exercises from the course
];

// Course frameworks and methodologies
export const courseFrameworks = {
  "underdog-advantage-formula": {
    name: "The Underdog Advantage Formula",
    description: "Mike's signature framework for turning disadvantages into strengths",
    components: [
      "Identify the perceived limitation",
      "Find the hidden advantage within the limitation", 
      "Develop strategies that leverage the advantage",
      "Use doubt as fuel for extraordinary effort",
      "Prove the doubters wrong through results"
    ],
    application: "Use when facing any form of disadvantage or limitation"
  },
  "grit-goal-setting": {
    name: "Grit-Based Goal Setting",
    description: "Goal setting methodology that emphasizes persistence over perfection",
    components: [
      "Set the impossible dream (long-term vision)",
      "Break into believable milestones (medium-term)",
      "Create daily non-negotiables (short-term)",
      "Build feedback loops for course correction",
      "Celebrate progress, not just outcomes"
    ],
    application: "Use for any significant goal or life change"
  }
  // Add more frameworks from the course
};

// Function to get all course content as knowledge chunks
export function getCourseKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [...courseChunks];
  
  // Convert modules to chunks
  Object.entries(courseModules).forEach(([key, module]) => {
    chunks.push({
      id: `course-module-${key}`,
      content: `${module.description}\n\nLessons:\n${module.lessons.join('\n')}\n\nKey Takeaways:\n${module.keyTakeaways.join('\n')}`,
      source: "course",
      module: module.title,
      topic: "modules",
      framework: key,
      keywords: [key, ...module.lessons.map(l => l.toLowerCase())],
      confidence: 1.0
    });
  });
  
  // Convert exercises to chunks
  courseExercises.forEach(exercise => {
    chunks.push({
      id: `course-exercise-${exercise.id}`,
      content: `${exercise.description}\n\nInstructions:\n${exercise.instructions.join('\n')}\n\nTime Required: ${exercise.timeRequired}`,
      source: "course",
      module: exercise.module,
      topic: "exercises",
      framework: exercise.framework,
      keywords: [exercise.title.toLowerCase(), ...exercise.instructions.map(i => i.toLowerCase())],
      confidence: 1.0
    });
  });
  
  // Convert frameworks to chunks
  Object.entries(courseFrameworks).forEach(([key, framework]) => {
    chunks.push({
      id: `course-framework-${key}`,
      content: `${framework.description}\n\nComponents:\n${framework.components.join('\n')}\n\nApplication: ${framework.application}`,
      source: "course",
      topic: "frameworks",
      framework: key,
      keywords: [key, ...framework.components.map(c => c.toLowerCase())],
      confidence: 1.0
    });
  });
  
  return chunks;
}