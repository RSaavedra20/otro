import React, { useState, useRef, useEffect } from "react";
import type { ChatMessage, PetFood } from "./petTypes";
import petFoods from "./PetFoods";

const PetNutritionChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "¡Hola! Soy tu asistente de nutrición para mascotas. ¿Te gustaría saber sobre alimentos para perros o gatos? Puedes preguntar por alimentos específicos o pedir recomendaciones.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "excelente":
        return "bg-green-100 text-green-800 border-green-300";
      case "bueno":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "moderado":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "pobre":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "peligroso":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      excelente: "⭐ Excelente",
      bueno: "👍 Bueno",
      moderado: "⚠️ Moderado",
      pobre: "👎 Pobre",
      peligroso: "🚫 Peligroso",
    };
    return labels[category as keyof typeof labels] || category;
  };

  const findFoodInfo = (query: string): PetFood | null => {
    const lowerQuery = query.toLowerCase();
    return (
      petFoods.find(
        (food) =>
          food.name.toLowerCase().includes(lowerQuery) ||
          food.benefits.some((benefit) =>
            benefit.toLowerCase().includes(lowerQuery)
          )
      ) || null
    );
  };

  const getRecommendations = (petType: "perro" | "gato", category?: string) => {
    let filteredFoods = petFoods.filter(
      (food) => food.type === petType || food.type === "ambos"
    );

    if (category) {
      filteredFoods = filteredFoods.filter(
        (food) => food.category === category
      );
    }

    return filteredFoods.sort((a, b) => {
      const categoryOrder = [
        "excelente",
        "bueno",
        "moderado",
        "pobre",
        "peligroso",
      ];
      return (
        categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
      );
    });
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Detectar tipo de mascota
    const isDog =
      lowerMessage.includes("perro") || lowerMessage.includes("canino");
    const isCat =
      lowerMessage.includes("gato") || lowerMessage.includes("felino");

    // Buscar alimento específico
    const foodInfo = findFoodInfo(userMessage);
    if (foodInfo) {
      return formatFoodResponse(foodInfo);
    }

    // Recomendaciones por categoría
    if (lowerMessage.includes("excelente") || lowerMessage.includes("mejor")) {
      const petType = isDog ? "perro" : isCat ? "gato" : "ambos";
      const foods = getRecommendations(petType, "excelente");
      return formatRecommendationsResponse(foods, "excelentes");
    }

    if (
      lowerMessage.includes("peligroso") ||
      lowerMessage.includes("prohibido")
    ) {
      const foods = getRecommendations("ambos", "peligroso");
      return formatDangerousFoodsResponse(foods);
    }

    // Recomendaciones generales
    if (isDog) {
      const foods = getRecommendations("perro");
      return formatGeneralRecommendations(foods, "perros");
    }

    if (isCat) {
      const foods = getRecommendations("gato");
      return formatGeneralRecommendations(foods, "gatos");
    }

    // Respuesta por defecto
    return `Puedo ayudarte con información sobre alimentos para perros y gatos. Puedes preguntar sobre:
- Alimentos específicos (ej: "pollo", "chocolate")
- Categorías (ej: "alimentos excelentes para perros")
- Recomendaciones generales
- Cantidades diarias recomendadas

¿Sobre qué te gustaría saber?`;
  };

  const formatFoodResponse = (food: PetFood): string => {
    return `
**${food.name}** - ${getCategoryLabel(food.category)}

**Propiedades:**
${food.benefits.map((benefit) => `✅ ${benefit}`).join("\n")}

${
  food.risks
    ? `**Riesgos:**\n${food.risks.map((risk) => `❌ ${risk}`).join("\n")}\n`
    : ""
}

**Cantidades diarias:**
${food.dailyAmount.perro ? `🐕 Perros: ${food.dailyAmount.perro}` : ""}
${food.dailyAmount.gato ? `🐈 Gatos: ${food.dailyAmount.gato}` : ""}

${food.preparation ? `**Preparación:** ${food.preparation}` : ""}
${food.caloriesPer100g ? `**Calorías:** ${food.caloriesPer100g} kcal/100g` : ""}
    `.trim();
  };

  const formatRecommendationsResponse = (
    foods: PetFood[],
    category: string
  ): string => {
    return `
**Alimentos ${category}:**

${foods
  .map(
    (food) => `
**${food.name}**
${food.benefits.join(" • ")}
${food.dailyAmount.perro ? `🐕 ${food.dailyAmount.perro}` : ""}
${food.dailyAmount.gato ? `🐈 ${food.dailyAmount.gato}` : ""}
`
  )
  .join("\n")}
    `.trim();
  };

  const formatDangerousFoodsResponse = (foods: PetFood[]): string => {
    return `
**🚫 ALIMENTOS PELIGROSOS - NUNCA DAR:**

${foods
  .map(
    (food) => `
**${food.name}**
${food.risks?.join(" • ")}
`
  )
  .join("\n")}

⚠️ **En caso de ingestión, contacta inmediatamente con tu veterinario.**
    `.trim();
  };

  const formatGeneralRecommendations = (
    foods: PetFood[],
    petType: string
  ): string => {
    const categorized = foods.reduce((acc, food) => {
      if (!acc[food.category]) acc[food.category] = [];
      acc[food.category].push(food);
      return acc;
    }, {} as Record<string, PetFood[]>);

    return `
**Recomendaciones nutricionales para ${petType}:**

${Object.entries(categorized)
  .map(
    ([category, categoryFoods]) => `
**${getCategoryLabel(category)}**
${categoryFoods.map((food) => `• ${food.name}`).join("\n")}
`
  )
  .join("\n")}

Pregunta por cualquier alimento específico para más detalles.
    `.trim();
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simular procesamiento
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">
          🐾 Asistente de Nutrición Mascotas
        </h2>
        <p className="text-sm opacity-90">
          Información sobre alimentos para perros y gatos
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === "user"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div
                className={`text-xs mt-1 ${
                  message.type === "user" ? "text-indigo-200" : "text-gray-500"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu pregunta sobre alimentos para mascotas..."
            className="flex-1 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Enviar
          </button>
        </div>

        {/* Quick actions */}
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            onClick={() => setInputValue("alimentos excelentes para perros")}
            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition-colors"
          >
            🐕 Mejores perros
          </button>
          <button
            onClick={() => setInputValue("alimentos excelentes para gatos")}
            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition-colors"
          >
            🐈 Mejores gatos
          </button>
          <button
            onClick={() => setInputValue("alimentos peligrosos")}
            className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200 transition-colors"
          >
            🚫 Peligrosos
          </button>
          <button
            onClick={() => setInputValue("pollo")}
            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
          >
            🍗 Pollo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetNutritionChatbot;
