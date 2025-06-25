import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// === SETUP YOUR SUPABASE ===
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_CODE = "bunmb2024"; // Set your admin code here for deletes

const githubUser = "lilyhaschen";
const IG = "📷";
const TW = "🎮";

const kaomojis = [
  // (Add your favorite kaomojis here, e.g.)
  "૮꒰ ˶• ༝ •˶꒱ა ♡",
  "₍ᐢ. .ᐢ₎",
  "╭◜◝  ͡  ◜◝ ╮",
  "૮Ꮚ ⑅ ´ ˘ ` Ꮚა.",
  "˚₊‧꒰ა ₍ᐢ.  ̫.ᐢ₎ ໒꒱ ‧₊˚",
  "૮₍  ˶•⤙•˶ ₎ა ./づ~ 🍓",
  "𓂋 ᡴ ◜  ͡    ͡    ͡   ╮⑅つ",
  "⋆ ୨  {\\   _   /}  ୧ ⋆",
  "ଘ꒰ა´͈ ᐜ `͈꒱ა* ✩",
  "૮₍ •̀ ⩊ •́ ₎ა (  ⊃⊂)",
  "૮꒰ ˶• ༝ •˶꒱ა  /ᐢ. .ᐢ\\",
  "૮₍ ˶•⤙•˶ ₎ა 🍓",
  // Add more from your list if desired!
];

const gothCrosses = [
  "⁺‧₊˚ ཐི⋆♱⋆ཋྀ ˚₊‧⁺",
  ".◞ ♱ ◟.",
  "─── ⋆⋅ ♰ ⋅⋆ ───",
  "˗ˏˋ𓆩†𓆪ˊˎ˗",
  "⭒ ༺♰༻ ⭒",
  "˚₊‧꒰ა ♱ ໒꒱ ‧₊˚",
  "‿̩͙⊱༒︎༻♱༺༒︎⊰‿̩͙"
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home");
  const [kaomoji, setKaomoji] = useState(randomItem(kaomojis));
  // Blog states
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState({});
  // Gallery states
  const [picFile, setPicFile] = useState(null);
  const [picCaption, setPicCaption] = useState("");
  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  // Random stuff states
  const [randomText, setRandomText] = useState("");
  const [randoms, setRandoms] = useState([]);
  const [loadingRandoms, setLoadingRandoms] = useState(false);
  // RPG states
  const [rpgFile, setRpgFile] = useState(null);
  const [rpgTitle, setRpgTitle] = useState("");
  const [rpgDescription, setRpgDescription] = useState("");
  const [rpg, setRpg] = useState([]);
  const [loadingRpg, setLoadingRpg] = useState(false);
  const [rpgCommentInputs, setRpgCommentInputs] = useState({});
  const [rpgComments, setRpgComments] = useState({});

  // --- Loaders ---
  useEffect(() => { fetchPosts(); fetchGallery(); fetchRandoms(); fetchRpg(); }, []);
  async function fetchPosts() {
    setLoadingPosts(true);
    let { data } = await supabase.from("posts").select("*").order("id", { ascending: false });
    setPosts(data || []);
    setLoadingPosts(false);
    let out = {};
    if (data) for (const p of data) {
      let { data: c } = await supabase.from("comments").select("*").eq("post_id", p.id);
      out[p.id] = c || [];
    }
    setComments(out);
  }
  async function fetchGallery() {
    setLoadingGallery(true);
    let { data } = await supabase.from("gallery").select("*").order("id", { ascending: false });
    setGallery(data || []);
    setLoadingGallery(false);
  }
  async function fetchRandoms() {
    setLoadingRandoms(true);
    let { data } = await supabase.from("randoms").select("*").order("id", { ascending: false });
    setRandoms(data || []);
    setLoadingRandoms(false);
  }
  async function fetchRpg() {
    setLoadingRpg(true);
    let { data } = await supabase.from("rpg").select("*").order("id", { ascending: false });
    setRpg(data || []);
    setLoadingRpg(false);
    // rpg comments
    let out = {};
    if (data) for (const r of data) {
      let { data: c } = await supabase.from("rpg_comments").select("*").eq("rpg_id", r.id);
      out[r.id] = c || [];
    }
    setRpgComments(out);
  }

  // --- Mutators ---
  async function addPost(e) {
    e.preventDefault();
    if (!blogTitle || !blogContent) return;
    await supabase.from("posts").insert([{ title: blogTitle, content: blogContent, date: new Date().toLocaleString() }]);
    setBlogTitle(""); setBlogContent("");
    fetchPosts();
  }
  async function deletePost(id) {
    if (window.prompt("Admin code to delete?") !== ADMIN_CODE) return;
    await supabase.from("posts").delete().eq("id", id);
    await supabase.from("comments").delete().eq("post_id", id);
    fetchPosts();
  }
  async function addComment(post_id) {
    let text = commentInputs[post_id] || "";
    if (!text) return;
    await supabase.from("comments").insert([{ post_id, content: text, date: new Date().toLocaleTimeString() }]);
    setCommentInputs({ ...commentInputs, [post_id]: "" });
    fetchPosts();
  }

  async function addPic(e) {
    e.preventDefault();
    if (!picFile) return;
    // Upload to Supabase Storage
    const filename = `${Date.now()}_${picFile.name}`;
    let { data, error } = await supabase.storage.from("gallery").upload(filename, picFile);
    if (error) { alert("Error uploading!"); return; }
    let url = supabase.storage.from("gallery").getPublicUrl(filename).data.publicUrl;
    await supabase.from("gallery").insert([{ url, caption: picCaption, date: new Date().toLocaleString() }]);
    setPicFile(null); setPicCaption("");
    fetchGallery();
  }
  async function deletePic(id) {
    if (window.prompt("Admin code to delete?") !== ADMIN_CODE) return;
    let { data: pic } = await supabase.from("gallery").select("*").eq("id", id).single();
    if (pic && pic.url) {
      const path = pic.url.split("/storage/v1/object/public/gallery/")[1];
      await supabase.storage.from("gallery").remove([path]);
    }
    await supabase.from("gallery").delete().eq("id", id);
    fetchGallery();
  }

  async function addRandom(e) {
    e.preventDefault();
    if (!randomText) return;
    await supabase.from("randoms").insert([{ content: randomText, date: new Date().toLocaleString() }]);
    setRandomText("");
    fetchRandoms();
  }
  async function deleteRandom(id) {
    if (window.prompt("Admin code to delete?") !== ADMIN_CODE) return;
    await supabase.from("randoms").delete().eq("id", id);
    fetchRandoms();
  }

  async function addRpg(e) {
    e.preventDefault();
    if (!rpgFile) return;
    const filename = `${Date.now()}_${rpgFile.name}`;
    let { data, error } = await supabase.storage.from("rpg").upload(filename, rpgFile);
    if (error) { alert("Error uploading!"); return; }
    let url = supabase.storage.from("rpg").getPublicUrl(filename).data.publicUrl;
    await supabase.from("rpg").insert([{ title: rpgTitle, description: rpgDescription, file_url: url, date: new Date().toLocaleString() }]);
    setRpgFile(null); setRpgTitle(""); setRpgDescription("");
    fetchRpg();
  }
  async function deleteRpg(id) {
    if (window.prompt("Admin code to delete?") !== ADMIN_CODE) return;
    await supabase.from("rpg").delete().eq("id", id);
    fetchRpg();
  }
  async function addRpgComment(rpg_id) {
    let text = rpgCommentInputs[rpg_id] || "";
    if (!text) return;
    await supabase.from("rpg_comments").insert([{ rpg_id, content: text, date: new Date().toLocaleTimeString() }]);
    setRpgCommentInputs({ ...rpgCommentInputs, [rpg_id]: "" });
    fetchRpg();
  }

  // === PAGES ===
  const AboutMe = () => (
    <div>
      <div style={{ fontSize: "2rem", margin: "1rem 0" }}>{theme === "light" ? kaomoji : randomItem(gothCrosses)}</div>
      <h1 style={{ marginBottom: 0, color: theme === "light" ? "#d254c9" : "#fff" }}>🌸 Welcome to my Lilypat 🐇💻</h1>
      <div style={{ marginBottom: "1.2rem", color: theme === "light" ? "#b75aa6" : "#ffb3e7" }}>
        (｡•̀ᴗ-)✧ Hi, I’m <b>Lily</b>! <a href={`https://github.com/${githubUser}`} target="_blank" rel="noopener noreferrer">@{githubUser}</a>
      </div>
      <div style={{ marginBottom: "1.2rem" }}>
        <a href="https://instagram.com/lilyhaschen" target="_blank" rel="noopener noreferrer" style={{ marginRight: 16 }}>{IG} Instagram</a>
        <a href="https://twitch.tv/lilyhaschen" target="_blank" rel="noopener noreferrer">{TW} Twitch</a>
      </div>
      <div style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "1.2rem" }}>
        <b>⋆˚ఎ 🌼 ໒˚⋆</b> <i>a cyber-bunny with a glitter grenade.</i><br />
        I do <b>cybersecurity</b>, <b>machine learning</b>, <b>cheerleading</b>, and questionable life choices, all while pretending I'm not held together by tea, chaos, and dog hair. <br />
        Christian-coded, engaged to a biologist. Single-file project lover.
      </div>
      <div style={{ margin: "1.2rem 0" }}>
        <b>⋆˚ఎ🐑🌷 [MAIN MISSION] ໒˚⋆</b><br />
        ୨♡୧ Build secure systems for actual cities<br />
        ୨୧ Design emotional support apps for humans (and AIs going through it)<br />
        ୨୧ Make silly games that sometimes cry back<br />
        ୨♡୧ Help you secure your digital kingdom while sipping iced tea in bunny slippers
      </div>
      <div>
        <b>⋆˚ఎ🐸🌷 [SIDE QUESTS]໒˚⋆</b><br />
        ୨♡୧ Organize events and somehow not burn them down<br />
        ୨୧ Teach kids to code and not scream when they rename files <span style={{ color: theme === "light" ? "#e08fc9" : "#ffb3e7" }}>"final_final_basdkasbdjhsbadashbdj(1).docx"</span><br />
        ୨♡୧ Fluent in Portuguese, English, Spanish, Japanese, German, Sindarin, and Goblinese (don’t test me)
      </div>
      <div style={{ margin: "1.2rem 0" }}>
        <i>A priest once called me a bomb—I said I’m a bunmb: half bunny, half blessing, full disruption.<br />
          (don't ask about my lore you are not prepared to hear what i went throw).</i><br />
        Let’s hop into the strange, the secure, and the sparkly. This is my Lilypat. You’re welcome. 🐰✨
      </div>
      <div>
        <b>⋆˚ఎ🐇🌷 [CODING PROJECTS]໒˚⋆</b><br />
        <ul>
          <li><b>SoftScan:</b> a cute terminal-based vulnerability scanner</li>
          <li><b>BunnyWall:</b> A terminal-based behavioral firewall</li>
        </ul>
      </div>
      <div style={{ marginTop: "1.2rem" }}>
        <b>⋆˚ఎ🐰🌷 [CURRENT STATS]໒˚⋆</b>
        <ul>
          <li>୨♡୧ Major: Computer Engineering (yes, I know what a transistor is, and no, I won't explain it again)</li>
          <li>୨♡୧ Side Skills: Freelance model, sewist, and cosplay</li>
          <li>୨♡୧ Special Power: Resilience with 1 HP and a dream</li>
          <li>୨୧ Alignment: Chaotic Good with a lawful aesthetic</li>
          <li>୨♡୧ XP Gain: +10 every time someone underestimates me</li>
        </ul>
      </div>
      <button onClick={() => setKaomoji(randomItem(kaomojis))} style={{ margin: "1.4rem 0", padding: "8px 16px", borderRadius: "12px", border: "none", background: "#f9b9e3", color: "#792084" }}>
        Show Random Kaomoji
      </button>
    </div>
  );

  const Projects = () => (
    <div>
      <div style={{ fontSize: "2rem", margin: "1rem 0" }}>₍ᐢ. .ᐢ₎✨</div>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>GitHub Projects</div>
      <a href={`https://github.com/${githubUser}`} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold", fontSize: "1.09rem" }}>@{githubUser} on GitHub</a>
    </div>
  );

  // Blog
  const Blog = () => (
    <div>
      <div style={{ fontSize: "2rem", margin: "1rem 0" }}>૮꒰ ˶• ༝ •˶꒱ა ♡</div>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Blog & Kaomoji Diary</div>
      <form onSubmit={addPost} style={{ marginBottom: "1.2rem" }}>
        <input type="text" placeholder="Blog post title" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} />
        <br />
        <textarea rows={3} placeholder="Write something cutesy or gothic..." value={blogContent} onChange={e => setBlogContent(e.target.value)} />
        <br />
        <button>Post</button>
      </form>
      {loadingPosts ? <div>Loading...</div> : null}
      <div>
        {posts.map(post =>
          <div key={post.id} style={{
            background: theme === "light" ? "#fffbe9cc" : "#16000bcc",
            border: "1px solid #ffd2ea",
            borderRadius: "1.1rem",
            margin: "1.2rem 0",
            padding: "1.2rem"
          }}>
            <div style={{ fontWeight: "bold" }}>{post.title}</div>
            <div style={{ fontSize: "1rem", margin: "0.5rem 0" }}>{post.content}</div>
            <div style={{ fontSize: "0.88rem", color: "#f6c7ea" }}>{post.date}</div>
            <button style={{ margin: "0.6rem 0" }} onClick={() => deletePost(post.id)}>Delete (admin)</button>
            <div>
              <div style={{ marginTop: 10, fontWeight: "bold" }}>Comments</div>
              {(comments[post.id] || []).map(c =>
                <div key={c.id} style={{ margin: "0.6rem 0", background: "#ffe4fa66", borderRadius: 7, padding: 4 }}>{c.content} <span style={{ color: "#eab1ed", fontSize: 12 }}>{c.date}</span></div>
              )}
              <input
                placeholder="Add comment..."
                value={commentInputs[post.id] || ""}
                onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                style={{ marginTop: 6, width: "90%" }}
              />
              <button style={{ margin: "0.4rem 0" }} onClick={() => addComment(post.id)}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Gallery
  const Gallery = () => (
    <div>
      <div style={{ fontSize: "2rem", margin: "1rem 0" }}>૮꒰ ˶• ༝ •˶꒱ა ♡</div>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Gallery</div>
      <form onSubmit={addPic} style={{ margin: "1.2rem 0" }}>
        <input type="file" accept="image/*" onChange={e => setPicFile(e.target.files[0])} />
        <input type="text" placeholder="caption (optional)" value={picCaption} onChange={e => setPicCaption(e.target.value)} />
        <button>Upload</button>
      </form>
      {loadingGallery ? <div>Loading...</div> : null}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {gallery.map(pic =>
          <div key={pic.id} style={{
            background: "#fffbe9cc",
            border: "1px solid #ffd2ea",
            borderRadius: "1.1rem",
            margin: "0.7rem 0",
            padding: "0.7rem"
          }}>
            <img src={pic.url} alt="pic" style={{ width: 160, borderRadius: 8, boxShadow: "0 2px 8px #d0b4ef33" }} />
            <div>{pic.caption}</div>
            <button style={{ margin: "0.3rem 0" }} onClick={() => deletePic(pic.id)}>Delete (admin)</button>
          </div>
        )}
      </div>
    </div>
  );

  // Random Stuff
  const RandomStuff = () => (
    <div>
      <div style={{ fontSize: "2rem", margin: "1rem 0" }}>૮꒰ ˶• ༝ •˶꒱ა ♡</div>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Random Stuff</div>
      <form onSubmit={addRandom} style={{ marginBottom: "1.2rem" }}>
        <input type="text" placeholder="Random text, idea, meme, fact..." value={randomText} onChange={e => setRandomText(e.target.value)} />
        <button>Post</button>
      </form>
      {loadingRandoms ? <div>Loading...</div> : null}
      <div>
        {randoms.map(item =>
          <div key={item.id} style={{
            background: "#fffbe9cc",
            border: "1px solid #ffd2ea",
            borderRadius: "1.1rem",
            margin: "1.2rem 0",
            padding: "1.2rem"
          }}>
            <div style={{ fontSize: "1rem", margin: "0.5rem 0" }}>{item.content}</div>
            <div style={{ fontSize: "0.88rem", color: "#f6c7ea" }}>{item.date}</div>
            <button style={{ margin: "0.6rem 0" }} onClick={() => deleteRandom(item.id)}>Delete (admin)</button>
          </div>
        )}
      </div>
    </div>
  );

  // RPG Table
  const Rpg = () => (
    <div>
      <div style={{ fontSize: "2rem", margin: "1rem 0" }}>૮꒰ ˶• ༝ •˶꒱ა ♡</div>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>RPG Table</div>
      <form onSubmit={addRpg} style={{ margin: "1.2rem 0" }}>
        <input type="file" onChange={e => setRpgFile(e.target.files[0])} />
        <input type="text" placeholder="Title" value={rpgTitle} onChange={e => setRpgTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={rpgDescription} onChange={e => setRpgDescription(e.target.value)} />
        <button>Upload RPG File</button>
      </form>
      {loadingRpg ? <div>Loading...</div> : null}
      <div>
        {rpg.map(r =>
          <div key={r.id} style={{
            background: "#fffbe9cc",
            border: "1px solid #ffd2ea",
            borderRadius: "1.1rem",
            margin: "1.2rem 0",
            padding: "1.2rem"
          }}>
            <div style={{ fontWeight: "bold" }}>{r.title}</div>
            <div style={{ fontSize: "1rem", margin: "0.5rem 0" }}>{r.description}</div>
            <div>
              <a href={r.file_url} target="_blank" rel="noopener noreferrer">Download File</a>
            </div>
            <div style={{ fontSize: "0.88rem", color: "#f6c7ea" }}>{r.date}</div>
            <button style={{ margin: "0.6rem 0" }} onClick={() => deleteRpg(r.id)}>Delete (admin)</button>
            <div>
              <div style={{ marginTop: 10, fontWeight: "bold" }}>Comments</div>
              {(rpgComments[r.id] || []).map(c =>
                <div key={c.id} style={{ margin: "0.6rem 0", background: "#ffe4fa66", borderRadius: 7, padding: 4 }}>{c.content} <span style={{ color: "#eab1ed", fontSize: 12 }}>{c.date}</span></div>
              )}
              <input
                placeholder="Add comment..."
                value={rpgCommentInputs[r.id] || ""}
                onChange={e => setRpgCommentInputs({ ...rpgCommentInputs, [r.id]: e.target.value })}
                style={{ marginTop: 6, width: "90%" }}
              />
              <button style={{ margin: "0.4rem 0" }} onClick={() => addRpgComment(r.id)}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // --- Main Layout ---
  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "Nunito, 'Comic Sans MS', Arial, sans-serif",
      background: theme === "light"
        ? "linear-gradient(120deg, #ffe6fa 0%, #fffde1 100%)"
        : "linear-gradient(120deg, #250010 0%, #1a001a 100%)",
      color: theme === "light" ? "#822e77" : "#ffe4fa"
    }}>
      {/* Nav */}
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center", gap: 22,
        padding: "22px 10px 8px 10px", fontWeight: "bold", fontSize: "1.18rem"
      }}>
        <span style={{ cursor: "pointer", color: page === "home" ? "#d254c9" : "" }} onClick={() => setPage("home")}>About</span>
        <span style={{ cursor: "pointer", color: page === "projects" ? "#d254c9" : "" }} onClick={() => setPage("projects")}>Projects</span>
        <span style={{ cursor: "pointer", color: page === "blog" ? "#d254c9" : "" }} onClick={() => setPage("blog")}>Blog</span>
        <span style={{ cursor: "pointer", color: page === "gallery" ? "#d254c9" : "" }} onClick={() => setPage("gallery")}>Gallery</span>
        <span style={{ cursor: "pointer", color: page === "random" ? "#d254c9" : "" }} onClick={() => setPage("random")}>Random</span>
        <span style={{ cursor: "pointer", color: page === "rpg" ? "#d254c9" : "" }} onClick={() => setPage("rpg")}>RPG</span>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{
            background: theme === "light" ? "#fff0fd" : "#200016",
            color: theme === "light" ? "#822e77" : "#ffe4fa",
            padding: "0.5em 1em",
            border: "none",
            borderRadius: 10,
            marginLeft: 10,
            fontWeight: "bold"
          }}>
          {theme === "light" ? "🦄 Cutesy" : "🕸️ Gothic"}
        </button>
      </div>

      {/* Crosses/Kaomoji for Gothic mode */}
      {theme === "dark" &&
        <div style={{ textAlign: "center", fontSize: "2.1rem", margin: "1.5rem 0" }}>
          {randomItem(gothCrosses)}
        </div>
      }

      {/* Page content */}
      {page === "home" && <AboutMe />}
      {page === "projects" && <Projects />}
      {page === "blog" && <Blog />}
      {page === "gallery" && <Gallery />}
      {page === "random" && <RandomStuff />}
      {page === "rpg" && <Rpg />}

      {/* Footer */}
      <div style={{
        textAlign: "center",
        margin: "2.2rem 0 1.2rem 0",
        fontSize: "1rem"
      }}>
        {theme === "light"
          ? "૮꒰ ˶• ༝ •˶꒱ა  /ᐢ. .ᐢ\\  • Powered by Lily’s kaomojis and glitter code"
          : "⭒ ༺♰༻ ⭒ 𓆩†𓆪 Bunnies in darkness still hop 𓆩†𓆪 ⭒ ༺♰༻ ⭒"
        }
      </div>
    </div>
  );
}
