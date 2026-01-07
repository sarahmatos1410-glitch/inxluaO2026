
# IncluDaily - Sistema de Monitoramento de Inclusão AEE

Este projeto é uma ferramenta para auxiliar no registro diário de atividades de alunos em programas de inclusão escolar (AEE).

## 🚀 Como publicar Corretamente (Evitando Tela Branca)

Como este é um projeto em **TypeScript (React)**, o GitHub Pages precisa de um processo de "Build". Siga estes passos:

1.  **Habilitar GitHub Actions:**
    *   No seu repositório no GitHub, vá em **Settings** (Configurações).
    *   No menu lateral, clique em **Pages**.
    *   Em **Build and deployment** > **Source**, mude para: **GitHub Actions**.

2.  **Subir as Alterações:**
    *   Certifique-se de que os arquivos `.github/workflows/deploy.yml`, `vite.config.ts` e o novo `index.html` estão no seu repositório.
    *   Toda vez que você atualizar um arquivo, o GitHub fará o "Build" automaticamente (você pode acompanhar na aba **Actions**).

3.  **Acessar o Site:**
    *   O link oficial será: `https://sarahmatos1410-glitch.github.io/Inlusaoaee/`

## Credenciais de Acesso (Teste)

*   **Administrador:** `admin` ou `sarah` | Senha: `123` ou `1234`
*   **Auxiliar / Estagiário:** `auxiliar` ou `raphael` | Senha: `123`

## Configuração do Banco (Supabase)
Para que os dados sejam compartilhados entre dispositivos diferentes:
1. Faça login como **Sarah**.
2. Vá na aba **Conexão Banco**.
3. Insira sua URL e Chave Anon do Supabase.
