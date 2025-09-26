import { RealtimeAgent } from "@openai/agents/realtime";
import { underdogCoachInstructions } from "./instructions";
import { createActionPlan, trackProgress, getCoachingFramework, shareCoachingStory } from "./tools";
import { simpleKnowledgeTools } from "./simpleKnowledgeTools";

export const underdogCoach = new RealtimeAgent({
  name: "The Underdog Coach",
  model: "gpt-4o-realtime-preview",
  instructions: underdogCoachInstructions,
  tools: [
    createActionPlan, 
    trackProgress, 
    getCoachingFramework, 
    shareCoachingStory,
    ...simpleKnowledgeTools // Add simplified knowledge tools
  ],
  voice: "alloy", // Warm, confident voice that matches the coaching personality
  temperature: 0.7, // Balanced creativity for natural coaching responses
  max_response_output_tokens: 4096,
});

export default underdogCoach;