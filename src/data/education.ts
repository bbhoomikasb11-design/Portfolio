import { profile } from "./profile";

export interface EducationEntry {
  level: string;
  qualification: string;
  institution: string;
  result: string;
}

// Supplied by Bhoomika. Years, examination boards and study streams are not assumed.
export const education: EducationEntry[] = [
  {
    level: "UNDERGRADUATE EDUCATION",
    qualification: profile.education,
    institution: profile.institution,
    result: `Reported CGPA: ${profile.cgpa}`,
  },
  {
    level: "PRE-UNIVERSITY EDUCATION",
    qualification: "Pre-University",
    institution: "Mahesh PU College",
    result: "Percentage: 93.3%",
  },
  {
    level: "SCHOOL EDUCATION",
    qualification: "Primary & High School",
    institution: "St. Mary's High School",
    result: "Percentage: 83.3%",
  },
];
