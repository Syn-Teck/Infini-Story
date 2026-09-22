# Engine V1 — Event and Command Schema

## Command layer

A command captures declared intent. It is not yet a fact and does not mutate canon. Validation may accept, reject or request clarification before any resolution occurs.

```yaml
command_envelope:
  command_id: string
  campaign_id: string
  actor_id: string|null
  control_authority: player|gm|engine|administrator
  command_type: declare_action|administrative|simulation|migration
  intent: string
  target_ids: []
  expected_canonical_version: string
  submitted_at: datetime
  status: proposed|validated|rejected|resolved|cancelled
```

The engine must not transform a player-controlled actor's undecided choice into a validated gameplay command.

## Event classes

| Event type | Canonical mutation | World Clock | Event Ledger |
|---|---:|---:|---:|
| `gameplay` | allowed after validation | allowed with explicit basis | required |
| `administrative` | metadata only | forbidden | optional technical log only |
| `simulation_only` | sandbox only | sandbox value only | sandbox ledger only |
| `migration` | representation/rules only | preserve established value | required migration log |
| `correction` | affected dependencies only | preserve unless correcting a proven clock error | required |

## Canonical event envelope

```yaml
event_envelope:
  event_id: string
  event_type: gameplay|administrative|simulation_only|migration|correction
  command_id: string|null
  campaign_id: string
  source_version: string
  resulting_version: string
  world_time_before: string|null
  world_time_after: string|null
  world_time_basis: string|null
  roll_ids: []
  state_deltas: []
  knowledge_deltas: []
  validation_id: string
  recorded_at: datetime
```

An event becomes canonical only after validation and atomic persistence of its state, ledger and affected views.
