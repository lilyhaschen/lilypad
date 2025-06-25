import React, { useState } from "react";
import ReactDOM from "react-dom/client";

// You can put all your app logic here!
// For demo, I'll use your bunny intro and a simple tab switch

function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "Nunito, 'Comic Sans MS', Arial, sans-serif",
      background: "linear-gradient(120deg, #ffe6fa 0%, #fffde1 100%)",
      color: "#822e77"
    }}>
      {/* Nav */}
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center", gap: 22,
        padding: "22px 10px 8px 10px", fontWeight: "bold", fontSize: "1.18rem"
      }}>
        <span style={{ cursor: "pointer", color: page === "home" ? "#d254c9" : "" }} onClick={() => setPage("home")}>About</span>
        <span style={{ cursor: "pointer", color: page === "projects" ? "#d254c9" : "" }} onClick={() => setPage("projects")}>Projects</span>
        <span style={{ cursor: "pointer", color: page === "blog" ? "#d254c9" : "" }} onClick={() => setPage("blog")}>Blog</span>
      </div>

      {/* Pages */}
      {page === "home" && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            (｡•̀ᴗ-)✧🌸 Welcome to my Lilypat 🐇💻
          </div>
          <div style={{ fontSize: "1.1rem", maxWidth: 480, margin: "0 auto", background: "#fff6fa", padding: "1.6rem", borderRadius: 20 }}>
            ⋆˚ఎ 🌼 ໒˚⋆ *Hi, I’m Lily: a cyber-bunny with a glitter grenade. I do cybersecurity, machine learning, cheerleading, and questionable life choices, all while pretending I'm not held together by tea, chaos, and dog hair. Christian-coded, engaged to a biologist. Single-file project lover.* <br /><br />
            ୨♡୧ Build secure systems for actual cities <br />
            ୨୧ Design emotional support apps for humans (and AIs going through it) <br />
            ୨୧ Make silly games that sometimes cry back <br />
            ୨♡୧ Help you secure your digital kingdom while sipping iced tea in bunny slippers <br /><br />
            A priest once called me a bomb—I said I’m a bunmb: half bunny, half blessing, full disruption. (don't ask about my lore you are not prepared to hear what I went throw). Let’s hop into the strange, the secure, and the sparkly. This is my Lilypat. You’re welcome. 🐰✨
          </div>
        </div>
      )}
      {page === "projects" && (
        <div style={{ textAlign: "center", marginTop: "2rem", color: "#be35be" }}>
          <div style={{ fontSize: "2rem" }}>🐇 Projects</div>
          <div>Link to my <a href="https://github.com/lilyhaschen" style={{ color: "#d254c9" }}>GitHub</a>!</div>
        </div>
      )}
      {page === "blog" && (
        <div style={{ textAlign: "center", marginTop: "2rem", color: "#be35be" }}>
          <div style={{ fontSize: "2rem" }}>૮꒰ ˶• ༝ •˶꒱ა ♡ Blog coming soon!</div>
        </div>
      )}
      {/* Footer */}
      <div style={{
        textAlign: "center",
        margin: "2.2rem 0 1.2rem 0",
        fontSize: "1rem"
      }}>
        ૮꒰ ˶• ༝ •˶꒱ა  /ᐢ. .ᐢ\\  • Powered by Lily’s kaomojis and glitter code
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
