export interface ISubscriptionTier {
  id: string;
  tier?: string;
  title?: string;
  description: string[];
  montlyPriceId?: string;
  price?: number;
}
