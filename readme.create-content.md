
### Create content

AIE OS builds context from three shared sources plus two project-local sources:

- knowledge base root (`--kb-path`)
  - mandatory structure:
    - `[kb-path]/engineering-principles/universal/*.md`
    - `[kb-path]/coding-standards/universal/*.md`
    - `[kb-path]/coding-standards/language/<name>/*.md`
    - `[kb-path]/coding-standards/application-type/<name>/*.md`
    - `[kb-path]/coding-standards/framework/<name>/*.md`
  - purpose:
    - engineering principles and coding standards shared across projects
  - examples:
    - `[kb-path]/engineering-principles/universal/engineering-principles.md`
    - `[kb-path]/coding-standards/universal/coding-standards.md`

- agent root (`--agent-path`)
  - mandatory structure:
    - `[agent-path]/persona/*.md`
    - `[agent-path]/style/*.md`
  - purpose:
    - agent behavior configuration

- skills root (`--skills-path`)
  - mandatory structure:
    - `[skills-path]/*.md` or nested `**/*.md`
  - purpose:
    - shared reusable workflows

- project-local sources in the target project
  - mandatory structure:
    - `.aie-os/project-coding-standards/*.md`
    - `.aie-os/project-skills/*.md`
  - purpose:
    - project-specific overrides and additions

Rules:
- `<name>` folder names under `language/`, `application-type/`, and `framework/` are the option names discovered by `init`. Make them legible, e.g., `language/csharp/*.md`, `application-type/console/*.md`, etc.
- Markdown file names are content units; file names do not need to match the selected option name.
- Add concise markdown files only. `README.md` is descriptive and ignored by `build`.
- Project-specific coding standards and skills may override shared ones.
- Shared engineering principles do not have a project-specific override layer.
