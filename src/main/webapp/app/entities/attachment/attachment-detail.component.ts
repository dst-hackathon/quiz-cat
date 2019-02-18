import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAttachment } from 'app/shared/model/attachment.model';

@Component({
    selector: 'jhi-attachment-detail',
    templateUrl: './attachment-detail.component.html'
})
export class AttachmentDetailComponent implements OnInit {
    attachment: IAttachment;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ attachment }) => {
            this.attachment = attachment;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
