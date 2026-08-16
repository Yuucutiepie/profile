/* ============================================================
   1) BRANDING CONFIGURATION
============================================================ */
const SITE_NAME = "SARAP"; // Updated branding

/* ============================================================
   2) PAGES & DISCORD USERS CONFIGURATION
============================================================ */
const PAGES = [
  {
    name: "Sarap",
    ids: [
      { id: "1485470671126659233", image: "https://i.pinimg.com/736x/c3/7d/01/c37d01791fb5750df074198736daa5bb.jpg" },
    ]
  },
  {
    name: "HALL OF FAME",
    ids: [
      { id: "1478284462738505910", image: "https://i.pinimg.com/736x/36/74/4a/36744aed24a1e4825445d5321e251e4c.jpg" },
      { id: "1482842530650525890", image: "https://i.pinimg.com/736x/36/74/4a/36744aed24a1e4825445d5321e251e4c.jpg" },
    ]
  },
  {
    name: "Yyx",
    ids: [
      { id: "1496377821076127774", image: "https://i.pinimg.com/736x/c3/7d/01/c37d01791fb5750df074198736daa5bb.jpg" },
    ]
  },
];

document.getElementById("splash-logo-text").innerText = SITE_NAME;
document.getElementById("splash-sub-text").innerText = SITE_NAME + " WORLD";

const tabNav = document.getElementById("tab-nav");
const pagesContainer = document.getElementById("pages-container");

/* ============ BUILD TABS + PAGES + CARDS ============ */
PAGES.forEach((page, pageIndex) => {
  const tabBtn = document.createElement("button");
  tabBtn.className = "tab-btn" + (pageIndex === 0 ? " active" : "");
  tabBtn.innerText = page.name;
  tabBtn.addEventListener("click", () => switchPage(pageIndex));
  tabNav.appendChild(tabBtn);

  const pageEl = document.createElement("div");
  pageEl.className = "page" + (pageIndex === 0 ? " active" : "");
  pageEl.id = "page-" + pageIndex;

  const logoEl = document.createElement("div");
  logoEl.className = "brand-logo page-logo";
  logoEl.innerText = SITE_NAME;
  pageEl.appendChild(logoEl);

  const gridEl = document.createElement("div");
  gridEl.className = "card-grid";

  const glow = document.createElement("div");
  glow.className = "glow-streak";
  gridEl.appendChild(glow);

  page.ids.forEach((entry, cardIndex) => {
    const uid = "p" + pageIndex + "c" + cardIndex;
    gridEl.appendChild(createCard(uid, entry.image));
    setupCard(uid, entry.id);
  });

  pageEl.appendChild(gridEl);
  pagesContainer.appendChild(pageEl);
});

function switchPage(index){
  document.querySelectorAll(".page").forEach((el,i)=>{
    el.classList.toggle("active", i===index);
  });
  document.querySelectorAll(".tab-btn").forEach((el,i)=>{
    el.classList.toggle("active", i===index);
  });
}

/* ============ CREATE CARD HTML ============ */
function createCard(uid, image){
  const card = document.createElement("div");
  card.className = "card-tall";

  const imageStyle = image ? `background-image:url('${image}');` : "";

  card.innerHTML = `
    <div class="card-image" style="${imageStyle}"></div>
    <div class="card-avatar-wrap">
      <img id="avatar-${uid}" class="avatar" src="https://cdn.discordapp.com/embed/avatars/0.png" alt="avatar" />
      <div id="status-${uid}" class="status-dot offline"></div>

      <div class="discord-card">
        <img id="cardavatar-${uid}" class="card-avatar-img" src="https://cdn.discordapp.com/embed/avatars/0.png" alt="avatar" />
        <div id="cardname-${uid}" style="font-weight:bold; font-size:12px;">Loading...</div>
        <div id="cardusername-${uid}" style="font-size:11px; opacity:0.6;">@user</div>
        <div id="cardstatus-${uid}" style="font-size:11px; margin-top:4px;">Offline</div>
      </div>
    </div>
  `;
  return card;
}

/* ============ LANYARD WEBSOCKET INTEGRATION ============ */
function setupCard(uid, discordId){
  const $ = id => document.getElementById(id);

  const DOM = {
    avatar: $(`avatar-${uid}`),
    cardAvatar: $(`cardavatar-${uid}`),
    cardName: $(`cardname-${uid}`),
    username: $(`cardusername-${uid}`),
    status: $(`status-${uid}`),
    statusText: $(`cardstatus-${uid}`),
  };

  function getStatus(s){
    switch(s){
      case "online": return ["Online", "online"];
      case "idle": return ["Idle", "idle"];
      case "dnd": return ["Do Not Disturb", "dnd"];
      default: return ["Offline", "offline"];
    }
  }

  function updateUI(d){
    if(!d?.discord_user) return;
    const u = d.discord_user;

    // Avatar calculation
    if(u.avatar){
      const ext = u.avatar.startsWith("a_") ? "gif" : "png";
      const url = `https://cdn.discordapp.com/avatars/${discordId}/${u.avatar}.${ext}`;
      DOM.avatar.src = url;
      DOM.cardAvatar.src = url;
    } else {
      const defaultUrl = `https://cdn.discordapp.com/embed/avatars/${(BigInt(discordId) >> 22n) % 5n}.png`;
      DOM.avatar.src = defaultUrl;
      DOM.cardAvatar.src = defaultUrl;
    }

    const name = u.global_name || u.username || "User";
    DOM.cardName.innerText = name;
    DOM.username.innerText = "@" + u.username;

    const s = d.discord_status || "offline";
    const [t, classStyle] = getStatus(s);

    DOM.status.className = "status-dot " + classStyle;
    DOM.statusText.innerText = t;
  }

  function connectLanyard(){
    const ws = new WebSocket("wss://api.lanyard.rest/socket");

    ws.onopen = () => {
      ws.send(JSON.stringify({
        op: 2,
        d: { subscribe_to_id: discordId }
      }));
    };

    ws.onmessage = e => {
      const m = JSON.parse(e.data);
      if(m.t === "INIT_STATE" || m.t === "PRESENCE_UPDATE"){
        updateUI(m.d);
      }
    };

    ws.onclose = () => setTimeout(connectLanyard, 3000);
  }

  // Connect automatically on page load
  connectLanyard();
}

/* ============ SPLASH SCREEN CLICK TO START MUSIC ============ */
document.getElementById("overlay").addEventListener("click", () => {
  document.getElementById("overlay").style.display = "none";
  const audio = document.getElementById("bg-music");
  if(audio){
    audio.play().catch(err => console.log("Autoplay prevented:", err));
  }
});
