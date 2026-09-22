# Engine V1 — Resolution Protocol

## Decision gate

Before resolving a meaningful action by a player-controlled actor, the engine describes the established situation and returns control to the player. It may narrate passive observations but must not select an attack, dialogue, consumable, tactic, risk, investigation, or other meaningful action on the player's behalf.

## Resolution sequence

1. Identify actor, declared action, target and intended outcome.
2. Validate legality: turn economy where relevant, range, line of sight, target, equipment, resources, conditions, concentration, and applicable rules.
3. Determine whether uncertainty, obstacle and meaningful consequence exist. If not, resolve without a roll.
4. Build and freeze a `PreRollPacket` before randomness.
5. Resolve the roll with the shared Dice Resolver; preserve natural rolls and all modifiers.
6. Determine mechanical consequences before narration.
7. Apply all affected state changes atomically.
8. Append a causal ledger entry and refresh only affected views.
9. Verify state consistency; checkpoint at a defined trigger.

## Ready action

A ready action is not a permanent buff. It requires a concrete trigger and a reserved action, delays its use until that trigger occurs, and creates no advantage unless the resulting circumstance explicitly establishes one.

```yaml
ready_action:
  actor_id: string
  trigger: string
  reserved_action: string
  expires_at: end_of_round|explicit_event
```

## Error handling

When canonical sources disagree, stop the dependent resolution, label the issue `CONTINUITY ERROR`, identify the last valid state, correct only causally dependent data, then record the correction and its reason. Do not make a new narrative explanation merely to reconcile the mismatch.

## World clock

The World Clock advances only from a resolved gameplay event with an established duration or time-based consequence. Real elapsed time, administrative changes, asset generation, source-control activity, planning, and simulation setup are not gameplay events.
