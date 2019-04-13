import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Quiz } from 'app/shared/model/quiz.model';
import { QuizService } from './quiz.service';
import { QuizComponent } from './quiz.component';
import { QuizDetailComponent } from './quiz-detail.component';
import { QuizUpdateComponent } from './quiz-update.component';
import { QuizDeletePopupComponent } from './quiz-delete-dialog.component';
import { IQuiz } from 'app/shared/model/quiz.model';

@Injectable({ providedIn: 'root' })
export class QuizResolve implements Resolve<IQuiz> {
    constructor(private service: QuizService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuiz> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Quiz>) => response.ok),
                map((quiz: HttpResponse<Quiz>) => quiz.body)
            );
        }
        return of(new Quiz());
    }
}

export const quizRoute: Routes = [
    {
        path: '',
        component: QuizComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'quizcatApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: QuizDetailComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'quizcatApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: QuizUpdateComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'quizcatApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: QuizUpdateComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'quizcatApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quizPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: QuizDeletePopupComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'quizcatApp.quiz.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
