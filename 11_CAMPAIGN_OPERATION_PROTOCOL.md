# Campaign Operation Protocol

## Canonical sequence

Before a meaningful action, read the Game State, Event Ledger, rules and affected views. Resolve the action, then update all affected canonical files as one checkpoint: Game State, Ledger, specialised views, consistency check, Git commit, then Notion projection.

## World Clock

Only an actually resolved gameplay event with an established duration advances time. If the duration is not established, keep it `UNKNOWN`.

## Conflict handling

If canonical sources conflict, stop dependent updates, record a **CONTINUITY ERROR**, return to the last valid state and correct only affected dependencies.

## Notion direction

GitHub → Notion only. A Notion page is refreshed after a verified Git checkpoint and never writes canon back to GitHub.

## Visual aids

Images are quick sketches, location recaps or tactical boards. They show only player-visible, established information and never define canon.
