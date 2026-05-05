# Interactive Student Guide Formatter

This repository contains a public-safe GitHub Pages tool that formats structured student guide JSON into a styled guide preview.

The tool is designed for this workflow:

1. Use your agent to create structured guide JSON.
2. Open the GitHub Pages formatter.
3. Paste the JSON into the text box.
4. Select **Generate guide**.
5. Export the guide as HTML, PDF, JSON, or DOCX.

## Files

| File | Purpose |
|---|---|
| `index.html` | Webpage structure and editing interface |
| `styles.css` | Visual style: colours, borders, typography, spacing, tables, callouts, and print styling |
| `app.js` | Reads pasted JSON, renders the guide, and creates HTML/PDF/DOCX export options |
| `sample-guide-data.json` | Public-safe sample guide JSON for testing |
| `guide-data.json` | Optional sample/current guide JSON for compatibility with the earlier non-interactive version |
| `.nojekyll` | Helps GitHub Pages publish static files cleanly |
| `README.md` | Setup and update instructions |

## GitHub Pages setup

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
5. Select **Save**.
6. Wait for GitHub to publish the site.

Your site URL will usually look like:

```text
https://yourusername.github.io/repository-name/
```

## How to use the formatter

1. Open the published GitHub Pages site.
2. Paste guide JSON into the **Guide JSON** box.
3. Select **Generate guide**.
4. Review the styled guide preview.
5. Use one of the export options:
   - **Download JSON**: saves the current JSON.
   - **Download HTML**: saves a standalone HTML file of the formatted guide.
   - **Print / Save PDF**: opens the browser print dialog. Choose **Save as PDF**.
   - **Download DOCX**: creates a basic editable Word document from the JSON.

## DOCX export notes

The DOCX option is included for editing and accessibility review. It creates a real `.docx` file in the browser using the structured JSON.

The DOCX export is best used as an editable draft. Always open it in Word and check:

- heading structure
- table formatting
- reading order
- image placeholders and descriptions
- spacing and page breaks
- accessibility checker results

The web/PDF version will usually preserve the visual style more closely than the DOCX export.

## Privacy and public-safe use

This is a client-side browser tool. The pasted JSON is processed in the browser.

However, because GitHub Pages is public, do not commit private guide data to the repository. Avoid publishing:

- private student information
- internal-only procedures
- confidential support processes
- non-public contact pathways
- screenshots from restricted systems
- personal or sensitive information

Use placeholders where information needs confirmation.

## Recommended agent prompt

Use this prompt with your guide content agent:

```text
Create structured JSON for the interactive GitHub Pages guide formatter.

Output valid JSON only. Do not include Markdown, commentary, code fences, or explanations.

The JSON will be pasted into a browser-based guide formatter that applies the visual style, layout, colours, borders, tables, callout boxes, typography, and image placeholder design.

Use only the process information I provide. Do not invent policy, support contacts, eligibility rules, service commitments, or technical steps. Use clear placeholders where information needs confirmation.

Write in Australian English, plain English, inclusive wording, and a student-friendly tone.

Use this schema:
{
  "title": "",
  "subtitle": "Student Guide",
  "audience": "",
  "purpose": "",
  "introduction": {
    "heading": "",
    "whatIsIt": "",
    "whyUseIt": "",
    "imagePlaceholder": "",
    "imageDescription": ""
  },
  "gettingStarted": {
    "whatYouNeed": [],
    "beforeYouBegin": "",
    "tip": ""
  },
  "steps": [
    {
      "number": "",
      "title": "",
      "instructions": [],
      "tip": "",
      "imagePlaceholder": "",
      "imageDescription": ""
    }
  ],
  "helpfulTips": [
    {
      "tip": "",
      "whyItHelps": ""
    }
  ],
  "troubleshooting": [
    {
      "issue": "",
      "whatToTry": ""
    }
  ],
  "faqs": [
    {
      "question": "",
      "answer": ""
    }
  ],
  "whereToGetHelp": []
}

Topic:
[Insert topic]

Audience:
[Insert audience]

Purpose:
[Insert purpose]

Process information:
[Paste steps and notes here]
```
