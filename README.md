# GrapesJS DynamoDB Plugin

The GrapesJS DynamoDB Plugin lets you use AWS DynamoDB as a storage option by adding it to the GrapesJS StorageManager. Additionally, it supports storing multiple projects with multiple pages each.

### HTML
```html
<script src="https://unpkg.com/grapesjs-dynamodb-plugin"></script>

<div id="gjs"></div>
```

### JS
```js
const editor = grapesjs.init({
	container: '#gjs',
  height: '100%',
  fromElement: true,
  storageManager: {
    autosave: 1,
    autoload: 1,
    type: 'dynamodb'
  },
  plugins: ['grapesjs-dynamodb-plugin'],
  pluginsOpts: {
    'grapesjs-dynamodb-plugin': { 
      projectName: 'your-project-name',
      pageName: 'your-page-name',
      
      awsAccessKeyId: 'your-aws-dynamodb-access-key',
      awsSecretAccessKey: 'your-aws-dynamodb-secret',
      awsRegion: 'your-aws-region',
      awsDynamoDBTable: 'your-aws-dynamodb-table-name'
    }
  }
});
```



## Download

* CDN
  * `https://unpkg.com/grapesjs-dynamodb-plugin`
* NPM
  * `npm i grapesjs-dynamodb-plugin`
* GIT
  * `git clone https://github.com/rudynorff/grapesjs-dynamodb-plugin.git`



## Usage

Important to note is that this plugin was created to also support multiple projects and each project can have multiple pages if
necessary. When creating an instance of GrapesJS you must pass the project and page name along, however, if you only want to support a single page in a single project you can e.g. pass 'default' as both the project and page names.

Additionally, you need to provide the name of the DynamoDB table, the region where the table is hosted and an access key and secret. The only requirement on the DynamoDB table is that it needs to have a primary key 'projectID'.

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-dynamodb-plugin.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      // ...
      storageManager: {
        autosave: 1,
        autoload: 1,
        type: 'dynamodb'
      },
      plugins: ['grapesjs-dynamodb-plugin'],
      pluginsOpts: {
        'grapesjs-dynamodb-plugin': { 
          projectName: 'your-project-name',
          pageName: 'your-page-name',
          
          awsAccessKeyId: 'your-aws-dynamodb-access-key',
          awsSecretAccessKey: 'your-aws-dynamodb-secret',
          awsRegion: 'your-aws-region',
          awsDynamoDBTable: 'your-aws-dynamodb-table-name'
        }
      }
  });
</script>
```

Modern javascript
```js
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-dynamodb-plugin';
import 'grapesjs/dist/css/grapes.min.css';

const editor = grapesjs.init({
  container : '#gjs',
  // ...
  plugins: [plugin],
  storageManager: {
    autosave: 1,
    autoload: 1,
    type: 'dynamodb'
  },
  plugins: ['grapesjs-dynamodb-plugin'],
  pluginsOpts: {
    'grapesjs-dynamodb-plugin': { 
      projectName: 'your-project-name',
      pageName: 'your-page-name',
      
      awsAccessKeyId: 'your-aws-dynamodb-access-key',
      awsSecretAccessKey: 'your-aws-dynamodb-secret',
      awsRegion: 'your-aws-region',
      awsDynamoDBTable: 'your-aws-dynamodb-table-name'
    }
  }
});
```



## Development

Clone the repository

```sh
$ git clone https://github.com/rudynorff/grapesjs-dynamodb-plugin.git
$ cd grapesjs-dynamodb-plugin
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build the source

```sh
$ npm run build
```



## License

MIT
