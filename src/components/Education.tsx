import { profile } from "../data/profile";
export default function Education({ page = false }: { page?: boolean }) {
  const Heading = page ? "h2" : "h3";
  return (
    <div className="education" data-reveal="">
      <p className="eyebrow">CURRENTLY LEARNING & BUILDING</p>
      <Heading>{profile.education}</Heading>
      <p>{profile.institution}</p>
      <span>Reported CGPA: {profile.cgpa}</span>
    </div>
  );
}
