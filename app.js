const statusEl = document.getElementById("status");
const guideEl = document.getElementById("guide");
const sectionContainer = document.getElementById("guide-sections");
const contentsList = document.getElementById("contents-list");
const printBtn = document.getElementById("printBtn");

printBtn?.addEventListener("click", () => window.print());

const escapeHTML = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const paragraph = (text) => text ? `<p>${escapeHTML(text)}</p>` : "";

const list = (items = [], className = "") => {
  if (!Array.isArray(items) || !items.length) return "";
  return `<ul class="${className}">${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
};

const orderedList = (items = [], className = "step-list") => {
  if (!Array.isArray(items) || !items.length) return "";
  return `<ol class="${className}">${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ol>`;
};

const tipBox = (tip) => tip
  ? `<aside class="tip-box"><strong>Tip:</strong> ${escapeHTML(tip)}</aside>`
  : "";

const imageBox = (title, description) => {
  if (!title && !description) return "";
  return `
    <figure class="image-box">
      <div class="image-title">[Insert screenshot/image: ${escapeHTML(title || "image placeholder")}]</div>
      ${description ? `<p><strong>Description:</strong> ${escapeHTML(description)}</p>` : ""}
    </figure>
  `;
};

const table = (headers = [], rows = []) => {
  if (!headers.length || !rows.length) return "";
  return `
    <div class="table-wrap" role="region" aria-label="Table" tabindex="0">
      <table>
        <thead>
          <tr>${headers.map((header) => `<th scope="col">${escapeHTML(header)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>${headers.map((header) => `<td>${escapeHTML(row[header] ?? "")}</td>`).join("")}</tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
};

const renderSubsection = (subsection = {}) => `
  <section class="subsection-card">
    <h3>${escapeHTML(subsection.title || "Untitled section")}</h3>
    ${paragraph(subsection.body)}
    ${orderedList(subsection.instructions)}
    ${list(subsection.bullets)}
    ${tipBox(subsection.tip)}
    ${imageBox(subsection.imagePlaceholder, subsection.imageDescription)}
  </section>
`;

const renderGuide = (data) => {
  document.title = `${data.title || "Student Guide"} | Guide Formatter`;
  document.getElementById("site-title").textContent = data.title || "Student Guide";
  document.getElementById("guide-title").textContent = data.title || "Student Guide";
  document.getElementById("guide-subtitle").textContent = data.subtitle || "Student Guide";
  document.getElementById("guide-purpose").textContent = data.purpose || "";
  document.getElementById("guide-audience").textContent = data.audience || "Students";

  const sections = normaliseSections(data);
  contentsList.innerHTML = sections
    .map((section) => {
      const id = section.id || slugify(`${section.number}-${section.title}`);
      return `<li><a href="#${id}">${escapeHTML(section.number ? `${section.number} ` : "")}${escapeHTML(section.title)}</a></li>`;
    })
    .join("");

  sectionContainer.innerHTML = sections.map(renderSection).join("");
  statusEl.hidden = true;
  guideEl.hidden = false;
};

const normaliseSections = (data) => {
  const sections = [];

  if (data.introduction) {
    sections.push({
      number: "1.0",
      title: data.introduction.heading || "Introduction",
      subsections: [
        {
          title: "1. What is it?",
          body: [data.introduction.whatIsIt, data.introduction.whyUseIt].filter(Boolean).join("\n\n"),
          imagePlaceholder: data.introduction.imagePlaceholder,
          imageDescription: data.introduction.imageDescription
        }
      ]
    });
  }

  if (data.gettingStarted) {
    sections.push({
      number: "2.0",
      title: "Getting Started",
      subsections: [
        {
          title: "1. What you need",
          bullets: data.gettingStarted.whatYouNeed || []
        },
        {
          title: "2. Before you begin",
          body: data.gettingStarted.beforeYouBegin,
          tip: data.gettingStarted.tip
        }
      ]
    });
  }

  if (Array.isArray(data.steps) && data.steps.length) {
    sections.push({
      number: "3.0",
      title: "Step-by-step Instructions",
      subsections: data.steps.map((step, index) => ({
        title: `${index + 1}. ${step.title || "Step"}`,
        instructions: step.instructions || [],
        tip: step.tip,
        imagePlaceholder: step.imagePlaceholder,
        imageDescription: step.imageDescription
      }))
    });
  }

  if (Array.isArray(data.helpfulTips) && data.helpfulTips.length) {
    sections.push({
      number: "4.0",
      title: "Helpful Tips",
      customHTML: table(
        ["Tip", "Why it helps"],
        data.helpfulTips.map((item) => ({
          "Tip": item.tip,
          "Why it helps": item.whyItHelps
        }))
      )
    });
  }

  if (Array.isArray(data.troubleshooting) && data.troubleshooting.length) {
    sections.push({
      number: "5.0",
      title: "Troubleshooting",
      customHTML: table(
        ["Issue", "What to try"],
        data.troubleshooting.map((item) => ({
          "Issue": item.issue,
          "What to try": item.whatToTry
        }))
      )
    });
  }

  if (Array.isArray(data.faqs) && data.faqs.length) {
    sections.push({
      number: "6.0",
      title: "Frequently Asked Questions",
      customHTML: data.faqs.map((faq) => `
        <section class="faq-item">
          <h3>Q. ${escapeHTML(faq.question)}</h3>
          <p>A. ${escapeHTML(faq.answer)}</p>
        </section>
      `).join("")
    });
  }

  if (Array.isArray(data.whereToGetHelp) && data.whereToGetHelp.length) {
    sections.push({
      number: "7.0",
      title: "Where to get help",
      customHTML: `
        <section class="help-card">
          ${list(data.whereToGetHelp, "help-list")}
        </section>
      `
    });
  }

  if (Array.isArray(data.sections) && data.sections.length) {
    sections.push(...data.sections);
  }

  return sections.map((section) => ({
    ...section,
    id: section.id || slugify(`${section.number || ""}-${section.title || ""}`)
  }));
};

const renderSection = (section = {}) => `
  <section class="section-card" id="${escapeHTML(section.id)}">
    <div class="section-heading">
      ${section.number ? `<span class="section-number">${escapeHTML(section.number)}</span>` : ""}
      <h2>${escapeHTML(section.title || "Untitled section")}</h2>
    </div>
    ${paragraph(section.body)}
    ${section.customHTML || ""}
    ${Array.isArray(section.subsections) ? section.subsections.map(renderSubsection).join("") : ""}
  </section>
`;

const loadGuide = async () => {
  try {
    const response = await fetch("guide-data.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load guide-data.json (${response.status})`);
    const data = await response.json();
    renderGuide(data);
  } catch (error) {
    statusEl.className = "error";
    statusEl.innerHTML = `
      <strong>Guide content could not be loaded.</strong>
      <p>${escapeHTML(error.message)}</p>
      <p>Check that <code>guide-data.json</code> exists in the repository root and contains valid JSON.</p>
    `;
  }
};

loadGuide();
