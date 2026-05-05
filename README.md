# Interactive Student Guide Formatter

This repository contains a public-safe GitHub Pages tool that turns structured guide JSON into a formatted student guide.

## Files

| File | Purpose |
|---|---|
| `index.html` | Webpage structure and interactive controls |
| `styles.css` | Visual design, browser preview styling and improved A4 print/PDF styling |
| `app.js` | Reads JSON, renders the guide, and exports HTML, PDF, DOCX and Word-compatible HTML |
| `guide-data.json` | Optional stored guide JSON if you want a default guide source |
| `sample-guide-data.json` | Public-safe sample JSON |
| `.nojekyll` | Helps GitHub Pages serve static files cleanly |
| `README.md` | Setup and update notes |

## What changed in this version

This version implements the recommended improvements for PDF and Word export:

1. **PDF page breaks fixed**: long section borders no longer split awkwardly across pages. The print stylesheet applies borders to section headings and individual cards instead of one long outer section border.
2. **A4 print layout**: the PDF print CSS now uses A4 with 14 mm margins.
3. **Reduced blank space**: print spacing, padding and margins have been tightened so the PDF is more efficient.
4. **Improved DOCX export**: the Word document now includes A4 page settings, page breaks, heading styles, styled tables, one-cell callout boxes, screenshot placeholder boxes, FAQ boxes and help boxes.
5. **Word-compatible HTML export**: a new **Download Word HTML** button downloads a `.doc` file that opens in Word and preserves more visual styling than the plain DOCX export.
6. **Export roles clarified**: HTML is the primary accessible source, PDF is the visual/shareable version, DOCX is the editable review draft, and Word HTML is the visual Word-friendly bridge.
7. **Accessibility checklist added**: the interface includes a checklist reminding users to check headings, alt text, PDF accessibility and Word accessibility before sharing.

## Publishing with GitHub Pages

1. Create a public GitHub repository.
2. Upload all files to the root of the repository.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select:
   - Branch: `main`
   - Folder: `/(root)`
6. Save.

Your site will usually publish at:

```text
https://yourusername.github.io/repository-name/
```

## Using the formatter

1. Open the GitHub Pages site.
2. Paste valid guide JSON into the text box.
3. Select **Generate guide**.
4. Review the styled preview.
5. Export using one of the options:

| Export | Best use |
|---|---|
| **Download HTML** | Best accessible web/source version |
| **Print / Save PDF** | Best polished printable/shareable version |
| **Download DOCX** | Best editable/accessibility-review draft |
| **Download Word HTML** | Best visual Word-friendly bridge |
| **Download JSON** | Saves the structured guide content |

## Recommended Copilot agent prompt

Use this prompt with your Copilot agent:

```text
Create structured JSON for the interactive GitHub Pages guide formatter.

Output valid JSON only. Do not include Markdown, commentary, code fences, or explanations.

The JSON will be pasted into a browser-based guide formatter that applies the visual style, layout, colours, borders, tables, callout boxes, typography, and image placeholder design.

Use only the process information I provide. Do not invent policy, support contacts, eligibility rules, service commitments, or technical steps. Use clear placeholders where information needs confirmation.

Write in Australian English, plain English, inclusive wording, and a student-friendly tone.

Topic:
[Insert topic]

Audience:
[Insert audience]

Purpose:
[Insert purpose]

Process information:
[Paste steps and notes here]
```

## JSON shape

```json
{
  "title": "Using Dictate in Microsoft Word",
  "subtitle": "Student Guide",
  "audience": "Students",
  "purpose": "Help students use Microsoft Word Dictate to speak ideas into a document.",
  "introduction": {
    "heading": "Introduction to Microsoft Word Dictate",
    "whatIsIt": "...",
    "whyUseIt": "...",
    "imagePlaceholder": "...",
    "imageDescription": "..."
  },
  "gettingStarted": {
    "whatYouNeed": ["..."],
    "beforeYouBegin": "...",
    "tip": "..."
  },
  "steps": [
    {
      "title": "Open Microsoft Word",
      "instructions": ["Open Microsoft Word on your device."],
      "tip": "...",
      "imagePlaceholder": "...",
      "imageDescription": "..."
    }
  ],
  "helpfulTips": [
    { "tip": "Speak naturally", "whyItHelps": "..." }
  ],
  "troubleshooting": [
    { "issue": "Dictate button is unavailable", "whatToTry": "..." }
  ],
  "faqs": [
    { "question": "Do I need to type at all?", "answer": "..." }
  ],
  "whereToGetHelp": ["[Insert confirmed support contact]"]
}
```

## Accessibility notes

- Use the HTML version as the primary accessible source where possible.
- Check exported PDFs with an accessibility checker before publishing.
- Open DOCX files in Microsoft Word and run **Review → Check Accessibility**.
- Replace screenshot placeholders with actual images and meaningful alternative text before final publication.
- Do not commit private, confidential, student-specific or internal-only content to a public GitHub repository.
