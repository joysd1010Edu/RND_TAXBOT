import { type NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://31.97.145.112";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxyRequest(request, params.path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxyRequest(request, params.path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxyRequest(request, params.path);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxyRequest(request, params.path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxyRequest(request, params.path);
}

async function proxyRequest(request: NextRequest, pathSegments: string[]) {
  const path = pathSegments.join("/");
  const targetUrl = `${BACKEND_URL}/api/${path}/`;

  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const finalUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;

  // Forward headers but strip host
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    if (!["host", "connection"].includes(key.toLowerCase())) {
      headers[key] = value;
    }
  });

  let body: string | undefined;
  if (!["GET", "HEAD"].includes(request.method)) {
    body = await request.text();
  }

  try {
    const backendResponse = await fetch(finalUrl, {
      method: request.method,
      headers,
      body,
    });

    const responseBody = await backendResponse.text();

    return new NextResponse(responseBody, {
      status: backendResponse.status,
      headers: {
        "Content-Type":
          backendResponse.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to reach backend" },
      { status: 502 },
    );
  }
}
