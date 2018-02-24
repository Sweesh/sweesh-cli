// @flow
import resolve from './resolve';

export function createMessage(message) {
    return `Sweesh, ${message}`;
}

console.log(createMessage('dude!'));

// playing with this
resolve([], 'test').catch(console.error);
