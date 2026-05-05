const DEFAULT_GUIDE = {
  title: "Using Dictate in Microsoft Word",
  subtitle: "Student Guide",
  audience: "Students",
  purpose: "Help students use Microsoft Word Dictate to speak ideas into a document.",
  contents: [
    "1.0 Introduction to Microsoft Word Dictate",
    "2.0 Getting Started",
    "3.0 Step-by-step Instructions",
    "4.0 Helpful Tips",
    "5.0 Troubleshooting",
    "6.0 Frequently Asked Questions",
    "7.0 Where to get help"
  ],
  introduction: {
    heading: "Introduction to Microsoft Word Dictate",
    whatIsIt: "Dictate is a Microsoft Word feature that lets you speak your ideas out loud and have them typed into a document.",
    whyUseIt: "It can help you get ideas down quickly, reduce typing fatigue, and focus on your thoughts before editing your work.",
    imagePlaceholder: "Microsoft Word Home tab with the Dictate button highlighted",
    imageDescription: "Microsoft Word open on a blank document with the Dictate microphone button highlighted on the Home tab."
  },
  gettingStarted: {
    whatYouNeed: [
      "A device with Microsoft Word installed or available online",
      "A working microphone",
      "Internet access",
      "A quiet space where possible"
    ],
    beforeYouBegin: "Check that your microphone is connected and working. Close other apps that may be using your microphone.",
    tip: "Using headphones with a microphone can improve accuracy and reduce background noise."
  },
  steps: [
    {
      number: "1",
      title: "Open Microsoft Word",
      instructions: ["Open Microsoft Word on your device."],
      tip: "Have your document topic or notes nearby before you start dictating.",
      imagePlaceholder: "Microsoft Word start screen",
      imageDescription: "Microsoft Word start screen showing recent documents and the option to open a blank document."
    },
    {
      number: "2",
      title: "Open a blank document",
      instructions: ["Select Blank document from the start screen."],
      imagePlaceholder: "Blank document option",
      imageDescription: "The Microsoft Word start screen with the Blank document option highlighted."
    },
    {
      number: "3",
      title: "Select Dictate from the Home tab",
      instructions: ["Go to the Home tab.", "Select Dictate, shown as a microphone icon."],
      imagePlaceholder: "Dictate button on the Home tab",
      imageDescription: "The Home tab in Microsoft Word with the Dictate microphone button highlighted."
    },
    {
      number: "4",
      title: "Allow microphone access",
      instructions: ["If prompted, allow Microsoft Word to access your microphone."],
      imagePlaceholder: "Microphone permission prompt",
      imageDescription: "A microphone access prompt asking permission for Microsoft Word to use the microphone."
    },
    {
      number: "5",
      title: "Start speaking clearly",
      instructions: ["Speak naturally and clearly.", "Your words will appear as text in the document."],
      tip: "Pause briefly between sentences so your ideas are easier to review later.",
      imagePlaceholder: "Dictated text appearing in Word",
      imageDescription: "A Word document with dictated text appearing on the page."
    },
    {
      number: "6",
      title: "Say punctuation aloud",
      instructions: ["Say punctuation such as comma, full stop, question mark, or new paragraph when needed."],
      imagePlaceholder: "Example dictated paragraph",
      imageDescription: "A paragraph in Word showing punctuation added through dictation."
    },
    {
      number: "7",
      title: "Stop Dictate",
      instructions: ["Select the Dictate button again to stop recording."],
      imagePlaceholder: "Dictate button switched off",
      imageDescription: "The Dictate microphone button in Microsoft Word after dictation has stopped."
    },
    {
      number: "8",
      title: "Review and save your document",
      instructions: ["Read through your text and correct any errors.", "Select File, then Save As, and choose where to save the document."],
      tip: "Dictation is a drafting tool. Always review your text before submitting or sharing it.",
      imagePlaceholder: "Save As screen in Microsoft Word",
      imageDescription: "Microsoft Word showing the Save As options for choosing a file name and location."
    }
  ],
  helpfulTips: [
    { tip: "Speak naturally", whyItHelps: "Helps Dictate recognise your words more accurately." },
    { tip: "Use a quiet space", whyItHelps: "Reduces background noise and transcription errors." },
    { tip: "Review your text", whyItHelps: "Helps you correct words, punctuation, and sentence flow." }
  ],
  troubleshooting: [
    { issue: "Dictate button is unavailable", whatToTry: "Check your internet connection and confirm that Word is up to date." },
    { issue: "No text appears", whatToTry: "Check microphone access and make sure the microphone is selected." },
    { issue: "Words are incorrect", whatToTry: "Speak a little slower, reduce background noise, and review the text afterwards." }
  ],
  faqs: [
    { question: "Do I need to type at all?", answer: "You can use Dictate for drafting, but you should still review and edit your work." },
    { question: "Can I use Dictate for assignments?", answer: "Yes. Dictate can help you draft notes, paragraphs, or ideas before editing." },
    { question: "Can I use Dictate for long documents?", answer: "Yes, although dictating in shorter sections often works best." }
  ],
  whereToGetHelp: [
    "[Insert confirmed technology support contact]",
    "[Insert confirmed accessibility support contact]",
    "[Insert student support link]"
  ]
};

const els = {
  input: document.getElementById("jsonInput"),
  status: document.getElementById("status"),
  loadSample: document.getElementById("loadSampleBtn"),
  generate: document.getElementById("generateBtn"),
  downloadJson: document.getElementById("downloadJsonBtn"),
  downloadHtml: document.getElementById("downloadHtmlBtn"),
  print: document.getElementById("printBtn"),
  downloadDocx: document.getElementById("downloadDocxBtn"),
  downloadWordHtml: document.getElementById("downloadWordHtmlBtn"),
  guide: document.getElementById("guide"),
  guideTitle: document.getElementById("guide-title"),
  guideSubtitle: document.getElementById("guide-subtitle"),
  guidePurpose: document.getElementById("guide-purpose"),
  guideAudience: document.getElementById("guide-audience"),
  contentsList: document.getElementById("contents-list"),
  sectionContainer: document.getElementById("guide-sections")
};

let currentGuide = DEFAULT_GUIDE;
let currentSections = [];

const escapeHTML = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const escapeXML = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

const slugify = (value = "") => String(value)
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "") || "section";

const fileSafeName = (value = "student-guide") => String(value)
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "") || "student-guide";

const setStatus = (message, type = "notice") => {
  els.status.className = type;
  els.status.innerHTML = message;
};

const paragraph = (text) => text
  ? String(text).split(/\n{2,}/).map((part) => `<p>${escapeHTML(part)}</p>`).join("")
  : "";

const list = (items = [], className = "") => {
  if (!Array.isArray(items) || !items.length) return "";
  return `<ul class="${className}">${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
};

const orderedList = (items = [], className = "step-list") => {
  if (!Array.isArray(items) || !items.length) return "";
  return `<ol class="${className}">${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ol>`;
};

const tipBox = (tip) => tip ? `<aside class="tip-box"><strong>Tip:</strong> ${escapeHTML(tip)}</aside>` : "";

const imageBox = (title, description) => {
  if (!title && !description) return "";
  return `
    <figure class="image-box">
      <div class="image-title">[Insert screenshot/image: ${escapeHTML(title || "image placeholder")}]</div>
      ${description ? `<p><strong>Description:</strong> ${escapeHTML(description)}</p>` : ""}
    </figure>`;
};

const tableHTML = (headers = [], rows = []) => {
  if (!headers.length || !rows.length) return "";
  return `
    <div class="table-wrap" role="region" aria-label="Table" tabindex="0">
      <table>
        <thead><tr>${headers.map((header) => `<th scope="col">${escapeHTML(header)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((row) => `<tr>${headers.map((header) => `<td>${escapeHTML(row[header] ?? "")}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>`;
};

const normaliseSections = (data) => {
  const sections = [];
  if (data.introduction) {
    sections.push({
      number: "1.0",
      title: data.introduction.heading || "Introduction",
      subsections: [{
        title: "1. What is it?",
        body: [data.introduction.whatIsIt, data.introduction.whyUseIt].filter(Boolean).join("\n\n"),
        imagePlaceholder: data.introduction.imagePlaceholder,
        imageDescription: data.introduction.imageDescription
      }]
    });
  }
  if (data.gettingStarted) {
    sections.push({
      number: "2.0",
      title: "Getting Started",
      subsections: [
        { title: "1. What you need", bullets: data.gettingStarted.whatYouNeed || [] },
        { title: "2. Before you begin", body: data.gettingStarted.beforeYouBegin, tip: data.gettingStarted.tip }
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
      table: {
        headers: ["Tip", "Why it helps"],
        rows: data.helpfulTips.map((item) => ({ "Tip": item.tip, "Why it helps": item.whyItHelps }))
      }
    });
  }
  if (Array.isArray(data.troubleshooting) && data.troubleshooting.length) {
    sections.push({
      number: "5.0",
      title: "Troubleshooting",
      table: {
        headers: ["Issue", "What to try"],
        rows: data.troubleshooting.map((item) => ({ "Issue": item.issue, "What to try": item.whatToTry }))
      }
    });
  }
  if (Array.isArray(data.faqs) && data.faqs.length) {
    sections.push({ number: "6.0", title: "Frequently Asked Questions", faqs: data.faqs });
  }
  if (Array.isArray(data.whereToGetHelp) && data.whereToGetHelp.length) {
    sections.push({ number: "7.0", title: "Where to get help", help: data.whereToGetHelp });
  }
  if (Array.isArray(data.sections) && data.sections.length) sections.push(...data.sections);
  return sections.map((section) => ({ ...section, id: section.id || slugify(`${section.number || ""}-${section.title || ""}`) }));
};

const renderSubsection = (subsection = {}) => `
  <section class="subsection-card">
    <h3>${escapeHTML(subsection.title || "Untitled section")}</h3>
    ${paragraph(subsection.body)}
    ${orderedList(subsection.instructions)}
    ${list(subsection.bullets)}
    ${tipBox(subsection.tip)}
    ${imageBox(subsection.imagePlaceholder, subsection.imageDescription)}
  </section>`;

const renderSection = (section = {}) => {
  const table = section.table ? tableHTML(section.table.headers, section.table.rows) : "";
  const faqs = Array.isArray(section.faqs) ? section.faqs.map((faq) => `
    <section class="faq-item">
      <h3>Q. ${escapeHTML(faq.question)}</h3>
      <p>A. ${escapeHTML(faq.answer)}</p>
    </section>`).join("") : "";
  const help = Array.isArray(section.help) ? `<section class="help-card">${list(section.help, "help-list")}</section>` : "";
  return `
    <section class="section-card" id="${escapeHTML(section.id)}">
      <div class="section-heading">
        ${section.number ? `<span class="section-number">${escapeHTML(section.number)}</span>` : ""}
        <h2>${escapeHTML(section.title || "Untitled section")}</h2>
      </div>
      ${paragraph(section.body)}
      ${table}
      ${faqs}
      ${help}
      ${Array.isArray(section.subsections) ? section.subsections.map(renderSubsection).join("") : ""}
    </section>`;
};

const renderGuide = (data) => {
  currentGuide = data;
  currentSections = normaliseSections(data);
  document.title = `${data.title || "Student Guide"} | Guide Formatter`;
  els.guideTitle.textContent = data.title || "Student Guide";
  els.guideSubtitle.textContent = data.subtitle || "Student Guide";
  els.guidePurpose.textContent = data.purpose || "";
  els.guideAudience.textContent = data.audience || "Students";
  els.contentsList.innerHTML = currentSections.map((section) => `
    <li><a href="#${escapeHTML(section.id)}">${escapeHTML(section.number ? `${section.number} ` : "")}${escapeHTML(section.title)}</a></li>`).join("");
  els.sectionContainer.innerHTML = currentSections.map(renderSection).join("");
};

const parseInput = () => {
  const raw = els.input.value.trim();
  if (!raw) throw new Error("Paste guide JSON before generating the guide.");
  const data = JSON.parse(raw);
  if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("The JSON must be a single guide object.");
  if (!data.title) throw new Error("The JSON must include a title.");
  return data;
};

const loadSample = () => {
  els.input.value = JSON.stringify(DEFAULT_GUIDE, null, 2);
  renderGuide(DEFAULT_GUIDE);
  setStatus("Sample guide loaded and generated.", "success");
};

const generate = () => {
  try {
    const data = parseInput();
    renderGuide(data);
    setStatus("Guide generated successfully. Use HTML as the primary accessible version, PDF for visual sharing, and DOCX for editing/accessibility review.", "success");
  } catch (error) {
    setStatus(`<strong>Guide could not be generated.</strong><br>${escapeHTML(error.message)}`, "error");
  }
};

const downloadBlob = (content, filename, type) => {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const downloadJSON = () => {
  try {
    const data = parseInput();
    downloadBlob(JSON.stringify(data, null, 2), `${fileSafeName(data.title)}.json`, "application/json;charset=utf-8");
  } catch (error) { setStatus(escapeHTML(error.message), "error"); }
};

const standaloneHtml = async (data, wordMode = false) => {
  renderGuide(data);
  const css = await fetch("styles.css").then((res) => res.ok ? res.text() : "").catch(() => "");
  const wordCss = wordMode ? `
    body { font-family: Arial, Helvetica, sans-serif; color:#1f2937; }
    .app-shell { display:block !important; max-width: 980px !important; }
    .editor-panel, .site-header, .site-footer, .skip-link, .preview-heading-actions { display:none !important; }
    .preview-panel { border:0 !important; box-shadow:none !important; padding:0 !important; }
  ` : "";
  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHTML(data.title || "Student Guide")}</title>
<style>${css}\n${wordCss}</style>
</head>
<body>
<main class="app-shell" style="display:block;max-width:980px;">
<section class="preview-panel">
${els.guide.outerHTML}
</section>
</main>
</body>
</html>`;
};

const downloadHTML = async () => {
  try {
    const data = parseInput();
    const html = await standaloneHtml(data, false);
    downloadBlob(html, `${fileSafeName(data.title)}.html`, "text/html;charset=utf-8");
    setStatus("HTML downloaded. This is the best accessible source version.", "success");
  } catch (error) { setStatus(`<strong>HTML could not be downloaded.</strong><br>${escapeHTML(error.message)}`, "error"); }
};

const downloadWordHTML = async () => {
  try {
    const data = parseInput();
    const html = await standaloneHtml(data, true);
    downloadBlob(html, `${fileSafeName(data.title)}-word-compatible.doc`, "application/msword;charset=utf-8");
    setStatus("Word-compatible HTML downloaded. Open it in Word and save as .docx if you want to keep editing.", "success");
  } catch (error) { setStatus(`<strong>Word HTML could not be downloaded.</strong><br>${escapeHTML(error.message)}`, "error"); }
};

const printGuide = () => {
  try {
    const data = parseInput();
    renderGuide(data);
    setStatus("Use your browser print window to save as PDF. A4 print styling has been applied.", "success");
    window.print();
  } catch (error) { setStatus(escapeHTML(error.message), "error"); }
};

/* DOCX export: no external libraries. Creates an editable Word document with A4 sizing, styles, page breaks, styled tables, and one-cell callout/image/FAQ boxes. */
const wRun = (text = "", options = {}) => {
  const props = [];
  if (options.bold) props.push("<w:b/>");
  if (options.italic) props.push("<w:i/>");
  if (options.color) props.push(`<w:color w:val="${options.color}"/>`);
  if (options.size) props.push(`<w:sz w:val="${options.size}"/>`);
  const rPr = props.length ? `<w:rPr>${props.join("")}</w:rPr>` : "";
  return `<w:r>${rPr}<w:t xml:space="preserve">${escapeXML(text)}</w:t></w:r>`;
};

const wParaRuns = (runs = [], style = "Normal", extraPr = "") => {
  const stylePr = style ? `<w:pStyle w:val="${style}"/>` : "";
  return `<w:p><w:pPr>${stylePr}${extraPr}</w:pPr>${runs.join("")}</w:p>`;
};

const wPara = (text = "", style = "Normal", extraPr = "") => {
  const parts = String(text || "").split(/\n{2,}/).filter(Boolean);
  if (!parts.length) return "";
  return parts.map((part) => wParaRuns([wRun(part)], style, extraPr)).join("");
};

const wPageBreak = () => `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;
const wListPara = (text = "", numId = 1) => wParaRuns([wRun(text)], "ListParagraph", `<w:numPr><w:ilvl w:val="0"/><w:numId w:val="${numId}"/></w:numPr>`);
const wBullet = (items = []) => Array.isArray(items) ? items.map((item) => wListPara(item, 1)).join("") : "";
const wNumbered = (items = []) => Array.isArray(items) ? items.map((item) => wListPara(item, 2)).join("") : "";

const wCell = (content = "", options = {}) => {
  const fill = options.fill ? `<w:shd w:fill="${options.fill}"/>` : "";
  const width = options.width ? `<w:tcW w:w="${options.width}" w:type="dxa"/>` : "";
  const borderVal = options.dashed ? "dashed" : "single";
  const borders = `<w:tcBorders><w:top w:val="${borderVal}" w:sz="12" w:color="1F2937"/><w:left w:val="${borderVal}" w:sz="12" w:color="1F2937"/><w:bottom w:val="${borderVal}" w:sz="12" w:color="1F2937"/><w:right w:val="${borderVal}" w:sz="12" w:color="1F2937"/></w:tcBorders>`;
  return `<w:tc><w:tcPr>${width}${fill}${borders}<w:tcMar><w:top w:w="160" w:type="dxa"/><w:left w:w="180" w:type="dxa"/><w:bottom w:w="160" w:type="dxa"/><w:right w:w="180" w:type="dxa"/></w:tcMar></w:tcPr>${content || wPara(" ")}</w:tc>`;
};

const wBox = (content = "", options = {}) => {
  const width = options.width || "9360";
  const tblLook = `<w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/>`;
  const tblPr = `<w:tblPr><w:tblW w:w="${width}" w:type="dxa"/><w:tblCellMar><w:top w:w="100" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="100" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tblCellMar>${tblLook}</w:tblPr>`;
  return `<w:tbl>${tblPr}<w:tr>${wCell(content, options)}</w:tr></w:tbl>`;
};

const wTip = (tip = "") => tip ? wBox(wParaRuns([wRun("Tip: ", { bold: true }), wRun(tip)], "Normal"), { fill: "FFF8CF" }) : "";
const wImagePlaceholder = (title = "", desc = "") => {
  if (!title && !desc) return "";
  const content = [
    wParaRuns([wRun(`[Insert screenshot/image: ${title || "image placeholder"}]`, { bold: true })], "Normal"),
    desc ? wParaRuns([wRun("Description: ", { bold: true }), wRun(desc)], "Normal") : ""
  ].join("");
  return wBox(content, { fill: "FFFFFF", dashed: true });
};
const wFaq = (faq = {}) => wBox([
  wParaRuns([wRun(`Q. ${faq.question || "Question"}`, { bold: true, size: 28 })], "Normal"),
  wParaRuns([wRun(`A. ${faq.answer || "Answer"}`)], "Normal")
].join(""), { fill: "FFFFFF" });
const wHelp = (items = []) => wBox(wBullet(items), { fill: "FFFFFF" });

const wTable = (headers = [], rows = []) => {
  if (!headers.length || !rows.length) return "";
  const border = `<w:tblBorders><w:top w:val="single" w:sz="12" w:color="1F2937"/><w:left w:val="single" w:sz="12" w:color="1F2937"/><w:bottom w:val="single" w:sz="12" w:color="1F2937"/><w:right w:val="single" w:sz="12" w:color="1F2937"/><w:insideH w:val="single" w:sz="12" w:color="1F2937"/><w:insideV w:val="single" w:sz="12" w:color="1F2937"/></w:tblBorders>`;
  const tblPr = `<w:tblPr><w:tblW w:w="9360" w:type="dxa"/>${border}<w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr>`;
  const cell = (text, header = false) => `<w:tc><w:tcPr><w:tcW w:w="${Math.floor(9360 / headers.length)}" w:type="dxa"/>${header ? `<w:shd w:fill="EAFDF6"/>` : ""}<w:tcMar><w:top w:w="140" w:type="dxa"/><w:left w:w="140" w:type="dxa"/><w:bottom w:w="140" w:type="dxa"/><w:right w:w="140" w:type="dxa"/></w:tcMar></w:tcPr>${wPara(text || " ", header ? "TableHeader" : "Normal")}</w:tc>`;
  const headerRow = `<w:tr>${headers.map((h) => cell(h, true)).join("")}</w:tr>`;
  const bodyRows = rows.map((row) => `<w:tr>${headers.map((h) => cell(row[h] || "")).join("")}</w:tr>`).join("");
  return `<w:tbl>${tblPr}${headerRow}${bodyRows}</w:tbl>`;
};

const sectionToDocx = (section) => {
  let xml = wPara(`${section.number ? `${section.number} ` : ""}${section.title || "Untitled section"}`, "Heading1");
  xml += wPara(section.body || "", "Normal");
  if (section.table) xml += wTable(section.table.headers, section.table.rows);
  if (Array.isArray(section.faqs)) section.faqs.forEach((faq) => { xml += wFaq(faq); });
  if (Array.isArray(section.help)) xml += wHelp(section.help);
  if (Array.isArray(section.subsections)) {
    section.subsections.forEach((sub) => {
      xml += wBox([
        wPara(sub.title || "Untitled section", "Heading2"),
        wPara(sub.body || "", "Normal"),
        wNumbered(sub.instructions || []),
        wBullet(sub.bullets || []),
        wTip(sub.tip || ""),
        wImagePlaceholder(sub.imagePlaceholder || "", sub.imageDescription || "")
      ].join(""), { fill: "FFFFFF" });
    });
  }
  return xml;
};

const buildDocumentXml = (data) => {
  const sections = normaliseSections(data);
  const contentsXml = sections.map((s) => wListPara(`${s.number ? `${s.number} ` : ""}${s.title}`, 2)).join("");
  const titleMeta = wBox([
    wParaRuns([wRun("Audience", { bold: true }), wRun(`\n${data.audience || "Students"}`)], "Normal"),
    wParaRuns([wRun("Format", { bold: true }), wRun("\nStep-by-step guide")], "Normal")
  ].join(""), { fill: "FFFFFF" });
  const body = [
    wPara(data.subtitle || "Student Guide", "Subtitle"),
    wPara(data.title || "Student Guide", "Title"),
    wPara(data.purpose || "", "Lead"),
    titleMeta,
    wPageBreak(),
    wPara("Contents", "Heading1"),
    contentsXml,
    wPageBreak(),
    ...sections.map(sectionToDocx),
    `<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="794" w:right="794" w:bottom="794" w:left="794" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>`
  ].join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}</w:body></w:document>`;
};

const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="22"/><w:color w:val="1F2937"/></w:rPr><w:pPr><w:spacing w:after="150" w:line="276" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="60"/><w:color w:val="1F2937"/></w:rPr><w:pPr><w:spacing w:before="1600" w:after="260"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:caps/><w:spacing w:val="24"/><w:sz w:val="22"/><w:color w:val="1F2937"/></w:rPr><w:pPr><w:spacing w:before="900" w:after="80"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Lead"><w:name w:val="Lead"/><w:basedOn w:val="Normal"/><w:rPr><w:sz w:val="26"/><w:color w:val="4B5563"/></w:rPr><w:pPr><w:spacing w:after="360"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="9"/><w:qFormat/><w:rPr><w:b/><w:sz w:val="34"/><w:color w:val="1F2937"/></w:rPr><w:pPr><w:keepNext/><w:spacing w:before="360" w:after="160"/><w:outlineLvl w:val="0"/><w:pBdr><w:bottom w:val="single" w:sz="12" w:space="4" w:color="1F2937"/></w:pBdr></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="9"/><w:qFormat/><w:rPr><w:b/><w:sz w:val="28"/><w:color w:val="1F2937"/></w:rPr><w:pPr><w:keepNext/><w:spacing w:before="120" w:after="90"/><w:outlineLvl w:val="1"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="TableHeader"><w:name w:val="Table Header"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:color w:val="1F2937"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:style>
</w:styles>`;

const numberingXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="1"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
  <w:abstractNum w:abstractNumId="2"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
  <w:num w:numId="1"><w:abstractNumId w:val="1"/></w:num>
  <w:num w:numId="2"><w:abstractNumId w:val="2"/></w:num>
</w:numbering>`;

const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/></Types>`;
const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;
const docRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/></Relationships>`;

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = ((c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1));
    table[n] = c >>> 0;
  }
  return table;
})();
const crc32 = (bytes) => {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) crc = crcTable[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
};
const u16 = (value) => [value & 255, (value >>> 8) & 255];
const u32 = (value) => [value & 255, (value >>> 8) & 255, (value >>> 16) & 255, (value >>> 24) & 255];
const concatBytes = (arrays) => {
  const total = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  arrays.forEach((arr) => { result.set(arr, offset); offset += arr.length; });
  return result;
};
const zipStore = (files) => {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  files.forEach((file) => {
    const name = encoder.encode(file.name);
    const data = typeof file.content === "string" ? encoder.encode(file.content) : file.content;
    const crc = crc32(data);
    const local = concatBytes([new Uint8Array([
      ...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0),
      ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0)
    ]), name, data]);
    localParts.push(local);
    const central = concatBytes([new Uint8Array([
      ...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(0), ...u16(0),
      ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0), ...u16(0),
      ...u16(0), ...u16(0), ...u32(0), ...u32(offset)
    ]), name]);
    centralParts.push(central);
    offset += local.length;
  });
  const centralStart = offset;
  const central = concatBytes(centralParts);
  const end = new Uint8Array([
    ...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(files.length), ...u16(files.length),
    ...u32(central.length), ...u32(centralStart), ...u16(0)
  ]);
  return concatBytes([...localParts, central, end]);
};

const downloadDOCX = () => {
  try {
    const data = parseInput();
    renderGuide(data);
    const zip = zipStore([
      { name: "[Content_Types].xml", content: contentTypesXml },
      { name: "_rels/.rels", content: relsXml },
      { name: "word/document.xml", content: buildDocumentXml(data) },
      { name: "word/styles.xml", content: stylesXml },
      { name: "word/numbering.xml", content: numberingXml },
      { name: "word/_rels/document.xml.rels", content: docRelsXml }
    ]);
    downloadBlob(new Blob([zip], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }), `${fileSafeName(data.title)}.docx`);
    setStatus("DOCX downloaded. Open in Word, run Accessibility Checker, then adjust any final design details before sharing.", "success");
  } catch (error) {
    setStatus(`<strong>DOCX could not be downloaded.</strong><br>${escapeHTML(error.message)}`, "error");
  }
};

els.loadSample.addEventListener("click", loadSample);
els.generate.addEventListener("click", generate);
els.downloadJson.addEventListener("click", downloadJSON);
els.downloadHtml.addEventListener("click", downloadHTML);
els.print.addEventListener("click", printGuide);
els.downloadDocx.addEventListener("click", downloadDOCX);
els.downloadWordHtml.addEventListener("click", downloadWordHTML);

loadSample();
