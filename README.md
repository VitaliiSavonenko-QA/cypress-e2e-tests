# Cypress E2E Testing Practice

Educational UI automation exercises originally completed during QA Studio training in August 2025. Reorganized in November 2026 with AI-assisted security, configuration and documentation improvements. This is a practice project, not a production automation framework or evidence of commercial automation experience.

## Scenarios

- Login: successful authentication; password recovery; invalid password; invalid email; malformed email; mixed-case email (six tests).
- Pokémon Battle: avatar purchase through a simulated training payment flow (one test).

The original UI selectors and Russian-language assertions have been retained. Test names are in English. Account data is supplied at runtime; password recovery and purchase are disabled by default. The original fixed waits were removed in favor of Cypress element queries and assertions. The original Cypress dependency (12.7.0) is retained for reproducibility; it has not been upgraded or security-audited.

## Local setup

Use an environment compatible with Cypress 12.7.0 (for example Node.js 18 for this historical training exercise; it is no longer supported for production). Install the locked dependencies:

```bash
npm ci
```

Copy `cypress.env.example.json` to `cypress.env.json` and enter only your own authorized training account data. The local file is ignored by Git. Do not use real payment data. The login site is `https://login.qa.studio`; the avatar scenario targets `https://pokemonbattle.ru/`.

```bash
npm test
npm run test:open
```

Without `QA_LOGIN` and `QA_PASSWORD`, login tests are skipped. Set `RUN_PASSWORD_RECOVERY` to `true` only when explicitly testing recovery on your own authorized training account. The avatar test is skipped unless `RUN_TRAINING_PURCHASE` is `true`; configure all seven associated fields using simulated training values only. If the external training sites, selectors, test account state or simulated payment flow change, tests may fail. The avatar scenario assumes the account meets the original champion/shop prerequisites.

## Verification and limitations

JavaScript syntax and JSON configuration were checked locally during migration. Live browser tests have not been run against the training services. No successful live execution is claimed. The original course examples, screenshots, videos and old Git history are not included. Screenshots and video recording are disabled by default to reduce accidental exposure of training account details.
