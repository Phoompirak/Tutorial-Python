import { NextResponse } from 'next/server';

const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = process.env.RAPID_API_HOST;
const PYTHON_LANGUAGE_ID = 71;

export async function POST(request) {
  if (!RAPID_API_KEY || !RAPID_API_HOST || !JUDGE0_API_URL) {
    return NextResponse.json({ error: 'API credentials are not configured.' }, { status: 500 });
  }

  try {
    const { code } = await request.json();
    console.log("CODE", code);

    const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions?wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': RAPID_API_HOST,
      },
      body: JSON.stringify({
        source_code: code,
        language_id: PYTHON_LANGUAGE_ID,
        wait: true,
      }),
    });

    const submissionData = await submissionResponse.json();
    console.log("SUBMISSION DATA", submissionData);

    return NextResponse.json(
      {
        stderr: submissionData.stderr,
        output: submissionData.stdout,
        status: submissionData.status,
      }
    );

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
