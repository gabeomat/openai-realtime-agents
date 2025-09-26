import { NextResponse } from "next/server";
import { pineconeClient } from "@/lib/pineconeClient";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }
    
    console.log(`🔍 Server-side search for: "${query}"`);
    
    // Search Mike's book content (server-side has access to env vars)
    const results = await pineconeClient.searchByText(
      query,
      'mike-book-v1',
      3,
      undefined
    );
    
    console.log(`📊 Found ${results.length} results`);
    
    if (results.length === 0) {
      return NextResponse.json({
        success: false,
        message: `I couldn't find specific information about "${query}" in Mike's documented content. Try asking about topics like mindset, goal-setting, resilience, overcoming obstacles, or mental toughness.`
      });
    }
    
    // Format results for Mike's voice
    let content = '';
    results.forEach((result) => {
      const text = result.metadata.text || result.metadata.content || '';
      if (text.length > 50) {
        content += `${text}\n\n`;
      }
    });
    
    if (!content.trim()) {
      return NextResponse.json({
        success: false,
        message: `I found some content about "${query}" in Mike's material, but it seems to be fragmented. Let me give you Mike's general approach to mental challenges: Focus on what you can control, trust your training, and break through mental barriers by taking action rather than overthinking.`
      });
    }
    
    return NextResponse.json({
      success: true,
      content: content.trim(),
      resultsCount: results.length
    });
    
  } catch (error) {
    console.error('Server-side search error:', error);
    return NextResponse.json({
      success: false,
      message: "I'm having trouble accessing Mike's knowledge base right now. Let me give you some general coaching advice based on Mike's principles of grit, belief, and perseverance."
    }, { status: 500 });
  }
}