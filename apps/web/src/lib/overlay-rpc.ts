import type { OverlayResultItem } from './mock-overlays';

// replace this with a real ORPC / tRPC client call.
export async function fetchOverlayResultDetails(result: OverlayResultItem) {
  console.log('[overlay-rpc] would fetch details for overlay result', result);

  // temporary mock result
  return {
    ...result,
    description: 'Mock overlay details – replace with real data',
  };
}
