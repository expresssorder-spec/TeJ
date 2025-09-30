import { GoogleGenAI, Type } from "@google/genai";

export const generateVoucherDataFromText = async (apiKey: string, text: string) => {
  if (!apiKey) {
    throw new Error("الرجاء إدخال مفتاح Gemini API.");
  }
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an intelligent assistant for a Moroccan delivery company. Your task is to process raw text containing delivery information and structure it into a clear JSON format for creating payment vouchers. The input text is in Moroccan Darija.

    Analyze the following text and extract the information for each delivery driver:
    - The driver's name.
    - A list of their successful delivery IDs or tracking numbers.
    - The total payment amount they are owed.

    Please provide the output as a JSON array of objects, where each object represents one driver. The final output must be only the JSON array, with no extra text or markdown formatting.

    Input Text:
    "${text}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              driverName: {
                type: Type.STRING,
                description: "The name of the delivery driver.",
              },
              totalAmount: {
                type: Type.NUMBER,
                description: "The total payment amount for the driver.",
              },
              deliveryIds: {
                type: Type.ARRAY,
                description: "A list of tracking numbers or IDs for the successful deliveries.",
                items: {
                  type: Type.STRING,
                },
              },
            },
            required: ["driverName", "totalAmount", "deliveryIds"],
          },
        },
      },
    });

    const jsonString = response.text;
    if (!jsonString) {
      throw new Error("لم يتمكن الذكاء الاصطناعي من إنشاء رد. قد يكون النص المدخل غير واضح.");
    }
    
    try {
        return JSON.parse(jsonString);
    } catch (parseError) {
        console.error("Failed to parse JSON response from API:", jsonString);
        throw new Error("فشل الذكاء الاصطناعي في إنشاء رد بصيغة صحيحة. حاول مرة أخرى أو قم بتعديل النص المدخل.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            throw new Error("مفتاح Gemini API غير صالح. الرجاء التحقق منه.");
        }
        if (error.message.toLowerCase().includes('network') || error.message.toLowerCase().includes('fetch')) {
            throw new Error("حدث خطأ في الشبكة. الرجاء التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.");
        }
        throw new Error(`حدث خطأ أثناء معالجة طلبك. الرجاء المحاولة مرة أخرى لاحقاً.`);
    }
    throw new Error("حدث خطأ غير معروف.");
  }
};
