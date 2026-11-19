import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';
import { chatgpt } from 'e2e/oauth/chatgpt';

// Deterministic locator assertions only; no agent/model calls or new spend.
export default {
  tests: 'tests/**/*.e2e.ts',
  workers: 1,
  timeout: 60000,
  targets: [{
    engine: web({ viewport: { width: 1440, height: 900 } }),
    app: { url: process.env.APP_URL ?? 'http://localhost:8624' },
  }],
  agents: { default: { model: chatgpt('gpt-6.1-sol') } },
} satisfies E2EConfig;
