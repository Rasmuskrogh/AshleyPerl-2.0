import { NextResponse } from "next/server";
import { getPublications } from "@/lib/getArticles";

export async function GET() {
  try {
    const publications = await getPublications();
    return NextResponse.json(publications);
  } catch (error) {
    console.error("Error fetching publications:", error);
    return NextResponse.json(
      { error: "Failed to fetch publications" },
      { status: 500 }
    );
  }
}
