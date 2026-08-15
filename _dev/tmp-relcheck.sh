#!/bin/bash
curl -sI https://api.github.com/repos/freescout-helpdesk/freescout/releases/latest | head -3
echo "---"
curl -sL https://api.github.com/repos/freescout-helpdesk/freescout/releases/latest -o /tmp/rel.json
wc -c /tmp/rel.json
grep -oE '"tag_name"[^,]*' /tmp/rel.json | head -1