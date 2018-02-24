import resolve from './resolve';

export function createMessage(message) {
    return `Sweesh, ${message}`;
}

console.log(createMessage('dude!'));
