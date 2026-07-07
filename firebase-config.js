// ============================================================
//  Caffe Mušketir — Firebase nastavitve
//
//  SEM PRILEPI nastavitve svojega Firebase projekta!
//  (Firebase console → Project settings → General → Your apps
//   → Web app → SDK setup and configuration → Config)
//
//  Navodila po korakih: glej NAVODILA.md
// ============================================================

var firebaseConfig = {
  apiKey: "AIzaSyBV5NfndZ7qvkG4HwDcDdkgcMh3_BzpoG8",
  authDomain: "musketir-7044d.firebaseapp.com",
  projectId: "musketir-7044d",
  storageBucket: "musketir-7044d.firebasestorage.app",
  messagingSenderId: "104011628149",
  appId: "1:104011628149:web:1a780b1aac4737b13c023c"
};

// E-naslov admin računa (ustvariš ga v Firebase konzoli → Authentication).
// Če ga spremeniš, ga spremeni tudi v datoteki firestore.rules!
var ADMIN_EMAIL = "caffemusketir@gmail.com";

// Delavke se prijavljajo z uporabniškim imenom; v ozadju se pretvori
// v navidezni e-naslov (domena ni prava, samo za Firebase).
var PSEUDO_DOMAIN = "musketir.app";

function musUsernameToEmail(username) {
  var u = String(username || "").trim().toLowerCase();
  if (u === "admin") return ADMIN_EMAIL;
  if (u.indexOf("@") !== -1) return u; // vpisan cel e-naslov (npr. admin)
  u = u
    .replace(/š/g, "s").replace(/ž/g, "z").replace(/č/g, "c").replace(/ć/g, "c").replace(/đ/g, "d")
    .replace(/[^a-z0-9._-]/g, "");
  return u ? u + "@" + PSEUDO_DOMAIN : "";
}

function musFirebaseReady() {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId);
}
