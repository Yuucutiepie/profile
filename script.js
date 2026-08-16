/**
 * ============================================================
 * XOLUMS SHOWCASE - CONFIGURATION & LANYARD INTEGRATION
 * ============================================================
 */

const CONFIG = {
  // BRANDING CONFIGURATION
  brand: {
    name: "SARAP", // Site brand title (e.g. SARAP / XOLUMS)
    subText: "SARAP WORLD", // Subtitle shown on splash screen
    logoImg: "", // Optional image URL for logo (leave empty to use gothic Nosifer text)
  },

  // BACKGROUND IMAGES
  backgrounds: {
    home: "https://file.garden/aWEjqj03KS-m2Cfz/xolums/xolums.gif",
    exclusive: "https://file.garden/aWEjqj03KS-m2Cfz/xolums/xolums.gif",
  },

  // BACKGROUND MUSIC
  audio: {
    src: "https://file.garden/aWEjqj03KS-m2Cfz/arcs/Hev%20Abi%20-%20molly%20to%20the%20head%20freestyle.mp3",
    title: "Hev Abi — Molly to the Head",
  },

  // SHOWCASE PAGES CONFIGURATION
  pages: [
    {
      id: "page-home",
      name: "SARAP",
      type: "cards", // Tall expandable cards
      cards: [
        {
          discordId: "1485470671126659233",
          banner: "https://i.pinimg.com/736x/c3/7d/01/c37d01791fb5750df074198736daa5bb.jpg",
          fallbackName: "Sarap",
        },
        {
          discordId: "1478284462738505910",
          banner: "https://i.pinimg.com/736x/36/74/4a/36744aed24a1e4825445d5321e251e4c.jpg",
          fallbackName: "Legend",
        },
        {
          discordId: "1482842530650525890",
          banner: "https://file.garden/aWEjqj03KS-m2Cfz/xolums/wpt7.gif",
          fallbackName: "Elite",
        },
        {
          discordId: "1496377821076127774",
          banner: "https://file.garden/aWEjqj03KS-m2Cfz/xolums/atx.gif",
          fallbackName: "Yyx",
        },
        {
          discordId: "806491799626711060",
          banner: "https://file.garden/aWEjqj03KS-m2Cfz/xolums/wadsa.gif",
          fallbackName: "Master",
        },
        {
          discordId: "1161629566478073977",
          banner: "https://file.garden/aWEjqj03KS-m2Cfz/xolums/xlmss.png",
          fallbackName: "Vibe",
        },
      ],
    },
    {
      id: "page-exclusive",
      name: "Hall of Fame",
      type: "grid", // Circular glowing avatar grid with Discord hover popups
      users: [
        { discordId: "806491799626711060", fallbackName: "Member 1" },
        { discordId: "1478284462738505910", fallbackName: "Member 2" },
        { discordId: "1482842530650525890", fallbackName: "Member 3" },
        { discordId: "1518182598189387837", fallbackName: "Member 4" },
        { discordId: "1327220072481165346", fallbackName: "Member 5" },
        { discordId: "1485470671126659233", fallbackName: "Member 6" },
      ],
    },
    {
      id: "page-xclsv",
      name: "XCLSV",
      type: "grid",
      users: [
        { discordId: "1498547153897914382", fallbackName: "XCLSV 1" },
        { discordId: "818729714197069845", fallbackName: "XCLSV 2" },
        { discordId: "1500803765853360278", fallbackName: "XCLSV 3" },
        { discordId: "1311163736635211826", fallbackName: "XCLSV 4" },
      ],
    },
    {
      id: "page-team",
      name: "YYX",
      type: "grid",
      users: [
        { discordId: "1496377821076127774", fallbackName: "YYX Prime" },
        { discordId: "1415945154438762551", fallbackName: "YYX Member" },
        { discordId: "1362421736079102122", fallbackName: "YYX Elite" },
        { discordId: "958013565158170706", fallbackName: "YYX Scout" },
      ],
    },
  ],
};

/* ============================================================
   APPLICATION CORE LOGIC
============================================================ */

(function () {
  "use strict";

  // Collect all unique Discord IDs
  const allDiscordIds = [];
  CONFIG.pages.forEach((page) => {
    if (page.type === "cards" && page.cards) {
      page.cards.forEach((c) => {
        if (c.discordId && !allDiscordIds.includes(c.discordId)) {
          allDiscordIds.push(c.discordId);
        }
      });
    } else if (page.type === "grid" && page.users) {
      page.users.forEach((u) => {
        if (u.discordId && !allDiscordIds.includes(u.discordId)) {
          allDiscordIds.push(u.discordId);
        }
      });
    }
  });

  // Render HTML Structure
  function buildHTML() {
    const root = document.getElementById("root");
    if (!root) return;

    let html = `
      <audio id="bgMusic" loop>
        <source src="${CONFIG.audio.src}" type="audio/mpeg">
      </audio>

      <!-- Particle and chain effects -->
      <div class="effects" id="effects"></div>

      <!-- Intro Splash Screen -->
      <div id="intro">
        ${
          CONFIG.brand.logoImg
            ? `<img class="intro-logo" src="${CONFIG.brand.logoImg}" alt="${CONFIG.brand.name}">`
            : `<div class="intro-logo-text">${CONFIG.brand.name}</div>`
        }
        <div class="intro-enter"><span>— ${CONFIG.brand.subText} —</span></div>
      </div>

      <!-- Top Nav Menu (No GitHub Link) -->
      <nav class="nav-menu" id="nav-menu" style="display:none;">
        ${CONFIG.pages
          .map(
            (p, idx) => `
          <a href="#${p.id}" class="nav-item ${idx === 0 ? "active" : ""}" data-page="${p.id}">
            ${p.name}
          </a>
        `
          )
          .join("")}
      </nav>

      <!-- Page Transition Overlay -->
      <div id="page-transition"></div>
    `;

    // Render each page section
    CONFIG.pages.forEach((page, pageIdx) => {
      if (page.type === "cards") {
        html += `
          <div id="${page.id}" class="page ${pageIdx === 0 ? "in-view" : ""}">
            <div class="page-background" style="background-image: url('${CONFIG.backgrounds.home}');"></div>
            <div class="page-overlay"></div>

            <div class="logo-container">
              ${
                CONFIG.brand.logoImg
                  ? `<img src="${CONFIG.brand.logoImg}" alt="${CONFIG.brand.name}">`
                  : `<div class="brand-logo-text">${CONFIG.brand.name}</div>`
              }
            </div>

            <div class="rectangles-container">
              ${page.cards
                .map(
                  (card, cardIdx) => `
                <div class="rectangle" id="rect-${cardIdx + 1}" data-discord="${card.discordId}">
                  <div class="banner" id="banner-${cardIdx + 1}" style="background-image:url('${card.banner}');"></div>
                  <div class="avatar-wrap" id="awrap-${cardIdx + 1}">
                    <div class="avatar-circle" id="avatar-${cardIdx + 1}"></div>
                    <img class="avatar-deco" id="rdeco-${cardIdx + 1}" src="" alt="" />
                    <div class="status-dot offline" id="sdot-${cardIdx + 1}"></div>
                  </div>
                  <div class="rect-info" id="info-${cardIdx + 1}">
                    <div class="rect-username" id="rname-${cardIdx + 1}">${card.fallbackName || "User"}</div>
                    <div class="rect-tag" id="rtag-${cardIdx + 1}">@user</div>
                    <div class="rect-status-text" id="rstatus-${cardIdx + 1}"><span class="dot-small dot-offline"></span>Offline</div>
                    <div class="rect-spotify" id="rspotify-${cardIdx + 1}">
                      <img class="rect-spotify-art" id="rsart-${cardIdx + 1}" src="" alt="" />
                      <div class="rect-spotify-text">
                        <div class="rect-spotify-song" id="rssong-${cardIdx + 1}"></div>
                        <div class="rect-spotify-artist" id="rsartist-${cardIdx + 1}"></div>
                      </div>
                    </div>
                  </div>
                  <div class="name-text-bottom" id="nbottom-${cardIdx + 1}">@${card.fallbackName || "user"}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `;
      } else if (page.type === "grid") {
        html += `
          <div id="${page.id}" class="page exclusive-style">
            <div class="page-overlay"></div>
            <h1 class="exclusive-title">${page.name}</h1>
            <div class="exclusive-grid">
              ${page.users
                .map(
                  (u, uIdx) => `
                <div class="excl-slot" data-discord="${u.discordId}" id="eslot-${page.id}-${uIdx}">
                  <div class="excl-avatar-ring">
                    <div class="excl-avatar-inner" id="eavatar-${page.id}-${uIdx}">
                      <img class="excl-deco" id="edeco-${page.id}-${uIdx}" src="" alt="" />
                      <div class="excl-status-badge" id="ebadge-${page.id}-${uIdx}"></div>
                    </div>
                  </div>
                  <div class="excl-label" id="elabel-${page.id}-${uIdx}">${u.fallbackName || "loading..."}</div>
                  
                  <!-- Discord Hover Popup -->
                  <div class="excl-popup" id="epopup-${page.id}-${uIdx}">
                    <div class="excl-popup-banner" id="epbanner-${page.id}-${uIdx}"></div>
                    <div class="excl-popup-body">
                      <div class="excl-popup-avatar-wrap">
                        <div class="excl-popup-avatar" id="epavatar-${page.id}-${uIdx}">
                          <img class="excl-popup-deco" id="epdeco-${page.id}-${uIdx}" src="" alt="" />
                          <div class="excl-popup-status-dot" id="epsdot-${page.id}-${uIdx}"></div>
                        </div>
                      </div>
                      <div class="excl-popup-name" id="epname-${page.id}-${uIdx}">${u.fallbackName || "User"}</div>
                      <div class="excl-popup-tag" id="eptag-${page.id}-${uIdx}">@discord</div>
                      <div class="excl-popup-status-row">
                        <span class="excl-popup-dot" id="epdot-${page.id}-${uIdx}"></span>
                        <span id="epstatus-${page.id}-${uIdx}">Offline</span>
                      </div>
                      <div class="excl-popup-activity" id="epact-${page.id}-${uIdx}">
                        <div class="excl-popup-activity-title">Activity</div>
                        <div class="excl-popup-activity-name" id="epactname-${page.id}-${uIdx}"></div>
                      </div>
                    </div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `;
      }
    });

    // Floating audio controller & footer
    html += `
      <div class="audio-controller" id="audio-controller">
        <button class="audio-btn" id="audio-toggle" title="Play/Pause">
          <i class="fa-solid fa-play" id="audio-icon"></i>
        </button>
        <div class="audio-info">
          <div class="audio-title">${CONFIG.audio.title}</div>
          <div class="audio-status" id="audio-status">Click anywhere to start</div>
        </div>
      </div>

      <div class="made-by">— ${CONFIG.brand.name} WORLD —</div>
    `;

    root.innerHTML = html;
  }

  /* ============================================================
     HELPERS FOR DISCORD & LANYARD
  ============================================================ */
  const statusColors = {
    online: "#43b581",
    idle: "#faa61a",
    dnd: "#f04747",
    offline: "#747f8d",
  };

  function statusLabel(s) {
    switch (s) {
      case "online": return "Online";
      case "idle": return "Idle";
      case "dnd": return "Do Not Disturb";
      default: return "Offline";
    }
  }

  function avatarUrl(user) {
    if (user.avatar) {
      const ext = user.avatar.startsWith("a_") ? "gif" : "png";
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
    }
    try {
      const idx = Number((BigInt(user.id) >> 22n) % 6n);
      return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
    } catch (e) {
      return "https://cdn.discordapp.com/embed/avatars/0.png";
    }
  }

  function decoUrl(asset) {
    if (!asset) return null;
    return `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=160&passthrough=true`;
  }

  /* ============================================================
     UPDATE DOM ELEMENTS FROM DISCORD DATA
  ============================================================ */
  function applyDiscordData(id, data) {
    if (!data || !data.discord_user) return;
    const u = data.discord_user;
    const status = data.discord_status || "offline";
    const color = statusColors[status] || "#747f8d";
    const displayName = u.global_name || u.display_name || u.username || "User";
    const username = u.username || "user";
    const av = avatarUrl(u);

    // 1. Update tall rectangle cards
    document.querySelectorAll(`.rectangle[data-discord="${id}"]`).forEach((rect) => {
      const idx = rect.id.replace("rect-", "");

      const avatarEl = document.getElementById(`avatar-${idx}`);
      if (avatarEl) avatarEl.style.backgroundImage = `url('${av}')`;

      const nameEl = document.getElementById(`rname-${idx}`);
      if (nameEl) nameEl.textContent = displayName;

      const tagEl = document.getElementById(`rtag-${idx}`);
      if (tagEl) tagEl.textContent = `@${username}`;

      const bottomTag = document.getElementById(`nbottom-${idx}`);
      if (bottomTag) bottomTag.textContent = `@${username}`;

      const sdot = document.getElementById(`sdot-${idx}`);
      if (sdot) sdot.className = `status-dot ${status}`;

      const rstatus = document.getElementById(`rstatus-${idx}`);
      if (rstatus) {
        rstatus.innerHTML = `<span class="dot-small dot-${status}"></span>${statusLabel(status)}`;
      }

      // Decoration
      if (u.avatar_decoration_data?.asset) {
        const decoEl = document.getElementById(`rdeco-${idx}`);
        if (decoEl) {
          decoEl.src = decoUrl(u.avatar_decoration_data.asset);
          decoEl.onload = () => decoEl.classList.add("loaded");
        }
      }

      // Spotify
      const spEl = document.getElementById(`rspotify-${idx}`);
      if (spEl) {
        if (data.spotify && data.spotify.track_id) {
          spEl.classList.add("active");
          const art = document.getElementById(`rsart-${idx}`);
          const song = document.getElementById(`rssong-${idx}`);
          const artist = document.getElementById(`rsartist-${idx}`);
          if (art) art.src = data.spotify.album_art_url || "";
          if (song) song.textContent = data.spotify.song || "";
          if (artist) artist.textContent = data.spotify.artist || "";
        } else {
          spEl.classList.remove("active");
        }
      }
    });

    // 2. Update circular exclusive grid slots & popups
    document.querySelectorAll(`.excl-slot[data-discord="${id}"]`).forEach((slot) => {
      const slotId = slot.id.replace("eslot-", "");

      // Main circle
      const innerAv = document.getElementById(`eavatar-${slotId}`);
      if (innerAv) innerAv.style.backgroundImage = `url('${av}')`;

      const badge = document.getElementById(`ebadge-${slotId}`);
      if (badge) {
        badge.style.background = color;
        badge.style.boxShadow = status !== "offline" ? `0 0 8px ${color}` : "none";
      }

      const label = document.getElementById(`elabel-${slotId}`);
      if (label) label.textContent = displayName;

      // Decoration
      if (u.avatar_decoration_data?.asset) {
        const dUrl = decoUrl(u.avatar_decoration_data.asset);
        const edeco = document.getElementById(`edeco-${slotId}`);
        if (edeco) {
          edeco.src = dUrl;
          edeco.onload = () => edeco.classList.add("loaded");
        }
        const epdeco = document.getElementById(`epdeco-${slotId}`);
        if (epdeco) {
          epdeco.src = dUrl;
          epdeco.onload = () => epdeco.classList.add("loaded");
        }
      }

      // Popup content
      const pbanner = document.getElementById(`epbanner-${slotId}`);
      if (pbanner) {
        if (u.banner) {
          const bext = u.banner.startsWith("a_") ? "gif" : "png";
          pbanner.style.backgroundImage = `url('https://cdn.discordapp.com/banners/${u.id}/${u.banner}.${bext}?size=512')`;
        } else if (u.accent_color) {
          const hex = "#" + u.accent_color.toString(16).padStart(6, "0");
          pbanner.style.background = `linear-gradient(135deg, ${hex}, ${hex}55)`;
        } else {
          pbanner.style.background = "linear-gradient(135deg, #444, #111)";
        }
      }

      const pavatar = document.getElementById(`epavatar-${slotId}`);
      if (pavatar) pavatar.style.backgroundImage = `url('${av}')`;

      const psdot = document.getElementById(`epsdot-${slotId}`);
      if (psdot) {
        psdot.style.background = color;
        psdot.style.boxShadow = status !== "offline" ? `0 0 6px ${color}` : "none";
      }

      const pdot = document.getElementById(`epdot-${slotId}`);
      if (pdot) pdot.style.background = color;

      const pname = document.getElementById(`epname-${slotId}`);
      if (pname) pname.textContent = displayName;

      const ptag = document.getElementById(`eptag-${slotId}`);
      if (ptag) ptag.textContent = `@${username}`;

      const pstatus = document.getElementById(`epstatus-${slotId}`);
      if (pstatus) pstatus.textContent = statusLabel(status);

      // Activity / Spotify in popup
      const pact = document.getElementById(`epact-${slotId}`);
      const pactname = document.getElementById(`epactname-${slotId}`);
      if (pact && pactname) {
        if (data.activities && data.activities.length > 0) {
          const act = data.activities.find((a) => a.type !== 2) || data.activities[0];
          if (act && act.name) {
            pact.classList.add("active");
            pactname.textContent = act.name + (act.state ? ` — ${act.state}` : "");
          }
        } else if (data.spotify && data.spotify.track_id) {
          pact.classList.add("active");
          pact.querySelector(".excl-popup-activity-title").textContent = "Listening to Spotify";
          pactname.textContent = `${data.spotify.song} — ${data.spotify.artist}`;
        } else {
          pact.classList.remove("active");
        }
      }
    });
  }

  /* ============================================================
     FETCH VIA REST API (FAST INITIAL LOAD)
  ============================================================ */
  async function fetchAllREST() {
    for (const id of allDiscordIds) {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
        if (!res.ok) continue;
        const json = await res.json();
        if (json.success && json.data) {
          applyDiscordData(id, json.data);
        }
      } catch (err) {
        // Silently continue
      }
    }
  }

  /* ============================================================
     CONNECT VIA LANYARD WEBSOCKET (LIVE REAL-TIME UPDATES)
  ============================================================ */
  function connectLanyardWS() {
    let ws;
    let heartbeatTimer;

    function initSocket() {
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onopen = () => {
        // Subscribe to all configured discord IDs
        ws.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_ids: allDiscordIds,
            },
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const { op, d, t } = message;

          // Hello / Heartbeat
          if (op === 1) {
            const interval = d.heartbeat_interval;
            if (heartbeatTimer) clearInterval(heartbeatTimer);
            heartbeatTimer = setInterval(() => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }));
              }
            }, interval);
          }

          // Initial batch state
          if (t === "INIT_STATE") {
            Object.keys(d).forEach((userId) => {
              applyDiscordData(userId, d[userId]);
            });
          }

          // Live presence update
          if (t === "PRESENCE_UPDATE") {
            if (d && d.discord_user && d.discord_user.id) {
              applyDiscordData(d.discord_user.id, d);
            }
          }
        } catch (e) {
          console.error("Lanyard error:", e);
        }
      };

      ws.onclose = () => {
        if (heartbeatTimer) clearInterval(heartbeatTimer);
        setTimeout(initSocket, 3000);
      };

      ws.onerror = () => {
        ws.close();
      };
    }

    initSocket();
  }

  /* ============================================================
     INTERACTIVITY & ANIMATIONS
  ============================================================ */
  function initializeInteractivity() {
    const effects = document.getElementById("effects");
    const intro = document.getElementById("intro");
    const navMenu = document.getElementById("nav-menu");
    const bgMusic = document.getElementById("bgMusic");
    const audioToggle = document.getElementById("audio-toggle");
    const audioIcon = document.getElementById("audio-icon");
    const audioStatus = document.getElementById("audio-status");
    const homePage = document.getElementById("page-home");
    const transitionEl = document.getElementById("page-transition");

    // Spawn stars & chain particle animation
    if (effects) {
      for (let i = 0; i < 55; i++) {
        const s = document.createElement("div");
        s.className = "star";
        s.style.left = Math.random() * 100 + "%";
        s.style.top = Math.random() * 100 + "%";
        s.style.animationDuration = 3 + Math.random() * 5 + "s";
        s.style.animationDelay = Math.random() * 3 + "s";
        effects.appendChild(s);
      }
      for (let i = 0; i < 8; i++) {
        const c = document.createElement("div");
        c.className = "chain";
        c.textContent = "⛓";
        c.style.left = Math.random() * 100 + "%";
        c.style.animationDuration = 18 + Math.random() * 14 + "s";
        c.style.animationDelay = Math.random() * 4 + "s";
        effects.appendChild(c);
      }
    }

    // Audio Playback Helpers
    function playAudio() {
      if (!bgMusic) return;
      bgMusic.volume = 0.8;
      bgMusic
        .play()
        .then(() => {
          if (audioIcon) audioIcon.className = "fa-solid fa-pause";
          if (audioStatus) audioStatus.textContent = "Now playing";
        })
        .catch(() => {
          if (audioStatus) audioStatus.textContent = "Click to unmute";
        });
    }

    function pauseAudio() {
      if (!bgMusic) return;
      bgMusic.pause();
      if (audioIcon) audioIcon.className = "fa-solid fa-play";
      if (audioStatus) audioStatus.textContent = "Paused";
    }

    if (audioToggle) {
      audioToggle.addEventListener("click", () => {
        if (bgMusic.paused) {
          playAudio();
        } else {
          pauseAudio();
        }
      });
    }

    // Enter Splash Screen
    let entered = false;
    function doEnter() {
      if (entered) return;
      entered = true;
      if (intro) intro.classList.add("exit");
      playAudio();

      setTimeout(() => {
        if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
        if (effects && effects.parentNode) effects.parentNode.removeChild(effects);
        if (navMenu) navMenu.style.display = "flex";
        if (homePage) homePage.classList.add("in-view");
      }, 950);
    }

    if (intro) {
      intro.addEventListener("click", doEnter);
      intro.addEventListener("touchend", (e) => {
        e.preventDefault();
        doEnter();
      }, { passive: false });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") doEnter();
    });

    // Smooth Navigation with Blackout Fade Effect
    function smoothNavigate(targetId) {
      const target = document.getElementById(targetId);
      if (!target || !transitionEl) return;
      transitionEl.classList.add("fade-in");

      setTimeout(() => {
        target.scrollIntoView({ behavior: "instant", block: "start" });
        target.classList.add("in-view");
        setTimeout(() => {
          transitionEl.classList.remove("fade-in");
        }, 50);
      }, 400);
    }

    document.querySelectorAll(".nav-item").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href")?.replace("#", "");
        if (targetId) smoothNavigate(targetId);
      });
    });

    // Scroll Listener for 3D Background Tilt & Active Nav Link
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY + 120;

      // 3D tilt background effect when scrolling down past Home
      if (homePage) {
        if (scrollY > 220) {
          homePage.classList.add("scrolled");
        } else {
          homePage.classList.remove("scrolled");
        }
      }

      // Highlight active nav item
      document.querySelectorAll(".page").forEach((section) => {
        const id = section.getAttribute("id");
        if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
          document.querySelectorAll(".nav-item").forEach((ni) => {
            ni.classList.remove("active");
            if (ni.getAttribute("href") === `#${id}`) {
              ni.classList.add("active");
            }
          });
        }
      });
    });

    // IntersectionObserver for scroll in-view animations
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
            }
          });
        },
        { threshold: 0.08 }
      );
      document.querySelectorAll(".page").forEach((p) => observer.observe(p));
    }

    // Touch devices tap-to-expand handling
    initMobileTouch();
  }

  function initMobileTouch() {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouch) return;

    let expandedRect = null;
    document.querySelectorAll(".rectangle").forEach((rect) => {
      rect.addEventListener("touchend", (e) => {
        if (rect._touchMoved) return;
        e.stopPropagation();

        if (expandedRect && expandedRect !== rect) {
          expandedRect.classList.remove("mobile-expanded");
        }
        rect.classList.toggle("mobile-expanded");
        expandedRect = rect.classList.contains("mobile-expanded") ? rect : null;
      });

      rect.addEventListener("touchstart", () => { rect._touchMoved = false; }, { passive: true });
      rect.addEventListener("touchmove", () => { rect._touchMoved = true; }, { passive: true });
    });

    let expandedExcl = null;
    document.querySelectorAll(".excl-slot").forEach((slot) => {
      slot.addEventListener("touchend", (e) => {
        if (slot._touchMoved) return;
        e.stopPropagation();

        if (expandedExcl && expandedExcl !== slot) {
          expandedExcl.classList.remove("mobile-expanded");
        }
        slot.classList.toggle("mobile-expanded");
        expandedExcl = slot.classList.contains("mobile-expanded") ? slot : null;
      });

      slot.addEventListener("touchstart", () => { slot._touchMoved = false; }, { passive: true });
      slot.addEventListener("touchmove", () => { slot._touchMoved = true; }, { passive: true });
    });

    document.addEventListener("touchend", (e) => {
      if (expandedRect && !e.target.closest(".rectangle")) {
        expandedRect.classList.remove("mobile-expanded");
        expandedRect = null;
      }
      if (expandedExcl && !e.target.closest(".excl-slot")) {
        expandedExcl.classList.remove("mobile-expanded");
        expandedExcl = null;
      }
    });
  }

  /* ============================================================
     START APPLICATION
  ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    buildHTML();
    initializeInteractivity();
    fetchAllREST();
    connectLanyardWS();
  });
})();
