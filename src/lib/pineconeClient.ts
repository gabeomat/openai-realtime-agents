// Simple Pinecone client for Mike's knowledge base
// This connects to your existing Pinecone database with the book content

export interface PineconeSearchResult {
    id: string;
    score: number;
    metadata: {
      content: string;
      source?: string;
      topic?: string;
      chapter?: string;
      [key: string]: any;
    };
  }
  
  export class PineconeClient {
    private apiKey: string;
    private indexName: string;
    private indexUrl: string;
  
    constructor() {
      this.apiKey = process.env.PINECONE_API_KEY || '';
      this.indexName = process.env.PINECONE_INDEX_NAME || 'mike-book-knowledge';
      this.indexUrl = process.env.PINECONE_INDEX_URL || '';
    }
  
    async searchNamespace(
      queryVector: number[],
      namespace: string = 'mike-book-v1',
      topK: number = 5,
      filter?: Record<string, any>
    ): Promise<PineconeSearchResult[]> {
      if (!this.apiKey || !this.indexUrl) {
        console.warn('Pinecone credentials not configured');
        return [];
      }
  
      try {
        const response = await fetch(`${this.indexUrl}/query`, {
          method: 'POST',
          headers: {
            'Api-Key': this.apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            namespace,
            vector: queryVector,
            topK,
            includeMetadata: true,
            filter,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Pinecone query failed: ${response.statusText}`);
        }
  
        const data = await response.json();
        return data.matches || [];
      } catch (error) {
        console.error('Error querying Pinecone:', error);
        return [];
      }
    }
  
    // Generate embeddings using HuggingFace (same as your n8n workflow)
    async generateEmbedding(text: string): Promise<number[]> {
      const hfToken = process.env.HUGGINGFACE_TOKEN;
      
      if (!hfToken) {
        console.warn('HuggingFace token not configured');
        return [];
      }
  
      try {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/intfloat/multilingual-e5-large-instruct',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${hfToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              inputs: text,
              options: { wait_for_model: true }
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error(`HuggingFace API error: ${response.statusText}`);
        }
  
        const embedding = await response.json();
        return Array.isArray(embedding) ? embedding : [];
      } catch (error) {
        console.error('Error generating embedding:', error);
        return [];
      }
    }
  
    async searchByText(
      query: string,
      namespace: string = 'mike-book-v1',
      topK: number = 5,
      filter?: Record<string, any>
    ): Promise<PineconeSearchResult[]> {
      const queryVector = await this.generateEmbedding(query);
      
      if (queryVector.length === 0) {
        return [];
      }
  
      return this.searchNamespace(queryVector, namespace, topK, filter);
    }
  }
  
  export const pineconeClient = new PineconeClient();