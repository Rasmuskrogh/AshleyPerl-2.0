import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Test Cloudinary connection by getting account info
    const result = await cloudinary.api.ping();

    return NextResponse.json({
      success: true,
      message: "Cloudinary connection successful!",
      ping: result,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
    });
  } catch (error) {
    console.error("Cloudinary test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to Cloudinary",
        details: error instanceof Error ? error.message : "Unknown error",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        hasApiKey: !!process.env.CLOUDINARY_API_KEY,
        hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
      },
      { status: 500 }
    );
  }
}
