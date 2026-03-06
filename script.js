const seedJobs = [
  {
    id: "job-1",
    title: "Assistant Director (FPSC)",
    org: "Federal Public Service Commission",
    category: "government",
    city: "Islamabad",
    education: "Master's",
    lastDate: "2026-03-28",
    whoCanApply: "Candidates with a Master's degree, valid CNIC, and age within FPSC limits.",
    apply: "Apply online via fpsc.gov.pk, submit challan and documents before deadline."
  },
  {
    id: "job-2",
    title: "Branch Operations Officer",
    org: "National Bank of Pakistan",
    category: "banking",
    city: "Karachi",
    education: "Bachelor's",
    lastDate: "2026-03-20",
    whoCanApply: "Bachelor's degree holders with 1-2 years banking operations experience.",
    apply: "Submit application through NBP careers portal and upload updated CV."
  },
  {
    id: "job-3",
    title: "Software Engineer (Frontend)",
    org: "Punjab Information Technology Board",
    category: "it",
    city: "Lahore",
    education: "Bachelor's",
    lastDate: "2026-03-25",
    whoCanApply: "CS/SE graduates with strong JavaScript and modern UI framework skills.",
    apply: "Apply at jobs.pitb.gov.pk and attach portfolio + academic credentials."
  }
];

const STORAGE_KEY = "jobzshark.jobs.v1";
const ADMIN_UNLOCK_KEY = "jobzshark.admin.unlocked";
const ADMIN_PIN = "jobz123";

let jobs = loadJobs();

const jobsGrid = document.getElementById("jobsGrid");
const resultsCount = document.getElementById("resultsCount");
const categoryFilter = document.getElementById("categoryFilter");
const cityFilter = document.getElementById("cityFilter");
const educationFilter = document.getElementById("educationFilter");
const searchInput = document.getElementById("searchInput");

const jobModal = document.getElementById("jobModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalOrg = document.getElementById("modalOrg");
const modalCity = document.getElementById("modalCity");
const modalDeadline = document.getElementById("modalDeadline");
const modalWho = document.getElementById("modalWho");
const modalApply = document.getElementById("modalApply");
const modalWhatsappShare = document.getElementById("modalWhatsappShare");

const adminPanel = document.getElementById("adminPanel");
const openAdminAccessBtn = document.getElementById("openAdminAccessBtn");
const adminLockBtn = document.getElementById("adminLockBtn");
const adminAuthModal = document.getElementById("adminAuthModal");
const adminAuthClose = document.getElementById("adminAuthClose");
const adminAuthForm = document.getElementById("adminAuthForm");
const adminPinInput = document.getElementById("adminPinInput");
const adminAuthMessage = document.getElementById("adminAuthMessage");

const jobForm = document.getElementById("jobForm");
const jobIdInput = document.getElementById("jobId");
const jobTitleInput = document.getElementById("jobTitle");
const jobOrgInput = document.getElementById("jobOrg");
const jobCategoryInput = document.getElementById("jobCategory");
const jobCityInput = document.getElementById("jobCity");
const jobEducationInput = document.getElementById("jobEducation");
const jobLastDateInput = document.getElementById("jobLastDate");
const jobWhoInput = document.getElementById("jobWho");
const jobApplyInput = document.getElementById("jobApply");
const saveJobBtn = document.getElementById("saveJobBtn");
const resetJobBtn = document.getElementById("resetJobBtn");
const adminJobsList = document.getElementById("adminJobsList");
const adminCount = document.getElementById("adminCount");

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

function loadJobs() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [...seedJobs];
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) {
      return parsed;
    }
  } catch (error) {
    console.warn("Failed to parse stored jobs:", error);
  }

  return [...seedJobs];
}

function saveJobs() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

function isAdminUnlocked() {
  return sessionStorage.getItem(ADMIN_UNLOCK_KEY) === "yes";
}

function updateAdminPanelVisibility() {
  adminPanel.classList.toggle("hidden", !isAdminUnlocked());
}

function openAdminAuthModal() {
  adminAuthForm.reset();
  adminAuthMessage.textContent = "";
  adminAuthModal.classList.remove("hidden");
}

function closeAdminAuthModal() {
  adminAuthModal.classList.add("hidden");
}

function unlockAdminPanel() {
  sessionStorage.setItem(ADMIN_UNLOCK_KEY, "yes");
  updateAdminPanelVisibility();
  closeAdminAuthModal();
  adminPanel.scrollIntoView({ behavior: "smooth" });
}

function lockAdminPanel() {
  sessionStorage.removeItem(ADMIN_UNLOCK_KEY);
  updateAdminPanelVisibility();
}

function createWhatsAppShareUrl(job) {
  const message = [
    "🇵🇰 New job update from jobZ sharK!",
    `Role: ${job.title}`,
    `Organization: ${job.org}`,
    `City: ${job.city}`,
    `Education: ${job.education}`,
    `Last Date: ${formatDate(job.lastDate)}`,
    `How to apply: ${job.apply}`,
    "Find more verified jobs and deadlines on jobZ sharK: https://jobzshark.pk"
  ].join("\n");

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

function openDetails(job) {
  modalTitle.textContent = job.title;
  modalOrg.textContent = job.org;
  modalCity.textContent = `${job.city} • ${job.education} • ${job.category}`;
  modalDeadline.textContent = `Last Date: ${formatDate(job.lastDate)}`;
  modalWho.textContent = job.whoCanApply;
  modalApply.textContent = job.apply;
  modalWhatsappShare.href = createWhatsAppShareUrl(job);
  jobModal.classList.remove("hidden");
}

function closeDetails() {
  jobModal.classList.add("hidden");
}

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
      <div class="job-actions">
        <button class="btn details-btn" type="button">View Details</button>
        <a class="btn ghost share-btn" target="_blank" rel="noopener" href="${createWhatsAppShareUrl(job)}">Share WhatsApp</a>
      </div>
    `;

    card.querySelector(".details-btn").addEventListener("click", () => openDetails(job));
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
      [job.title, job.org, job.apply, job.whoCanApply].some((field) =>
        field.toLowerCase().includes(query)
      );

    return categoryMatch && cityMatch && eduMatch && searchMatch;
  });

  renderJobs(filtered);
}

function fillForm(job) {
  jobIdInput.value = job.id;
  jobTitleInput.value = job.title;
  jobOrgInput.value = job.org;
  jobCategoryInput.value = job.category;
  jobCityInput.value = job.city;
  jobEducationInput.value = job.education;
  jobLastDateInput.value = job.lastDate;
  jobWhoInput.value = job.whoCanApply;
  jobApplyInput.value = job.apply;
  saveJobBtn.textContent = "Update Job";
}

function resetForm() {
  jobForm.reset();
  jobIdInput.value = "";
  saveJobBtn.textContent = "Save Job";
}

function renderAdminJobs() {
  adminJobsList.innerHTML = "";
  adminCount.textContent = `${jobs.length} total jobs`;

  jobs.forEach((job) => {
    const row = document.createElement("div");
    row.className = "admin-job-item";
    row.innerHTML = `
      <div>
        <strong>${job.title}</strong>
        <p class="meta">${job.org} • ${job.city} • Last Date: ${formatDate(job.lastDate)}</p>
      </div>
      <div class="admin-item-actions">
        <button class="btn ghost edit-btn" type="button">Edit</button>
        <button class="btn ghost delete-btn" type="button">Delete</button>
      </div>
    `;

    row.querySelector(".edit-btn").addEventListener("click", () => fillForm(job));
    row.querySelector(".delete-btn").addEventListener("click", () => {
      jobs = jobs.filter((item) => item.id !== job.id);
      saveJobs();
      renderAdminJobs();
      applyFilters();
      resetForm();
    });

    adminJobsList.appendChild(row);
  });
}

jobForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const payload = {
    id: jobIdInput.value || `job-${Date.now()}`,
    title: jobTitleInput.value.trim(),
    org: jobOrgInput.value.trim(),
    category: jobCategoryInput.value,
    city: jobCityInput.value.trim(),
    education: jobEducationInput.value,
    lastDate: jobLastDateInput.value,
    whoCanApply: jobWhoInput.value.trim(),
    apply: jobApplyInput.value.trim()
  };

  if (jobIdInput.value) {
    jobs = jobs.map((job) => (job.id === payload.id ? payload : job));
  } else {
    jobs.unshift(payload);
  }

  saveJobs();
  renderAdminJobs();
  applyFilters();
  resetForm();
});

resetJobBtn.addEventListener("click", resetForm);

[categoryFilter, cityFilter, educationFilter].forEach((el) =>
  el.addEventListener("change", applyFilters)
);
searchInput.addEventListener("input", applyFilters);

openAdminAccessBtn.addEventListener("click", () => {
  if (isAdminUnlocked()) {
    adminPanel.scrollIntoView({ behavior: "smooth" });
    return;
  }
  openAdminAuthModal();
});
adminLockBtn.addEventListener("click", lockAdminPanel);
adminAuthClose.addEventListener("click", closeAdminAuthModal);
adminAuthModal.addEventListener("click", (event) => {
  if (event.target === adminAuthModal) {
    closeAdminAuthModal();
  }
});
adminAuthForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (adminPinInput.value === ADMIN_PIN) {
    unlockAdminPanel();
    return;
  }

  adminAuthMessage.textContent = "Incorrect PIN. Please try again.";
});

modalClose.addEventListener("click", closeDetails);
jobModal.addEventListener("click", (event) => {
  if (event.target === jobModal) {
    closeDetails();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !jobModal.classList.contains("hidden")) {
    closeDetails();
  }
  if (event.key === "Escape" && !adminAuthModal.classList.contains("hidden")) {
    closeAdminAuthModal();
  }
});

const notifyForm = document.getElementById("notifyForm");
const notifyMessage = document.getElementById("notifyMessage");
notifyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("emailInput").value;
  notifyMessage.textContent = `Thanks! ${email} is now subscribed for job alerts.`;
  notifyForm.reset();
});

renderAdminJobs();
updateAdminPanelVisibility();
applyFilters();
