#!/bin/bash
# wait for pages, then check version + md5 of index and given art files
V=$(python3 -c "import json;print(json.load(open('/workspace/wt21/learn/version.json'))['v'])" 2>/dev/null || cat /workspace/wt21/learn/version.json)
for i in $(seq 1 40); do L=$(curl -s "https://aspenamato.github.io/juniper/learn/version.json?$RANDOM"); echo "$L" | grep -q "$(echo $V | head -c 20)" && break; sleep 10; done
echo "live version: $L"
for f in learn/index.html "$@"; do a=$(md5sum /workspace/wt21/$f | cut -c1-32); b=$(curl -s "https://aspenamato.github.io/juniper/$f?$RANDOM" | md5sum | cut -c1-32); c=$(curl -s -o /dev/null -w "%{http_code}" "https://aspenamato.github.io/juniper/$f"); echo "$f $c $([ $a = $b ] && echo MATCH || echo DIFF)"; done
