#!/bin/bash
set -e
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="backup_${TIMESTAMP}.sql"
echo "Backing up database to ${BACKUP_FILE}..."
pg_dump -U postgres credex > ${BACKUP_FILE}
echo "Backup complete."
