# AWS Certified Machine Learning – Specialty Offline Ebook

Static, offline-friendly reference content for the **AWS Certified Machine Learning – Specialty** (MLS-C01) exam. The `ebook/` directory hosts HTML pages covering 35 AWS AI/ML services, architecture patterns, best practices, 50 exam-style practice questions, a glossary, cheat sheet, and a client-side search experience—everything you need to review without an internet connection.

## Highlights
- **Per-service deep dives** – Each AWS service listed in the exam guide has its own page with summaries, ML pipeline positioning, diagrams, CLI/Boto3 snippets, cost/perf tips, and exam reminders with citations back to the official docs.
- **Global study aids** – Landing page, grouped table of contents, practice questions, glossary, and cheat sheet pages make it easy to switch between conceptual review and quick recall.
- **Offline search** – `scripts/main.js` loads `scripts/search-index.json` to deliver instant keyword search with basic highlighting—no external dependencies.
- **Accessible layout** – Responsive CSS, high-contrast themes, breadcrumbs, skip-friendly nav, and dedicated `styles/print.css` for PDF export.
- **Verified build artifact** – `build.sh` lints HTML, checks local links, emits `manifest-sha256.txt`, and packages everything into `aws-ml-ebook.zip` for distribution.

## Repository layout

```text
.
├── ebook/
│   ├── index.html                # Homepage + study instructions
│   ├── toc.html                  # Pipeline-grouped table of contents
│   ├── cheat-sheet.html          # One-line comparisons and exam traps
│   ├── practice-questions.html   # 50 multiple-choice questions & explanations
│   ├── glossary.html             # Common ML and AWS term definitions
│   ├── about.html                # Sources, attribution, update workflow
│   ├── search.html               # Dedicated search UI (mirrors top-nav panel)
│   ├── services/                 # 35 per-service pages (e.g., amazon-sagemaker.html)
│   ├── scripts/
│   │   ├── main.js               # Nav + TOC toggles + search logic
│   │   ├── prism.js              # Lightweight code-block styling helper
│   │   └── search-index.json     # Metadata for client-side search
│   ├── styles/
│   │   ├── main.css              # Layout, typography, dark-on-light palette
│   │   └── print.css             # Print/PDF overrides
│   ├── assets/                   # Inline SVGs or static diagrams (if any)
│   ├── LICENSE.txt               # CC BY-SA 4.0 terms for the ebook content
│   └── README.md                 # Folder-level usage notes
├── build.sh                      # Validates HTML, checks links, builds ZIP + manifest
├── aws-ml-ebook.zip              # Latest packaged release (ebook + manifest)
└── manifest-sha256.txt           # Hashes for every file under ebook/
```

## Service coverage
The per-service pages span the AWS offerings most often seen on the exam:

- **Data ingestion & streaming** – Amazon Kinesis Data Streams, Kinesis Data Firehose, Amazon Managed Service for Apache Flink, AWS IoT Greengrass.
- **Lake & storage foundation** – Amazon S3, AWS Glue, AWS Lake Formation, Amazon EBS/EFS/FSx.
- **Analytics & querying** – Amazon EMR, Amazon Athena, Amazon Redshift, Amazon OpenSearch Service, Amazon QuickSight.
- **ML build & deployment** – Amazon SageMaker, Amazon Bedrock, Amazon Q, AWS Batch, Amazon EC2/ECR/ECS/EKS, AWS Fargate.
- **AI APIs & data extraction** – Amazon Comprehend, Rekognition, Transcribe, Polly, Translate, Textract, Amazon Mechanical Turk.
- **Networking, security, and monitoring** – Amazon VPC, AWS IAM, Amazon CloudWatch, AWS CloudTrail.

Every page ends with a “Source” line referencing the AWS documentation URL and the date of the content snapshot.

## Getting started
1. Clone or download the repository.
2. Serve the ebook locally (required for search index fetches):
   ```bash
   python3 -m http.server --directory ebook 8000
   # Open http://localhost:8000/index.html
   ```
3. Navigate through the top bar (Home, TOC, Practice Questions, Glossary, Cheat Sheet, Search, About) or use `search.html` to jump directly to a topic.

Because everything is static, you can also copy the `ebook/` folder onto removable media once built.

## Building & packaging
The repo includes a reproducible bundling flow:

```bash
./build.sh
```

The script assumes GNU coreutils, `python3`, and `zip` are available. It performs four steps:

1. Verify that every HTML file inside `ebook/` declares a `<title>` tag.
2. Parse local links and ensure each target exists (basic broken-link detection).
3. Generate `manifest-sha256.txt`, containing the hash of each file under `ebook/`.
4. Package `ebook/` plus the manifest into `aws-ml-ebook.zip`.

Validate a release by running `sha256sum -c manifest-sha256.txt` and/or inspecting the ZIP (`unzip -l aws-ml-ebook.zip`). Keep the ZIP and manifest together when publishing so others can verify integrity.

## Updating content
- **Refresh a service page** – Edit the relevant file under `ebook/services/`. Update the citation line with the current AWS docs URL and fetch date. Keep quotations ≤25 words.
- **Add facts to summaries** – Use official AWS documentation, AWS blogs, or re:Invent talks only; paraphrase when possible.
- **Update search metadata** – Mirror any new or renamed pages inside `scripts/search-index.json` with an updated summary/keywords entry.
- **Practice questions** – Modify `practice-questions.html`. Keep the total between 50–100 questions and include the answer/explanation block for each domain section.
- **Cheat sheet or glossary** – Ensure new entries remain concise and link back to the primary service page where possible.

After edits, rerun `./build.sh` before committing to guarantee the validator and packaging step still succeed.

## Attribution & licensing
The explanatory text, diagrams, and practice content are licensed under **Creative Commons Attribution-ShareAlike 4.0** (see `ebook/LICENSE.txt`). AWS, Amazon Web Services, and all related trademarks remain the property of Amazon Web Services, Inc. or its affiliates. This repository is an independent study aid and is not endorsed by AWS.

Each HTML page cites the AWS documentation or blog posts it summarizes. When contributing, keep those citations current and prefer linking to service home pages (e.g., `https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html`).

## Contributing
Contributions are welcome! Suggested workflow:

1. Fork the repository and create a feature branch.
2. Make your content or styling changes under `ebook/`.
3. Update `scripts/search-index.json` if you add or rename pages.
4. Run `./build.sh` and ensure it completes without errors.
5. Commit, push, and open a pull request summarizing the change set and citing new AWS sources.

Please keep the tone educational, limit verbatim quotes to ≤25 words with explicit attribution, and maintain accessibility features when editing layout or navigation.
