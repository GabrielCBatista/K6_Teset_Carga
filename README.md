# ServeRest

## Introdução

Este projeto tem como objetivo realizar testes de volume, estresse e desempenho em uma API Restful usando a ferramenta [k6](https://k6.io/).

## Pré-requisitos

Para executar os testes, é necessário ter o `k6` instalado em sua máquina. Caso não tenha, você pode baixá-lo [aqui](https://k6.io/docs/getting-started/installation/).

## Como executar os testes

1. Faça o download do repositório do ServeRest em https://github.com/ServeRest/ServeRest e execute localmente.

2. Abra um terminal na pasta raiz do projeto e instale as dependências do projeto com o seguinte comando:

   ```sh
   npm install
   ```

3. Execute os testes de volume com o seguinte comando:

   ```sh
   k6 run scenarios/test-volume.js
   ```

4. Execute os testes de estresse com o seguinte comando:

   ```sh
   k6 run scenarios/test-estresse.js
   ```

5. Execute os testes de desempenho com o seguinte comando:

   ```sh
   k6 run scenarios/test-desempenho.js
   ```

## Critérios de avaliação

Durante a execução dos testes, os seguintes critérios de avaliação são considerados:

- **Teste de volume:** 80% das requisições devem ser obtidas com sucesso.

- **Teste de estresse e desempenho:** 80% das requisições com status 200 devem obter sucesso e 95% das requisições devem ser concluídas em menos de 5 segundos.

Caso algum critério não seja atendido, um erro será exibido no console indicando qual teste falhou.
