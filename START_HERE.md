# Configuração Rápida - Dados Mock

## 🎯 O que fazer agora?

Você tem 3 opções:

### ✅ Opção 1: Ver Funcionando Imediatamente (RECOMENDADO)

1. Abra o terminal na pasta do projeto
2. Execute:
   ```bash
   npm run dev
   ```
3. Acesse: http://localhost:3000
4. Teste um dos fluxos em `USANDO_DADOS_MOCK.md`

**Dados de login:**
- Email: `gabriel@example.com`
- Senha: `Senha123456`

---

### ✅ Opção 2: Entender a Estrutura Primeiro

Leia os arquivos nesta ordem:

1. **[USANDO_DADOS_MOCK.md](USANDO_DADOS_MOCK.md)**
   - Como usar os dados de exemplo
   - Fluxos de teste disponíveis
   - Dados de login

2. **[lib/mock-database.ts](lib/mock-database.ts)**
   - Ver os dados de exemplo
   - Entender estrutura de usuários, posts, comentários

3. **[lib/mock-api-service.ts](lib/mock-api-service.ts)**
   - Entender como funcionam as interceptações

4. **[ESTRUTURA_API_BANCO_DADOS.md](ESTRUTURA_API_BANCO_DADOS.md)**
   - Ver endpoints que o backend precisa implementar

---

### ✅ Opção 3: Personalizar os Dados Mock

1. Abra `lib/mock-database.ts`
2. Edite os dados em:
   - `usuariosExemplo` - Adicione/modifique usuários
   - `postsExemplo` - Adicione/modifique posts
   - `comentariosExemplo` - Adicione/modifique comentários
3. Salve
4. O site atualizará automaticamente (hot reload)

---

## 📚 Estrutura de Ficheiros Criados

```
lib/
├── mock-database.ts          ← Dados de exemplo (usuários, posts, comentários)
├── mock-api-service.ts       ← Interceptador de API
├── auth-context.ts           ← Serviço de autenticação
├── blog-service.ts           ← Serviço de blog
└── utils.ts                  ← Utilitários

components/
├── latest-posts-preview.tsx  ← Preview de posts na homepage
├── blog-grid.tsx             ← Grid de todos os posts
├── blog-comentarios-secao.tsx ← Seção de comentários
└── auth/
    ├── login-form.tsx        ← Formulário de login
    └── register-form.tsx     ← Formulário de registro

app/
├── page.tsx                  ← Homepage (com preview de posts)
├── blog/
│   ├── page.tsx             ← Página de blog (lista todos)
│   └── [slug]/page.tsx      ← Página individual de post
└── auth/
    ├── login/page.tsx       ← Página de login
    └── registro/page.tsx    ← Página de registro
```

---

## 🔄 Próximas Etapas

### Quando quiser ver funcionando (AGORA)
```bash
npm run dev
# Acesse http://localhost:3000
```

### Quando for implementar o backend (DEPOIS)
1. Leia `EXEMPLOS_BACKEND.md`
2. Leia `ESTRUTURA_API_BANCO_DADOS.md`
3. Escolha: Node.js/Express ou Django/Python
4. Implemente os endpoints
5. Mude `USE_MOCK_API = false` em `mock-api-service.ts`
6. Configure `NEXT_PUBLIC_API_BASE_URL` no `.env.local`

---

## 💡 Dicas

- **Não apague** `mock-database.ts` ainda - você vai precisar como referência
- **Customize** os dados mock enquanto desenvolve o design
- **Teste** todos os fluxos antes de ir pro backend
- **Documente** qualquer mudança que fizer nos dados

---

## ❓ Precisa de Ajuda?

- Dúvidas sobre dados mock? → `USANDO_DADOS_MOCK.md`
- Dúvidas sobre como estruturar o backend? → `ESTRUTURA_API_BANCO_DADOS.md`
- Exemplos de código backend? → `EXEMPLOS_BACKEND.md`
- Implementação passo-a-passo? → `CHECKLIST_IMPLEMENTACAO.md`

---

**Bora começar! 🚀**
