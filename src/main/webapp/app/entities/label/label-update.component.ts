import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILabel } from 'app/shared/model/label.model';
import { LabelService } from './label.service';

@Component({
    selector: 'jhi-label-update',
    templateUrl: './label-update.component.html'
})
export class LabelUpdateComponent implements OnInit {
    label: ILabel;
    isSaving: boolean;

    labels: ILabel[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected labelService: LabelService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ label }) => {
            this.label = label;
        });
        this.labelService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ILabel[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILabel[]>) => response.body)
            )
            .subscribe((res: ILabel[]) => (this.labels = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.label.id !== undefined) {
            this.subscribeToSaveResponse(this.labelService.update(this.label));
        } else {
            this.subscribeToSaveResponse(this.labelService.create(this.label));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILabel>>) {
        result.subscribe((res: HttpResponse<ILabel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLabelById(index: number, item: ILabel) {
        return item.id;
    }
}
