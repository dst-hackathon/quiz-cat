import { IAttachment } from 'app/shared/model/attachment.model';
import { ILabel } from 'app/shared/model/label.model';

export const enum AnswerSize {
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL'
}

export interface IQuestion {
    id?: number;
    summary?: string;
    description?: any;
    objective?: string;
    keyAnswer?: string;
    answerSize?: AnswerSize;
    answerDescription?: string;
    expectedTime?: number;
    attachments?: IAttachment[];
    labels?: ILabel[];
}

export class Question implements IQuestion {
    constructor(
        public id?: number,
        public summary?: string,
        public description?: any,
        public objective?: string,
        public keyAnswer?: string,
        public answerSize?: AnswerSize,
        public answerDescription?: string,
        public expectedTime?: number,
        public attachments?: IAttachment[],
        public labels?: ILabel[]
    ) {}
}
