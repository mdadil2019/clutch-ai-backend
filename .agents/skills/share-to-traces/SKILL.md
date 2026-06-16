---
name: share-to-traces
description: Share the current coding session to Traces and return the share URL.
metadata:
  author: traces
  version: "1.2.0"
  cli-contract-version: "1"
  argument-hint: [optional trace id or source path]
---

# Share To Traces

Publish the active trace to Traces and return the URL.

## Triggers

- "share to traces"
- "publish this trace"
- "share this session"

## How Session Resolution Works

GitHub Copilot CLI stores session logs under `~/.copilot/session-state`. The
command uses `--cwd` matching to find the most relevant trace, or you can use
`--list` and then `--trace-id` for deterministic selection.

## Command

### Direct share (uses cwd heuristic):

```bash
traces share --cwd "$PWD" --agent copilot --json
```

### With discovery (recommended when multiple sessions exist):

```bash
# Step 1: List available traces
traces share --list --cwd "$PWD" --agent copilot --json

# Step 2: Share a specific trace by ID
traces share --trace-id <selected-id> --json
```

## Visibility

Do NOT pass `--visibility` unless the user explicitly requests it. The CLI
defaults to the correct visibility based on the user's namespace type.

## Output Behavior

- Parse the JSON output and reply with the `sharedUrl`.
- On failure:
  - `AUTH_REQUIRED`: run `traces login`, then retry.
  - `TRACE_NOT_FOUND`: use `--list` to discover, then `--trace-id`.
  - `UPLOAD_FAILED`: check network, then retry.
