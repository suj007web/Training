import { NextRequest, NextResponse } from "next/server";

import { backendUrl } from "@/src/utils/config";

function extractCookieValue(setCookieHeader: string, key: string): string | undefined {
  const regex = new RegExp(`${key}=([^;]+)`);
  const match = setCookieHeader.match(regex);
  return match ? match[1] : undefined;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendRes = await fetch(`${backendUrl}/password-reset/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const setCookie = backendRes.headers.get('set-cookie');

  let sessionId;
  if (setCookie) {
    const raw = extractCookieValue(setCookie, 'sessionId');
    if (raw) {
      const decoded = decodeURIComponent(raw);
      sessionId = decoded.split('.')[0]; 
    }
  }


  return NextResponse.json({
    status: 'success',
    data: {
      sessionId,
    },
  });
}
