import { generateText, Output } from "ai"
import { z } from "zod"
import { services } from "@/lib/clinic-data"

export const maxDuration = 30

const analysisSchema = z.object({
  overallImpression: z
    .string()
    .describe("A warm, encouraging 1-2 sentence summary of what is visible in the photo."),
  observations: z
    .array(
      z.object({
        area: z.string().describe("Short label, e.g. 'Alignment', 'Shade', 'Gums'."),
        finding: z.string().describe("A non-diagnostic, plain-language observation."),
      }),
    )
    .describe("2 to 4 general visual observations."),
  suggestedServices: z
    .array(z.string())
    .describe("Names of clinic services that may be relevant, chosen from the provided list."),
  recommendation: z
    .string()
    .describe("A short next-step recommendation that always encourages an in-person consultation."),
  isLikelyTeethPhoto: z
    .boolean()
    .describe("True only if the image appears to show a mouth, teeth, or smile."),
})

const serviceList = services.map((s) => s.title).join(", ")

export async function POST(req: Request) {
  let image: string | undefined
  try {
    const body = await req.json()
    image = body.image
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 })
  }

  if (!image || typeof image !== "string") {
    return Response.json({ error: "Please provide an image." }, { status: 400 })
  }

  try {
    const { experimental_output } = await generateText({
      model: "openai/gpt-5.5",
      system: `You are a dental visual assistant for Sultan Rahman Dental Clinic. You provide GENERAL, non-diagnostic observations about a smile photo to help a visitor understand what cosmetic or dental services might be relevant. You NEVER diagnose disease, name conditions definitively, or replace a dentist. Always be encouraging and recommend an in-person consultation. Only suggest services from this list: ${serviceList}. If the image does not clearly show teeth or a mouth, set isLikelyTeethPhoto to false and keep observations empty.`,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this smile photo and return general, non-diagnostic observations and relevant services.",
            },
            { type: "image", image },
          ],
        },
      ],
      experimental_output: Output.object({ schema: analysisSchema }),
    })

    return Response.json(experimental_output)
  } catch (err) {
    console.log("[v0] Smile analyzer error:", err instanceof Error ? err.message : err)
    return Response.json({ error: "Could not analyze the image. Please try again." }, { status: 500 })
  }
}
