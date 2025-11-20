export const petFoods = [
  // ALIMENTOS EXCELENTES
  {
    id: "1",
    name: "Pollo cocido",
    category: "excelente",
    type: "ambos",
    benefits: ["Alta proteína", "Fácil digestión", "Bajo en grasa"],
    dailyAmount: {
      perro: "10-15% del peso corporal",
      gato: "20-30 gramos por comida",
    },
    preparation: "Cocinar sin sal ni condimentos, quitar huesos",
    caloriesPer100g: 165,
  },
  {
    id: "2",
    name: "Salmón cocido",
    category: "excelente",
    type: "ambos",
    benefits: ["Omega-3", "Piel y pelaje saludable", "Antiinflamatorio"],
    dailyAmount: {
      perro: "5-10% del peso corporal",
      gato: "15-25 gramos por comida",
    },
    preparation: "Cocinar completamente, sin espinas",
    caloriesPer100g: 208,
  },
  {
    id: "3",
    name: "Zanahorias",
    category: "excelente",
    type: "ambos",
    benefits: ["Vitamina A", "Bajo en calorías", "Salud dental"],
    dailyAmount: {
      perro: "1-2 zanahorias medianas",
      gato: "Rodajas pequeñas como premio",
    },
    preparation: "Cocidas o crudas ralladas",
    caloriesPer100g: 41,
  },

  // ALIMENTOS BUENOS
  {
    id: "4",
    name: "Arroz integral",
    category: "bueno",
    type: "perro",
    benefits: ["Fibra digestiva", "Energía sostenida"],
    dailyAmount: {
      perro: "Hasta 25% de la comida diaria",
    },
    preparation: "Cocido sin sal",
    caloriesPer100g: 111,
  },
  {
    id: "5",
    name: "Huevo cocido",
    category: "bueno",
    type: "ambos",
    benefits: ["Proteína completa", "Biotina", "Aminoácidos esenciales"],
    risks: ["Crudo puede tener salmonella"],
    dailyAmount: {
      perro: "1-2 huevos por semana",
      gato: "1/2 huevo 2 veces por semana",
    },
    preparation: "Cocido completamente",
    caloriesPer100g: 155,
  },

  // ALIMENTOS MODERADOS
  {
    id: "6",
    name: "Queso",
    category: "moderado",
    type: "ambos",
    benefits: ["Calcio", "Proteína"],
    risks: ["Alto en grasa", "Intolerancia láctea"],
    dailyAmount: {
      perro: "Pequeños trozos como premio",
      gato: "Muy pequeñas cantidades",
    },
    caloriesPer100g: 404,
  },

  // ALIMENTOS POBRES
  {
    id: "7",
    name: "Pan",
    category: "pobre",
    type: "ambos",
    benefits: [],
    risks: ["Calorías vacías", "Poco valor nutricional"],
    dailyAmount: {
      perro: "Evitar o mínimo",
      gato: "Evitar",
    },
    caloriesPer100g: 265,
  },

  // ALIMENTOS PELIGROSOS
  {
    id: "8",
    name: "Chocolate",
    category: "peligroso",
    type: "ambos",
    benefits: [],
    risks: ["Tóxico", "Problemas cardíacos", "Puede ser mortal"],
    dailyAmount: {
      perro: "CERO - NUNCA dar",
      gato: "CERO - NUNCA dar",
    },
  },
  {
    id: "9",
    name: "Cebolla y ajo",
    category: "peligroso",
    type: "ambos",
    benefits: [],
    risks: ["Anemia hemolítica", "Daño glóbulos rojos"],
    dailyAmount: {
      perro: "CERO - NUNCA dar",
      gato: "CERO - NUNCA dar",
    },
  },
  {
    id: "10",
    name: "Uvas y pasas",
    category: "peligroso",
    type: "ambos",
    benefits: [],
    risks: ["Insuficiencia renal", "Vómitos y diarrea"],
    dailyAmount: {
      perro: "CERO - NUNCA dar",
      gato: "CERO - NUNCA dar",
    },
  },
];
export default petFoods;
