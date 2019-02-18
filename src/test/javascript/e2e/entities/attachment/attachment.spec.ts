/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AttachmentComponentsPage, AttachmentDeleteDialog, AttachmentUpdatePage } from './attachment.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Attachment e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let attachmentUpdatePage: AttachmentUpdatePage;
    let attachmentComponentsPage: AttachmentComponentsPage;
    let attachmentDeleteDialog: AttachmentDeleteDialog;
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Attachments', async () => {
        await navBarPage.goToEntity('attachment');
        attachmentComponentsPage = new AttachmentComponentsPage();
        await browser.wait(ec.visibilityOf(attachmentComponentsPage.title), 5000);
        expect(await attachmentComponentsPage.getTitle()).to.eq('quizcatApp.attachment.home.title');
    });

    it('should load create Attachment page', async () => {
        await attachmentComponentsPage.clickOnCreateButton();
        attachmentUpdatePage = new AttachmentUpdatePage();
        expect(await attachmentUpdatePage.getPageTitle()).to.eq('quizcatApp.attachment.home.createOrEditLabel');
        await attachmentUpdatePage.cancel();
    });

    it('should create and save Attachments', async () => {
        const nbButtonsBeforeCreate = await attachmentComponentsPage.countDeleteButtons();

        await attachmentComponentsPage.clickOnCreateButton();
        await promise.all([
            attachmentUpdatePage.setNameInput('name'),
            attachmentUpdatePage.setImagePathInput('imagePath'),
            attachmentUpdatePage.setImageInput(absolutePath),
            attachmentUpdatePage.setAttachmentPathInput('attachmentPath'),
            attachmentUpdatePage.setAttachmentInput(absolutePath),
            attachmentUpdatePage.setContentTypeInput('contentType'),
            attachmentUpdatePage.setCommentInput('comment'),
            attachmentUpdatePage.questionSelectLastOption()
        ]);
        expect(await attachmentUpdatePage.getNameInput()).to.eq('name');
        expect(await attachmentUpdatePage.getImagePathInput()).to.eq('imagePath');
        expect(await attachmentUpdatePage.getImageInput()).to.endsWith(fileNameToUpload);
        expect(await attachmentUpdatePage.getAttachmentPathInput()).to.eq('attachmentPath');
        expect(await attachmentUpdatePage.getAttachmentInput()).to.endsWith(fileNameToUpload);
        expect(await attachmentUpdatePage.getContentTypeInput()).to.eq('contentType');
        expect(await attachmentUpdatePage.getCommentInput()).to.eq('comment');
        await attachmentUpdatePage.save();
        expect(await attachmentUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await attachmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Attachment', async () => {
        const nbButtonsBeforeDelete = await attachmentComponentsPage.countDeleteButtons();
        await attachmentComponentsPage.clickOnLastDeleteButton();

        attachmentDeleteDialog = new AttachmentDeleteDialog();
        expect(await attachmentDeleteDialog.getDialogTitle()).to.eq('quizcatApp.attachment.delete.question');
        await attachmentDeleteDialog.clickOnConfirmButton();

        expect(await attachmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
