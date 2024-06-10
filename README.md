# Lambda DynamoDB CRUD

## Descrição

Esta aplicação implementa operações CRUD utilizando AWS Lambda e DynamoDB.

## Configuração do Ambiente

1. Certifique-se de ter uma conta AWS configurada.
2. Instale o [AWS CLI](https://aws.amazon.com/cli/) e [Node.js](https://nodejs.org/).

## Configuração do DynamoDB

1. No console da AWS, vá para DynamoDB.
2. Crie uma nova tabela com:
    - Nome da tabela: `student`
    - Chave de partição: `id` (String)

## Implementação da Função Lambda

1. Instale as dependências:
    ```bash
    npm install
    ```
2. Comprima `index.js` e `node_modules`:
    ```bash
    zip -r student.zip index.js node_modules
    ```
3. Faça o upload do pacote `.zip` para o Lambda via AWS CLI:
    ```bash
    aws lambda create-function --function-name LambdaStudent \
      --runtime nodejs20.x --role arn:aws:iam::YOUR_ACCOUNT_ID:role/YOUR_LAMBDA_ROLE \
      --handler index.handler --zip-file fileb://student.zip
    ```

## Testando a Função

Use o Postman ou outra ferramenta para enviar requisições para a função Lambda.

### Exemplo de Requisição para Criar Item

```json
{
  "body": "{\"operation\": \"create\", \"tableName\": \"students\", \"payload\": {\"id\": \"123\", \"nome\": \"Cristiano Araújo\"}}"
}
```
```json
{
  "body": "{\"operation\": \"read\", \"tableName\": \"students\", \"payload\": {\"id\": \"123\"}}"
}
```
```json
{
  "body": "{\"operation\": \"update\", \"tableName\": \"students\", \"payload\": {\"key\": {\"id\": \"123\"}, \"updateExpression\": \"set nome = :nome\", \"expressionAttributeValues\": {\":nome\": \"Cristiano Arcanjo\"}}"
}
```
```json
{
  "body": "{\"operation\": \"delete\", \"tableName\": \"students\", \"payload\": {\"id\": \"123\"}}"
}
```
