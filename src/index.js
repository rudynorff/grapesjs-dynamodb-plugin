import DynamoDB from 'aws-sdk/clients/dynamodb';



export default (editor, opts = {}) => {
  const options = { ...{
    projectName: 'default-project',
    pageName: 'index',
    
    awsAccessKeyId: 'AWS Access Key',
    awsSecretAccessKey: 'AWS Access Secret',
    awsRegion: 'eu-central-1',
    awsDynamoDBTable: 'table-name'
  },  ...opts };


  const projectName = options.projectName;
  const pageName = options.pageName;

  const accessKeyId = options.awsAccessKeyId;
  const secretAccessKey = options.awsSecretAccessKey;
  const region = options.awsRegion;
  const awsDynamoDBTable = options.awsDynamoDBTable;


  var documentClient = new DynamoDB.DocumentClient({ 
    region,
    accessKeyId,
    secretAccessKey
  });
  function fetchPageDynamoDB(projectID, pageName, grapesCallback) {
    var params = {
      TableName : awsDynamoDBTable,
      Key: {
        projectID
      }
    };

    documentClient.get(params, function(err, data) {
      var normalizedData = null;
      if (!err && data && data.Item && data.Item.pages && data.Item.pages[pageName]) {
        normalizedData = data.Item.pages[pageName];
      }

      grapesCallback(err, normalizedData);          
    });
  }
  function fetchAllPagesDynamoDB(projectID, grapesCallback) {
    var params = {
      TableName : awsDynamoDBTable,
      Key: {
        projectID
      }
    };

    documentClient.get(params, function(err, data) {
      if (!data.Item || !data.Item.pages) {
        grapesCallback(err, null);
        return;
      }
      grapesCallback(err, data.Item.pages);
    });
  }
  function putDynamoDB(projectID, pageName, pagesObject, grapesCallback) {
    var params = {
      Item: {
        projectID,
        pages: pagesObject
      }, 
      Key: {
        projectID
      },
      TableName: awsDynamoDBTable
    };

    documentClient.put(params, function(err, data) {
      grapesCallback(err, data);          
    });
  }

  editor.StorageManager.add('dynamodb', {
    load(keys, callback, errorCallback) {
      fetchPageDynamoDB(projectName, pageName, (error, data) => {
        if (error) {
          errorCallback(error);
        } else {
          callback(data);
        }
      });
    },

    store(dataObject, callback, errorCallback) {
      fetchAllPagesDynamoDB(projectName, (error, existingProjectPages) => {
        if (error) {
          errorCallback(error);
        } else {
          const projectPages = existingProjectPages || {};
          projectPages[pageName] = dataObject;

          putDynamoDB(projectName, pageName, projectPages, (error, data) => {
            if (error) {
              errorCallback(error);
            } else {
              callback();
            }
          });
        }
      });
    }
  });
  editor.load((res) => { console.log('Load callback') });

};