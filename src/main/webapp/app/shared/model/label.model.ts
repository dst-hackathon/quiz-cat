import { ILabel } from 'app/shared/model/label.model';

export interface ILabel {
    id?: number;
    text?: string;
    parent?: ILabel;
}

export class Label implements ILabel {
    constructor(public id?: number, public text?: string, public parent?: ILabel) {}
}
