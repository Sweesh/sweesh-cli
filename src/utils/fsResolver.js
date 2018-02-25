import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);

export async function fn({app: filePath}) {
    const resolvedPath = path.resolve(process.cwd(), filePath);
    try {
        await access(resolvedPath);
        return {
            path: resolvedPath
        };
    }

    catch (e) {
        // Unable to find or access the file
        return null;
    }
};

export const name = 'fs-resolver';

export default {
    fn,
    name
};
