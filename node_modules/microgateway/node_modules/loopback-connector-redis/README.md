## loopback-connector-redis

> **THIS MODULE IS PRE-RELEASE AND UNDER ACTIVE DEVELOPMENT**

Redis connector for LoopBack.

## Usage

To use it you need `loopback-datasource-juggler@1.0.x`.

1. Setup dependencies in `package.json`:

    ```json
    {
      ...
      "dependencies": {
        "loopback-datasource-juggler": "~1.0.0",
        "loopback-connector-redis": "latest"
      },
      ...
    }
    ```

2. Use:

    ```javascript
        var DataSource = require('loopback-datasource-juggler').DataSource;
        var ds = new DataSource('redis');
    ```

## Running tests

Make sure you have redis server running on default port, then run

    npm test

Be careful, it could delete your data in database number 0

## MIT License

