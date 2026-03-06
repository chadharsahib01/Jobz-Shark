# jobZ sharK

A modern one-stop web app concept for Pakistani job seekers to discover job listings with:

- Latest openings from government and private sectors
- Last dates to apply
- Eligibility snapshot (education + city)
- Quick apply instructions
- GUI-based admin dashboard to add/update/delete jobs
- One-click WhatsApp sharing with a pre-written promotional message
- Basic email alert subscription UX

## Run locally

Open `index.html` directly, or serve with:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## How to access admin panel

1. Click **Admin Panel** in the top navigation.
2. Enter admin PIN in the popup.
3. Default PIN is: `jobz123`.
4. After unlock, you can add/edit/delete jobs in the dashboard section.

## Security notes (important)

- The current admin protection is **client-side only** (PIN check in browser JavaScript).
- It helps prevent casual access but is **not secure for production**.
- A real secure setup should move admin features to a backend with:
  - authenticated users (email/password or OAuth)
  - server-side authorization (admin roles)
  - secure API endpoints for CRUD operations
  - database storage + audit logs

> Jobs are currently persisted in browser local storage (`jobzshark.jobs.v1`).
