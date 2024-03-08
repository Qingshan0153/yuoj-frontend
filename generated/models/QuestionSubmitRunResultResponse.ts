/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeInfo0 } from './JudgeInfo0';

export type QuestionSubmitRunResultResponse = {
    actualOutput?: Array<string>;
    error_message?: string;
    expectedOutput?: Array<string>;
    judgeInfo?: JudgeInfo0;
    status?: number;
};
