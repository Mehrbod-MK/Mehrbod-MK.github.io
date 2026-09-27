/* ============================================================
   script.js — Personal site logic
   All customisation lives in the CONFIG object below.
   ============================================================ */

const CONFIG = {
  username: "Mehrbod-MK",           // ← your GitHub username
  email: "mehrbodmollakazemi81@gmail.com",            // ← shown in the Contact button
  location: "Tehran, Iran",
  role: "C#/.NET/C++ Developer",
  typedRoles: [
    "C# Developer",
    ".NET Core Developer",
    "Problem solver",
    "Game designer",
	"Pianist",
  ],

  // Languages used for the "Languages I use" chips.
  languages: ["C#", "C", "C++", "Kotlin", "HTML", "CSS", "JavaScript", "Git", "DirectX", "MS Office", "Adobe Photoshop", "Game Designing"],

  // Optional: pin specific repos by name so they always show first.
  pinnedRepos: ["TLSFL", "FacteSimchin"],

  // Optional: cap how many repo cards are rendered (null = show all).
  maxProjects: 12,

  // Edit freely — these are your achievement cards.
  achievements: [
    {
      emoji: "🏆",
      title: "1st place in Kharazmi Youth Festival (1st time)",
      year: "2016",
      description: "Gained 1st place in Kharazmi Youth Festival (Hardware & Software Enginnering for students)",
      link: "https://www.shabestan.news/news/593223/%DB%B2%DB%B1-%D8%AF%D8%A7%D9%86%D8%B4-%D8%A2%D9%85%D9%88%D8%B2-%D9%BE%DA%98%D9%88%D9%87%D9%86%D8%AF%D9%87-%D8%A8%D8%B1%D8%AA%D8%B1-%D8%AA%D8%AC%D9%84%DB%8C%D9%84-%D8%B4%D8%AF%D9%86%D8%AF",
    },
    {
      emoji: "🎖",
      title: "1st place in Kharazmi Youth Festival (2nd time)",
      year: "2018",
      description: "Gained 1st place in Kharazmi Youth Festival (Hardware & Software Enginnering for students)",
      link: "https://www.aparat.com/v/i203c02",
    },
	{
      emoji: "👾️",
      title: "Android Game Development",
      year: "2025",
      description: "Developed my first Android game using Kotlin.",
      link: "https://cafebazaar.ir/app/com.mehrbodmk.factesimchin",
    },
    {
      emoji: "🎮️",
      title: "Game Development",
      year: "2026",
      description: "Developed my first game (after so many attempts) using Tomb Raider Next Generation (TRNG) engine.",
      link: "https://trcustoms.org/levels/3929",
    },
  ],
};

/* ============================================================
   Small helpers
   ============================================================ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setAttr(id, name, value) {
  const el = document.getElementById(id);
  if (el && value) el.setAttribute(name, value);
}

/* ============================================================
   Theme toggle (dark ↔ light), remembered in localStorage
   ============================================================ */
(function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const theme = saved || (prefersLight ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeIcon(theme);

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon(next);
  });
})();

function updateThemeIcon(theme) {
  const icon = $("#theme-icon");
  if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

/* ============================================================
   Mobile navigation
   ============================================================ */
(function initMobileNav() {
  const burger = $("#hamburger");
  const links = $("#nav-links");
  if (!burger || !links) return;

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.classList.toggle("active", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  // Close the menu after tapping a link
  $$("#nav-links a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      burger.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    })
  );
})();

/* ============================================================
   Typewriter effect for the hero role line
   ============================================================ */
(function initTypewriter() {
  const el = $("#typed-text");
  if (!el) return;

  const words = CONFIG.typedRoles;
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIndex];
    charIndex += deleting ? -1 : 1;
    el.textContent = word.slice(0, charIndex);

    let delay = deleting ? 45 : 90;
    if (!deleting && charIndex === word.length) {
      delay = 1600;               // pause when a word is complete
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  }
  tick();
})();

/* ============================================================
   Scroll: progress bar + navbar shadow + reveal animations
   ============================================================ */
(function initScrollEffects() {
  const navbar = $("#navbar");

  const bar = document.createElement("div");
  bar.id = "scroll-progress";
  document.body.prepend(bar);

  function onScroll() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
    navbar?.classList.toggle("scrolled", scrollTop > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => observer.observe(el));
})();

/* ============================================================
   Footer year + config-driven links
   ============================================================ */
(function initStaticBits() {
  setText("year", String(new Date().getFullYear()));

  const gh = `https://github.com/${CONFIG.username}`;
  setAttr("hero-github-link", "href", gh);
  setAttr("contact-email", "href", `mailto:${CONFIG.email}`);
  const emailText = $("#contact-email");
  if (emailText && CONFIG.email) {
    emailText.append(` — ${CONFIG.email}`);
  }
})();

/* ============================================================
   Skills chips (rendered from CONFIG.languages)
   ============================================================ */
(function renderSkills() {
  const grid = $("#skills-grid");
  if (!grid) return;

  grid.innerHTML = CONFIG.languages
    .map(
      (lang) => `
      <div class="skill-chip">
        <img src="https://cdn.simpleicons.org/${encodeURIComponent(lang.toLowerCase().replace(/\s+/g, ""))}/6c8cff"
             alt="" loading="lazy" onerror="this.style.display='none'" />
        <span class="skill-name">${lang}</span>
      </div>`
    )
    .join("");
})();

/* ============================================================
   Achievements (rendered from CONFIG.achievements)
   ============================================================ */
(function renderAchievements() {
  const grid = $("#achievements-grid");
  if (!grid) return;

  grid.innerHTML = CONFIG.achievements
    .map(
      (a) => `
      <article class="achievement-card">
        <div class="achievement-emoji" aria-hidden="true">${a.emoji}</div>
        <h3>${a.title}</h3>
        <span class="achievement-year">${a.year}</span>
        <p>${a.description}</p>
        ${a.link ? `<a href="${a.link}" target="_blank" rel="noopener noreferrer">View →</a>` : ""}
      </article>`
    )
    .join("");
})();

/* ============================================================
   GitHub API
   Docs: https://docs.github.com/rest  (60 req/hr unauthenticated)
   ============================================================ */
const GH_API = "https://api.github.com";
const USERNAME = CONFIG.username;

function ghFetch(path) {
  return fetch(`${GH_API}${path}`).then((res) => {
    if (!res.ok) {
      const err = new Error(`GitHub API ${res.status}`);
      err.status = res.status;
      throw err;
    }
    return res.json();
  });
}

function formatNumber(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function showError(message) {
  const grid = $("#projects-grid");
  if (!grid) return;
  grid.innerHTML = `
    <div class="error-card">
      <p>⚠️ ${message}</p>
      <p><a href="https://github.com/${USERNAME}" target="_blank" rel="noopener noreferrer">
        View my profile on GitHub instead →</a></p>
    </div>`;
}

/* ------------------------------------------------------------
   Load profile + repos, then render stats, cards and language bar
   ------------------------------------------------------------ */
async function loadGitHubData() {
  try {
    const [profile, repos] = await Promise.all([
      ghFetch(`/users/${USERNAME}`),
      ghFetch(`/users/${USERNAME}/repos?per_page=100&sort=updated`),
    ]);

    renderHeroStats(profile, repos);
    renderLanguageBar(repos);

    let projects = repos
      .filter((r) => !r.fork || r.stargazers_count > 0) // keep forks only if starred
      .sort((a, b) => {
        const pa = CONFIG.pinnedRepos.indexOf(a.name);
        const pb = CONFIG.pinnedRepos.indexOf(b.name);
        if (pa !== -1 || pb !== -1) {
          return (pa === -1 ? 999 : pa) - (pb === -1 ? 999 : pb);
        }
        return b.stargazers_count - a.stargazers_count;
      });

    if (CONFIG.maxProjects) projects = projects.slice(0, CONFIG.maxProjects);

    renderProjects(projects);
  } catch (err) {
    console.error(err);
    if (err.status === 404) {
      showError(`GitHub user "<strong>${USERNAME}</strong>" was not found. Check the username in js/script.js.`);
    } else if (err.status === 403) {
      showError("GitHub API rate limit reached. This resets hourly — try again later.");
    } else {
      showError("Could not load projects from GitHub. Are you online?");
    }
  }
}

function renderHeroStats(profile, repos) {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  setText("stat-repos", formatNumber(profile.public_repos));
  setText("stat-followers", formatNumber(profile.followers));
  setText("stat-stars", formatNumber(totalStars));
  setText("stat-forks", formatNumber(totalForks));
}

function renderLanguageBar(repos) {
  const counts = {};
  repos.forEach((r) => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  });

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const total = entries.reduce((sum, [, n]) => sum + n, 0) || 1;

  const bar = $("#lang-bar");
  const legend = $("#lang-legend");
  if (!bar || !legend) return;

  bar.innerHTML = entries
    .map(([lang, n]) => {
      const pct = (n / total) * 100;
      return `<span style="width:${pct}%; background:${languageColor(lang)}" title="${lang}: ${pct.toFixed(0)}%"></span>`;
    })
    .join("");

  legend.innerHTML = entries
    .map(([lang, n]) => {
      const pct = Math.round((n / total) * 100);
      return `<span><span class="swatch" style="background:${languageColor(lang)}"></span>${lang} ${pct}%</span>`;
    })
    .join("");
}

/* Rough GitHub-ish colors; extend as you like */
const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Shell: "#89e051",
  Vue: "#41b883",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Dart: "#00B4AB",
  default: "#8b949e",
};
function languageColor(lang) {
  return LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.default;
}

function renderProjects(projects) {
  const grid = $("#projects-grid");
  if (!grid) return;
  grid.innerHTML = "";

  if (projects.length === 0) {
    grid.innerHTML = `<div class="error-card"><p>No public repositories found yet — push your first repo and it will appear here automatically!</p></div>`;
    return;
  }

  const allLangs = [...new Set(projects.flatMap((p) => p.topics || []).concat(projects.map((p) => p.language).filter(Boolean)))];

  projects.forEach((repo) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.languages = [repo.language, ...(repo.topics || [])].filter(Boolean).join(",");

    const langsHtml = [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 4).map(
      (l) => `<span class="lang-tag">${l}</span>`
    ).join("");

    card.innerHTML = `
      <h3>
        <a class="project-title-link" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          ${repo.name}
        </a>
        ${repo.homepage ? `
          <a class="project-homepage-link" href="${repo.homepage}" target="_blank" rel="noopener noreferrer"
             title="Live demo" aria-label="Live demo of ${repo.name}">↗</a>` : ""}
      </h3>
      <p class="project-desc">${repo.description || "No description provided."}</p>
      <div class="project-meta">
        ${repo.language ? `<span><span class="lang-dot" style="background:${languageColor(repo.language)}"></span>${repo.language}</span>` : ""}
        <span title="Stars">⭐ ${formatNumber(repo.stargazers_count)}</span>
        <span title="Forks">⑂ ${formatNumber(repo.forks_count)}</span>
      </div>
      ${langsHtml ? `<div class="project-langs">${langsHtml}</div>` : ""}
      <div class="project-footer">
        <span class="project-updated">Updated ${new Date(repo.updated_at).toLocaleDateString(undefined, { year: "numeric", month: "short" })}</span>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
      </div>`;
    grid.appendChild(card);
  });

  renderFilters(allLangs);
}

/* ------------------------------------------------------------
   Language filter bar
   ------------------------------------------------------------ */
function renderFilters(languages) {
  const bar = $("#filter-bar");
  const grid = $("#projects-grid");
  if (!bar || !grid) return;

  const top = languages.filter(Boolean).slice(0, 8);
  if (top.length === 0) return;

  const buttons = ["All", ...top];
  bar.innerHTML = buttons
    .map((lang, i) => `<button class="filter-btn ${i === 0 ? "active" : ""}" data-lang="${lang}">${lang}</button>`)
    .join("");

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    $$(".filter-btn", bar).forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const lang = btn.dataset.lang;
    $$(".project-card", grid).forEach((card) => {
      const matches = lang === "All" || card.dataset.languages.split(",").includes(lang);
      card.style.display = matches ? "" : "none";
    });
  });
}

/* Kick off the GitHub loads */
loadGitHubData();
