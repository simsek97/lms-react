export interface ISubscriptionTier {
  id: string;
  tier?: string;
  title?: string;
  description: string[];
  montlyPriceId?: string;
  price?: number;
  canceled?: string;
  expiresAt?: string;
  subscribedAt?: string;
}
