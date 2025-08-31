# Client Management - Scaffold Repo

This scaffold contains:
- `api/` - minimal Node + Express REST API connected to MySQL (example).
- `db.sql` - schema + sample seed data for MySQL.
- `cypress/` - sample Gherkin feature files and step skeletons.
- `.gitignore`

## Quick start

1. **Database**
   - Import `db.sql` into your MySQL instance:
     ```
     mysql -u root -p < db.sql
     ```
   - Update `api/.env` or `api/index.js` DB credentials if needed.

2. **API**
   ```
   cd api
   npm install
   npm start
   ```
   API runs at http://localhost:3000

3. **Frontend (Angular)**
   This repo does not contain the full Angular app to keep the scaffold lightweight.
   Create the frontend using Angular CLI (recommended):
   ```
   npm i -g @angular/cli
   ng new frontend --routing --style=scss
   cd frontend
   # copy components/templates from the project guide or replace with your own
   ng serve
   ```
   Set `API_BASE_URL` in environment.ts to `http://localhost:3000/api`.

4. **Cypress / BDD**
   From the frontend folder:
   ```
   # install cypress and cucumber preprocessor as dev deps
   npm i -D cypress @badeball/cypress-cucumber-preprocessor @bahmutov/cypress-esbuild-preprocessor
   # copy the cypress folder from this scaffold into frontend/cypress
   npx cypress open
   ```

5. **GitHub**
   ```
   git init
   git add .
   git commit -m "chore: add scaffold"
   # create repo and push, or use GitHub CLI: gh repo create <name> --public --source=. --push
   ```

## What I included in the scaffold
- `api/index.js` : minimal Express API with clients/meetings endpoints using mysql2.
- `db.sql` : schema and seed for `clients` and `meetings`.
- `cypress/e2e/*.feature` : two example Gherkin files (clients + meetings).
- `cypress/steps/*.steps.ts` : step skeletons to start implementing tests.

If you'd like, I can:
- Generate a full Angular project inside this repo (larger download), or
- Create a complete GitHub repo and push it (I can show commands to do so).
