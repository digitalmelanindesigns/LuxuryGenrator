const $ = (sel) => document.querySelector(sel);
const state = {}; // single: string, multi: Set

function single(id, label, options, meta={}) { return { id, label, type:"single", options, ...meta }; }
function multi(id, label, options, meta={}) { return { id, label, type:"multi", options, ...meta }; }

const SECTIONS = [
  single("skinTone","Skin Tone",[
    "Deep Ebony (rich deep tone)",
    "Cocoa Satin (deep warm brown)",
    "Mocha Rich (deep mocha)",
    "Caramel Bronze (golden caramel)",
    "Honey Bronze (warm honey)",
    "Chestnut Glow (reddish brown)",
    "Espresso Noir (very deep)",
    "Warm Beige (light warm)",
    "Ivory (light neutral)",
    "Golden Tan (sun-kissed)"
  ],{default:"Caramel Bronze (golden caramel)"}),

  single("renderStyle","Render Style",[
    "Ultra polished 3D CGI doll render",
    "Toy box depth render (dimensional)",
    "Soft glam illustration (high polish)",
    "Sticker pack clean cutout look (glossy)",
    "Bratz-inspired 4K semi-real glam render",
    "Hyper-real glossy editorial doll render",
    "Luxury product-shot render (studio tabletop)",
    "Candy-coated plastiglaze render (super reflective)",
    "High-fashion campaign lighting render (billboard polish)",
    "Kawaii-chibi couture render (gloss + couture fabric detail)"
  ],{default:"Ultra polished 3D CGI doll render"}),

  single("proportions","Body & Proportions",[
    "Oversized 2.5:1 head ratio, tiny waist, thick thighs (signature chibi glam)",
    "Oversized head ratio, curvy silhouette, soft toy proportions",
    "Slightly taller doll proportions, still chibi glam",
    "Ultra-chibi exaggeration (bigger head, smaller torso, cute hands)",
    "Runway doll proportions (longer legs, still glam face)"
  ],{default:"Oversized 2.5:1 head ratio, tiny waist, thick thighs (signature chibi glam)"}),

  single("skinFinish","Skin Finish",[
    "Hyper smooth candy gloss skin, high shine mapping",
    "Glass-skin glow with glossy highlights",
    "Soft glow with controlled gloss (still shiny)",
    "Butter-smooth airbrushed skin with wet highlight points",
    "Vinyl toy sheen (plastic luxe glow)"
  ],{default:"Hyper smooth candy gloss skin, high shine mapping"}),

  single("eyes","Eyes",[
    "Oversized almond sparkle eyes",
    "Big round doll eyes with star highlights",
    "Half-lidded glam stare",
    "Side-eye baddie eyes",
    "Wide-eyed surprised look",
    "Fox-eye glam (lifted outer corner)",
    "Bambi eyes (big + watery highlights)",
    "Cat-eye gaze (sharp liner look)",
    "Glitter iris twinkle (extra sparkle)",
    "Heart highlight pupils (cute viral)"
  ],{default:"Oversized almond sparkle eyes"}),

  multi("lashes","Lashes",[
    "Mega volume lashes",
    "Wispy doll lashes",
    "Bottom lash detail",
    "Fluffy mink lashes",
    "Dramatic outer flare",
    "Spiky anime lashes (glam version)",
    "Extra-long top lashes (photo-ready)",
    "Doll cluster lashes (stacked)",
    "Lower lash emphasis (flutter bottom)"
  ],{default:["Mega volume lashes","Bottom lash detail"]}),

  single("brows","Brows",[
    "Snatched arched brows",
    "Sharp precision brows",
    "Soft straight brows",
    "Raised brow attitude",
    "Feathered glam brows",
    "Ultra-snatched razor brows",
    "Angled boss brows (power look)"
  ],{default:"Snatched arched brows"}),

  single("makeup","Makeup",[
    "Full glam beat, shimmer lids, heavy highlight",
    "Glitter cut-crease + glossy cheeks",
    "Soft pink glam + blush pop",
    "Bronzed glam + gold shimmer",
    "Icy highlight + nude glam",
    "Smoky eye + glossy lip combo",
    "Neon liner accent + clean glam",
    "Chrome shimmer lids (metallic pop)",
    "Peachy soft-glow glam (viral)"
  ],{default:"Full glam beat, shimmer lids, heavy highlight"}),

  single("lips","Lips",[
    "Gloss bomb pout lips",
    "Overlined nude gloss lips",
    "Candy pink gloss lips",
    "Cherry red glossy lips",
    "Mocha gloss lips",
    "Glass clear gloss lips (wet look)",
    "Brown liner + caramel gloss",
    "Hot pink jelly gloss",
    "Soft matte nude + gloss topper"
  ],{default:"Gloss bomb pout lips"}),

  multi("extrasFace","Face Extras",[
    "Freckles",
    "Beauty mark",
    "Glitter tear duct highlight",
    "Nose tip highlight sparkle",
    "Under-eye shimmer",
    "Glossy cheek highlight stamp",
    "Tiny rhinestone face gems",
    "Soft blush nose (cute)",
    "Highlighter stripe on nose bridge",
    "Lip gloss shine streak (extra)"
  ]),

  single("nailLength","Nails Length",["Short","Medium","Long","XL","XXL"],{default:"Long"}),
  single("nailShape","Nails Shape",["Square","Short square","Coffin","Almond","Stiletto","Round"],{default:"Almond"}),
  single("nailFinish","Nails Finish",["High-gloss gel","Chrome mirror","French tip","Glitter ombré","Jelly gloss","Matte (with gloss top highlight)"],{default:"High-gloss gel"}),
  single("nailColor","Nails Color",["Nude","Pink","Hot pink","Red","Orange","White","Black","Mocha","Gold chrome","Violet chrome"],{default:"Pink"}),
  multi("nailArt","Nail Art Details",["Rhinestones","Designer-inspired pattern","Heart accents","Butterfly accents","Swirl lines","Star decals","No extra nail art"],{default:["No extra nail art"]}),

  single("hairStyle","Hair Style",[
    "Platinum blonde long waves under a cap",
    "High snatch ponytail (sleek)",
    "Messy glam bun with face-framing pieces",
    "Waist-length bone straight silk press",
    "Big curly volume hair",
    "Blunt bob (sleek)",
    "Half up half down (sleek + volume)",
    "Space buns + long pieces",
    "Long knotless braids (waist length)",
    "Curly pony puff (defined curls)",
    "Side part body waves (luxury)",
    "90s flip ends (cute throwback)"
  ],{default:"High snatch ponytail (sleek)"}),

  single("hairColor","Hair Color",[
    "Jet black","Platinum blonde","Soft black-brown","Rose pink","Copper auburn",
    "Honey blonde","Burgundy wine","Chocolate brown","Blonde money pieces","Two-tone split dye"
  ],{default:"Jet black"}),

  single("cap","Hat / Cap",[
    "No hat",
    "Baseball cap (street luxe)",
    "Designer cap (statement)",
    "Beanie (cute street)",
    "Trucker hat (baddie)",
    "Bucket hat (fashion)",
    "Oversized hoodie up (acts like hat)",
    "Headband (cute glam)"
  ],{default:"No hat"}),

  single("edges","Edges / Baby Hairs",[
    "Dramatic swirl edges",
    "Laid sleek edges",
    "Soft baby hairs",
    "Sharp razor edges",
    "No edges (clean hairline)",
    "Extra swoop edges (double swirl)",
    "Micro baby hairs (fine + neat)",
    "Gelled edges (super glossy)"
  ],{default:"Dramatic swirl edges"}),

  single("expression","Expression",[
    "Shocked glam gasp (mouth open)",
    "Surprised baddie",
    "Playful wink",
    "Girl bye side-eye",
    "Soft smile",
    "Serious model face",
    "Smirk (confident)",
    "Kissy face",
    "Eyeroll (viral attitude)",
    "Are you kidding me face",
    "Laughing smile (joyful)"
  ],{default:"Soft smile"}),

  single("pose","Pose",[
    "Hands on cheeks shock pose (viral)",
    "Selfie pose holding phone",
    "Peace sign pose",
    "Hand on hip attitude pose",
    "Over-the-shoulder glance",
    "Walking with attitude",
    "Crouch pose (street baddie)",
    "Hair flip pose",
    "Pointing at camera (callout)",
    "Arms crossed (boss energy)",
    "Blowing kiss",
    "Leaning forward (close-up energy)"
  ],{default:"Hand on hip attitude pose"}),

  single("outfitSet","Outfit Set",[
    "None (build separate top/bottom)",
    "Velour tracksuit set (luxury lounge)",
    "Hoodie + sweatpants set (street cozy)",
    "Faux fur set (statement)",
    "Denim set (cropped jacket + jeans)",
    "Boss blazer set (CEO energy)",
    "Leather set (noir baddie)",
    "Pink sparkle set (viral)",
    "Mocha neutral lounge set (soft luxe)",
    "Airport luxe set (travel baddie)"
  ],{default:"None (build separate top/bottom)"}),

  single("outerwear","Outerwear",[
    "None",
    "Faux fur coat (full plush)",
    "Bright orange faux fur coat (statement)",
    "Cropped puffer jacket",
    "Glossy jacket (patent shine)",
    "Varsity jacket",
    "Denim jacket (cropped)",
    "Leather moto jacket",
    "Trench coat (luxury)",
    "Fur-trim hoodie jacket",
    "Oversized cardigan (soft luxe)"
  ],{default:"None"}),

  single("top","Top",[
    "Fitted baby tee","Cropped tank top","Sports bra top","Graphic glam tee","Hoodie top",
    "Corset top (fashion)","Off-shoulder lounge top","Zip-up cropped jacket (top)","Sweater crop (soft)","Bodysuit (snatched)"
  ],{default:"Fitted baby tee"}),

  single("bottom","Bottom",[
    "Ripped jeans","Cargo pants","Leather pants","Stacked sweatpants","Velour joggers",
    "Biker shorts","Mini skirt","Wide-leg denim","Leggings (glossy athleisure)","Flare pants (cute)"
  ],{default:"Ripped jeans"}),

  single("setStyle","Style Vibe",[
    "Street luxe",
    "Soft bougie lounge",
    "Pink sparkle glam",
    "Luxury neutral",
    "Orange statement glam",
    "Black + gold billionaire",
    "Cotton-candy pastel baddie",
    "Mocha rich neutrals",
    "Neon pop street glam"
  ],{default:"Street luxe"}),

  single("shoes","Shoes",[
    "Nike Air Max 90",
    "Nike Air Max 95",
    "Nike Air Max 97",
    "Nike Air Max Plus (TN)",
    "Nike Air Force 1",
    "Nike Dunk Low",
    "Nike Dunk High",
    "Nike Blazer Mid",
    "Nike Vapormax",
    "Nike Huarache",
    "Nike Tech Runner",
    "Jordan 1 High",
    "Jordan 1 Low",
    "Jordan 3",
    "Jordan 4",
    "Jordan 5",
    "Jordan 6",
    "Jordan 11",
    "New Balance 550",
    "Adidas Superstar",
    "Timberland boots",
    "UGG boots",
    "Crocs"
  ],{default:"Nike Air Max 97"}),

  single("shoeColorway","Shoe Colorway",[
    "White/Black","White/Pink","White/Orange","Black/Gold","Black/Purple",
    "Mocha/Cream","Red/White","Neon pop (bright accents)","All black (stealth)","All white (clean)"
  ],{default:"White/Orange"}),

  single("bag","Pocketbook / Bag",[
    "None",
    "Louis Vuitton Neverfull",
    "Louis Vuitton Speedy",
    "Louis Vuitton Pochette",
    "Louis Vuitton Alma",
    "Chanel Classic Flap",
    "Chanel Boy Bag",
    "Gucci Marmont",
    "Gucci Dionysus",
    "Dior Saddle Bag",
    "Dior Book Tote",
    "Prada Nylon Bag",
    "Prada Galleria",
    "Fendi Baguette",
    "Balenciaga City Bag",
    "YSL Lou Camera Bag",
    "YSL Kate Chain Bag",
    "Hermès Birkin",
    "Hermès Kelly"
  ],{default:"Louis Vuitton Speedy"}),

  single("bagColorway","Bag Colorway",[
    "Black","White","Tan","Mocha","Pink","Orange","Red","Violet","Monogram pattern","Quilted leather"
  ],{default:"Black"}),

  single("bagHardware","Bag Hardware",[
    "Gold hardware","Silver hardware","Rose gold hardware","Gunmetal hardware","Pearl hardware detail"
  ],{default:"Gold hardware"}),

  single("bagCarry","Bag Carry Style",[
    "Handheld",
    "On shoulder",
    "Crossbody",
    "Arm crook carry",
    "Hanging off wrist",
    "Two-hand clutch hold",
    "Bag on forearm + phone in other hand"
  ],{default:"Handheld"}),

  multi("jewelry","Jewelry Stack",[
    "Oversized gold hoops",
    "Diamond studs",
    "Stacked rings",
    "Bangle stack",
    "Layered chains",
    "Watch",
    "Ear cuffs",
    "Nameplate necklace (use text box)",
    "Anklet chain",
    "Charm bracelet",
    "Big statement pendant",
    "Pearl + gold mix (luxury)"
  ],{default:["Oversized gold hoops","Stacked rings","Layered chains"]}),

  single("prop","Prop",[
    "None",
    "Phone in hand",
    "Glitter phone case",
    "Sunglasses",
    "Coffee cup",
    "Car keys (luxury key fob)",
    "Shopping bags (designer haul)",
    "Lip gloss in hand",
    "Mirror compact",
    "Starbucks cup + selfie combo"
  ],{default:"None"}),

  single("background","Background",[
    "Clean studio gradient backdrop",
    "Soft blush pink background",
    "Hot pink sparkle background",
    "Gold shimmer background",
    "Neutral luxury backdrop",
    "Violet chrome glow background",
    "Orange sunset glow background",
    "Black glossy studio background (luxury)"
  ],{default:"Violet chrome glow background"}),

  single("lighting","Lighting",[
    "Studio glam lighting with sparkle bokeh",
    "Soft beauty ringlight glow",
    "Golden hour luxe glow",
    "High-contrast fashion lighting",
    "Neon rim light + glossy highlights",
    "Product-shot lighting (high specular)"
  ],{default:"Neon rim light + glossy highlights"}),

  multi("noWords","No-Words Rules",[
    "No text",
    "No typography",
    "No captions",
    "No watermarks"
  ],{default:["No text","No typography","No captions","No watermarks"]}),
];

const PRESETS = {
  A: {
    badge:"Soft Bougie",
    picks:{
      skinTone:"Honey Bronze (warm honey)",
      setStyle:"Soft bougie lounge",
      outfitSet:"Mocha neutral lounge set (soft luxe)",
      outerwear:"Oversized cardigan (soft luxe)",
      shoes:"Nike Air Force 1",
      shoeColorway:"Mocha/Cream",
      bag:"YSL Lou Camera Bag",
      bagColorway:"Tan",
      bagHardware:"Gold hardware",
      bagCarry:"Crossbody",
      expression:"Soft smile",
      pose:"Over-the-shoulder glance",
      hairStyle:"Waist-length bone straight silk press",
      hairColor:"Chocolate brown",
      cap:"No hat",
      nailFinish:"French tip",
      nailColor:"Nude",
      background:"Neutral luxury backdrop",
      lighting:"Soft beauty ringlight glow",
      lips:"Overlined nude gloss lips"
    }
  },
  B: {
    badge:"Pink Sparkle Selfie",
    picks:{
      skinTone:"Caramel Bronze (golden caramel)",
      setStyle:"Pink sparkle glam",
      outfitSet:"Pink sparkle set (viral)",
      outerwear:"Cropped puffer jacket",
      shoes:"Nike Dunk Low",
      shoeColorway:"White/Pink",
      bag:"Chanel Classic Flap",
      bagColorway:"Pink",
      bagHardware:"Gold hardware",
      bagCarry:"On shoulder",
      expression:"Playful wink",
      pose:"Selfie pose holding phone",
      hairStyle:"Messy glam bun with face-framing pieces",
      hairColor:"Rose pink",
      cap:"No hat",
      nailFinish:"Chrome mirror",
      nailColor:"Hot pink",
      prop:"Glitter phone case",
      background:"Hot pink sparkle background",
      lighting:"Studio glam lighting with sparkle bokeh",
      lips:"Candy pink gloss lips"
    }
  },
  C: {
    badge:"ORANGE FUR SHOCK (your last image)",
    picks:{
      skinTone:"Cocoa Satin (deep warm brown)",
      setStyle:"Orange statement glam",
      outfitSet:"Faux fur set (statement)",
      outerwear:"Bright orange faux fur coat (statement)",
      expression:"Shocked glam gasp (mouth open)",
      pose:"Hands on cheeks shock pose (viral)",
      hairStyle:"Platinum blonde long waves under a cap",
      hairColor:"Platinum blonde",
      cap:"Baseball cap (street luxe)",
      shoes:"Nike Air Max 97",
      shoeColorway:"White/Orange",
      bag:"Louis Vuitton Speedy",
      bagColorway:"Monogram pattern",
      bagHardware:"Gold hardware",
      bagCarry:"Handheld",
      nailFinish:"High-gloss gel",
      nailColor:"Orange",
      background:"Gold shimmer background",
      lighting:"Golden hour luxe glow",
      lips:"Gloss bomb pout lips",
      eyes:"Wide-eyed surprised look"
    }
  }
};

function toast(msg){
  const t=$("#toast");
  if(!t) return;
  t.textContent=msg;
  t.classList.add("show");
  clearTimeout(window.__tt);
  window.__tt=setTimeout(()=>t.classList.remove("show"),1200);
}

function initDefaults(){
  for(const s of SECTIONS){
    if(s.type==="single") state[s.id]=s.default ?? "";
    else state[s.id]=new Set(s.default ?? []);
  }
}

function joinMulti(set){
  const arr=[...(set||[])];
  return arr.length ? arr.join(", ") : "";
}

function render(){
  const host=$("#sections");
  if(!host) return;
  host.innerHTML="";

  const q = ($("#search")?.value||"").trim().toLowerCase();
  const filtered = !q ? SECTIONS : SECTIONS.filter(s=>{
    const hay=(s.label+" "+s.id+" "+s.options.join(" ")).toLowerCase();
    return hay.includes(q);
  });
  $("#sectionCount").textContent = `${filtered.length} sections`;

  for(const s of filtered){
    const wrap=document.createElement("div");
    wrap.className="section";
    wrap.id=`sec-${s.id}`;

    const hd=document.createElement("div");
    hd.className="hd";

    const left=document.createElement("div");
    left.className="left";

    const lbl=document.createElement("div");
    lbl.className="lbl";
    lbl.textContent=s.label;

    const sub=document.createElement("div");
    sub.className="sub";
    sub.textContent = (s.type==="single" ? "Single select" : "Multi select");

    left.appendChild(lbl);
    left.appendChild(sub);

    const badge=document.createElement("div");
    badge.className="pill";
    badge.textContent = (s.type==="single")
      ? (state[s.id] ? "1 selected" : "0 selected")
      : `${state[s.id]?.size||0} selected`;

    hd.appendChild(left);
    hd.appendChild(badge);

    const bd=document.createElement("div");
    bd.className="bd";

    const chips=document.createElement("div");
    chips.className="chips";

    for(const opt of s.options){
      const chip=document.createElement("div");
      chip.className="chip";
      chip.textContent=opt;

      const on = (s.type==="single")
        ? state[s.id]===opt
        : state[s.id]?.has(opt);

      if(on) chip.classList.add("on");

      chip.addEventListener("click",()=>{
        if(s.type==="single"){
          state[s.id] = (state[s.id]===opt) ? "" : opt;
        }else{
          if(!state[s.id]) state[s.id]=new Set();
          if(state[s.id].has(opt)) state[s.id].delete(opt);
          else state[s.id].add(opt);
        }
        render();
        buildPrompt();
      });

      chips.appendChild(chip);
    }

    bd.appendChild(chips);
    wrap.appendChild(hd);
    wrap.appendChild(bd);
    host.appendChild(wrap);
  }
}

function setPreset(key){
  const p=PRESETS[key];
  if(!p) return;
  for(const s of SECTIONS){
    const v=p.picks[s.id];
    if(v===undefined) continue;
    if(s.type==="single") state[s.id]=v;
    else state[s.id]=new Set(Array.isArray(v)?v:[v]);
  }
  render();
  buildPrompt();
  toast(`Loaded ${p.badge}`);
}

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function randomize(){
  const theme=pickRandom(["soft","pink","orange","neutral","street","noir","neon"]);

  const get=(id, prefer=[])=>{
    const s=SECTIONS.find(x=>x.id===id);
    if(!s) return "";
    if(prefer.length){
      const hits=s.options.filter(o=>prefer.some(k=>o.toLowerCase().includes(k)));
      if(hits.length) return pickRandom(hits);
    }
    return pickRandom(s.options);
  };

  const getMulti=(id, n=3, prefer=[])=>{
    const s=SECTIONS.find(x=>x.id===id);
    const pool=s.options.slice();
    let biased=pool;
    if(prefer.length){
      const hits=pool.filter(o=>prefer.some(k=>o.toLowerCase().includes(k)));
      if(hits.length) biased=hits.concat(pool);
    }
    const set=new Set();
    while(set.size<n) set.add(pickRandom(biased));
    return set;
  };

  state.skinTone=get("skinTone", theme==="noir"?["espresso","deep"]: theme==="soft"?["honey","caramel"]:["cocoa","mocha","caramel"]);
  state.renderStyle=get("renderStyle", theme==="noir"?["campaign","product","hyper-real"]:["ultra","toy","bratz","candy"]);
  state.proportions=get("proportions",["2.5","ultra-chibi"]);
  state.skinFinish=get("skinFinish",["gloss","glass","vinyl"]);

  state.eyes=get("eyes", theme==="orange"?["wide","surprised"]: theme==="pink"?["star","bambi"]:["sparkle","fox","cat"]);
  state.lashes=getMulti("lashes",2,["mega","bottom","wispy","stacked"]);
  state.brows=get("brows",["snatched","precision","boss"]);
  state.makeup=get("makeup", theme==="neon"?["neon","chrome"]: theme==="orange"?["bronzed","gold"]: theme==="pink"?["soft pink","glitter"]:["full glam","icy","smoky"]);
  state.lips=get("lips", theme==="pink"?["candy","hot pink"]: theme==="orange"?["caramel","gloss bomb"]:["mocha","overlined","glass"]);
  state.extrasFace=getMulti("extrasFace",2,["glitter","rhinestone","highlight","freckles"]);

  state.nailLength=get("nailLength", theme==="soft"?["short","medium"]:["long","xl","xxl"]);
  state.nailShape=get("nailShape",["almond","coffin","square","stiletto"]);
  state.nailFinish=get("nailFinish", theme==="pink"?["chrome","jelly","glitter"]: theme==="orange"?["high-gloss","glitter","jelly"]:["high-gloss","chrome","french"]);
  state.nailColor=get("nailColor", theme==="orange"?["orange","gold"]: theme==="pink"?["pink","hot pink"]: theme==="noir"?["black","mocha"]:["violet","red","white"]);
  state.nailArt=getMulti("nailArt",1,["rhinestones","swirl","no extra"]);

  state.hairStyle=get("hairStyle", theme==="orange"?["cap","platinum","waves"]: theme==="pink"?["bun","space","flip"]:["snatch","straight","braids","body waves"]);
  state.hairColor=get("hairColor", theme==="orange"?["platinum","honey"]: theme==="pink"?["rose"]: theme==="noir"?["jet black","chocolate"]:["jet","two-tone","money pieces"]);
  state.cap=get("cap", theme==="orange"?["baseball"]: theme==="street"?["trucker","cap","beanie"]:["no hat","bucket"]);
  state.edges=get("edges",["dramatic","laid","glossy"]);

  state.expression=get("expression", theme==="orange"?["shocked","surprised"]: theme==="street"?["girl bye","eyeroll","smirk"]:["soft smile","wink","kissy"]);
  state.pose=get("pose", theme==="orange"?["hands on cheeks"]: theme==="pink"?["selfie","peace"]:["walking","hand on hip","hair flip","leaning"]);

  state.outfitSet=get("outfitSet", theme==="orange"?["fur set"]: theme==="pink"?["pink sparkle"]: theme==="noir"?["leather set","boss blazer"]:["hoodie","velour","airport"]);
  state.outerwear=get("outerwear", theme==="orange"?["orange"]: theme==="noir"?["leather","trench","glossy"]:["none","puffer","fur","varsity"]);
  state.top=get("top", theme==="noir"?["bodysuit","corset"]: theme==="soft"?["off-shoulder","sweater"]:["fitted","tank","graphic","hoodie"]);
  state.bottom=get("bottom", theme==="noir"?["leather","leggings"]: theme==="pink"?["mini","biker"]:["ripped","cargo","stacked","wide-leg"]);
  state.setStyle=get("setStyle", theme==="orange"?["Orange"]: theme==="pink"?["Pink"]: theme==="noir"?["Black + gold"]: theme==="neon"?["Neon"]: theme==="soft"?["Soft bougie"]:["Street"]);

  state.shoes=get("shoes", theme==="orange"?["air max"]: theme==="street"?["jordan","dunk","air force"]: theme==="noir"?["jordan","air max"]:["air max","dunk","new balance"]);
  state.shoeColorway=get("shoeColorway", theme==="orange"?["white/orange"]: theme==="pink"?["white/pink"]: theme==="noir"?["all black","black/gold"]:["black/purple","mocha/cream","white/black"]);

  state.bag=get("bag", theme==="pink"?["Chanel","Dior"]: theme==="noir"?["Hermès","YSL","Prada"]: theme==="orange"?["Louis Vuitton"]:["Gucci","Fendi","Balenciaga"]);
  state.bagColorway=get("bagColorway", theme==="orange"?["orange","monogram"]: theme==="pink"?["pink","white"]: theme==="noir"?["black","mocha"]:["violet","tan","quilted"]);
  state.bagHardware=get("bagHardware", theme==="noir"?["gunmetal","silver"]: theme==="pink"?["gold","rose gold"]:["gold","silver"]);
  state.bagCarry=get("bagCarry",["hand","arm","cross","wrist"]);

  state.jewelry=getMulti("jewelry",3,["hoops","rings","chains","watch","nameplate"]);
  state.prop=get("prop", theme==="pink"?["glitter"]: theme==="street"?["phone","keys","shopping"]:["none","sunglasses","coffee","lip gloss"]);

  state.background=get("background", theme==="orange"?["gold","orange"]: theme==="noir"?["black glossy"]: theme==="neon"?["violet chrome"]: theme==="pink"?["hot pink","blush"]:["clean","neutral","violet"]);
  state.lighting=get("lighting", theme==="noir"?["high-contrast","product-shot"]: theme==="neon"?["neon rim"]: theme==="orange"?["golden"]:["studio","ringlight"]);
  state.noWords=new Set(["No text","No typography","No captions","No watermarks"]);

  render();
  buildPrompt();
  toast("Randomized ✅");
}

function clearAll(){
  // CLEAR EVERYTHING (sections + text inputs)
  for(const s of SECTIONS){
    if(s.type==="single") state[s.id]="";
    else state[s.id]=new Set();
  }

  ["charName","nameplate","customColors","customBag","customShoeColorway","extraNotes"].forEach(id=>{
    const el=$("#"+id);
    if(el) el.value="";
  });

  render();
  buildPrompt();
  toast("Cleared all ✅");
}

function resetDefaults(){
  initDefaults();

  ["charName","nameplate","customColors","customBag","customShoeColorway","extraNotes"].forEach(id=>{
    const el=$("#"+id);
    if(el) el.value="";
  });

  render();
  buildPrompt();
  toast("Defaults restored");
}

function buildPrompt(){
  const charName=$("#charName")?.value.trim() || "";
  const nameplate=$("#nameplate")?.value.trim() || "";
  const customColors=$("#customColors")?.value.trim() || "";
  const customBag=$("#customBag")?.value.trim() || "";
  const customShoeColorway=$("#customShoeColorway")?.value.trim() || "";
  const extraNotes=$("#extraNotes")?.value.trim() || "";

  const lines=[];
  if(charName) lines.push(`Character name: ${charName}.`);

  lines.push(
    `Ultra glossy glam doll character with ${state.skinTone || "a rich skin tone"}, `+
    `${state.proportions || "oversized chibi glam proportions"}, `+
    `${state.skinFinish || "hyper smooth glossy skin"}, dimensional depth, candy gloss finish.`
  );

  if(state.renderStyle) lines.push(`Render style: ${state.renderStyle}.`);

  const hairBits=[state.hairStyle,state.hairColor,state.cap,state.edges].filter(Boolean);
  if(hairBits.length) lines.push(`Hair: ${hairBits.join(" | ")}.`);

  const faceBits=[
    state.eyes,
    joinMulti(state.lashes),
    state.brows,
    state.makeup,
    state.lips,
    joinMulti(state.extrasFace)
  ].filter(Boolean);
  if(faceBits.length) lines.push(`Face glam: ${faceBits.join(" | ")}.`);

  const nailsBits=[state.nailLength,state.nailShape,state.nailFinish,state.nailColor].filter(Boolean);
  const nailArt = joinMulti(state.nailArt);
  if(nailsBits.length || nailArt){
    lines.push(`Nails: ${[...nailsBits, nailArt].filter(Boolean).join(" | ")}.`);
  }

  if(state.expression) lines.push(`Expression: ${state.expression}.`);
  if(state.pose) lines.push(`Pose/action: ${state.pose}.`);

  const outfitBits=[];
  if(state.setStyle) outfitBits.push(`Vibe: ${state.setStyle}`);
  if(state.outfitSet && !String(state.outfitSet).startsWith("None")) outfitBits.push(`Outfit set: ${state.outfitSet}`);
  if(state.top) outfitBits.push(`Top: ${state.top}`);
  if(state.bottom) outfitBits.push(`Bottom: ${state.bottom}`);
  if(state.outerwear && state.outerwear!=="None") outfitBits.push(`Outerwear: ${state.outerwear}`);
  if(outfitBits.length) lines.push(`Outfit: ${outfitBits.join(" | ")}.`);

  if(state.shoes){
    const cw = customShoeColorway || state.shoeColorway;
    lines.push(`Shoes: ${state.shoes}${cw ? ` | colorway: ${cw}` : ""}.`);
  }

  const accBits=[];
  const jew=joinMulti(state.jewelry);
  if(jew) accBits.push(`Jewelry: ${jew}`);
  if(nameplate) accBits.push(`Nameplate necklace text: "${nameplate}"`);
  if(state.bag && state.bag!=="None"){
    accBits.push(`Pocketbook: ${state.bag} | colorway: ${state.bagColorway || "Black"} | hardware: ${state.bagHardware || "Gold hardware"} | carry: ${state.bagCarry || "Handheld"}`);
  }
  if(customBag) accBits.push(`Bag notes: ${customBag}`);
  if(state.prop && state.prop!=="None") accBits.push(`Prop: ${state.prop}`);
  if(accBits.length) lines.push(`Accessories: ${accBits.join(" | ")}.`);

  if(state.background) lines.push(`Background: ${state.background}.`);
  if(state.lighting) lines.push(`Lighting: ${state.lighting}, sparkle bokeh accents, high resolution 4K.`);

  if(customColors) lines.push(`Color notes: ${customColors}.`);
  if(extraNotes) lines.push(`Extra notes: ${extraNotes}.`);

  const nw=joinMulti(state.noWords);
  if(nw) lines.push(`Rules: ${nw}.`);

  lines.push("Clean subject edges, crisp details, premium polish. No words.");

  $("#output").value = lines.join("\n\n");
}

function copyOut(){
  const txt=$("#output")?.value || "";
  navigator.clipboard.writeText(txt).then(()=>toast("Copied ✅")).catch(()=>{
    $("#output").select();
    document.execCommand("copy");
    toast("Copied ✅");
  });
}

function setupSearch(){
  const el=$("#search");
  if(!el) return;
  el.addEventListener("input", ()=>render());
  el.addEventListener("keydown", (e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      const first = $("#sections .section");
      if(first){
        first.scrollIntoView({behavior:"smooth", block:"start"});
        toast("Jumped to results");
      }
    }
  });
}

// SAFEST FIX: bind AFTER DOM is ready
document.addEventListener("DOMContentLoaded", ()=>{
  initDefaults();
  setupSearch();
  render();
  buildPrompt();

  $("#btnBuild").addEventListener("click", buildPrompt);
  $("#btnCopy").addEventListener("click", copyOut);
  $("#btnRandom").addEventListener("click", randomize);
  $("#btnClear").addEventListener("click", clearAll);
  $("#btnReset").addEventListener("click", resetDefaults);

  $("#presetA").addEventListener("click", ()=>setPreset("A"));
  $("#presetB").addEventListener("click", ()=>setPreset("B"));
  $("#presetC").addEventListener("click", ()=>setPreset("C"));

  ["charName","nameplate","customColors","customBag","customShoeColorway","extraNotes"].forEach(id=>{
    $("#"+id).addEventListener("input", buildPrompt);
  });
});