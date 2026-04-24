import type { AllergenTag } from "./meal";

export interface SampleMenuDish {
  name: string;
  description: string;
  allergens: AllergenTag[];
}

export interface SampleMenuCourse {
  course: "entrée" | "main" | "dessert" | "side" | "cocktail";
  dishes: SampleMenuDish[];
}

export interface SampleMenu {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  pricePerPerson: number;
  minimumGuests: number;
  courses: SampleMenuCourse[];
  image: string;
  tags: string[];
}
