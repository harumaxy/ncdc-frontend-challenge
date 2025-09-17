import { expect } from '@playwright/test';
import { test } from './utils';

test('コンテンツを 作成 > 更新 > 削除 できることを確認する', async ({
  page,
}) => {
  // 作成する
  await page.goto('/');
  await page.getByTestId('list-edit-button').click();
  await page.getByRole('button', { name: 'New page New page' }).click();
  await page.reload(); // 何故か Playwright 環境で作成時の楽観的更新が聴いていないので、一旦リロード
  await expect(
    page
      .locator('div')
      .filter({ hasText: /^新しいコンテンツ$/ })
      .first(),
  ).toBeVisible();

  await page
    .locator('div')
    .filter({ hasText: /^新しいコンテンツ$/ })
    .first()
    .click();

  // タイトルを更新
  await page.getByTestId('title-edit-button').click();
  await page.getByRole('textbox').fill('編集されたタイトル');
  await page.getByRole('button', { name: 'Save Save' }).click();

  // 本文を更新
  await page.getByTestId('body-edit-button').click();
  await page.getByText('内容を入力してください').fill('編集された本文');
  await page.getByRole('button', { name: 'Save Save' }).click();

  // ページリロードしても更新内容が保持されていることを確認
  await page.reload();
  await page
    .locator('div')
    .filter({ hasText: /^編集されたタイトル$/ })
    .first()
    .click();

  await expect(
    page
      .locator('div')
      .filter({ hasText: /^編集されたタイトル$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator('div')
      .filter({ hasText: /^編集された本文$/ })
      .first(),
  ).toBeVisible();

  // 削除する
  await page.getByTestId('list-edit-button').click();
  await page
    .getByTestId('content-list')
    .locator('div')
    .filter({ hasText: /^編集されたタイトル$/ })
    .first()
    .getByRole('img')
    .click();

  await expect(
    page
      .getByTestId('content-list')
      .locator('div')
      .filter({ hasText: /^編集されたタイトル$/ }),
  ).not.toBeVisible(); // 削除されたコンテンツがサイドバーから消える
});
