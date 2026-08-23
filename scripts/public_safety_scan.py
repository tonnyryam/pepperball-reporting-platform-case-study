"""Fail closed when a public portfolio tree contains private-material markers."""

from __future__ import annotations

import argparse
from pathlib import Path
import re
import subprocess
import sys
import zipfile


ROOT = Path(__file__).resolve().parents[1]
SELF = Path(__file__).resolve()
SKIP_DIRS = {
    ".git",
    ".next",
    ".vinext",
    ".wrangler",
    "dist",
    "node_modules",
    "output",
    "outputs",
    "tmp",
    "work",
}
TEXT_SUFFIXES = {
    ".cff",
    ".css",
    ".html",
    ".js",
    ".json",
    ".jsx",
    ".md",
    ".mjs",
    ".py",
    ".toml",
    ".ts",
    ".tsx",
    ".txt",
    ".yaml",
    ".yml",
}
SKIP_TEXT_FILES = {"package-lock.json"}
FORBIDDEN_FILENAMES = {
    ".env",
    "credentials.json",
    "id_rsa",
    "id_ed25519",
}
FORBIDDEN_SUFFIXES = {".key", ".p12", ".pfx", ".pem", ".xlsm", ".zip"}


PATTERNS = [
    ("Windows absolute path", re.compile(r"\b[A-Za-z]:\\")),
    ("email address", re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I)),
    ("GUID", re.compile(r"\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b", re.I)),
    ("private deployment digest", re.compile(r"sha" + r"256:[0-9a-f]{24,}", re.I)),
    ("long hexadecimal identifier", re.compile(r"\b[0-9a-f]{40,}\b", re.I)),
    ("credential assignment", re.compile(r"\b(password|client[_-]?secret|api[_-]?key|access[_-]?token)\s*[:=]\s*[^\s,}]+", re.I)),
    ("private account", re.compile(r"reports" + r"@pepperball\.net", re.I)),
    ("private portal host", re.compile(r"sharepoint" + r"\.com", re.I)),
    ("private worker identity", re.compile(r"pepperball-worker" + r"--", re.I)),
    ("private API identity", re.compile(r"pepperball-api" + r"--", re.I)),
    ("private evidence path", re.compile(r"docs[\\/]safe_now", re.I)),
    ("private handoff identity", re.compile(r"final_" + r"20\d{6}", re.I)),
    ("local authority artifact", re.compile(r"\.codex-v\d+", re.I)),
    ("cloud subscription path", re.compile(r"/subscriptions/[0-9a-f-]+", re.I)),
]

APPROVED_PUBLIC_TEXT = (
    "tommyryan.sf415@gmail.com",
)


def _excluded(path: Path) -> bool:
    try:
        relative = path.relative_to(ROOT)
    except ValueError:
        return True
    return any(part in SKIP_DIRS for part in relative.parts)


def _scan_text(label: str, text: str) -> list[str]:
    # The Sites scaffold uses this documented all-zero local database placeholder.
    text = text.replace("00000000-0000-4000-8000-000000000000", "")
    # Public contact data is deliberately allowlisted one value at a time. All
    # other email addresses still fail closed.
    for approved in APPROVED_PUBLIC_TEXT:
        text = text.replace(approved, "")
    findings: list[str] = []
    for description, pattern in PATTERNS:
        match = pattern.search(text)
        if match:
            line = text.count("\n", 0, match.start()) + 1
            findings.append(f"{label}:{line}: {description}")
    return findings


def _scan_working_tree() -> tuple[int, list[str]]:
    scanned = 0
    findings: list[str] = []
    for path in ROOT.rglob("*"):
        if not path.is_file() or _excluded(path):
            continue
        relative = path.relative_to(ROOT)
        if path.name in FORBIDDEN_FILENAMES or path.suffix.lower() in FORBIDDEN_SUFFIXES:
            findings.append(f"{relative}: forbidden public artifact type")
            continue
        if path.resolve() == SELF or path.name in SKIP_TEXT_FILES:
            continue
        if path.suffix.lower() in TEXT_SUFFIXES:
            text = path.read_text(encoding="utf-8", errors="replace")
            findings.extend(_scan_text(str(relative), text))
            scanned += 1
        elif path.suffix.lower() == ".xlsx":
            with zipfile.ZipFile(path) as workbook:
                text = "\n".join(
                    workbook.read(name).decode("utf-8", errors="replace")
                    for name in workbook.namelist()
                    if name.endswith(".xml")
                )
            findings.extend(_scan_text(str(relative), text))
            scanned += 1
        elif path.suffix.lower() == ".pdf":
            # Binary stream bytes are not reliable text and can create random
            # pattern matches. PDF content is covered by its reviewed source,
            # separate text extraction, and mandatory rendered-page inspection.
            continue
    return scanned, findings


def _scan_git_history() -> tuple[int, list[str]]:
    if not (ROOT / ".git").exists():
        return 0, []
    listed = subprocess.run(
        ["git", "rev-list", "--objects", "--all"],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    ).stdout.splitlines()
    scanned = 0
    findings: list[str] = []
    for line in listed:
        parts = line.split(" ", 1)
        if len(parts) != 2:
            continue
        object_id, path_text = parts
        path = Path(path_text)
        if path.name in SKIP_TEXT_FILES or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        if path.as_posix() == "scripts/public_safety_scan.py":
            continue
        blob = subprocess.run(
            ["git", "cat-file", "-p", object_id],
            cwd=ROOT,
            check=True,
            capture_output=True,
        ).stdout
        if len(blob) > 2_000_000:
            continue
        findings.extend(_scan_text(f"history:{path_text}@{object_id[:10]}", blob.decode("utf-8", errors="replace")))
        scanned += 1
    return scanned, findings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--skip-history", action="store_true", help="scan only the working tree")
    args = parser.parse_args()

    working_count, findings = _scan_working_tree()
    history_count = 0
    if not args.skip_history:
        history_count, history_findings = _scan_git_history()
        findings.extend(history_findings)

    if findings:
        print("Public safety scan refused the release:", file=sys.stderr)
        for finding in sorted(set(findings)):
            print(f"- {finding}", file=sys.stderr)
        return 1

    print(
        f"Public safety scan passed: {working_count} working-tree files and "
        f"{history_count} historical text objects checked."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
