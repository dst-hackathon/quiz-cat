import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { QuizcatSharedModule } from 'app/shared';
import {
    QuizComponent,
    QuizDetailComponent,
    QuizUpdateComponent,
    QuizDeletePopupComponent,
    QuizDeleteDialogComponent,
    quizRoute,
    quizPopupRoute
} from './';

const ENTITY_STATES = [...quizRoute, ...quizPopupRoute];

@NgModule({
    imports: [QuizcatSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [QuizComponent, QuizDetailComponent, QuizUpdateComponent, QuizDeleteDialogComponent, QuizDeletePopupComponent],
    entryComponents: [QuizComponent, QuizUpdateComponent, QuizDeleteDialogComponent, QuizDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizcatQuizModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
