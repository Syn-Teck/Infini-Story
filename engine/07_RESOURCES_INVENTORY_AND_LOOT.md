# Engine V1 — Resources, Inventory, and Loot

## Resource ledger

Every limited resource has a maximum/current state, cost rule, recovery rule, and causal event reference. This applies equally to ammunition, charges, consumables, currency, spell-like energy, cooldowns and system-specific pools.

```yaml
resource_delta:
  delta_id: string
  event_id: string
  owner_id: string
  resource_id: string
  before: integer|null
  change: integer
  after: integer|null
  reason: string
```

An unknown resource count is blocked from expenditure rather than interpreted as infinite.

## Inventory and ownership

An item has exactly one current owner, unless its explicit state is `unassigned`, `shared_stash`, `environment`, `lost`, or `unknown_owner`. Transfer, consumption, destruction, concealment, declaration and identification are separate changes.

```yaml
item_transition:
  event_id: string
  item_id: string
  from_owner_id: string|null
  to_owner_id: string|null
  quantity_before: integer
  quantity_change: integer
  quantity_after: integer
  reason: transfer|consumption|recovery|loss|destruction|other
```

## Identification and value

Observation, hypothesis, identification, mechanical properties and market value are separate fields. Analysis or inspection cannot reveal an unknown property automatically. An item may be held, hidden, reportable, declared and known by different sets of actors without contradiction.

## Validation

No quantity may become negative. A transfer and its inventory update share the same `event_id`. Currency totals are only calculated from complete, established ledger entries; partial historical receipts are recorded as minimum known amounts.
