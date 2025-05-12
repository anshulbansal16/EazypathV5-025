import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, height, weight } = body;

    // If height and weight are provided, calculate BMI
    if (height && weight) {
      const bmi = weight / ((height / 100) ** 2);
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      return NextResponse.json({
        bmi: bmi.toFixed(2),
        category,
        message: `Your BMI is ${bmi.toFixed(2)} (${category}).`,
      });
    }

    // If messages are provided, use OpenAI for analysis
    if (messages) {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      return NextResponse.json(completion.choices[0].message);
    }

    return NextResponse.json(
      { error: 'Please provide either messages or height and weight.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in bmi-analysis route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 