# 🃏 JOGO 21 — Blackjack

Projeto completo de Blackjack (21) desenvolvido com Angular, seguindo regras clássicas do jogo, interface moderna e persistência de dados no navegador.

## 🔗 Aplicação online (Vercel):
👉 (https://jogo-21-teste.vercel.app/)

## 🎯 Objetivo do Projeto

### Desenvolver um jogo funcional de Blackjack com:
- Sistema de usuários (login/cadastro)
- Mesa de jogo interativa
- Histórico de partidas
- Dashboard com estatísticas
- Interface seguindo o Figma

🛠 Tecnologias Utilizadas
Core

- Angular 18+
- TypeScript
- Angular Router
- RxJS
- Angular Forms
- UI / Estilo
- CSS tradicional (SCSS/CSS)
  
> Tailwind CSS
Utilizado principalmente para:
- Layout (flex / grid)
- Alinhamentos rápidos e consistentes

- Usado em conjunto com o Tailwind para:
- Ajustes finos de tipografia
- Tamanhos específicos de componentes
- Estilos mais precisos e controlados

## 🃏 Sistema de Cartas

- As cartas são locais, não dependem de API externa.
- Todas as imagens das cartas estão em public/

Cada carta possui:

- Naipe
- Valor
- Pontuação


- O baralho é gerado dinamicamente no DeckService, embaralhado em memória e as cartas são distribuídas conforme o jogo avança.

## 🧠 Regras Implementadas

Objetivo: chegar a 21 pontos ou o mais próximo possível

- Ás vale 1 ou 11
- J, Q, K valem 10
- Bust (>21) = derrota automática
- Dealer compra cartas até atingir 17 ou mais
- Empate com o dealer = derrota do jogador
- Cartas do dealer ficam ocultas até o jogador passar

## 🔐 Login e Cadastro

- O sistema não possui backend
- Os usuários são salvos no localStorage
- Login feito apenas com e-mail
- O usuário logado é mantido em sessão via localStorage

Exemplo:
´´´bash
localStorage.setItem('currentUser', JSON.stringify(user));
´´´

## 📊 Histórico de Partidas

Após cada partida finalizada:

O resultado é salvo no localStorage

Cada partida contém:

- Usuário
- Data
- Resultado (WIN / LOSS)
- Pontuação do jogador
- Pontuação do dealer
- Cartas do jogador
- Cartas do dealer

Esses dados alimentam:
- Tela de histórico
- Dashboard (vitórias, derrotas e total de partidas)


# Clonar o repositório
´´´bash
git clone https://github.com/seu-repositorio/jogo-21.git
´´´


# Entrar na pasta
´´´bash
cd jogo-21
´´´

# Instalar dependências
´´´bash
npm install
´´´

´´´bash
# Rodar o projeto
ng serve
´´´
