import { element, by, ElementFinder } from 'protractor';

export class QuestionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-question div table .btn-danger'));
    title = element.all(by.css('jhi-question div h2#page-heading span')).first();

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

export class QuestionUpdatePage {
    pageTitle = element(by.id('jhi-question-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    summaryInput = element(by.id('field_summary'));
    descriptionInput = element(by.id('field_description'));
    objectiveInput = element(by.id('field_objective'));
    keyAnswerInput = element(by.id('field_keyAnswer'));
    answerSizeSelect = element(by.id('field_answerSize'));
    answerDescriptionInput = element(by.id('field_answerDescription'));
    expectedTimeInput = element(by.id('field_expectedTime'));
    labelSelect = element(by.id('field_label'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setSummaryInput(summary) {
        await this.summaryInput.sendKeys(summary);
    }

    async getSummaryInput() {
        return this.summaryInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setObjectiveInput(objective) {
        await this.objectiveInput.sendKeys(objective);
    }

    async getObjectiveInput() {
        return this.objectiveInput.getAttribute('value');
    }

    async setKeyAnswerInput(keyAnswer) {
        await this.keyAnswerInput.sendKeys(keyAnswer);
    }

    async getKeyAnswerInput() {
        return this.keyAnswerInput.getAttribute('value');
    }

    async setAnswerSizeSelect(answerSize) {
        await this.answerSizeSelect.sendKeys(answerSize);
    }

    async getAnswerSizeSelect() {
        return this.answerSizeSelect.element(by.css('option:checked')).getText();
    }

    async answerSizeSelectLastOption() {
        await this.answerSizeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setAnswerDescriptionInput(answerDescription) {
        await this.answerDescriptionInput.sendKeys(answerDescription);
    }

    async getAnswerDescriptionInput() {
        return this.answerDescriptionInput.getAttribute('value');
    }

    async setExpectedTimeInput(expectedTime) {
        await this.expectedTimeInput.sendKeys(expectedTime);
    }

    async getExpectedTimeInput() {
        return this.expectedTimeInput.getAttribute('value');
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

export class QuestionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-question-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-question'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
