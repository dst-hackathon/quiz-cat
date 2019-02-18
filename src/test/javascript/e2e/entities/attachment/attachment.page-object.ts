import { element, by, ElementFinder } from 'protractor';

export class AttachmentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-attachment div table .btn-danger'));
    title = element.all(by.css('jhi-attachment div h2#page-heading span')).first();

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

export class AttachmentUpdatePage {
    pageTitle = element(by.id('jhi-attachment-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    imagePathInput = element(by.id('field_imagePath'));
    imageInput = element(by.id('file_image'));
    attachmentPathInput = element(by.id('field_attachmentPath'));
    attachmentInput = element(by.id('file_attachment'));
    contentTypeInput = element(by.id('field_contentType'));
    commentInput = element(by.id('field_comment'));
    questionSelect = element(by.id('field_question'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setImagePathInput(imagePath) {
        await this.imagePathInput.sendKeys(imagePath);
    }

    async getImagePathInput() {
        return this.imagePathInput.getAttribute('value');
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    async setAttachmentPathInput(attachmentPath) {
        await this.attachmentPathInput.sendKeys(attachmentPath);
    }

    async getAttachmentPathInput() {
        return this.attachmentPathInput.getAttribute('value');
    }

    async setAttachmentInput(attachment) {
        await this.attachmentInput.sendKeys(attachment);
    }

    async getAttachmentInput() {
        return this.attachmentInput.getAttribute('value');
    }

    async setContentTypeInput(contentType) {
        await this.contentTypeInput.sendKeys(contentType);
    }

    async getContentTypeInput() {
        return this.contentTypeInput.getAttribute('value');
    }

    async setCommentInput(comment) {
        await this.commentInput.sendKeys(comment);
    }

    async getCommentInput() {
        return this.commentInput.getAttribute('value');
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

export class AttachmentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-attachment-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-attachment'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
