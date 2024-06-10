// Importar o SDK da AWS
const AWS = require('aws-sdk');

// Configurar a região
AWS.config.update({ region: 'us-east-1' });

// Criar uma instância do DynamoDB DocumentClient
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // Desestruturar os parâmetros da requisição
  const { operation, tableName, payload } = JSON.parse(event.body);

  let response;
  try {
    switch (operation) {
      case 'create':
        response = await createItem(tableName, payload);
        break;
      case 'read':
        response = await readItem(tableName, payload);
        break;
      case 'update':
        response = await updateItem(tableName, payload);
        break;
      case 'delete':
        response = await deleteItem(tableName, payload);
        break;
      default:
        throw new Error(`Unsupported operation "${operation}"`);
    }
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// Função para criar um item no DynamoDB
const createItem = async (tableName, item) => {
  const params = {
    TableName: tableName,
    Item: item,
  };
  await dynamoDB.put(params).promise();
  return { message: 'Item created successfully', item };
};

// Função para ler um item do DynamoDB
const readItem = async (tableName, key) => {
  const params = {
    TableName: tableName,
    Key: key,
  };
  const result = await dynamoDB.get(params).promise();
  return result.Item ? result.Item : { message: 'Item not found' };
};

// Função para atualizar um item no DynamoDB
const updateItem = async (tableName, payload) => {
  const { key, updateExpression, expressionAttributeValues } = payload;
  const params = {
    TableName: tableName,
    Key: key,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  };
  const result = await dynamoDB.update(params).promise();
  return result.Attributes;
};

// Função para deletar um item do DynamoDB
const deleteItem = async (tableName, key) => {
  const params = {
    TableName: tableName,
    Key: key,
  };
  await dynamoDB.delete(params).promise();
  return { message: 'Item deleted successfully' };
};
