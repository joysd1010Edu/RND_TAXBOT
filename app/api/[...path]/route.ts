import { type NextRequest, NextResponse } from "next/server";

const rawBackendBaseUrl =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.rdtaxbot.com.au";

const BACKEND_URL = rawBackendBaseUrl
  .replace(/\/api\/?$/, "")
  .replace(/\/$/, "");
type RouteContext = { params: Promise<{ path: string[] }> };

async function resolvePath(context: RouteContext) {
  const { path } = await context.params;
  return path;
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, await resolvePath(context));
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, await resolvePath(context));
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, await resolvePath(context));
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, await resolvePath(context));
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, await resolvePath(context));
}

async function proxyRequest(request: NextRequest, pathSegments: string[]) {
  const path = pathSegments.join("/");

  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();

  const withSlash = `${BACKEND_URL}/api/${path}/`;
  const withoutSlash = `${BACKEND_URL}/api/${path}`;
  const candidateUrls = Array.from(new Set([withSlash, withoutSlash]));

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
    for (let index = 0; index < candidateUrls.length; index += 1) {
      const url = candidateUrls[index];
      const finalUrl = queryString ? `${url}?${queryString}` : url;
      console.log("Proxying to:", finalUrl);

      const backendResponse = await fetch(finalUrl, {
        method: request.method,
        headers,
        body,
      });

      if (backendResponse.status === 404 && index < candidateUrls.length - 1) {
        continue;
      }

      const responseBody = await backendResponse.text();

      return new NextResponse(responseBody, {
        status: backendResponse.status,
        headers: {
          "Content-Type":
            backendResponse.headers.get("Content-Type") ?? "application/json",
        },
      });
    }

    return NextResponse.json(
      { error: "Endpoint not found in backend" },
      { status: 404 },
    );
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to reach backend" },
      { status: 502 },
    );
  }
}
