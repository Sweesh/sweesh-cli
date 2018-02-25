// @flow

import fs from 'fs';
import path from 'path';
import _rimraf from 'rimraf';
import { promisify } from 'util';
import fetch from 'node-fetch';
import tar from 'tar';

const rimraf = promisify(_rimraf);
const mkdir = promisify(fs.mkdir);

export default async function(repoStub: string, pluginsDir: string): Promise<string> {
    const pluginName = repoStub.split('/')[1];
    const pluginPath = path.join(pluginsDir, pluginName);

    await rimraf(pluginPath);
    await mkdir(pluginPath);

    const data = await fetch(`https://api.github.com/repos/${repoStub}/tarball/master`);
    data.body.pipe(tar.x({
        strip: 1,
        cwd: pluginPath
    }));
}
