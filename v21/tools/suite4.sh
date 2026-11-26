#!/bin/bash
# full suite 4-way parallel against wt21 build (8821), both sizes, incl. tskate, tfit, ttj. Logs -> v21/suite/<test>_<w>.log
cd /workspace/juniper-learn; U=http://127.0.0.1:8821/learn/?nosw=1; O=/workspace/wt21/v21/suite; mkdir -p $O /tmp/s21
for t in v15/t15.py v16/t16h.py v12/broqa.py; do sed "s#http://localhost:877[01]/learn/#$U#g; s#http://localhost:877[01]/#http://127.0.0.1:8821/#g" $t > /tmp/s21/$(basename $t); done
{ for sz in "1180 820" "390 844"; do w=${sz%% *}
  for t in /workspace/wt21/v21/tskate.py /workspace/wt21/v21/tfit.py v21/ttj.py v16/tstk.py v16/tarc.py v16/tacad.py v16/trw.py v16/tdress.py v17/texit.py v18/tlabel.py v19/tspin.py v20/tstale.py; do
    u=$U; case $t in *ttj.py) u=http://127.0.0.1:8821/learn/;; esac
    echo "timeout 900 python3 $t $sz $u > $O/$(basename $t .py)_$w.log 2>&1"; done
  for t in t15 t16h broqa; do echo "timeout 900 python3 /tmp/s21/$t.py $sz > $O/${t}_$w.log 2>&1"; done
done; } | xargs -P 4 -I{} bash -c "{}"
for f in $O/*.log; do echo "$(basename $f): $(grep -c '^PASS' $f) pass, $(grep -c '^FAIL' $f) fail, $(grep -c 'Traceback' $f) tb; $(tail -1 $f | cut -c1-80)"; done
