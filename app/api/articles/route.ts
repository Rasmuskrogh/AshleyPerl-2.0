import { NextResponse } from "next/server";
import { getArticles } from "@/lib/getArticles";

export async function GET() {
  try {
    const articles = await getArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
