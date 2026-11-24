const $ = (id) => document.getElementById(id);

const routeCatalog = [
  { from: "Hostel", to: "Academic Block", title: "Hostel → Academic Block", detail: "LPU campus journey example. Ramp continuity, kerbs, steps and entrances still need an on-site audit.", tags: ["Route audit needed", "Unverified"], minutes: "Not measured", stairs: false, ramp: true },
  { from: "Hostel", to: "Central Library", title: "Hostel → Central Library", detail: "Example destination pair. No internal accessible path has been verified in this prototype.", tags: ["Route audit needed", "Unverified"], minutes: "Not measured", stairs: false, ramp: false },
  { from: "Academic Block", to: "Uni-Mall", title: "Academic Block → Uni-Mall", detail: "Example campus journey. Check crossing points, surface condition and step-free access in person.", tags: ["Route audit needed", "Unverified"], minutes: "Not measured", stairs: false, ramp: false },
  { from: "Hostel", to: "Uni-Hospital", title: "Hostel → Uni-Hospital", detail: "Example journey to a published LPU facility. Internal route and entrance accessibility are not verified.", tags: ["Route audit needed", "Unverified"], minutes: "Not measured", stairs: false, ramp: false },
  { from: "Central Library", to: "Sports Complex", title: "Central Library → Sports Complex", detail: "Example destination pair. Audit route continuity, gradients, kerbs and any access restrictions.", tags: ["Route audit needed", "Unverified"], minutes: "Not measured", stairs: false, ramp: false },
  { from: "Main Gate", to: "Academic Block", title: "Main Gate → Academic Block", detail: "Example arrival journey. The internal campus route must be surveyed before directions are published.", tags: ["Route audit needed", "Unverified"], minutes: "Not measured", stairs: false, ramp: false }
];

function renderRoutes() {
  const from = $("start").value;
  const to = $("destination").value;
  const avoidStairs = $("avoidStairs").checked;
  const preferRamps = $("preferRamps").checked;
  $("resultsTitle").textContent = `${from} → ${to}`;

  if (from === to) {
    $("routeList").innerHTML = `<div class="empty-state"><b>Choose two different places.</b><p>Your starting point and destination are the same.</p></div>`;
    return;
  }

  let candidates = routeCatalog.filter(r => r.from === from && r.to === to);
  if (!candidates.length) {
    candidates = [
      {title:"LPU campus route placeholder",detail:"No audited internal route data exists for this LPU destination pair yet. Complete a campus route survey before publishing directions.",tags:["No verified data","Audit needed"],minutes:"—",stairs:false,ramp:false},
      {title:"Alternative route placeholder",detail:"A second option can be added after an on-site audit. Do not use this as directions.",tags:["Awaiting audit","Unverified"],minutes:"—",stairs:false,ramp:false}
    ];
  }
  if (avoidStairs) candidates = candidates.filter(r => !r.stairs);
  if (preferRamps) candidates.sort((a,b) => Number(b.ramp)-Number(a.ramp));
  if (!candidates.length) {
    $("routeList").innerHTML = `<div class="empty-state"><b>No matching demo route.</b><p>Try changing your preferences. Real route data must be audited before use.</p></div>`;
    return;
  }
  $("routeList").innerHTML = candidates.slice(0,2).map((r,i)=>`
    <article class="route-card ${i===0?'selected':''}">
      <div class="route-card-top"><span class="route-badge">OPTION 0${i+1}</span><span class="route-time">${r.minutes}</span></div>
      <h4>${r.title}</h4><p>${r.detail}</p>
      <div class="route-tags">${r.tags.map(t=>`<span>${t}</span>`).join("")}</div>
    </article>`).join("");
}

$("findRoute").addEventListener("click", renderRoutes);
$("start").addEventListener("change", renderRoutes);
$("destination").addEventListener("change", renderRoutes);
$("avoidStairs").addEventListener("change", renderRoutes);
$("preferRamps").addEventListener("change", renderRoutes);

$("barrierForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const report = {
    id: `DEMO-${Date.now().toString().slice(-6)}`,
    type: $("barrierType").value,
    location: $("barrierLocation").value.trim(),
    details: $("barrierDetails").value.trim(),
    createdAt: new Date().toISOString()
  };
  const reports = JSON.parse(localStorage.getItem("accesspath-demo-reports") || "[]");
  reports.push(report);
  localStorage.setItem("accesspath-demo-reports", JSON.stringify(reports));
  $("formMessage").textContent = `Demo report ${report.id} saved on this device. It has not been sent to LPU.`;
  $("barrierForm").reset();
});

const menuToggle = $("menuToggle");
const navLinks = $("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
