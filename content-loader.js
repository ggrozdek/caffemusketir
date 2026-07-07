// Caffe Mušketir — naloži vsebino, ki jo admin ureja v nadzorni plošči,
// in jo vstavi v elemente z atributi data-cms / data-cms-href.
// Bere neposredno iz Firestore (javni REST dostop, brez prijave).
(function () {
  if (typeof musFirebaseReady !== "function" || !musFirebaseReady()) return;

  var url =
    "https://firestore.googleapis.com/v1/projects/" + firebaseConfig.projectId +
    "/databases/(default)/documents/content?pageSize=300&key=" + firebaseConfig.apiKey;

  // "data:" URL (slika/PDF shranjen v bazi) -> blob URL, da ga brskalnik lahko odpre
  function toBlobUrl(dataUrl) {
    try {
      var parts = dataUrl.split(",");
      var mime = (parts[0].match(/data:([^;]+)/) || [])[1] || "application/octet-stream";
      var bin = atob(parts[1]);
      var arr = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      return URL.createObjectURL(new Blob([arr], { type: mime }));
    } catch (e) {
      return dataUrl;
    }
  }

  fetch(url)
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !data.documents) return;
      var c = {};
      data.documents.forEach(function (d) {
        var key = d.name.split("/").pop();
        var f = d.fields && d.fields.value;
        if (f && typeof f.stringValue === "string" && f.stringValue) c[key] = f.stringValue;
      });

      document.querySelectorAll("[data-cms]").forEach(function (el) {
        var val = c[el.getAttribute("data-cms")];
        if (!val) return;
        if (el.tagName === "IMG") el.src = val;
        else el.textContent = val;
      });

      document.querySelectorAll("[data-cms-href]").forEach(function (el) {
        var val = c[el.getAttribute("data-cms-href")];
        if (!val) return;
        el.href = val.indexOf("data:") === 0 ? toBlobUrl(val) : val;
      });

      document.dispatchEvent(new Event("cms:loaded"));
    })
    .catch(function () {}); // če Firebase ni dosegljiv, ostane privzeta vsebina iz HTML
})();
