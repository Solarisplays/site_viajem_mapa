<<<<<<< HEAD
# RotaRS - Mototurismo no Rio Grande do Sul
=======
# 🏍️ RotaRS - Mototurismo no Rio Grande do Sul
>>>>>>> 779f872 (feat: atualizacoes de layout, responsividade mobile e melhorias gerais)

> **Plataforma web completa para planejamento de viagens de moto, catálogo de rotas turísticas gaúchas, cálculo de consumo/combustível e comunidade de pilotos.**

---

<<<<<<< HEAD
## Sobre o Projeto
=======
## 📌 Sobre o Projeto
>>>>>>> 779f872 (feat: atualizacoes de layout, responsividade mobile e melhorias gerais)

O **RotaRS** é um projeto desenvolvido com foco em mototurismo pelo estado do Rio Grande do Sul. A plataforma oferece ferramentas essenciais para quem viaja sobre duas rodas: busca inteligente de rotas, calculadora de custo de viagem e paradas de abastecimento, catálogo técnico de motocicletas, área de perfil com galeria e um painel de administração restrito.

---

<<<<<<< HEAD
## Funcionalidades Principais

### 1. Página Inicial (`index.html`)
=======
## 🚀 Funcionalidades Principais

### 1. 🏠 Página Inicial (`index.html`)
>>>>>>> 779f872 (feat: atualizacoes de layout, responsividade mobile e melhorias gerais)
- **Busca Rápida com Autocomplete**: Filtro em tempo real por rotas, cidades ou categorias, com destaque do texto buscado e ícone temático em gradiente.
- **Destaques e Vantagens**: Seções com imagens ilustrativas abordando cálculo de autonomia, pontos de interesse e estimativa de gastos.
- **Carrossel 3D de Histórias**: Slide interativo com efeito *cover flow* destacando paisagens gaúchas (Gramado, Vale dos Vinhedos, Cânions, Missões e Porto Alegre) e exibindo a história do local ao passar o mouse.
- **Rotas Populares**: Cards com fotografias reais e navegação direta para o planejamento.

<<<<<<< HEAD
### 2. Planejador de Rotas (`planejamento.html`)
=======
### 2. 🗺️ Planejador de Rotas (`planejamento.html`)
>>>>>>> 779f872 (feat: atualizacoes de layout, responsividade mobile e melhorias gerais)
- **Catálogo de 20 Rotas Gaúchas**: Filtragem instantânea por nome, cidades de origem/destino e estilo da viagem.
- **Integração com Veículo do Usuário**:
  - Se o usuário estiver logado, a plataforma puxa automaticamente o modelo da sua moto e o consumo médio (km/L) cadastrado.
  - Para visitantes ou quem desejar trocar de moto, disponibiliza um catálogo completo com consumo predefinido.
- **Calculadora Completa de Viagem**:
  - Distância total (opção de só ida ou ida e volta).
  - Litros necessários e custo estimado em R$ (com ajuste do preço da gasolina).
  - Custo total para encher o tanque da moto.
  - Estimativa de autonomia segura e quantidade de paradas para abastecer no trajeto.

<<<<<<< HEAD
### 3. Guia de Motos Registradas (`motos.html`)
- Catálogo comparativo dividido por categorias de cilindrada (Baixa, Média e Alta).
- Fichas técnicas completas: peso, potência, torque, capacidade do tanque de combustível e médias de consumo em diferentes velocidades de cruzeiro (80 km/h, 120 km/h e velocidade máxima).

### 4. Perfil do Usuário (`perfil.html`)
=======
### 3. 🏍️ Guia de Motos Registradas (`motos.html`)
- Catálogo comparativo dividido por categorias de cilindrada (Baixa, Média e Alta).
- Fichas técnicas completas: peso, potência, torque, capacidade do tanque de combustível e médias de consumo em diferentes velocidades de cruzeiro (80 km/h, 120 km/h e velocidade máxima).

### 4. 👤 Perfil do Usuário (`perfil.html`)
>>>>>>> 779f872 (feat: atualizacoes de layout, responsividade mobile e melhorias gerais)
- Dados do piloto e resumo do veículo cadastrado.
- **Controle de Privacidade**: Opções para ocultar idade, e-mail, veículo, rotas ou galeria para outros usuários.
- **Galeria Interativa com Upload Múltiplo**: Envio de várias fotos simultâneas.
- **Visualizador Lightbox (Estilo Steam)**: Foto em destaque à esquerda e painel de informações à direita, permitindo ao dono da conta editar a legenda, substituir a foto ou excluí-la.

<<<<<<< HEAD
### 5. Autenticação e Cadastro (`login.html`)
- Login de usuários e perfil especial de Administrador.
- Formulário de cadastro com dados pessoais e especificações da motocicleta (marca, modelo e consumo em km/L).
- Validações de campos em tempo real e persistência via `localStorage`.

### 6. Painel do Administrador (`admin.html`)
=======
### 5. 🔐 Autenticação e Cadastro (`login.html`)
- Login de usuários e perfil especial de Administrador (`adm@gmail.com`).
- Formulário de cadastro com dados pessoais e especificações da motocicleta (marca, modelo e consumo em km/L).
- Validações de campos em tempo real e persistência via `localStorage`.

### 6. ⚙️ Painel do Administrador (`admin.html`)
>>>>>>> 779f872 (feat: atualizacoes de layout, responsividade mobile e melhorias gerais)
- **Proteção de Acesso**: Bloqueio de rota exclusivo para a conta administradora.
- **Auditoria de Usuários**: Tabela completa com modal interativo de detalhes (foto do veículo, dados de contato e consumo).
- **Gerenciador de Rotas**: Listagem de todas as rotas do catálogo com ações para cadastrar novas rotas, editar existentes e remover.
- **Gerenciador de Motos**: Controle do catálogo de motocicletas do sistema.
- **Moderação de Postagens**: Aba dedicada para moderação de comentários e avaliações.

---

<<<<<<< HEAD
## Tecnologias Utilizadas
=======
## 🛠️ Tecnologias Utilizadas
>>>>>>> 779f872 (feat: atualizacoes de layout, responsividade mobile e melhorias gerais)

- **HTML5**: Semântico, estruturado e com boas práticas de acessibilidade.
- **CSS3 Moderno**: Variáveis CSS (Design Tokens), Flexbox, CSS Grid, máscaras de gradiente (`mask-image`), efeitos de profundidade e responsividade para dispositivos móveis.
- **JavaScript (ES6+)**: Manipulação de DOM, Promises com FileReader para upload de imagens, filtros dinâmicos e persistência via `localStorage`.
- **Google Fonts**: Tipografias *Poppins* e *Inter*.

---

<<<<<<< HEAD
## Estrutura de Pastas
=======
## 📂 Estrutura de Pastas
>>>>>>> 779f872 (feat: atualizacoes de layout, responsividade mobile e melhorias gerais)

```text
faculdade/
├── assets/                  # Imagens de motos, ícones da interface e paisagens
│   ├── iconsindex/          # Ícones temáticos das seções da home
│   └── paisagens/           # Fotografias dos destinos turísticos do RS
├── css/
│   └── style.css            # Folha de estilos centralizada e responsiva
├── js/
│   ├── admin.js             # Lógica e segurança do painel administrativo
│   ├── auth-nav.js          # Menu dinâmico de autenticação no header
│   ├── carousel.js          # Lógica do carrossel 3D com histórias
│   ├── home-search.js       # Autocomplete e busca rápida da página inicial
│   ├── login.js             # Autenticação e cadastro de novos usuários
│   ├── motos-data.js        # Base de dados de motocicletas
│   ├── motos.js             # Renderização e filtros do catálogo de motos
│   ├── perfil.js            # Gestão do perfil, privacidade e galeria
│   ├── planejamento.js      # Calculadora de combustível e paradas de rota
│   └── rotas-data.js        # Base de dados com as 20 rotas turísticas do RS
├── admin.html               # Painel administrativo
├── index.html               # Página inicial
├── login.html               # Página de login e cadastro
├── motos.html               # Catálogo de motos para viagens
├── perfil.html              # Perfil do motociclista e galeria
├── planejamento.html        # Planejador de rotas e calculadora de viagem
└── README.md                # Documentação do projeto
```

---

<<<<<<< HEAD
## Como Executar o Projeto Localmente
=======
## 🌐 Como Executar o Projeto Localmente
>>>>>>> 779f872 (feat: atualizacoes de layout, responsividade mobile e melhorias gerais)

1. Clone ou baixe este repositório para o seu computador.
2. Não é necessário instalar dependências ou rodar comandos de compilação (projeto construído em HTML, CSS e JavaScript puros).
3. Abra o arquivo `index.html` em qualquer navegador web (ou utilize a extensão **Live Server** no VS Code).

---

<<<<<<< HEAD
## Publicação no GitHub Pages
=======
## ☁️ Publicação no GitHub Pages
>>>>>>> 779f872 (feat: atualizacoes de layout, responsividade mobile e melhorias gerais)

Este projeto está pronto para ser publicado no **GitHub Pages**:
1. Crie um repositório no seu GitHub e suba os arquivos.
2. Vá em **Settings** > **Pages**.
3. Em **Branch**, selecione `main` e a pasta `/ (root)`.
4. Salve e acesse a URL fornecida pelo GitHub!

---

<<<<<<< HEAD
=======
## 👥 Conta de Administrador para Testes

Para testar as funções do painel administrativo:
- **E-mail**: `adm@gmail.com`
- **Senha**: `123456`

---

>>>>>>> 779f872 (feat: atualizacoes de layout, responsividade mobile e melhorias gerais)
*Desenvolvido como projeto acadêmico de Desenvolvimento Web voltado para incentivar o mototurismo e a valorização das belezas do Rio Grande do Sul.*

