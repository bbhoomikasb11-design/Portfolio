import { profile } from "./profile";

export interface EducationEntry {
  level: string;
  qualification: string;
  institution: string;
  result: { label: string; value: string; suffix?: string };
}

// Supplied by Bhoomika. Years, examination boards and study streams are not assumed.
export const education: EducationEntry[] = [
  {
    level: "UNDERGRADUATE EDUCATION",
    qualification: profile.education,
    institution: profile.institution,
    result: { label: "Reported CGPA", value: profile.cgpa },
  },
  {
    level: "PRE-UNIVERSITY EDUCATION",
    qualification: "Pre-University",
    institution: "Mahesh PU College",
    result: { label: "Percentage", value: "93.3", suffix: "%" },
  },
  {
    level: "SCHOOL EDUCATION",
    qualification: "Primary & High School",
    institution: "St. Mary's High School",
    result: { label: "Percentage", value: "83.3", suffix: "%" },
  },
];
