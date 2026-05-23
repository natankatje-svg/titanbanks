#!/usr/bin/env bash
# Usage: bash scripts/send-tg.sh <path-to-json-file>
set -e
curl -sS -X POST \
  -H "Content-Type: application/json; charset=utf-8" \
  -d @"$1" \
  "https://api.telegram.org/bot8659987983:AAHPzsL9OiQxQfH4lvRzwc7utk7L-PqF8jI/sendMessage"
