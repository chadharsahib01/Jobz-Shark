const jobs = [
  {
    title: "Assistant Director (FPSC)",
    org: "Federal Public Service Commission",
    category: "government",
    city: "Islamabad",
    education: "Master's",
    lastDate: "2026-03-28",
    apply: "Apply online via fpsc.gov.pk"
  },
  {
    title: "Branch Operations Officer",
    org: "National Bank of Pakistan",
    category: "banking",
    city: "Karachi",
    education: "Bachelor's",
    lastDate: "2026-03-20",
    apply: "Submit application through NBP careers portal"
  },
  {
    title: "Software Engineer (Frontend)",
    org: "Punjab Information Technology Board",
    category: "it",
    city: "Lahore",
    education: "Bachelor's",
    lastDate: "2026-03-25",
    apply: "Apply at jobs.pitb.gov.pk"
  },
  {
    title: "Secondary School Teacher",
    org: "KPK Education Department",
    category: "education",
    city: "Peshawar",
    education: "Intermediate",
    lastDate: "2026-03-30",
    apply: "Apply through ETEA portal with required documents"
  },
  {
    title: "Customer Support Executive",
    org: "Telenor Pakistan",
    category: "private",
    city: "Islamabad",
    education: "Matric",
    lastDate: "2026-04-05",
    apply: "Upload CV on Telenor careers page"
  }
];

const jobsGrid = document.getElementById("jobsGrid");
const resultsCount = document.getElementById("resultsCount");
const categoryFilter = document.getElementById("categoryFilter");
const cityFilter = document.getElementById("cityFilter");
const educationFilter = document.getElementById("educationFilter");
const searchInput = document.getElementById("searchInput");

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

function renderJobs(list) {
  jobsGrid.innerHTML = "";
  resultsCount.textContent = `${list.length} job${list.length !== 1 ? "s" : ""}`;

  if (!list.length) {
    jobsGrid.innerHTML = '<p class="meta">No jobs found. Try broader filters.</p>';
    return;
  }

  list.forEach((job) => {
    const card = document.createElement("article");
    card.className = "job-card";
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p class="meta">${job.org}</p>
      <p class="meta">${job.city} • ${job.education}</p>
      <p class="meta">Category: ${job.category}</p>
      <p class="deadline">Last Date: ${formatDate(job.lastDate)}</p>
      <p>${job.apply}</p>
    `;
    jobsGrid.appendChild(card);
  });
}

function applyFilters() {
  const category = categoryFilter.value;
  const city = cityFilter.value;
  const education = educationFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  const filtered = jobs.filter((job) => {
    const categoryMatch = category === "all" || job.category === category;
    const cityMatch = city === "all" || job.city === city;
    const eduMatch = education === "all" || job.education === education;
    const searchMatch =
      !query ||
      [job.title, job.org, job.apply].some((field) =>
        field.toLowerCase().includes(query)
      );

    return categoryMatch && cityMatch && eduMatch && searchMatch;
  });

  renderJobs(filtered);
}

[categoryFilter, cityFilter, educationFilter].forEach((el) =>
  el.addEventListener("change", applyFilters)
);
searchInput.addEventListener("input", applyFilters);

const notifyForm = document.getElementById("notifyForm");
const notifyMessage = document.getElementById("notifyMessage");
notifyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("emailInput").value;
  notifyMessage.textContent = `Thanks! ${email} is now subscribed for job alerts.`;
  notifyForm.reset();
});

renderJobs(jobs);
