import { tool } from "@openai/agents/realtime";
import { z } from "zod";

// Simplified knowledge tool that directly uses Pinecone client
export const searchMikeKnowledge = tool({
  name: "searchMikeKnowledge",
  description: "Search Mike's book and course content for specific information about his teachings, frameworks, and approaches.",
  parameters: z.object({
    query: z.string().describe("The specific question or topic to search for in Mike's content"),
  }),
  execute: async ({ query }) => {
    console.log(`🚀 TOOL STARTED: searchMikeKnowledge with query: "${query}"`);
    
    try {
      console.log(`🌐 Calling server-side search API...`);
      
      // Use server-side API that has access to environment variables
      const response = await fetch('/api/search-knowledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`📊 Server response:`, data);
      
      if (data.success) {
        console.log(`✅ Found content, returning to agent`);
        return `Here's what Mike says about ${query}:\n\n${data.content}`;
      } else {
        console.log(`❌ No content found`);
        return data.message;
      }
      
    } catch (error) {
      console.error('Error searching Mike\'s knowledge:', error);
      return `I'm having trouble accessing Mike's knowledge base right now. Let me give you some general coaching advice based on Mike's principles of grit, belief, and perseverance.`;
    }
  },
});

export const simpleKnowledgeTools = [
  searchMikeKnowledge,
];