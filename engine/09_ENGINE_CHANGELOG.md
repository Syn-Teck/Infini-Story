# Engine V1 — Changelog

## 1.2.0 — 2026-09-21

- Added a blocking State Validator and canonical invariant set.
- Added explicit command and event envelopes with protected World Clock semantics.
- Added deterministic rollback and isolated simulation rules.
- Added game-system adapter contracts.
- Added optimistic concurrency without last-write-wins.
- Added information classifications and safe projection policies.
- Added campaign manifest, technical observability and a mandatory regression-test matrix.
- Preserved strict separation between generic engine specifications and campaign data.

## 1.1.0 — 2026-09-21

- Added detailed contracts for causal event ledger entries and versioned rule definitions.
- Added Dice Resolver specification with pre-roll validation, genuine randomness, audit linkage, and anti-fudging guardrails.
- Added atomic combat/health transition requirements.
- Added resource, inventory, loot, ownership and identification transition rules.
- Added evidence-based knowledge and visual-asset registry rules.
- Confirmed campaign isolation: generic engine specifications contain no campaign-specific facts.

## 1.0.0 — 2026-09-21

- Derived generic Engine V1 specification from the `Beta-Test-Histoire-Infinie` template.
- Added contracts for actors, rolls, health, resources, knowledge, inventory, combat snapshots and checkpoints.
- Added resolution protocol, QA gate, and migration/versioning baseline.
