
env-config-params
=================

Utils for choose a config params file according to NODE_ENV.

## Installation

```
npm install --save env-config-params 
```

## Configuration

- Create a new folder where it will save all param configuration for local, development and production environment. For default the folder name is **config**.

- Add new configurations like this \<environment>.json. Example: local.json, development.json, production.json. **Note:** It could be JS files.

- Each config file need to have the next structure for db config params for create db uri string (optional), also it is possible to add fields as much as need:

```json user.json
{
    "port": 0,
    "db": {
        "host": "",
        "name": "",
        "port": "",
        "user": "",
        "password": ""
    }
}
```

- **NODE_ENV** should fit with config params file. For example, **NODE_ENV=production** then config file will be **production.json**. If there isn't any NODE_ENV defined, the default file it'll be **local.json**.

## Options

- **dbURI:** It allows to create an uri string with the DB params, this uri is added in the resulting config object.

## Example

```js
const config = require("env-config-params")({
  dbURI: true
});
```

