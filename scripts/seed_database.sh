#!/bin/bash
set -e
echo "Seeding database..."
# In a real environment, this might use psql or a python script
psql -U postgres -d credex -a -f database/postgres/04_seed_pricing.sql
psql -U postgres -d credex -a -f database/postgres/05_seed_demo_audits.sql
echo "Database seeded."
