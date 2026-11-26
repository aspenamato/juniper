# v21 label/banner fit (t108u) — 2026-11-26 12:00 EST
Goal: every banner, ribbon, title plate, button, tile and label in Learn + Coloring Park shows its text fully inside its shape. No clipping, overflow, ellipsis-cut words, or letters spilling over art. Never shorten names. Glossy look stays.
Setup: own worktree /workspace/wt-fit (branch fit21, tracks origin/main). Shared src /workspace/juniper-learn. Local serve http://127.0.0.1:8841/ (wt-fit root). CSS in new file src/fit21.css + one build.py hook. Optional src/fit21.js if SVG map banners need auto-fit (font-size is an SVG attribute, not CSS). Log here often.
Parallel: passport worker (Travel Journal / home tiles) in /workspace/wt-tj; skating polish in /workspace/wt21. Do not clobber their files. pull --rebase before push; never force-push; note shared changes in COORD.md.
- 12:00 started; worktree wt-fit at origin/main b3558e37; served :8841. Next: write v21/tfit.py, baseline overflow scan at 1180x820, 820x1180, 390x844, large-crop shots.
- 12:00 worktree wt-fit at b3558e37; served :8841. Wrote v21/tfit.py and baseline shots in v21/fit/before/.
- 12:15 visual QC: real bugs (1180 looked mostly fine; phone/portrait were the problem).
  - 390 home: "Hi, Aspen!" ellipsized to "Hi, A...".
  - 390 map title: "Travel Day: San Juan to NYC" cut to "Tr"; skate title was hidden on phones (`#map.sk-map .maptitle{display:none}`).
  - 820 map title: "Travel Day: San Jua...".
  - SVG banners: "Bryant Park Winter Village" and "Washington Market Park" overflow the 500-wide ribbon at font 42.
  - Map stop names shortened at 22 chars ("Build a Skating Sente…").
  - Bro Math Academy: Watch/Practice/Speed pills clipped on 4-col tablet cards (Adding Tens, Skip Counting).
  - Journal phone: "Traveler Emblem" and polaroid captions ("San Juan Airport", "Uber Ride to Tribeca") clipped.
- 12:25 wrote src/fit21.css + src/fit21.js; hooked in build.py after pp21 (kept their hook). LEARN_OUT env added. COORD noted. Next: local build, after shots, tighten tfit.py, suite.
- 12:30 SHIP BUILD 20261126123026-fa529d (no unpublished pp21). src/fit21.css + src/fit21.js hooked after skate/pp21 in shared build.py. LEARN_OUT env supported.
  Fixes: (1) #hHello no longer ellipsizes "Hi, Aspen!" on phones; (2) map titles show in full (wrap to a second row on narrow screens), skate title un-hidden; (3) SVG map banners auto-shrink (Washington Market Park, Bryant Park Winter Village) and widen if needed; (4) map stop names no longer truncated with "…"; (5) Bro Math Academy header and Watch/Practice/Speed pills fit (2-col grid under 900px); (6) Travel Journal "Traveler Emblem" and polaroid captions wrap inside the card; (7) home tile titles wrap/shrink, icon/title gap so stickers don't cover words.
  Tests: tfit 0 fails at 1180x820, 820x1180, 390x844 (23 screens each, incl. coloring home). tlabel 0 fails at all three sizes. tacad and tarc 0 fails at 1180 and 390.
  QC sheet: v21/fit/label_fit_before_after.jpg (large crops). After shots in v21/fit/after/.
