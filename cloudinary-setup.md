# Cloudinary Setup Guide

## Hitta dina Cloudinary Credentials

1. **Gå till Cloudinary Dashboard**:

   - Besök https://cloudinary.com/console
   - Logga in på ditt konto

2. **Hitta API Credentials**:

   - I dashboarden, leta efter "API Environment variable" eller "Account Details"
   - Du bör se något som liknar:
     ```
     Cloud name: dfkbz67mw
     API Key: 123456789012345
     API Secret: abcdefghijklmnopqrstuvwxyz123456
     ```

3. **Skapa .env.local fil**:
   Skapa en fil som heter `.env.local` i projektets rot och lägg till:
   ```
   CLOUDINARY_CLOUD_NAME=dfkbz67mw
   CLOUDINARY_API_KEY=din_api_key_här
   CLOUDINARY_API_SECRET=din_api_secret_här
   ```

## Viktigt

- Ersätt `din_api_key_här` och `din_api_secret_här` med dina faktiska värden
- Lägg aldrig till `.env.local` i git (den bör redan vara i .gitignore)
- Starta om utvecklingsservern efter att du lagt till miljövariablerna
