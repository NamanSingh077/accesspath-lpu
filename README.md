# AccessPath — LPU Campus Accessibility Prototype

Independent student prototype for INT335 P12.

## Student-reported accessible routes from BH1
The route finder contains the following information provided by the project user:

| From | To | Accessible walking time | Notes |
|---|---|---:|---|
| BH1 | Engineering Block | About 5 minutes | Lift reported in each block |
| BH1 | Block 36 | About 7 minutes | Lift reported in each block |
| BH1 | Block 37 | About 7 minutes | Lift reported in each block |
| BH1 | Block 38 | About 7 minutes | Lift reported in each block |

The user also reported that Blocks 36, 37 and 38 are interconnected on the 5th floor. These are student-provided details and have not been independently audited. Lift presence does not confirm that a lift is currently operational or available to all users.

## Hostel directory
The route-finder selectors include BH1–BH8 and GH1–GH7 as provisional directory labels. Exact names, entrances, building coordinates and routes should be confirmed against current campus maps or university records.

## Other campus destinations
The directory retains Main Gate, Admission Block, Academic Blocks 25–38, Engineering Block, Blocks 36–38, The Chancellory (Building 30), Administration-1 (Building 29), Library, Shanti Devi Mittal Auditorium, Uni-Hospital, Uni-Mall, Unipolis, Student Centre, Innovation Studio, Google Lab, I-MAC Lab, Lecture Theatre, Indoor Sports Stadium and cafeteria/food kiosks.

## Accuracy and safety
- This is an independent student prototype, not an official LPU service.
- BH1 route times and building/lift notes are user-reported, not independently verified.
- The 5th-floor connection between Blocks 36, 37 and 38 is user-reported.
- Lift operating status, exact route geometry, ramp continuity, surface conditions and live obstructions are not verified.
- All other destination pairs require an on-site audit. Do not rely on this prototype as a sole navigation or safety aid.
- Reports are stored only in the current browser and are not sent to LPU.

## Deploy
1. Extract the ZIP.
2. Upload/replace `index.html`, `styles.css`, `script.js`, and `README.md` in the existing GitHub repository.
3. Commit the update. Vercel should redeploy from the connected repository automatically.


## Reverse-direction display
If a user selects the reverse of a recorded BH1 route (for example, Block 36 → BH1), the site displays the recorded route time as a reverse-direction estimate and clearly asks users to confirm that the same path and time apply.


## Prototype route coverage
The route finder returns a prototype suggestion for every distinct pair in the place directory. For pairs without student-provided route information, the displayed time is an illustrative deterministic demo estimate, not a measured campus time or verified accessible path. Student-provided BH1 route details remain separately identified.
