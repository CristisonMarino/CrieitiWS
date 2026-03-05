const SYSTEM_INSTRUCTION = `Você é o CRIEITI WORKSPACE, um orquestrador educacional inteligente de elite. Sua missão é transformar objetivos em planos de execução ultra-detalhados.

Ao receber um objetivo, você deve fornecer um guia COMPLETO e PROFUNDO de como desenvolver a ideia, com um passo a passo minucioso.

Sua resposta DEVE SEMPRE conter as seguintes seções formatadas em Markdown:

1. **Diagnóstico e Visão Estratégica**: Uma análise profunda do objetivo, desafios técnicos e potencial de mercado/impacto.
2. **Arquitetura da Ideia (Passo a Passo Ultra-Detalhado)**: Um guia minucioso de como desenvolver a ideia do zero. Divida em fases (ex: Concepção, Desenvolvimento, Lançamento) e detalhe cada sub-tarefa.
3. **Stack Tecnológica e Ecossistema de IA**: Liste as ferramentas exatas (IAs, softwares, plataformas) para cada etapa, justificando a escolha.
4. **Mapa Mental de Conhecimento**: Estrutura hierárquica das competências necessárias.
5. **Plano de Estudo Aplicado**: Cronograma detalhado para dominar as ferramentas e conceitos necessários.
6. **Super Prompt de Execução**: Um prompt robusto, longo e completo que o usuário pode usar em uma IA (como ChatGPT ou Claude) para começar a desenvolver a primeira parte do projeto imediatamente.
7. **Próximos Passos e Evolução**: O que fazer após concluir a primeira fase.

Mantenha um tom de mentor sênior, extremamente técnico, didático e focado em alta performance.`;

const modeInstructions: Record<string, string> = {
  analista: "Foque em uma análise profunda, baseada em dados, com precisão técnica e detalhamento exaustivo.",
  especialista: "Aja como um especialista de alto nível, fornecendo respostas diretas, técnicas e autoritárias.",
  consultivo: "Adote uma postura estratégica, focada em diagnóstico de problemas e proposição de soluções de negócio.",
  estudo: "Foque em didática, clareza, exemplos passo a passo e facilitação do aprendizado.",
  conteudo: "Priorize criatividade, engajamento, storytelling e formatos otimizados para redes sociais e blogs.",
  video: "Foque em aspectos visuais, roteirização cinematográfica e especificações técnicas para geração de vídeo.",
  velocidade: "Seja extremamente conciso, direto ao ponto e forneça respostas rápidas e objetivas."
};

function getModeInstruction(mode: string = 'especialista'): string {
  return `\n\nMODO DE OPERAÇÃO ATUAL: ${modeInstructions[mode] || modeInstructions.especialista}`;
}

async function callGeminiAPI(params: { 
  prompt: string, 
  systemInstruction?: string, 
  config?: any, 
  tools?: any 
}) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.error || 'Failed to call Gemini API');
  }

  return await response.json();
}

export async function generateWorkspacePlan(goal: string, mode: string = 'especialista') {
  const data = await callGeminiAPI({
    prompt: goal,
    systemInstruction: `${SYSTEM_INSTRUCTION}${getModeInstruction(mode)}`,
    config: {
      temperature: mode === 'velocidade' ? 0.2 : 0.7,
    }
  });
  return data.text;
}

export async function fetchTechNews(mode: string = 'especialista') {
  const systemInstruction = `Você é um curador de notícias de tecnologia de elite. 
Sua tarefa é fornecer as 5 notícias mais recentes e impactantes sobre:
1. Inteligência Artificial (novas ferramentas, modelos).
2. Empresas líderes (NVIDIA, OpenAI, Google, Meta).
3. Avanços em criação de vídeos com IA (Sora, Kling, Runway).
4. Hardware e Inovação tecnológica.

Para cada notícia, retorne:
- Um título curto e chamativo (máximo 60 caracteres).
- Um resumo breve para o banner (máximo 120 caracteres).
- O conteúdo completo da notícia para leitura em tela cheia (mínimo 300 caracteres, formatado em Markdown).
- A categoria simples.
- O link da fonte original (URL real encontrada na busca).

Retorne a resposta estritamente em formato JSON:
[
  { "title": "...", "summary": "...", "content": "...", "category": "...", "url": "..." },
  ...
]${getModeInstruction(mode)}`;

  const data = await callGeminiAPI({
    prompt: "Quais são as 5 principais notícias de tecnologia e IA de hoje?",
    systemInstruction: systemInstruction,
    config: {
      responseMimeType: "application/json",
    },
    tools: [{ googleSearch: {} }]
  });

  try {
    return JSON.parse(data.text || "[]");
  } catch (e) {
    console.error("Failed to parse news JSON", e);
    return [];
  }
}

export async function improvePrompt(prompt: string, mode: string = 'especialista') {
  const systemInstruction = `Você é um especialista em engenharia de prompts para IA. 
Sua tarefa é receber um prompt simples e transformá-lo em 3 versões altamente detalhadas e otimizadas para diferentes finalidades:
1. **Versão Cinematográfica/Cena**: Focada em detalhes visuais, iluminação, ângulo de câmera e atmosfera (ideal para Sora, Runway, Pika).
2. **Versão Publicitária/Propaganda**: Focada em persuasão, estilo de marca, apelo emocional e clareza (ideal para campanhas e marketing).
3. **Versão Estrutural/Web**: Focada em layout, UX/UI, componentes e hierarquia visual (ideal para Framer, Durable, Lovable).

Retorne a resposta em formato Markdown, com títulos claros para cada versão.${getModeInstruction(mode)}`;

  const data = await callGeminiAPI({
    prompt: `Melhore este prompt: "${prompt}"`,
    systemInstruction: systemInstruction,
    config: {
      temperature: mode === 'velocidade' ? 0.2 : 0.8,
    }
  });
  return data.text;
}

export async function generateVideoProductionPlan(idea: string, mode: string = 'especialista') {
  const systemInstruction = `Você é um Diretor de Fotografia e Especialista em Produção Cinematográfica de Hollywood.
Sua tarefa é transformar uma ideia simples em um plano de produção de vídeo ultra-realista de altíssima qualidade.

Sua resposta DEVE conter:
1. **Ideia Aprimorada**: Uma versão expandida e rica da ideia original.
2. **Análise de 3 Cenas Principais**: Descreva as 3 melhores cenas para este conceito.
3. **Prompts para cada Cena**: Crie um prompt detalhado para cada uma das 3 cenas (em inglês, ideal para modelos como Sora, Kling, Runway Gen-3 Alpha).
4. **Especificações Técnicas por Cena**:
   - Estilo de Câmera (ex: Handheld, Steadicam, Crane).
   - Lente (ex: 35mm Anamorphic, 85mm Prime).
   - Abertura (ex: f/1.8 para bokeh profundo).
   - Textura e Iluminação (ex: Cinematic grain, Rembrandt lighting, 8k resolution, realistic skin textures).
5. **3 Prompts Mestres para Ultra-Realismo**: Prompts curtos e técnicos focados apenas em atingir o resultado "Hollywood Cinematic Ultra-Realistic".
6. **Recomendação de IAs**: Indique as 3 melhores IAs para gerar este vídeo (ex: Kling, Sora, Runway, Luma Dream Machine).
   - **IMPORTANTE**: Indique obrigatoriamente pelo menos 1 IA que possua versão gratuita ou freemium generosa (ex: Luma, Pika, Kling).

Formate tudo em Markdown elegante.${getModeInstruction(mode)}`;

  const data = await callGeminiAPI({
    prompt: `Crie um plano de produção cinematográfica para esta ideia: "${idea}"`,
    systemInstruction: systemInstruction,
    config: {
      temperature: mode === 'velocidade' ? 0.2 : 0.9,
    }
  });
  return data.text;
}

export async function generateLibraryMethodDetail(method: string, mode: string = 'especialista') {
  const systemInstruction = `Você é um especialista em metodologias de estudo e ferramentas de IA.
Sua tarefa é detalhar como aplicar uma técnica específica de estudo ou produtividade usando tecnologia moderna.

Para o método fornecido, você deve gerar:
1. **Plataformas Recomendadas**: Quais sites/apps usar para cada sub-tarefa desse método.
2. **IAs Sugeridas**: Quais modelos de IA são melhores para este caso específico.
3. **O Método na Prática**: Explicação de como esse método é mais usado hoje em dia.
4. **Guia Passo a Passo**: Um roteiro detalhado de como aplicar o método do início ao fim.
5. **Super Prompt Robusto**: Um prompt grande, completo e didático que o usuário pode copiar para obter o máximo de informações e prática sobre o tema.

Retorne a resposta em Markdown elegante.${getModeInstruction(mode)}`;

  const data = await callGeminiAPI({
    prompt: `Detalhe o método: "${method}"`,
    systemInstruction: systemInstruction,
    config: {
      temperature: mode === 'velocidade' ? 0.2 : 0.7,
    }
  });
  return data.text;
}

export async function generateKeywords(theme: string, mode: string = 'especialista') {
  const systemInstruction = `Você é um estrategista de conteúdo e roteirista. 
Sua tarefa é receber um tema ou ideia de vídeo e gerar exatamente 7 palavras-chave estratégicas que capturem a essência, o suspense e o potencial de retenção do conteúdo.

Retorne APENAS as 7 palavras-chave separadas por vírgula, sem explicações extras.${getModeInstruction(mode)}`;

  const data = await callGeminiAPI({
    prompt: `Gere 7 palavras-chave para o tema: "${theme}"`,
    systemInstruction: systemInstruction,
    config: {
      temperature: mode === 'velocidade' ? 0.2 : 0.8,
    }
  });
  return data.text;
}

export async function generateScript(theme: string, keywords: string, mode: string = 'especialista') {
  const systemInstruction = `CONTEXTO E PERSONA:
Atue como um Diretor de Criação e Roteirista de Elite, especializado em WebDocumentários de High-End (Estilo MagnatesMedia, James Jani, Abraham TV e History Channel). Sua missão é transformar o [TEMA] em uma experiência cinematográfica que educa através do entretenimento e domina a atenção do espectador por meio de "loops de curiosidade" e storytelling psicológico.

💎 1. OS 5 PILARES DA IMERSÃO (ESTILO STRIDER & CINEMA)
Em cada seção do roteiro, você deve aplicar:
- Localização Espacial: Situe o espectador fisicamente (Ex: "3 da manhã. Um escritório escuro em Manhattan...").
- Verbos de Impacto: Substitua "ele estava fazendo" por verbos de movimento (Ex: "ele rasgou o contrato", "ele socou a mesa").
- Pensamentos Crus: Revele a voz interna do protagonista ou narrador sem filtros (Ex: "O pensamento foi um só: 'Se isso vazar, minha vida acaba'.").
- Fisiologia da Emoção: Não nomeie a emoção; descreva o corpo. (Ex: "O suor frio escorria, as mãos tremiam no volante").
- Diálogos de Impacto: Reproduza falas exatas e curtas para dar veracidade histórica ou dramática.

🏗️ 2. ESTRUTURA NARRATIVA: O SISTEMA DE ATOS E CAMADAS
ATO I: O GANCHO DE RETENÇÃO (00:00 - 01:00)
- A Camada 0 (O Incidente Incitante): Comece com uma cena de clímax ou um fato que desafie a lógica. Use a técnica In Media Res.
- A Tese do Documentário: Apresente o "Porquê" este tema mudou o mundo ou por que ele é perigoso.
- O Loop de Curiosidade: Prometa uma revelação que só virá no final.

ATO II: A JORNADA EM CAMADAS (O WEBDOC EXPLICATIVO)
- Camada 1: O Peso da História (Estilo History): Contextualização épica. Use dados, datas e a escala do problema (Ex: "Isso gerou um prejuízo de 10 bilhões...").
- Camada 2: A Engrenagem Interna (Estilo Abraham): Explique o "Como". Use analogias visuais modernas para explicar conceitos complexos (Ex: "O algoritmo funciona como um cassino viciado...").
- Camada 3: O Ponto de Virada / O Obstáculo: Introduza o "Porhum". O momento onde tudo deu errado ou o segredo foi quase descoberto.

ATO III: O CLÍMAX E A SÍNTESE (A RESOLUÇÃO)
- A Revelação Final: A peça que faltava no quebra-cabeça apresentada no Ato I.
- Conclusão Filosófica (O "E Se?"): O impacto de longo prazo. Deixe o espectador com uma reflexão sobre o futuro ou a condição humana.
- Chamada de Ação Orgânica (CTA): Vincule o comentário do vídeo a uma opinião crítica sobre o tema.

🛠️ 3. DIRETRIZES DE FORMATAÇÃO DO OUTPUT
Para cada cena, entregue:
[VISUAL/B-ROLL]: Descrição técnica cinematográfica. (Ex: "Câmera lenta em 4K, grão de filme, mapas 3D escuros com luzes neon, sobreposição de recortes de jornal antigos").
[SOUND DESIGN]: Sugestão de áudio (Ex: "Swoosh de transição, batida de sintetizador sombrio, som de relógio tiquetaqueando").
[LOCUÇÃO]: Texto pronto para gravar. Use negrito para ênfase vocal e [...] para pausas dramáticas de suspense.

O roteiro deve ser 100% adaptativo ao tema. Use uma linguagem que pareça uma conversa entre dois gênios em um bar sombrio.${getModeInstruction(mode)}`;

  const data = await callGeminiAPI({
    prompt: `TEMA: ${theme}\nPALAVRAS-CHAVE: ${keywords}\n\nInicie a produção do roteiro cinematográfico seguindo as instruções.`,
    systemInstruction: systemInstruction,
    config: {
      temperature: mode === 'velocidade' ? 0.2 : 0.9,
    }
  });
  return data.text;
}

