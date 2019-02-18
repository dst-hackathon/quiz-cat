import { IQuestion } from 'app/shared/model/question.model';

export interface IAttachment {
    id?: number;
    name?: string;
    imagePath?: string;
    imageContentType?: string;
    image?: any;
    attachmentPath?: string;
    attachmentContentType?: string;
    attachment?: any;
    contentType?: string;
    comment?: string;
    question?: IQuestion;
}

export class Attachment implements IAttachment {
    constructor(
        public id?: number,
        public name?: string,
        public imagePath?: string,
        public imageContentType?: string,
        public image?: any,
        public attachmentPath?: string,
        public attachmentContentType?: string,
        public attachment?: any,
        public contentType?: string,
        public comment?: string,
        public question?: IQuestion
    ) {}
}
