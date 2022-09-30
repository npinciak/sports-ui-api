import { League } from '../models/league.model';
import { jest } from '@jest/globals';
import { BaseQueryController as IBaseQueryController } from './base-query.controller';

const BaseQueryController = jest.mock('./base-query.controller.ts'); // SoundPlayer is now a mock constructor

export const mockBaseQueryController = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return { baseQueryController: IBaseQueryController };
});

describe('BaseQueryController', () => {
  beforeEach(() => {
    mockBaseQueryController.mockClear();

    // Clear all instances and calls to constructor and all methods:
  });
  it('should do something', () => {});
});
