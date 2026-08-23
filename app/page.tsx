'use client';

import { useState } from 'react';
import Image from 'next/image';

const audiences = [
  {
    label: 'Overview',
    kicker: 'The whole system in one sentence',
    headline: 'A governed path from changing documents to trusted operational reports.',
    proof: 'The platform connects source discovery, governed facts, four workbook families, canonical publication, read-only experiences, self-healing, and rollback-safe delivery.',
    points: ['End-to-end ownership', 'Deterministic outputs', 'Safe automatic recovery'],
  },
  {
    label: 'Recruiters',
    kicker: 'Role and scope',
    headline: 'Forward-deployed engineering across product, data, cloud, and operations.',
    proof: 'Thomas owned problem framing, business rules, acceptance criteria, production diagnosis, release decisions, reliability strategy, evidence, and handoff.',
    points: ['May-August 2026', 'Production-facing internship', 'Technical and operational ownership'],
  },
  {
    label: 'Leaders',
    kicker: 'Operational value',
    headline: 'Make missing, stale, duplicate, and ambiguous output states explainable.',
    proof: 'Independent expectation accounting reveals missing identities, bounded repair protects terminal work, and exact rollback preserves the serving system when a successor regresses.',
    points: ['Lower silent-failure risk', 'Zero planned outage releases', 'Evidence-bound decisions'],
  },
  {
    label: 'Engineers',
    kicker: 'Technical depth',
    headline: 'Semantic idempotency, conditional writes, exact readback, and one writer.',
    proof: 'Material identity excludes capture-only churn, accepted-write ambiguity settles through GET, and all repair reuses the canonical schedulers and publisher.',
    points: ['Medallion lineage', 'Raw workbook certification', 'Durable recovery state'],
  },
  {
    label: 'Operations',
    kicker: 'What users experience',
    headline: 'Canonical reports refresh when qualified evidence arrives - without duplicate files.',
    proof: 'Health views explain waiting and terminal states, human-owned work remains protected, and late evidence advances the approved item at most once.',
    points: ['Four report families', 'Same-item refresh', 'Readable health status'],
  },
];

const systemSteps = [
  ['01', 'Discover', 'Bounded, version-aware cloud-document intake separates current changes from historical reconciliation.'],
  ['02', 'Govern facts', 'Immutable originals flow through normalized and current business facts with missing kept distinct from zero.'],
  ['03', 'Account', 'Every qualified source-to-report obligation receives durable expected, candidate, publication, and readback state.'],
  ['04', 'Render', 'Four report families produce deterministic two-sheet workbooks with stored values, lineage, and governed semantics.'],
  ['05', 'Publish', 'Materially new candidates advance one canonical item through a conditional write followed by exact GET readback.'],
  ['06', 'Experience', 'A read-only API, portal, assistant summaries, and report doctor expose current state without becoming another writer.'],
  ['07', 'Repair', 'Fair, bounded reconciliation reuses the same schedulers and publisher while terminal and protected holds remain immutable.'],
  ['08', 'Release', 'Immutable successors shadow without output, hand off one writer, and restore the exact predecessor on regression.'],
];

const capabilityGroups = [
  {
    title: 'Data foundation',
    tag: 'Source to governed fact',
    items: ['Document discovery and OCR-assisted intake', 'Immutable source retention', 'Normalized and current fact layers', 'Field-scoped validation and lineage'],
  },
  {
    title: 'Report products',
    tag: 'Four operational families',
    items: ['Shift Draft lifecycle', 'Daily and weekly products', 'Weekly downtime analysis', 'Two visible sheets and stored values'],
  },
  {
    title: 'Reliability control plane',
    tag: 'Correctness under failure',
    items: ['Expected-output accounting', 'Semantic material identity', 'Accepted-write GET settlement', 'Fair bounded repair and backfill'],
  },
  {
    title: 'User and operator surfaces',
    tag: 'Read without widening authority',
    items: ['Governed API and portal', 'Client-independent summaries', 'Report-health doctor', 'Assistant-facing evidence views'],
  },
  {
    title: 'Security and release',
    tag: 'Fail closed, stay available',
    items: ['Least-privilege access gates', 'Protected and terminal outputs', 'One-writer immutable releases', 'Exact rollback and evidence capture'],
  },
  {
    title: 'Prepared extensions',
    tag: 'Explicitly gated',
    items: ['Document-knowledge security gates', 'Privacy-safe interaction telemetry', 'Impact and SLO maturity', 'Owner-controlled activation'],
  },
];

const scenarios = [
  {
    label: 'Late source', status: 'Recovered', writes: '1 governed write',
    summary: 'The obligation stays pending until qualified evidence arrives, then refreshes the same canonical output.',
    steps: ['Expected output recorded', 'Source remains incomplete', 'Qualified evidence arrives', 'Same item advances once', 'Exact readback certifies'],
  },
  {
    label: 'Lost response', status: 'Settled', writes: '0 retry writes',
    summary: 'An ambiguous network response never authorizes a second write. Remote state is resolved with GET only.',
    steps: ['Conditional write accepted', 'Response becomes ambiguous', 'Candidate identity retained', 'GET reads remote state', 'Exact match settles'],
  },
  {
    label: 'Equivalent replay', status: 'No-op', writes: '0 writes',
    summary: 'Capture-only metadata can change while governed business material stays equivalent, so publication is skipped.',
    steps: ['Due slot observed', 'Material identity recomputed', 'Existing identity matches', 'Readback remains exact', 'No mutation issued'],
  },
  {
    label: 'Release regression', status: 'Restored', writes: '1 active writer',
    summary: 'A failed successor drains before the exact rollback resumes, preserving a single production writer.',
    steps: ['Successor isolated', 'Guard detects regression', 'Writer drains', 'Exact rollback activates', 'Topology rechecked'],
  },
];

const outcomes = [
  ['Deterministic products', 'Two-sheet reports retain client-independent stored values and explicit missing-versus-zero semantics.'],
  ['Missing-output detection', 'Independent expectations reveal an absent identity instead of monitoring only files that already exist.'],
  ['Same-item publication', 'Qualified late evidence advances the canonical output instead of creating alternate files.'],
  ['Accepted-write recovery', 'Lost responses settle through exact GET readback without issuing a second PUT.'],
  ['Bounded self-healing', 'Repair is fair and durable while security, ownership, and terminal holds stay protected.'],
  ['One-writer delivery', 'Immutable successors, serialized handoffs, and exact rollback avoid overlapping publishers.'],
];

const timeline = [
  ['Jul 01', 'Authoritative source event'], ['Jul 23', 'Integrated platform baseline'],
  ['Aug 01', 'Recurring orchestration'], ['Aug 09', 'GET-only write recovery'],
  ['Aug 14', 'Closed-loop self-healing'], ['Aug 17', 'Raw workbook correctness'],
  ['Aug 20', 'Expected-output health'], ['Aug 22', 'No-op and Draft recovery'],
];

export default function Home() {
  const [audienceIndex, setAudienceIndex] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const audience = audiences[audienceIndex];
  const scenario = scenarios[scenarioIndex];

  return (
    <main>
      <section className="hero" id="top" aria-labelledby="page-title">
        <nav className="nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top">PB<span>/</span>Platform</a>
          <div className="nav-links">
            <a href="#system">System</a><a href="#capabilities">Capabilities</a>
            <a href="#lab">Recovery lab</a><a href="#evidence">Evidence</a>
          </div>
        </nav>
        <div className="hero-grid">
          <div>
            <p className="eyebrow">PepperBall engineering case study</p>
            <h1 id="page-title">Operational reports that explain and repair themselves.</h1>
            <p className="lede">Thomas Ryan evolved a document-driven manufacturing workflow into a governed reporting platform: deterministic products, durable expectations, bounded recovery, exact readback, and rollback-safe one-writer delivery.</p>
            <p className="role-line">Forward Deployed Engineer Intern · May-August 2026</p>
            <div className="hero-actions">
              <a className="button primary" href="#system">Explore the system</a>
              <a className="button secondary" href="/Thomas-Ryan-PepperBall-Case-Study.pdf">One-page PDF</a>
            </div>
          </div>
          <aside className="proof-panel" aria-label="Reliability invariants">
            <p className="panel-label">Controlling invariants</p>
            <dl>
              <div><dt>Writer topology</dt><dd>Exactly one</dd></div>
              <div><dt>Equivalent replay</dt><dd>Zero writes</dd></div>
              <div><dt>Ambiguous response</dt><dd>GET-only</dd></div>
              <div><dt>Material regression</dt><dd>Exact rollback</dd></div>
              <div><dt>Unknown safety state</dt><dd>Fail closed</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="audience-section" aria-labelledby="audience-title">
        <div className="section audience-inner">
          <div className="audience-intro">
            <p className="eyebrow">Choose your lens</p>
            <h2 id="audience-title">One system, useful at every altitude.</h2>
          </div>
          <div className="audience-tabs" role="tablist" aria-label="Audience perspectives">
            {audiences.map((item, index) => (
              <button key={item.label} type="button" role="tab" aria-selected={audienceIndex === index} className={audienceIndex === index ? 'selected' : ''} onClick={() => setAudienceIndex(index)}>{item.label}</button>
            ))}
          </div>
          <div className="audience-panel" role="tabpanel" aria-live="polite">
            <p className="panel-label dark">{audience.kicker}</p>
            <h3>{audience.headline}</h3>
            <p>{audience.proof}</p>
            <ul>{audience.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section system-section" id="system">
        <div className="section-heading">
          <div><p className="eyebrow">End-to-end system</p><h2>From source evidence to an operable product.</h2></div>
          <p>The public architecture exposes responsibilities and safety contracts while omitting production identities, schemas, ACLs, exact schedules, and proprietary code.</p>
        </div>
        <div className="system-flow" role="list" aria-label="End-to-end platform flow">
          {systemSteps.map(([number, title, body]) => (
            <article className="system-step" role="listitem" key={number}>
              <span>{number}</span><div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
        <a className="text-link dark-link" href="https://github.com/tonnyryam/pepperball-reporting-platform-case-study" rel="noreferrer">Explore the public repository and technical documentation</a>
      </section>

      <section className="capability-section" id="capabilities">
        <div className="section">
          <div className="section-heading light">
            <div><p className="eyebrow">Capability map</p><h2>The platform beyond the pipeline.</h2></div>
            <p>Product, data, reliability, user experience, security, release, and handoff were designed as one system. Gated extensions remain visibly separate from deployed behavior.</p>
          </div>
          <div className="capability-grid">
            {capabilityGroups.map((group, index) => (
              <article key={group.title}><span>{String(index + 1).padStart(2, '0')}</span><p className="cap-tag">{group.tag}</p><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-section" id="lab">
        <div className="section lab-inner">
          <div className="section-heading light">
            <div><p className="eyebrow">Interactive recovery lab</p><h2>Change the failure. Keep the invariants.</h2></div>
            <p>This browser-only simulation uses synthetic states. It has no API, database, customer data, or production connection.</p>
          </div>
          <div className="scenario-tabs" role="tablist" aria-label="Recovery scenarios">
            {scenarios.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={scenarioIndex === index} className={scenarioIndex === index ? 'selected' : ''} onClick={() => setScenarioIndex(index)}>{item.label}</button>)}
          </div>
          <div className="scenario-panel" role="tabpanel" aria-live="polite">
            <div className="scenario-copy"><div className="status-line"><span>{scenario.status}</span><strong>{scenario.writes}</strong></div><h3>{scenario.label}</h3><p>{scenario.summary}</p></div>
            <ol className="scenario-steps">{scenario.steps.map((step, index) => <li key={step}><span>{index + 1}</span><strong>{step}</strong></li>)}</ol>
          </div>
        </div>
      </section>

      <section className="section" id="evidence">
        <div className="section-heading">
          <div><p className="eyebrow">Verified outcomes</p><h2>Correctness measured at the boundaries that matter.</h2></div>
          <p>Claims distinguish tests, raw artifacts, shadows, exact readback, failed-restored releases, and natural schedules. None is presented as blanket business accuracy.</p>
        </div>
        <div className="outcome-grid">{outcomes.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="artifact-section" aria-labelledby="artifact-title">
        <div className="section artifact-grid">
          <div className="artifact-copy"><p className="eyebrow">Synthetic output</p><h2 id="artifact-title">Inspect the product, not production data.</h2><p>The workbook mirrors the public reliability story with two visible sheets, formula-driven summary values, an auditable recovery trace, and synthetic identifiers throughout.</p><div className="stacked-actions"><a className="button primary" href="/synthetic-reliability-report.xlsx">Download workbook</a><a className="text-link dark-link" href="/synthetic-report-trace.png">View recovery trace</a></div></div>
          <figure><Image src="/synthetic-report-summary.png" width={2172} height={1097} alt="Synthetic spreadsheet summary showing two governed writes, zero equivalent replay writes, final remote version two, and zero overlapping writers"/><figcaption>Executive Summary - generated entirely from synthetic recovery events.</figcaption></figure>
        </div>
      </section>

      <section className="timeline-section">
        <div className="section">
          <div className="section-heading"><div><p className="eyebrow">Workday chronology</p><h2>From source foundation to natural recovery evidence.</h2></div><p>The public log contains 29 dated, sanitized entries, now including a durable Shift Draft catch-up that reused the native recovery loop. Day-level evidence begins in late June; the May-June engagement foundation is not invented into unsupported dates.</p></div>
          <div className="timeline-grid">{timeline.map(([date, event]) => <div key={date}><span>{date}</span><strong>{event}</strong></div>)}</div>
        </div>
      </section>

      <section className="downloads-section" id="downloads">
        <div className="section downloads-grid">
          <div><p className="eyebrow">Go deeper</p><h2>Pick the artifact for the conversation.</h2></div>
          <div className="download-list">
            <a href="/Thomas-Ryan-PepperBall-Case-Study.pdf"><span>01</span><div><strong>One-page case study</strong><small>Executive scan · PDF</small></div></a>
            <a href="/Thomas-Ryan-PepperBall-End-to-End-Case-Study.pdf"><span>02</span><div><strong>End-to-end technical case study</strong><small>Architecture and evidence · PDF</small></div></a>
            <a href="/Thomas-Ryan-PepperBall-Platform-Case-Study.pptx"><span>03</span><div><strong>Presentation deck</strong><small>Eight-slide narrative · PowerPoint</small></div></a>
            <a href="/synthetic-reliability-report.xlsx"><span>04</span><div><strong>Synthetic workbook</strong><small>Inspectable output · Excel</small></div></a>
          </div>
        </div>
      </section>

      <section className="role-section">
        <div className="section role-grid">
          <div><p className="eyebrow">Role and boundaries</p><h2>Product judgment, technical rigor, and operational ownership.</h2></div>
          <div className="role-copy"><p>Thomas set product goals, business definitions, safety invariants, release priorities, acceptance criteria, and owner-only decisions. Codex-assisted execution accelerated analysis, implementation, tests, evidence, and documentation under that direction.</p><p>The public package is a clean-room teaching representation. It includes no production source, history, customer data, credentials, private identifiers, live templates, or exact topology.</p><div className="contact-links"><a href="https://github.com/tonnyryam" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/thomas-f-ryan/" rel="noreferrer">LinkedIn</a><a href="mailto:tommyryan.sf415@gmail.com">Email</a></div></div>
        </div>
      </section>

      <footer><div><strong>PepperBall reporting platform case study</strong><p>Thomas Ryan · Forward Deployed Engineer Intern · May-August 2026</p></div><p className="footer-note">Independent portfolio material. All Rights Reserved. Not an official PepperBall product.</p></footer>
    </main>
  );
}
