# Engine V1 — Migration and Versioning

## Version policy

Every durable rule and contract uses a stable identifier, semantic version, status, effective date, superseded identifier where applicable, and reason for change.

```yaml
rule_definition:
  rule_id: string
  version: string
  status: experimental|active|deprecated|archived
  effective_date: date
  supersedes: string|null
  reason: string
```

## Safe migration protocol

1. Inventory the active canonical values and the rules that interpret them.
2. Identify obsolete or conflicting records without overwriting them.
3. Define a migration mapping and validation criteria.
4. Apply the mapping in an isolated branch or copy.
5. Run the QA gate and a checkpoint restoration test.
6. Promote only after consistency is verified; archive the superseded records with their provenance.

## Campaign isolation

Engine migrations change generic contracts, never campaign facts. A campaign instance adopts an engine version through an explicit migration record. Its setting, actors, secrets, history, asset registry and World Clock remain untouched unless the campaign migration explicitly and validly changes a representation.

## Release gate for V1

V1 is ready for an implementation phase when every P0 contract in `ENGINE_V1_OVERVIEW.md` has a tested adapter, no test fixture contains campaign canon, and a rollback leaves the canonical campaign state unchanged.
