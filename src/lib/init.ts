import type { Config } from "./interfaces/config.js";

let config: Config | null = null;


const init = (configData: Config) => {
    config = configData;
}

const getConfig = () => {
    if(!config) {
        throw new Error('Config not initialized');
    }

    const readonlyConfig = { ...config } as Config;

    return readonlyConfig;
}

export { init as Init , getConfig  };