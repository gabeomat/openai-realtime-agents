import { tool } from "@openai/agents/realtime";
import { z } from "zod";

// Tool for creating personalized action plans
export const createActionPlan = tool({
  name: "createActionPlan",
  description: "Creates a structured, step-by-step action plan for achieving a specific goal, formatted like a coach's game plan.",
  parameters: z.object({
    goal: z.string().describe("The specific goal or challenge the person wants to address"),
    timeframe: z.string().describe("The timeframe for achieving this goal (e.g., '30 days', '3 months', 'this week')"),
    currentSituation: z.string().describe("Brief description of where they are now"),
    keyObstacles: z.array(z.string()).describe("Main obstacles or challenges they're facing"),
  }),
  execute: async ({ goal, timeframe, currentSituation, keyObstacles }) => {
    // This would typically connect to a more sophisticated planning system
    // For now, we'll return a structured response that the coach can build upon
    return `
ACTION PLAN CREATED:
Goal: ${goal}
Timeframe: ${timeframe}
Starting Point: ${currentSituation}

Key Obstacles Identified:
${keyObstacles.map((obstacle, index) => `${index + 1}. ${obstacle}`).join('\n')}

This plan has been structured and is ready for the coach to provide specific steps and strategies.
    `;
  },
});

// Tool for tracking progress and celebrating wins
export const trackProgress = tool({
  name: "trackProgress",
  description: "Tracks progress on goals and identifies wins to celebrate, no matter how small.",
  parameters: z.object({
    goal: z.string().describe("The goal being tracked"),
    progressUpdate: z.string().describe("What progress has been made"),
    challengesFaced: z.array(z.string()).describe("Any challenges encountered"),
    nextSteps: z.array(z.string()).describe("Identified next steps"),
  }),
  execute: async ({ goal, progressUpdate, challengesFaced, nextSteps }) => {
    return `
PROGRESS TRACKED:
Goal: ${goal}
Progress Made: ${progressUpdate}

Challenges Faced:
${challengesFaced.map((challenge, index) => `${index + 1}. ${challenge}`).join('\n')}

Next Steps:
${nextSteps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

Progress logged - ready for coach feedback and next phase planning.
    `;
  },
});

// Tool for accessing coaching methodologies and frameworks
export const getCoachingFramework = tool({
  name: "getCoachingFramework",
  description: "Retrieves specific coaching frameworks, methodologies, or structured approaches for different types of challenges.",
  parameters: z.object({
    challengeType: z.enum([
      "goal_setting",
      "overcoming_obstacles", 
      "building_confidence",
      "developing_resilience",
      "time_management",
      "habit_formation",
      "mindset_shift",
      "performance_improvement"
    ]).describe("The type of challenge or area where coaching framework is needed"),
    specificContext: z.string().describe("Specific context or details about the situation"),
  }),
  execute: async ({ challengeType, specificContext }) => {
    // This would typically access a knowledge base of coaching methodologies
    // For now, we'll return a framework structure that the coach can expand upon
    const frameworks = {
      goal_setting: "SMART Goals + Underdog Method: Specific, Measurable, Achievable, Relevant, Time-bound + Belief, Grit, Action",
      overcoming_obstacles: "The Hockey Mindset: Identify the obstacle, Find the gap, Practice the skill, Execute under pressure",
      building_confidence: "Evidence-Based Confidence: Past wins + Current capabilities + Future preparation = Unshakeable belief",
      developing_resilience: "Bounce-Back Protocol: Acknowledge the hit, Learn from it, Adjust strategy, Get back on the ice",
      time_management: "Sprint Method: High-intensity focused work + Strategic recovery + Consistent daily progress",
      habit_formation: "The 1% Rule: Small daily improvements + Consistency + Tracking = Massive long-term results",
      mindset_shift: "Reframe Protocol: Current story + New perspective + Evidence gathering + New story creation",
      performance_improvement: "Game Tape Analysis: Current performance + Gap identification + Skill development + Practice + Execute"
    };

    return `
COACHING FRAMEWORK: ${frameworks[challengeType]}
Context: ${specificContext}

Framework ready for application and customization to specific situation.
    `;
  },
});

// Tool for sharing relevant personal stories and experiences
export const shareCoachingStory = tool({
  name: "shareCoachingStory",
  description: "Retrieves relevant personal stories, hockey experiences, or coaching anecdotes that relate to the person's situation.",
  parameters: z.object({
    situationType: z.enum([
      "facing_rejection",
      "overcoming_doubt", 
      "dealing_with_failure",
      "building_skills",
      "staying_motivated",
      "handling_pressure",
      "making_comebacks",
      "team_dynamics",
      "personal_growth"
    ]).describe("The type of situation where a relevant story would be helpful"),
    personContext: z.string().describe("Brief context about the person's specific situation"),
  }),
  execute: async ({ situationType, personContext }) => {
    // This would typically access a database of personal stories and experiences
    // For now, we'll return a story framework that the coach can tell
    const storyTypes = {
      facing_rejection: "The Draft Day Story - Being passed over multiple times but using each rejection as fuel",
      overcoming_doubt: "The Size Doesn't Matter Story - Proving scouts wrong about being 'too small'",
      dealing_with_failure: "The Worst Game Ever Story - Learning from the game that almost ended my career",
      building_skills: "The Summer Training Story - Outworking everyone when no one was watching",
      staying_motivated: "The Bench Warmer Story - Finding purpose even when not playing",
      handling_pressure: "The Playoff Moment Story - Performing when everything was on the line",
      making_comebacks: "The Injury Recovery Story - Coming back stronger after being told I might not play again",
      team_dynamics: "The Assist Story - Learning that making others better makes you better",
      personal_growth: "The Retirement Transition Story - Finding new purpose after hockey"
    };

    return `
RELEVANT STORY: ${storyTypes[situationType]}
Person's Context: ${personContext}

Story framework ready for personalized telling that connects to their specific situation.
    `;
  },
});

// import { knowledgeTools } from "./knowledgeTools"; // Temporarily disabled

export const coachingTools = [
  createActionPlan,
  trackProgress,
  getCoachingFramework,
  shareCoachingStory,
  // All knowledge tools temporarily removed
];