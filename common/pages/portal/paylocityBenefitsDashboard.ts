import { Page } from '@playwright/test';
import { BasePage } from "../base.page";

export class PaylocityBenefitsDashboardPage extends BasePage<PaylocityBenefitsDashboardPage> {
    constructor(page: Page) {
        super(page, 'Prod/Benefits');
    }

    // Locators as private methods
    private getAddEmployeeButton = () => this._page.getByRole('button', { name: 'Add Employee' });
    private getFirstNameInput = () => this._page.getByLabel('First Name:');
    private getLastNameInput = () => this._page.getByLabel('Last Name:');
    private getDependentsInput = () => this._page.getByLabel('Dependents:');
    private getAddButton = () => this._page.getByRole('button', { name: 'Add', exact: true });
    private getCancelButton = () => this._page.getByRole('button', { name: 'Cancel' });
    private getCloseButton = () => this._page.getByRole('button', { name: 'Close' });
    private getUpdateButton = () => this._page.getByRole('button', { name: 'Update' });
    private getDeleteButton = () => this._page.getByRole('button', { name: 'Delete' });
    private getIcon = (nth: number) => this._page.locator('i').nth(nth);

    // Public methods to access locators (for assertions)
    public getAddEmployeeButtonLocator = () => this.getAddEmployeeButton();
    public getAddButtonLocator = () => this.getAddButton();
    public getCancelButtonLocator = () => this.getCancelButton();
    public getCloseButtonLocator = () => this.getCloseButton();
    public getUpdateButtonLocator = () => this.getUpdateButton();

    // Public methods to fill in form fields
    public async fillFirstName(firstName: string): Promise<PaylocityBenefitsDashboardPage> {
        await this.getFirstNameInput().fill(firstName);
        return this;
    }

    public async fillLastName(lastName: string): Promise<PaylocityBenefitsDashboardPage> {
        await this.getLastNameInput().fill(lastName);
        return this;
    }

    public async fillDependents(dependents: string): Promise<PaylocityBenefitsDashboardPage> {
        await this.getDependentsInput().fill(dependents);
        return this;
    }

    public async clickAddEmployeeButton(): Promise<PaylocityBenefitsDashboardPage> {
        await this.getAddEmployeeButton().click();
        return this;
    }

    public async clickAddButton(): Promise<PaylocityBenefitsDashboardPage> {
        await this.getAddButton().click();
        return this;
    }

    public async clickCancelButton(): Promise<PaylocityBenefitsDashboardPage> {
        await this.getCancelButton().click();
        return this;
    }

    public async clickCloseButton(): Promise<PaylocityBenefitsDashboardPage> {
        await this.getCloseButton().click();
        return this;
    }

    public async clickUpdateButton(): Promise<PaylocityBenefitsDashboardPage> {
        await this.getUpdateButton().click();
        return this;
    }

    public async clickIcon(nth: number): Promise<PaylocityBenefitsDashboardPage> {
        await this.getIcon(nth).click();
        return this;
    }

    public async clickDeleteButton(): Promise<PaylocityBenefitsDashboardPage> {
        await this.getDeleteButton().click();
        return this;
    }

    public async addEmployee(firstName: string, lastName: string, dependents: string): Promise<PaylocityBenefitsDashboardPage> {
        await this.clickAddEmployeeButton();
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillDependents(dependents);
        await this.clickAddButton();
        await this.getCancelButtonLocator().waitFor({ state: 'detached' });
        return this;
    }

    public async editEmployee(nthIcon: number, firstName: string, lastName: string, dependents: string): Promise<PaylocityBenefitsDashboardPage> {
        await this.clickIcon(nthIcon);
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillDependents(dependents);
        await this.clickUpdateButton();
        await this.getCancelButtonLocator().waitFor({ state: 'detached' });
        return this;
    }

    public async cancelAction(): Promise<PaylocityBenefitsDashboardPage> {
        await this.clickCancelButton();
        this.logger.info('Action cancelled successfully.');
        return this;
    }


    public async closeAction(): Promise<PaylocityBenefitsDashboardPage> {
        await this.clickCloseButton();
        this.logger.info('Action closed successfully.');
        return this;
    }


    public async deleteEmployee(nthIcon: number): Promise<PaylocityBenefitsDashboardPage> {
        await this.clickIcon(nthIcon);
        await this.clickDeleteButton();
        this.logger.info('Employee deleted successfully.');
        return this;
    }
}