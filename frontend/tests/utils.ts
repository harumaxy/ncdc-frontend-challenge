import base from '@playwright/test';
import { createWorkerFixture, MockServiceWorker } from 'playwright-msw';

const test = base.extend<{
  msw: MockServiceWorker;
}>({
  msw: createWorkerFixture(),
});

export { test };
