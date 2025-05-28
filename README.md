# NerdStore Mobile

## Descrição

Este projeto é uma aplicação mobile desenvolvida com React Native, possivelmente relacionada a gerenciamento de itens, como um catálogo ou inventário, com funcionalidades de adicionar, editar, visualizar e deletar itens, e integração com uma API e serviço de upload de imagens (Cloudinary).

## Funcionalidades

- Listagem de itens
- Visualização detalhada de um item
- Adição de novos itens
- Edição de itens existentes
- Integração com API para dados
- Upload de imagens (via Cloudinary)

## Pré-requisitos

Certifique-se de ter o Node.js, npm (ou yarn) e o Expo CLI instalados.

```bash
npm install -g expo-cli
# ou
yarn global add expo-cli
```

## Configuração e Execução

1. Clone este repositório:
   ```bash
   git clone -b nerdstore-moble <URL_DO_REPOSITORIO>
   cd NerdStore
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Inicie a aplicação Expo:
   ```bash
   expo start
   ```

Isso abrirá uma página no seu navegador com um QR code. Use o aplicativo Expo Go no seu celular para escanear o QR code e rodar a aplicação, ou escolha uma das opções para rodar em um emulador/simulador.

## Tecnologias Utilizadas

- React Native
- Expo
- JavaScript/JSX
- Possívelmente outras bibliotecas listadas no `package.json` (para API, UI, etc.)
- Cloudinary (para upload de imagens)

## Estrutura do Projeto (Baseado nos diretórios compartilhados)

```
NerdStore/
├── assets/
├── components/      # Componentes reutilizáveis da UI
├── img/             # Diretório para imagens locais, se houver
├── screens/         # Telas principais da aplicação
│   ├── AdicionarItemScreen.jsx
│   ├── EditarItemScreen.jsx
│   ├── HomeScreen.jsx
│   ├── InicialScreen.jsx
│   └── VisualizarItemScreen.jsx
├── service/         # Serviços de API, utilitários, etc.
│   ├── api.js
│   └── cloudinary.js
├── .gitignore
├── App.js           # Ponto de entrada principal da aplicação
├── app.json         # Configurações do Expo
├── eas.json         # Configurações EAS build
├── index.js         # Configuração de inicialização
├── package-lock.json
├── package.json     # Dependências e scripts do projeto
└── README.md        # Este arquivo
```
