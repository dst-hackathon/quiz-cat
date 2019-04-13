import { Moment } from 'moment';
import { IQuestion } from 'app/shared/model/question.model';
import { ILabel } from 'app/shared/model/label.model';

export interface IQuiz {
    id?: number;
    generateDate?: Moment;
    timeLimit?: number;
    description?: string;
    questions?: IQuestion[];
    labels?: ILabel[];
}

export class Quiz implements IQuiz {
    constructor(
        public id?: number,
        public generateDate?: Moment,
        public timeLimit?: number,
        public description?: string,
        public questions?: IQuestion[],
        public labels?: ILabel[]
    ) {}
}
