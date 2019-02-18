import { element, by, ElementFinder } from 'protractor';

export class LabelComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-label div table .btn-danger'));
    title = element.all(by.css('jhi-label div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LabelUpdatePage {
    pageTitle = element(by.id('jhi-label-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    textInput = element(by.id('field_text'));
    parentSelect = element(by.id('field_parent'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTextInput(text) {
        await this.textInput.sendKeys(text);
    }

    async getTextInput() {
        return this.textInput.getAttribute('value');
    }

    async parentSelectLastOption() {
        await this.parentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async parentSelectOption(option) {
        await this.parentSelect.sendKeys(option);
    }

    getParentSelect(): ElementFinder {
        return this.parentSelect;
    }

    async getParentSelectedOption() {
        return this.parentSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class LabelDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-label-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-label'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
