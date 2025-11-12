export interface PetFood {
  id: string;
  name: string;
  category: "excelente" | "bueno" | "moderado" | "pobre" | "peligroso";
  type: "perro" | "gato" | "ambos";
  benefits: string[];
  risks?: string[];
  dailyAmount: {
    perro?: string;
    gato?: string;
  };
  preparation?: string;
  caloriesPer100g?: number;
}

export interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}
