/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { QuizService } from 'app/entities/quiz/quiz.service';
import { IQuiz, Quiz } from 'app/shared/model/quiz.model';

describe('Service Tests', () => {
    describe('Quiz Service', () => {
        let injector: TestBed;
        let service: QuizService;
        let httpMock: HttpTestingController;
        let elemDefault: IQuiz;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(QuizService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Quiz(0, currentDate, 0, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        generateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Quiz', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        generateDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        generateDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Quiz(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Quiz', async () => {
                const returnedFromService = Object.assign(
                    {
                        generateDate: currentDate.format(DATE_TIME_FORMAT),
                        timeLimit: 1,
                        description: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        generateDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Quiz', async () => {
                const returnedFromService = Object.assign(
                    {
                        generateDate: currentDate.format(DATE_TIME_FORMAT),
                        timeLimit: 1,
                        description: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        generateDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Quiz', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
