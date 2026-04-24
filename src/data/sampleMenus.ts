import type { SampleMenu } from "@/types/sampleMenu";

export const SAMPLE_MENUS: SampleMenu[] = [
  {
    id: "grande-italian-festa",
    title: "Grande Italian Festa",
    subtitle: "A Celebration of Italian Tradition",
    description:
      "Transport your guests to the sun-drenched terraces of Southern Italy. Chef Michele draws on his Roman heritage to craft a convivial feast — from rustic antipasti to indulgent dolci — using only the finest imported and local produce.",
    pricePerPerson: 12500,
    minimumGuests: 8,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    tags: ["Italian", "Family Style", "Celebration", "8+ guests"],
    courses: [
      {
        course: "entrée",
        dishes: [
          {
            name: "Burrata con Prosciutto",
            description: "Creamy burrata, San Daniele prosciutto, heirloom tomatoes, aged balsamic, fresh basil",
            allergens: ["gluten-free", "nut-free"],
          },
          {
            name: "Carpaccio di Manzo",
            description: "Thinly sliced grass-fed beef, rocket, shaved parmesan, truffle oil, lemon",
            allergens: ["gluten-free", "nut-free"],
          },
          {
            name: "Arancini al Tartufo",
            description: "Saffron risotto balls, black truffle, fontina cheese, truffle mayo",
            allergens: ["egg-free"],
          },
        ],
      },
      {
        course: "main",
        dishes: [
          {
            name: "Tagliatelle al Ragù Bolognese",
            description: "House-made egg pasta, slow-braised beef & pork ragù, aged parmesan, fresh herbs",
            allergens: [],
          },
          {
            name: "Branzino all'Acqua Pazza",
            description: "Whole Mediterranean sea bass, cherry tomatoes, olives, capers, white wine broth",
            allergens: ["gluten-free", "dairy-free", "nut-free"],
          },
          {
            name: "Ossobuco alla Milanese",
            description: "Braised veal shank, gremolata, saffron risotto milanese",
            allergens: ["gluten-free", "nut-free"],
          },
        ],
      },
      {
        course: "dessert",
        dishes: [
          {
            name: "Tiramisu Classico",
            description: "Mascarpone cream, Savoiardi soaked in espresso & Marsala, cocoa",
            allergens: [],
          },
          {
            name: "Cannoli Siciliani",
            description: "Crispy pastry shells, ricotta cream, candied orange, dark chocolate chips",
            allergens: [],
          },
          {
            name: "Panna Cotta al Limoncello",
            description: "Silky limoncello panna cotta, Amalfi lemon curd, amaretti crumble",
            allergens: ["gluten-free"],
          },
        ],
      },
    ],
  },
  {
    id: "when-in-italy",
    title: "When in Italy",
    subtitle: "An Intimate Italian Tasting Experience",
    description:
      "For smaller gatherings seeking refinement over abundance. This curated tasting menu takes you on a journey through Italy's finest culinary regions — each dish a story, each bite a memory.",
    pricePerPerson: 12500,
    minimumGuests: 8,
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
    tags: ["Italian", "Tasting Menu", "Intimate", "8+ guests"],
    courses: [
      {
        course: "entrée",
        dishes: [
          {
            name: "Beef Tartare al Coltello",
            description: "Hand-cut grass-fed beef, caper berries, shallots, Dijon, quail egg yolk, sourdough crostini",
            allergens: ["gluten-free", "dairy-free"],
          },
          {
            name: "Burrata con Tartufo Nero",
            description: "Fresh burrata, shaved black truffle, extra virgin olive oil, Maldon sea salt",
            allergens: ["gluten-free", "nut-free"],
          },
          {
            name: "Focaccia Genovese",
            description: "House-made rosemary focaccia, EVOO, fleur de sel, optional prosciutto",
            allergens: ["dairy-free", "egg-free"],
          },
        ],
      },
      {
        course: "main",
        dishes: [
          {
            name: "Risotto al Parmigiano e Tartufo",
            description: "Carnaroli risotto, 36-month Parmigiano Reggiano, summer truffle, brown butter",
            allergens: ["gluten-free", "nut-free"],
          },
          {
            name: "Filetto di Manzo con Gremolata",
            description: "Pan-seared grass-fed eye fillet, salsa verde, roasted bone marrow, charred broccolini",
            allergens: ["gluten-free", "dairy-free", "nut-free"],
          },
        ],
      },
      {
        course: "dessert",
        dishes: [
          {
            name: "Cannoli Siciliani",
            description: "Traditional ricotta cream filling, candied peel, pistachios, icing sugar",
            allergens: [],
          },
          {
            name: "Affogato al Caffè",
            description: "Madagascan vanilla gelato, double ristretto, amaretto biscotti",
            allergens: ["gluten-free"],
          },
        ],
      },
    ],
  },
];
