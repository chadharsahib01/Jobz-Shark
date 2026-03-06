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

## How to update jobs from GUI

1. Open **Admin Panel** from the top navigation.
2. Fill the job form fields and click **Save Job** to publish.
3. Click **Edit** on any existing item to update deadlines/details, then **Update Job**.
4. Click **Delete** to remove outdated jobs.

> Jobs are persisted in browser local storage (`jobzshark.jobs.v1`).
