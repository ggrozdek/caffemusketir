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

  // open status
  const openEl = document.querySelector(".now-open");
  if (openEl) {
    const now = new Date();
    const h = now.getHours() + now.getMinutes() / 60;
    const jsDay = now.getDay();
    const hours = [
      [7, 23], // pon
      [7, 23], // tor
      [7, 23], // sre
      [7, 23], // cet
      [7, 24], // pet (do 00:00)
      [8, 24], // sob (do 00:00)
      [8, 22], // ned
    ];
    const idx = jsDay === 0 ? 6 : jsDay - 1;
    const [o, c] = hours[idx];
    const open = h >= o && h < c;
    openEl.textContent = "";
    const dot = document.createElement("span");
    dot.className = "dot";
    const label = document.createElement("span");
    if (open) {
      const closeHour = c === 24 ? "00:00" : `${c}:00`;
      label.textContent = `Trenutno odprto · do ${closeHour}`;
    } else {
      openEl.style.background = "rgba(192,35,27,.08)";
      openEl.style.color = "#a01910";
      dot.style.background = "#a01910";
      label.textContent = "Trenutno zaprto";
    }
    openEl.appendChild(dot);
    openEl.appendChild(label);
  }

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
