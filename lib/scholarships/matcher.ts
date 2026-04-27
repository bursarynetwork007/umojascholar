import { scholarships, type Scholarship } from "./data";

export interface Profile {
  fieldOfStudy?: string;
  studyLevel?: string;
  gpa?: string;
  achievements?: string;
  communityInvolvement?: string;
  careerGoals?: string;
  careerVision?: string;
  country?: string;
}

export interface MatchResult {
  scholarship: Scholarship;
  score: number;
  reasons: string[];
}

export function scoreProfile(profile: Profile): MatchResult[] {
  return scholarships
    .map((sch) => {
      // Generous base — we want students to feel hopeful, not excluded
      let score = 40;
      const reasons: string[] = [];

      // Field alignment
      const field = (profile.fieldOfStudy || "").toLowerCase();
      const schFields = sch.fields.map((f) => f.toLowerCase());
      if (schFields.includes("any")) {
        score += 20;
        reasons.push("Open to all fields");
      } else if (
        schFields.some(
          (f) => field.includes(f) || f.includes(field.split(" ")[0])
        )
      ) {
        score += 25;
        reasons.push(`${profile.fieldOfStudy} is eligible`);
      }

      // Study level match
      if (sch.levels.includes(profile.studyLevel || "")) {
        score += 15;
        reasons.push(`${profile.studyLevel} level accepted`);
      }

      // GPA signal
      const gpaNum = parseFloat(profile.gpa || "0");
      if (gpaNum >= 3.5 || (gpaNum >= 70 && gpaNum <= 100)) {
        score += 10;
        reasons.push("Strong academic record");
      } else if (gpaNum >= 3.0 || (gpaNum >= 60 && gpaNum <= 100)) {
        score += 5;
      }

      // Story quality signals
      if ((profile.achievements || "").length > 100) {
        score += 8;
        reasons.push("Leadership experience documented");
      }
      if ((profile.communityInvolvement || "").length > 80) {
        score += 8;
        reasons.push("Community impact noted");
      }
      if ((profile.careerGoals || "").length > 80) {
        score += 5;
        reasons.push("Clear career vision");
      }

      // Cap between 28–98
      score = Math.min(98, Math.max(28, score));

      return { scholarship: sch, score, reasons };
    })
    .sort((a, b) => b.score - a.score);
}
