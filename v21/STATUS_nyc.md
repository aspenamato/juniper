# t111u — Aspen is in NYC (not flying from PR)

Started 2026-11-26 ~17:33 ET.

Cause: After Play, if Travel Day was unfinished, home still spoke TRIP_MSG: "Today is Travel Day! You are flying from Puerto Rico all the way to New York..." and tried to call out the hidden Travel Day tile.

Source edits in shared src (pp21/fit21/fit22/skate untouched):
- app.js: new home greetings say she is in New York City now; no tripLive branch / tTrip callout. Teri title greet updated. Hidden tile subtitle updated.
- story.js, worlds.js: Travel Day framing is a past chapter / memory.
- awards.js, shell.html: journey wording updated.

## Voice clips (7 new, Whisper-checked, no TTS fallback)

| key | voice | text | whisper |
|---|---|---|---|
| 27hcsbz2vxt | jun Emma +0% +6Hz | You are in New York City now! | You are in New York City now. |
| 3qc9uyt4e3 | jun | This is the story of Travel Day, when you flew from Puerto Rico to New York! | match (punct) |
| bagnkrmqzq | jun | This is when I saw you flying to New York! | match (punct) |
| 13t5hvpbh03 | jun | Finish the Travel Day chapter about your trip from San Juan to New York. | match (case) |
| 2873c9ivarp | jun | To earn it: Finish the Travel Day chapter about your trip from San Juan to New York. | To earn it, finish... |
| vul0jip2s4 | ter AvaMulti +4% +10Hz | You are in New York now! | match (punct) |
| 2b762zz2qk0 | ter | This chapter is about Travel Day, when we traveled from San Juan all the way to New York, to see your dad and Juniper! | match (punct) |

Reused existing clips: Hi Aspen! 1m9i8y8o7mn, I'm Juniper. 16ytlyikcax, Let's play and learn in Washington Market Park! 1fdg726v6w7, Welcome back. 2ei385jlfq4, Let's play! 10yezehmnfb, Aspen! 27or6kauvs8, Travel Day Champion! frywry7e7e; Teri Glow sticks up! 20m45uuva6q, Hop in! icz6cxuxx3, Hi Aspen! 2cx5dhbldjq.

## Build

LEARN_OUT=/workspace/wt21/learn/  →  20261126173659-06e58d
QC sheet: v21/qc/nyc_now_sheet.jpg
Play → home speaks: "Hi Aspen! I'm Juniper. You are in New York City now! Let's play and learn in Washington Market Park!" (all recorded units, tts=false). #tTrip display:none. No present-tense flying copy visible at 1180×820 or 390×844.
