import { test, expect } from '@playwright/test'

test.describe('Vampire Analyzer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the main page elements', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Bloodsucker Detector')
    await expect(page.locator('textarea')).toBeVisible()
    await expect(page.locator('button:has-text("Analyze")')).toBeVisible()
  })

  test('should show error for short text', async ({ page }) => {
    await page.locator('textarea').fill('Hi')
    await page.locator('button:has-text("Analyze")').click()
    
    await expect(page.locator('[role="alert"]')).toContainText('at least 10 characters')
  })

  test('should analyze text and show results', async ({ page }) => {
    const testText = 'As a visionary thought leader and serial entrepreneur, I leverage cutting-edge synergy to disrupt traditional paradigms. Book a call with me now!'
    
    await page.locator('textarea').fill(testText)
    await page.locator('button:has-text("Analyze")').click()
    
    // Wait for results
    await expect(page.locator('[aria-label="Analysis results"]')).toBeVisible({ timeout: 10000 })
    
    // Check for score display
    await expect(page.locator('.text-6xl')).toBeVisible()
    
    // Check for roast
    await expect(page.locator('.font-serif.italic')).toBeVisible()
    
    // Check for share buttons
    await expect(page.locator('button:has-text("Copy Link")')).toBeVisible()
    await expect(page.locator('button:has-text("Download Card")')).toBeVisible()
  })

  test('should switch between modes', async ({ page }) => {
    await page.locator('button:has-text("Startup")').click()
    await expect(page.locator('button:has-text("Startup")[aria-checked="true"]')).toBeVisible()
    
    await page.locator('button:has-text("Dating")').click()
    await expect(page.locator('button:has-text("Dating")[aria-checked="true"]')).toBeVisible()
  })

  test('should reset analysis', async ({ page }) => {
    const testText = 'This is a test text for vampire analysis that should be long enough.'
    
    await page.locator('textarea').fill(testText)
    await page.locator('button:has-text("Analyze")').click()
    
    await expect(page.locator('[aria-label="Analysis results"]')).toBeVisible({ timeout: 10000 })
    
    await page.locator('button:has-text("Analyze Another")').click()
    
    await expect(page.locator('textarea')).toHaveValue('')
    await expect(page.locator('[aria-label="Analysis results"]')).not.toBeVisible()
  })

  test('should copy roast text', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    
    const testText = 'Revolutionary blockchain AI synergy leverage paradigm shift unicorn disrupt the industry now.'
    
    await page.locator('textarea').fill(testText)
    await page.locator('button:has-text("Analyze")').click()
    
    await expect(page.locator('[aria-label="Analysis results"]')).toBeVisible({ timeout: 10000 })
    
    await page.locator('button:has-text("Copy Roast")').click()
    await expect(page.locator('button:has-text("Copied!")').first()).toBeVisible()
  })

  test('should download card image', async ({ page }) => {
    const testText = 'Test text for downloading vampire card image with enough characters.'
    
    await page.locator('textarea').fill(testText)
    await page.locator('button:has-text("Analyze")').click()
    
    await expect(page.locator('[aria-label="Analysis results"]')).toBeVisible({ timeout: 10000 })
    
    // Start waiting for download before clicking
    const downloadPromise = page.waitForEvent('download')
    await page.locator('button:has-text("Download Card")').click()
    const download = await downloadPromise
    
    expect(download.suggestedFilename()).toMatch(/bloodsucker-\d+\.png/)
  })
})