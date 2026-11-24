# AccessPath — LPU Campus Accessibility Prototype

This website is a polished, interactive implementation of the user's seven-screen CP5 paper wireframe for INT335 P12.

## Seven original CP5 screens represented
1. Welcome — Campus Access / Find accessible routes on campus
2. Home — Find Route, Report Issue, Accessibility Info
3. Select Location — Block A, Block B, Library, Cafeteria, Hostel
4. Select Destination — Academic Block, Library, Cafeteria, Physics Block, Computer Block
5. Accessible Routes — Route 1 (Ramp + Lift, ~5 min) and Route 2 (Stairs / Not Accessible, ~4 min) as shown in the paper wireframe
6. Route Details — Ramp, Lift and Stairs indicators
7. Report Issue — Issue type, location, add-photo concept and submit

## Important accuracy note
The route names, travel times and access indicators shown in the CP5 sketch are reproduced as prototype examples only. They are **not verified LPU route facts**. The report form saves locally in the browser and does not submit anything to LPU. The add-photo feature is represented as a concept in the wireframe; this static prototype does not upload images.

## Run locally
Open `index.html` in a browser, or run:
```bash
python3 -m http.server 5500
```
Then visit `http://localhost:5500`.

## Deploy on Vercel
1. Extract this ZIP.
2. Push the files to a GitHub repository.
3. Import the repository at https://vercel.com/new
4. Framework preset: Other.
5. Build command: blank.
6. Output directory: `.` (project root).
7. Deploy.

## Future work before real campus use
- Audit the real LPU routes and verify ramps, lift status, stairs, surfaces, entrances and travel times.
- Add a real photo-upload flow and secure backend only with consent and appropriate permissions.
- Build an authorised review workflow for campus staff if LPU approves it.
