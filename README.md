# Decentralized @Module example for Reactive extension dependency injection (@rxdi) with Inter planetary file system(IPFS)
> This module is created to provide example for future ipfs decentralized node modules using pure nodejs
> In this repository you will find one module from rxdi infrastructure with included service.
> Reading above you will understand how to create and deploy your own module using ipfs network and rxdi infrastructure


Installing dependencies:

```bash
npm install
```

Building module:

```bash
npm run build
```


##### Complete instructions can be found below.

(Optional)
First we need to install ParcelJS Bundler globally

```bash
npm i -g parcel-bundler
```

Inside this repository `devDependencies`, `parce-bundler` is included

Inside `gapi-cli.conf.yml` there is a command called `gapi module build` or `npm run build`
```yml
commands:
  testing:
    browser: jest --env jsdom --testPathPattern="/src/.*\\.browser.spec.(ts|tsx|js)$"
    node: jest --env node --testPathPattern="/src/.*\\.spec.(ts|tsx|js)$"
  module:
    build:
      - ./node_modules/.bin/parcel build --target node development/index.ts
      - ./node_modules/.bin/rxdi-merge --name @test --project . --out dist/index.d.ts
      - find . -not -path "./node_modules/*" -type f -iname \*.map -delete
      - cp -r dist/* .
      - ./node_modules/.bin/gapi module clean
    clean:
      - rm -rf dist
      - rm -rf .cache
    deploy:
      - jsipfs add index.js
      - jsipfs add index.d.ts
    deploy-config:
      - jsipfs add index.json
```

Lets take a closer look command by command

#### Building
This will take `index.ts` inside development folder will bundle it to single js file inside `dist/index.js` with mapping `dist/index.map`

You should export everything like `export * from ''` inside this `index.ts` because parcel needs to know what this module includes.
Else you will end up not having all your files bundled.

```bash
parcel build --target node development/index.ts
```

#### Merging
This command will search for *.ts files from them will generate index.d.ts file representing all your Typescript Module Definitions

You can install this Globally by typing: `npm i @rxdi/dts-merge -g`

Inside this repository `devDependencies` [@rxdi/dts-merge](https://github.com/rxdi/dts-merge) is included

```bash
rxdi-merge --name @test --project . --out dist/index.d.ts
```

#### Delete unused .map files
This command will search for all *.map files inside your project generated from parcel and will delete it since we don't need them when module is builded for deployment
```bash
find . -not -path "./node_modules/*" -type f -iname \*.map -delete
```

#### Copy generated bundle
Copy all generated files to root `index.js`, `index.d.ts` these two files represent our module
```bash
cp -r dist/* .
```


#### Clean build
```bash
gapi module clean
```

#### Deploy to ipfs network

Now we need to deploy our module to ipfs network

1.Create file called index.json

2.Add this content

```typescript
{
    "name":"@test",
    "typings": "QmW1vAT4oy8w1iB8YoZMvmHoVF4GUHT1eE7h49UqViWawW",
    "module": "QmfCbYHggmJ5ZdnTRZ9X56iV6KR1REqxKmbX6GjspamH5w"
}
```

Where:

`name` - Module namespace this is important since it will be downloaded inside node_modules as @test and inside node_modules/@types/@test

`typings` - Hash from ipfs network leading to our generated types `index.d.ts`

Download folder: 'node_modules/@types/@test

`module` - Hash from ipfs network leading to our generated module via ParcelJS `index.js`

Download folder: 'node_modules/@test

To use this typings you need to set `typeRoots` to `"node_modules/@types"` inside `tsconfig.json`

The system will automatically download typings to @types folder
```json
  "typeRoots": [
    "node_modules/@types"
  ]
```

Example @test module: https://ipfs.io/ipfs/QmWtJLqyokMZE37DgncpY5HhFvtFQieBzMPDQ318aJeTw6



Now you should know what to do! We need to deploy index.js and index.d.ts files from where we will get Hash key

We need `ipfs` module to deploy our modules or you can deploy them manually with Desktop application provided from

Ipfs Shipyard Desktop https://github.com/ipfs-shipyard/ipfs-desktop

Documentation for ipfs CLI can be found here: https://github.com/ipfs/js-ipfs
```bash
npm install ipfs -g
```

To add our modules to ipfs:

```bash
jsipfs add index.js && jsipfs add index.d.ts
```

This will print something like this

```bash
added QmW1vAT4oy8w1iB8YoZMvmHoVF4GUHT1eE7h49UqViWawW index.d.ts
added QmfCbYHggmJ5ZdnTRZ9X56iV6KR1REqxKmbX6GjspamH5w index.js
```

Lets prepare our configuration inside `index.json`


```json
{
    "name":"@test",
    "typings": "QmW1vAT4oy8w1iB8YoZMvmHoVF4GUHT1eE7h49UqViWawW",
    "module": "QmfCbYHggmJ5ZdnTRZ9X56iV6KR1REqxKmbX6GjspamH5w"
}
```

Deploy `index.json` to ipfs network

```bash
jsipfs add index.json
```

This will print something like this

```bash
added QmWtJLqyokMZE37DgncpY5HhFvtFQieBzMPDQ318aJeTw6 index.json
```


Voila!!!! You are ready!!! now lets install this module inside `rxdi` infrastructure

Lets take [simple server side example](https://github.com/rxdi/starter-server-side)

Inside `package.json` add the following configuration
```json
  "ipfs": {
    "provider": "https://ipfs.io/ipfs/",
    "dependencies": [
      "QmWtJLqyokMZE37DgncpY5HhFvtFQieBzMPDQ318aJeTw6"
    ]
  },
```

where:

`provider` - This is public gateway from where we will download our modules you can try also with your private gateway http://127.0.0.1:8080/ipfs/

`dependencies` - This Array from hashes represents our modules with hash aka index.json which we deploy to ipfs network

```json
{
    "name":"@test",
    "typings": "QmW1vAT4oy8w1iB8YoZMvmHoVF4GUHT1eE7h49UqViWawW",
    "module": "QmfCbYHggmJ5ZdnTRZ9X56iV6KR1REqxKmbX6GjspamH5w"
}
```


Now we need to run our rxdi install command:

This will take configuration from package.json > ipfs and will download all modules representing Hashes inside `dependencies`
See real world example: https://ipfs.io/ipfs/QmWtJLqyokMZE37DgncpY5HhFvtFQieBzMPDQ318aJeTw6

Running from local node_modules installation
```bash
node ./node_modules/@rxdi/core/bin/root.js install
```

or

```bash
./node_modules/.bin/rxdi install
```

or Global

```bash
npm i -g @rxdi/core
```

Now you should have `rxdi install` command globally for all `rxdi` projects this will read `package.json` > "ipfs" object

Command will look for `package.json` inside current working directory where it is executed

Now when we execute:

```bash
rxdi install
```

You should see something like this:

```json
[
  {
    "hash": "QmWtJLqyokMZE37DgncpY5HhFvtFQieBzMPDQ318aJeTw6",
    "provider": "https://ipfs.io/ipfs/"
  }
]
Modules installed!
```


If you want to install single dependency type:

Short version it will default to `https://ipfs.io/ipfs/` provider
```
rxdi install QmWtJLqyokMZE37DgncpY5HhFvtFQieBzMPDQ318aJeTw6
```

Long version
```
rxdi install --hash=QmWtJLqyokMZE37DgncpY5HhFvtFQieBzMPDQ318aJeTw6 --provider=https://ipfs.io/ipfs/
```


##### In Action

```typescript
import { Module, Bootstrap } from '@gapi/core';
import { TestModule, TestService } from '@test';

@Module({
    imports: [
        TestModule
    ]
})
export class AppModule { }

Bootstrap(AppModule)
    .subscribe(
        () => console.log('Started!'),
        (e) => console.error(e)
    );
```

This is it !
You can Enjoy decentralized rxdi module system!
There is a platform which will be created representing all your private and public modules
Purpose is when you copy `QmWtJLqyokMZE37DgncpY5HhFvtFQieBzMPDQ318aJeTw6` and paste it inside search it should show you the package with README.md and everything like regular repository.

Njoy!

