# Moody 😃

Moody é um app de rastreamento de humor diário: registre seu humor e horas de sono com um check-in rápido, acompanhe o humor predominante da semana, escreva no seu diário pessoal e visualize tudo num gráfico mensal.

Desenvolvido como projeto de aprendizado front-end, com foco em fundamentos: HTML, CSS e JavaScript puros, sem frameworks, usando `localStorage` para persistência dos dados.

https://nathaliadebona.github.io/moody/app.html

## Funcionalidades

### Onboarding

- Captura do nome da pessoa no primeiro acesso, salvo em `localStorage`
- Pula automaticamente a tela de boas-vindas em acessos seguintes

### Check-in diário

- Saudação dinâmica conforme o horário (bom dia / boa tarde / boa noite) e data atual
- Modal de check-in em duas etapas: humor do dia e horas dormidas
- Um check-in por dia — um novo check-in no mesmo dia substitui o anterior, sem duplicar

### Humor

- Card com o humor predominante dos últimos 5 check-ins
- Cor de fundo da página muda dinamicamente conforme o humor predominante

### Diário

- Escrita de entradas diárias, com edição e exclusão
- Histórico de entradas com truncamento de texto (expande ao clicar)
- Filtro do histórico por mês e ano
- Paginação "Ver mais" / "Ver menos"

### Gráfico mensal

- Gráfico de barras com rolagem horizontal cruzando humor e horas de sono por dia
- Atualização em tempo real após cada novo check-in

## Tecnologias utilizadas

- HTML5, CSS3 e JavaScript puros (sem frameworks ou bibliotecas)
- `localStorage` para persistência de dados (nome, check-ins e entradas do diário)
- [Google Fonts](https://fonts.google.com/) — Quicksand (títulos) e Nunito Sans (corpo)

## Como rodar localmente

1. Clone o repositório.
2. Como o projeto usa `localStorage` e múltiplas páginas, é recomendado servir os arquivos com um servidor local (ex: extensão "Live Server" do VS Code, `npx serve`, ou `python -m http.server`), ao invés de abrir os arquivos diretamente pelo navegador.
3. Acesse pela página de onboarding (`onboarding.html`) na primeira vez — é ela que registra o nome usado no restante do app.

## Screenshots

<img width="1832" height="3646" alt="nathaliadebona github io_moody_app html (2)" src="https://github.com/user-attachments/assets/1d3d9681-33bd-4b04-920c-5e5fd20c6053" />
<img width="1824" height="1082" alt="nathaliadebona github io_moody_app html" src="https://github.com/user-attachments/assets/89005a69-8214-4097-9e82-1b6cc250e281" />
<img width="1824" height="1080" alt="nathaliadebona github io_moody_app html (1)" src="https://github.com/user-attachments/assets/34ada356-3acd-44fa-8e74-c5526d891b27" />

---

Projeto pessoal de aprendizado, desenvolvido por [Nathalia](https://github.com/nathaliadebona).
