Gerenciamento de Projetos
Este projeto é uma aplicação de gerenciamento de projetos desenvolvida com React, TypeScript e Firebase. Ele permite a criação, atualização e gerenciamento de projetos, bem como a atribuição de responsáveis e a definição de status para cada projeto.

Funcionalidades
Criação de novos projetos
Atribuição de responsáveis aos projetos
Atualização do status dos projetos (A fazer, Fazendo, Concluído)
Listagem de projetos por status
Criação de novas pessoas (responsáveis)
Tecnologias Utilizadas
React
TypeScript
Vite
Firebase Firestore
React Select
React Router
Configuração do Projeto
Pré-requisitos
Node.js (versão 14 ou superior)
npm ou yarn
Instalação
Clone o repositório:
bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git
Navegue até o diretório do projeto:
bash
Copiar código
cd seu-repositorio
Instale as dependências:
bash
Copiar código
npm install

# ou

yarn install
Configuração do Firebase
Crie um projeto no Firebase.
Configure Firestore no seu projeto Firebase.
Obtenha suas credenciais de configuração do Firebase (apiKey, authDomain, projectId, etc.).
Crie um arquivo .env na raiz do projeto e adicione suas credenciais Firebase:
env
Copiar código
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
Execução do Projeto
Para iniciar o servidor de desenvolvimento, execute:

bash
Copiar código
npm run dev

# ou

yarn dev
Build para Produção
Para criar uma build para produção, execute:

bash
Copiar código
npm run build

# ou

yarn build
ESLint Configuration
Se você está desenvolvendo uma aplicação de produção, recomendamos atualizar a configuração do ESLint para habilitar regras de lint com reconhecimento de tipos:

Configure a propriedade parserOptions no nível superior da seguinte forma:
js
Copiar código
export default {
// outras regras...
parserOptions: {
ecmaVersion: 'latest',
sourceType: 'module',
project: ['./tsconfig.json', './tsconfig.node.json'],
tsconfigRootDir: \_\_dirname,
},
}
Substitua plugin:@typescript-eslint/recommended por plugin:@typescript-eslint/recommended-type-checked ou plugin:@typescript-eslint/strict-type-checked.
Opcionalmente, adicione plugin:@typescript-eslint/stylistic-type-checked.
Instale eslint-plugin-react e adicione plugin:react/recommended e plugin:react/jsx-runtime à lista extends.
Estrutura do Projeto
plaintext
Copiar código
├── src
│ ├── components
│ │ ├── Footer.tsx
│ │ ├── Header.tsx
│ │ ├── Pessoa
│ │ │ └── NovaPessoa.tsx
│ │ ├── ProjectCard.tsx
│ ├── pages
│ │ ├── Home.tsx
│ │ ├── Login.tsx
│ │ ├── Pessoa.tsx
│ │ ├── Projeto.tsx
│ │ └── ErrorPage.tsx
│ ├── services
│ │ └── firebaseConnection.ts
│ ├── types
│ │ └── index.ts
│ ├── App.tsx
│ ├── main.tsx
│ └── ...
├── .eslintrc.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── .env
└── ...
Contribuição
Se você deseja contribuir com este projeto, por favor, siga os passos abaixo:

Faça um fork do repositório.
Crie uma nova branch: git checkout -b minha-feature.
Faça suas alterações e confirme-as: git commit -m 'Minha nova feature'.
Envie para a sua branch: git push origin minha-feature.
Abra um pull request no repositório original.
Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.

Sinta-se à vontade para ajustar as informações conforme necessário para se adequar melhor ao seu projeto.
