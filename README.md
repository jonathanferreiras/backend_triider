# backend_triider

Teste de API realizado para a empresa Triider.

#### DESENVOLVIMENTO BÁSICO:
Problema: Você deverá construir uma solução capaz de realizar os agendamentos de animadores de festas infantis.

### Instalação

1. Instale Node.js no seu computador.

2. Clone / baixe esta pasta para o seu computador.

3. Executar o seguinte comando dentro desta pasta:
`$ yarn install`

4. Para iniciar a API execute o seguinte comando:
`$ yarn start`

5. a API irá rodar no endereço:
`localhost:3000`


### Banco de dados

Segue a modelagem utilizada e o script sql está na pasta raiz do projeto:
![](/readme_img/model.jpg)


### Rotas

Temos 2 rotas principais, de usuario e de horários:

#### Usuários

- POST: 
	**localhost/user:** cria um usuário/animador. **[1]**
	**localhost/login:**  loga o usuário/animador. **[2]**
- GET:
	**localhost/user:** busca animadores por tipo. **[3]**

#### Horários
- POST: 
	**localhost/schedules:** cria um novo horário. **[4]**
- GET:
	**localhost/schedules:**  busca os horários dos animadores. **[5]**
    **localhost/schedules/{id}:** Busca horários marcados pelo usuário. **[6]**


### Uso pelo frontend

A API foi bem básica sem a utilização de autenticação por tokens. Foi utilizado o id do usuário para identificação. Não foi realizado o frontend a tempo porém segue a rotina do app:

- O usuário irá se cadastrar pela rota [1], após o cadastro o mesmo irá logar pela rota [2]. Na requisição de login [2] o usuário irá receber seu ID que ficaria vinculado na sessão ou por cookie.

- Ao solicitar um tipo de animador o front irá requisitar a rota [3] retornando todos os usuários cadastrados daquele tipo de animador.

- Ao verificar a agenda o front requisitará a rota [5], passando o tipo de animador, a data inicial e final. Ao receber os dados de horários já marcados para aqueles animadores o front poderá invalidar os mesmos horários para o cliente escolher.

- O cliente então preenche o horário, local e etc. O front realiza um post para a rota[4].

- Caso o cliente queira verificar os horários marcados basta realizar a requisição na rota[6].



Esta API foi realizada com o intuito de realizar uma algo simples que resolva o problema proposto. Acredito que no futuro com um numero maior de animadores a rota [5] causaria congestionamento no BD e deveria ser revista. 


### Dependências

 -    "md5": "^2.2.1",
 -    "pg": "^7.17.1"
 -    "cors": "^2.8.5"
 -    "express": "^4.17.1"
