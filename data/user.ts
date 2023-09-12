import { IS3Object } from '@/data/s3object';
import { ISubscriptionTier } from '@/data/subscription-tier';

export interface IUser {
  id: string;
  sub?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  role?: string;
  avatar?: IS3Object;
  stripeCustomerId?: IS3Object;
  subscription?: ISubscriptionTier;
  favorites?: any;
}
