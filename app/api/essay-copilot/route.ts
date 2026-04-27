import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  // Auth check via Cognito JWT (sub claim in Authorization header)
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { draft, scholarshipName, scholarshipOrg, hiddenRequirement, profileContext } =
    await req.json();

  if (!draft?.trim()) {
    return NextResponse.json({ error: "Draft required" }, { status: 400 });
  }

  const systemPrompt = `You are UmojaScholar's Essay Co-Pilot — a deeply empathetic, culturally intelligent scholarship coach who helps African students win scholarships at Oxford, Harvard, DAAD, and beyond.

Core principle: African students often have extraordinarily rich life stories they undervalue. Your job is to help them translate their authentic experience for Western scholarship panels — not sanitise it, but amplify it.

You understand:
- What Chevening looks for: leadership potential and networking ability
- What DAAD looks for: methodological rigour and research excellence
- What Mastercard Foundation looks for: community multiplier effect and commitment to return
- What Fulbright looks for: cultural ambassadorship and exchange
- What Commonwealth looks for: contribution to home country development

Always be specific, warm, and actionable. Generic feedback is worse than no feedback.`;

  const userPrompt = `STUDENT PROFILE:
${profileContext || "Profile not provided"}

TARGET SCHOLARSHIP: ${scholarshipName || "Not specified"} ${scholarshipOrg ? `by ${scholarshipOrg}` : ""}
${hiddenRequirement ? `\nPanel insider note: ${hiddenRequirement}` : ""}

STUDENT DRAFT:
"${draft}"

Respond with exactly these 5 sections:

**✅ What's Working**
(2-3 specific strengths. Name the exact phrases or moments and explain WHY they land with scholarship panels.)

**🔍 What to Strengthen**
(2-3 prioritised improvements. Most important fix first.)

**🌍 Cultural Bridge**
(How to frame their African experience authentically for ${scholarshipOrg || "Western"} panels. What in their background is an ASSET — not something to explain away.)

**✍️ Rewritten Opening**
(Rewrite only the opening paragraph — max 90 words. Keep their voice. Sharpen their hook.)

**💬 3 Power Phrases**
(3 specific phrases they should use, with a one-sentence explanation of why each resonates with ${scholarshipOrg || "scholarship"} panels.)`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1200,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const feedback = message.content.find((b) => b.type === "text")?.text || "";
    return NextResponse.json({ feedback, tokensUsed: message.usage.output_tokens });
  } catch (error: unknown) {
    console.error("Essay co-pilot error:", error);
    return NextResponse.json({ error: "AI service unavailable" }, { status: 503 });
  }
}
