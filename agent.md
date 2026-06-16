

# How I Built This: Working with AI Agents on a Real Backend Feature

**Feature:** Implement API endpoint to accept a YouTube stream URL, validate it, save stream status as pending in PostgreSQL, return accepted response, and add tests.

---

## My Approach to Working with Agents

I didn't use the agent to write code for me. I used it as a **thinking partner** — I proposed ideas, the agent validated or challenged them, and I made the architectural decisions. This kept the learning intact while moving faster.

**Example interactions that show this:**
- When the agent suggested a separate datasource file for migrations, I questioned it: *"why do we need it separately?"* — the agent explained the real reason and I made an informed decision to use client.ts directly
- When the agent said sharing one observer instance could cause issues, I pushed back: *"the event carries streamId as data, what's the actual issue?"* — the agent acknowledged I was right and explained the rule (stateless = safe to share)
- When told to write `onEvent` as `async`, I asked *"so whoever implements it should be able to execute long-running operations and the caller can await it?"* — confirming my understanding before proceeding

---

## Thinking Process

**1. Architecture first, code second**
Before writing any code, I asked the agent to explain the layered architecture — Route → Controller → Service → Repository → DB — and understood *why* each layer exists before touching files.

**2. Right tool for the right job**
I chose each technology deliberately:
- **TypeORM** over raw SQL — for type safety and learning ORM patterns
- **PostgreSQL** over MySQL — industry standard for new TypeScript backends, pgvector for future AI features
- **Express** over NestJS — minimal framework so I own the architectural decisions
- **Joi** for validation — runtime validation at system boundaries
- **Manual Observer pattern** over `EventEmitter` — to understand the underlying concept first

**3. Incremental complexity**
- Started `AnalysisEvent` as a bare enum, no payload
- When the DB layer needed `streamId`, I recognised *that's the moment* to add payload — and added it as a plain object type, not a discriminated union, because all variants carried the same shape
- Planned discriminated union for when variants diverge

**4. Questioned every decision**
- *"Why `-D` for runtime packages?"* → learned the difference between devDependencies and runtime deps
- *"Why dist in the migrations path if the files are in src?"* → understood the TypeScript compile step
- *"Why do we need a `type` if we have an enum?"* → learned TypeScript enum vs Kotlin enum difference

---

## What Was Built

```
src/
├── routes/streams.route.ts               POST /stream endpoint
├── controllers/stream.controller.ts      Validate URL, call service, return 202
├── schemas/url.schema.ts                 Joi validation — uri({ scheme: [http, https] })
├── services/
│   ├── streams.service.ts                Orchestrator — save → attach observer → fire analysis
│   └── videoanalysis.service.ts         Observer subject — emits events with async delays
├── observers/
│   └── videoanalysisevent.observer.ts   Persists each event to DB
├── repository/
│   ├── stream.repository.ts              Inserts stream record, returns streamId
│   └── event.repository.ts              Inserts event row per status change
├── models/
│   ├── streams.ts                        TypeORM entity — streams table
│   └── events.ts                        TypeORM entity — events table
├── interface/IVideoAnalysisObserver.ts   Observer contract
├── types/analysisevent.ts                AnalysisEventsType enum + AnalysisEvent type
└── db/
    ├── client.ts                         TypeORM DataSource config
    └── migrations/                       Generated migration files
```

---

## Design Patterns Applied

| Pattern | Where | Why |
|---|---|---|
| **Layered Architecture** | Entire codebase | Separation of concerns, each layer has one job |
| **Observer Pattern** (manual) | VideoAnalysisService + observers | Decouple event emission from reactions |
| **Repository Pattern** | stream/event repositories | Isolate DB logic, keep services portable |
| **Fire and Forget** | StreamsService | Long-running analysis doesn't block HTTP response |
| **Discriminated Union** | AnalysisEvent type | Type-safe event payloads, ready to extend |

---

## Key Engineering Decisions Made

1. **`analyseVideo` takes `streamId` not `url`** — by the time analysis starts, the stream is already persisted. streamId is the source of truth.
2. **202 Accepted immediately** — the right HTTP pattern for long-running async work
3. **`synchronize: false` + migrations** — production-safe schema management with full audit trail
4. **Observer is stateless** — confirmed safe to share one instance across concurrent requests; race conditions only occur with mutable shared state
5. **Plain object type over discriminated union** — right-sized complexity for current needs, easy to extend

---

## Tools & Prompts Used

- Asked "validate my thought process" before building — confirmed architecture before writing code
- Used the agent to explain unfamiliar concepts (EventEmitter vs manual Observer, discriminated unions, Promise wrapping setTimeout)
- Asked the agent to review code after writing it — caught issues like the fragile `findOneBy` second query and missing `return` on early exits
