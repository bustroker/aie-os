# C# Standards

## Purpose

Language and runtime standards for .NET and C# codebases.

## Rules

- Enable nullable reference types and address warnings intentionally.
- Code changes must compile successfully before they are considered complete.
- Use one primary public top-level type per file. The file name must match that type.
- Supporting DTOs and tightly coupled contract types may stay in the same file when they belong only to that primary type.
- If an interface has a single implementation and is not reused, the interface may stay in the same file as that implementation.
- If an interface is defined in its own file, keep its tightly coupled contract DTOs in that same file.
- Pass `CancellationToken` through async flows that can be cancelled.
- Prefer async APIs end to end.
- Use constructor injection where dependencies are injected.

## Preferred Patterns

- Dependency injection through constructors.
- Small application services with explicit command or query responsibilities.
- Structured logging with contextual properties.
- Records or immutable types for simple data contracts where they fit the model.

## Forbidden Patterns

- Blocking on async code with `.Result` or `.Wait()`.
- Static mutable state for request or user-specific data.
- Catch-all exception handlers that hide the original failure.
