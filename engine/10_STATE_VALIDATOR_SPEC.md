# Engine V1 — State Validator Specification

## Purpose

The State Validator is the mandatory gate between a proposed transition and canonical storage. It verifies structure, references, causal integrity and domain invariants. A blocking violation rejects the entire transition; partial canonical writes are forbidden.

## Validation phases

1. **Schema:** required fields, types, allowed enum values and format versions.
2. **References:** actors, items, resources, rules, rolls, events and checkpoints exist.
3. **Causality:** every delta points to the event that caused it; consequential rolls link to a frozen pre-roll packet.
4. **Domain invariants:** quantities and HP respect active rules; ownership, initiative and knowledge transitions are valid.
5. **Clock safety:** only an eligible gameplay event may advance in-world time.
6. **Access safety:** the destination view may receive every field included in the proposed output.
7. **Optimistic concurrency:** the expected source version still matches canonical storage.

## Core invariants

- An item cannot have two exclusive owners at the same canonical version.
- A finite quantity cannot become negative.
- A resource with `current: null` cannot be spent as though unlimited.
- A combat transition has exactly one source and one successor snapshot.
- A ledger sequence is unique and strictly increasing.
- A roll target and modifiers were fixed before the random draw.
- A knowledge transition cites evidence or an explicit rule effect.
- An administrative, simulation or migration event cannot advance the World Clock unless a migration explicitly preserves an already-established time value.
- `UNKNOWN` is a value state, never permission to invent a replacement.

## Validation report

```yaml
validation_report:
  validation_id: string
  validator_version: string
  source_version: string
  proposed_version: string
  status: pass|fail
  violations:
    - code: string
      severity: blocking|warning
      entity_id: string|null
      path: string|null
      message: string
  checked_at: datetime
```

Warnings require review but do not alter data. Blocking violations produce no canonical event, no state mutation and no World Clock movement.
