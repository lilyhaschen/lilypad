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

  // === PAGE COMPONENTS ===
  // ... all components from your last paste (AboutMe, Projects, Blog, Gallery, RandomStuff, Rpg) ...

  // copy-paste your AboutMe, Projects, Blog, Gallery, RandomStuff, Rpg components **here**, unchanged except as you posted!

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
