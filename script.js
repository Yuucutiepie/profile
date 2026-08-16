/**
 * ============================================================
 * XCLSV CLAN ✦ ULTRA SHOWCASE JAVASCRIPT SYSTEM
 * Clan Heads (Cream & Yuu) + Hall of Fame + Members
 * Real-time Discord Lanyard + 3D Tilt + Audio Changer Engine
 * ============================================================
 */

const CONFIG = {
  // BRANDING
  brand: {
    name: "XCLSV",
    subText: "HEADS: YUU & CREAM",
    navTitle: "XCLSV",
  },

  // 1) CLAN HEADS (THE FOUNDERS & SUPREME LEADERS: CREAM & YUU)
  heads: {
    cream: {
      discordId: "1393674906197033123", // Cream / Cwerm's Discord ID
      name: "Cwerm",
      tag: "@Cream",
      role: "Mapakla",
      badge: "Founder",
      bio: "AHHH YAMETE ✦ XCLSV Head",
      banner: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDRtcTM1OWtvNXNta3Jrd3FmcnJtb2cya2t1NmNxeng3eXppcXdwNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/117XNEF51xu8Wk/giphy.gif",
      color: "#ff7ebb",
    },
    yuu: {
      discordId: "1485470671126659233", // Yuu's Discord ID
      name: "Yuu",
      tag: "@yuu",
      role: "MASARAP",
      badge: "Founder",
      bio: "Commanding XCLSV with Cream ✦ Clan Head",
      banner: "https://i.pinimg.com/736x/36/74/4a/36744aed24a1e4825445d5321e251e4c.jpg",
      color: "#7eb4ff",
    },
  },

  // 2) HALL OF FAME (CLAN ELITES & LEGENDS)
  hallOfFame: [
    { discordId: "1390873845279232110", fallbackName: "Masarap 1" },
    { discordId: "1478284462738505910", fallbackName: "Masarap 2" },
    { discordId: "0", fallbackName: "Masarap 3" },
    { discordId: "0", fallbackName: "Elite 4" },
    { discordId: "0", fallbackName: "Elite 5" },
    { discordId: "0", fallbackName: "Elite 6" },
  ],

  // 3) CLAN MEMBERS (ACTIVE VANGUARD)
  members: [
    { discordId: "1482842530650525890", fallbackName: "Vanguard 1" },
    { discordId: "818729714197069845", fallbackName: "Vanguard 2" },
    { discordId: "0", fallbackName: "Vanguard 3" },
    { discordId: "0", fallbackName: "Vanguard 4" },
    { discordId: "1415945154438762551", fallbackName: "Vanguard 5" },
    { discordId: "0", fallbackName: "Vanguard 6" },
  ],

  // 4) PLAYLIST CONFIGURATION (Default is Addicted To You.mp3 / File Garden)
  playlist: [
    {
      title: "Addicted To You",
      artist: "Main Track",
      src: "Addicted To You.mp3",
    },
    {
      title: "Molly to the Head",
      artist: "Hev Abi",
      src: "https://file.garden/aWEjqj03KS-m2Cfz/arcs/Hev%20Abi%20-%20molly%20to%20the%20head%20freestyle.mp3",
    },
    {
      title: "Montagem Phonk",
      artist: "Aesthetic Phonk",
      src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=phonk-112199.mp3",
    },
    {
      title: "Midnight Lo-Fi Chill",
      artist: "Lo-Fi Dream",
      src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=lofi-study-112191.mp3",
    },
  ],
};

(function () {
  "use strict";

  // Collect all unique Discord IDs safely
  const allDiscordIds = [];
  Object.keys(CONFIG.heads).forEach((k) => {
    const id = CONFIG.heads[k]?.discordId;
    if (id && !allDiscordIds.includes(id)) allDiscordIds.push(id);
  });
  if (Array.isArray(CONFIG.hallOfFame)) {
    CONFIG.hallOfFame.forEach((m) => {
      if (m.discordId && !allDiscordIds.includes(m.discordId)) allDiscordIds.push(m.discordId);
    });
  }
  if (Array.isArray(CONFIG.members)) {
    CONFIG.members.forEach((m) => {
      if (m.discordId && !allDiscordIds.includes(m.discordId)) allDiscordIds.push(m.discordId);
    });
  }

  /* ============================================================
     1) DYNAMIC RENDER OF HALL OF FAME & MEMBERS GRIDS
  ============================================================ */
  function renderClanGrids() {
    const fameGrid = document.getElementById("fame-grid");
    const membersGrid = document.getElementById("members-grid");

    if (fameGrid && Array.isArray(CONFIG.hallOfFame)) {
      fameGrid.innerHTML = CONFIG.hallOfFame
        .map(
          (u, idx) => `
        <div class="clan-slot" data-discord="${u.discordId}" id="fame-slot-${idx}">
          <div class="clan-avatar-ring">
            <div class="clan-avatar-inner" id="eavatar-fame-${idx}">
              <img class="clan-deco" id="edeco-fame-${idx}" src="" alt="deco" />
              <div class="clan-status-badge" id="ebadge-fame-${idx}"></div>
            </div>
          </div>
          <div class="clan-label" id="elabel-fame-${idx}">${u.fallbackName || "loading..."}</div>

          <!-- Discord Hover Popup -->
          <div class="clan-popup" id="epopup-fame-${idx}">
            <div class="clan-popup-banner" id="epbanner-fame-${idx}"></div>
            <div class="clan-popup-body">
              <div class="clan-popup-avatar-wrap">
                <div class="clan-popup-avatar" id="epavatar-fame-${idx}">
                  <img class="clan-popup-deco" id="epdeco-fame-${idx}" src="" alt="deco" />
                  <div class="clan-popup-status-dot" id="epsdot-fame-${idx}"></div>
                </div>
              </div>
              <div class="clan-popup-name" id="epname-fame-${idx}">${u.fallbackName || "User"}</div>
              <div class="clan-popup-tag" id="eptag-fame-${idx}">@discord</div>
              <div class="clan-popup-status-row">
                <span class="clan-popup-dot" id="epdot-fame-${idx}"></span>
                <span id="epstatus-fame-${idx}">Offline</span>
              </div>
              <div class="clan-popup-activity" id="epact-fame-${idx}">
                <div class="clan-popup-activity-title">Activity</div>
                <div class="clan-popup-activity-name" id="epactname-fame-${idx}"></div>
              </div>
            </div>
          </div>
        </div>
      `
        )
        .join("");
    }

    if (membersGrid && Array.isArray(CONFIG.members)) {
      membersGrid.innerHTML = CONFIG.members
        .map(
          (u, idx) => `
        <div class="clan-slot" data-discord="${u.discordId}" id="member-slot-${idx}">
          <div class="clan-avatar-ring">
            <div class="clan-avatar-inner" id="eavatar-member-${idx}">
              <img class="clan-deco" id="edeco-member-${idx}" src="" alt="deco" />
              <div class="clan-status-badge" id="ebadge-member-${idx}"></div>
            </div>
          </div>
          <div class="clan-label" id="elabel-member-${idx}">${u.fallbackName || "loading..."}</div>

          <!-- Discord Hover Popup -->
          <div class="clan-popup" id="epopup-member-${idx}">
            <div class="clan-popup-banner" id="epbanner-member-${idx}"></div>
            <div class="clan-popup-body">
              <div class="clan-popup-avatar-wrap">
                <div class="clan-popup-avatar" id="epavatar-member-${idx}">
                  <img class="clan-popup-deco" id="epdeco-member-${idx}" src="" alt="deco" />
                  <div class="clan-popup-status-dot" id="epsdot-member-${idx}"></div>
                </div>
              </div>
              <div class="clan-popup-name" id="epname-member-${idx}">${u.fallbackName || "User"}</div>
              <div class="clan-popup-tag" id="eptag-member-${idx}">@discord</div>
              <div class="clan-popup-status-row">
                <span class="clan-popup-dot" id="epdot-member-${idx}"></span>
                <span id="epstatus-member-${idx}">Offline</span>
              </div>
              <div class="clan-popup-activity" id="epact-member-${idx}">
                <div class="clan-popup-activity-title">Activity</div>
                <div class="clan-popup-activity-name" id="epactname-member-${idx}"></div>
              </div>
            </div>
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  /* ============================================================
     2) CUSTOM CURSOR SYSTEM
  ============================================================ */
  function initCustomCursor() {
    const cursor = document.getElementById("cursor");
    const trail = document.getElementById("cursor-trail");
    if (!cursor || !trail) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = mouseX;
    let trailY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function renderTrail() {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderTrail);
    }
    renderTrail();

    // Hover expand on clickable elements
    document.querySelectorAll("button, a, input, .head-card, .clan-slot, .track-item, label").forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  /* ============================================================
     3) INTERACTIVE BACKGROUND PARTICLES & STARS CANVAS
  ============================================================ */
  function initCanvasBackground() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Particle Stars
    const particles = [];
    const particleCount = Math.min(100, Math.floor(width / 14));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        baseAlpha: Math.random() * 0.6 + 0.2,
        alpha: 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Shooting Stars
    const shootingStars = [];
    function spawnShootingStar() {
      if (shootingStars.length < 2 && Math.random() < 0.015) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * (height / 2),
          len: Math.random() * 120 + 80,
          speed: Math.random() * 12 + 10,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          opacity: 1,
        });
      }
    }

    let time = 0;
    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      // Ambient glowing nebula
      const grad1 = ctx.createRadialGradient(width * 0.25, height * 0.35, 10, width * 0.25, height * 0.35, width * 0.45);
      grad1.addColorStop(0, "rgba(255, 126, 187, 0.03)");
      grad1.addColorStop(1, "transparent");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.75, height * 0.65, 10, width * 0.75, height * 0.65, width * 0.45);
      grad2.addColorStop(0, "rgba(126, 180, 255, 0.03)");
      grad2.addColorStop(1, "transparent");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw particle stars
      time += 0.04;
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.baseAlpha + Math.sin(time * p.twinkleSpeed * 10 + p.twinkleOffset) * 0.3;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, currentAlpha))})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Handle Shooting Stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        const sGrad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        sGrad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        sGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = sGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.015;

        if (s.opacity <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }

  /* ============================================================
     4) 3D CARD PARALLAX TILT PHYSICS (CLAN HEADS)
  ============================================================ */
  function init3DCardTilt() {
    const cards = document.querySelectorAll(".head-card");

    cards.forEach((card) => {
      const parent = card.closest(".head-card-wrap");
      if (!parent) return;

      function onMouseMove(e) {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((cardY - centerY) / centerY) * -12;
        const rotateY = ((cardX - centerX) / centerX) * 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.02)`;

        // Light sheen coordinates
        const percentX = (cardX / rect.width) * 100;
        const percentY = (cardY / rect.height) * 100;
        card.style.setProperty("--mouse-x", `${percentX}%`);
        card.style.setProperty("--mouse-y", `${percentY}%`);
      }

      function onMouseLeave() {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
      }

      parent.addEventListener("mousemove", onMouseMove);
      parent.addEventListener("mouseleave", onMouseLeave);
    });
  }

  /* ============================================================
     5) TOAST NOTIFICATION SYSTEM
  ============================================================ */
  function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#43b581; margin-right:8px;"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
  }

  /* ============================================================
     6) AUDIO PLAYER & PLAYLIST CHANGER ENGINE
  ============================================================ */
  let currentTrackIndex = 0;
  const audio = document.getElementById("bgMusic");
  const playBtn = document.getElementById("hud-play-btn");
  const playIcon = document.getElementById("hud-play-icon");
  const trackTitle = document.getElementById("hud-track-title");
  const trackStatus = document.getElementById("hud-track-status");
  const navSongTitle = document.getElementById("nav-song-title");
  const progressBar = document.getElementById("hud-progress-bar");
  const progressFill = document.getElementById("hud-progress-fill");
  const timeCurrent = document.getElementById("hud-time-current");
  const timeDuration = document.getElementById("hud-time-duration");
  const muteBtn = document.getElementById("hud-mute-btn");
  const volIcon = document.getElementById("hud-vol-icon");
  const volSlider = document.getElementById("hud-vol-slider");
  const waveform = document.getElementById("hud-waveform");
  const playlistContainer = document.getElementById("preset-track-list");
  const musicModal = document.getElementById("music-modal");

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function loadTrack(index, autoPlay = true) {
    if (!CONFIG.playlist || !CONFIG.playlist[index] || !audio) return;
    currentTrackIndex = index;
    const track = CONFIG.playlist[index];

    audio.src = track.src;
    if (trackTitle) trackTitle.textContent = track.title;
    if (navSongTitle) navSongTitle.textContent = track.title;
    if (trackStatus) trackStatus.textContent = `${track.artist}`;

    // Update active state in modal list
    document.querySelectorAll(".track-item").forEach((el, idx) => {
      el.classList.toggle("active", idx === index);
    });

    if (autoPlay) {
      audio
        .play()
        .then(() => updatePlayState(true))
        .catch(() => updatePlayState(false));
    }
  }

  function updatePlayState(isPlaying) {
    if (playIcon) playIcon.className = isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play";
    if (waveform) {
      if (isPlaying) waveform.classList.remove("paused");
      else waveform.classList.add("paused");
    }
    if (trackStatus) trackStatus.textContent = isPlaying ? "Now Playing ✦" : "Paused";
  }

  function togglePlay() {
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => updatePlayState(true)).catch(() => updatePlayState(false));
    } else {
      audio.pause();
      updatePlayState(false);
    }
  }

  function renderPlaylistModal() {
    if (!playlistContainer || !Array.isArray(CONFIG.playlist)) return;
    playlistContainer.innerHTML = "";

    CONFIG.playlist.forEach((track, idx) => {
      const item = document.createElement("div");
      item.className = `track-item ${idx === currentTrackIndex ? "active" : ""}`;
      item.innerHTML = `
        <div class="track-item-left">
          <i class="fa-solid fa-circle-play track-item-icon"></i>
          <div>
            <div class="track-item-name">${track.title}</div>
            <div class="track-item-tag">${track.artist}</div>
          </div>
        </div>
        <i class="fa-solid fa-volume-high" style="font-size:11px; opacity:0.6;"></i>
      `;

      item.addEventListener("click", () => {
        loadTrack(idx, true);
        showToast(`Playing "${track.title}"`);
      });

      playlistContainer.appendChild(item);
    });
  }

  function initAudioControls() {
    loadTrack(0, false);
    renderPlaylistModal();

    if (playBtn) playBtn.addEventListener("click", togglePlay);

    // Audio timeupdate
    if (audio) {
      audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
          const percent = (audio.currentTime / audio.duration) * 100;
          if (progressFill) progressFill.style.width = `${percent}%`;
          if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime);
          if (timeDuration) timeDuration.textContent = formatTime(audio.duration);
        }
      });
    }

    // Seek bar click
    if (progressBar) {
      progressBar.addEventListener("click", (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        if (audio && audio.duration) {
          audio.currentTime = pos * audio.duration;
        }
      });
    }

    // Volume Slider
    if (volSlider && audio) {
      volSlider.addEventListener("input", (e) => {
        audio.volume = parseFloat(e.target.value);
        audio.muted = false;
        if (volIcon) volIcon.className = audio.volume === 0 ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
      });
    }

    // Mute Button
    if (muteBtn && audio) {
      muteBtn.addEventListener("click", () => {
        audio.muted = !audio.muted;
        if (volIcon) volIcon.className = audio.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
      });
    }

    // Modal Triggers
    const openModalBtn = document.getElementById("hud-playlist-btn");
    const openNavModalBtn = document.getElementById("open-music-modal-nav");
    const closeModalBtn = document.getElementById("close-music-modal");

    function openModal() {
      if (musicModal) musicModal.classList.add("active");
    }
    function closeModal() {
      if (musicModal) musicModal.classList.remove("active");
    }

    if (openModalBtn) openModalBtn.addEventListener("click", openModal);
    if (openNavModalBtn) openNavModalBtn.addEventListener("click", openModal);
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if (musicModal) {
      musicModal.addEventListener("click", (e) => {
        if (e.target === musicModal) closeModal();
      });
    }

    // Custom Audio URL
    const applyUrlBtn = document.getElementById("apply-audio-url");
    const customUrlInput = document.getElementById("custom-audio-url");
    if (applyUrlBtn && customUrlInput) {
      applyUrlBtn.addEventListener("click", () => {
        const url = customUrlInput.value.trim();
        if (url) {
          CONFIG.playlist.push({
            title: "Custom Stream",
            artist: "User Link",
            src: url,
          });
          renderPlaylistModal();
          loadTrack(CONFIG.playlist.length - 1, true);
          showToast("Loaded custom audio URL!");
          closeModal();
        }
      });
    }

    // File Input Upload
    const fileInput = document.getElementById("audio-file-input");
    const uploadText = document.getElementById("upload-label-text");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const fileUrl = URL.createObjectURL(file);
          const name = file.name.replace(/\.[^/.]+$/, "");
          if (uploadText) uploadText.textContent = `Selected: ${file.name}`;

          CONFIG.playlist.unshift({
            title: name,
            artist: "Uploaded File",
            src: fileUrl,
          });
          renderPlaylistModal();
          loadTrack(0, true);
          showToast(`Now playing "${name}"`);
          closeModal();
        }
      });
    }
  }

  /* ============================================================
     7) REAL-TIME DISCORD LANYARD INTEGRATION
  ============================================================ */
  const statusColors = {
    online: "#43b581",
    idle: "#faa61a",
    dnd: "#f04747",
    offline: "#747f8d",
  };

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

  function applyDiscordDataToAll(id, data) {
    if (!data || !data.discord_user) return;
    const u = data.discord_user;
    const status = data.discord_status || "offline";
    const color = statusColors[status] || "#747f8d";
    const displayName = u.global_name || u.display_name || u.username || "User";
    const username = u.username || "user";
    const av = avatarUrl(u);

    // 1. Update Clan Heads (handles any keys like cream, yuu, eya, etc.)
    Object.keys(CONFIG.heads).forEach((headKey) => {
      const headConfig = CONFIG.heads[headKey];
      if (headConfig && headConfig.discordId === id) {
        // Map to normalized IDs (e.g. cream / yuu)
        const key = headKey.toLowerCase();

        const avEl = document.getElementById(`avatar-${key}`);
        if (avEl) avEl.style.backgroundImage = `url('${av}')`;

        const nameEl = document.getElementById(`name-${key}`);
        if (nameEl) nameEl.textContent = displayName;

        const tagEl = document.getElementById(`tag-${key}`);
        if (tagEl) tagEl.textContent = `@${username}`;

        if (u.avatar_decoration_data?.asset) {
          const deco = document.getElementById(`deco-${key}`);
          if (deco) {
            deco.src = decoUrl(u.avatar_decoration_data.asset);
            deco.onload = () => deco.classList.add("loaded");
          }
        }

        const orb = document.getElementById(`status-orb-${key}`);
        if (orb) orb.className = `status-orb ${status}`;

        const miniDot = document.getElementById(`status-mini-${key}`);
        if (miniDot) miniDot.className = `status-dot-mini ${status}`;

        const statusLabel = document.getElementById(`status-label-${key}`);
        if (statusLabel) {
          const textMap = { online: "Online", idle: "Idle", dnd: "Do Not Disturb", offline: "Offline" };
          statusLabel.textContent = textMap[status] || "Offline";
        }

        // Custom status / bio
        if (data.activities && data.activities.length > 0) {
          const customStatus = data.activities.find((a) => a.type === 4);
          if (customStatus && customStatus.state) {
            const bioText = document.getElementById(`bio-text-${key}`);
            if (bioText) bioText.textContent = `${customStatus.emoji ? customStatus.emoji.name + " " : ""}${customStatus.state}`;
          }
        }

        // Spotify
        const spWidget = document.getElementById(`spotify-${key}`);
        if (spWidget) {
          if (data.spotify && data.spotify.track_id) {
            spWidget.classList.add("active");
            const art = document.getElementById(`sp-art-${key}`);
            const song = document.getElementById(`sp-song-${key}`);
            const artist = document.getElementById(`sp-artist-${key}`);
            if (art) art.src = data.spotify.album_art_url || "";
            if (song) song.textContent = data.spotify.song || "";
            if (artist) artist.textContent = data.spotify.artist || "";
          } else {
            spWidget.classList.remove("active");
          }
        }

        // Activity / Game
        const actWidget = document.getElementById(`activity-${key}`);
        if (actWidget) {
          const nonSpotify = data.activities?.find((a) => a.type !== 2 && a.type !== 4);
          if (nonSpotify && nonSpotify.name) {
            actWidget.classList.add("active");
            const actTitle = document.getElementById(`act-title-${key}`);
            const actName = document.getElementById(`act-name-${key}`);
            if (actTitle) actTitle.textContent = nonSpotify.type === 0 ? "PLAYING A GAME" : "ACTIVE NOW";
            if (actName) actName.textContent = nonSpotify.name + (nonSpotify.details ? ` — ${nonSpotify.details}` : "");
          } else {
            actWidget.classList.remove("active");
          }
        }
      }
    });

    // 2. Update Hall of Fame and Members Grid Slots
    document.querySelectorAll(`.clan-slot[data-discord="${id}"]`).forEach((slot) => {
      const slotId = slot.id.replace("fame-slot-", "fame-").replace("member-slot-", "member-");

      // Circular Ring
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
      if (pstatus) {
        const textMap = { online: "Online", idle: "Idle", dnd: "Do Not Disturb", offline: "Offline" };
        pstatus.textContent = textMap[status] || "Offline";
      }

      // Activity / Spotify in popup
      const pact = document.getElementById(`epact-${slotId}`);
      const pactname = document.getElementById(`epactname-${slotId}`);
      if (pact && pactname) {
        if (data.activities && data.activities.length > 0) {
          const act = data.activities.find((a) => a.type !== 2 && a.type !== 4) || data.activities[0];
          if (act && act.name) {
            pact.classList.add("active");
            pactname.textContent = act.name + (act.state ? ` — ${act.state}` : "");
          }
        } else if (data.spotify && data.spotify.track_id) {
          pact.classList.add("active");
          pact.querySelector(".clan-popup-activity-title").textContent = "Listening to Spotify";
          pactname.textContent = `${data.spotify.song} — ${data.spotify.artist}`;
        } else {
          pact.classList.remove("active");
        }
      }
    });
  }

  async function fetchLanyardREST() {
    for (const id of allDiscordIds) {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
        if (!res.ok) continue;
        const json = await res.json();
        if (json.success && json.data) {
          applyDiscordDataToAll(id, json.data);
        }
      } catch (e) {}
    }
  }

  function connectLanyardWS() {
    if (!allDiscordIds.length) return;

    let ws;
    let heartbeatTimer;

    function initSocket() {
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onopen = () => {
        ws.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: allDiscordIds } }));
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          const { op, d, t } = msg;

          if (op === 1) {
            if (heartbeatTimer) clearInterval(heartbeatTimer);
            heartbeatTimer = setInterval(() => {
              if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ op: 3 }));
            }, d.heartbeat_interval);
          }

          if (t === "INIT_STATE") {
            Object.keys(d).forEach((userId) => {
              applyDiscordDataToAll(userId, d[userId]);
            });
          }

          if (t === "PRESENCE_UPDATE") {
            const uid = d?.discord_user?.id;
            if (uid) applyDiscordDataToAll(uid, d);
          }
        } catch (err) {}
      };

      ws.onclose = () => {
        if (heartbeatTimer) clearInterval(heartbeatTimer);
        setTimeout(initSocket, 3000);
      };

      ws.onerror = () => ws.close();
    }

    initSocket();
  }

  /* ============================================================
     8) ACTION BUTTONS (COPY ID & MENTION)
  ============================================================ */
  function initActionButtons() {
    Object.keys(CONFIG.heads).forEach((headKey) => {
      const key = headKey.toLowerCase();
      const headData = CONFIG.heads[headKey];
      if (!headData) return;

      const copyBtn = document.getElementById(`copy-btn-${key}`);
      const mentionBtn = document.getElementById(`mention-btn-${key}`);
      const id = headData.discordId;
      const name = headData.name || key;

      if (copyBtn) {
        copyBtn.addEventListener("click", () => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(id).then(() => {
              showToast(`Copied ${name}'s Discord ID (${id})`);
            }).catch(() => {
              showToast(`ID: ${id}`);
            });
          } else {
            showToast(`ID: ${id}`);
          }
        });
      }

      if (mentionBtn) {
        mentionBtn.addEventListener("click", () => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(`<@${id}>`).then(() => {
              showToast(`Copied mention <@${id}>`);
            }).catch(() => {
              showToast(`Mention: <@${id}>`);
            });
          } else {
            showToast(`Mention: <@${id}>`);
          }
        });
      }
    });
  }

  /* ============================================================
     9) SPLASH ENTER INTERACTION
  ============================================================ */
  function initSplashEnter() {
    const intro = document.getElementById("intro");
    if (!intro) return;

    let entered = false;
    function doEnter() {
      if (entered) return;
      entered = true;
      intro.classList.add("exit");

      // Start audio smoothly
      if (audio) {
        audio.volume = 0.85;
        audio
          .play()
          .then(() => updatePlayState(true))
          .catch(() => updatePlayState(false));
      }

      setTimeout(() => {
        if (intro.parentNode) intro.parentNode.removeChild(intro);
      }, 1000);
    }

    intro.addEventListener("click", doEnter);
    intro.addEventListener("touchend", (e) => {
      e.preventDefault();
      doEnter();
    }, { passive: false });

    document.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") doEnter();
    });
  }

  /* ============================================================
     10) SMOOTH NAVIGATION JUMP SCROLL & OBSERVER
  ============================================================ */
  function initNavLinks() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-scroll");
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Update active nav link on scroll
    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY + 140;
      document.querySelectorAll(".page-section").forEach((section) => {
        const id = section.getAttribute("id");
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          document.querySelectorAll(".nav-link").forEach((l) => {
            l.classList.toggle("active", l.getAttribute("data-scroll") === id);
          });
        }
      });
    });
  }

  /* ============================================================
     11) MOBILE TOUCH POPUPS
  ============================================================ */
  function initMobileTouch() {
    let expandedSlot = null;
    document.querySelectorAll(".clan-slot").forEach((slot) => {
      slot.addEventListener("touchend", (e) => {
        if (slot._touchMoved) return;
        e.stopPropagation();

        if (expandedSlot && expandedSlot !== slot) {
          expandedSlot.classList.remove("mobile-expanded");
        }
        slot.classList.toggle("mobile-expanded");
        expandedSlot = slot.classList.contains("mobile-expanded") ? slot : null;
      });

      slot.addEventListener("touchstart", () => { slot._touchMoved = false; }, { passive: true });
      slot.addEventListener("touchmove", () => { slot._touchMoved = true; }, { passive: true });
    });

    document.addEventListener("touchend", (e) => {
      if (expandedSlot && !e.target.closest(".clan-slot")) {
        expandedSlot.classList.remove("mobile-expanded");
        expandedSlot = null;
      }
    });
  }

  /* ============================================================
     BOOTSTRAP
  ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    renderClanGrids();
    initCustomCursor();
    initCanvasBackground();
    init3DCardTilt();
    initAudioControls();
    initActionButtons();
    initSplashEnter();
    initNavLinks();
    initMobileTouch();
    fetchLanyardREST();
    connectLanyardWS();
  });
})();
