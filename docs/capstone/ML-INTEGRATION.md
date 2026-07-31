# Machine Learning Internship Integration

## Purpose

The folder [`projects/ml-internship/`](../../projects/ml-internship/) preserves
the complete public
contents of
[`tristanlgb/flyrank-ml-internship`](https://github.com/tristanlgb/flyrank-ml-internship)
inside the broader FlyRank capstone repository.

It was imported from source commit
`d559495d12825913173c5d1f67a4e63b71c5610e`. Keeping the source commit visible
makes the snapshot traceable and prevents later changes in the standalone
repository from being silently presented as part of this capstone.

## What is included

- Three introductory Colab-ready notebooks.
- Assignment notebook skeletons for ML-02 through ML-12.
- A Python reference pipeline for feature preparation, baseline scoring,
  model training, evaluation, charts, and a PDF report.
- The approved anonymized starter CSV.
- Generated example charts, a refresh queue sample, and a model report.
- Data dictionary, research framework, tooling guide, setup guide, and track
  skills.
- The original code license and separate dataset-use agreement.

## What the model demonstrates

The reference pipeline frames content refresh as a ranking and decision-support
problem. On the bundled 30,000-row anonymized sample, the generated report
compares transparent baseline rules with decision-tree, logistic-regression,
and random-forest models. The report selects the random forest by
Precision@50, where the recorded example result is `0.740` versus `0.240` for
the baseline.

Those metrics describe the bundled sample and recorded pipeline output. They
do not prove future production performance, causal refresh impact, or an
ability to predict a search engine’s algorithm.

## Honest completion boundary

The standalone repository is primarily the FlyRank ML starter workspace. Its
reference pipeline and example outputs are runnable, but several files under
`projects/ml-internship/work/notebooks/` are assignment skeletons rather than completed
personal submissions. The file
`projects/ml-internship/submission/paper_url.txt` still contains a placeholder.

For that reason, the portfolio describes this integration as an ML workspace
and reproducible reference pipeline, not as a completed ML internship or
finished research paper. Each assignment should be marked complete only after
its notebook contains Tristan’s real analysis and the required portal evidence
exists.

## Data and safety boundary

The code is covered by the imported
[`projects/ml-internship/LICENSE`](../../projects/ml-internship/LICENSE). The bundled dataset is
governed separately by
[`projects/ml-internship/DATA_USE.md`](../../projects/ml-internship/DATA_USE.md).

The dataset contains pseudonymized identifiers and observed numeric or
categorical metrics. It must remain decision-support material:

- do not add private client exports;
- do not attempt to reverse pseudonymized identifiers;
- do not use client IDs as model features;
- do not claim causal effects without an appropriate design;
- do not publish secrets or Hugging Face tokens;
- describe findings as observed, measured, directional, or requiring human
  review.

## Why it lives in a separate folder

The frontend capstone uses Node.js, React, TypeScript, Vite, and Vercel. The ML
workspace uses Python and notebook tooling. Keeping it under
`projects/ml-internship/` avoids dependency collisions, preserves the original
structure, keeps the data-use notice close to the dataset, and lets reviewers
run either project without installing the other project’s toolchain.

The nested `.github/workflows/` directory is preserved for provenance but is
not treated by GitHub as a root workflow directory in this repository.

## Running the reference pipeline

```bash
cd projects/ml-internship
python -m venv .venv
python -m pip install -r requirements.txt
python scripts/run_all.py
```

Generated heavy artifacts remain subject to the imported `.gitignore` rules.
Do not force-add private or unapproved datasets to reproduce a result.

## Integration verification

- Frontend TypeScript check: passed after adding the ML project card.
- Frontend automated tests: 7 passed.
- Frontend production build: passed.
- Imported file scan: 63 files, no committed credential value detected.
- Python pipeline rerun: not executed in the integration environment because
  Python is not installed on this Windows machine.

The generated report and charts are preserved from the source repository, but
the missing local Python runtime is stated explicitly rather than treating the
copied outputs as a fresh rerun. A reviewer can reproduce them with the
commands above or open the Colab notebooks from the standalone repository.

## Portfolio connection

The production portfolio includes the **Refresh Opportunity Model** in Selected
Work and links back to the standalone ML repository and generated model report.
This presents the work without pretending that Python code is part of the
browser bundle or that every course notebook is finished.
