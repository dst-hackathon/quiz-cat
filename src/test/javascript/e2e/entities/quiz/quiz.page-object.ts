import { element, by, ElementFinder } from 'protractor';

export class QuizComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-quiz div table .btn-danger'));
    title = element.all(by.css('jhi-quiz div h2#page-heading span')).first();

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

export class QuizUpdatePage {
    pageTitle = element(by.id('jhi-quiz-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    generateDateInput = element(by.id('field_generateDate'));
    timeLimitInput = element(by.id('field_timeLimit'));
    descriptionInput = element(by.id('field_description'));
    questionSelect = element(by.id('field_question'));
    labelSelect = element(by.id('field_label'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setGenerateDateInput(generateDate) {
        await this.generateDateInput.sendKeys(generateDate);
    }

    async getGenerateDateInput() {
        return this.generateDateInput.getAttribute('value');
    }

    async setTimeLimitInput(timeLimit) {
        await this.timeLimitInput.sendKeys(timeLimit);
    }

    async getTimeLimitInput() {
        return this.timeLimitInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async questionSelectLastOption() {
        await this.questionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async questionSelectOption(option) {
        await this.questionSelect.sendKeys(option);
    }

    getQuestionSelect(): ElementFinder {
        return this.questionSelect;
    }

    async getQuestionSelectedOption() {
        return this.questionSelect.element(by.css('option:checked')).getText();
    }

    async labelSelectLastOption() {
        await this.labelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async labelSelectOption(option) {
        await this.labelSelect.sendKeys(option);
    }

    getLabelSelect(): ElementFinder {
        return this.labelSelect;
    }

    async getLabelSelectedOption() {
        return this.labelSelect.element(by.css('option:checked')).getText();
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

export class QuizDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-quiz-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-quiz'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
