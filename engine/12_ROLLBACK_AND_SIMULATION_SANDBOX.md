# Engine V1 — Rollback and Simulation Sandbox

## Deterministic rollback

Rollback restores a stored checkpoint; it does not invent a replacement timeline. Restoration verifies the checkpoint hash, schema version, engine version and referenced assets before promotion.

```yaml
rollback_request:
  rollback_id: string
  campaign_id: string
  target_checkpoint_id: string
  expected_current_version: string
  reason: string
  requested_by: string
```

Successful restoration must reproduce the checkpoint's canonical hash. Failed verification leaves the current canonical state unchanged.

## Simulation sandbox

A simulation uses a separate namespace or source-control branch. Every generated record is marked `simulation_only: true`, including snapshots, rolls, resources, ledger entries, assets and projections.

```yaml
simulation_run:
  simulation_id: string
  based_on_checkpoint_id: string
  isolated_namespace: string
  started_at: datetime
  status: active|completed|discarded|reviewed
  canonical_promotion_allowed: false
```

Simulation results cannot be merged directly into canonical history. If the user later adopts an outcome, create a new validated canonical command and resolution; do not relabel the simulated event.

## Required rollback test

1. Snapshot canonical state and compute its hash.
2. Create an isolated simulation.
3. Apply representative actor, resource, inventory, knowledge and clock changes.
4. Discard the simulation and restore the source checkpoint.
5. Compare canonical state, ledger, World Clock and views byte-for-byte or semantically through a normalized hash.
6. Pass only when no simulation marker or state delta remains in canonical storage.
