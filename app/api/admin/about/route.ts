import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import {
  getAboutContent,
  updateAboutContent,
} from "../../../../lib/getAboutContent";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    console.log("Session in GET:", session);
    console.log("User username:", session?.user?.username);

    if (!session?.user?.username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current content from shared data source
    const content = await getAboutContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error fetching about content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    console.log("Session in PUT:", session);
    console.log("User username:", session?.user?.username);

    if (!session?.user?.username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("Received body:", body);
    const { content, imageUrl, imageurl } = body;
    console.log("Extracted values:", { content, imageUrl, imageurl });

    // Handle both camelCase and snake_case
    const finalImageUrl = imageUrl || imageurl;

    // Validate required fields (imageUrl is optional, has fallback)
    if (!content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to shared data source
    console.log("Saving about content:", { content, finalImageUrl });
    const updatedContent = await updateAboutContent({
      content,
      ...(finalImageUrl && { imageUrl: finalImageUrl }), // Only include imageUrl if it's provided
    });

    const response = NextResponse.json({
      message: "About content updated successfully",
      content: updatedContent,
    });

    response.headers.set("Cache-Control", "no-cache");
    response.headers.set("Next-Revalidate", "0");
    return response;
  } catch (error) {
    console.error("Error updating about content:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
