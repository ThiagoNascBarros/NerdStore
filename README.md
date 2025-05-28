# NerdStore API

## 📋 Descrição
API REST desenvolvida para gerenciar uma loja de produtos geek (NerdStore), construída com Spring Boot e MongoDB.

## 🛠️ Tecnologias Utilizadas
- Java 21
- Spring Boot
- Spring Data MongoDB
- Jakarta EE
- Lombok
- Docker
- Maven

## 🚀 Configuração do Projeto

### Pré-requisitos
- Java 21
- Maven
- MongoDB
- Docker (opcional)

### 🔧 Instalação

1. Clone o repositório:
```
git clone [url-do-repositorio]
``` 

2. Navegue até o diretório do projeto:
```
cd nerdstore
``` 

3. Execute o build do projeto:
```bash
mvn clean install
```

4. Inicie a aplicação:
``` bash
mvn spring-boot:run
```

### 🐳 Usando Docker
O projeto inclui um Dockerfile para containerização. Para construir e executar usando Docker:
``` bash
# Construir a imagem
docker build -t nerdstore-api .

# Executar o container
docker run -p 8080:8080 nerdstore-api
```
## 📌 Endpoints da API
### ItemGeek Controller
- Gerenciamento de itens geek da loja
- Base URL: `/api/item`

## 🔍 Tratamento de Erros
A API possui um tratamento global de exceções através do , garantindo respostas consistentes para diferentes tipos de erros. `GlobalExceptionHandler`

## 📦 Estrutura do Projeto
``` 
src/
├── main/
│   ├── java/
│   │   └── br/
│   │       └── com/
│   │           └── nerdstore/
│   │               ├── controller/
│   │               ├── exception/
│   │               ├── model/
│   │               ├── repository/
│   │               ├── service/
│   │               └── NerdStoreApplication.java
└── └── resources/ 
```

