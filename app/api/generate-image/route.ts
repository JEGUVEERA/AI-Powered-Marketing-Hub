export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { prompt, num_images = 1, guidance_scale = 7.5 } = body;
  
      const response = await fetch("https://fal.run/fal-ai/stable-diffusion-v3-medium", {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.FAL_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          num_images,
          guidance_scale,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // <--- Extract actual error
        console.error("FAL API Error:", errorText); // log for debugging
        return new Response(
          JSON.stringify({ error: "FAL API failed", details: errorText }),
          { status: 500 }
        );
      }
  
      const falData = await response.json();
      const imageUrls = falData.images?.map((img: any) => img.url) || [];
  
      return new Response(JSON.stringify({ images: imageUrls }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      console.error("Internal Server Error:", err);
      return new Response(
        JSON.stringify({ error: "Internal server error", message: err.message }),
        { status: 500 }
      );
    }
  }
  