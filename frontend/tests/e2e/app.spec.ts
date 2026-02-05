/**
 * E2E Tests for Time-Based Greeting App
 *
 * These tests capture screenshots and verify the greeting functionality.
 *
 * Required screenshots:
 * - MainPage.png: The greeting card with displayed greeting
 * - LandingPage.png: The initial state of the greeting app
 */

import { test, expect } from '@playwright/test'
import { mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// DO NOT CHANGE THESE NAMES
const MAIN_PAGE_SCREENSHOT_NAME = 'MainPage'
const LANDING_PAGE_SCREENSHOT_NAME = 'LandingPage'

// Ensure screenshots directory exists (ESM-compatible)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const screenshotsDir = join(__dirname, '..', 'screenshots')
if (!existsSync(screenshotsDir)) {
  mkdirSync(screenshotsDir, { recursive: true })
}

test.describe('Greeting App E2E Tests', () => {
  /**
   * Test: Initial state - Landing page with greeting card
   * Verifies that the greeting card and button are visible,
   * and no greeting is displayed initially.
   */
  test('captures LandingPage screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Verify greeting card elements are visible
    await expect(page.getByTestId('greeting.card')).toBeVisible()
    await expect(page.getByTestId('greeting.button')).toBeVisible()

    // Verify no greeting is displayed initially
    await expect(page.getByTestId('greeting.display')).not.toBeVisible()

    // Capture screenshot
    await page.screenshot({
      path: join(screenshotsDir, LANDING_PAGE_SCREENSHOT_NAME + '.png'),
      fullPage: true,
    })

    await expect(page).toHaveTitle(/.+/)
  })

  /**
   * Test: MainPage - Click button and show greeting
   * Verifies that clicking the button displays a time-appropriate greeting.
   */
  test('captures MainPage screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Click the greet button
    await page.getByTestId('greeting.button').click()

    // Wait for greeting to appear
    await expect(page.getByTestId('greeting.display')).toBeVisible()

    // Verify greeting text matches expected pattern
    const greetingText = await page.getByTestId('greeting.display').textContent()
    expect(greetingText).toMatch(/^Good (morning|afternoon|evening)$/)

    // Capture screenshot
    await page.screenshot({
      path: join(screenshotsDir, MAIN_PAGE_SCREENSHOT_NAME + '.png'),
      fullPage: true,
    })

    await expect(page).toHaveTitle(/.+/)
  })

  /**
   * Test: Greeting functionality verification
   * Verifies the complete flow of the greeting app.
   */
  test('greeting button displays time-appropriate message', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Verify initial state
    const greetButton = page.getByTestId('greeting.button')
    await expect(greetButton).toBeVisible()
    await expect(greetButton).toHaveText('Greet Me')

    // No greeting initially
    await expect(page.getByTestId('greeting.display')).not.toBeVisible()

    // Click button
    await greetButton.click()

    // Greeting should now be visible
    const greetingDisplay = page.getByTestId('greeting.display')
    await expect(greetingDisplay).toBeVisible()

    // Verify greeting content matches expected patterns
    const greetingText = await greetingDisplay.textContent()
    expect(greetingText).toMatch(/^Good (morning|afternoon|evening)$/)
  })
})
