import { expect } from '@playwright/test';
import { test } from './utils';

// E2E テストは、localhost:3000 でバックエンドサーバーが起動していることを前提とする
// また、SQLite はコミットされている状態で初期化されていることを想定。更新があったら git checkout で戻しておく

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
  await page
    .getByText('内容を入力してください')
    .fill('編集された本文0123456789');
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
      .filter({ hasText: /^編集された本文0123456789$/ })
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

test('タイトル・本文の編集フォームに制限文字数より多い/少ない文字数が入力されているときに、エラーメッセージが表示される', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .locator('div')
    .filter({ hasText: /^方丈記$/ })
    .click();
  const titleErrorMessage = page.getByText(
    'タイトルは1文字以上、50文字以下である必要があります',
  );
  await page.getByTestId('title-edit-button').click();
  await page.getByRole('textbox').fill('');
  await expect(titleErrorMessage).toBeVisible();
  await page.getByRole('textbox').fill('あ');
  await expect(titleErrorMessage).not.toBeVisible();
  await page.getByRole('textbox').fill('あ'.repeat(50));
  await expect(titleErrorMessage).not.toBeVisible();
  await page.getByRole('textbox').fill('あ'.repeat(51));
  await expect(titleErrorMessage).toBeVisible();

  const bodyErrorMessage = page.getByText(
    '本文は10文字以上、2000文字以下である必要があります',
  );
  await page.getByRole('button', { name: 'Cancel Cancel' }).click();
  await page.getByTestId('body-edit-button').click();
  await page.getByRole('textbox').fill('あ'.repeat(9));
  await expect(bodyErrorMessage).toBeVisible();
  await page.getByRole('textbox').fill('あ'.repeat(10));
  await expect(bodyErrorMessage).not.toBeVisible();
  await page.getByRole('textbox').fill('あ'.repeat(2000));
  await expect(bodyErrorMessage).not.toBeVisible();
  await page.getByRole('textbox').fill('あ'.repeat(2001));
  await expect(bodyErrorMessage).toBeVisible();
});
