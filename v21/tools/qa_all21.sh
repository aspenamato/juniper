#!/bin/bash
# usage: v16/qa_all.sh TAG  -> runs all activities at both sizes in 3 chunks each, logs v16/qa_TAG_*.log
cd /workspace/juniper-learn; T=${1:-x}
ACTS=$(python3 - <<'P'
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome'); pg=b.new_page(); pg.goto('http://127.0.0.1:8821/learn/'); pg.wait_for_timeout(1500)
    print('\n'.join(pg.evaluate("JLP.C.A.map(a=>a.id)")))
P
)
echo "$ACTS" > /tmp/acts_$T; N=$(echo "$ACTS"|wc -l)
for sz in "1180 820" "390 844"; do w=${sz%% *}; split -n r/3 /tmp/acts_$T /tmp/qc_${T}_${w}_; i=0; for c in /tmp/qc_${T}_${w}_*; do i=$((i+1)); L=$(paste -sd, $c); CURL=http://127.0.0.1:8821/learn/ timeout 2400 python3 qa.py $sz $L > /workspace/wt21/v21/suite/qa_${T}_${w}_$i.log 2>&1 & done; done; wait
for w in 1180 390; do ok=$(cat /workspace/wt21/v21/suite/qa_${T}_${w}_*.log | awk '/ ok /{print $1}' | sort -u | wc -l); echo "$w: $ok/$N ok"; grep -h "Exception" /workspace/wt21/v21/suite/qa_${T}_${w}_*.log; done
