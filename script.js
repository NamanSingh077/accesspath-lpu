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

const places = Array.from(document.querySelectorAll('#start option')).map(option => option.value);

function estimateMinutes(from, to) {
  // A deterministic demo estimate for prototype coverage, not measured campus data.
  const a = places.indexOf(from);
  const b = places.indexOf(to);
  const gap = Math.abs(a - b);
  return Math.max(3, Math.min(18, 3 + (gap % 7) + Math.floor(gap / 8)));
}

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

  const directRoute = knownRoutes[`${from}|${to}`];
  const reverseRoute = knownRoutes[`${to}|${from}`];
  const isReverse = !directRoute && Boolean(reverseRoute);
  const route = directRoute || (reverseRoute ? {
    ...reverseRoute,
    title: `${from} → ${to}`,
    notes: [...reverseRoute.notes, "Reverse-direction prototype estimate; the reverse path and time should be confirmed."],
    status: "REVERSE-DIRECTION ESTIMATE"
  } : null);

  const minutes = route ? route.minutes : estimateMinutes(from, to);
  const preferences = [];
  if (avoidStairs) preferences.push("avoid stairs");
  if (preferRamps) preferences.push("prefer ramps");
  const preferenceLine = preferences.length
    ? `Preferences applied to this concept: ${preferences.join(" and ")}.`
    : "Standard prototype route suggestion.";

  if (route) {
    const tags = route.notes.map(note => `<span>${note}</span>`).join("");
    $("routeList").innerHTML = `
      <article class="route-card selected">
        <div class="route-card-top"><span class="route-badge">${route.status}</span><span class="route-time">~${minutes} min</span></div>
        <h4>${route.title}</h4>
        <p>${preferenceLine} This route uses the student-provided BH1 journey information.</p>
        <div class="route-tags">${tags}</div>
        <p class="tiny-disclaimer">Student-provided project information. Walking time and continuous step-free access have not been independently surveyed.</p>
      </article>`;
    return;
  }

  const liftNote = ["Engineering Block", "Block 36", "Block 37", "Block 38"].includes(to)
    ? "A lift has been reported in this destination block; current operation and access to it should be checked."
    : "Lift availability for these buildings has not been supplied, so no specific lift is assumed.";
  const connectionNote = ["Block 36", "Block 37", "Block 38"].includes(from) && ["Block 36", "Block 37", "Block 38"].includes(to)
    ? "Student-reported information says Blocks 36, 37 and 38 connect on the 5th floor; use of that connection depends on reaching the floor by lift."
    : "The suggested connection is a prototype concept and is not based on a surveyed internal path.";

  $("routeList").innerHTML = `
    <article class="route-card selected">
      <div class="route-card-top"><span class="route-badge">PROTOTYPE ROUTE SUGGESTION</span><span class="route-time">~${minutes} min</span></div>
      <h4>${from} → ${to}</h4>
      <p>${preferenceLine} This concept prioritises step-free movement and ramps where available.</p>
      <div class="route-tags"><span>${avoidStairs ? "Stair-avoiding concept" : "Standard concept"}</span><span>${preferRamps ? "Ramp preference" : "Accessible movement focus"}</span><span>Estimated time</span></div>
      <p class="tiny-disclaimer">Prototype estimate for demonstration only; not a measured campus walking time or verified accessible route. ${liftNote} ${connectionNote}</p>
    </article>`;
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
