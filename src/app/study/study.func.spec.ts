import { getNextStudyDate } from './study.func';
import { Box } from './Box';

describe('Study Function', () => {
  describe('getNextStudyDate', () => {

  it('returns correct next study time - Very Hard', () => {
    const mockCard = {
      id: 1,
      topicId: 2,
      front: 'What is TypeScript?',
      back: 'Programming Language',
      lastStudy: 1557806400,
      box: Box.VERY_HARD
    };

    const actual = getNextStudyDate(mockCard);
    const expected = 1557892800;

    expect(actual).toEqual(expected);
  });

  it('returns correct next study time - Hard', () => {
    const mockCard = {
      id: 1,
      topicId: 2,
      front: 'What is TypeScript?',
      back: 'Programming Language',
      lastStudy: 1557806400,
      box: Box.HARD
    };

    const actual = getNextStudyDate(mockCard);
    const expected = 1558670400;

    expect(actual).toEqual(expected);
  });

  it('returns correct next study time - Regular', () => {
    const mockCard = {
      id: 1,
      topicId: 2,
      front: 'What is TypeScript?',
      back: 'Programming Language',
      lastStudy: 1557806400,
      box: Box.REGULAR
    };

    const actual = getNextStudyDate(mockCard);
    const expected = 1560398400;

    expect(actual).toEqual(expected);
  });

  it('returns correct next study time - Easy', () => {
    const mockCard = {
      id: 1,
      topicId: 2,
      front: 'What is TypeScript?',
      back: 'Programming Language',
      lastStudy: 1557806400,
      box: Box.EASY
    };

    const actual = getNextStudyDate(mockCard);
    const expected = 1565582400;

    expect(actual).toEqual(expected);
  });

  it('returns correct next study time - Very Easy', () => {
    const mockCard = {
      id: 1,
      topicId: 2,
      front: 'What is TypeScript?',
      back: 'Programming Language',
      lastStudy: 1557806400,
      box: Box.VERY_EASY
    };

    const actual = getNextStudyDate(mockCard);
    const expected = 1573358400;

    expect(actual).toEqual(expected);
  })
  })
});
