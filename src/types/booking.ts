export type EventType =
  | "intimate-dinner"
  | "birthday-celebration"
  | "corporate-event"
  | "wedding"
  | "yacht-service"
  | "weekly-meal-prep"
  | "other";

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventType: EventType;
  eventDate: string;
  guestCount: number;
  dietaryRequirements: string;
  location: string;
  additionalNotes?: string;
}
