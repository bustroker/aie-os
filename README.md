# AIE OS

`AIE OS` standardizes reusable engineering knowledge, reusable agent configuration, reusable skills, and deterministic context delivery for coding agents.

## Usage TLDR;

### Setup

```bash
cd xample-app
git clone <aie-os-repo-url> aie-os
cd aie-os/cli && npm run build
```

### Usage

```bash
cd xample-app
bash aie-os/bin/aie-os init [--project-path /defaults/to/cwd]
bash aie-os/bin/aie-os build --tool codex [--project-path /defaults/to/cwd]
```

#### Command `bash aie-os/bin/aie-os init` takes options:
* `--project-path /path/to/app/project/dir`: optiona, defaults to current directory;
* `--kb-path /path/to/knowledge-base/dir`: optiona, prompted if not provided;
* `--agent-path /path/to/agent/dir`: optiona, prompted if not provided;
* `--skills-path /path/to/skills/dir`: optiona, prompted if not provided.

**Other options prompted**
// explain here the relation between the option names and the files names found where.


#### Command `bash aie-os/bin/aie-os build` takes options:
* `--tool`: mandatory. accepts `codex`.
* `--project-path /path/to/project` optional, defaults to current directory.

 

## Structure

```text
aie-os/
  content/
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
  bin/
  cli/
```

- `content/knowledge-base/` holds shared engineering principles and coding standards.
- `content/agent/` holds shared style and persona definitions.
- `content/skills/` holds shared skills.
- `bin/` holds the local CLI wrapper.
- `cli/` contains the CLI implementation.

## AIE-OS project structure
Below the general agent-agnostic structure. Agent specific artefacts would be added by the build execution, after effective-context files.
```text
xample-app/
  aie-os/
  .aie-os/
    aie-os.json
    project-coding-standards/
    project-skills/
    build/
      effective-context.json
      effective-context.md
```

- `aie-os/` is the local clone of this repo.
- `.aie-os/` contains project-local AIE OS configuration and generated artifacts.


## Building Context

- `build` resolves shared knowledge, agent configuration, shared skills, project coding standards, and project skills into one canonical output.
- Canonical outputs:
  - `.aie-os/build/effective-context.json`
  - `.aie-os/build/effective-context.md`
- Adapters consume `effective-context.json` as the machine-readable contract and may also use `effective-context.md`.
- Adapters write tool-specific artifacts only.

## Agent Adapters

- `codex` writes `AGENTS.md`.
