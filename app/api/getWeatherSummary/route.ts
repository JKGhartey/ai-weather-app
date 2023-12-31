import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
  // Weatherdata in the body of the POST request
  const { weatherData } = await request.json();

  console.log("WEATHER DATA IS: ", weatherData);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `Hey there, could you give me a friendly rundown of today's top news stories? Just imagine you're chatting with a friend and keeping me in the loop. Go ahead! Be energetic and enthusiastic. Then give a summary of the weather for the next 24 hours. Make it easy for the viewer to understand and know what to do to prepare for the weather conditions, such as where sunscreen if the UV is high. Use the uv_index data to provide UV advice. Refer to the user as "you". Make sure your summary is no longer than 20 seconds.`,
      },
      {
        role: "user",
        content: `Hi there, can I get a summary of todays weather, use the following information to get the weather data ${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });

  const { data } = response;

  console.log("DATA IS: ", data);

  return NextResponse.json(data.choices[0].message);
}