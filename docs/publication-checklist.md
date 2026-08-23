# Public release checklist

## Authority and ownership

- [ ] Written company confirmation covers the PepperBall name, generalized case
      study, synthetic demo, and selected screenshots.
- [ ] Thomas Ryan confirms the final repository owner and contact link.
- [ ] Final license is selected for the independently written demo.

## Content boundary

- [ ] Repository was created from a blank history, not filtered from production.
- [ ] No production code, reports, templates, screenshots, or exports are present.
- [ ] No credentials, emails, private URLs, paths, IDs, hashes, account names,
      employee names, or infrastructure identities are present.
- [ ] All sample names, periods, and values are synthetic.
- [ ] Claims match `docs/claim-boundaries.md`.

## Verification

- [ ] Python unit tests pass.
- [ ] Public safety scan passes the complete working tree and Git history.
- [ ] Site lint and production build pass.
- [ ] Both workbook sheets were rendered and visually reviewed.
- [ ] PDF was rendered and visually reviewed.
- [ ] Links and downloadable assets work.

## Publication

- [ ] Reviewer approves the exact commit recorded in the release manifest.
- [ ] GitHub secret scanning and push protection are enabled.
- [ ] Repository is inspected while signed out after publication.
- [ ] Downloaded source archive is rescanned.
- [ ] Portfolio, resume, and professional profile link to the same approved URL.
