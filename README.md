# Temperamentos

Aplicação web estática para autoconhecimento, inspirada nos eixos Extroversão–Introversão e Intensidade Emocional–Estabilidade associados ao modelo de Eysenck, com facetas complementares próprias.

## O que já existe

- Cadastro inicial com nome e idade.
- 68 afirmações em escala de 5 pontos.
- Itens diretos e reversos para reduzir viés de concordância.
- Cálculo de Extroversão, Intensidade Emocional, Ruminação, Assertividade, Autorregulação, Cooperação e Adaptabilidade.
- Afinidades com quatro temperamentos: Sanguíneo, Colérico, Melancólico e Fleumático.
- Relatório personalizado com leitura geral, trabalho, liderança, relacionamentos, forças e pontos de desenvolvimento.
- Exportação do relatório para PDF no próprio navegador.
- Salvamento temporário do progresso em `localStorage`.
- Layout responsivo para desktop e celular.

## Como testar

Como a aplicação é estática, você pode abrir `index.html` diretamente no navegador. Para evitar restrições locais de fontes/CDN, também pode servir a pasta com qualquer servidor HTTP simples.

Exemplo com Python:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## GitHub Pages

O repositório inclui um workflow em `.github/workflows/pages.yml`. No GitHub, abra **Settings > Pages** e selecione **GitHub Actions** como Source. Em seguida, um push na branch `main` publicará a página.

## Metodologia desta versão

Esta é uma primeira versão de produto e **não é um instrumento psicológico validado**. Os escores são afinidades internas ao questionário, não percentis populacionais.

- `E`: Extroversão / energia social.
- `N`: Intensidade emocional.
- Os quatro temperamentos são derivados geometricamente dos polos de `E` e `N`.
- Ruminação, Assertividade, Autorregulação, Cooperação e Adaptabilidade são facetas complementares criadas para enriquecer a autorreflexão.

Para uso científico, clínico, seletivo ou diagnóstico, seria necessário um projeto psicométrico próprio, validação amostral e adequação às regras profissionais aplicáveis.
