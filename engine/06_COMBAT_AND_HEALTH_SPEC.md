# Engine V1 — Combat and Health Specification

## Atomic combat transition

Each resolved combat action consumes one source `CombatSnapshot` and produces one successor snapshot. The transition updates, as applicable, initiative, position, action economy, reactions, HP, wounds, conditions, resources, inventory, and hostiles alive in the same logical checkpoint.

```yaml
combat_transition:
  transition_id: string
  source_snapshot_id: string
  action_event_id: string
  result_roll_id: string|null
  deltas: []
  successor_snapshot_id: string
  validated: boolean
```

The engine must not narrate a target as defeated, a position as changed, or a resource as spent unless that change belongs to the transition or a later canonical event.

## Health model

Health is multi-axis. HP represents the system's health pool; wounds describe anatomical injury; bleeding, pain, limb function, and temporary conditions are distinct records. A healing effect must declare which axes it can change.

```yaml
healing_resolution:
  event_id: string
  target_actor_id: string
  hp_delta: integer
  wound_changes: []
  bleeding_change: string|null
  pain_change: string|null
  limb_function_change: []
  resource_cost: []
```

## Ready actions and reactions

Ready actions reserve a declared action against a concrete trigger and expire at their stated boundary. Reactions are represented separately from ordinary actions. Neither mechanism grants a permanent buff or advantage by itself.

## Minimum combat profile gate

No recurrent actor may enter a consequential combat resolution without an explicit defense, HP maximum/current state, relevant attacks, applicable modifiers, equipment and finite resources. Unknown values require a provisional ruling recorded before the first affected roll.
