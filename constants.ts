export interface AIEntry {
  name: string;
  description: string;
  link: string;
  category: string;
  info: string;
  isPaid: boolean;
  brandColor: string;
}

export const STUDY_METHODS = [
  "Resumo Automático: Use IA para resumir capítulos de livros ou artigos extensos.",
  "Flashcards Inteligentes: Gere perguntas e respostas a partir de seus textos de estudo.",
  "Explicação Simplificada: Peça para a IA explicar conceitos complexos como se você tivesse 5 anos.",
  "Simulação de Provas: Crie simulados personalizados baseados no conteúdo que você está estudando.",
  "Tradução Contextual: Traduza textos técnicos mantendo o sentido acadêmico correto.",
  "Brainstorming de Temas: Use a IA para encontrar ângulos criativos para redações ou teses.",
  "Correção Gramatical: Revise seus textos buscando clareza e coesão profissional.",
  "Transcrição de Aulas: Converta áudios de aulas em texto para revisão posterior.",
  "Cronograma de Estudos: Peça para a IA organizar seu tempo baseado em suas prioridades.",
  "Mapas Mentais: Gere estruturas hierárquicas para visualizar conexões entre temas.",
  "Tutor de Idiomas: Pratique conversação em outra língua com feedback em tempo real.",
  "Resolução de Problemas: Peça o passo a passo de cálculos matemáticos ou lógicos.",
  "Análise de Dados: Use IA para interpretar tabelas e gráficos complexos.",
  "Criação de Analogias: Peça analogias do dia a dia para entender conceitos abstratos.",
  "Debate de Ideias: Argumente contra a IA para fortalecer seu próprio ponto de vista.",
  "Extração de Citações: Encontre as frases mais relevantes em um documento longo.",
  "Guia de Leitura: Peça um roteiro de perguntas para responder enquanto lê um livro.",
  "Codificação Assistida: Aprenda programação pedindo explicações linha a linha.",
  "Pesquisa Bibliográfica: Use ferramentas de IA acadêmica para encontrar fontes confiáveis.",
  "Otimização de Notas: Transforme anotações bagunçadas em tópicos organizados.",
  "Criação de Mnemônicos: Peça frases ou siglas para ajudar na memorização.",
  "Verificação de Fatos: Cruze informações para garantir a veracidade do que estuda.",
  "Simulação de Entrevistas: Prepare-se para apresentações orais treinando com a IA.",
  "Geração de Exemplos: Peça múltiplos exemplos práticos de uma teoria.",
  "Contextualização Histórica: Entenda o cenário de uma descoberta ou evento.",
  "Scripts de Estudo: Crie roteiros para gravar seus próprios resumos em áudio.",
  "Análise de Sentimento: Entenda o tom e a intenção de autores em textos literários.",
  "Comparação de Teorias: Peça uma tabela comparativa entre diferentes autores.",
  "Sugestão de Complementos: Pergunte o que mais você deveria estudar sobre o tema.",
  "Revisão Espaçada: Use a IA para definir quando você deve revisar cada assunto."
];

export const AI_HUB_DATA: AIEntry[] = [
  // GRATUITOS
  {
    name: "Grok",
    description: "Criação de vídeos cinematográficos e dinâmicos de forma gratuita.",
    link: "https://x.ai",
    category: "Vídeo",
    isPaid: false,
    brandColor: "#10B981", // Emerald-500 for Free
    info: "O Grok, integrado à plataforma X, permite a geração de vídeos curtos com alto impacto visual a partir de comandos de texto simples. É a ferramenta ideal para criadores de conteúdo que buscam agilidade na produção de clipes para redes sociais, permitindo transformar ideias em cenas dinâmicas em segundos. Use para: Criar teasers, ilustrar conceitos em vídeo e experimentar com narrativas visuais sem custo."
  },
  {
    name: "Gemini",
    description: "O ecossistema multimodal do Google para textos, códigos e imagens.",
    link: "https://gemini.google.com",
    category: "Multimodal",
    isPaid: false,
    brandColor: "#10B981",
    info: "O Gemini é a IA mais avançada do Google, capaz de processar e gerar informações em diversos formatos simultaneamente. Ele se destaca na análise de documentos extensos, criação de códigos complexos e geração de imagens realistas. É um parceiro indispensável para quem precisa de profundidade técnica e criatividade em um só lugar. Use para: Estudar temas complexos, desenvolver software, criar apresentações visuais e organizar grandes volumes de dados."
  },
  {
    name: "ChatGPT",
    description: "Líder em conversação com geração de imagens e raciocínio rápido.",
    link: "https://chat.openai.com",
    category: "Texto/Imagem",
    isPaid: false,
    brandColor: "#10B981",
    info: "O ChatGPT oferece uma experiência de diálogo fluida e inteligente, agora com suporte a 5 gerações de imagens gratuitas por dia via DALL-E 3. Sua capacidade de regeneração e ajuste fino de imagens é superior, permitindo iterações rápidas. É excelente para estruturar pensamentos, criar roteiros e obter feedback imediato sobre qualquer assunto. Use para: Brainstorming de ideias, redação de textos, auxílio no estudo diário e criação de artes conceituais."
  },
  {
    name: "Manus AI",
    description: "Versatilidade total para criação de imagens e prototipagem de apps.",
    link: "https://manus.ai",
    category: "Produzir",
    isPaid: false,
    brandColor: "#10B981",
    info: "Manus AI é uma ferramenta poderosa para quem busca produzir ativos digitais com qualidade profissional. Além de gerar imagens impressionantes, ela auxilia na estruturação e desenvolvimento de aplicativos, funcionando como um assistente de design e código. É perfeita para quem quer tirar um projeto do papel rapidamente. Use para: Criar interfaces de usuário, gerar artes para projetos e acelerar o desenvolvimento de MVPs."
  },
  {
    name: "Google AI Studio",
    description: "A plataforma definitiva para desenvolver sites e testar modelos de IA.",
    link: "https://aistudio.google.com",
    category: "Desenvolvimento",
    isPaid: false,
    brandColor: "#10B981",
    info: "O Google AI Studio é o playground ideal para desenvolvedores. Ele permite acesso gratuito aos modelos Gemini mais recentes para criar protótipos de sites estáticos, testar prompts complexos e desenvolver aplicações inteligentes. É a ferramenta mais robusta para quem quer explorar o limite da IA sem custos de infraestrutura. Use para: Desenvolver sites estáticos, testar lógica de programação e criar soluções personalizadas com IA."
  },
  {
    name: "Suno",
    description: "Transforme qualquer texto em músicas completas e profissionais.",
    link: "https://suno.com",
    category: "Áudio",
    isPaid: false,
    brandColor: "#10B981",
    info: "Suno revoluciona a criação musical permitindo que qualquer pessoa gere canções completas — com letra, melodia e vocais — apenas descrevendo o estilo desejado. A versão gratuita oferece créditos generosos para experimentação. É a escolha número um para criar trilhas sonoras personalizadas e jingles criativos. Use para: Produzir trilhas para vídeos, criar presentes musicais personalizados e explorar novos gêneros musicais."
  },
  {
    name: "Airbrush",
    description: "Upscale e melhoria de qualidade de vídeo com inteligência artificial.",
    link: "https://airbrush.ai",
    category: "Vídeo",
    isPaid: false,
    brandColor: "#10B981",
    info: "Airbrush foca na restauração e melhoria visual de conteúdos em vídeo. Embora a versão gratuita limite a duração, ela é excelente para testar o potencial de nitidez e correção de cor em clipes curtos. É ideal para quem precisa dar um toque profissional em vídeos gravados com baixa qualidade. Use para: Melhorar a resolução de vídeos antigos, ajustar cores e nitidez de clipes para redes sociais."
  },
  {
    name: "Microsoft Copilot",
    description: "Geração ilimitada de imagens e assistência integrada ao Windows.",
    link: "https://copilot.microsoft.com",
    category: "Imagem",
    isPaid: false,
    brandColor: "#10B981",
    info: "Integrado ao ecossistema Microsoft, o Copilot oferece geração de imagens ilimitada e gratuita através do DALL-E 3. Sua integração com a web permite que ele forneça informações em tempo real enquanto auxilia na criação visual. É uma ferramenta de produtividade completa para o dia a dia. Use para: Gerar imagens para trabalhos acadêmicos, criar posts para redes sociais e obter assistência rápida em tarefas de escritório."
  },
  {
    name: "Lovable",
    description: "Crie aplicativos funcionais e modernos através de conversas simples.",
    link: "https://lovable.dev",
    category: "Produzir",
    isPaid: false,
    brandColor: "#10B981",
    info: "Lovable permite que você construa aplicações web completas descrevendo o que precisa. Com uma abordagem 'no-code' inteligente, ele gera o código e a interface para você. Mesmo com limites na versão gratuita, é uma vitrine incrível do futuro do desenvolvimento. Use para: Prototipar ideias de negócios, criar ferramentas internas e aprender sobre estrutura de aplicativos."
  },
  {
    name: "NotebookLM",
    description: "Seu assistente de pesquisa pessoal para organizar e estudar documentos.",
    link: "https://notebooklm.google.com",
    category: "Estudar",
    isPaid: false,
    brandColor: "#10B981",
    info: "O NotebookLM é a ferramenta definitiva para estudantes e pesquisadores. Ele permite carregar seus próprios documentos e fazer perguntas sobre eles, gerando resumos, guias de estudo e até discussões em áudio. Ele garante que as respostas sejam baseadas estritamente nas suas fontes. Use para: Estudar para provas, organizar teses de mestrado, resumir livros técnicos e criar roteiros de apresentação."
  },
  {
    name: "Miro",
    description: "Colaboração visual com IA para mapas mentais e fluxogramas.",
    link: "https://miro.com",
    category: "Organizar",
    isPaid: false,
    brandColor: "#10B981",
    info: "Miro combina o poder de um quadro branco infinito com automações de IA que ajudam a expandir ideias, criar conexões lógicas e estruturar funis de venda ou estudo. É a ferramenta padrão para equipes criativas que precisam visualizar processos complexos. Use para: Planejar projetos, criar mapas mentais colaborativos e estruturar jornadas de aprendizado."
  },
  {
    name: "Milanote",
    description: "Organização visual intuitiva para projetos criativos e acadêmicos.",
    link: "https://milanote.com",
    category: "Organizar",
    isPaid: false,
    brandColor: "#10B981",
    info: "Milanote é como um mural de cortina digital onde você pode organizar notas, imagens e links de forma livre. Suas funções de IA auxiliam na organização de quadros de inspiração e estruturas de pesquisa, tornando o processo criativo muito mais fluido. Use para: Organizar referências visuais, estruturar capítulos de livros e planejar campanhas de marketing."
  },
  {
    name: "Nano Banana",
    description: "Geração de imagens artísticas ultra-rápidas e criativas.",
    link: "https://nanobanana.com",
    category: "Imagem",
    isPaid: false,
    brandColor: "#10B981",
    info: "Nano Banana foca em simplicidade e velocidade. É ideal para quem precisa de imagens artísticas e conceituais sem configurações complexas. Sua interface amigável permite resultados surpreendentes em poucos segundos. Use para: Criar avatares, gerar fundos de tela e ilustrar apresentações rápidas."
  },
  {
    name: "Picsart",
    description: "Edição completa de fotos e vídeos com ferramentas de IA integradas.",
    link: "https://picsart.com",
    category: "Imagem",
    isPaid: false,
    brandColor: "#10B981",
    info: "Picsart oferece um estúdio de design completo no seu navegador ou celular. Suas ferramentas de IA permitem remover fundos, substituir objetos e melhorar a qualidade de fotos instantaneamente. É a escolha favorita para quem busca edição rápida com cara de profissional. Use para: Editar fotos para redes sociais, criar banners e remover imperfeições de imagens."
  },
  {
    name: "iLoveIMG",
    description: "Utilitários essenciais para processamento de imagens em massa.",
    link: "https://iloveimg.com",
    category: "Imagem",
    isPaid: false,
    brandColor: "#10B981",
    info: "iLoveIMG é a 'canivete suíço' das imagens. Ele resolve problemas comuns como redimensionamento, compressão e conversão de formatos em segundos. Suas novas funções de IA para remover fundo e melhorar fotos tornam o trabalho de design muito mais prático. Use para: Otimizar imagens para sites, converter formatos de arquivo e fazer edições básicas rápidas."
  },
  {
    name: "PicWish",
    description: "Especialista em remoção de fundo e restauração de fotos com IA.",
    link: "https://picwish.com",
    category: "Imagem",
    isPaid: false,
    brandColor: "#10B981",
    info: "PicWish utiliza algoritmos avançados para tarefas específicas de design, como o recorte perfeito de pessoas e objetos. É amplamente utilizado por e-commerces para limpar fotos de produtos e por usuários que querem restaurar fotos antigas ou embaçadas. Use para: Criar fotos de produtos com fundo branco, restaurar fotos de família e melhorar a nitidez de capturas de tela."
  },
  {
    name: "Sora",
    description: "O futuro da geração de vídeos realistas a partir de texto.",
    link: "https://openai.com/sora",
    category: "Vídeo",
    isPaid: false,
    brandColor: "#10B981",
    info: "Sora, da OpenAI, é capaz de criar cenas de vídeo complexas com múltiplos personagens, tipos específicos de movimento e detalhes precisos do cenário. Embora em fase de lançamento controlado, ela representa o ápice da geração audiovisual. Use para: Criar clipes cinematográficos, prototipar cenas de filmes e gerar conteúdo visual de altíssima fidelidade."
  },
  {
    name: "Google Veo",
    description: "Geração de vídeos cinematográficos de alta fidelidade com áudio.",
    link: "https://deepmind.google/technologies/veo/",
    category: "Vídeo",
    isPaid: false,
    brandColor: "#10B981",
    info: "Veo é a resposta do Google para a geração de vídeo profissional. Ele entende comandos cinematográficos como 'time-lapse' ou 'aerial shot' e gera vídeos em 1080p com grande consistência visual. É uma ferramenta de elite para narradores visuais. Use para: Produzir vídeos de alta qualidade para apresentações, criar artes visuais dinâmicas e explorar novas formas de storytelling."
  },
  {
    name: "Pika AI",
    description: "Animação de imagens e criação de vídeos com estilos únicos.",
    link: "https://pika.art",
    category: "Vídeo",
    isPaid: false,
    brandColor: "#10B981",
    info: "Pika se destaca pela facilidade em animar fotos estáticas e criar vídeos com estilos que variam do realista ao desenho animado. Sua interface intuitiva permite controlar o movimento da câmera e dos objetos, dando vida às suas ideias. Use para: Animar logotipos, criar memes em vídeo de alta qualidade e ilustrar histórias curtas."
  },
  {
    name: "Runway",
    description: "Plataforma profissional para edição e geração de vídeo com IA.",
    link: "https://runwayml.com",
    category: "Vídeo",
    isPaid: false,
    brandColor: "#10B981",
    info: "Runway é o estúdio de cinema do futuro. Com ferramentas como Gen-2 e Gen-3, ela permite gerar vídeos, expandir cenários e remover objetos indesejados com precisão cirúrgica. É a ferramenta preferida de editores profissionais e artistas digitais. Use para: Produção de vídeos experimentais, edição avançada com IA e criação de efeitos visuais complexos."
  },
  {
    name: "ElevenLabs",
    description: "A melhor tecnologia de síntese de voz e clonagem vocal do mundo.",
    link: "https://elevenlabs.io",
    category: "Áudio",
    isPaid: false,
    brandColor: "#10B981",
    info: "ElevenLabs oferece vozes que são virtualmente indistinguíveis de seres humanos. Com suporte a dezenas de idiomas e a capacidade de clonar sua própria voz, ela é essencial para criadores de conteúdo, narradores de audiobooks e desenvolvedores de jogos. Use para: Narrar vídeos para o YouTube, criar versões em áudio de artigos e desenvolver personagens com vozes únicas."
  },
  {
    name: "QuillBot",
    description: "Assistente de escrita para parafrasear e criar conteúdo web.",
    link: "https://quillbot.com",
    category: "Sites",
    isPaid: false,
    brandColor: "#10B981",
    info: "QuillBot ajuda a refinar sua escrita, tornando-a mais clara e profissional. Além de suas famosas ferramentas de paráfrase, ele agora oferece um construtor de sites IA que gera landing pages completas a partir de uma descrição. Use para: Melhorar a redação de e-mails, criar textos para sites e resumir artigos acadêmicos."
  },
  {
    name: "Notion",
    description: "O cérebro digital para organizar notas, projetos e tarefas com IA.",
    link: "https://notion.so",
    category: "Organizar",
    isPaid: false,
    brandColor: "#10B981",
    info: "Notion une documentos, bancos de dados e gestão de projetos em uma interface elegante. Sua IA integrada ajuda a escrever, resumir reuniões e extrair insights de suas notas automaticamente. É a ferramenta central para qualquer workspace moderno. Use para: Gerenciar estudos, organizar fluxos de trabalho de equipes e manter um diário de aprendizado inteligente."
  },
  {
    name: "n8n",
    description: "Automação de fluxos de trabalho complexos de forma visual e gratuita.",
    link: "https://n8n.io",
    category: "Automação",
    isPaid: false,
    brandColor: "#10B981",
    info: "n8n permite conectar centenas de aplicativos e criar automações poderosas sem precisar escrever código complexo. Por ser open-source, oferece uma liberdade imensa para quem quer automatizar tarefas repetitivas entre diferentes plataformas. Use para: Sincronizar dados entre apps, automatizar respostas de e-mail e criar fluxos de coleta de informações."
  },
  {
    name: "Claude",
    description: "IA focada em raciocínio lógico, escrita refinada e segurança.",
    link: "https://claude.ai",
    category: "Texto",
    isPaid: false,
    brandColor: "#10B981",
    info: "Claude, da Anthropic, é conhecido por suas respostas detalhadas, tom humano e grande janela de contexto (capaz de ler livros inteiros de uma vez). É a IA preferida para quem busca precisão na escrita e análise crítica de textos longos. Use para: Revisar manuscritos, analisar contratos, debater ideias filosóficas e gerar códigos limpos."
  },
  {
    name: "Perplexity",
    description: "O buscador do futuro que entrega respostas diretas com fontes reais.",
    link: "https://perplexity.ai",
    category: "Estudar",
    isPaid: false,
    brandColor: "#10B981",
    info: "Perplexity combina a potência dos modelos de linguagem com a busca em tempo real na web. Ele não apenas responde suas perguntas, mas cita cada fonte utilizada, garantindo transparência e confiabilidade na pesquisa. Use para: Pesquisar fatos históricos, acompanhar notícias de tecnologia e encontrar referências acadêmicas verificadas."
  },
  {
    name: "Toki",
    description: "Lembretes inteligentes que te ligam para garantir que você não esqueça.",
    link: "#",
    category: "Organizar",
    isPaid: false,
    brandColor: "#10B981",
    info: "Toki resolve o problema de ignorar notificações de celular. Ele permite agendar lembretes importantes e, no horário marcado, o serviço te liga para avisar do compromisso. É a ferramenta definitiva para quem tem rotinas agitadas. Use para: Agendar horários de remédios, lembretes de reuniões críticas e prazos de entrega inadiáveis."
  },
  {
    name: "Kaiber",
    description: "Criação de vídeos artísticos e psicodélicos a partir de imagens.",
    link: "https://kaiber.ai",
    category: "Vídeo",
    isPaid: false,
    brandColor: "#10B981",
    info: "Kaiber é famoso por seus estilos visuais únicos que transformam fotos simples em animações fluidas e artísticas. É amplamente utilizado por músicos para criar lyric videos e por artistas digitais para explorar novas estéticas visuais. Use para: Criar clipes musicais, gerar artes de fundo para streams e animar fotos de viagens."
  },
  {
    name: "Murf AI",
    description: "Vozes profissionais para apresentações, treinamentos e vídeos.",
    link: "https://murf.ai",
    category: "Áudio",
    isPaid: false,
    brandColor: "#10B981",
    info: "Murf oferece uma biblioteca de vozes de alta qualidade focadas em uso corporativo e educacional. Ele permite ajustar a entonação, velocidade e ênfase das palavras, garantindo uma narração natural para qualquer projeto. Use para: Criar narrações para cursos online, produzir vídeos de treinamento e gerar anúncios em áudio."
  },
  {
    name: "Canva",
    description: "O design democratizado com ferramentas de IA para todos os níveis.",
    link: "https://canva.com",
    category: "Imagem",
    isPaid: false,
    brandColor: "#10B981",
    info: "Canva integrou o 'Magic Studio', permitindo que usuários criem designs complexos, gerem imagens e escrevam textos publicitários em um só lugar. É a ferramenta essencial para empreendedores e estudantes que precisam de resultados visuais rápidos. Use para: Criar posts para Instagram, montar apresentações de slides e desenvolver identidades visuais básicas."
  },
  {
    name: "Wolfram Alpha",
    description: "O motor de conhecimento computacional para matemática e ciência.",
    link: "https://wolframalpha.com",
    category: "Estudar",
    isPaid: false,
    brandColor: "#10B981",
    info: "Diferente de IAs de chat, o Wolfram Alpha usa dados estruturados e algoritmos matemáticos para dar respostas exatas. É a ferramenta padrão para resolver cálculos complexos, analisar dados químicos e obter estatísticas demográficas precisas. Use para: Resolver equações matemáticas, estudar física e obter dados socioeconômicos verificados."
  },
  {
    name: "DeepL",
    description: "Tradução de alta precisão que preserva o contexto e a nuance natural.",
    link: "https://deepl.com",
    category: "Texto",
    isPaid: false,
    brandColor: "#10B981",
    info: "DeepL é amplamente considerado o melhor tradutor do mundo. Ele entende as nuances da língua, oferecendo traduções que soam muito mais naturais que as ferramentas convencionais. É indispensável para quem trabalha com textos internacionais. Use para: Traduzir documentos profissionais, estudar idiomas estrangeiros e comunicar-se com clareza global."
  },
  {
    name: "Hugging Face",
    description: "A maior comunidade e repositório de modelos de IA open-source.",
    link: "https://huggingface.co",
    category: "Texto",
    isPaid: false,
    brandColor: "#10B981",
    info: "Hugging Face é o 'GitHub da IA'. Ele hospeda milhares de modelos prontos para uso em texto, imagem, áudio e vídeo. É o ponto de encontro para quem quer estar na vanguarda da tecnologia e testar as últimas inovações da comunidade. Use para: Testar novos modelos de linguagem, explorar tecnologias de IA emergentes e aprender sobre machine learning."
  },

  // PAGOS
  {
    name: "ChatGPT Plus",
    description: "Acesso prioritário aos modelos mais potentes e ferramentas exclusivas.",
    link: "https://chat.openai.com",
    category: "Texto/Imagem",
    isPaid: true,
    brandColor: "#3B82F6", // Blue-500 for Paid
    info: "O plano Plus oferece acesso ao GPT-4o, o modelo mais rápido e inteligente da OpenAI. Inclui geração ilimitada de imagens via DALL-E 3, análise avançada de dados, navegação web e a capacidade de criar seus próprios GPTs personalizados para tarefas específicas. Use para: Trabalho profissional de redação, análise de dados complexos, automação de tarefas e criação de assistentes personalizados."
  },
  {
    name: "Midjourney",
    description: "A excelência absoluta em geração de imagens artísticas e realistas.",
    link: "https://midjourney.com",
    category: "Imagem",
    isPaid: true,
    brandColor: "#3B82F6",
    info: "Midjourney é a ferramenta de escolha para designers e artistas. Seus modelos produzem imagens com uma estética superior, iluminação dramática e detalhes impressionantes que superam qualquer outra IA. É ideal para quem busca o estado da arte em criação visual. Use para: Criar artes para capas de livros, desenvolver conceitos visuais para jogos e produzir fotografias hiper-realistas."
  },
  {
    name: "CapCut Pro",
    description: "Edição de vídeo profissional com automações de IA de alto nível.",
    link: "https://capcut.com",
    category: "Vídeo",
    isPaid: true,
    brandColor: "#3B82F6",
    info: "A versão Pro do CapCut libera recursos como legendas automáticas ultra-precisas, remoção de fundo com um clique e efeitos de vídeo exclusivos. É o melhor custo-benefício para quem produz conteúdo diário para TikTok, Reels e YouTube. Use para: Editar vídeos virais, criar anúncios dinâmicos e profissionalizar a edição de vlogs."
  },
  {
    name: "Framer",
    description: "Crie sites modernos e responsivos a partir de um simples prompt.",
    link: "https://framer.com",
    category: "Sites",
    isPaid: true,
    brandColor: "#3B82F6",
    info: "Framer permite que você descreva seu site e ele gere o layout, as cores e o conteúdo em segundos. É uma ferramenta de design profissional que publica sites reais com animações fluidas e performance impecável. Use para: Criar landing pages de produtos, portfólios profissionais e sites institucionais modernos."
  },
  {
    name: "Make.com",
    description: "Conecte seus aplicativos e automatize tudo sem limites.",
    link: "https://make.com",
    category: "Automação",
    isPaid: true,
    brandColor: "#3B82F6",
    info: "Make.com é a plataforma de automação mais flexível do mercado. Ela permite criar fluxos lógicos complexos entre centenas de apps, processando dados e automatizando tarefas de negócio de forma visual e poderosa. Use para: Automatizar vendas, integrar sistemas de CRM e criar fluxos de trabalho inteligentes para empresas."
  },
  {
    name: "Leonardo AI",
    description: "Produção de ativos visuais consistentes e ferramentas de design avançadas.",
    link: "https://leonardo.ai",
    category: "Imagem",
    isPaid: true,
    brandColor: "#3B82F6",
    info: "Leonardo AI oferece um controle sem precedentes sobre a geração de imagens. Com ferramentas para manter a consistência de personagens e estilos, é a favorita de desenvolvedores de jogos e designers de marca que precisam de ativos visuais recorrentes. Use para: Criar personagens para jogos, desenvolver identidades visuais e gerar texturas e padrões consistentes."
  },
  {
    name: "Adobe Podcast",
    description: "Transforme qualquer gravação de áudio em qualidade de estúdio profissional.",
    link: "https://podcast.adobe.com",
    category: "Áudio",
    isPaid: true,
    brandColor: "#3B82F6",
    info: "O 'Enhance Speech' da Adobe remove ruídos de fundo e melhora a voz de forma mágica, fazendo um áudio gravado no celular soar como se tivesse sido feito em um estúdio de milhares de dólares. É essencial para podcasters e editores de vídeo. Use para: Limpar áudios de entrevistas, melhorar a qualidade de vlogs e profissionalizar gravações de voz."
  },
  {
    name: "Durable",
    description: "O construtor de sites mais rápido do mundo para pequenos negócios.",
    link: "https://durable.co",
    category: "Sites",
    isPaid: true,
    brandColor: "#3B82F6",
    info: "Durable gera um site completo — incluindo imagens, textos publicitários e formulários de contato — em apenas 30 segundos. É a solução perfeita para profissionais liberais e pequenas empresas que precisam de presença online imediata. Use para: Criar sites para serviços locais, lançar páginas de vendas rápidas e estabelecer presença digital para novos negócios."
  }
];
