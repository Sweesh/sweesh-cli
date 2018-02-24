import { createMessage } from '../src/index';

test('creates correct messsage', () => {
    expect(createMessage('dudette!')).toBe('Sweesh, dudette!');
});