import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'quiz',
                loadChildren: './quiz/quiz.module#QuizcatQuizModule'
            },
            {
                path: 'question',
                loadChildren: './question/question.module#QuizcatQuestionModule'
            },
            {
                path: 'attachment',
                loadChildren: './attachment/attachment.module#QuizcatAttachmentModule'
            },
            {
                path: 'label',
                loadChildren: './label/label.module#QuizcatLabelModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizcatEntityModule {}
