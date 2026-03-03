# Pour les migrations better auth

psql postgresql://XXXXX:XXXXXX@XXXXXXX:5432/XXXXX -f better-auth_migrations/2026-02-28T18-39-31.886Z.sql

# Passage en prod

### Google Provider

Ajouter l'url de callback dans google cloud

### Apple

Setup apple https://www.better-auth.com/docs/authentication/apple
