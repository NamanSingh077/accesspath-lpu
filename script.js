const $ = (id) => document.getElementById(id);

// User-reported accessible walking routes from BH1. These have not been independently audited.
const knownRoutes = {
  "BH1|Engineering Block": {
    minutes: 5,
    title: "BH1 → Engineering Block",
    notes: ["Accessible walking route · 5 minutes (student-reported)", "Lift reported in each block; operating status not independently checked."],
    status: "USER-REPORTED ROUTE"
  },
  "BH1|Block 36": {
    minutes: 7,
    title: "BH1 → Block 36",
    notes: ["Accessible walking route · 7 minutes (student-reported)", "Lift reported in each block.", "Blocks 36, 37 and 38 are interconnected on the 5th floor (student-reported)."],
    status: "USER-REPORTED ROUTE"
  },
  "BH1|Block 37": {
    minutes: 7,
    title: "BH1 → Block 37",
    notes: ["Accessible walking route · 7 minutes (student-reported)", "Lift reported in each block.", "Blocks 36, 37 and 38 are interconnected on the 5th floor (student-reported)."],
    status: "USER-REPORTED ROUTE"
  },
  "BH1|Block 38": {
    minutes: 7,
    title: "BH1 → Block 38",
    notes: ["Accessible walking route · 7 minutes (student-reported)", "Lift reported in each block.", "Blocks 36, 37 and 38 are interconnected on the 5th floor (student-reported)."],
    status: "USER-REPORTED ROUTE"
  }
};

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

  const route = knownRoutes[`${from}|${to}`];
  const preferences = [];
  if (avoidStairs) preferences.push("avoid stairs");
  if (preferRamps) preferences.push("prefer ramps");
  const preferenceText = preferences.length ? ` Your preferences (${preferences.join("; ")}) are noted, but this route has not been independently audited against them.` : "";

  if (route) {
    const notes = route.notes.map(note => `<span>${note}</span>`).join("");
    $("routeList").innerHTML = `
      <article class="route-card selected">
        <div class="route-card-top"><span class="route-badge">${route.status}</span><span class="route-time">~${route.minutes} min</span></div>
        <h4>${route.title}</h4>
        <p>${route.notes.join(" ")}</p>
        <div class="route-tags">${notes}</div>
        <p class="tiny-disclaimer">Source: information provided by a student for this project. Travel time, route continuity and lift operation have not been independently verified. Confirm conditions before relying on this route.</p>
      </article>`;
    return;
  }

  $("routeList").innerHTML = `
    <article class="route-card selected">
      <div class="route-card-top"><span class="route-badge">ROUTE AUDIT REQUIRED</span><span class="route-time">Not measured</span></div>
      <h4>${from} → ${to}</h4>
      <p>This destination pair does not yet have a recorded route. An on-site audit must confirm the continuous path, ramps, kerbs, steps, lift availability, surface condition and walking time.</p>
      <div class="route-tags"><span>No verified route</span><span>Audit required</span></div>
    </article>
    <div class="empty-state"><b>Help complete this route.</b><p>${preferenceText} Use “Report a barrier” to record a specific issue you observe. Do not rely on this prototype for navigation.</p></div>`;
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
