#!/bin/bash

set -e

ROOT_DIR="$(dirname "$0")/../.."

export $(cat "$ROOT_DIR/.env.local" | grep -v '^#' | xargs)

echo "▶ Dump de la base sur le VPS..."
ssh kyx "docker compose -f /home/debian/kyx/docker-compose.yml exec -T db-prod pg_dump -U kyx_prod -d kyx_prod -F c" > kyx_backup.dump

echo "▶ Import en local..."
docker compose cp kyx_backup.dump db:/tmp/kyx_backup.dump

docker compose exec -T db pg_restore \
  -U ${POSTGRES_USER:-kyx_user} \
  -d ${POSTGRES_DATABASE:-kyx_db} \
  --clean \
  --no-owner \
  -F c /tmp/kyx_backup.dump

docker compose exec db rm /tmp/kyx_backup.dump

echo "▶ Nettoyage..."
rm kyx_backup.dump

echo "✅ Base de données synchronisée !"