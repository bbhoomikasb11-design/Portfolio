import { useState } from "react";
import type { FormEvent } from "react";
import { profile } from "../data/profile";
import { Arrow } from "./Icons";
export default function Contact({ page = false }: { page?: boolean }) {
  const Heading = page ? "h1" : "h2";
  const FormHeading = page ? "h2" : "h3";
  const [draft, setDraft] = useState<string | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const message = String(data.get("message")).trim();
    if (!name || !message) {
      event.currentTarget.reportValidity();
      return;
    }
    const url = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`Hi Bhoomika,\n\n${message}\n\nFrom: ${name}\nReply to: ${email}`)}`;
    setDraft(url);
    window.location.href = url;
  }
  return (
    <section
      id="contact"
      className={page ? "contact-section contact-page" : "contact-section"}
    >
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">
            {page ? "LET’S CONNECT" : "05 / LET’S CONNECT"}
          </p>
          <Heading>
            Good things start
            <br />
            with a <em>conversation.</em>
          </Heading>
          <p className="contact-intro">
            Have an opportunity, an idea, or a problem worth solving? I’d love
            to hear about it.
          </p>
          <a className="email-link" href={`mailto:${profile.email}`}>
            {profile.email}
            <Arrow diagonal />
          </a>
          <p className="availability">
            <span aria-hidden="true" />
            Open to internships & full-time opportunities
          </p>
          <div className="social-links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Arrow diagonal />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Arrow diagonal />
            </a>
            <a
              href={
                profile.resume ||
                `mailto:${profile.email}?subject=Resume%20request`
              }
            >
              {profile.resume ? "View résumé" : "Request résumé"}{" "}
              <Arrow diagonal />
            </a>
          </div>
        </div>
        <form onSubmit={submit} onChange={() => setDraft(null)}>
          <FormHeading>Leave a little introduction.</FormHeading>
          <div className="form-row">
            <label>
              Your name
              <input
                autoComplete="name"
                name="name"
                placeholder="How should I call you?"
                required
                maxLength={100}
              />
            </label>
            <label>
              Email address
              <input
                autoComplete="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
                maxLength={200}
              />
            </label>
          </div>
          <label>
            What’s on your mind?
            <textarea
              name="message"
              rows={4}
              placeholder="A little about the opportunity or idea…"
              required
              maxLength={3000}
            />
          </label>
          <p className="form-note" id="form-note">
            This opens a draft in your email app. Review it there and send when
            ready; this website does not send or store your message.
          </p>
          <button
            className="button button-light"
            type="submit"
            aria-describedby="form-note"
          >
            Prepare email <Arrow diagonal />
          </button>
          <div role="status" className="form-status">
            {draft && (
              <>
                Your draft is ready. If your email app didn’t open,{" "}
                <a href={draft}>open the draft again</a> or email the address
                above. Nothing has been sent.
              </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
