import { Errors } from '../../errors';

export type ErrorsMessage = (typeof Errors)[keyof typeof Errors];
