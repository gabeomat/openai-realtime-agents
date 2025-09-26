import { tool } from "@openai/agents/realtime";
import { z } from "zod";
import { mikeKnowledge } from "../../../knowledge";

// Tool for searching Mike's knowledge base
export const searchMikeKnowledge = tool({
  name: "searchMikeKnowledge",
  description: "Search Mike's book, course, and methodology content for specific information. Only use this for questions about Mike's specific teachings, frameworks, and approaches.",
  parameters: z.object({
    query: z.string().describe("The specific question or topic to search for in Mike's content"),
    source: z.enum(["book", "course", "methodology", "story"]).nullable().describe("Limit search to specific source if known"),
    topic: z.string().nullable().describe("Specific topic area if known (e.g., 'goal-setting', 'mindset', 'resilience')"),
  }),
  execute: async ({ query, source, topic }) => {
    // Validate that the query is within Mike's scope
    const isInScope = mikeKnowledge.isWithinScope(query);
    console.log(`🎯 Scope check for "${query}": ${isInScope}`);
    
    if (!isInScope) {
      return `I can only discuss Mike's specific teachings and methodologies. The question "${query}" appears to be outside of Mike's content area. Please ask about Mike's frameworks, stories, or approaches from his book and course.`;
    }

    try {
      const searchResults = await mikeKnowledge.search(query, {
        source,
        topic,
        limit: 3,
        minConfidence: 0.5 // Lowered to catch more results
      });
      
      console.log(`🔍 Search for "${query}" found ${searchResults.chunks.length} chunks:`, 
        searchResults.chunks.map(c => ({ 
          id: c.id.substring(0, 8), 
          confidence: c.confidence, 
          contentLength: c.content.length,
          preview: c.content.substring(0, 50) + '...'
        })));

      if (searchResults.chunks.length === 0) {
        return `I couldn't find specific information about "${query}" in Mike's content. This might be outside of Mike's documented teachings, or you might want to rephrase your question. I can help with topics like mindset, goal-setting, resilience, overcoming obstacles, and Mike's personal stories.`;
      }

      // Format the results for the coach to use
      let response = `Found ${searchResults.chunks.length} relevant pieces from Mike's content:\n\n`;
      
      searchResults.chunks.forEach((chunk, index) => {
        response += `${index + 1}. From ${chunk.source}${chunk.chapter ? ` - ${chunk.chapter}` : ''}${chunk.module ? ` - ${chunk.module}` : ''}:\n`;
        response += `${chunk.content}\n`;
        if (chunk.framework) {
          response += `Framework: ${chunk.framework}\n`;
        }
        response += `\n`;
      });

      return response;
    } catch (error) {
      console.error(`❌ Error searching Mike's content for "${query}":`, error);
      return `I encountered an issue searching Mike's content: ${error instanceof Error ? error.message : 'Unknown error'}. Please try rephrasing your question or ask about a specific topic from Mike's book or course.`;
    }
  },
});

// Tool for getting specific frameworks from Mike's methodology
export const getMikeFramework = tool({
  name: "getMikeFramework",
  description: "Retrieve a specific framework or methodology that Mike teaches. Use this when you need to explain one of Mike's structured approaches.",
  parameters: z.object({
    frameworkName: z.string().describe("The name of Mike's framework (e.g., 'underdog-mindset', 'grit-goal-setting', 'belief-building')"),
  }),
  execute: async ({ frameworkName }) => {
    try {
      const frameworkContent = await mikeKnowledge.getFramework(frameworkName);
      
      if (frameworkContent.length === 0) {
        const availableFrameworks = await mikeKnowledge.getFrameworks();
        return `I couldn't find the framework "${frameworkName}" in Mike's content. Available frameworks include: ${availableFrameworks.join(', ')}`;
      }

      let response = `Mike's ${frameworkName} Framework:\n\n`;
      frameworkContent.forEach(chunk => {
        response += `${chunk.content}\n\n`;
      });

      return response;
    } catch (error) {
      return `I encountered an issue retrieving the framework "${frameworkName}". Please try again or ask for a list of available frameworks.`;
    }
  },
});

// Tool for getting Mike's personal stories
export const getMikeStory = tool({
  name: "getMikeStory", 
  description: "Retrieve one of Mike's personal stories that relates to a specific situation or lesson. Use this to share relevant experiences from Mike's journey.",
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
    ]).describe("The type of situation where Mike's story would be relevant"),
    context: z.string().describe("Brief context about the person's specific situation to find the most relevant story"),
  }),
  execute: async ({ situationType, context }) => {
    try {
      const storyResults = await mikeKnowledge.search(`${situationType} story personal experience`, {
        source: "story",
        limit: 2
      });

      if (storyResults.chunks.length === 0) {
        return `I don't have a specific story from Mike about ${situationType} in the knowledge base yet. You can share a general coaching response based on Mike's principles of grit, belief, and perseverance.`;
      }

      let response = `Here's a relevant story from Mike's experience:\n\n`;
      response += storyResults.chunks[0].content;
      response += `\n\nThis story relates to your situation: ${context}`;

      return response;
    } catch (error) {
      return `I encountered an issue finding Mike's story about ${situationType}. You can proceed with general coaching based on Mike's core principles.`;
    }
  },
});

// Tool for validating if a topic is within Mike's scope
export const validateScope = tool({
  name: "validateScope",
  description: "Check if a question or topic is within Mike's documented teachings and methodology. Use this before providing advice to ensure you stay within Mike's IP.",
  parameters: z.object({
    topic: z.string().describe("The topic or question to validate against Mike's content"),
  }),
  execute: async ({ topic }) => {
    const isInScope = mikeKnowledge.isWithinScope(topic);
    const availableTopics = await mikeKnowledge.getTopics();
    
    if (isInScope) {
      return `✅ "${topic}" is within Mike's scope. Available related topics: ${availableTopics.join(', ')}`;
    } else {
      return `❌ "${topic}" appears to be outside Mike's documented content. Please redirect to topics Mike covers: ${availableTopics.join(', ')}`;
    }
  },
});

// Export all knowledge tools
export const knowledgeTools = [
  searchMikeKnowledge,
  getMikeFramework, 
  getMikeStory,
  validateScope,
];