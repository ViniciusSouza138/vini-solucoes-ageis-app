import { SpecificService, User } from '../types';

/**
 * Calculates freight cost based on distance with a tiered system.
 * 0–5 km → R$ 10
 * 6–10 km → R$ 20
 * 11–20 km → R$ 30
 * 21 km+ → R$ 40 + R$ 2/km additional
 */
export function calculateFreightCost(distance: number): number {
  if (distance <= 5) {
    return 10;
  }
  if (distance <= 10) {
    return 20;
  }
  if (distance <= 20) {
    return 30;
  }
  // Over 20km
  const additionalDistance = distance - 20;
  return 40 + additionalDistance * 2;
}

/**
 * Gets the price modifier based on worker's reputation.
 * 4.5–5.0 stars: +15%
 * 3.5–4.4 stars: No change
 * 2.5–3.4 stars: -10%
 * Below 2.5 stars: -20%
 */
export function getReputationModifier(reputation: number): number {
  if (reputation >= 4.5) {
    return 1.15; // +15%
  }
  if (reputation >= 3.5) {
    return 1.0; // No change
  }
  if (reputation >= 2.5) {
    return 0.90; // -10%
  }
  return 0.80; // -20%
}

/**
 * Returns a human-readable string for the reputation modifier.
 */
export function getReputationModifierText(reputation: number): string {
    const modifier = getReputationModifier(reputation);
    if (modifier > 1) {
        return `+${((modifier - 1) * 100).toFixed(0)}% (Premium)`;
    }
    if (modifier < 1) {
        return `${((modifier - 1) * 100).toFixed(0)}% (Incentivo)`;
    }
    return 'Padrão (Sem ajuste)';
}


/**
 * Calculates the final estimated price range for a service, including all adjustments.
 */
export function calculateFinalPriceRange(service: SpecificService, worker: User, distance: number) {
  const freightCost = calculateFreightCost(distance);
  const reputationModifier = getReputationModifier(worker.reputation);
  const workerMargin = worker.priceMargin || 1.0;

  const baseMinPrice = service.minPrice * reputationModifier * workerMargin;
  const baseMaxPrice = service.maxPrice * reputationModifier * workerMargin;

  const minFinalPrice = baseMinPrice + freightCost;
  const maxFinalPrice = baseMaxPrice + freightCost;
  
  const servicePriceWithModifier = {
      min: baseMinPrice,
      max: baseMaxPrice
  }

  return {
    minFinalPrice,
    maxFinalPrice,
    freightCost,
    reputationModifier,
    servicePriceWithModifier,
  };
}
