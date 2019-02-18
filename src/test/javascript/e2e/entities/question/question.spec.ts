/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { QuestionComponentsPage, QuestionDeleteDialog, QuestionUpdatePage } from './question.page-object';

const expect = chai.expect;

describe('Question e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let questionUpdatePage: QuestionUpdatePage;
    let questionComponentsPage: QuestionComponentsPage;
    let questionDeleteDialog: QuestionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Questions', async () => {
        await navBarPage.goToEntity('question');
        questionComponentsPage = new QuestionComponentsPage();
        await browser.wait(ec.visibilityOf(questionComponentsPage.title), 5000);
        expect(await questionComponentsPage.getTitle()).to.eq('quizcatApp.question.home.title');
    });

    it('should load create Question page', async () => {
        await questionComponentsPage.clickOnCreateButton();
        questionUpdatePage = new QuestionUpdatePage();
        expect(await questionUpdatePage.getPageTitle()).to.eq('quizcatApp.question.home.createOrEditLabel');
        await questionUpdatePage.cancel();
    });

    it('should create and save Questions', async () => {
        const nbButtonsBeforeCreate = await questionComponentsPage.countDeleteButtons();

        await questionComponentsPage.clickOnCreateButton();
        await promise.all([
            questionUpdatePage.setSummaryInput('summary'),
            questionUpdatePage.setDescriptionInput('description'),
            questionUpdatePage.setObjectiveInput('objective'),
            questionUpdatePage.setKeyAnswerInput('keyAnswer'),
            questionUpdatePage.answerSizeSelectLastOption(),
            questionUpdatePage.setAnswerDescriptionInput('answerDescription'),
            questionUpdatePage.setExpectedTimeInput('5')
            // questionUpdatePage.labelSelectLastOption(),
        ]);
        expect(await questionUpdatePage.getSummaryInput()).to.eq('summary');
        expect(await questionUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await questionUpdatePage.getObjectiveInput()).to.eq('objective');
        expect(await questionUpdatePage.getKeyAnswerInput()).to.eq('keyAnswer');
        expect(await questionUpdatePage.getAnswerDescriptionInput()).to.eq('answerDescription');
        expect(await questionUpdatePage.getExpectedTimeInput()).to.eq('5');
        await questionUpdatePage.save();
        expect(await questionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await questionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Question', async () => {
        const nbButtonsBeforeDelete = await questionComponentsPage.countDeleteButtons();
        await questionComponentsPage.clickOnLastDeleteButton();

        questionDeleteDialog = new QuestionDeleteDialog();
        expect(await questionDeleteDialog.getDialogTitle()).to.eq('quizcatApp.question.delete.question');
        await questionDeleteDialog.clickOnConfirmButton();

        expect(await questionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
