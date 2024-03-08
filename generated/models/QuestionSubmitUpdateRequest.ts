/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeInfo1 } from './JudgeInfo1';

export type QuestionSubmitUpdateRequest = {
    code?: string;
    error_message?: string;
    id?: number;
    isDelete?: number;
    judgeInfo?: JudgeInfo1;
    language?: string;
    outPut?: string;
    questionId?: number;
    status?: number;
    userId?: number;
};
