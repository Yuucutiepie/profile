/* ============================================================
   1) PALITAN MO ITO NG PANGALAN NG SARILI MONG SITE/BRAND
============================================================ */
const SITE_NAME = "XOLUMS"; // lalabas sa splash screen at sa loob ng bawat page

/* ============================================================
   2) IDINIDIKTA MO DITO ANG BAWAT PAGE (TAB), ANG DISCORD IDs,
   AT (OPTIONAL) YUNG BACKGROUND IMAGE NG BAWAT CARD.
   - "id": Discord User ID (Copy User ID sa Discord, Developer Mode ON)
   - "image": link/path ng larawan para sa taas ng card (pwedeng
     iwanan na "" kung wala, dark lang ang ipapakita)
============================================================ */
const PAGES = [
  {
    name: "Sarap",
    ids: [
      { id: "1485470671126659233", image: "file:///C:/Users/kyllj/Downloads/cbdc63fe-6922-454b-8fec-44f310f4582e.jpg" },
    ]
  },
  {
    name: "HALL OF FAME",
    ids: [
      { id: "1478284462738505910", image: "https://ph.pinterest.com/pin/1146658755151849727/" },
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

/* ============ CREATE ONE CARD'S HTML ============ */
function createCard(uid, image){
  const card = document.createElement("div");
  card.className = "card-tall";

  const imageStyle = image ? `background-image:url('${image}');` : "";

  card.innerHTML = `
    <div class="card-image" style="${imageStyle}"></div>
    <div class="card-avatar-wrap">
      <img id="avatar-${uid}" class="avatar" src="" alt="avatar" />
      <div id="status-${uid}" class="status-dot offline"></div>

      <div class="discord-card">
        <img id="cardavatar-${uid}" class="card-avatar-img" src="" alt="avatar" />
        <div id="cardname-${uid}" style="font-weight:bold; font-size:12px;"></div>
        <div id="cardusername-${uid}" style="font-size:11px; opacity:0.6;"></div>
        <div id="cardstatus-${uid}" style="font-size:11px; margin-top:4px;"></div>
      </div>
    </div>
  `;
  return card;
}

/* ============ PER-CARD DOM REFS + LANYARD ============ */
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
      case "online": return ["Online","online"];
      case "idle": return ["Idle","idle"];
      case "dnd": return ["Do Not Disturb","dnd"];
      default: return ["Offline","offline"];
    }
  }

  function updateUI(d){
    if(!d?.discord_user) return;
    const u=d.discord_user;

    if(u.avatar){
      const url=`https://cdn.discordapp.com/avatars/${discordId}/${u.avatar}.${u.avatar.startsWith("a_")?"gif":"png"}`;
      DOM.avatar.src=url;
      DOM.cardAvatar.src=url;
    }

    const name=u.global_name||u.username||"user";
    DOM.cardName.innerText=name;
    DOM.username.innerText="@"+u.username;

    const s=d.discord_status||"offline";
    DOM.status.className="status-dot "+s;

    const [t,c]=getStatus(s);
    DOM.statusText.innerText=t;
  }

  function connectLanyard(){
    const ws=new WebSocket("wss://api.lanyard.rest/socket");

    ws.onopen=()=>{
      ws.send(JSON.stringify({
        op:2,
        d:{subscribe_to_id:discordId}
      }));
    };

    ws.onmessage=e=>{
      const m=JSON.parse(e.data);
      if(m.t==="INIT_STATE"||m.t==="PRESENCE_UPDATE"){
        updateUI(m.d);
      }
    };

    ws.onclose=()=>setTimeout(connectLanyard,3000);
  }

  window.__lanyardConnections = window.__lanyardConnections || [];
  window.__lanyardConnections.push(connectLanyard);
}

/* ============ ENTER (click sa splash screen) ============ */
document.getElementById("overlay").addEventListener("click", () => {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("bg-music").play().catch(()=>{});
  (window.__lanyardConnections || []).forEach(fn => fn());
});
