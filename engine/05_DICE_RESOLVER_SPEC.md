# Engine V1 — Dice Resolver Specification

## Objective

The Dice Resolver is the only module allowed to generate a consequential random result. It makes the calculation inspectable without pretending that the random output itself is reproducible.

## Required inputs

- A validated `PreRollPacket` with `fixed_before_roll: true`.
- A declared dice formula and an optional modifier list.
- A target already fixed as DC, defense, or opposed roll when a target is applicable.
- A stable `roll_id` and the action's `event_id` reservation.

If an input is absent, the resolver rejects the request or requires an explicit provisional ruling before generation. It never adds a bonus based on story importance, prior failure, expected pacing, or desired outcome.

## Resolution rules

1. Draw each die using the runtime's genuine random source.
2. Preserve every natural die in `natural_rolls`.
3. Apply advantage/disadvantage only when established before the draw; retain the discarded die as audit information.
4. Apply recorded modifiers exactly once, in the declared order.
5. Classify ordinary success/failure and any system-specific critical result according to the active rule definition.
6. Return a `RollResult`; narration may begin only after this result exists.

## Audit record

```yaml
dice_audit:
  roll_id: string
  event_id: string
  resolver_version: string
  formula: string
  requested_at: datetime
  pre_roll_packet_hash: string
  result_hash: string
```

Hashes protect linkage and tamper detection; they do not claim to reveal or replay randomness. A future implementation may store a cryptographic RNG receipt where an available runtime supports it.

## Non-goals

- No reroll because a result harms a protagonist, NPC, plot, or pacing.
- No DC selection after seeing the natural roll.
- No roll for an action that is automatic or impossible under established facts.
