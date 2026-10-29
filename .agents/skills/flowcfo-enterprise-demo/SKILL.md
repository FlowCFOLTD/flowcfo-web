---
name: flowcfo-enterprise-demo
description: Build or rehearse FlowCFO’s bank/platform demonstrations, including customer journeys, ingestion evidence, alerts, and integrations.
---

# FlowCFO partner demo rules

Use when creating a prospect presentation, enterprise page, live scenario, demo fixtures, or evaluation handout.

## Make the prospect’s agenda the outline

- Start from the prospect’s written requirements, use their wording, and give each scenario a clear “input → interpretation → action → evidence” walkthrough.
- Cover the requested consumer and business journeys, early-warning behavior, alert delivery, institution/product policy, data ingestion, model boundary, and API/integration path. Explicitly mark an item not available or requiring a pilot, with reason and a credible next step.
- Keep the live presentation short and interaction-led. Each chapter should say what the audience is seeing and why, then provide a clear action and visible result. Use sentences that can be read aloud to the audience, never private speaker notes.
- Use synthetic, internally consistent demo data. Label it clearly; never imply a real customer, bank account, live model training, credit decision, or production integration when it is simulated.

## Trust and technical clarity

- Distinguish live API calls from locally generated outcomes. Display concise request/response or event evidence where useful, not vanity metrics.
- Explain ingestion: accepted sources, parsing/normalization, validation, duplicate handling, uncertainty, provenance and where human review occurs.
- Explain notifications with recipient/channel configuration, consent and a visible delivery outcome. Do not send real external emails without explicit authorization; provide a safe demo recipient/test sink.
- Separate deterministic calculations, model inference, institution-supplied product rules, and any human approval. Never suggest inference automatically trains a customer’s model.
- State deployment/security assumptions precisely: data region, key management, retention, tenant boundaries, authentication, encryption and audit controls only when verified.

## Rehearsal

Run the sequence from a clean state, test each action and reset path, verify API health/failure behavior, check the meeting display size, and prepare a non-live fallback clearly labeled as such. Keep the whole demonstration within the scheduled time and leave room for questions.
