# Frontend Engineer Test

## Critérios de avaliação
* Capacidade de seguir instruções;
* Lógica, semântica e qualidade de código;
* Utilização de API RESTful;
* Domínio das ferramentas e tecnologias utilizadas;
* Frequência de _commits_;
* Capacidade de finalização de um projeto;
* Domínio de ferramenta de controle de versão;
* Testes e garantia de qualidade;

## Tarefas
1. Faça uma cópia deste repositório (não faça _fork_);
2. Acesse [https://iextrading.com](https://iextrading.com) e procure a documentação da sua API aberta;
3. Desenvolva um dashboard simples com 2 _views_/rotas:
   - Uma listagem com os 20 maiores stocks e seus preços, além de um campo de busca para filtrar por quaisquer stocks disponíveis na API. O usuário poderá clicar ou tocar em um _stock_ específico e ir para a próxima _view_:
   - Página de um _stock_ específico, com detalhes sobre ele. Fica a seu cargo definir o que deve ser mostrado.

## Requisitos de tecnologia

* É obrigatório utilizar o React como _framework_ de _view_

Além disso, sugerimos utilizar
* Redux para _framework_ de estado;
* SASS para pré-processamento de CSS;
* Jest/Jasmine como _framework de teste JavaScript;

A escolha do _framework_ de roteamento fica a seu cargo.

### Pontos de sucesso

Ao cumprir os pontos de sucesso abaixo, você melhora a sua pontuação no processo de seleção:
- [ ] Apresentar projeto no [Docker](https://www.docker.com/);
- [x] Utilizar [TypeScript](https://www.typescriptlang.org/);
- [x] Utilizar [webpack](https://webpack.js.org/) e produzir um único arquivo de _output_;
- [ ] Utilizar [socket.io](https://socket.io) para criar um gráfico _realtime_ do mercado (o endpoint é fornecido pela API)
- [ ] Utilizar gráficos D3.js;
- [ ] Utilizar tipos imutáveis ou [Immutable-JS](https://facebook.github.io/immutable-js/).
