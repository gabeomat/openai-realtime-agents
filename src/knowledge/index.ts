// Knowledge Base Index for Mike's Digital Twin Coach
// This file provides the main interface for accessing Mike's intellectual property

export interface KnowledgeChunk {
  id: string;
  content: string;
  source: 'book' | 'course' | 'methodology' | 'story';
  chapter?: string;
  module?: string;
  topic: string;
  framework?: string;
  keywords: string[];
  confidence: number; // 0-1 score for content accuracy
}

export interface SearchResult {
  chunks: KnowledgeChunk[];
  totalResults: number;
  searchQuery: string;
  confidence: number;
}

// Main knowledge base interface
export class MikeKnowledgeBase {
  private static instance: MikeKnowledgeBase;
  private knowledgeChunks: KnowledgeChunk[] = [];
  private initialized = false;

  static getInstance(): MikeKnowledgeBase {
    if (!MikeKnowledgeBase.instance) {
      MikeKnowledgeBase.instance = new MikeKnowledgeBase();
    }
    return MikeKnowledgeBase.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    // Load all knowledge chunks from various sources
    await this.loadBookContent();
    await this.loadCourseContent();
    await this.loadMethodologies();
    await this.loadStories();
    
    this.initialized = true;
  }

  // Search Mike's knowledge base using Pinecone
  async search(query: string, options?: {
    source?: 'book' | 'course' | 'methodology' | 'story';
    topic?: string;
    limit?: number;
    minConfidence?: number;
  }): Promise<SearchResult> {
    await this.initialize();
    
    const {
      source,
      topic,
      limit = 5,
      minConfidence = 0.7
    } = options || {};

    try {
      // Import Pinecone client
      const { pineconeClient } = await import('../lib/pineconeClient');
      
      // Determine namespace based on source
      let namespace = 'mike-book-v1'; // Default to book
      if (source === 'course') namespace = 'mike-course-v1';
      
      // Build filter for Pinecone query
      const filter: Record<string, any> = {};
      if (source) filter.source = source;
      if (topic) filter.topic = topic;
      
      // Search Pinecone
      console.log(`🔍 Searching Pinecone for "${query}" in namespace "${namespace}" with filter:`, filter);
      const pineconeResults = await pineconeClient.searchByText(
        query,
        namespace,
        limit,
        Object.keys(filter).length > 0 ? filter : undefined
      );
      console.log(`📊 Pinecone returned ${pineconeResults.length} results:`, 
        pineconeResults.map(r => ({ id: r.id.substring(0, 8), score: r.score })));

      // Convert Pinecone results to KnowledgeChunk format
      const chunks: KnowledgeChunk[] = pineconeResults
        .filter(result => result.score >= minConfidence)
        .map(result => ({
          id: result.id,
          content: result.metadata.text || result.metadata.content || '',
          source: (result.metadata.source as any) || 'book',
          chapter: result.metadata.chapter,
          module: result.metadata.module,
          topic: result.metadata.topic || 'general',
          framework: result.metadata.framework,
          keywords: result.metadata.keywords || [],
          confidence: result.score
        }));

      return {
        chunks,
        totalResults: chunks.length,
        searchQuery: query,
        confidence: chunks.length > 0 ? chunks[0].confidence : 0
      };
    } catch (error) {
      console.error('Error searching Pinecone knowledge base:', error);
      
      // Fallback response
      return {
        chunks: [{
          id: "fallback-001",
          content: `I'm having trouble accessing Mike's knowledge base right now. The query was "${query}" and I would normally search the Pinecone database namespace 'mike-book-v1' where your book content is stored.`,
          source: source || 'book',
          topic: topic || 'general',
          keywords: query.toLowerCase().split(' '),
          confidence: 0.5
        }],
        totalResults: 1,
        searchQuery: query,
        confidence: 0.5
      };
    }
  }

  // Get content by specific framework
  async getFramework(frameworkName: string): Promise<KnowledgeChunk[]> {
    await this.initialize();
    return this.knowledgeChunks.filter(chunk => 
      chunk.framework === frameworkName
    );
  }

  // Get all available topics
  async getTopics(): Promise<string[]> {
    await this.initialize();
    return [...new Set(this.knowledgeChunks.map(chunk => chunk.topic))];
  }

  // Get all available frameworks
  async getFrameworks(): Promise<string[]> {
    await this.initialize();
    return [...new Set(this.knowledgeChunks
      .map(chunk => chunk.framework)
      .filter(Boolean)
    )] as string[];
  }

  // Validate if content is within Mike's scope
  isWithinScope(query: string): boolean {
    // Simple scope validation - can be enhanced
    const outOfScopeKeywords = [
      'other coaches', 'different methodology', 'alternative approach',
      'not mike', 'someone else', 'other experts'
    ];
    
    const queryLower = query.toLowerCase();
    return !outOfScopeKeywords.some(keyword => queryLower.includes(keyword));
  }

  private async loadBookContent(): Promise<void> {
    // Book content is now in Pinecone - no need to load here
    // The search method will query Pinecone directly
    console.log('Book content loaded from Pinecone namespace: mike-book-v1');
  }

  private async loadCourseContent(): Promise<void> {
    // Course content will be in Pinecone namespace: mike-course-v1
    console.log('Course content will be loaded from Pinecone namespace: mike-course-v1');
  }

  private async loadMethodologies(): Promise<void> {
    // Load Mike's specific coaching methodologies
    const methodologyChunks: KnowledgeChunk[] = [
      // Will be populated with actual methodologies
    ];
    this.knowledgeChunks.push(...methodologyChunks);
  }

  private async loadStories(): Promise<void> {
    // Load Mike's personal stories and experiences
    const storyChunks: KnowledgeChunk[] = [
      // Will be populated with actual stories
    ];
    this.knowledgeChunks.push(...storyChunks);
  }
}

// Export singleton instance
export const mikeKnowledge = MikeKnowledgeBase.getInstance();