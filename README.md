# Tech Challenge - Fast Food System - Produção

[Apresentação FIAP - Fase 2](https://youtu.be/vD4L3E_Gviw)

## Descrição do Projeto

O **Tech Challenge** é um projeto desenvolvido como parte da entrega da Pós-Graduação na FIAP. O objetivo é criar um sistema de autoatendimento para uma lanchonete em expansão, que visa melhorar a experiência do cliente e otimizar o gerenciamento de pedidos. Este microserviço é responsável pela **Produção**, que gerencia o preparo dos pedidos e atualiza o status conforme o andamento.

### Problema

Com o crescimento da lanchonete, a falta de um sistema de controle de produção pode levar a atrasos e confusões no preparo dos pedidos. Este microserviço aborda essas questões, garantindo que os pedidos sejam gerenciados de forma eficiente e transparente.

## Funcionalidades

- **Gerenciamento de Produção**: Atualização do status dos pedidos em tempo real.
- **Integração com outros serviços**: Comunicação com os microserviços de Pedido e Pagamento.
- **Notificações**: Informar o cliente sobre o status do pedido.

## Estrutura do Projeto

- **Backend**: Microserviço utilizando arquitetura hexagonal.
- **APIs Implementadas**:
  - Atualização do status do pedido (em preparo, pronto, entregue).
  - Consulta de status do pedido.
- **Banco de Dados**: MongoDB exclusivo para o microserviço de Produção.

## Como Rodar o Projeto Localmente

Para iniciar o projeto, você precisará ter o Docker e o Docker Compose instalados. Siga os passos abaixo:

1. Clone o repositório:

```bash
git clone git@github.com:Fiap-pos-tech-2024/Fast-Food-Production.git
cd Fast-Food-Production
```

2. Construa e inicie os containers:

```bash
docker-compose up --build
```

3. Acesse a aplicação em http://localhost:3003

## Documentação da API

A documentação das APIs está disponível via Swagger. Após iniciar o projeto, você pode acessá-la em http://localhost:3003/api-docs.

## Comandos Kubernetes

Usando minikube para rodar localmente, siga a [instalação aqui](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fmacos%2Farm64%2Fstable%2Fbinary+download#LoadBalancer), e rode o comando abaixo no seu terminal:

```bash
minikube start
minikube dashboard
```

Para aplicar os manifestos no Kubernetes, execute os seguintes comandos:

```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
```

Para deletar os recursos no Kubernetes, execute os seguintes comandos:

```bash
kubectl delete -f k8s/deployment.yaml
kubectl delete -f k8s/service.yaml
kubectl delete -f k8s/hpa.yaml
kubectl delete -f k8s/configmap.yaml
kubectl delete -f k8s/secret.yaml
```

## Execução no Kubernetes

### Pré-requisitos

- [kubectl](https://kubernetes.io/docs/tasks/tools/) instalado e configurado.
- [minikube](https://minikube.sigs.k8s.io/docs/start/) ou outro cluster Kubernetes local/cloud.

### 1. Inicie o cluster Kubernetes:

```bash
minikube start
minikube dashboard
```

### 2. Aplique os manifests do banco de dados (MongoDB):

```bash
kubectl apply -f k8s/mongo-deployment.yaml
```

### 3. Aplique os ConfigMaps e Secrets:

```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
```

### 4. Aplique os Deployments, Services e HPA:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
```

### 5. Descubra as portas NodePort para acessar os serviços:

```bash
kubectl get svc
```

- O serviço de Produção estará em uma porta como 32003.

Acesse via browser ou API:

- Produção: http://localhost:<porta-producao>

### 6. (Opcional) Use o port-forward para expor localmente:

```bash
kubectl port-forward svc/production-service 3003:3003
```

## Observações

- Certifique-se de que as variáveis de ambiente e dependências (como URLs entre os serviços) estejam corretas nos ConfigMaps.
- O microserviço de Produção depende do Pedido e do Pagamento para funcionar corretamente.
- O Swagger estará disponível em: http://localhost:3003/api-docs.

## Regras de Negócio

Confira no passo-a-passo a seguir o fluxo de gerenciamento de produção:

### Atualizar status do pedido

Atualize o status de um pedido para "em preparo", "pronto" ou "entregue":

```bash
PUT
curl --location 'http://localhost:3003/production/:idOrder/status' \
--header 'Content-Type: application/json' \
--data-raw '{
  "status": "ready"
}'
```

### Consultar status do pedido

Consulte o status atual de um pedido:

```bash
GET
curl --location 'http://localhost:3003/production/:idOrder/status'
```

Deverá retornar o status atual do pedido.
