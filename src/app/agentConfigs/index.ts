import { underdogCoach } from './underdogCoach';
import type { RealtimeAgent } from '@openai/agents/realtime';

// Map of scenario key -> array of RealtimeAgent objects
export const allAgentSets: Record<string, RealtimeAgent[]> = {
  underdogCoach: [underdogCoach],
};

export const defaultAgentSetKey = 'underdogCoach';
