import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { QuizcatSharedModule } from 'app/shared';
import {
    AttachmentComponent,
    AttachmentDetailComponent,
    AttachmentUpdateComponent,
    AttachmentDeletePopupComponent,
    AttachmentDeleteDialogComponent,
    attachmentRoute,
    attachmentPopupRoute
} from './';

const ENTITY_STATES = [...attachmentRoute, ...attachmentPopupRoute];

@NgModule({
    imports: [QuizcatSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AttachmentComponent,
        AttachmentDetailComponent,
        AttachmentUpdateComponent,
        AttachmentDeleteDialogComponent,
        AttachmentDeletePopupComponent
    ],
    entryComponents: [AttachmentComponent, AttachmentUpdateComponent, AttachmentDeleteDialogComponent, AttachmentDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizcatAttachmentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
