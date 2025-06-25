import React, { useState } from "react";
import ReactDOM from "react-dom/client";

// Socials & Kaomojis
const socials = [
  { name: "GitHub", url: "https://github.com/lilyhaschen", icon: "🐇" },
  { name: "Twitch", url: "https://twitch.tv/lilyhaschen", icon: "🎮" },
  { name: "Instagram", url: "https://instagram.com/lilyhaschen", icon: "📸" }
];

const kaomojis = [
  "૮꒰ ˶• ༝ •˶꒱ა", "₍ᐢ. .ᐢ₎", "ᘏ ⑅ ᘏ", "(｡•̀ᴗ-)✧", "૮₍ ˶•⤙•˶ ₎ა ./づ~ 🍓",
  "˚₊‧꒰ა ₍ᐢ. ̫.ᐢ₎ ໒꒱ ‧₊˚", "૮Ꮚ ⑅ ´ ˘ ` Ꮚა"
];

// Demo project list
const projects = [
  {
    name: "SoftScan",
    desc: "A cute terminal-based vulnerability scanner",
    url: "https://github.com/lilyhaschen/softscan"
  },
  {
    name: "BunnyWall",
    desc: "A terminal-based behavioral firewall",
    url: "https://github.com/lilyhaschen/bunnywall"
  }
];

// Sample blog posts (replace with your real posts)
const blogPosts = [
  {
    title: "Why Cyber-Bunnies Wear Slippers",
    date: "2025-06-26",
    content: "Because server rooms are cold, and chaos is easier with cozy feet! ˚₊‧꒰ა ₍ᐢ. ̫.ᐢ₎ ໒꒱ ‧₊˚"
  },
  {
    title: "My Cheerleading Linux Distro",
    date: "2025-06-25",
    content: "It's called PomPom OS and it only boots if you yell 'Go Team!' 💻🎀"
  }
];

// Sample gallery images (use real images in production!)
const galleryImages = [
  "https://placekitten.com/280/200",
  "https://placekitten.com/301/200",
  "https://placekitten.com/320/200"
];

// Random stuff
const randomStuff = [
  "૮꒰˵• ﻌ •˵꒱ა Here's a digital hug!",
  "Did you drink water? (｡•̀ᴗ-)✧",
  "New kaomoji unlocked: ૮₍ ˶•⤙•˶ ₎ა ./づ~ 🍓",
  "Remember: resilience with 1 HP and a dream! ♡"
];

function App() {
  const [tab, setTab] = useState("about");
  const [blogIndex, setBlogIndex] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #ffe6fa 0%, #fffde1 100%)",
      color: "#822e77",
      fontFamily: "Nunito, 'Comic Sans MS', Arial, sans-serif"
    }}>
      {/* Navbar */}
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center", gap: 24,
        padding: "1.5rem 1rem 0.5rem 1rem", fontWeight: 700, fontSize: "1.18rem"
      }}>
        {["about", "projects", "blog", "gallery", "random"].map(page => (
          <span
            key={page}
            style={{
              cursor: "pointer",
              borderBottom: tab === page ? "2.5px solid #be35be" : "none",
              color: tab === page ? "#e673c8" : ""
            }}
            onClick={() => { setTab(page); setBlogIndex(null); }}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </span>
        ))}
        {/* Cute kaomoji randomly in the navbar */}
        <span style={{ marginLeft: 12, fontSize: "1.5rem" }}>{kaomojis[Math.floor(Math.random() * kaomojis.length)]}</span>
      </div>

      {/* Socials */}
      <div style={{ textAlign: "center", marginTop: 6, marginBottom: 2, fontSize: 22 }}>
        {socials.map(s => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 11px", textDecoration: "none", color: "#d254c9" }}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Content Tabs */}
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {/* ABOUT */}
        {tab === "about" && (
          <div style={{ textAlign: "center", marginTop: "2.2rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              (｡•̀ᴗ-)✧🌸 Welcome to my Lilypat 🐇💻
            </div>
            <div style={{
              fontSize: "1.08rem",
              background: "#fff6fa",
              padding: "1.6rem",
              borderRadius: 20,
              margin: "0 auto",
              lineHeight: 1.7,
              maxWidth: 530
            }}>
              ⋆˚ఎ 🌼 ໒˚⋆ <b>Hi, I’m Lily</b>: a cyber-bunny with a glitter grenade.<br />
              I do cybersecurity, machine learning, cheerleading, and questionable life choices, all while pretending I'm not held together by tea, chaos, and dog hair.<br />
              Christian-coded, engaged to a biologist.<br />
              Single-file project lover.<br /><br />
              ୨♡୧ Build secure systems for actual cities<br />
              ୨୧ Design emotional support apps for humans (and AIs going through it)<br />
              ୨୧ Make silly games that sometimes cry back<br />
              ୨♡୧ Help you secure your digital kingdom while sipping iced tea in bunny slippers<br /><br />
              <i>
                A priest once called me a bomb—I said I’m a bunmb: half bunny, half blessing, full disruption.<br />
                (don't ask about my lore you are not prepared to hear what I went throw).<br />
                Let’s hop into the strange, the secure, and the sparkly. This is my Lilypat. You’re welcome. 🐰✨
              </i>
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {tab === "projects" && (
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <div style={{ fontSize: "2rem", color: "#be35be" }}>🐇 Projects</div>
            <div>
              <div style={{ margin: "1.2rem auto 0.8rem auto", fontWeight: "bold" }}>
                Find more on my <a href="https://github.com/lilyhaschen" target="_blank" rel="noopener noreferrer" style={{ color: "#e673c8" }}>GitHub</a>!
              </div>
              {projects.map(p => (
                <div key={p.name} style={{
                  background: "#fff4f8", margin: "0.8rem auto", borderRadius: 16,
                  boxShadow: "0 2px 10px #fad9ff3c", maxWidth: 400, padding: 18
                }}>
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{p.name}</div>
                  <div>{p.desc}</div>
                  <div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "#be35be", fontSize: 15 }}>View on GitHub</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG */}
        {tab === "blog" && (
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <div style={{ fontSize: "2rem", color: "#be35be" }}>૮꒰ ˶• ༝ •˶꒱ა ♡ Blog</div>
            {!blogPosts.length && <div>No posts yet! Check back soon.</div>}
            {blogIndex === null ? (
              <div>
                {blogPosts.map((post, idx) => (
                  <div key={post.title} style={{
                    background: "#fff8fb",
                    margin: "1.3rem auto",
                    borderRadius: 18,
                    boxShadow: "0 2px 10px #fad9ff36",
                    padding: 19,
                    maxWidth: 420,
                    textAlign: "left"
                  }}>
                    <div style={{ fontSize: "1.12rem", fontWeight: "bold" }}>{post.title}</div>
                    <div style={{ fontSize: ".95rem", color: "#b87dc8", marginBottom: 4 }}>{post.date}</div>
                    <button
                      style={{
                        background: "#e673c8",
                        color: "#fff",
                        border: "none",
                        padding: "5px 14px",
                        borderRadius: 7,
                        cursor: "pointer",
                        fontWeight: 700,
                        marginTop: 4
                      }}
                      onClick={() => setBlogIndex(idx)}
                    >
                      Read
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                background: "#fff8fb", margin: "2rem auto", borderRadius: 18,
                boxShadow: "0 2px 12px #fad9ff45", padding: 28, maxWidth: 520, textAlign: "left"
              }}>
                <div style={{ fontSize: "1.22rem", fontWeight: "bold" }}>
                  {blogPosts[blogIndex].title}
                </div>
                <div style={{ color: "#b87dc8", fontSize: ".98rem" }}>{blogPosts[blogIndex].date}</div>
                <div style={{ margin: "1rem 0 1.3rem 0", fontSize: "1.09rem" }}>
                  {blogPosts[blogIndex].content}
                </div>
                <button
                  style={{
                    background: "#fff4fa",
                    color: "#e673c8",
                    border: "1px solid #e673c8",
                    padding: "5px 14px",
                    borderRadius: 7,
                    cursor: "pointer",
                    fontWeight: 700
                  }}
                  onClick={() => setBlogIndex(null)}
                >
                  ← Back to blog
                </button>
              </div>
            )}
          </div>
        )}

        {/* GALLERY */}
        {tab === "gallery" && (
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <div style={{ fontSize: "2rem", color: "#be35be" }}>Gallery ✦</div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.1rem", marginTop: 24 }}>
              {galleryImages.map((url, idx) => (
                <div key={idx} style={{
                  borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 10px #fad9ff36"
                }}>
                  <img src={url} alt="bunny gallery" style={{ width: 180, height: 120, objectFit: "cover" }} />
                </div>
              ))}
            </div>
            <div style={{ fontSize: "1.09rem", marginTop: 18, color: "#be35be" }}>
              More coming soon! ૮₍ ˶•⤙•˶ ₎ა ./づ~ 🍓
            </div>
          </div>
        )}

        {/* RANDOM */}
        {tab === "random" && (
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <div style={{ fontSize: "2rem", color: "#be35be" }}>૮₍ •̀ ⩊ •́ ₎ა Random Stuff</div>
            <div style={{
              background: "#fff8fb",
              borderRadius: 20,
              maxWidth: 370,
              margin: "2.2rem auto 1.5rem auto",
              padding: 22,
              boxShadow: "0 2px 10px #fad9ff36",
              fontSize: "1.12rem"
            }}>
              {randomStuff[Math.floor(Math.random() * randomStuff.length)]}
            </div>
            <div style={{ marginTop: 18, fontSize: "1.5rem" }}>
              {kaomojis[Math.floor(Math.random() * kaomojis.length)]}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        margin: "2.2rem 0 1.2rem 0",
        fontSize: "1rem"
      }}>
        ૮꒰ ˶• ༝ •˶꒱ა  /ᐢ. .ᐢ\\  • Powered by Lily’s kaomojis and glitter code | Site by Lily
      </div>
    </div>
  );
}

// Render app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
