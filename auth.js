// Caffe Mušketir — po prijavi doda rdečo povezavo ZAPOSLENI / ADMIN v meni.
// Vloga se shrani v localStorage ob prijavi (prijava.html) in pobriše ob odjavi.
(function () {
  var role;
  try { role = localStorage.getItem("mus_role"); } catch (e) { return; }
  if (role !== "admin" && role !== "worker") return;
  var nav = document.querySelector(".nav-links");
  if (!nav) return;
  var a = document.createElement("a");
  if (role === "admin") {
    a.href = "admin.html";
    a.textContent = "ADMIN";
  } else {
    a.href = "zaposleni.html";
    a.textContent = "ZAPOSLENI";
  }
  a.style.color = "var(--red, #e63329)";
  a.style.fontWeight = "800";
  a.style.letterSpacing = "0.05em";
  nav.appendChild(a);
})();
