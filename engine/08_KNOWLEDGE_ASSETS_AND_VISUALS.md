# Engine V1 — Knowledge, Assets, and Visuals

## Knowledge progression

Knowledge is actor-specific and evidence-based. The engine may advance a state only through direct observation, a recorded communication, a valid check, a confirmed source, or a defined rule effect.

```yaml
knowledge_transition:
  event_id: string
  actor_id: string
  subject_id: string
  from: unaware|observed|suspected|believed_cover|confirmed|disproved
  to: unaware|observed|suspected|believed_cover|confirmed|disproved
  evidence: []
  roll_id: string|null
```

No actor automatically knows another actor's secret, capability, identity, location, plan, or inventory. A public cover identity and a private truth are distinct knowledge subjects.

## Asset registry

Visual assets are durable references, not sources of gameplay facts. They may record a validated general appearance, but never create statistics, powers, injuries, equipment, text, locations, dimensions, counts, or secrets.

```yaml
asset_record:
  asset_id: string
  campaign_id: string|null
  title: string
  type: portrait|scene|combat|map|creature|item|other
  canon_status: official_appearance|illustrative
  visible_facts_source: []
  storage_locations: []
  supersedes: string|null
  archived: boolean
```

Old asset versions are preserved. If an asset conflicts with written canon, correct or retire the asset; never alter the canonical state to fit it.
