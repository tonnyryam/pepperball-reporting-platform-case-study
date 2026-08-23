'use client';

import { useState } from 'react';
import Image from 'next/image';

const scenarios = [
  {
    label: 'Late source',
    status: 'Recovered',
    summary: 'The obligation stays pending until qualified evidence arrives, then refreshes the same canonical output.',
    steps: ['Expected output recorded', 'Source remains incomplete', 'Qualified evidence arrives', 'Same item advances once', 'Exact readback certifies'],
    writes: '1 governed write',
  },
  {
    label: 'Lost response',
    status: 'Settled',
    summary: 'An ambiguous network response never authorizes a second write. Remote state is resolved with GET only.',
    steps: ['Conditional write accepted', 'Response becomes ambiguous', 'Candidate identity retained', 'GET reads remote state', 'Exact match settles'],
    writes: '0 retry writes',
  },
  {
    label: 'Equivalent replay',
    status: 'No-op',
    summary: 'Capture-only metadata can change while governed business material stays equivalent, so publication is skipped.',
    steps: ['Due slot observed', 'Material identity recomputed', 'Existing identity matches', 'Readback remains exact', 'No mutation issued'],
    writes: '0 writes',
  },
  {
    label: 'Release regression',
    status: 'Restored',
    summary: 'A failed successor drains before the exact rollback resumes, preserving a single production writer.',
    steps: ['Successor isolated', 'Guard detects regression', 'Writer drains', 'Exact rollback activates', 'Topology rechecked'],
    writes: '1 active writer',
  },
];

const outcomes = [
  ['Deterministic products', 'Two-sheet reports retain client-independent stored values and explicit missing-versus-zero semantics.'],
  ['Same-item publication', 'Qualified late evidence advances the canonical output instead of creating alternate files.'],
  ['Accepted-write recovery', 'Lost responses settle through exact GET readback without issuing a second PUT.'],
  ['Bounded self-healing', 'Repair is fair, durable, and terminal security or ownership holds remain protected.'],
  ['One-writer delivery', 'Immutable successors, serialized handoffs, and exact rollback avoid overlapping publishers.'],
  ['Evidence-bound claims', 'Tests, shadows, readback, and natural operation are distinguished from plans or inferred impact.'],
];

export default function Home() {
  const [selected, setSelected] = useState(0);
  const scenario = scenarios[selected];

  return (
    <main>
      <section className="hero" aria-labelledby="page-title">
        <nav className="nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="PepperBall reliability case study home">
            PB<span>/</span>Reliability
          </a>
          <div className="nav-links">
            <a href="#system">System</a>
            <a href="#lab">Recovery lab</a>
            <a href="#outcomes">Outcomes</a>
          </div>
        </nav>

        <div className="hero-grid" id="top">
          <div>
            <p className="eyebrow">PepperBall engineering case study</p>
            <h1 id="page-title">Reports that recover without writing twice.</h1>
            <p className="lede">
              Thomas Ryan evolved a document-driven manufacturing reporting workflow into a
              deterministic, one-writer system with durable reconciliation, exact readback,
              bounded self-healing, and rollback-safe releases.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#lab">Try the recovery lab</a>
              <a className="button secondary" href="/Thomas-Ryan-PepperBall-Case-Study.pdf">Download one-page case study</a>
            </div>
          </div>

          <aside className="proof-panel" aria-label="Reliability invariants">
            <p className="panel-label">Release invariants</p>
            <dl>
              <div><dt>Writer topology</dt><dd>Exactly one</dd></div>
              <div><dt>Equivalent replay</dt><dd>Zero writes</dd></div>
              <div><dt>Ambiguous response</dt><dd>GET-only settlement</dd></div>
              <div><dt>Regression response</dt><dd>Exact rollback</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="section system-section" id="system">
        <div className="section-heading">
          <p className="eyebrow">The system</p>
          <h2>From changing inputs to governed outputs.</h2>
          <p>
            Every source-to-output obligation has a durable identity. Publication is conditional,
            verification is exact, and recovery reuses the same scheduler, queue, and item.
          </p>
        </div>
        <div className="flow" role="list" aria-label="Reporting reliability flow">
          {['Source evidence', 'Normalized facts', 'Expected output', 'Deterministic report', 'Conditional publish', 'Exact readback'].map((step, index) => (
            <div className="flow-step" role="listitem" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="lab-section" id="lab">
        <div className="section lab-inner">
          <div className="section-heading light">
            <p className="eyebrow">Interactive recovery lab</p>
            <h2>Change the failure. Keep the invariants.</h2>
            <p>This public simulation uses synthetic states and contains no production connection or data.</p>
          </div>

          <div className="scenario-tabs" role="tablist" aria-label="Recovery scenarios">
            {scenarios.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={selected === index}
                aria-controls="scenario-panel"
                className={selected === index ? 'selected' : ''}
                onClick={() => setSelected(index)}
                key={item.label}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="scenario-panel" id="scenario-panel" role="tabpanel" aria-live="polite">
            <div className="scenario-copy">
              <div className="status-line"><span>{scenario.status}</span><strong>{scenario.writes}</strong></div>
              <h3>{scenario.label}</h3>
              <p>{scenario.summary}</p>
            </div>
            <ol className="scenario-steps">
              {scenario.steps.map((step, index) => (
                <li key={step}><span>{index + 1}</span><strong>{step}</strong></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section" id="outcomes">
        <div className="section-heading">
          <p className="eyebrow">Verified engineering outcomes</p>
          <h2>Correctness was measured at the boundary that matters.</h2>
          <p>
            These are engineering outcomes backed by tests, output-suppressed shadows, exact
            readback, and natural operation. They are not claims of blanket business accuracy or
            realized financial impact.
          </p>
        </div>
        <div className="outcome-grid">
          {outcomes.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="artifact-section" aria-labelledby="artifact-title">
        <div className="section artifact-grid">
          <div className="artifact-copy">
            <p className="eyebrow">Synthetic report artifact</p>
            <h2 id="artifact-title">A safe output you can inspect.</h2>
            <p>
              The downloadable workbook mirrors the public reliability story with two visible
              sheets, formula-driven summary values, an auditable recovery trace, and synthetic
              identifiers throughout.
            </p>
            <a className="button primary" href="/synthetic-reliability-report.xlsx">Download the workbook</a>
          </div>
          <figure>
            <Image
              src="/synthetic-report-summary.png"
              width={2172}
              height={1097}
              alt="Synthetic spreadsheet summary showing two governed writes, zero equivalent replay writes, final remote version two, and zero overlapping writers"
            />
            <figcaption>Executive Summary - generated entirely from synthetic recovery events.</figcaption>
          </figure>
        </div>
      </section>

      <section className="role-section">
        <div className="section role-grid">
          <div>
            <p className="eyebrow">Role and ownership</p>
            <h2>Forward-deployed engineering across product, data, and operations.</h2>
          </div>
          <div className="role-copy">
            <p>
              Thomas set product goals, business definitions, safety invariants, release
              priorities, acceptance criteria, and owner-only decisions. Codex-assisted execution
              accelerated analysis, implementation, testing, evidence collection, and documentation
              under that direction.
            </p>
            <p>
              The public demo is an independently written teaching model. It does not contain the
              production implementation, customer data, private identifiers, credentials, or report
              templates.
            </p>
            <div className="role-actions">
              <a className="text-link" href="/synthetic-reliability-report.xlsx">Download synthetic workbook</a>
              <a className="text-link" href="#top">Back to top</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div>
          <strong>PepperBall reporting reliability</strong>
          <p>Sanitized portfolio case study by Thomas Ryan.</p>
        </div>
        <p className="footer-note">Independent portfolio material. Not an official PepperBall product.</p>
      </footer>
    </main>
  );
}
