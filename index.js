

const getURI = ({ host, port, name, user = "", password = "" }) => {
    const uri = "mongodb://";
    port = port? `:${port}`: "";
    const defaultUri = `${host}${port}/${name}`;

    const hasCredentials = user && password;
    return hasCredentials? `${uri}${user}:${password}@${defaultUri}` : `${uri}${defaultUri}`;
};

const getConfig = (configPath, envConfig) => {
    const filePathNoExt = `${configPath}/${envConfig}`;
    let config;
    try {
        config = require(`${filePathNoExt}.json`);
    } catch (error) {
        config = require(`${filePathNoExt}.js`);
    }
    
    return config;
}
const startConfig = (configParams = {}) => {
    const {customConfigFolder = "", dbURI = false, processEnv = ""} = configParams;
    const currentProjectPath = process.cwd();
    const configFolder = customConfigFolder || "config";
    const configPath = `${currentProjectPath}/${configFolder}`;
    const {NODE_ENV = "local"} = processEnv || process.env; 
    const envConfig = NODE_ENV === "dev" ? "development" : NODE_ENV;
    const config = getConfig(configPath, envConfig);
    if (config) {
        if (dbURI) { 
            config.dbURI = getURI(config.db);
        }
        return config;
    }
    throw "No config file found!";
}

module.exports = startConfig;