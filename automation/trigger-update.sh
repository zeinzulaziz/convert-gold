#!/usr/bin/env bash
# Pemicu manual untuk workflow update harga (workflow_dispatch).
# Pakai:  GH_TOKEN=ghp_xxx ./automation/trigger-update.sh
set -euo pipefail

: "${GH_TOKEN:?Set GH_TOKEN dulu: fine-grained PAT dengan izin Actions: write}"
REPO="zeinzulaziz/convert-gold"
WORKFLOW="update-gold-indonesia.yml"

curl -sS -X POST \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "User-Agent: convert-gold-trigger" \
  "https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/dispatches" \
  -d '{"ref":"main"}'

echo "Trigger terkirim. Cek: https://github.com/${REPO}/actions/workflows/${WORKFLOW}"
