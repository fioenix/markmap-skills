<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/icon-dark.svg">
    <img src="assets/icon.svg" width="96" height="96" alt="markmap-skills icon">
  </picture>
</p>

<h1 align="center">markmap-skills</h1>

<p align="center">
  <b>Universal, lightweight Markmap mindmap plugin for AI Agents (Claude Code, OpenAI Codex, Google Antigravity).</b><br>
  Cognitive structuring with Miller's Law & MECE · 0 daemon · 0 token tax · Standalone HTML rendering.
</p>

<p align="center">
  <a href="https://github.com/fioenix/markmap-skills/actions/workflows/ci.yml"><img src="https://github.com/fioenix/markmap-skills/actions/workflows/ci.yml/badge.svg" alt="CI Status" /></a>
  <a href="https://github.com/fioenix/markmap-skills"><img src="https://img.shields.io/badge/Packaging-Checked-7FE2CE?logo=anthropic&logoColor=0B0B17" alt="Packaging checked locally" /></a>
  <a href="https://github.com/fioenix/markmap-skills"><img src="https://img.shields.io/badge/Runtime-Zero--Daemon-9750C4" alt="Zero Daemon" /></a>
  <a href="https://github.com/fioenix/markmap-skills"><img src="https://img.shields.io/badge/Agents-Claude%20%7C%20Codex%20%7C%20Antigravity-18181b" alt="Agent Support" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
</p>

---

## ⚡ The Solution

Most AI mindmap solutions suffer from two fatal architectural pitfalls:
1. **Bloated MCP Servers & Idle Token Tax**: Running persistent background server processes, dragging in Playwright and a 300MB Chromium headless browser just to take a screenshot, while permanently burning 1,000+ tokens of schema definitions in every conversation turn.
2. **Cognitive Sprawl**: Dumping raw paragraph-length prose into node trees, producing unreadable walls of text that defeat the visual purpose of a mindmap.

### Architecture Comparison

| Capability | Heavyweight MCP / Headless | Raw LLM Output | **markmap-skills** |
|---|---|---|---|
| **Runtime Footprint** | 300MB+ Headless Chrome daemon | 0 MB | **0 MB (Zero daemon)** |
| **Idle Token Tax** | 1,000+ tokens burned per turn | 0 tokens | **0 token overhead when idle** |
| **Cognitive Structuring** | None (unfiltered text dump) | Unstructured | **Miller's Law (4–7 branches, depth 3–4, ≤ 8 words)** |
| **Output Artifacts** | Static raster image (PNG) | Raw text | **Portable `.mindmap.md` + Standalone `.html`** |
| **Multi-Agent Parity** | Platform-specific | Inconsistent | **Claude Code · OpenAI Codex · Google Antigravity** |
| **Security Posture** | Subprocess execution risk | Safe | **Zero-privilege core + CSP-hardened template** |

---

## 🔍 Before vs. After Comparison

| Scenario | Default LLM Output (Before) | Structured with `markmap-skills` (After) |
|---|---|---|
| **Gateway Architecture** | `- The system uses an API Gateway running on Cloudflare Workers to handle user requests, authenticating users via JWT tokens signed with RSA encryption...` (32 words, verbose narrative) | `- **Auth**: JWT with RSA signatures`<br>`- **Rate Limit**: Token bucket at edge`<br>`- ~~Kong Gateway: Excessive idle cost~~` (Concise, keyword-first, tracks rejected alternatives) |
| **Branch Structure** | Dumps 14 flat sibling bullet points on the root, exceeding human working memory capacity. | Clusters into 4 MECE categories (Ingress, Compute, Storage, Telemetry); deep specs fold automatically with `<!-- markmap: fold -->`. |
| **Decision Tracking** | Static descriptive text with no sense of milestone completion or pending trade-offs. | `- [x] State snapshot serialization`<br>`- [ ] WebSocket reconnection backoff`<br>`+ Low latency / - Stale read risk` |

---

## 📦 Quick Installation

### 1. Claude Code

#### Via Public Marketplace (Recommended):
In your Claude Code terminal session:
```text
/plugin marketplace add fioenix/markmap-skills
/plugin install markmap-skills@fioenix-plugins
```
Invoke the skill directly in any conversation:
```text
/markmap-skills:markmap Create an architecture mindmap for this microservices system
```

> **Upgrading from `mindmap-skills`?** The plugin was renamed. Run `/plugin uninstall mindmap-skills@fioenix-plugins`, then install `markmap-skills@fioenix-plugins` as above. The command is now `/markmap-skills:markmap`.

#### On Claude Desktop / Web UI:
1. Navigate to **Customize** → **Plugins** → **Add** → **Add marketplace** → **Add from a repository**.
2. Enter repository: `fioenix/markmap-skills`.
3. In Discover, select **markmap-skills** and click **Add**.
4. Invoke in chat using `/markmap` or via the `+` menu.

#### Local Development / Manual Link:
```bash
claude plugin add ~/Projects/markmap-skills
```

---

### 2. OpenAI Codex

#### Via Skills CLI:
```bash
DISABLE_TELEMETRY=1 npx --yes skills@1.5.20 add fioenix/markmap-skills --skill markmap --agent codex --global
```

This installs the skill, not an approved OpenAI directory plugin. The Skills CLI normally reports install telemetry; this command opts out. [skills.sh listings](https://skills.sh/docs/faq) are driven by user installs with telemetry. No listing or OpenAI approval is claimed here.

#### OpenAI Platform Plugin Submission:
Build the skills-only upload ZIP locally:
```bash
python3 scripts/package_plugin.py /tmp/markmap-skills-0.1.4.zip
```
The ZIP uses the supported `.codex-plugin/plugin.json` layout and contains exactly one plugin root. It excludes development files and compatibility catalogs. Upload, identity verification, review, and publication require owner action in [Platform Plugins](https://platform.openai.com/plugins). See the [historical `0.1.3` readiness audit](docs/openai-skills-readiness.md) for background context (that historical audit does not validate or approve `0.1.4`; the current release requires fresh verification checks and the separate portal owner actions stated above).

#### Via Shared Finolabs Marketplace Catalog (`Finolabs`):
The canonical multi-plugin Codex catalog (`name: "Finolabs"`, `interface.displayName: "Finolabs"`) is published in `fioenix/agybird` and groups `agybird` (`agybird@Finolabs`), `vietnamizer` (`vietnamizer@Finolabs`), and `markmap-skills` (`markmap-skills@Finolabs`) without merging repositories.

```bash
codex plugin marketplace add fioenix/agybird
codex plugin add markmap-skills@Finolabs
```

* **Shared Catalog Registration & Selector**:
  - Register the published shared catalog `fioenix/agybird` in Codex (or a local `~/Projects/agybird` checkout when testing unpublished catalog changes).
  - Install using the canonical exact-case selector: `markmap-skills@Finolabs`.
* **Legacy Compatibility (`markmap-skills@fioenix-plugins`)**:
  - This repository keeps its own `.agents/plugins/marketplace.json` (`name: "fioenix-plugins"`) unchanged for standalone backward compatibility using selector `markmap-skills@fioenix-plugins` (not `@markmap-skills`), rather than renaming or duplicating the canonical `Finolabs` catalog here.
* **Migration (from `@agybird` or `@fioenix-plugins`) & Rollback**:
  1. **Back up** your current Codex plugin configuration and marketplace registrations before making changes.
  2. **Register & install** `markmap-skills@Finolabs` from the shared `fioenix/agybird` catalog (or your local `~/Projects/agybird` checkout for unpublished changes).
  3. **Verify replacement first**: confirm `markmap-skills@Finolabs` loads and renders as expected **before** disabling or removing a previous `markmap-skills@agybird` or `markmap-skills@fioenix-plugins` installation, or removing old `@agybird` or standalone `fioenix/markmap-skills` marketplace registrations.
  4. **Rollback**: because an unpinned `fioenix/agybird` registration now resolves `name: "Finolabs"`, rolling back to `@agybird` requires explicitly registering the pinned pre-rename tag with `codex plugin marketplace add fioenix/agybird --ref v0.2.1` (commit `25ad82943fab90224918603e05fe23f4fa65847a`, which still declares `name: "agybird"`, or registering a retained local snapshot of that catalog), reinstalling your desired `@agybird` selector (`codex plugin add markmap-skills@agybird`), and verifying it works before removing `Finolabs`; alternatively, restore your backed-up configuration or fall back to this repository's standalone `.agents/plugins/marketplace.json` with `markmap-skills@fioenix-plugins`.
* **Release Note (`v0.1.4`)**: Documents shared `Finolabs` (`fioenix/agybird`) Codex catalog registration (`markmap-skills@Finolabs`) alongside migration from prior `@agybird` and legacy `markmap-skills@fioenix-plugins` compatibility and rollback guidance; runtime behavior and the standalone compatibility catalog remain unchanged.

#### Via Agent Skills Directory:
```bash
# In a specific project
mkdir -p .agents/skills
cp -r ~/Projects/markmap-skills/skills/markmap .agents/skills/

# Or machine-global
mkdir -p ~/.agents/skills
ln -s ~/Projects/markmap-skills/skills/markmap ~/.agents/skills/markmap
```

---

### 3. Google Antigravity

#### Machine-Global:
```bash
mkdir -p ~/.gemini/config/skills
ln -s ~/Projects/markmap-skills/skills/markmap ~/.gemini/config/skills/markmap
```

#### Workspace-Local:
```bash
mkdir -p .agents/skills
cp -r ~/Projects/markmap-skills/skills/markmap .agents/skills/
```

---

## 📋 Cognitive Structuring Invariants

Every generated mindmap adheres strictly to official Markmap standards and information architecture principles:

* **Miller's Law (4–7 Main Branches `##`)**: Limits top-level branches to match human working memory capacity. Always cluster related concepts into umbrella categories rather than dumping flat lists.
* **MECE Taxonomy (Mutually Exclusive, Collectively Exhaustive)**: Sibling branches at the same depth share a single logical classification axis (e.g. system layers, data lifecycle stages, or user personas) without semantic overlap.
* **Branch Density Equilibrium**: Automatically partitions lop-sided branches (> 7 children) into intermediate sub-groups (`###`) to maintain visual balance.
* **Progressive Disclosure (`<!-- markmap: fold -->`)**: High-level branches (Tiers 1–2) remain open for 5-second scanning, while deep implementation nodes (depth ≥ 3) or dense technical parameters fold by default to prevent visual fatigue.
* **Decision & Status Encoding**:
  - `- [x]` Completed / Confirmed milestone
  - `- [ ]` Open Question / Pending decision
  - `~~Discarded Alternative~~`: Documents why an option was rejected
  - `==Critical Path / Bottleneck==`: Highlights focal architectural risks
  - `+ Advantage / - Cost Dyads`: Explicitly states who pays the trade-off

```markdown
---
title: Finolabs Agent Gateway Architecture
markmap:
  colorFreezeLevel: 2
---

## Ingress Gateway (MECE: Ingress)
- **Runtime**: Cloudflare Workers
- **Security**: JWT with RSA signatures
- ~~Alternative: Self-hosted Kong (High idle cost)~~

## Storage Tier (MECE: Persistence)
- **Metadata**: Cloudflare D1 (SQLite)
  - `+ Low latency, zero cold starts`
  - `- Single-writer concurrency ceiling`
- **Blobs**: Cloudflare R2 object store
- ~~Alternative: AWS S3 (High egress fees)~~

## Telemetry (MECE: Observability) <!-- markmap: fold -->
- **Traces**: OpenTelemetry collector
- **Metrics**: Cloudflare Analytics Engine
- **Pending Tasks**:
  - - [ ] Benchmark 5% trace sampling rate
  - - [x] Enable tail-based sampling
```

---

## 🔄 Opportunistic Multi-Skill Synergy

`markmap-skills` is built on a **Zero-Coercion, Zero-Hard-Dependency** model: it works 100% standalone out of the box. However, when paired with complementary skills inside an agent harness, it acts as a high-value **Visual Converger**:

| Skill in Harness | Upstream Role | `markmap` Downstream Role |
|---|---|---|
| **`grilling`** | Stress-tests ideas, exposes hidden assumptions, challenges trade-offs. | **Visual Decision Tree**: Synthesizes grilled decisions, struck-out options (`~~...~~`), and confirmed invariants. |
| **`brainstorming`** | Divergent thinking, exploratory ideation, sprawling idea generation. | **Convergent Affinity Map**: Gathers unstructured ideas into 4–7 MECE categories with actionable checkboxes. |
| **Spec Kit (`.specify/`)** | Defines formal functional specifications (`spec.md`). | **Functional Decomposition**: Visually maps user stories, data entities, and acceptance criteria. |

### Practical Synergy Scenarios:

#### Scenario 1: Paired with `grilling`
> **User Prompt:** *"Use grilling to stress-test this architecture proposal, then synthesize the decisions into a mindmap."*
> 
> **Agent Execution:**
> 1. Runs `grilling` to probe boundary conditions, unearth trade-offs, and challenge assumptions.
> 2. Finalizes core architectural agreements.
> 3. Handoff to `markmap` to emit `.mindmap.md`: highlighting confirmed paths, crossing out discarded alternatives (`~~...~~`), and flagging remaining open loops (`- [ ]`).

#### Scenario 2: Paired with `brainstorming`
> **User Prompt:** *"Brainstorm 10 growth features for this product, then organize them into a clean mindmap."*
> 
> **Agent Execution:**
> 1. Runs `brainstorming` for divergent ideation.
> 2. Invokes `markmap` to converge ideas into 4–7 MECE clusters (e.g. Acquisition, Activation, Retention, Monetization).
> 3. Applies `<!-- markmap: fold -->` to secondary branches and emits an interactive HTML artifact.

#### Scenario 3: Standalone Execution
> When auxiliary skills are absent from the harness, `markmap` processes user requests directly, **never prompting or nagging the user to install additional packages**.

---

## 🛠️ Repository Architecture

```text
markmap-skills/
├── .github/
│   ├── workflows/
│   │   └── ci.yml              # Automated GitHub Actions CI workflow
│   ├── ISSUE_TEMPLATE/         # Structured bug & feature request templates
│   └── PULL_REQUEST_TEMPLATE.md# Pull request validation checklist
├── .claude-plugin/
│   ├── marketplace.json        # Claude Code marketplace catalog definition
│   └── plugin.json             # Claude Code plugin manifest (with URLs & icons)
├── .codex-plugin/
│   └── plugin.json             # OpenAI Codex plugin manifest (interface & translations)
├── .codex/
│   └── plugin.json             # Legacy Codex compatibility manifest
├── .agents/
│   └── plugins/
│       └── marketplace.json    # Agent ecosystem distribution catalog
├── agents/
│   └── openai.yaml             # Legacy interface descriptor; canonical copy is in the skill
├── plugin.json                 # Universal / Antigravity plugin descriptor
├── package.json                # npm package descriptor (skills.sh discovers SKILL.md)
├── assets/
│   ├── icon.svg                # Vector SVG icon (FINOLABS Design System)
│   ├── icon-dark.svg           # Dark mode vector SVG icon
│   └── icon.png                # 512x512 PNG marketplace icon
├── logo.svg                    # Root vector logo
├── LICENSE                     # MIT License
├── README.md                   # Product documentation & usage guide
├── CONTRIBUTING.md             # Contribution guidelines & offline testing
├── PRIVACY.md                  # Privacy policy & data governance
├── TERMS.md                    # Terms of service
├── skills/
│   └── markmap/
│       ├── SKILL.md            # Canonical skill instructions & prompt constraints
│       ├── agents/openai.yaml  # Skill-local Codex UI metadata
│       ├── scripts/render.sh   # Pinned renderer, included in skill installs
│       └── assets/
│           └── template.html   # Standalone HTML artifact template (CSP hardened)
├── scripts/
│   ├── build_icon.py           # Portable vector icon renderer
│   ├── render.sh               # Hardened CLI helper (markmap-cli wrapper)
│   └── sync_version.sh         # Propagates package.json version to every manifest
└── tests/
    └── validate.sh             # Automated validation & test suite (8 gates)
```

---

## 🔒 Security Posture & Privacy

* **No Maintainer Backend or Telemetry**: Host agent data policies apply. CDN HTML requests pinned libraries from jsDelivr; first CLI rendering may download packages from npm. Compiled `--offline` output embeds libraries. Skills CLI installation has its own optional telemetry.
* **Template Content Isolation**: JSON-encode Markdown and escape every `<` before embedding; HTML-escape titles. CDN template nodes display source text with links, images, and raw HTML disabled. The CSP is defense in depth, not a substitute for encoding. CLI-generated HTML has its own rendering behavior; use trusted source content.
* **CLI Option Injection Guard**: `scripts/render.sh` terminates argument parsing with `--` (`markmap-cli@0.18.12 --offline -o "$OUTPUT" --no-open -- "$INPUT"`) to prevent untrusted input from triggering CLI flags.
* **Sensitive Data Policy**: See [PRIVACY.md](PRIVACY.md) and [TERMS.md](TERMS.md).

---

## 📄 License & Community

* **License**: [MIT License](LICENSE) © [Fioenix](https://github.com/fioenix)
* **Contributing**: Read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests.
* **Issues & Feedback**: [GitHub Issues](https://github.com/fioenix/markmap-skills/issues)
