import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const isCI = !!process.env.CI;

export default defineConfig({
  timeout: 180000,
  testDir: './tests',
  expect: {
    timeout: 60000,
  },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 3 : 0,
  workers: isCI ? 4 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        viewport: isCI ? { width: 1920, height: 1080 } : null,
        launchOptions: {
          headless: true,
          args: isCI
            ? [
                '--window-size=1920,1080',
                '--disable-dev-shm-usage',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-setuid-sandbox',
              ]
            : ['--start-maximized'],
        },
      },
    },
  ],
});