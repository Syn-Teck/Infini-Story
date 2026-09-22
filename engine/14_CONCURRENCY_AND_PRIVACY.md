# Engine V1 — Concurrency and Privacy

## Optimistic concurrency

Every canonical write names the version it read. If canonical storage has advanced, the write is rejected as stale and must be recalculated against the new state.

```yaml
write_lease:
  lease_id: string
  campaign_id: string
  expected_version: string
  proposed_version: string
  scope: []
  acquired_at: datetime
  expires_at: datetime
```

Overlapping active scopes cannot both commit. The engine never resolves a conflict through last-write-wins for canonical data.

## Information classes

- `public`: safe for shared presentation.
- `player`: available to the authorized player or table.
- `gm_private`: operational truth visible only to authorized GM processes.
- `secret`: restricted by an explicit access list.

```yaml
access_policy:
  object_id: string
  classification: public|player|gm_private|secret
  allowed_principals: []
  projection_targets: []
  redact_fields: []
```

## Projection safety

Before GitHub-to-presentation synchronization, the State Validator applies the destination policy, redacts prohibited fields and records which canonical version produced the view. A presentation source can never write back into canon.

Logs and diagnostics must avoid secrets by default. An error message may name an object identifier and violated rule without exposing restricted content.
