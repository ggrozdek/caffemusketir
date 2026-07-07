// Caffe Mušketir — interactions
(function () {
  // scroll reveal
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // gallery carousel
  const rail = document.querySelector(".gallery-rail");
  const prev = document.querySelector(".gallery-nav .prev");
  const next = document.querySelector(".gallery-nav .next");
  if (rail && prev && next) {
    const step = () => Math.min(rail.clientWidth * 0.8, 460);
    prev.addEventListener("click", () => rail.scrollBy({ left: -step(), behavior: "smooth" }));
    next.addEventListener("click", () => rail.scrollBy({ left: step(), behavior: "smooth" }));
    const sync = () => {
      prev.disabled = rail.scrollLeft <= 4;
      next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    };
    rail.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  // today highlighting in hours
  const days = document.querySelectorAll(".hours-list li");
  if (days.length) {
    // 0 = sunday in JS; mapping to our list: 0=pon,1=tor,2=sre,3=cet,4=pet,5=sob,6=ned
    const jsDay = new Date().getDay(); // 0=ned ... 6=sob
    const idx = jsDay === 0 ? 6 : jsDay - 1;
    if (days[idx]) days[idx].classList.add("today");
  }

  // open status — ure prebere iz prikazanega seznama (.hours-list), da veljajo
  // tudi spremembe, ki jih admin naredi v nadzorni plošči
  function updateOpenStatus() {
    const openEl = document.querySelector(".now-open");
    const times = document.querySelectorAll(".hours-list li .time");
    if (!openEl || times.length < 7) return;
    const parse = (txt) => {
      const m = String(txt).match(/(\d{1,2})[:.](\d{2})\s*[–\-—]\s*(\d{1,2})[:.](\d{2})/);
      if (!m) return null;
      const start = Number(m[1]) + Number(m[2]) / 60;
      let end = Number(m[3]) + Number(m[4]) / 60;
      if (end <= start) end = 24; // "do 00:00" pomeni do polnoči
      return [start, end, m[3].padStart(2, "0") + ":" + m[4]];
    };
    const now = new Date();
    const h = now.getHours() + now.getMinutes() / 60;
    const jsDay = now.getDay();
    const idx = jsDay === 0 ? 6 : jsDay - 1;
    const parsed = parse(times[idx].textContent);
    if (!parsed) return;
    const [o, c, closeLabel] = parsed;
    const open = h >= o && h < c;
    openEl.textContent = "";
    openEl.style.background = "";
    openEl.style.color = "";
    const dot = document.createElement("span");
    dot.className = "dot";
    const label = document.createElement("span");
    if (open) {
      label.textContent = `Trenutno odprto · do ${closeLabel}`;
    } else {
      openEl.style.background = "rgba(192,35,27,.08)";
      openEl.style.color = "#a01910";
      dot.style.background = "#a01910";
      label.textContent = "Trenutno zaprto";
    }
    openEl.appendChild(dot);
    openEl.appendChild(label);
  }
  updateOpenStatus();
  document.addEventListener("cms:loaded", updateOpenStatus);

  // hero parallax
  const heroLogo = document.querySelector(".hero-logo");
  if (heroLogo) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < 800) {
        heroLogo.style.transform = `translateY(${y * 0.18}px) scale(${1 - y * 0.0003})`;
        heroLogo.style.opacity = String(Math.max(0, 1 - y / 600));
      }
    }, { passive: true });
  }
})();
