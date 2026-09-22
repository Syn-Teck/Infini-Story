# Engine V1 — Regression Test Matrix

## Mandatory V1 scenarios

| ID | Scenario | Required proof |
|---|---|---|
| T-001 | normal, advantage and disadvantage rolls | natural dice, kept die, modifiers and target are auditable |
| T-002 | DC or modifier changed after draw | validator rejects result |
| T-003 | ready action trigger | no permanent advantage is created |
| T-004 | finite resource expenditure | before/change/after and event ID agree |
| T-005 | unknown resource expenditure | operation is blocked |
| T-006 | item transfer | exactly one resulting owner |
| T-007 | atomic damage and wound update | snapshot, health and ledger agree |
| T-008 | evidence-based knowledge transition | actor state changes without leaking to others |
| T-009 | administrative operation | World Clock remains unchanged |
| T-010 | simulation run | no record reaches canonical namespace |
| T-011 | checkpoint rollback | normalized canonical hash is restored |
| T-012 | stale concurrent write | second write is rejected |
| T-013 | private-to-public projection | restricted fields are absent |
| T-014 | adapter version change | migration required before activation |
| T-015 | continuity conflict | dependent update stops with `CONTINUITY ERROR` |

## Release rule

An engine specification may be marked ready for implementation only when all mandatory scenarios have unambiguous expected results. An executable release additionally requires automated tests for every applicable scenario and a recorded successful rollback exercise.
