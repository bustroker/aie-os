# AIE OS

`AIE OS` standardizes reusable engineering knowledge, reusable agent
configuration, reusable skills, and deterministic context delivery for coding
agents.

## Structure

```text
aie-os/
  knowledge-base/
    engineering-principles/
      universal/
    coding-standards/
      universal/
      language/
      application-type/
      framework/
  agent/
    style/
    persona/
  skills/
  cli/
```

- `knowledge-base/` holds shared engineering principles and coding standards.
- `agent/` holds shared style and persona definitions.
- `skills/` holds shared skills.
- `cli/` sets up a project and builds agent-specific artifacts.

## Target Project

```text
xample-app/
  aie-os/
  .aie-os/
    aie-os.json
    project-context/
    project-coding-standards/
    project-skills/
    build/
      effective-context.json
      effective-context.md
  AGENTS.md
```

- `aie-os/` is the local clone of this repo.
- `.aie-os/` contains project-local AIE OS configuration and generated files.

## Usage

```bash
mkdir xample-app
cd xample-app
git clone <aie-os-repo-url> aie-os
bash aie-os/cli/build-cli.sh
bash aie-os/cli/init-aie-os.sh
bash aie-os/cli/build-agent-context.sh --tool codex
```

- `bash aie-os/cli/init-aie-os.sh [--project-path /path/to/project] [--kb-path /path/to/knowledge-base] [--agent-path /path/to/agent] [--skills-path /path/to/skills]`
  (`--project-path` defaults to current directory; `--kb-path`, `--agent-path`, and `--skills-path` are prompted if not provided)
- `bash aie-os/cli/build-agent-context.sh --tool codex [--project-path /path/to/project]`
  (`--project-path` defaults to current directory)

- `init-aie-os.sh` prompts for every parameter, creates the `.aie-os/` folder
  structure with `README.md` placeholders only, and writes `.aie-os/aie-os.json`.
- `application type` supports `none` and defaults to `none`.
- `build-agent-context.sh --tool codex` reads `.aie-os/aie-os.json`, generates
  `.aie-os/build/effective-context.json` and `.aie-os/build/effective-context.md`,
  then passes the canonical context into the selected adapter.
- The `codex` adapter writes `AGENTS.md`.
