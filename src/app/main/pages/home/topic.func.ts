import { Topic } from '@spaced-repetition/types/topic';

export const isTopicArr = (variableToCheck: any): variableToCheck is Topic[] =>
  (variableToCheck as Topic[]).push !== undefined;

export const isTopic = (t: any): t is Topic => (t as Topic).name !== undefined;
