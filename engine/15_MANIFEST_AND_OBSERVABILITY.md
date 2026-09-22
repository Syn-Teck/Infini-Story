# Engine V1 — Campaign Manifest and Observability

## Campaign manifest

Each campaign instance declares its compatibility and current operational state without embedding private story content in the engine package.

```yaml
campaign_manifest:
  campaign_id: string
  engine_version: string
  schema_version: string
  adapter_id: string
  adapter_version: string
  active_rule_versions: {}
  canonical_version: string
  last_checkpoint_id: string|null
  migration_status: current|pending|blocked
  projection_targets: []
```

## Technical observability

Engine diagnostics are separate from narrative and causal ledgers. They record validator failures, rejected stale writes, adapter errors, resolution duration, rollback tests and migration outcomes without becoming in-world facts.

```yaml
engine_diagnostic:
  diagnostic_id: string
  severity: debug|info|warning|error|critical
  component: string
  operation_id: string|null
  code: string
  message: string
  canonical_version: string|null
  created_at: datetime
  contains_restricted_data: false
```

Diagnostic retention and access are administrative policies. Deleting or rotating a technical log must not delete canonical events or alter campaign history.
