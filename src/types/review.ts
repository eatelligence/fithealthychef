export interface Review {
  id: string;
  authorName: string;
  authorInitials: string;
  rating: 5 | 4 | 3 | 2 | 1;
  date: string;
  title: string;
  body: string;
  source: "productreview" | "google" | "direct";
  verifiedPurchase: boolean;
}
