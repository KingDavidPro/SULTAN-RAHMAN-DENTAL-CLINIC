import { generateText, Output } from "ai"
import { z } from "zod"
import { services } from "@/lib/clinic-data"

export const maxDuration = 30

const estimateSchema = z.object({
  summary: z.string().describe("A 1-2 sentence plain-language summary of the recommended approach."),
  lineItems: z
    .array(
      z.object({
        service: z.string().describe("Service name from the clinic list."),
        priceRange: z.string().describe("Price range in Leones, e.g. 'Le 800 - Le 2,500'."),
        reason: z.string().describe("Why this service is suggested for the described concern."),
      }),
    )
    .describe("1 to 3 relevant services."),
  estimatedTotalRange: z
    .string()
    .describe("Combined estimated total range in Leones for the suggested services."),
  notes: z.string().describe("A short note that the final cost is confirmed at a consultation."),
})

const serviceContext = services
  .map((s) => `${s.title}: ${s.priceRange}. ${s.short}`)
  .join("\n")

export async function POST(req: Request) {
  let concern: string | undefined
  try {
    const body = await req.json()
    concern = body.concern
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 })
  }

  if (!concern || typeof concern !== "string" || !concern.trim()) {
    return Response.json({ error: "Please describe your dental concern." }, { status: 400 })
  }

  try {
    const { experimental_output } = await generateText({
      model: "openai/gpt-5.5",
      system: `You are a cost-estimation assistant for Sultan Rahman Dental Clinic in Freetown. Based on a patient's described concern, suggest the most relevant services and give an ESTIMATED price range using ONLY the prices below. Prices are in Sierra Leonean Leones (Le). Always make clear this is an estimate and the exact cost is confirmed at a consultation. Only use services and prices from this list:\n${serviceContext}`,
      messages: [
        {
          role: "user",
          content: `My dental concern: ${concern.trim()}`,
        },
      ],
      experimental_output: Output.object({ schema: estimateSchema }),
    })

    return Response.json(experimental_output)
  } catch (err) {
    console.log("[v0] Cost estimator error:", err instanceof Error ? err.message : err)
    return Response.json({ error: "Could not generate an estimate. Please try again." }, { status: 500 })
  }
}
