import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { v2 as cloudinary } from "cloudinary";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  resource_type: string;
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit for free account)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: "File too large",
          details: `File size: ${(file.size / 1024 / 1024).toFixed(
            2
          )}MB, Max allowed: 10MB`,
        },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type",
          details: `File type: ${file.type}, Allowed: ${allowedTypes.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    console.log(
      `Uploading file: ${file.name}, Size: ${(file.size / 1024 / 1024).toFixed(
        2
      )}MB, Type: ${file.type}`
    );

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get folder from query parameter or default to "about"
    const url = new URL(request.url);
    const folder = url.searchParams.get("folder") || "about";

    // Upload to Cloudinary
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: folder,
              resource_type: "image",
              transformation: [
                { width: 1920, height: 1080, crop: "limit" }, // Limit max dimensions
                { quality: "auto:good" }, // Optimize quality
              ],
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
              } else {
                resolve(result as CloudinaryUploadResult);
              }
            }
          )
          .end(buffer);
      }
    );

    const cloudinaryResult = result;

    return NextResponse.json({
      message: "Image uploaded successfully",
      imageUrl: cloudinaryResult.secure_url,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      {
        error: "Failed to upload image",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
