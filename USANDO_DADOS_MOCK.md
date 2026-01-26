# 📊 Guia de Uso - Dados Mock (Demonstração)

## O que são dados Mock?

Dados **mock** são dados de exemplo que simulam como seu sistema funcionará com um banco de dados real. Eles permitem que você veja toda a aplicação funcionando **AGORA**, sem esperar pela implementação do backend.

## 🎯 Objetivo

Você agora tem:
- ✅ **3 posts de blog** com conteúdo completo
- ✅ **4 usuários** com diferentes tipos (admin, usuario, viewer)
- ✅ **8 comentários** distribuídos nos posts
- ✅ **Sistema de autenticação simulado**
- ✅ **Tudo pronto para visualizar no navegador**

## 📝 Dados de Teste Disponíveis

### Usuários Cadastrados

```
1. Gabriel Silva (ADMIN)
   Email: gabriel@example.com
   Senha: Senha123456
   Tipo: ADMINISTRADOR (pode criar/editar/deletar posts)

2. Maria Santos (USUARIO)
   Email: maria@example.com
   Senha: Senha123456
   Tipo: USUARIO (pode comentar)

3. João Pereira (USUARIO)
   Email: joao@example.com
   Senha: Senha123456
   Tipo: USUARIO (pode comentar)

4. Ana Silva (VIEWER)
   Email: ana@example.com
   Senha: Senha123456
   Tipo: VISUALIZADOR (apenas lê conteúdo)
```

### Posts Disponíveis

1. **Como Implementar um Sistema de Autenticação com JWT em Next.js**
   - Autor: Gabriel Silva
   - Slug: `como-implementar-autenticacao-jwt-nextjs`
   - 2 comentários aprovados

2. **Gestão de Projetos: Melhores Práticas para Equipes Remotas**
   - Autor: Gabriel Silva
   - Slug: `gestao-projetos-melhores-praticas`
   - 3 comentários aprovados

3. **Growth Hacking: Estratégias para Crescimento Exponencial**
   - Autor: Gabriel Silva
   - Slug: `growth-hacking-estrategias-crescimento`
   - 3 comentários aprovados

## 🚀 Como Usar

### 1. **Testar Login**

```
1. Acesse: /auth/login
2. Email: gabriel@example.com
3. Senha: Senha123456
4. Clique em "Entrar"
```

**Resultado esperado:**
- ✅ Login bem-sucedido
- ✅ Será redirecionado para a página inicial
- ✅ Seu nome aparecerá na navbar
- ✅ Botão "Novo Artigo" aparecerá (você é admin!)

### 2. **Testar Registro**

```
1. Acesse: /auth/registro
2. Preencha: Nome, Email, Senha, Confirmar Senha
3. Clique em "Registrar"
```

**Resultado esperado:**
- ✅ Novo usuário criado
- ✅ Será redirecionado para login
- ✅ Pode fazer login com a nova conta

### 3. **Ver Posts no Blog**

```
1. Acesse: /blog
2. Veja os posts em grid (3 colunas)
3. Clique em um post para ver detalhes
```

**Resultado esperado:**
- ✅ Todos os 3 posts aparecem
- ✅ Ao clicar, mostra conteúdo completo
- ✅ Comentários aparecem abaixo
- ✅ Se logado, pode comentar

### 4. **Ver Posts na Página Inicial**

```
1. Acesse: /
2. Desça até "Últimos Artigos"
3. Verá preview dos 3 posts mais recentes
```

**Resultado esperado:**
- ✅ 3 posts aparecem no carrossel/grid
- ✅ "Ver Todos os Artigos" leva para /blog
- ✅ Imagens e conteúdo formatado corretamente

### 5. **Testar Comentários**

```
1. Acesse: /blog/[slug-do-post]
2. Desça até "Comentários"
3. Se não estiver logado, verá mensagem para fazer login
4. Faça login e tente comentar
```

**Resultado esperado:**
- ✅ Comentários existentes aparecem
- ✅ Pode escrever novo comentário (se logado)
- ✅ Comentário aparece na lista
- ✅ Nome, avatar e data aparecem corretamente

### 6. **Testar Painel Admin**

```
1. Faça login como Gabriel (admin)
2. Clique em "Novo Artigo" na navbar
3. Preencha o formulário
```

**Resultado esperado:**
- ✅ Formulário funciona
- ✅ Pode enviar novo post
- ✅ Post aparece na listagem

## 🔄 Fluxos de Funcionamento

### Fluxo de Login Simulado

```
Usuário digita email/senha
         ↓
Sistema busca em usuariosExemplo
         ↓
Verifica se senha está correta
         ↓
Retorna token JWT simulado
         ↓
Token salvo em localStorage
         ↓
Usuário autenticado ✅
```

### Fluxo de Listagem de Posts

```
Página carrega
         ↓
Chama obterUltimosPostsMock() (300ms delay simulado)
         ↓
Retorna array de posts
         ↓
Componente renderiza
         ↓
Posts aparecem na tela ✅
```

### Fluxo de Comentários

```
Post é aberto
         ↓
Chama obterComentariosMock(postId)
         ↓
Retorna comentários do post
         ↓
Se usuário logado, mostra formulário
         ↓
Usuário comenta
         ↓
Comentário adicionado à lista ✅
```

## 📁 Arquivos Envolvidos

**Mock Data:**
- `lib/mock-database.ts` - Contém todos os dados exemplo
- `lib/mock-api-service.ts` - Intercepta chamadas de API

**Componentes que usam mock:**
- `components/latest-posts-preview.tsx` - Posts na homepage
- `components/blog-grid.tsx` - Grid de posts
- `components/blog-comentarios-secao.tsx` - Seção de comentários
- `components/auth/login-form.tsx` - Login
- `components/auth/register-form.tsx` - Registro

## ⚙️ Como Ativar/Desativar Mock

Em `lib/mock-api-service.ts`, altere:

```typescript
// Para ATIVAR mock (desenvolvimento)
const USE_MOCK_API = true;

// Para DESATIVAR mock (use API real)
const USE_MOCK_API = false;
```

Quando for `true`, o sistema usará os dados simulados.
Quando for `false`, tentará conectar na API real.

## 🔗 Substituindo Mock pela API Real

### Passo 1: Desativar Mock
```typescript
// Em lib/mock-api-service.ts
const USE_MOCK_API = false;
```

### Passo 2: Configurar URL da API
```bash
# No arquivo .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### Passo 3: Atualizar Services
```typescript
// Em lib/auth-context.ts - substituir chamadas mock pelas reais
// Isso já está preparado no código

// Em lib/blog-service.ts - substituir chamadas mock pelas reais
// Isso já está preparado no código
```

## 🎨 Estrutura dos Dados Mock

### Usuário
```typescript
{
  id: string,
  nome: string,
  email: string,
  tipo: 'ADMINISTRADOR' | 'USUARIO' | 'VISUALIZADOR',
  dataCriacao: Date,
  avatar?: string
}
```

### Post
```typescript
{
  id: string,
  titulo: string,
  slug: string,
  conteudo: string (HTML),
  resumo: string,
  autor: Usuario,
  tags: string[],
  imagemCapa: string,
  dataCriacao: Date,
  dataAtualizacao: Date,
  totalComentarios: number,
  visualizacoes: number,
  publicado: boolean
}
```

### Comentário
```typescript
{
  id: string,
  conteudo: string,
  autor: Usuario,
  postId: string,
  dataCriacao: Date,
  dataAtualizacao?: Date,
  aprovado: boolean,
  curtidas: number
}
```

## 🧪 Cenários de Teste

### ✅ Teste 1: Fluxo Completo de Usuário

1. Registre um novo usuário
2. Faça login
3. Navegue pelos posts
4. Leia um post completo
5. Comente no post
6. Veja seu comentário aparecer
7. Desconecte

### ✅ Teste 2: Fluxo de Admin

1. Faça login como Gabriel (admin)
2. Clique em "Novo Artigo"
3. Crie um novo post
4. Veja o post na listagem
5. Abra o post e leia
6. Comente no seu próprio post

### ✅ Teste 3: Fluxo de Visualizador

1. Registre com um novo email
2. Edite em mock-database.ts: tipo como 'VISUALIZADOR'
3. Faça login
4. Tente comentar (deve pedir para mudar tipo)
5. Tente criar post (deve bloquear)

### ✅ Teste 4: Responsividade

1. Abra DevTools (F12)
2. Ative modo responsivo
3. Teste em Mobile (375px)
4. Teste em Tablet (768px)
5. Teste em Desktop (1920px)

## 📞 Próximos Passos

Quando estiver satisfeito com o design e funcionalidade:

1. **Implemente o Backend** (ver `EXEMPLOS_BACKEND.md`)
   - Crie API em Node.js ou Django
   - Implemente endpoints listados em `ESTRUTURA_API_BANCO_DADOS.md`

2. **Conecte Banco de Dados Real**
   - Crie PostgreSQL ou MongoDB
   - Execute migrations
   - Popule com dados iniciais

3. **Integre ao Frontend**
   - Desative USE_MOCK_API
   - Configure NEXT_PUBLIC_API_BASE_URL
   - Teste todos os fluxos novamente

## ❓ Dúvidas Comuns

**P: Os comentários desaparecem quando recarrego?**
R: Sim! Os dados mock são mantidos em memória. Quando recarrega, volta aos dados originais. No banco real, persistem.

**P: Posso editar os dados mock?**
R: Sim! Edite `lib/mock-database.ts`. Qualquer mudança é refletida imediatamente.

**P: Os posts têm imagens reais?**
R: Sim! Usam URLs de placeholder. No backend real, você faz upload de verdadeiras.

**P: Qual é a senha de todos os usuários?**
R: `Senha123456` para todos. Em produção, use hashing bcrypt!

**P: O login é seguro?**
R: Não! Os dados mock são apenas para demonstração. No backend real, implemente JWT propriamente.

---

**Bom Desenvolvimento! 🚀**

Você agora pode visualizar toda a aplicação funcionando. Quando estiver pronto, siga o EXEMPLOS_BACKEND.md para implementar o backend real!
