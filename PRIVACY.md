# Privacy Policy

`markmap-skills` generates Markdown and HTML mindmaps within your chosen AI agent environment. This policy distinguishes plugin behavior from the host platform and third-party services you use.

## 1. Backend, Network Requests & Telemetry

- **Zero-Backend Architecture**: The skill and plugin operate with no backend servers, no analytics ingestion endpoints, and no telemetry services owned by maintainers.
- **Local & In-Agent Execution**: Concept extraction, cognitive structuring, and Markdown generation (`.mindmap.md`) occur strictly within the user's active AI agent runtime context (Claude Code, OpenAI Codex, Google Antigravity).
- **Rendering requests**: The alternative HTML template downloads pinned Markmap and D3 assets from jsDelivr, which receives ordinary network request metadata. Offline compilation uses Node.js/npx; first use may download pinned markmap-cli and dependencies from npm. The resulting `--offline` HTML embeds assets. Neither mode intentionally uploads document contents to maintainers.
- **Installer telemetry**: The third-party Skills CLI has separate install telemetry used by skills.sh. Set `DISABLE_TELEMETRY=1` to opt out, as shown in the README. Host agent processing follows its own policy.

## 2. Input Data Governance

- **Content and purpose**: The skill uses task-authorized documents, notes, architecture briefs, or source code to structure and render a mindmap. Inputs and outputs may contain personal data if you include it. They are processed within your host agent environment; the plugin has no maintainer-operated content collection endpoint.
- **Restricted data**: Do not supply payment card data (PCI DSS), protected health information (PHI), government identifiers (such as national ID/CCCD, passport, or social security numbers), passwords, private keys, API secrets, or other authentication credentials. The skill instructs the host agent to stop before generating or rendering files, request a redacted or anonymized draft, and avoid repeating restricted values. This instruction is not a guaranteed automated detector or a way to remove data already sent to the host.

## 3. Recipients and Retention

- **Maintainers**: The plugin does not transmit prompts or generated mindmaps to maintainers, so maintainers do not retain these through a plugin backend.
- **Host platform**: Your chosen AI agent provider processes prompts, context, and outputs under its own policies and account settings. Its retention timelines depend on that provider, account, and configuration; this plugin sets no separate host retention period and cannot delete host records.
- **Local or workspace artifacts**: Generated `.mindmap.md` and HTML files contain the source material you choose to include. They remain until you delete them or the workspace's retention policy removes them; the plugin schedules no automatic deletion. Backups, sync services, or recipients of shared files may keep additional copies.
- **Network service providers**: jsDelivr receives ordinary request metadata, which can include IP address, user agent, requested resource, and request time, when the CDN template loads libraries. npm receives network request metadata when packages are downloaded; the Skills CLI may also send installation telemetry unless disabled. These requests serve library delivery, installation, or the installer's telemetry, rather than a maintainer analytics service. Provider retention is governed by their own policies; maintainers cannot set those timelines.
- **Support on GitHub**: If you open an issue or pull request, GitHub and repository maintainers receive your public account identity and submitted content. Those records remain visible until removed under GitHub's controls and policies; third-party copies may persist. Do not include private documents or personal identifiers in support submissions.

## 4. User Controls and Support

- Provide only the material needed for the requested mindmap, and redact personal or restricted data before sending it to the host.
- Delete generated Markdown and HTML files from your workspace when no longer needed. Manage synced copies and backups separately. Changing or deleting the Markdown does not remove content embedded in an already generated HTML file.
- Use your host platform's conversation deletion, retention, and privacy settings for host-held data. The plugin cannot perform those account actions.
- Choose the compiled `--offline` HTML to avoid CDN library requests when viewing the result. Initial compilation may still download packages from npm. Use `DISABLE_TELEMETRY=1` for Skills CLI installation telemetry, as documented in the README.
- Anonymize bug reports and contributions. Use GitHub's edit/delete controls where available, or request removal of maintainer-controlled support content without reposting the sensitive material.

For privacy-related inquiries, open a general request on [GitHub Issues](https://github.com/fioenix/markmap-skills/issues). This is a public channel: do not include the sensitive content itself. Maintainers cannot delete data held by your host provider, CDN, registry, backups, or other recipients.
