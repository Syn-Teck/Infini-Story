# Engine V1 — Quality Gate

## Before each consequential roll

- [ ] Actor and control authority are known.
- [ ] Action is declared and genuinely uncertain/consequential.
- [ ] Relevant rule/stat and every modifier are explicit.
- [ ] Injury, condition, resource, advantage/disadvantage and circumstance effects are evaluated.
- [ ] DC, defense or opposed roll is fixed before randomness.
- [ ] `PreRollPacket.fixed_before_roll` is true.

## After each resolution

- [ ] Natural roll(s), modifiers, total, target and outcome are recorded.
- [ ] HP, wounds, conditions, positions, resources and inventory deltas are updated together.
- [ ] The Event Ledger explains the causal change.
- [ ] Knowledge changes cite observed evidence rather than narrative inference.
- [ ] Only the relevant specialised views are refreshed.

## At each combat turn

- [ ] One `CombatSnapshot` identifies the active actor and live hostiles.
- [ ] Initiative, positions, available actions and reactions are coherent.
- [ ] No actor receives an undefined mechanical bonus.
- [ ] Limited resources have explicit current values or are blocked as undefined.

## Before a release or migration

- [ ] No campaign-specific data exists in engine specifications or tests.
- [ ] All changed contracts have a version and migration note.
- [ ] Checkpoint restoration has been exercised in an isolated branch.
- [ ] `UNKNOWN` values remain explicit; no filler values were introduced.
- [ ] Assets have an explicit status and do not create mechanics.
- [ ] State Validator passes with no blocking violation.
- [ ] Event types and World Clock permissions are valid.
- [ ] Rollback reproduces the checkpoint hash exactly.
- [ ] Simulation records cannot be mistaken for canonical events.
- [ ] Stale-write and concurrent-update tests reject unsafe writes.
- [ ] Public projections contain no private or secret fields.
