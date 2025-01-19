## Description

This project uses Next.js with shadcn/ui for creating an AI translator with Langchain. It was created following the tutorial in this article: [Langchain LLM Chain Tutorial](https://js.langchain.com/docs/tutorials/llm_chain/). The project uses OpenAI as the chat model.

## Video Demonstration

Watch the video below to see an example usage of the app, translating a phrase into multiple languages:

[langchain-translator.webm](https://github.com/user-attachments/assets/0cba5356-5823-43c4-bb78-415371158246)

## Getting Started

First, create a `.env.local` file with your API keys by using `.env.local.template` as a template:

```bash
cp .env.local.template .env.local
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact

For any questions or feedback, please contact Juanjo Fernández at [juanjo.fernandez@haa.st](mailto:juanjo.fernandez@haa.st).
