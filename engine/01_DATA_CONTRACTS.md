# Engine V1 — Data Contracts

> These are implementation-neutral contracts. A runtime may serialize them as Markdown front matter, JSON, YAML, database records, or typed objects, provided the semantics remain intact.

## ActorMechanicalProfile

```yaml
actor_id: string
actor_type: player|npc|companion|creature
defense: integer|null
hp_max: integer|null
attack_profiles: []
stats: {}
skill_modifiers: {}
resources: {}
equipment: []
source_version: string
```

No missing value may be substituted with a bonus inferred from role or narrative status. A `null` combat value blocks a consequential resolution until defined or ruled provisionally.

## PreRollPacket and RollResult

```yaml
pre_roll_packet:
  action_id: string
  actor_id: string
  action: string
  stat_or_rule: string
  modifiers:
    base: integer
    proficiency: integer
    circumstance: integer
    injury: integer
  advantage_state: normal|advantage|disadvantage
  target_type: dc|defense|opposed_roll
  target_value: integer|null
  stakes: string
  fixed_before_roll: true

roll_result:
  roll_id: string
  natural_rolls: [integer]
  kept_roll: integer
  modifiers: []
  total: integer
  target: integer|null
  result: success|failure|critical_success|critical_failure
  consequences: []
```

## HealthState and ResourceState

```yaml
health_state:
  hp_max: integer
  hp_current: integer
  wounds: []
  bleeding: none|controlled|mild|moderate|severe
  pain: none|mild|significant|severe
  limb_function: {}
  conditions: []

resource_state:
  resource_id: string
  maximum: integer|null
  current: integer|null
  cost_rules: []
  recovery_rule: string|null
  last_changed_by_event: string|null
```

`current: null` does not mean unlimited. It means the resource cannot be spent until a ruling or a value establishes how it works.

## KnowledgeState and InventoryItem

```yaml
knowledge_state:
  actor_id: string
  subject_id: string
  state: unaware|observed|suspected|believed_cover|confirmed|disproved
  evidence: []
  confidence: low|medium|high
  last_updated_scene: string|null

inventory_item:
  item_id: string
  quantity: integer
  owner_id: string|null
  identified: boolean
  report_required: boolean
  declared: boolean
  concealed: boolean
  known_by: []
  condition: string
```

## CombatSnapshot and CheckpointSnapshot

```yaml
combat_snapshot:
  combat_id: string
  round: integer
  active_actor_id: string
  initiative_order: []
  positions: {}
  actors: {}
  terrain: {}
  available_actions: {}
  available_reactions: {}
  hostiles_alive: []

checkpoint_snapshot:
  checkpoint_id: string
  canonical_version: string
  scene_id: string
  world_time: string|null
  actor_states: {}
  inventory_state: {}
  knowledge_state: {}
  world_state: {}
  created_by: string
  restore_tested: boolean
```

## EventLedgerEntry and RuleDefinition

```yaml
event_ledger_entry:
  event_id: string
  sequence: integer
  world_time: string|null
  real_recorded_at: datetime
  cause: string
  roll_id: string|null
  affected_entities: []
  state_deltas: []
  knowledge_classification: objective|player_knowledge|npc_knowledge|belief|rumor|lie|hypothesis|unknown
  simulation_only: boolean

rule_definition:
  rule_id: string
  name: string
  version: string
  status: experimental|active|deprecated|archived
  effective_date: date
  supersedes: string|null
  text: string
  reason: string
```

`sequence` is strictly increasing inside a campaign ledger. A ledger entry records an established consequence; it must not fabricate a world-time value, an owner, or a causal link that remains unknown.
