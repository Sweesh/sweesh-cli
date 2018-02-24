// @flow
import resetLogger from '../logger';

export const command = 'logout';

export const describe = 'log out of Sweesh account on this computer';

export function handler(argv: any) {
    resetLogger();
}
