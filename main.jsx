import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createClient } from "@supabase/supabase-js";

// === SUPABASE ===
const SUPABASE_URL = "https://muympxfudktsrqkvuzvd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11eW1weGZ1ZGt0c3Jxa3Z1enZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4Njk2MjMsImV4cCI6MjA2NjQ0NTYyM30.SDU8ZWhg_txrpj-tOU357uRuAyrT1fDnhg1P153sr1s";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_CODE = "bunmb2024"; // change this if you want!

// === STYLES (auto-injects) ===
const style = `
body {
  font-family: "Nunito", "Segoe UI", "sans-serif";
  margin: 0;
}
.lily-bg-light {
  background: linear-gradient(135deg, #fff1fa 0%, #fffbe9 50%, #ffe4f4 100%);
  color: #b75aa6;
  min-height: 100vh;
}
.lily-bg-dark {
  background: linear-gradient(135deg, #0a0a0a 0%, #360000 80%, #1a0000 100%);
  color: #ffb3e7;
  min-height: 100vh;
}
.lily-card {
  background: rgba(255,255,255,0.8);
  border-radius: 2rem;
  padding: 2rem;
  max-width: 550px;
  margin: 2rem auto;
  box-shadow: 0 2px 32px #f9d5ec66;
  border: 2px solid #ffe4f4;
}
.lily-card-dark {
  background: rgba(0,0,0,0.8);
  border-radius: 2rem;
  padding: 2rem;
  max-width: 550px;
  margin: 2rem auto;
  box-shadow: 0 2px 32px #2d001566;
  border: 2px solid #b73a52;
}
.lily-btn {
  background: #ffc5e2;
  color: #b75aa6;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1.2rem;
  font-weight: bold;
  margin: 0.4rem;
  cursor: pointer;
  transition: background 0.2s;
}
.lily-btn:hover {
  background: #fffbe9;
  color: #d14370;
}
.lily-btn-dark {
  background: #1a0000;
  color: #ffb3e7;
  border: 1.5px solid #ffb3e7;
}
.lily-btn-dark:hover {
  background: #b73a52;
  color: #fff1fa;
}
.lily-nav {
  display: flex; gap: 0.5rem; justify-content: center; margin: 0.5rem;
  flex-wrap: wrap;
}
.lily-kaomoji {
  font-family: "monospace", "Fira Mono", "Segoe UI";
  font-size: 1.4rem;
  white-space: pre;
  text-align: center;
  margin-bottom: 0.8rem;
  color: #b75aa6;
}
.lily-kaomoji-dark {
  color: #ffb3e7;
}
.lily-goth {
  font-family: "monospace", "Fira Mono";
  font-size: 1.2rem;
  text-align: center;
  color: #ffb3e7;
  margin: 0.7rem 0;
}
.lily-section-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0 0.7rem 0;
  text-align: left;
  letter-spacing: -1px;
}
.lily-footer {
  text-align: center;
  font-size: 1rem;
  margin: 3rem 0 1.5rem 0;
  opacity: 0.75;
}
a {
  color: #d14370;
  text-decoration: underline;
}
a:visited { color: #b75aa6; }
.lily-dark a { color: #ffb3e7; }
.lily-dark a:visited { color: #f47e90; }
::-webkit-scrollbar { width: 6px; background: #fffbe9; }
::-webkit-scrollbar-thumb { background: #ffc5e2; border-radius: 6px; }
.lily-dark ::-webkit-scrollbar { background: #200012; }
.lily-dark ::-webkit-scrollbar-thumb { background: #b73a52; }
input[type="text"], textarea {
  border-radius: 1rem;
  border: 1px solid #ffc5e2;
  padding: 0.4rem 0.8rem;
  margin-bottom: 0.5rem;
  width: 60%;
}
input[type="text"]:focus, textarea:focus { outline: 2px solid #ffc5e2; }
.lily-dark input[type="text"], .lily-dark textarea {
  border: 1px solid #b73a52;
  background: #1a0000;
  color: #ffb3e7;
}
.lily-dark input[type="text"]:focus, .lily-dark textarea:focus { outline: 2px solid #ffb3e7; }
`;

// --- Data ---
const kaomojis = [
  "૮꒰ ˶• ༝ •˶꒱ა ♡", "₍ᐢ. .ᐢ₎", "╭◜◝  ͡  ◜◝ ╮", "૮Ꮚ ⑅ ´ ˘ ` Ꮚა.",
  "˚₊‧꒰ა ₍ᐢ.  ̫.ᐢ₎ ໒꒱ ‧₊˚", "૮₍  ˶•⤙•˶ ₎ა ./づ~ 🍓",
  "𓂋 ᡴ ◜  ͡    ͡    ͡   ╮⑅つ", "⋆ ୨  {\\   _   /}  ୧ ⋆",
  "ଘ꒰ა´͈ ᐜ `͈꒱ა* ✩", "૮₍ •̀ ⩊ •́ ₎ა (  ⊃⊂)", "૮꒰ ˶• ༝ •˶꒱ა  /ᐢ. .ᐢ\\",
  "૮₍ ˶•⤙•˶ ₎ა 🍓",
];
const sillyTexts = [
  "Tea-fueled and slightly menacing!", "Bunny mode: activated.", "Running on glitter and questionable choices.",
  "Feeling like a cryptid in slippers!", "99% kaomoji, 1% bug fix.", "Ready to hack the mainframe (again).",
  "Wishing for infinite iced tea.", "Bunmb on the loose!", "Stressed, blessed, and bunny-obsessed.",
  "Awaiting cosmic alignment...", "I debug with sparkles.", "Kaomoji power-up!"
];
const gothCrosses = [
  "⁺‧₊˚ ཐི⋆♱⋆ཋྀ ˚₊‧⁺", ".◞ ♱ ◟.", "─── ⋆⋅ ♰ ⋅⋆ ───",
  "˗ˏˋ𓆩†𓆪ˊˎ˗", "⭒ ༺♰༻ ⭒", "˚₊‧꒰ა ♱ ໒꒱ ‧₊˚", "‿̩͙⊱༒︎༻♱༺༒︎⊰‿̩͙"
];
function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function injectStyle() {
  if (!document.getElementById("lily-css")) {
    const s = document.createElement("style");
    s.id = "lily-css";
    s.innerHTML = style;
    document.head.appendChild(s);
  }
}

// --- Main App ---
function App() {
  useEffect(injectStyle, []);
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home");
  const [kaomoji, setKaomoji] = useState(randomItem(kaomojis));
  const [surprise, setSurprise] = useState({kaomoji: randomItem(kaomojis), text: randomItem(sillyTexts)});
  function handleSurprise() {
    setSurprise({kaomoji: randomItem(kaomojis), text: randomItem(sillyTexts)});
  }

  // --- GitHub Projects ---
  const githubUser = "lilyhaschen";
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  useEffect(() => {
    if (page === "projects") {
      setLoadingRepos(true);
      fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated`)
        .then(r => r.json())
        .then(arr => { setRepos(Array.isArray(arr) ? arr : []); setLoadingRepos(false); });
    }
  }, [page]);

  // === Blog
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState({});
  // === Gallery
  const [picFile, setPicFile] = useState(null);
  const [picCaption, setPicCaption] = useState("");
  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  // === Random Stuff
  const [randomText, setRandomText] = useState("");
  const [randoms, setRandoms] = useState([]);
  const [loadingRandoms, setLoadingRandoms] = useState(false);
  // === RPG
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
    const filename = `${Date.now()}_${picFile.name}`;
    let { error } = await supabase.storage.from("gallery").upload(filename, picFile);
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
    let { error } = await supabase.storage.from("rpg").upload(filename, rpgFile);
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
    <div className={theme === "light" ? "lily-card" : "lily-card-dark"}>
      <div className={theme === "light" ? "lily-kaomoji" : "lily-kaomoji lily-kaomoji-dark"}>{kaomoji}</div>
      <h1 className="lily-section-title" style={{ marginBottom: 0 }}>🌸 Welcome to my Lilypat 🐇💻</h1>
      <div style={{marginBottom:"1.2rem", color: theme === "light" ? "#b75aa6":"#ffb3e7"}}>
        (｡•̀ᴗ-)✧ Hi, I’m <b>Lily</b>! <a href={`https://github.com/lilyhaschen`} target="_blank" rel="noopener noreferrer">@lilyhaschen</a>
      </div>
      <div style={{marginBottom:"1.2rem"}}>
        <a href="https://instagram.com/lilyhaschen" target="_blank" rel="noopener noreferrer" style={{marginRight:16}}>📷 Instagram</a>
        <a href="https://twitch.tv/lilyhaschen" target="_blank" rel="noopener noreferrer">🎮 Twitch</a>
      </div>
      <div style={{fontSize:"1.1rem", lineHeight:"1.7", marginBottom:"1.2rem"}}>
        <b>⋆˚ఎ 🌼 ໒˚⋆</b> <i>a cyber-bunny with a glitter grenade.</i><br/>
        I do <b>cybersecurity</b>, <b>machine learning</b>, <b>cheerleading</b>, and questionable life choices, all while pretending I'm not held together by tea, chaos, and dog hair. <br/>
        Christian-coded, engaged to a biologist. Single-file project lover.
      </div>
      <div style={{margin:"1.2rem 0"}}>
        <b>⋆˚ఎ🐑🌷 [MAIN MISSION] ໒˚⋆</b><br/>
        ୨♡୧ Build secure systems for actual cities<br/>
        ୨୧ Design emotional support apps for humans (and AIs going through it)<br/>
        ୨୧ Make silly games that sometimes cry back<br/>
        ୨♡୧ Help you secure your digital kingdom while sipping iced tea in bunny slippers
      </div>
      <div>
        <b>⋆˚ఎ🐸🌷 [SIDE QUESTS]໒˚⋆</b><br/>
        ୨♡୧ Organize events and somehow not burn them down<br/>
        ୨୧ Teach kids to code and not scream when they rename files <span style={{color: theme === "light" ? "#e08fc9":"#ffb3e7"}}>"final_final_basdkasbdjhsbadashbdj(1).docx"</span><br/>
        ୨♡୧ Fluent in Portuguese, English, Spanish, Japanese, German, Sindarin, and Goblinese (don’t test me)
      </div>
      <div style={{margin: "1.2rem 0"}}>
        <i>A priest once called me a bomb—I said I’m a bunmb: half bunny, half blessing, full disruption.<br/>
        (don't ask about my lore you are not prepared to hear what i went throw).</i><br/>
        Let’s hop into the strange, the secure, and the sparkly. This is my Lilypat. You’re welcome. 🐰✨
      </div>
      <div>
        <b>⋆˚ఎ🐇🌷 [CODING PROJECTS]໒˚⋆</b><br/>
        <ul>
          <li><b>SoftScan:</b> a cute terminal-based vulnerability scanner</li>
          <li><b>BunnyWall:</b> A terminal-based behavioral firewall</li>
        </ul>
      </div>
      <div style={{marginTop:"1.2rem"}}>
        <b>⋆˚ఎ🐰🌷 [CURRENT STATS]໒˚⋆</b>
        <ul>
          <li>୨♡୧ Major: Computer Engineering (yes, I know what a transistor is, and no, I won't explain it again)</li>
          <li>୨♡୧ Side Skills: Freelance model, sewist, and cosplay</li>
          <li>୨♡୧ Special Power: Resilience with 1 HP and a dream</li>
          <li>୨୧ Alignment: Chaotic Good with a lawful aesthetic</li>
          <li>୨♡୧ XP Gain: +10 every time someone underestimates me</li>
        </ul>
      </div>
      <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} onClick={()=>setKaomoji(randomItem(kaomojis))}>
        Show Random Kaomoji
      </button>
    </div>
  );

  const Projects = () => (
    <div className={theme === "light" ? "lily-card" : "lily-card-dark"}>
      <div className={theme === "light" ? "lily-kaomoji" : "lily-kaomoji lily-kaomoji-dark"}>₍ᐢ. .ᐢ₎✨</div>
      <div className="lily-section-title">My GitHub Projects</div>
      <div style={{fontSize:"1rem", marginBottom:12}}>Here are my latest silly/serious repos, live from GitHub:</div>
      {loadingRepos ? <div style={{textAlign:"center"}}>Loading repos...</div> : null}
      <div>
        {repos.map(repo => (
          <div key={repo.id} style={{
            background: theme === "light" ? "#ffe4f4cc":"#1a0000cc",
            border: "1px solid #ffd2ea",
            borderRadius: "1.1rem",
            margin: "1rem 0",
            padding: "1.1rem"
          }}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{fontWeight:"bold", fontSize:"1.09rem"}}>{repo.name}</a>
            <div style={{fontSize:"0.98rem", margin:"0.4rem 0"}}>{repo.description}</div>
            <div style={{fontSize:"0.8rem"}}>
              {repo.language && <span style={{marginRight:"1.2rem"}}>💻 {repo.language}</span>}
              <span>★ {repo.stargazers_count}</span>
              <span style={{marginLeft:"1.2rem"}}>Last update: {repo.updated_at.slice(0,10)}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{fontSize:"0.92rem", marginTop:"1rem", textAlign:"center", opacity:0.8}}>
        GitHub: <b>@{githubUser}</b> 🐇
      </div>
    </div>
  );

  const Blog = () => (
    <div className={theme === "light" ? "lily-card" : "lily-card-dark"}>
      <div className={theme === "light" ? "lily-kaomoji" : "lily-kaomoji lily-kaomoji-dark"}>૮꒰ ˶• ༝ •˶꒱ა ♡</div>
      <div className="lily-section-title">Blog & Kaomoji Diary</div>
      <form onSubmit={addPost} style={{ marginBottom: "1.2rem" }}>
        <input type="text" placeholder="Blog post title" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} />
        <br />
        <textarea rows={3} placeholder="Write something cutesy or gothic..." value={blogContent} onChange={e => setBlogContent(e.target.value)} />
        <br />
        <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"}>Post</button>
      </form>
      {loadingPosts ? <div style={{textAlign:"center"}}>Loading...</div> : null}
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
            <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} style={{ margin: "0.6rem 0" }} onClick={() => deletePost(post.id)}>Delete (admin)</button>
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
              <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} style={{ margin: "0.4rem 0" }} onClick={() => addComment(post.id)}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const Gallery = () => (
    <div className={theme === "light" ? "lily-card" : "lily-card-dark"}>
      <div className={theme === "light" ? "lily-kaomoji" : "lily-kaomoji lily-kaomoji-dark"}>૮꒰ ˶• ༝ •˶꒱ა ♡</div>
      <div className="lily-section-title">Gallery</div>
      <form onSubmit={addPic} style={{ margin: "1.2rem 0" }}>
        <input type="file" accept="image/*" onChange={e => setPicFile(e.target.files[0])} />
        <input type="text" placeholder="caption (optional)" value={picCaption} onChange={e => setPicCaption(e.target.value)} />
        <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"}>Upload</button>
      </form>
      {loadingGallery ? <div style={{textAlign:"center"}}>Loading...</div> : null}
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
            <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} style={{ margin: "0.3rem 0" }} onClick={() => deletePic(pic.id)}>Delete (admin)</button>
          </div>
        )}
      </div>
    </div>
  );

  const RandomStuff = () => (
    <div className={theme === "light" ? "lily-card" : "lily-card-dark"}>
      <div className={theme === "light" ? "lily-kaomoji" : "lily-kaomoji lily-kaomoji-dark"}>૮꒰ ˶• ༝ •˶꒱ა ♡</div>
      <div className="lily-section-title">Random Stuff</div>
      <form onSubmit={addRandom} style={{ marginBottom: "1.2rem" }}>
        <input type="text" placeholder="Random text, idea, meme, fact..." value={randomText} onChange={e => setRandomText(e.target.value)} />
        <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"}>Post</button>
      </form>
      {loadingRandoms ? <div style={{textAlign:"center"}}>Loading...</div> : null}
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
            <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} style={{ margin: "0.6rem 0" }} onClick={() => deleteRandom(item.id)}>Delete (admin)</button>
          </div>
        )}
      </div>
    </div>
  );

  const Rpg = () => (
    <div className={theme === "light" ? "lily-card" : "lily-card-dark"}>
      <div className={theme === "light" ? "lily-kaomoji" : "lily-kaomoji lily-kaomoji-dark"}>૮꒰ ˶• ༝ •˶꒱ა ♡</div>
      <div className="lily-section-title">RPG Table</div>
      <form onSubmit={addRpg} style={{ margin: "1.2rem 0" }}>
        <input type="file" onChange={e => setRpgFile(e.target.files[0])} />
        <input type="text" placeholder="Title" value={rpgTitle} onChange={e => setRpgTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={rpgDescription} onChange={e => setRpgDescription(e.target.value)} />
        <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"}>Upload RPG File</button>
      </form>
      {loadingRpg ? <div style={{textAlign:"center"}}>Loading...</div> : null}
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
            <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} style={{ margin: "0.6rem 0" }} onClick={() => deleteRpg(r.id)}>Delete (admin)</button>
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
              <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} style={{ margin: "0.4rem 0" }} onClick={() => addRpgComment(r.id)}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // --- Layout ---
  return (
    <div className={theme === "light" ? "lily-bg-light" : "lily-bg-dark lily-dark"}>
      {/* NAV */}
      <nav className="lily-nav" style={{marginTop:"1.1rem"}}>
        <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} onClick={()=>setPage("home")}>About</button>
        <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} onClick={()=>setPage("projects")}>Projects</button>
        <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} onClick={()=>setPage("blog")}>Blog</button>
        <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} onClick={()=>setPage("gallery")}>Gallery</button>
        <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} onClick={()=>setPage("random")}>Random</button>
        <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"} onClick={()=>setPage("rpg")}>RPG</button>
        <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"}
          onClick={() => setTheme(theme==="light"?"dark":"light")}
        >{theme==="light" ? "🕸️ Gothic" : "🌸 Cutesy"}</button>
        <button className={theme === "light" ? "lily-btn" : "lily-btn lily-btn-dark"}
          style={{marginLeft: 10, fontWeight:"bold"}}
          onClick={handleSurprise}
        >Surprise Me!</button>
      </nav>

      {/* GOTHIC crosses */}
      {theme==="dark" && <div className="lily-goth">{randomItem(gothCrosses)}</div>}

      {/* SURPRISE KAOMOJI/TEXT */}
      <div style={{
        textAlign: "center",
        fontFamily: "monospace",
        fontSize: "1.2rem",
        color: theme === "light" ? "#d14370" : "#ffb3e7",
        margin: "0.7rem 0"
      }}>
        {surprise.kaomoji} <br />
        <span style={{fontSize:"1.08rem", fontStyle:"italic"}}>{surprise.text}</span>
      </div>

      {/* PAGE CONTENT */}
      {page==="home" && <AboutMe />}
      {page==="projects" && <Projects />}
      {page==="blog" && <Blog />}
      {page==="gallery" && <Gallery />}
      {page==="random" && <RandomStuff />}
      {page==="rpg" && <Rpg />}

      {/* FOOTER */}
      <div className="lily-footer">
        {theme==="light"
          ? "૮꒰ ˶• ༝ •˶꒱ა  /ᐢ. .ᐢ\\  • Powered by Lily’s kaomojis and glitter code"
          : "⭒ ༺♰༻ ⭒ 𓆩†𓆪 Bunnies in darkness still hop 𓆩†𓆪 ⭒ ༺♰༻ ⭒"
        }
      </div>
    </div>
  );
}

// --- Mount to page (if not using main.jsx for entry, wrap this with ReactDOM.createRoot)
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
