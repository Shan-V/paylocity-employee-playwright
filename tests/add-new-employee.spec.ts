import { test } from '../common/fixtures/pageWithAuth';
import { PaylocityBenefitsDashboardPage } from '../common/pages/portal/paylocityBenefitsDashboard';
import { expect } from '@playwright/test';

test.describe('POST employee', () => {

  let portal: PaylocityBenefitsDashboardPage;

  test.beforeEach(async ({ pageWithAuth }) => {
    portal = new PaylocityBenefitsDashboardPage(pageWithAuth);
  });

  test('Positive: Add new employee with valid details', async () => {
    await portal.addEmployee('David', 'Johns', '1');
  });

  test('Negative: Add new employee with an excessive number of dependents (33)', async () => {
    await portal.clickAddEmployeeButton();
    await portal.fillFirstName('Tom');
    await portal.fillLastName('Jerry');
    await portal.fillDependents('33');
    await portal.getAddButtonLocator().click();
    expect(await portal.getCancelButtonLocator().isVisible()).toBe(true);
  });

  test('Negative: Add new employee with an invalid number of dependents (-1)', async () => {
    await portal.clickAddEmployeeButton();
    await portal.fillFirstName('Tom');
    await portal.fillLastName('Jerry');
    await portal.fillDependents('-1');
    await portal.getAddButtonLocator().click();
    expect(await portal.getCancelButtonLocator().isVisible()).toBe(true);
  });

});