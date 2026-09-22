# Engine V1 — Game-System Adapters

## Boundary

The persistence engine does not hard-code one tabletop ruleset. A game-system adapter supplies formulas and legal-resolution rules while the engine supplies commands, validation, randomness, state transitions, persistence and audit.

## Required adapters

```yaml
adapter_manifest:
  adapter_id: string
  adapter_version: string
  compatible_engine_range: string
  dice_rules: string
  combat_rules: string
  health_rules: string
  resource_rules: string
  progression_rules: string
  validation_extensions: []
```

- `DiceRules`: formulas, advantage models, critical rules and opposed checks.
- `CombatRules`: turn economy, initiative, movement, targeting and reactions.
- `HealthRules`: HP or equivalent pools, wounds, healing, death and recovery.
- `ResourceRules`: costs, maxima, recovery, cooldowns and resource validity.
- `ProgressionRules`: levels, ranks, experience, unlocks and migration behavior.

## Adapter safety

- An adapter cannot bypass Canon Lock, State Validator or access policy.
- Adapter changes require an explicit version and campaign migration record.
- Missing adapter data remains `UNKNOWN` or blocks resolution; the engine never substitutes another ruleset silently.
- Experimental adapter rules run only when the campaign manifest opts into their exact versions.
