import type { Adapter, AdapterOutput } from "./types";

export const codexAdapter: Adapter = {
  build(input): AdapterOutput {
    const contents = input.effectiveContextMarkdown
      .replace("# Agent Context", "# AGENTS")
      .replace(
        "## Build Inputs",
        "Canonical source: `.aie-os/build/effective-context.md`.\n\n## Build Inputs",
      );

    return {
      files: [
        {
          contents,
          path: "AGENTS.md",
        },
      ],
      primaryArtifact: "AGENTS.md",
    };
  },
  tool: "codex",
};
