# API Standards

## Purpose

Application-type standards for backend APIs regardless of the underlying
language.

## Rules

- Treat the API contract as a product boundary with explicit request, response,
  auth, and error semantics.
- For new C# APIs, prefer FastEndpoints with minimal API style rather than MVC
  controllers.
- If a project is already established on a different API pattern, continue with
  the current project pattern instead of forcing a framework migration.
- Organize folders and files by vertical feature when building or evolving API
  applications.
- Keep API startup minimal and move configuration, service registration, and
  HTTP pipeline setup into explicit composition-root extension points.
- Validate required environment and app settings at startup and fail fast when
  they are missing.
- Use one global mechanism for translating unhandled exceptions into
  standardized API error responses.
- Keep production error payloads safe; include detailed diagnostics only in
  development or explicitly protected environments.
- Keep endpoint handlers thin and delegate domain, storage, and infrastructure
  work to services or repositories.
- Make health endpoints simple, reliable, and externally checkable.
- Verify dependency injection registrations and endpoint construction with
  automated tests.

## Preferred Patterns

- Vertical feature folders that keep endpoint, model, validation, and service
  logic close together.
- Strongly typed configuration bound from environment-aware settings files.
- Dependency injection through explicit composition roots.
- Integration tests for auth, repositories, health, storage, and critical
  endpoint flows.
- Background services for recurring operational work instead of request-time
  orchestration.

## Forbidden Patterns

- Forcing framework migrations in established APIs only to satisfy the
  preferred default.
- Scattering service registration and configuration logic across the codebase.
- Business logic embedded directly in transport handlers.
- Inconsistent or ad hoc error response formats across endpoints.
