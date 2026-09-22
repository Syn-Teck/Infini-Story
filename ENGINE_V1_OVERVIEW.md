# Infini-Story — Engine V1

**Specification version:** `1.2.0`  
**Status:** active design baseline

> **Scope:** generic specification for a persistent tabletop-RPG engine. It describes contracts and operating rules; it does not start a campaign or establish campaign canon.

## Product boundary

Engine V1 must support a campaign through one canonical state, an append-only causal ledger, explicit resource ownership, and auditable resolution. A campaign supplies its own system rules, characters, setting, assets, and secrets.

The engine must never contain campaign-specific people, factions, plot events, magic origins, item names, images, private links, or identifiers. Such data belongs only in a campaign instance.

## Non-negotiable invariants

1. **Mechanics before narration.** For an uncertain consequential action, determine the action, legal inputs, modifiers, target, and stakes before generating a result.
2. **No fabricated bonuses.** A role, title, experience level, or narrative importance is not a mechanical modifier unless recorded in the active state.
3. **No hidden retcon.** Contradictions are continuity errors, handled from the last valid checkpoint.
4. **One active state.** A character, resource, item, condition, or knowledge fact has one active canonical value at a time.
5. **Knowledge is attributed.** Observation, suspicion, belief, cover story, and confirmation are distinct states.
6. **Player agency is explicit.** A player-controlled actor needs a decision gate before a meaningful choice is resolved.
7. **Administrative work is timeless.** Reading, planning, commits, dashboards, asset work, and QA never advance in-world time.

## V1 module map

| Module | Responsibility | Required output |
|---|---|---|
| Dice Resolver | genuine random rolls and transparent calculation | `RollResult` |
| Pre-roll validator | legal action and fixed inputs before a roll | `PreRollPacket` |
| Combat state | atomic tactical state per turn | `CombatSnapshot` |
| Actor profiles | explicit mechanics for PCs and recurrent NPCs | `ActorMechanicalProfile` |
| Resource ledger | mana, ammunition, consumables, charges and cooldowns | resource deltas |
| Health model | HP, wounds, bleeding, pain, limb function and conditions | `HealthState` |
| Knowledge model | evidence-based knowledge per actor and subject | `KnowledgeState` |
| Inventory model | ownership, quantity, identification and disclosure state | `InventoryItem` |
| Checkpoint service | serializable recovery point and deterministic restoration | `CheckpointSnapshot` |
| Canon ledger | causal record of resolved changes | `EventLedgerEntry` |
| State Validator | enforce invariants before canonical promotion | `ValidationReport` |
| Command layer | separate declared intent from resolution and narration | `CommandEnvelope` |
| Simulation sandbox | isolate non-canonical trials and rollback tests | `SimulationRun` |
| System adapters | isolate game-system rules from engine persistence | adapter contracts |
| Concurrency guard | reject stale or conflicting writes | `WriteLease` |
| Access policy | separate public, player, GM-private and secret data | `AccessPolicy` |
| Observability | technical diagnostics without creating canon | `EngineDiagnostic` |

Detailed module specifications are in `engine/05` through `engine/16`.

## V1 delivery criteria

- Every consequential roll is traceable through a pre-roll packet and result.
- Every recurring combat actor has an explicit minimal mechanical profile.
- Combat updates are atomic: no partial HP, position, resource, or condition update.
- Mana and other limited resources can never be treated as unlimited merely because their count is absent.
- At least one multi-actor secret is represented through KnowledgeState without automatic disclosure.
- A checkpoint restore is tested without mutating canonical `main`.
- Visual assets are marked illustrative or official appearance only; neither category adds mechanics by itself.
- A roll, an atomic state update, and its causal ledger entry have stable IDs that can be cross-checked.
- A release cannot activate a new contract without an explicit version/migration entry.
- Invalid state transitions are rejected before they reach canonical storage.
- Simulation output cannot be promoted to canon without an explicit reviewed conversion.
- Stale writes are rejected instead of overwriting a newer checkpoint.
- Public or projected views cannot expose GM-private or secret fields.
