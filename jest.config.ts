import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    verbose: true,
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
    };
    
export default config;
    