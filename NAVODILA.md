# Caffe Mušketir — navodila (Firebase verzija)

Stran je **statična** (samo HTML/CSS/JS) — gostiš jo lahko zastonj kjer koli
(GitHub Pages, Netlify, Cloudflare Pages …). Prijava delavk, urniki in urejanje
vsebine pa tečejo prek **Firebase** (Googlov zastonjski paket "Spark").

---

## 1. Nastavitev Firebase (enkratno, ~10 minut)

### a) Ustvari projekt
1. Pojdi na **https://console.firebase.google.com** in se prijavi z Google računom.
2. Klikni **Create a project** (npr. ime `musketir`). Google Analytics lahko izklopiš.

### b) Vklopi prijavo z e-pošto in geslom
1. V meniju levo: **Build → Authentication → Get started**.
2. Zavihek **Sign-in method** → klikni **Email/Password** → **Enable** → Save.

### c) Ustvari admin račun
1. Authentication → zavihek **Users** → **Add user**.
2. E-naslov: **`caffemusketir@gmail.com`**, geslo: izberi svoje močno geslo.

> Če želiš drug admin e-naslov, ga spremeni v `firebase-config.js` (ADMIN_EMAIL)
> **in** v `firestore.rules` (vrstica z `caffemusketir@gmail.com`).

### d) Ustvari bazo Firestore
1. **Build → Firestore Database → Create database**.
2. Lokacija: izberi **eur3 (Europe)**. Način: **Production mode**.

### e) Prilepi varnostna pravila
1. Firestore Database → zavihek **Rules**.
2. Odpri datoteko **`firestore.rules`** (v tej mapi), skopiraj CELO vsebino,
   jo prilepi namesto obstoječih pravil in klikni **Publish**.

### f) Poveži stran s projektom
1. Klikni zobnik ⚙ (levo zgoraj) → **Project settings** → zavihek **General**.
2. Spodaj pri **Your apps** klikni ikono **`</>`** (Web), poimenuj app (npr. `stran`),
   Hosting NI potreben → **Register app**.
3. Pokaže se `const firebaseConfig = { apiKey: "...", ... }` —
   te vrednosti prepiši v datoteko **`firebase-config.js`** (v tej mapi).

To je vse — stran je pripravljena. 🎉

---

## 2. Kako deluje

- **Prijava:** `/prijava.html` (povezava je tudi v nogi strani: »Prijava za zaposlene«).
  Ti se prijaviš z imenom `admin` in svojim geslom; delavke s svojim uporabniškim imenom.
- Po prijavi se v meniju pokaže rdeča povezava: delavkam **ZAPOSLENI**, tebi **ADMIN**.
- **Oddaja želja** se samodejno odpre vsako **soboto** (do konca nedelje)
  za naslednji teden. Delavka klikne dneve in izmene (**DOP**/**POP**), ki bi jih želela delati.
  To so samo **želje** — končni urnik sestaviš ti.
- Delavka s statusom **REDNA** mora izbrati vsaj **5 izmen** — sicer sistem ne pusti shraniti.
- Ko urnik **potrdiš**, vsaka delavka na svojem profilu vidi **samo svoje** potrjene izmene
  (ne vidi, kdaj delajo druge).

## 3. Admin nadzorna plošča (`admin.html`)

- **Urnik** — zgoraj tabela **želja** (kdo si je kaj želel, ★ = redna, spodaj seštevki),
  pod njo pa **Pravi urnik**:
  1. Klikni **Generiraj urnik** — termini z natanko eno željo se izpolnijo sami,
     ostali ostanejo rdeči.
  2. Klikni katerokoli polje in izberi delavko (pri vsaki piše, ali si je termin želela).
     Lahko spremeniš tudi že izpolnjena polja — zadnja beseda je vedno tvoja.
  3. **Prenesi kot sliko** — urnik se shrani kot PNG slika (npr. za tiskanje ali objavo).
  4. **POTRDI URNIK** — šele takrat delavke vidijo svoje izmene na profilih.
     Če urnik po potrditvi spremeniš, ga moraš potrditi znova.
- **Delavke** — dodajanje, urejanje (ime, status REDNA) in odstranjevanje.
- **Vsebina strani** — teksti in slike za: Aktualno, Cenik (tudi PDF), Novosti,
  Lokal, Prostor zadaj, Delovni čas. Slike se samodejno pomanjšajo; PDF naj bo
  manjši od ~0,5 MB (pomanjšaš ga npr. na ilovepdf.com → Compress PDF).
- **Nastavitve** — ročno odpiranje/zapiranje prijav in menjava admin gesla.

## 4. Pozabljena gesla in brisanje

Firebase iz varnostnih razlogov ne dovoli, da bi admin kar iz strani menjal gesla delavk:

- **Delavka pozabi geslo:** v admin plošči jo Odstrani, nato v Firebase konzoli
  (Authentication → Users) izbriši njen račun in jo v admin plošči dodaj znova z novim geslom.
- **Ti pozabiš admin geslo:** ker je admin račun prava Gmail pošta (`caffemusketir@gmail.com`),
  lahko v Firebase konzoli (Authentication → Users → ⋮ ob uporabniku) klikneš »Reset password«
  in dobiš povezavo za ponastavitev na e-pošto. Lahko pa uporabnika tudi izbrišeš
  in ga dodaš znova z novim geslom.

## 5. Objava strani na spletu

Celo mapo (brez map `data` in `.claude`) naloži na katero koli statično gostovanje, npr.:

- **Netlify** (najlažje): https://app.netlify.com → "Deploy manually" → povleci mapo v okno.
- **GitHub Pages**: naloži v repozitorij in vklopi Pages.

Za pogled na svojem računalniku lahko še vedno zaženeš `node server.js`
(strežnik iz prejšnje verzije samo streže datoteke; podatki so zdaj v Firebase).

## 6. Omejitve zastonjskega paketa (Spark)

Za lokal več kot dovolj: 50.000 branj in 20.000 pisanj v bazo na dan.
Slike, ki jih naložiš prek admin plošče, se stisnjene shranijo v bazo
(Firebase Storage je za nove projekte plačljiv, zato se mu izognemo).
