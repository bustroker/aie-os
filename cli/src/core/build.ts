import path from "node:path";
import { listMarkdownFiles, readText } from "./files";
import type { Manifest } from "./manifest";
import type { EffectiveContext, EffectiveContextSection } from "./agentAdapters";

export type BuildInput = {
  manifest: Manifest;
  projectPath: string;
  tool: "codex";
};

export type BuildOutput = {
  effectiveContext: EffectiveContext;
  effectiveContextMarkdown: string;
  manifest: Manifest;
  tool: "codex";
};

export async function buildAgentContext(input: BuildInput): Promise<BuildOutput> {
  const sections = await resolveSections(input);
  const effectiveContext: EffectiveContext = {
    manifest: input.manifest,
    sections,
    version: 1,
  };

  return {
    effectiveContext,
    effectiveContextMarkdown: await renderEffectiveContextMarkdown({
      effectiveContext,
      title: "# Agent Context",
      tool: input.tool,
    }),
    manifest: input.manifest,
    tool: input.tool,
  };
}

async function resolveSections(input: BuildInput): Promise<EffectiveContextSection[]> {
  const sections: EffectiveContextSection[] = [];
  const projectPath = input.projectPath;
  const knowledgeBasePath = resolveProjectPath(projectPath, input.manifest.paths.knowledgeBase);
  const agentPath = resolveProjectPath(projectPath, input.manifest.paths.agent);
  const skillsPath = resolveOptionalProjectPath(
    projectPath,
    input.manifest.paths.skills,
  );
  const projectContextPath = resolveProjectPath(projectPath, input.manifest.paths.projectContext);
  const projectCodingStandardsPath = resolveProjectPath(
    projectPath,
    input.manifest.paths.projectCodingStandards,
  );
  const projectSkillsPath = resolveProjectPath(projectPath, input.manifest.paths.projectSkills);

  sections.push(
    ...(await loadDirectorySections(
      projectContextPath,
      projectPath,
      "Project Context",
    )),
  );

  sections.push(
    ...(await loadDirectorySections(
      path.join(knowledgeBasePath, "engineering-principles", "universal"),
      projectPath,
      "Engineering Principles",
    )),
  );

  sections.push(
    ...(await loadDirectorySections(
      projectCodingStandardsPath,
      projectPath,
      "Project Coding Standards",
    )),
  );

  sections.push(
    ...(await loadDirectorySections(
      path.join(knowledgeBasePath, "coding-standards", "universal"),
      projectPath,
      "Shared Coding Standards",
    )),
  );

  for (const language of input.manifest.selection.languages) {
    sections.push(
      ...(await loadDirectorySections(
        path.join(knowledgeBasePath, "coding-standards", "language", language),
        projectPath,
        "Language Standards",
      )),
    );
  }

  if (input.manifest.selection.applicationType !== "none") {
    sections.push(
      ...(await loadDirectorySections(
        path.join(
          knowledgeBasePath,
          "coding-standards",
          "application-type",
          input.manifest.selection.applicationType,
        ),
        projectPath,
        "Application-Type Standards",
      )),
    );
  }

  for (const framework of input.manifest.selection.frameworks) {
    sections.push(
      ...(await loadDirectorySections(
        path.join(knowledgeBasePath, "coding-standards", "framework", framework),
        projectPath,
        "Framework Standards",
      )),
    );
  }

  sections.push(
    ...(await loadDirectorySections(
      projectSkillsPath,
      projectPath,
      "Project Skills",
    )),
  );

  if (skillsPath) {
    sections.push(
      ...(await loadDirectorySections(
        skillsPath,
        projectPath,
        "Skills",
      )),
    );
  }

  sections.push(
    await loadSingleFileSection(
      path.join(agentPath, "style", `${input.manifest.selection.style}.md`),
      projectPath,
      input.manifest.selection.style,
      "Response Style",
    ),
  );

  sections.push(
    await loadSingleFileSection(
      path.join(agentPath, "persona", `${input.manifest.selection.persona}.md`),
      projectPath,
      input.manifest.selection.persona,
      "Persona",
    ),
  );

  return sections;
}

async function loadDirectorySections(
  directoryPath: string,
  projectPath: string,
  layer: string,
): Promise<EffectiveContextSection[]> {
  const files = await listMarkdownFiles(directoryPath);

  return Promise.all(
    files.map(async (filePath) => ({
      file: filePath,
      heading: path.basename(filePath, ".md"),
      layer,
      source: path.relative(projectPath, filePath),
    })),
  );
}

async function loadSingleFileSection(
  filePath: string,
  projectPath: string,
  heading: string,
  layer: string,
): Promise<EffectiveContextSection> {
  return {
    file: filePath,
    heading,
    layer,
    source: path.relative(projectPath, filePath),
  };
}

function resolveProjectPath(projectPath: string, configuredPath: string): string {
  if (path.isAbsolute(configuredPath)) {
    return configuredPath;
  }

  return path.resolve(projectPath, configuredPath);
}

function resolveOptionalProjectPath(
  projectPath: string,
  configuredPath: string,
): string | null {
  if (configuredPath.trim() === "") {
    return null;
  }

  return resolveProjectPath(projectPath, configuredPath);
}

export async function renderEffectiveContextMarkdown(input: {
  effectiveContext: EffectiveContext;
  note?: string;
  title: string;
  tool: "codex";
}): Promise<string> {
  const buildInputs = [
    `- Tool: ${input.tool}`,
    `- Persona: ${input.effectiveContext.manifest.selection.persona}`,
    `- Style: ${input.effectiveContext.manifest.selection.style}`,
    `- Languages: ${formatList(input.effectiveContext.manifest.selection.languages)}`,
    `- Application type: ${formatValue(input.effectiveContext.manifest.selection.applicationType)}`,
    `- Frameworks: ${formatList(input.effectiveContext.manifest.selection.frameworks)}`,
    `- Knowledge base path: ${input.effectiveContext.manifest.paths.knowledgeBase}`,
    `- Agent path: ${input.effectiveContext.manifest.paths.agent}`,
    `- Skills path: ${formatValue(input.effectiveContext.manifest.paths.skills)}`,
    `- Project context path: ${input.effectiveContext.manifest.paths.projectContext}`,
    `- Project coding standards path: ${input.effectiveContext.manifest.paths.projectCodingStandards}`,
    `- Project skills path: ${input.effectiveContext.manifest.paths.projectSkills}`,
  ].join("\n");

  const renderedSections = input.effectiveContext.sections
    .map(async (section, index) =>
      [
        `## ${index + 1}. ${section.layer}: ${section.heading}`,
        "",
        `Source: \`${section.source}\``,
        "",
        (await readText(section.file)).trim(),
      ].join("\n"),
    );

  const resolvedSections = await Promise.all(renderedSections);

  return [
    input.title,
    "",
    "This file is generated by AIE OS. Do not edit directly.",
    "Higher-precedence sections appear first. Later sections may refine earlier sections but must not contradict them.",
    "",
    ...(input.note ? [input.note, ""] : []),
    "## Build Inputs",
    "",
    buildInputs,
    "",
    resolvedSections.join("\n\n"),
    "",
  ].join("\n");
}

function formatList(items: string[]): string {
  if (items.length === 0) {
    return "none";
  }

  return items.join(", ");
}

function formatValue(value: string): string {
  return value.trim() === "" ? "none" : value;
}
