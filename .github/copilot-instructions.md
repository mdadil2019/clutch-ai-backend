# Traces sharing instructions

When the user asks to share/publish the current session to Traces, run:

```bash
traces share --cwd "$PWD" --agent copilot --json
```

If sharing fails because the trace cannot be uniquely selected, run:

```bash
traces share --list --cwd "$PWD" --agent copilot --json
traces share --trace-id <selected-id> --json
```

Error mapping:
- `AUTH_REQUIRED`: ask user to run `traces login`.
- `TRACE_NOT_FOUND`: use `--list` then `--trace-id`.
- `UPLOAD_FAILED`: suggest retry.
