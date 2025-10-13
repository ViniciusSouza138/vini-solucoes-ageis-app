1. Descrição da Ideia (Conceito do Software)

Nome do Software: Soluções Ágeis

Problema a ser Resolvido:
Muitas pessoas enfrentam dificuldades para realizar reparos e manutenções em casa por falta de tempo, conhecimento técnico ou ferramentas adequadas. Além disso, encontrar profissionais confiáveis e disponíveis nem sempre é fácil, especialmente para pequenos serviços domésticos.

Público-Alvo:
Pessoas que não possuem tempo, ferramentas ou habilidades para realizar pequenos reparos, instalações ou manutenções em casa — como profissionais com rotina agitada, idosos, estudantes e famílias que buscam praticidade e segurança.

Solução Proposta:
O Soluções Ágeis conecta clientes a profissionais autônomos (“maridos de aluguel”) de forma rápida, segura e eficiente. A plataforma permite que o usuário solicite serviços domésticos, receba orçamentos, escolha um profissional disponível e realize o pagamento apenas após o serviço ser aceito.

Visão Geral da Aplicação:
O sistema funciona como uma ponte entre cliente e profissional. O cliente cadastra-se, escolhe o tipo de serviço (elétrica, hidráulica, montagem, pintura, etc.), descreve sua necessidade e envia a solicitação. O profissional recebe a solicitação, aceita ou recusa, e o cliente pode acompanhar o status até a conclusão. Após o término, é possível avaliar o serviço e o profissional.


---

2. Requisitos Funcionais

Código	Descrição

RF-001	O sistema deve permitir que o usuário (cliente) se cadastre com nome, e-mail, telefone e senha.
RF-002	O sistema deve permitir que o profissional se cadastre com informações de contato, especialidades e localização.
RF-003	O cliente deve poder solicitar um serviço, informando tipo, descrição, endereço e horário preferencial.
RF-004	O profissional deve poder visualizar solicitações disponíveis e aceitar ou recusar cada uma.
RF-005	O sistema deve permitir que o pagamento seja realizado apenas após o profissional aceitar o serviço.
RF-006	O cliente deve poder acompanhar o status de sua solicitação em tempo real.
RF-007	O cliente deve poder avaliar o profissional após o término do serviço.
RF-008	O sistema deve permitir login e recuperação de senha para clientes e profissionais.
RF-009	O sistema deve permitir que o administrador gerencie cadastros de usuários e categorias de serviço.
RF-010	O sistema deve ter uma aba de “Novas Atualizações” informando novidades e status de solicitações.



---

3. Requisitos Técnicos (Não Funcionais)

Tecnologias Utilizadas (Stack):

Frontend: React + TypeScript + Vite + TailwindCSS

Backend: Node.js (com integração via API) e suporte a Firebase para autenticação e dados.

Banco de Dados: Firebase Firestore (armazenamento de usuários, serviços e avaliações).

Deploy: Vercel (para hospedagem do frontend).


Outros Requisitos:

Usabilidade: Interface intuitiva, responsiva e moderna, fácil de usar tanto em celular quanto em desktop.

Desempenho: As telas principais (login, serviços e solicitações) devem carregar em até 3 segundos.

Segurança: Senhas criptografadas e autenticação segura via Firebase Auth.

Escalabilidade: Estrutura modular para fácil adição de novos serviços e categorias.

Compatibilidade: Suporte total para navegadores modernos e dispositivos móveis.



---

4. Código-Fonte

Estrutura Principal:

App.tsx, index.tsx → inicialização da aplicação React

components/ → componentes visuais como Header, Footer, Cards e Modais

contexts/AuthContext.ts → controle de autenticação e estado global

types.ts → definição de tipos para dados e usuários

.env.local → configuração da chave de API (ex: Gemini ou Firebase)

README.md → instruções para execução local


Para executar localmente:

1. Instalar dependências:

npm install


2. Criar um arquivo .env.local e definir a variável:

GEMINI_API_KEY=SUACHAVEAQUI


3. Rodar o app:

npm run dev


4. Acessar no navegador:

http://localhost:5173


✅ Resumo Final:
O projeto Soluções Ágeis atende aos quatro pontos obrigatórios:

1. Descrição da ideia — ✔️


2. Requisitos funcionais — ✔️


3. Requisitos técnicos — ✔️


4. Código-fonte e instruções — ✔️


<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1rnbEsR4a3Z9HJ_SkS2q8zFMTdpKWbGRv

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
