# AccessPath — LPU Campus Accessibility Prototype

An independent INT335 P12 student prototype for accessible movement at Lovely Professional University, Phagwara.

## Updated LPU building and facility directory
The route selectors now include named LPU destinations: Main Gate, Admission Block, Academic Blocks 25–38, The Chancellory (Building 30), Administration-1 (Building 29), Library, Shanti Devi Mittal Auditorium, Hostels/Residences, Uni-Hospital, Uni-Mall (UniCentre), Baldev Raj Mittal Unipolis, Student Centre, Innovation Studio, Google Lab, I-MAC Lab, Lecture Theatre, Indoor Sports Stadium, and Cafeteria/Food Kiosks.

Sources used for names and campus context:
- User-provided campus map page: https://blog402.wordpress.com/lpu/campus-map/ (the page's text view identifies the Campus Map heading, but the map image/building labels are not extractable from the page text).
- LPU official infrastructure page: https://www.lpu.in/about-lpu/infrastructure.php
- LPU campus article describing official buildings 25–38: https://happenings.lpu.in/a-university-that-is-just-so-cool/
- LPU conference PDF showing The Chancellory (Building 30) and Administration-1 (Building 29): https://www.lpu.in/conferences/semce/download/semce2025.pdf
- LPU student induction guide reference for Baldev Raj Mittal Unipolis and UniMall: https://www.studocu.com/in/document/lovely-professional-university/btech-cse/induction-guide-for-btech-cse-students-at-lpu/171311124

## Accuracy and accessibility notice
The directory contains facility/building names from published sources. It is not a surveyed floor plan. It does not assert precise coordinates, entrance locations, accessible routes, ramp continuity, lift availability, or travel times. The route finder therefore displays an audit-required message rather than inventing a route. Complete on-site audits before publishing directions.

## Features
- Responsive LPU-focused landing page
- LPU building and facility selectors
- Avoid-stairs / prefer-ramps preferences for future route matching
- Barrier reporting form; demo reports are saved in the current browser only
- Accessibility information and explicit prototype limitations

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server 5500` and visit `http://localhost:5500`.

## Deploy on Vercel
Commit updated `index.html`, `styles.css`, `script.js`, and `README.md` to the connected GitHub repository. Vercel should automatically create a new production deployment.
