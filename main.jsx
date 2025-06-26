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
    `     ◜ ͡ ͡ ◝
    ૮ ﾉ ྀི 𓏼 ˊ͈ ˔  ) ··﹖
  　  ╭◜◝ ͡ ʿʿ◝ ͡  𝜗𝜚 `,
    `ᘏ ⑅ ᘏ   ഒ    zᶻ
  ꒰˶  - ˕ -꒱ ⌒)ᦱ`,
  `╭◜◝  ͡  ◜◝ ╮
  ૮Ꮚ ⑅ ´ ˘  Ꮚა.
    (     ꜆🥛꜀   )`,
  `╭◜◝ ◜◝ ╮ .◜◝ -◜◝.
  ૮Ꮚ ⑅𓈒◞ ତ◟Ꮚ︲ତ︲ Ꮚ
  ꒰　　 　 ꔫ っ꒰　 ꜆ ꔫ ꜀ ꒱
  ⊹　 ︶︶　 ୨୧　 ︶︶　 ⊹`,
  "૮꒰ ˶• ༝ •˶꒱ა ♡",
  "₍ᐢ. .ᐢ₎",
  `ᘏ ⑅ ᘏ   ഒ    zᶻ
  ꒰˶  - ˕ -꒱ ⌒)ᦱ`, 
    `ᘏ ⑅ ᘏ   ഒ    zᶻ
  ꒰˶  - ˕ -꒱ ⌒)ᦱ`,
  `╭◜◝  ͡  ◜◝ ╮
  ૮Ꮚ ⑅ ´ ˘  Ꮚა.
    (     ꜆🥛꜀   )`,
  `╭◜◝ ◜◝ ╮ .◜◝ -◜◝.
  ૮Ꮚ ⑅𓈒◞ ତ◟Ꮚ︲ତ︲ Ꮚ
  ꒰　　 　 ꔫ っ꒰　 ꜆ ꔫ ꜀ ꒱
  ⊹　 ︶︶　 ୨୧　 ︶︶　 ⊹`,
  "૮꒰ ˶• ༝ •˶꒱ა ♡",
  "₍ᐢ. .ᐢ₎",
  `ᘏ ⑅ ᘏ   ഒ    zᶻ
  ꒰˶  - ˕ -꒱ ⌒)ᦱ`, 
  "˚₊‧꒰ა ₍ᐢ.  ̫.ᐢ₎ ໒꒱ ‧₊˚",
  `                 ♡
           (\\_(\\      /)_/)
           (      )    (      )
           ૮/ʚɞ  |ა     ૮|  ʚɞ\\ა 
          ( ◌    |        |     ◌ )`,
  "˚₊‧꒰ა ₍ᐢ.  ̫.ᐢ₎ ໒꒱ ‧₊˚",
  `      /ᐢ⑅ᐢ\\   ♡   ₊˚  
        ꒰ ˶• ༝ •˶꒱       ♡‧₊˚    ♡
      ./づ~ :¨·.·¨:     ₊˚   
               ·..·‘    ₊˚   ♡`,
  `☆ ᕱ⑅ᕱ
  ପ(„• ༝ •„)ଓ
  ┏━∪∪━━━━━━━━━━━━`,
  `૮₍ •̀ ⩊ •́ ₎ა 
  (  ⊃⊂)`,
  `૮₍  ˶•⤙•˶ ₎ა 
  ./づ~ 🍓`,
  `       ᕬ   ᕬ 
  ദ്ദി    ꒰≧ᆺ≦꒱`,
  `⠀⠀⠀⠀𓂋 ⠀⠀⠀
    ᡴ ◜  ͡    ͡    ͡   ╮⑅つ   ⠀ ⠀ ⊹⠀   ྀི  . 
  ꒰  𓏼  ◞  ˔  ◟ 𓏼  ꒱ ⠀    ⠀    ⠀ 　
  ╰- ⠀ ⑅ ⠀-╯ ⸝⸝⸝⸝    ) ഒ ⠀    
  ૮      ૮◟  _ ノと `,
  `  ⋆ ୨  {\\   _   /}  ୧ ⋆ 
    •  ₊   ꒰  ᵔ ㅅᵔ  ꒱    ₊  •`,
  "‪ଘ꒰ა´͈ ᐜ ͈꒱ა* ✩ ",
  `╱|、
  (˚ˎ 。7  
   |、˜〵           
  じしˍ,)ノ`,
  `⠀⠀⠀⠀⣠⠤⣄⣀⣠⠤⣄⠀⠀⠀
  ⠀⠀⠀⡼⢡⠖⢦⠉⡴⠲⡌⢧⠀⠀
  ⠀⡴⢋⣁⡘⢦⠾⠀⠷⡴⢃⣈⡙⢦
  ⠰⡇⢯⠀⡷⠀⢠⠤⣄⠀⢾⠀⡽⢸
  ⠀⠹⢬⠉⢁⡴⠋⠀⠘⢦⡈⠉⡥⠏
  ⠀⠀⠘⣆⠘⢧⣤⠤⣤⡼⠃⣰⠃⠀
  ⠀⠀⠀⠈⠳⢤⣀⣀⣀⡤⠖⠁ 
        ౨ৎ `,
  `    /ᐢ⑅ᐢ\\
        ꒰ ˶• ༝ •˶꒱
      ./づ~ :¨·.·¨:
               ·..·‘`,
  ` /\___/\\
  ꒰ ˶• ༝ - ˶꒱ 
  ./づ~🍰  `,
    // --- single line / cute variants ---
  ];
  const sillykaomojis = [
  "૮ ˙Ⱉ˙ ა rawr!",
  "/ᐠ. ｡.ᐟ\\ᵐᵉᵒʷˎˊ˗",
  "ʕ•̫͡•ʔ",
  "୧⍤⃝💐",
  "૮₍•᷄ ࡇ •᷅₎ა",
  "૮ ˶´ ᵕˋ ˶ა",
  "૮₍ ˶• ˔ ต ₎ა",
  "૮₍´｡ᵔ ꈊ ᵔ｡₎ა",
  "૮(ˊ ᵔ ˋ)ა",
  "૮₍˶Ó﹏Ò ⑅₎ა",
  "( 　'-' )ノ💥)-' )",
  "(๑>؂•̀๑)",
  "☆⌒(ゝ｡  ∂)",
  "꒰ ˶ᵔ ᵕ ᵔ˶ ꒱",
  "ପ(⑅ˊᵕˋ⑅)ଓ",
  "٩(ˊᗜˋ*)و ♡",
  "( ⸝⸝´꒳⸝⸝)",
  "ദ്ദി ˉ͈̀꒳ˉ͈́ )✧",
  "૮ • ﻌ - ა",
  "૮₍´˶• . • ⑅ ₎ა",
  "(っ- ‸ - ς)",
  "૮₍⇀‸↼‶₎ა",
  "૮₍˶Ó﹏Ò ⑅₎ა",
  "૮₍˶•. • ⑅₎ა ♡",
  "૮꒰ ˵• ﻌ •˵꒱ა",
  "૮ ₍ ´• ˕ • ₎ა",
  "૮₍ ๑ • ᵜ ก ๑ ₎ა࣪",
  "૮ ₍ •⤙•˶",
  "૮₍˶˃ ᵕ ˂˶₎ა",
  "૮₍ ˶• ˔ ต ₎ა",
  "૮₍´˶• . • ⑅ ₎ა",
  "૮₍⇀‸↼‶₎ა",
  "(๑ᵔ⤙ᵔ๑)",
  "(๑ •ﻌ•๑ )",
  "(๑ᵔ⤙ᵔ๑)",
  "૮ ˙Ⱉ˙ ა",
  "૮(ˊ ᵔ ˋ)ა",
  "૮₍´˶• . • ⑅ ₎ა",
  "( ๑˃̶ ꇴ ˂̶)♪⁺",
  "(๑˃́ꇴ˂̀๑)",
  "૮₍๑•ˑก₎ა",
  "૮₍ ˃̵͈᷄ . ˂̵͈᷅ ₎ა",
  "૮₍ ˃̵͈᷄ . ฅ ₎ა",
  "૮ ˊ͈ . ˋ͈ ა",
  "(◍˃̶ᗜ˂̶◍)ﾉ”",
  "(◍•ᴗ•◍)",
  "ʚ(｡˃ ᵕ ˂ )ɞ",
  "૮₍´˶• . • ⑅ ₎ა",
  "૮ • ﻌ - ა⁩",
  "( ˶ˆᗜˆ˵ )",
  "(ᵕ—ᴗ—)",
  "(˶˃ ᵕ ˂˶) .ᐟ.ᐟ",
  "( ･ิω･ิ )",
  "(つ᎑•᷅)♡",
  "(•᷄ - •᷅ )",
  "(*꒦ິ꒳꒦ີ)",
  "૮₍ ˶• ˔ ต ₎ა",
  "(ιº o º)!",
  "(｡ᵔ ᗜᵔ｡)",
  "(つ˶ᵕ˶)つ",
  "(* - -)",
  "(╥﹏╥)",
  "(ιº o º)!",
  "(·へ·)",
  "(っ- ‸ - ς)",
  "(◍•ᴗ•◍)",
  "(●'◡'●)",
  "꒰˘꒳˘๑꒱",
  "ฅ^•ﻌ•^ฅ",
  "(๑ᵔ⤙ᵔ๑)",
  "(๑•́o•̀๑)",
  "૮⍝• ᴥ •⍝ა",
  "(๑•́ ᎔ ก̀๑)",
  "(๑ó⌓ò๑)",
  "(๑•﹏•)",
  "ʅ(๑ ᷄ω ᷅ )ʃ",
  "૮₍ •⤙•˶",
  "૮˙Ⱉ˙ ა",
  "(っ- ‸ - ς)",
  "(⌒^⌒)ｂ",
  "ᡣ • . • 𐭩 ♡",
  "૮₍ ´• ˕ •₎ა",
  "(ฅ• . •ฅ)",
  "ʕ •ᴥ•ʔ",
  "꒰⑅ᵕ༚ᵕ꒱˖♡",
  "(⸝⸝⸝ > ᴥ <⸝⸝⸝)",
  "(=①ω①=)",
  "૮ ˶ᵔ ﻌ ᵔ˶ ა",
  "ฅ^•ﻌ•^ฅ",
  "ʕ๑•ᴥ•๑ʔ",
  "૮₍⸝⸝´ᵕ`⸝⸝₎ა",
  "(,,>ᆺ<,,)",
  "(｡・ﻌ・｡)",
  "૮₍ • ﻌ • ₎ა",
  "(˶ˆ꒳ˆ˶)",
  "(=^-ω-^=)",
  "ʕ•ﻌ•ʔฅ",
  "૮₍•ﻌ•₎ა",
  "꒰｡•(ｪ)•｡꒱",
  "ฅ( ̳• ◡ • ̳)ฅ",
  "૮꒰´•ﻌ•`꒱ა",
  "(๑ↀᆺↀ๑)",
  "ʕ≧㉨≦ʔ",
  "( ´•̥̥̥ω•̥̥̥` )",
  "૮₍´｡• ᵕ •｡`₎ა",
  "ฅ(≚ᄌ≚)",
  "ʕ⌒ᴥ⌒ʔ",
  "૮₍•ɞ•₎ა",
  "(˃̣̣̥⺫˂̣̣̥)",
  "(=ＴェＴ=)",
  "ʕฅ•ᴥ•ฅʔ",
  "૮₍˶´ﻌˋ˶₎ა",
  "ฅ(●´ω｀●)ฅ",
  "( •́ㅅ•̀ )",
  "ʕ•̫͡•ʔ",
  "૮₍ ˶•༚•˶ ₎ა",
  "(｡･ω･｡)",
  "ʕ – ᴥ – ʔ",
  "꒰๑˃̵ᴗ˂̵꒱",
  "(=ↀωↀ=)",
  "ʕ•́ᴥ•̀ʔっ",
  "૮₍´• ﻌ •`₎ა",
  "ฅ(＾・ω・＾ฅ)",
  "ʕ ᵔᴥᵔ ʔ",
  "(˶′◡‵˶)",
  "(=^･ｪ･^=)",
  "૮꒰•༚•꒱ა",
  "(๑•̀ㅁ•́ฅ)",
  "ʕ´•ᴥ•`ʔ",
  "(ꃋᴖꃋ)",
  "૮₍´｡• •｡`₎ა",
  "(⁎˃ᴗ˂⁎)",
  "ฅ(≚ᄌ≚)∫",
  "ʕ๑•ﻌ•๑ʔ",
  "૮₍ ˶• ༝ •˶ ₎ა",
  "(=^-ω-^=)",
  "ʕ´•ﻌ•`ʔ",
  "(⸝⸝•ᴗ•⸝⸝)",
  "(ฅ•ω•ฅ)",
  "૮꒰ ˶• ༝ •˶ ꒱ა",
  "( •ω•ฅ)",
  "ʕʽɞʼʔ",
  "(｡･(ｴ)･｡)",
  "꒰˶• ༚ •˶꒱",
  "૮₍ ´• ༝ •˶ ₎ა",
  "(ฅ´•ᴗ•`ฅ)",
  "(ꈍᴗꈍ)",
  "ʕ •̣̣̣̣ ﻌ •̣̣̣̣ ʔ",
  "૮₍⸝⸝´꒳`⸝⸝₎ა",
  "(= ᵕ ⋏ ᵕ =)",
  "ʕ灬╹ᴥ╹灬ʔ",
  "(ꃋᴖꃋ)",
  "૮₍ ˶• . •˶ ₎ა",
  "(ฅ•◇•ฅ)",
  "ʕ ˶•ᴥ•˶ ʔ",
  "꒰´꒳`꒱",
  "૮₍ ⸝⸝•͈ᴗ•͈⸝⸝ ₎ა",
  "(=^-ω-^=)",
  "ʕ´•ᴥ•`ʔ",
  "꒰˘̩̩̩⌓˘̩̩̩꒱",
  "૮꒰ ˶• ⸝⸝•˶ ꒱ა",
  "(ฅ•ω•ฅ)",
  "ʕ•⩊•ʔ",
  "( ˶ᵔᵕᵔ˶ )",
     "(｡•̀ᴗ-)✧",
  "(๑•̀ㅂ•́)و✧",
  "(｡♥‿♥｡)",
  "(ﾉ´ヮ`)ﾉ*: ･ﾟ✧",
  "(´･_･`)",
  "(⊙ω⊙)",
  "(｡•̀ᴗ-)✧",
  "( ˘ ³˘)♥",
  "(๑˃̵ᴗ˂̵)و",
  "(~_^)",
  "(ʘ‿ʘ)╯",
  "ლ(´ڡ`ლ)",
  "(*≧▽≦)",
  "( ´ ▽ ` )ﾉ",
  "(°∀°)b",
  "( ° ᴗ° )✧",
    "(ಥ﹏ಥ)",
  "(ᗒᗜᗕ)՛̵̖",
  "(☞ﾟ∀ﾟ)☞",
  "(*≧ω≦)",
  "(ง •̀_•́)ง",
  "(¬▂¬)",
  "( ͡°╭͜ʖ╮͡° )",
  "( ◉ ʖ ◉)",
  "ᕕ( ᐛ )ᕗ",
  "(งツ)ว",
  "(≖ᴗ≖✿)",
  "(*≧▽≦)",
  "(☞ ͡° ͜ʖ ͡°)☞",
  "(⊙_☉)",
  "(ʘ‿ʘ)",
  "༼ つ ◕_◕ ༽つ", 
  "ʕノ•ᴥ•ʔノ ︵ ┻━┻",
  "(¬‿¬ )っ¤~•",
  "(⊙ω⊙✿)",
  "(づ｡◕‿‿◕｡)づ",
  "（＞ｙ＜）",
  "( ﾟ∀ ﾟ)",
  "(☞ﾟヮﾟ)☞",
  "(ﾟヮﾟ)",
];
const sillyTexts = [
 "You rolled a nat 1 on productivity.",
  "If you see this, hydrate now! 💧",
  "Bunny slippers = increased defense.",
  "Cybersecurity tip: Don’t eat your password.",
  "Caffeine detected in bloodstream.",
  "🐇 Bunmb activated. Stand back!",
  "Achievement unlocked: Cuter than expected.",
  "Installing glitter… please wait.",
  "Error 404: Motivation not found.",
  "Running on tea, chaos, and sparkles.",
  "Debugging my own existence...",
  "My code compiles but my brain doesn’t.",
  "System overloaded: Too much adorable.",
  "Daily quest: Hug a bunny.",
  "If found, please return to Lily’s Lilypat.",
  "Access denied: Too cute for this world.",
  "Secret Level Unlocked: Kaomoji Zone!",
  "Achievement: Remembered to blink.",
  "Error: Too many tabs, not enough RAM.",
  "Bonus XP for being here.",
  "Petting virtual bunnies increases happiness.",
  "You have entered the Sparkly Zone.",
  "Warning: May cause uncontrollable giggles.",
  "Legend says: every kaomoji is a hug.",
  "You are 99% stardust, 1% bunny ears.",
  "Oops! You’ve unlocked goblin mode.",
  "Feeling like a main character today.",
  "Behold, the power of fluffy paws!",
  "Engaged to a biologist, powered by tea.",
  "Remember: Glitches are features.",
  "Kaomojis are just emojis with ambition.",
  "Running `npm install glitter`...",
  "Initiating bunny hop sequence.",
  "Sending virtual headpats...",
  "Achievement: Survived another day of chaos.",
  "Please don’t feed the goblin.",
  "Level Up! +10 charisma.",
  "Oops, all sparkles!",
  "Loading... Loading... Still Loading...",
  "Is this real code or am I dreaming?",
  "Professional chaos generator.",
  "Someone said ‘bunny’? I’m here!",
  "You have entered the Lily Zone.",
  "Glitter in the RAM detected.",
  "Reality.exe has stopped responding.",
  "Achievement: Didn’t scream at computer.",
  "Do not press the red button. (Pressed it anyway.)",
  "Unlocked: Goth Bunny Style.",
  "Meme level: Supreme.",
  "It’s okay, everyone’s a little broken.",
  "99 bugs in the code, patch one, 127 bugs remain.",
  "Daily bonus: +1 silly.",
  "Did you remember to laugh today?",
  "This is not a bug, it’s a feature.",
  "Achievement: Didn’t nap in class.",
  "Achievement unlocked: Actual princess.",
  "New random event: Roll for snacks.",
  "You found a secret glitter bomb!",
  "Secret: There’s a frog somewhere here.",
  "You have 0 unread messages and 9001 dreams.",
  "Success: All files named ‘final_final’!",
  "You may be entitled to kaomoji compensation.",
  "This kaomoji believes in you.",
  "Congratulations! You win a virtual carrot.",
  "Never underestimate bunny power.",
  "Sending you a digital hug.",
  "Are you a bug or a feature?",
  "Bunny slippers equipped. You gain +2 comfort.",
  "If life glitches, add more glitter.",
  "Cheerleader by day, goblin by night.",
  "Achievement: Didn’t eat USB stick today.",
  "Legend: Lily once debugged reality.",
  "Achievement unlocked: Survived the loading screen.",
  "This button does nothing. Or does it?",
  "Error: Too much sparkle.",
  "All code and some bunny makes Lily a happy dev.",
  "Not all who wander are lost. Some are just bunnies.",
  "Glitches make the world interesting.",
  "Why did the kaomoji cross the code?",
  "You are now entering the Cute Zone.",
  "Reboot required. Apply more tea.",
  "Achievement: Didn’t procrastinate (for 5 minutes).",
  "You have 1 unread bunny.",
  "Not a bug, just an undocumented feature.",
  "Do bunnies dream of electric code?",
  "If found, please return to the nearest cozy blanket.",
  "Randomness increased by 42%.",
  "Achievement: Added one more silly text.",
  "Warning: Reality is under construction.",
  "Alert: Kaomoji population is rising.",
  "Achievement: Pressed the silly button.",
  "Virtual bunbun says hi!",
  "If you see this, do a little wiggle.",
  "Achievement: Reached maximum fluffiness.",
  "Running out of ideas... Just kidding.",
  "Frogs are just bunnies with jump upgrades.",
  "This message was brought to you by sparkles.",
  "You are the main character of today.",
  "Glitch in the matrix? Or just cute overload.",
  "Your XP: incalculable (but fluffy).",
  "Have you tried turning it off and on again?",
  "Achievement: Wrote silly code.",
  "Alert: You are too powerful for this world.",
  "Glitter not found. Please install.",
  "If in doubt, kaomoji it out.",
  "Fun fact: Bunnies can hack the moon.",
  "You just got a virtual sticker!",
  "Cheerleader status: Sassy.",
  "Achievement: Silly text generator, 100%.",
  "All your base are belong to kaomoji.",
  "Remember to stretch your paws.",
  "Pro tip: Save early, save often.",
  "Random fact: Frogs and bunnies get along.",
  "Congratulations! You’re now a digital princess.",
  "Achievement: Found the secret silly text.",
  "Alert: Over 9000 kaomojis detected.",
  "You deserve a nap (or two).",
  "You’re the sparkle in someone’s RAM.",
  "You are now certified silly.",
  "Legendary achievement: Pressed the button.",
  "Achievement: Unlocked chaotic neutral.",
  "Loading... now with 50% more glitter.",
  "Achievement: Code still runs, somehow.",
  "Silliness: Overclocked.",
  "Achievement: Randomizer supreme.",
  "If you see this, make a silly face.",
  "Frog mode: activated.",
  "Did you just summon a kaomoji?",
  "Princess, goth, and goblin—triple threat.",
  "Achievement: Glitter bombed.",
  "Pet a dog. Pet a bun. Repeat.",
  "Randomness: it’s what makes life sparkle.",
  "Tea time! (Mandatory.)",
  "Warning: May cause random smiling.",
  "Achievement: Button mashed.",
  "Current mood: Kaomoji.",
  "If in doubt, add more sparkles.",
  "You are officially a member of the bun club.",
  "Cheer up, buttercup!",
  "Achievement: Stayed hydrated.",
  "You found a silly secret.",
  "Never let anyone steal your sparkle.",
  "Today’s forecast: 100% chance of cute.",
  "Kaomoji party! Everyone’s invited.",
  "Achievement: Did not eat the homework.",
  "There’s always room for one more kaomoji.",
  "Error: Too much fun detected.",
  "Achievement: Meme wizard.",
  "Achievement: Bun wizard.",
  "Achievement: Sparkle overlord.",
  "Achievement: Silly text complete!",
  "Achievement: Bun club president.",
  "Kaomojis are magic spells for happiness.",
  "Achievement: Laughed at your own joke.",
  "Achievement: Unlocked silly legend.",
  "Achievement: Code ran on the first try! (what?)",
  "Achievement: Perfectly imperfect.",
  "Sending sparkles via WiFi...",
  "Achievement: Found a typo and left it in.",
  "Bunny mode: Infinite.",
  "Achievement: Lily smiled today. Did you?",
  "Achievement: Frogs & bunnies, besties.",
  "You are the bunniest of them all.",
  "Don’t panic, just bunny.",
  "Your energy: 100% kawaii.",
  "Achievement: Kawaii overload.",
  "If reality breaks, add a kaomoji.",
  "Cuteness: Error, cannot be measured.",
  "Bonus: +2 charisma for using this site.",
  "Secret: There’s a kaomoji in every heart.",
  "Achievement: Cosmic bun.",
  "You found the rare goth bunny.",
  "Achievement: Unlocked 'Goblin Core'.",
  "You are a bug fixer AND a bug creator.",
  "Legend says: Lily’s code runs on magic.",
  "Press button, receive sparkles.",
  "Achievement: Glitter everywhere.",
  "Achievement: Found the best bun.",
  "Achievement: Double rainbow (and double bun).",
  "Silliness is a feature, not a bug.",
  "Achievement: Bunny hop complete.",
  "Congratulations! You’re now extra sparkly.",
  "Achievement: Caffeine acquired.",
  "Achievement: Frogs gone wild.",
  "Achievement: Infinite tea mode.",
  "Achievement: Spammed the silly button.",
  "Did you drink water today? (No? Go do it!)",
  "Achievement: Wiggled your nose.",
  "Achievement: Goblin approved.",
  "Achievement: You are valid!",
  "There is no end to bunny silliness.",
  "Pro gamer tip: Equip more sparkles.",
  "Every click brings more chaos.",
  "Sending bunny beams your way.",
  "Achievement: Most stylish slippers.",
  "Achievement: Unlocked magic sparkle wand.",
  "Achievement: Made a new friend today.",
  "Did you blink? Bonus XP if yes.",
  "Sillyness status: Maximum.",
  "Achievement: Adopted a kaomoji.",
  "Achievement: Hugged the digital bunny.",
  "Achievement: Hero of the Sparkly Realm.",
  "Achievement: Goth bunny sighted.",
  "Achievement: Silliest of the silly.",
  "Achievement: Queen of glitter.",
  "Achievement: Frogs and buns in harmony.",
  "Did you smile? XP granted.",
  "Achievement: Randomizer Queen/King.",
  "Achievement: Lord/Lady of Bunland.",
  "Achievement: Chaos never ends.",
  "Achievement: Kaomoji Master.",
  "Achievement: Unlocked next level silly.",
  "Stephen fact: Can bench press a microscope.",
  "Biologist husband unlocked: +20 to plant identification.",
  "Stephen’s spirit animal: half gym rat, half Wikipedia.",
  "Stephen can deadlift more than most people can Google.",
  "Achievement: Married a gym rat who knows more Latin names than me!",
  "Warning: Stephen will classify all your houseplants.",
  "Don’t challenge Stephen in nerd trivia. Trust me.",
  "If Stephen had a superpower, it’d be explaining mitochondria... while squatting.",
  "Stephen: the only man who can carry both my heart and the groceries.",
  "Stephen’s workout routine: lift, study, repeat.",
  "Legend says Stephen can detect a pun from across the room.",
  "If lost, please return Stephen to the nearest gym or laboratory.",
  "Fun fact: Marrying a biologist means never being alone with a bug.",
  "Stephen: Proof that muscles and brain cells can coexist.",
  "You found the rare species: *Stephanus gymratensis*.",
   "Sandy: The Lady. She politely requests cuddles.",
  "The Lady: Fluffiest ears in the west.",
  "Achievement: Sandy wags tail, all is forgiven.",
  "If Sandy is present, peace is restored.",
  "Sandy’s superpower: Soothing chaos with one paw.",
  "The Lady’s rules: 1) Be cute. 2) Receive treats. 3) Repeat.",
  "Sandy: Noble, loyal, fluffy. The Lady in every way.",
  "Legend: The Lady can nap anywhere, anytime.",
  "Sandy’s advice: Stay calm and chase squirrels.",
  "If in doubt, ask The Lady.",
  "Ichiban: He does not fear god, nor man, nor vacuum.",
  "The Guy: barking at existential threats since 2021.",
  "Achievement: Ichiban stared down the thunder and won.",
  "Ichiban: Zero fear, 100% good boy.",
  "Current mood: Be like Ichiban and question authority.",
  "Ichiban’s hobbies: causing chaos and protecting the realm.",
  "Fun fact: 'The Guy' thinks he's the main character.",
  "Ichiban: Will eat your snacks and your existential dread.",
  "Legend: Ichiban once barked at the wind and it stopped.",
  "Achievement: The Guy outsmarted us again.",
"Warning: Latina energy detected. Stand back!",
  "Achievement: Bilingual banter unlocked.",
  "Latina-American household: 100% spice, 100% sugar.",
  "When you mix samba with barbecue, you get us.",
  "Stephen asked for one salsa. I gave him the whole playlist.",
  "International love: bilingual arguments, universal hugs.",
  "Latina + American = Chaos, comfort, and cute pets.",
  "I bring the drama, Stephen brings the statistics.",
  "Achievement: Survived cultural food confusion.",
  "Warning: Stephen is still learning how to pronounce 'pão de queijo.'",
  "Teamwork: I add the flavor, he adds the protein.",
  "My playlist: anime songs, samba, and a suspicious amount of heavy metal",
  "Stephen: Born in America, but slowly turning Brazilian.",
  "Bilingual household: sometimes even the pets are confused.",
  "Achievement: Explained why ‘saudade’ has no translation.",
   "Nova, aka Goober: Stealth level 9000.",
  "Achievement: Goober has entered the zoomie zone.",
  "Goober: professional keyboard warmer since [Year You Adopted Her].",
  "Warning: Goober may randomly activate 'attack ankle' mode.",
  "Current mood: Goober sitting on my homework.",
  "If your code suddenly breaks, check for Goober.",
  "Achievement: Nova successfully meowed at nothing.",
  "Goober: Half cat, half mystery, all baby.",
  "Legend: Goober once hacked the mainframe (it was just the WiFi).",
  "Goober: Certified bug hunter (and also bug chaser).",
  "Goober believes every box is a portal.",
  "Goober status: loafing.",
  "Did you pet Goober today? Bonus XP if yes.",
  "Achievement: Goober activated 'midnight parkour.'",
  "Goober: Cuddles by day, chaos by night.",
  "If Goober fits, she sits. If she doesn’t fit, she tries anyway.",
  "Legend says Goober’s purr can heal JavaScript bugs.",
  "Goober: Official inspector of all laundry baskets.",
  "Achievement unlocked: Goober made you late with excessive cuteness.",
  "Goober: The only QA engineer who sits on your laptop.",
   "You’ve rolled a critical bun.",
  "Achievement: Hop, skip, and bug-fix.",
  "In bunny slippers, all things are possible.",
  "Bunnies: Nature’s original cryptographers (no one can crack their code).",
  "Please hydrate your bunny (and yourself).",
  "Error: Bunny ears detected in the code.",
  "Legend: Press this button to spawn a carrot.",
  "Did you know? Bunnies invented chaos theory.",
  "Achievement unlocked: Carrot collector.",
  "In case of emergency: Deploy the bunnies.",
  "Fluffiness set to maximum.",
  "Press here to receive virtual nose boop.",
  "Warning: May induce spontaneous hopping.",
  "Fact: 99% of bugs are actually just hidden bunnies.",
  "This code was reviewed by at least one rabbit.",
  "Achievement: Survived another day in the warren.",
  "Soft like a lamb, smart like a server.",
  "If you hear baa, check your firewall.",
  "Legend: Lambs debug in their sleep.",
  "Lambs: The only QA team that sleeps more than devs.",
  "Achievement: Stayed soft through a hard week.",
  "In lamb we trust (to not delete prod).",
  "Wooly hats increase RAM by 12% (citation needed).",
  "Lost lambs become found features.",
  "Count lambs, not errors.",
  "Easter egg detected: It's a sheep!",
  "Achievement: 0 bugs, 100 giggles.",
  "Nerd status: Bunny approved.",
  "If this makes sense, you have root access to my heart.",
  "Achievement: Explained recursion and survived.",
  "Achievement: Coded with bunny paws (results may vary).",
  "You have entered the nerd zone: sparkle edition.",
  "My favorite language? Bunny script.",
  "Achievement: Survived merge conflict with style.",
  "Legend: Someone once finished their side project.",
  "Did you back up your bunnies today?",
  "Press F to pay respects to missing semicolons.",
 "Achievement: Lily did it again!",
  "Lily mode: Pink, sparkly, and overpowered.",
  "Achievement: Brought the chaos, left with the tea.",
  "Main character energy: 1000% Lily.",
  "If you see this, Lily rolled a nat 20.",
  "Lily: Will debug your soul.",
  "Achievement: Hugged a bunny, fixed a bug.",
  "If it’s not cute, Lily’s not coding it.",
  "Queen of chaos, princess of pink.",
  "Lily: Making servers cuter since forever.",
  "Stephen: Can lift Lily and a full database backup.",
  "Achievement: Identified all houseplants in under 2 minutes.",
  "Stephen: Scientist by day, gym boss by night.",
  "Legend: Stephen can explain quantum mechanics in bunny language.",
  "Achievement: Married Lily, became a boss NPC.",
  "Warning: Stephen may classify your pet.",
  "Stephen’s playlist: protein shakes and Wikipedia.",
  "Achievement: Bench pressed a microscope.",
  "Stephen: Can teach mitochondria how to work out.",
  "Legend: If lost, return Stephen to the lab or gym.",
   "Nova: Keyboard guardian, night zoomies specialist.",
  "If code breaks, check for Nova’s paw.",
  "Achievement: Loafed for 12 hours. New record.",
  "Legend: Nova’s purr can fix JavaScript.",
  "Nova: Inspector of all cardboard boxes.",
  "Achievement: Meowed at nothing, scared everyone.",
  "Fact: Nova has more XP in napping than you.",
  "Nova status: Cuddling the WiFi router.",
  "Nova: Debugging expert (with a tail).",
  "Press here to activate Nova’s cuteness mode.",
  "Sandy: Bringer of peace, stealer of snacks.",
  "Achievement: Flopped for maximum cuteness.",
  "The Lady: May demand pets at any time.",
  "Legend: Sandy wags tail, world feels better.",
  "If Sandy naps, productivity rises 10%.",
  "Sandy: All treats are rightfully hers.",
  "Achievement: Defused chaos with a boop.",
  "Sandy: Certified peace negotiator.",
  "Warning: Sandy will judge your snack choices.",
  "Fact: Sandy can outfluff the competition.",
   "Ichiban: Defender of doors, destroyer of socks.",
  "Achievement: Barked at nothing, felt accomplished.",
  "Legend: Ichiban once barked at a ghost, and won.",
  "Ichiban: 100% bark, 100% heart.",
  "If you hear thunder, check for Ichiban.",
  "Achievement: Chased tail, caught existential crisis.",
  "Ichiban: Squirrel detection system, always on.",
  "Warning: Ichiban in goblin mode.",
  "Ichiban: Every day’s a boss battle.",
  "Fact: Ichiban has main character energy.",
   "Achievement: All pets in the same room = world peace.",
  "If Lily, Stephen, Nova, Sandy, and Ichiban are here, you’re in a safe zone.",
  "Combo unlocked: Biologist, bunny, cats, and dogs. The ultimate team.",
  "Achievement: Family snuggle pile (max XP gain).",
  "Legend: With this crew, you cannot lose.",
  "Nova and Ichiban: Chaos unleashed. Hide the snacks.",
  "Sandy and Nova: Peace pact initiated. Everyone must nap.",
  "Stephen + Sandy = strongest team (and fluffiest).",
  "Lily and Nova: Cuteness overload detected.",
  "Ichiban + Lily = Maximum adventure, minimum peace.",
  "Sandy and Ichiban: Guard duty, activate!",
  "Lily, Stephen, and pets: The real dream team.",
  "Achievement: Family chaos reached critical mass.",
  "Nova cuddles, Sandy flops, Ichiban barks—balance restored.",
  "If Nova is missing, check Stephen’s lap.",
  "Achievement: Pets have declared Lily the queen.",
  "If Sandy’s asleep, all is well in the kingdom.",
  "Stephen and Ichiban: Bros for life.",
  "Nova and Sandy: Co-chairs of the comfort committee.",
  "If Lily’s coding, Nova is on the keyboard.",
  "Sandy, Nova, Ichiban: Pets assemble!",
   "Lily and Stephen: Main quest complete.",
  "Achievement: Biologist meets Bunny Queen.",
  "When Lily and Stephen team up, reality bends to their will.",
  "Lily + Stephen = Too powerful for just one universe.",
  "Achievement: Coded, cuddled, conquered.",
  "If Stephen is here, Lily can’t be far.",
  "Together, they debug the code—and each other.",
  "Warning: Cute couple detected.",
  "Stephen and Lily: The OTP of code and cuddles.",
  "Achievement: Couple’s synergy breaks the XP meter.",
  "Achievement: Shared playlist, shared dreams.",
  "If found together, prepare for chaos and comfort.",
  "Lily: Pink. Stephen: Green. Together: Rainbow.",
  "Achievement: Relationship goals reached.",
  "Legend: Their love is immune to bugs.",
  "When Stephen brings coffee, Lily writes magic.",
"Stephen brings the science, Lily brings the sparkle.",
  "Nova in Lily’s lap, Sandy at Stephen’s feet, Ichiban on guard = perfect night.",
  "If the pets are quiet, Stephen’s probably giving a biology lecture.",
  "Achievement: All pets asleep, parents finally code in peace.",
  "When in doubt, hug the nearest pet.",
  "Achievement: Bunny slippers, biologist, and a sleepy cat—all you need.",
  "Legend: With enough tea, Lily and Stephen can solve anything.",
  "Sandy and Ichiban: Only guard dogs with cuddle certification.",
  "Achievement: Cuddle pile, snacks, and code—family goals.",
  "Lily and Stephen: Double XP for teamwork.",
  "Nova, Sandy, Ichiban: The floof council is now in session.",
  "Achievement: All pets and humans accounted for—roll for happiness.",
  "When Lily laughs, all the pets wiggle.",
  "Stephen, Nova, Lily: Nerd squad, unite!",
  "Sandy is the queen, but Lily is the empress.",
  "Ichiban, Nova, Sandy: Chaos engine fully operational.",
  "If found in chaos, please return to Lily and Stephen.",
  "Lily: CEO of Glitter-Based Solutions.",
"Lily can debug your heart and your code.",
"Achievement: Out-cuted the entire server.",
"Lily: Powered by tea, tenacity, and tiny chaos.",
"Lily didn’t choose the chaos life. The chaos chose her.",
"Legend: Lily once fixed a bug just by winking at it.",
"Lily: Bilingual, brilliant, and bunny-obsessed.",
"Lily’s code compiles, but her laugh is what really breaks the silence.",
"Achievement: Survived on hope and iced tea.",
"Lily’s fashion sense: 70% princess, 30% hacker.",
"Achievement: Added sparkle to a command line.",
"Lily can out-glitter, out-code, and out-love anyone.",
"Lily: Proof that you can be soft and unstoppable.",
"Lily in bunny slippers: unreasonably powerful.",
"Lily: Can balance a bug fix, a dance routine, and a nap—simultaneously.",
"Rumor: Lily invented the pink firewall.",
"Lily: If you need comfort, bring snacks and memes.",
"Achievement: Spoke three languages in one sentence.",
"Lily: Gave the codebase a cute accent.",
"Stephen: Fluent in science, kindness, and muscle memes.",
"Stephen can out-deadlift your whole database.",
"Achievement: Turned biologist mode ON (and never off).",
"Stephen: Will analyze your houseplants and your dreams.",
"Legend: Stephen knows the Latin name for every snack in the kitchen.",
"Stephen: American by birth, Brazilian by marriage.",
"Achievement: Fixed Lily’s bug with a scientific fact.",
"Stephen: Powered by curiosity and protein.",
"Stephen’s beard: Certified data storage device.",
"Stephen: Calm in chaos, king in kindness.",
"Achievement: Gave Nova a science lesson.",
"Stephen: Turns breakfast into a TED talk.",
"Stephen can identify plants faster than Lily finds bunnies.",
"Achievement: Biologist in the gym, gym rat in the wild.",
"Stephen’s superpower: Making chaos feel safe.",
"Stephen: Half nerd, half bodybuilder, all heart.",
"Legend: Stephen is immune to frog jokes.",
"Stephen: The only American who can handle Brazilian spice.",
"Lily and Stephen: Brazil meets America, chaos meets calm.",
"Achievement: Bilingual love story—sometimes with subtitles.",
"Intercultural couple bonus: Arguments in two languages, make-up hugs in three.",
"Legend: Lily taught Stephen 'saudade'—he still can’t pronounce it.",
"Stephen brings the science, Lily brings the samba.",
"Achievement: Mixed playlists, mixed spices, maximum flavor.",
"Lily: ‘Amor!’ Stephen: ‘What did I do?’",
"Achievement: Teamwork makes the visa work.",
"Legend: Their love is stronger than homesickness.",
"Achievement: Brazilian barbecue meets American breakfast—culinary superpower unlocked.",
"Lily & Stephen: Together we hack the world—and the recipe.",
"When Lily cries in Portuguese, Stephen responds in memes.",
"Achievement: Family WhatsApp chat survived another day.",
"Stephen learned 'jeitinho'—Lily learned how to grill.",
"Achievement: Multicultural love, infinite XP.",
"Lily: The sparkle. Stephen: The logic. Together: Chaos with a plan.",
"Achievement: Spicy food level—intermediate (Stephen still learning).",
"Lily & Stephen: If you hear English and Portuguese, come say hi.",
"Achievement: Two passports, one playlist.",
"Legend: Love is the best translator.",
"Lily & Stephen: Our love story has patch notes in two languages.",
"Lily says ‘eu te amo’, Stephen answers ‘I love you too’—that’s how you level up.",
"Lily and Stephen: Only couple with a bunny firewall and a biologist on call.",
"Achievement: Cross-cultural pet council now in session.",
"Lily brings coxinha, Stephen brings protein shakes. Pets want both.",
"Nova speaks cat, Lily speaks code, Stephen speaks science.",
"Sandy is the only one who understands everyone.",
"Achievement: Multilingual snuggle pile.",
"Stephen and Lily: Together we can handle any bug—or bark.",
"Legend: Sandy and Nova agree only on nap time.",
"Family chaos: 10% language barrier, 90% pet hair.",
"Achievement: Pet passport approved.",
"If you hear Lily singing in Portuguese, the pets know it’s cuddle time.",
"Stephen: 'Let’s organize.' Lily: 'Let’s improvise.' Result: Organized chaos.",
"Achievement: Both learned ‘sit’—Stephen for science talks, Lily for tea time.",
"Legend: Nova meows in a mysterious accent.",
"Achievement: Intercultural movie night—double the snacks, double the shushing.",
"Sandy: Multicultural treat tester.",
"Ichiban: Barks in American, wiggles in Brazilian.",
"Nova: Certified interpreter (between human and chaos).",
"Lily and Stephen: Together we crash servers, parties, and the language barrier.",
"Lily and Stephen: Our playlist is half samba, half lo-fi, all love.",
"Achievement: Survived three time zones, five holidays, and one epic move.",
"Lily: Pink filter on reality. Stephen: Science filter. Together: Prism.",
"Achievement: Relationship status—‘It’s complicated’ (by languages).",
"Legend: Lily and Stephen—where cozy meets chaos.",
"Achievement: Multicultural marriage, endless curiosity.",
"Lily and Stephen: Debating if tea or coffee is best since day one.",
"Legend: Bilingual dreams, universal memes.",
"Lily and Stephen: Together, we’re never lost—just exploring.",
"Lily’s side of the bed: Bunny plushies. Stephen’s: Research papers.",
"Achievement: Called parents in two languages without panic.",
"Legend: When the WiFi goes down, we just dance.",
"Achievement: Hugged in English, cuddled in Portuguese.",
"Love is bilingual, but chaos is universal.",
"Achievement Unlocked: True Princess—crowned by chaos, ruled by cuteness.",
"Easter Egg: Found the secret ballroom. All bunnies welcome.",
"Achievement: Woke up like this (still a princess).",
"Legend: Real princesses debug their own fairy tales.",
"Easter Egg: Kissed a frog, got a new bug report.",
"Achievement: Kingdom protected by pink firewalls and fluffy slippers.",
"Easter Egg: Hidden tiara found in the console log.",
"Achievement: Princess status—cannot be revoked by system admins.",
"Achievement: Found a heart container—now with extra glitter.",
"Easter Egg: It’s dangerous to go alone! Take this bun.",
"Legend: Opened every pot. Found only kaomojis.",
"Achievement: Master Sword? More like Master Sparkle.",
"Easter Egg: Threw a bunny at Ganon. It was super effective.",
"Achievement: Bombchu acquired. Chaos imminent.",
"Easter Egg: Secret fairy fountain located—heals emotional damage.",
"Achievement: Played Song of Storms, summoned actual rainbows.",
"Easter Egg: Glitched into the castle, left it cuter.",
"Achievement: Befriended a demon AND an angel. Unlocked true ending.",
"Easter Egg: Found Etihw’s secret garden—filled with memes.",
"Achievement: Got lost in the Gray Garden, found more snacks.",
"Legend: Yosafire stole your heart (and your dessert).",
"Easter Egg: Salt brought you a new kaomoji.",
"Achievement: All routes completed, still crying.",
"Easter Egg: Secret friendship route unlocked—requires kindness +1.",
"Achievement: Pet all the familiars. Cats, dogs, and ???",
"Easter Egg: Found the forbidden sweets cabinet.",
"Achievement: Survived every bad ending and still cute.",
  "Easter Egg: Found the red pearl—now everything’s more emotional.",
"Achievement: Hugged every sea bunny in the ocean.",
"Legend: Wadanohara protected your save file.",
"Easter Egg: Sal and Syake mean extra chaos mode.",
"Achievement: Achieved pacifist route, unlocked extra sparkles.",
"Easter Egg: Found Lobco’s secret snack stash.",
"Achievement: Deep sea, deeper lore, deepest friendship.",
"Easter Egg: Played through without crying (almost).",
"Achievement: Mermaid tail equipped, charisma +5.",
"Achievement: Survived to 6AM—no jumpscares, just cuddles.",
"Easter Egg: Found the hidden cupcake. Achievement: Hungry.",
"Legend: Checked every camera, saw only bunnies.",
"Achievement: Powered down—now entering cute mode.",
"Easter Egg: Closed the doors, but the plushies snuck in.",
"Achievement: Wind the music box, dance break unlocked.",
"Easter Egg: Secret animatronic—Bunbun the Brave.",
"Achievement: No screams, just giggles.",
  "Easter Egg: Statement begins—listener prepared.",
"Achievement: Listened to every tape—took emotional damage (but got snacks).",
"Legend: The Web is just a network of friendship bracelets.",
"Achievement: All entities identified—bonus XP for noticing the bun.",
"Easter Egg: The Spiral drew bunnies in the margins.",
"Achievement: Powered through the Lonely with tea and memes.",
"Easter Egg: Statement ends—achievement unlocked: survivor.",
"Achievement: Gave the Eye a break, picked up a novel instead.",
"Easter Egg: Saved in every slot—just in case of plot twists.",
"Achievement: Defeated the final boss with friendship.",
"Easter Egg: Opened the debug menu—found extra sparkle stats.",
"Legend: Found the fourth wall. Decided to paint it pink.",
"Achievement: Talked to every NPC (even the grumpy ones).",
"Easter Egg: Found the developer room—bunnies everywhere.",
"Achievement: 100% completion. Still exploring.",
"Easter Egg: Got the secret meme ending.",
"Achievement: Princess by day, RPG boss by night.",
"Easter Egg: Discovered bunny ears grant extra luck in dungeons.",
"Legend: Found the lost kingdom of memes.",
"Achievement: Pressed the ‘silly’ button during a boss fight.",
"Easter Egg: Unlocked sparkly New Game+.",
  "Achievement: Listened to the glow cloud. All hail.",
"Easter Egg: The dog park is not for dogs. Or bunnies.",
"Legend: You saw the hooded figures. They waved back.",
"Achievement: Survived a visit from the Sheriff’s Secret Police.",
"Easter Egg: Carlos says your code is scientifically perfect.",
"Achievement: You are now 12% more mysterious.",
"Easter Egg: Old Woman Josie gave you a handful of invisible kaomojis.",
"Achievement: The lights above Arby’s flickered. You gained +1 weirdness.",
"Easter Egg: Found a library card. Do not return it.",
"Achievement: Intern status—remember, most interns don’t make it.",
"Easter Egg: Night Vale spiders upgraded your firewall.",
"Achievement: Hired by the radio station. Your first job: survive.",
"Easter Egg: Discovered a secret passage to Desert Bluffs. It’s weird over there.",
"Achievement: Successfully ignored a floating cat in the men’s bathroom.",
"Easter Egg: You are now mayor of your own strange little town.",
"Achievement: Cecil approves this kaomoji.",
"Legend: The glow cloud left glitter everywhere.",
"Easter Egg: The City Council says… nothing. You’re probably fine.",
"Achievement: Listened to the traffic report and found yourself.",
"Easter Egg: Perfect hair bonus from Carlos.",
"Achievement: You adopted a forbidden puppy. It’s totally normal.",
  "Achievement: You’re SPECIAL! (especially the L part)",
"Easter Egg: Checked every Nuka-Cola machine for quantum memes.",
"Legend: Rex the cyber-dog approves your playlist.",
"Achievement: Survived a Deathclaw encounter by talking about bunnies.",
"Easter Egg: Your karma is now ‘Glittering Wanderer’.",
"Achievement: Unlocked ‘Wild Wasteland’—now with 200% more chaos.",
"Legend: Found a Vault with only kaomojis inside.",
"Easter Egg: Yes Man thinks you’re pretty neat.",
"Achievement: Passed every speech check with pure charm.",
"Achievement: Collected every snow globe—none survived the bunnies.",
"Easter Egg: Repaired your Pip-Boy with washi tape.",
"Legend: The courier delivers your memes on time.",
"Achievement: Survived Benny’s betrayal with style (and snacks).",
"Easter Egg: Gained the ‘Mysterious Stranger’ perk—now with sparkles.",
"Achievement: Mr. House said, ‘Nice work, kid’ and gave you XP.",
"Easter Egg: Unlocked the true ending: all friends, all bunnies, all New Vegas.",
"Achievement: Visited the tops casino, left with bunny slippers.",
"Legend: Brought peace to the Mojave—with tea and charisma.",
"Easter Egg: Arcade Gannon shared his rarest memes.",
"Achievement: Didn’t shoot the messenger, just gave them a carrot.",
"Achievement: Checked the fridge at Sierra Madre. Still no snacks.",
"Easter Egg: ED-E played your favorite song.",
"Legend: Met Joshua Graham. He complimented your courage.",
"Achievement: Won every game of Caravan. Still confused about the rules.",
"Easter Egg: Legionaries fear your sparkle.",
"Achievement: Vault 21: All rooms redecorated in pink.",
"Legend: Boone smiled once. The world was never the same.",
"Achievement: Threw a snow globe at Caesar. Achieved true chaos.",
"Easter Egg: Veronica taught you the ‘punch with love’ technique.",
  "Achievement: You wagged your tail so hard, you gained +5 speed.",
"Easter Egg: Headpats restored your HP to full.",
"Legend: You barked at the mailman. The mailman barked back.",
"Achievement: Found the treat stash. Level up!",
"Easter Egg: Collar fashion bonus—+2 charisma.",
"Legend: You learned ‘puppy eyes’. It’s super effective.",
"Achievement: Zoomies achieved. All humans must evacuate.",
"Easter Egg: Leash unlocked. You now control your own destiny.",
"Achievement: Rolled over and got XP for cuteness.",
"Legend: You’ve unlocked maximum puppy energy.",
"Easter Egg: Fetch quest—literally.",
"Achievement: You are now the alpha (of the group chat).",
"Legend: Sandy and you started a cuddlepile.",
"Achievement: 'Bark Mode' activated. Chaos increases.",
"Easter Egg: Chewed through the cables, reality glitched.",
"Legend: Puppy mode: Infinite.",
"Achievement: You sniffed out all the secrets.",
  "Achievement: You hopped your way into legend.",
"Easter Egg: Carrot acquired. You gain +10 luck.",
"Legend: You thumped your foot. The world noticed.",
"Achievement: Maximum floof reached. Cuteness overload.",
"Easter Egg: Bunny ears detected. Style points doubled.",
"Legend: Every bunny hop is a critical hit.",
"Achievement: Disarmed enemies with one wiggle nose.",
"Easter Egg: Built a burrow under your desk.",
"Legend: Sparkle jump achieved. Stardust everywhere.",
"Achievement: You napped in the sun. HP fully restored.",
"Easter Egg: Glitter grenade deployed. Everyone’s happy.",
"Achievement: You left bunny prints on the code.",
"Legend: Bunny slippers equipped. Vibe: immaculate.",
"Easter Egg: Disguised as a normal human. Failed.",
"Achievement: You are the bunniest of them all.",
"Legend: Bun club president—forever.",
  "Achievement: You knocked something off the table. Achievement unlocked.",
"Easter Egg: You have 9 lives and unlimited sass.",
"Legend: The laser pointer bowed to your will.",
"Achievement: Purr engine running. Mood: optimal.",
"Easter Egg: Meowed at the void. The void meowed back.",
"Legend: Tail swish—+20 to mystery.",
"Achievement: Your nap schedule is now canon.",
"Easter Egg: Found the secret sunbeam.",
"Legend: Paw pads activated. Stealth: 9000.",
"Achievement: You pounced on a problem. Bug squashed.",
"Easter Egg: You are now both code reviewer and lapwarmer.",
"Legend: You summoned chaos with one flick of your tail.",
"Achievement: Bonus XP for every accidental capslock.",
"Easter Egg: Your meow translates to all programming languages.",
"Legend: You hacked the mainframe with a single paw.",
"Achievement: Catnip party in the debug log.",
];
const gothCrosses = [
  "⁺‧₊˚ ཐི⋆♱⋆ཋྀ ˚₊‧⁺",
  ".◞ ♱ ◟.",
  "─── ⋆⋅ ♰ ⋅⋆ ───",
  "˗ˏˋ𓆩†𓆪ˊˎ˗",
  "⭒ ༺♰༻ ⭒",
  "˚₊‧꒰ა ♱ ໒꒱ ‧₊˚",
  "‿̩͙⊱༒︎༻♱༺༒︎⊰‿̩͙",
  "⋆˖✧⋆♰⋆✧˖⋆",
  "✦𓆩†𓆪✦",
  "⋆♱⋆⋆♰⋆",
  "꒰ঌ†໒꒱",
  "✧༚♱༚✧",
  "⋆⁺₊♱₊⁺⋆",
  "ꕤ♰ꕤ",
  "⛧༒♰༒⛧",
    "༚༅༚˳ . ♱ . ˳༚༅༚",
  "⁺‧₊˚ ♱ ˚₊‧⁺",
  "˗ˏˋ༄ ♱ ༄ˊˎ˗",
  "⋆⭒༺♱༻⭒⋆",
  ".｡✧𓆩†𓆪✧｡.",
  "⭒‧₊˚♱˚₊‧⭒",
  "‧˚₊‧༺♱༻‧₊˚‧",
  "⌇⋆✞⋆⌇",
  "˚₊✧༚♱༚✧₊˚",
  "༶•┈♱┈•༶",
  "⋆⁺₊✟₊⁺⋆",
  "‧₊⛧༒♰༒⛧₊‧",
  ".⭑༄♱༄⭑.",
  "˚₊· ͟͟͞͞♱ ·₊˚",
  "˶˚₊𓆩†𓆪₊˚˶",
  "⋆₊⋆.༚♱༚.⋆₊⋆",
  ".˳༚༅༚♱༚༅༚˳.",
  "༝༚✧༺♱༻✧༚༝",
  "⋆˚.𓆩♱𓆪.˚⋆",
  "˶⭒₊✟₊⭒˶"
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
  const [sillykaomoji, setSillyKaomoji] = useState(randomItem(sillykaomojis));
  const [surprise, setSurprise] = useState({sillykaomoji: randomItem(sillykaomojis), text: randomItem(sillyTexts)});
  function handleSurprise() {
    setSurprise({sillykaomoji: randomItem(sillykaomojis), text: randomItem(sillyTexts)});
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
  const { error } = await supabase.from("posts").insert([
    { title: blogTitle, content: blogContent }
  ]);
  if (error) {
    alert("Supabase insert error: " + error.message);
    return;
  }
  setBlogTitle("");
  setBlogContent("");
  fetchPosts();
}

async function addComment(post_id) {
  let text = commentInputs[post_id] || "";
  if (!text) return;
  const { error } = await supabase.from("comments").insert([
    { post_id, content: text }
  ]);
  if (error) {
    alert("Supabase insert error: " + error.message);
    return;
  }
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
  const { error: dbError } = await supabase.from("gallery").insert([
    { url, caption: picCaption }
  ]);
  if (dbError) {
    alert("Supabase insert error: " + dbError.message);
    return;
  }
  setPicFile(null); setPicCaption("");
  fetchGallery();
}

async function addRandom(e) {
  e.preventDefault();
  if (!randomText) return;
  const { error } = await supabase.from("randoms").insert([
    { content: randomText }
  ]);
  if (error) {
    alert("Supabase insert error: " + error.message);
    return;
  }
  setRandomText("");
  fetchRandoms();
}

async function addRpg(e) {
  e.preventDefault();
  if (!rpgFile) return;
  const filename = `${Date.now()}_${rpgFile.name}`;
  let { error } = await supabase.storage.from("rpg").upload(filename, rpgFile);
  if (error) { alert("Error uploading!"); return; }
  let url = supabase.storage.from("rpg").getPublicUrl(filename).data.publicUrl;
  const { error: dbError } = await supabase.from("rpg").insert([
    { title: rpgTitle, description: rpgDescription, file_url: url }
  ]);
  if (dbError) {
    alert("Supabase insert error: " + dbError.message);
    return;
  }
  setRpgFile(null); setRpgTitle(""); setRpgDescription("");
  fetchRpg();
}

async function addRpgComment(rpg_id) {
  let text = rpgCommentInputs[rpg_id] || "";
  if (!text) return;
  const { error } = await supabase.from("rpg_comments").insert([
    { rpg_id, content: text }
  ]);
  if (error) {
    alert("Supabase insert error: " + error.message);
    return;
  }
  setRpgCommentInputs({ ...rpgCommentInputs, [rpg_id]: "" });
  fetchRpg();
}

  // === PAGE COMPONENTS ===
  const AboutMe = () => (
    <div className={theme === "light" ? "lily-card" : "lily-card-dark"}>
      <div className={theme === "light" ? "lily-kaomoji" : "lily-kaomoji lily-kaomoji-dark"}>{kaomoji}</div>
      <h1 className="lily-section-title" style={{ marginBottom: 0 }}>🌸 Welcome to my Lilypat 🐇💻</h1>
      <div style={{marginBottom:"1.2rem", color: theme === "light" ? "#b75aa6":"#ffb3e7"}}>
        (｡•̀ᴗ-)✧ Hi, I’m <b>Lily</b>! <a href="https://github.com/lilyhaschen" target="_blank" rel="noopener noreferrer">@lilyhaschen</a>
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
        {surprise.sillykaomoji} <br />
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

// --- Mount to page ---
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
