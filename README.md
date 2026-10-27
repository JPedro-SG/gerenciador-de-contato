# Gerenciador de Contato - API Node.js

## 📝 Instruções de Execução
1. Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.
2. Execute o comando `npm install` para instalar todas as bibliotecas necessárias.
3. Execute o comando `npm run seed` para criar o banco de dados e a tabela `contatos`, além de popular o banco com alguns contatos iniciais.  
4. Execute `npm run dev` para iniciar o servidor com **nodemon** (Mantive o nodemon para facilitar a execução em ambiente local.). Caso prefiram podem utilizar `npm run test`.


## ✅ Checklist do Projeto - API Node.js

### ⚙️ Configuração do Ambiente
- [x] Criar uma aplicação **Node.js** utilizando o framework **Express**  
- [x] Conectar a um banco de dados **MySQL**  
- [x] Criar um arquivo `.env` para armazenar variáveis de ambiente (ex: credenciais do banco de dados)  

### 🚀 Rotas da API

#### POST /contatos
- [x] Descrição: Adicionar um novo contato  
- [x] Body: `{"nome": "string", "telefone": "string"}`  
- [x] Resposta: Retornar o contato criado com status **201**  

#### GET /contatos
- [x] Descrição: Listar todos os contatos  
- [x] Resposta: Retornar uma lista de contatos com status **200**  

#### PATCH /contatos/:id
- [x] Descrição: Atualizar um contato existente  
- [x] Parâmetro: `id` (identificador único do contato)  
- [x] Body: `{"nome": "string", "telefone": "string"}`  
- [x] Resposta: Retornar o contato atualizado com status **200**  

#### DELETE /contatos/:id
- [x] Descrição: Excluir um contato existente  
- [x] Parâmetro: `id` (identificador único do contato)  
- [x] Resposta: Retornar uma mensagem de sucesso com status **204**  

### ✅ Validações
- [x] Implementar validações para garantir que os dados inseridos atendam aos critérios:  
  - [x] **Nome:** Mínimo de duas palavras, cada uma com pelo menos 3 letras  