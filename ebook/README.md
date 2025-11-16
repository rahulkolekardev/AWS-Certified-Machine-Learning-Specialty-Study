# AWS Certified Machine Learning – Specialty Ebook

This folder contains a static, offline-friendly HTML ebook covering key AWS AI/ML services and related infrastructure for the **AWS Certified Machine Learning – Specialty** exam.

## Structure

- `index.html` – landing page and overview.
- `toc.html` – table of contents grouped by ML pipeline role.
- `cheat-sheet.html` – quick comparison of services and exam one-liners.
- `practice-questions.html` – practice questions with answers and explanations.
- `glossary.html` – definitions of common ML and AWS terms.
- `about.html` – license, attribution, and update guidance.
- `services/` – per-service pages (one HTML file per service).
- `scripts/` – client-side JavaScript (navigation, search, syntax highlighting stub, search index).
- `styles/` – CSS for screen and print.
- `assets/` – diagrams or images (if any).

## Sources

Content is paraphrased and summarized from:

- Official AWS service documentation (for example, “What is Amazon SageMaker?”).
- AWS blogs and whitepapers.
- AWS re:Invent sessions and workshops.

Each service page includes a citation line with links to canonical AWS documentation. Short quotations, if present, are limited to 25 words and attributed.

Because this project was built in an offline environment, pages are based on the latest AWS documentation known to the model at training time, not a live web crawl. Always verify details against the current docs at <https://docs.aws.amazon.com/>.

## Running locally

Serve the ebook over HTTP to ensure the search index is accessible:

```bash
cd ebook
python3 -m http.server 8000
```

Then open <http://localhost:8000/index.html> in a browser.

## Updating content

1. Open the corresponding HTML file in `services/` or the relevant global page.
2. Compare the content to the latest AWS documentation.
3. Update summaries, examples, and links as needed.
4. Update the citation line date for the page.
5. Rebuild the package:

   ```bash
   cd ..
   ./build.sh
   ```

## License

The compiled ebook (HTML, CSS, JS, and practice questions) is licensed under **CC BY-SA 4.0**. See `LICENSE.txt` for details.

This license applies only to the original explanatory content in this repository, not to AWS documentation itself or third-party libraries.

