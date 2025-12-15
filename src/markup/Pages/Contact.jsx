import React, {useRef} from "react";
import "./Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

import emailjs from "@emailjs/browser";
import Swal from "sweetalert2"

function Contact() {

  const form = useRef(null);


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_s1w1f4h", "template_lenvwrm", form.current, {
        publicKey: "FPADiz-uPrTwjILVw",
      })
      .then(
        () => {
          Swal.fire({
            title: "Success!",
            text: "Message Sent!",
            icon: "success"
          });
          console.log("SUCCESS!");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <Header />
      <main className="home-container">
        <section className="home-hero" aria-labelledby="contact-title">
          <div className="hero-left">
            <h1 id="contact-title" className="hero-title">
              Contact Us
            </h1>
            <p className="hero-sub">
              We’d love to hear from you. Whether you have questions, feedback,
              or partnership inquiries — reach out anytime.
            </p>
          </div>
        </section>

        <section className="roadmap-grid" aria-live="polite">
          <article className="card" tabIndex="0">
            <h3 className="card-title">Email</h3>
            <p className="card-desc">
              Send us an email and we’ll get back to you as soon as possible.
            </p>
            <div className="card-footer">
              <span className="pill">Support</span>
              <a
                href="mailto:bitlayertechnologies@gmail.com"
                className="btn"
                target="_blank"
              >
                Email
              </a>
            </div>
          </article>

          <article className="card" tabIndex="0">
            <h3 className="card-title">Social Media</h3>
            <p className="card-desc">
              Follow us for updates, announcements, and new roadmap releases.
            </p>
            <div className="card-footer">
              <span className="pill">Stay Connected</span>
              <a
                href="https://bitlayer-tech.netlify.app/service"
                className="btn"
                target="_blank"
              >
                Visit
              </a>
            </div>
          </article>

          <article className="card" tabIndex="0">
            <h3 className="card-title">Feedback</h3>
            <p className="card-desc">
              Help us improve! Share your thoughts about the platform.
            </p>
            <div className="card-footer">
              <span className="pill">We Listen</span>
              <a
                href="https://t.me/bitlayertech"
                className="btn"
                target="_blank"
              >
                Submit
              </a>
            </div>
          </article>
        </section>

        <section className="home-hero" style={{ marginTop: "20px" }}>
          <div className="hero-left" style={{ width: "100%" }}>
            <h2 className="hero-title">Send Us a Message</h2>
            <form
              ref={form}
              onSubmit={sendEmail}
              className="contact-bar"
              style={{ flexDirection: "column", gap: "12px", padding: "16px" }}
            >
              <input
                name="from_name"
                type="text"
                placeholder="Your name"
                required
              />
              <input
                name="from_email"
                type="email"
                placeholder="Your email"
                required
              />
              <textarea
                placeholder="Your message"
                name="message"
                rows="4"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "1px solid var(--muted-border)",
                  padding: "10px",
                  borderRadius: "8px",
                  color: "var(--text-primary)",
                }}
              ></textarea>
              <button className="btn" type="submit" value="Send">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
