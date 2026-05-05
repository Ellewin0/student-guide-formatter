# Student Guide Formatter

This repository is a public-safe GitHub Pages formatter for student-facing step-by-step guides.

The formatter separates **content** from **visual design**:

- `guide-data.json` contains the structured guide content created by your Copilot agent.
- `index.html`, `styles.css`, and `app.js` apply the layout, colours, borders, cards, tables, callouts, and image placeholder styling.

## Files

| File | Purpose |
|---|---|
| `index.html` | Webpage structure |
| `styles.css` | Visual style: colours, borders, spacing, typography, tables, callouts |
| `app.js` | Reads `guide-data.json` and places the content into the page |
| `guide-data.json` | Structured guide content created by your Copilot agent |
| `.nojekyll` | Helps GitHub Pages publish the files cleanly |
| `README.md` | Notes for how to update the guide |

## How to publish with GitHub Pages

1. Create a new public GitHub repository.
2. Upload all files in this folder to the root of the repository.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select:
   - Branch: `main`
   - Folder: `/(root)`
6. Select **Save**.
7. Wait for GitHub Pages to publish the site.

The published URL will usually look like:

```text
https://yourusername.github.io/student-guide-formatter/
```

## How to create a new guide

1. Ask your Copilot agent to create structured guide content as valid JSON.
2. Replace the contents of `guide-data.json` with the new JSON.
3. Commit the change to GitHub.
4. Refresh the GitHub Pages site.

## Copilot agent prompt

Use this prompt with your guide-generation agent:

```text
Create structured guide content for the GitHub Pages guide formatter.

Output clean, valid JSON only. Do not output Markdown, HTML, commentary, or a plain text guide.

The GitHub formatter will apply the visual style, layout, colours, borders, tables, callouts, image placeholders, and typography.

Use only the process information I provide. Do not invent technical steps, support contacts, policy, eligibility rules, or service commitments. Use placeholders where information needs confirmation.

Use Australian English, plain English, inclusive wording, and a student-friendly tone.

Use this JSON structure:
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
[Paste process steps here]
```

## Public safety

Only publish information that is safe to be public on the internet.

Do not publish:
- private student information
- internal-only procedures
- confidential service details
- unpublished policy
- screenshots that reveal private systems or personal data
- restricted contact details or documents

## Editing the visual style

Edit `styles.css` to change:

- colours
- borders
- typography
- spacing
- callout boxes
- table style
- print layout

## Print or save as PDF

Open the published guide and select **Print / Save as PDF**. The print stylesheet removes the page header/footer and formats the guide for printing.
