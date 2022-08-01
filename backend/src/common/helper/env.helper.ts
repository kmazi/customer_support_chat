import { existsSync } from 'fs';
import { resolve } from 'path';

const getEnvPath = (dest: string): string => {
    const env: string | undefined = process.env.NODE_ENV;
    const filename: string = env ? `${env}.env` : 'development.env';
    let filePath: string = resolve(`${dest}/${filename}`);
    const fallback: string = resolve(`${dest}/.env`);
    if (!existsSync(filePath)) {
        filePath = fallback;
      }
    return filePath;
}

export default getEnvPath