import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Layout, 
  BookOpen, 
  Cpu, 
  Zap, 
  History, 
  Settings, 
  Plus,
  Loader2,
  ChevronRight,
  Sparkles,
  Eye,
  ExternalLink,
  Info,
  Globe,
  CreditCard,
  CheckCircle2,
  X,
  Menu,
  MessageSquareText,
  Wand2,
  Video,
  Film,
  Camera,
  Layers,
  Activity,
  UserCheck,
  Search,
  Shield,
  Copy,
  Zap as ZapIcon,
  Bot
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateWorkspacePlan, improvePrompt, fetchTechNews, generateVideoProductionPlan, generateLibraryMethodDetail, generateKeywords, generateScript } from './services/gemini';
import { STUDY_METHODS, AI_HUB_DATA, type AIEntry } from './constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CrieitiLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <Bot className={className} />
);

interface Plan {
  id: string;
  goal: string;
  content: string;
  timestamp: Date;
}

type Tab = 'orquestrador' | 'biblioteca' | 'ai-hub' | 'prompts' | 'video-gen' | 'roteiros' | 'sistema';

export type WorkflowMode = 'analista' | 'especialista' | 'consultivo' | 'estudo' | 'conteudo' | 'video' | 'velocidade';

const WORKFLOW_MODES = [
  { id: 'analista', label: 'Analista', icon: <Search size={16} />, description: 'Foco em dados, precisão e profundidade técnica.' },
  { id: 'especialista', label: 'Especialista', icon: <UserCheck size={16} />, description: 'Respostas diretas, técnicas e de alto nível.' },
  { id: 'consultivo', label: 'Consultivo', icon: <MessageSquareText size={16} />, description: 'Abordagem estratégica e orientada a soluções.' },
  { id: 'estudo', label: 'Estudo e Didática', icon: <BookOpen size={16} />, description: 'Foco em aprendizado, clareza e exemplos práticos.' },
  { id: 'conteudo', label: 'Criação de Conteúdo', icon: <Layers size={16} />, description: 'Foco em criatividade, engajamento e storytelling.' },
  { id: 'video', label: 'Geração de Vídeo com IA', icon: <Film size={16} />, description: 'Foco em visual, cinematografia e prompts de vídeo.' },
  { id: 'velocidade', label: 'Velocidade de Raciocínio', icon: <ZapIcon size={16} />, description: 'Respostas rápidas, concisas e objetivas.' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('orquestrador');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [history, setHistory] = useState<Plan[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState<AIEntry | null>(null);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [workflowMode, setWorkflowMode] = useState<WorkflowMode>('especialista');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!goal.trim() || loading) return;

    setLoading(true);
    setIsMobileMenuOpen(false);
    try {
      const result = await generateWorkspacePlan(goal, workflowMode);
      const newPlan: Plan = {
        id: Math.random().toString(36).substr(2, 9),
        goal: goal,
        content: result || 'Erro ao gerar plano.',
        timestamp: new Date(),
      };
      setCurrentPlan(newPlan);
      setHistory(prev => [newPlan, ...prev]);
      setGoal('');
      setActiveTab('orquestrador');
    } catch (error) {
      console.error('Error generating plan:', error);
      alert('Ocorreu um erro ao gerar seu plano. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentPlan, activeTab]);

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans futuristic-grid relative">
      <div className="scanline" />
      
      {/* Sidebar - Desktop */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: 300, 
          opacity: 1,
          display: 'flex'
        }}
        className="hidden lg:flex bg-surface border-r border-border flex-col overflow-hidden"
      >
        <SidebarContent 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          history={history} 
          currentPlan={currentPlan} 
          setCurrentPlan={setCurrentPlan} 
          setGoal={setGoal}
          onOpenNews={setSelectedNews}
          workflowMode={workflowMode}
        />
      </motion.aside>

      {/* Sidebar - Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-surface z-50 flex flex-col lg:hidden border-r border-border"
            >
              <SidebarContent 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                history={history} 
                currentPlan={currentPlan} 
                setCurrentPlan={setCurrentPlan} 
                onClose={() => setIsMobileMenuOpen(false)}
                setGoal={setGoal}
                onOpenNews={setSelectedNews}
                workflowMode={workflowMode}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-8 bg-bg/50 backdrop-blur-md sticky top-0 z-10 shadow-[0_1px_10px_rgba(0,246,254,0.05)]">
          <div className="flex items-center gap-3 lg:gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-surface rounded-lg text-text-secondary transition-colors lg:hidden"
            >
              <Menu />
            </button>
            <div className="flex items-center gap-3 lg:gap-4 overflow-hidden">
              <div className="flex items-center gap-2">
                {activeTab === 'orquestrador' ? <Cpu size={14} className="text-accent neon-text" /> : 
                 activeTab === 'biblioteca' ? <BookOpen size={14} className="text-accent neon-text" /> :
                 activeTab === 'ai-hub' ? <Globe size={14} className="text-accent neon-text" /> :
                 activeTab === 'prompts' ? <MessageSquareText size={14} className="text-accent neon-text" /> :
                 activeTab === 'video-gen' ? <Video size={14} className="text-accent neon-text" /> :
                 activeTab === 'roteiros' ? <Film size={14} className="text-accent neon-text" /> :
                 <Settings size={14} className="text-accent neon-text" />}
                <span className="text-sm font-bold truncate neon-text uppercase tracking-wider">
                  {activeTab === 'orquestrador' ? 'Orquestrador' : activeTab === 'biblioteca' ? 'Biblioteca' : activeTab === 'prompts' ? 'Prompts' : activeTab === 'video-gen' ? 'Geração de Vídeo' : activeTab === 'roteiros' ? 'Roteiros' : activeTab === 'sistema' ? 'Módulo de Fluxo' : 'AI Hub'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_5px_rgba(0,246,254,1)]" />
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Neural Link Active</span>
            </div>
          </div>
        </header>

        {/* Workspace Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 lg:p-16 scroll-smooth">
            <div className="max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'orquestrador' ? (
                  <OrquestradorView 
                    currentPlan={currentPlan} 
                    loading={loading} 
                    setGoal={setGoal} 
                  />
                ) : activeTab === 'biblioteca' ? (
                  <BibliotecaView workflowMode={workflowMode} />
                ) : activeTab === 'prompts' ? (
                  <PromptsView workflowMode={workflowMode} />
                ) : activeTab === 'video-gen' ? (
                  <VideoGenerationView workflowMode={workflowMode} />
                ) : activeTab === 'roteiros' ? (
                  <RoteirosView workflowMode={workflowMode} />
                ) : activeTab === 'sistema' ? (
                  <SistemaView workflowMode={workflowMode} setWorkflowMode={setWorkflowMode} />
                ) : (
                  <AIHubView onInfo={setSelectedAI} />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Input Area (Only for Orquestrador) */}
          {activeTab === 'orquestrador' && (
            <div className="p-4 sm:p-6 border-t border-border bg-bg/80 backdrop-blur-xl">
              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleGenerate} className="relative group">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="Descreva seu objetivo..."
                    className="w-full bg-surface border border-border focus:border-accent/50 focus:ring-4 focus:ring-accent/10 rounded-2xl py-4 sm:py-5 pl-5 sm:pl-6 pr-14 sm:pr-16 text-base sm:text-lg transition-all outline-none placeholder:text-text-secondary/50 neon-border"
                  />
                  <button
                    type="submit"
                    disabled={!goal.trim() || loading}
                    className={cn(
                      "absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,246,254,0.3)]",
                      goal.trim() && !loading ? "bg-black text-accent border border-accent/30 hover:bg-accent/10 hover:scale-105 active:scale-95" : "bg-border text-text-secondary cursor-not-allowed"
                    )}
                  >
                    {loading ? <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" /> : <Send className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </button>
                </form>
                <p className="text-center text-[8px] sm:text-[10px] text-text-secondary mt-3 sm:mt-4 uppercase tracking-[0.2em] font-mono">
                  CRIEITI WORKSPACE • Powered by Gemini AI
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {selectedAI && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface border border-border w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className={cn(
                        "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold text-white shadow-inner",
                        selectedAI.isPaid ? "bg-blue-500" : "bg-emerald-500"
                      )}
                    >
                      {selectedAI.name[0]}
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{selectedAI.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn(
                          "text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full",
                          selectedAI.isPaid ? "bg-amber-500/20 text-amber-500" : "bg-emerald-500/20 text-emerald-500"
                        )}>
                          {selectedAI.isPaid ? 'Pago' : 'Gratuito'}
                        </span>
                        <span className="text-xs text-text-secondary">•</span>
                        <span className="text-xs text-text-secondary">{selectedAI.category}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedAI(null)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                  >
                    <X size={20} className="text-text-secondary" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">Sobre a Ferramenta</h3>
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                      {selectedAI.info}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-border">
                      <h4 className="text-[10px] font-bold text-accent uppercase mb-2">Recomendação de Uso</h4>
                      <p className="text-xs sm:text-sm text-text-secondary">Ideal para {selectedAI.category.toLowerCase()}.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-border">
                      <h4 className="text-[10px] font-bold text-accent uppercase mb-2">Status</h4>
                      <div className="flex items-center gap-2">
                        {selectedAI.isPaid ? <CreditCard size={14} className="text-amber-500" /> : <CheckCircle2 size={14} className="text-emerald-500" />}
                        <span className="text-xs sm:text-sm text-text-secondary">{selectedAI.isPaid ? 'Plano Pago / Freemium' : 'Totalmente Gratuito'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
                  <a 
                    href={selectedAI.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-black text-accent border border-accent/30 hover:bg-accent/10 py-3.5 sm:py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,246,254,0.2)] hover:scale-105 active:scale-95"
                  >
                    Acessar {selectedAI.name}
                    <ExternalLink size={18} />
                  </a>
                  <button 
                    onClick={() => setSelectedAI(null)}
                    className="sm:px-8 bg-white/5 hover:bg-white/10 text-text-primary py-3.5 sm:py-4 rounded-2xl font-bold transition-all border border-border"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full News Modal */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-surface border border-border w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              <div className="p-6 sm:p-10 border-b border-border flex justify-between items-center bg-surface/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                    <Globe size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">{selectedNews.category}</span>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight line-clamp-1">{selectedNews.title}</h2>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="p-3 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X size={24} className="text-text-secondary" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-10">
                <div className="markdown-body prose prose-invert max-w-none">
                  <ReactMarkdown>{selectedNews.content || selectedNews.summary}</ReactMarkdown>
                </div>
                
                {selectedNews.url && (
                  <div className="mt-10 pt-6 border-t border-border">
                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">Fonte Original</h4>
                    <a 
                      href={selectedNews.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-all group"
                    >
                      <span className="truncate max-w-[250px] sm:max-w-md">{selectedNews.url}</span>
                      <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 border-t border-border bg-surface/50 backdrop-blur-md flex justify-end">
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="px-8 py-3.5 bg-black text-accent border border-accent/30 hover:bg-accent/10 rounded-2xl font-bold transition-all shadow-[0_0_15px_rgba(0,246,254,0.3)] hover:scale-105 active:scale-95"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarContent({ activeTab, setActiveTab, history, currentPlan, setCurrentPlan, onClose, setGoal, onOpenNews, workflowMode }: any) {
  return (
    <>
      <div className="p-6 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black text-accent border border-accent/30 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(0,246,254,0.3)]">
            <CrieitiLogo className="w-6 h-6" />
          </div>
          <h1 className="font-bold text-lg tracking-tight">WORKSPACE</h1>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-text-secondary">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* News Banner Section */}
        <div className="px-2">
          <NewsBanner onOpenNews={onOpenNews} workflowMode={workflowMode} />
        </div>

        <div>
          <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4 px-2">Ferramentas</h2>
            <nav className="space-y-1">
            <SidebarItem 
              icon={<Cpu size={18} />} 
              label="Orquestrador" 
              active={activeTab === 'orquestrador'} 
              onClick={() => { setActiveTab('orquestrador'); onClose?.(); }}
            />
            <SidebarItem 
              icon={<MessageSquareText size={18} />} 
              label="Prompts" 
              active={activeTab === 'prompts'}
              onClick={() => { setActiveTab('prompts'); onClose?.(); }}
            />
            <SidebarItem 
              icon={<Video size={18} />} 
              label="Geração de Vídeo" 
              active={activeTab === 'video-gen'}
              onClick={() => { setActiveTab('video-gen'); onClose?.(); }}
            />
            <SidebarItem 
              icon={<Film size={18} />} 
              label="Roteiros" 
              active={activeTab === 'roteiros'}
              onClick={() => { setActiveTab('roteiros'); onClose?.(); }}
            />
            <SidebarItem 
              icon={<Globe size={18} />} 
              label="AI Hub" 
              active={activeTab === 'ai-hub'}
              onClick={() => { setActiveTab('ai-hub'); onClose?.(); }}
            />
            <SidebarItem 
              icon={<BookOpen size={18} />} 
              label="Biblioteca" 
              active={activeTab === 'biblioteca'}
              onClick={() => { setActiveTab('biblioteca'); onClose?.(); }}
            />
            <SidebarItem 
              icon={<Settings size={18} />} 
              label="Módulo de Fluxo" 
              active={activeTab === 'sistema'}
              onClick={() => { setActiveTab('sistema'); onClose?.(); }}
            />
          </nav>
        </div>

        {activeTab === 'orquestrador' && (
          <div>
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Histórico</h2>
              <History size={14} className="text-text-secondary" />
            </div>
            <div className="space-y-2">
              {history.length === 0 ? (
                <p className="text-xs text-text-secondary px-2 italic">Nenhum plano gerado ainda.</p>
              ) : (
                history.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => { setCurrentPlan(item); setActiveTab('orquestrador'); onClose?.(); }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors truncate",
                      currentPlan?.id === item.id ? "bg-accent/10 text-accent border border-accent/20" : "text-text-secondary hover:bg-white/5"
                    )}
                  >
                    {item.goal}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 px-3 py-1 bg-accent/5 rounded-lg border border-accent/10">
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">System Online</span>
        </div>
      </div>
    </>
  );
}

function SistemaView({ workflowMode, setWorkflowMode }: { workflowMode: WorkflowMode, setWorkflowMode: (m: WorkflowMode) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 sm:space-y-12 pb-20"
    >
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight neon-text uppercase">Módulo de Fluxo</h2>
        <p className="text-text-secondary text-sm sm:text-base">Ajuste os parâmetros de inteligência e comportamento do seu workspace.</p>
      </div>

      <div className="max-w-4xl mx-auto bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="space-y-8">
          <div>
            <h3 className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Cpu size={14} /> Modo de Fluxo de Trabalho
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WORKFLOW_MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setWorkflowMode(mode.id as WorkflowMode)}
                  className={cn(
                    "flex flex-col gap-2 p-5 rounded-2xl border text-left transition-all group",
                    workflowMode === mode.id 
                      ? "bg-black border-accent/50 shadow-[0_0_15px_rgba(0,246,254,0.2)]" 
                      : "bg-white/5 border-border hover:border-accent/30"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      workflowMode === mode.id ? "bg-accent/20 text-accent border border-accent/30" : "bg-white/5 text-text-secondary group-hover:text-accent"
                    )}>
                      {mode.icon}
                    </div>
                    {workflowMode === mode.id && <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_5px_rgba(0,246,254,1)]" />}
                  </div>
                  <div>
                    <h4 className={cn("font-bold text-sm uppercase tracking-wider", workflowMode === mode.id ? "text-accent" : "text-text-primary")}>
                      {mode.label}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">{mode.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <h3 className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Shield size={14} /> CÉREBRO
            </h3>
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-2xl flex items-start gap-4">
              <div className="p-2 bg-accent/20 rounded-lg text-accent">
                <Info size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-1">Conexão Neural</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Defina o foco do seu fluxo de trabalho e o tipo de conexão neural que melhor se adapta aos seus objetivos no CRIEITI WORKSPACE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OrquestradorView({ currentPlan, loading, setGoal }: { currentPlan: Plan | null, loading: boolean, setGoal: (g: string) => void }) {
  return (
    <AnimatePresence mode="wait">
      {!currentPlan && !loading ? (
        <motion.div 
          key="empty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center py-10 sm:py-20"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-[0_0_30px_rgba(0,246,254,0.2)] border border-accent/20">
            <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-accent neon-text" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight px-4 neon-text uppercase">O que vamos construir hoje?</h2>
          <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12 px-6">
            Transforme seus objetivos em projetos estruturados e planos de estudo práticos com o poder da IA.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto text-left px-4">
            <ExampleCard 
              title="Canal de Culinária" 
              description="Criar um canal de culinária usando IA para roteiro e edição."
              onClick={() => setGoal("Quero criar um canal de culinária com IA")}
            />
            <ExampleCard 
              title="App de Finanças" 
              description="Desenvolver um MVP de app de finanças pessoais com React."
              onClick={() => setGoal("Quero desenvolver um MVP de app de finanças pessoais com React")}
            />
            <ExampleCard 
              title="Marketing Digital" 
              description="Automatizar minha agência de marketing com agentes de IA."
              onClick={() => setGoal("Quero automatizar minha agência de marketing com agentes de IA")}
            />
            <ExampleCard 
              title="Escrita Criativa" 
              description="Escrever e publicar um e-book usando IA generativa."
              onClick={() => setGoal("Quero escrever e publicar um e-book usando IA generativa")}
            />
          </div>
        </motion.div>
      ) : loading ? (
        <motion.div 
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 sm:py-32 space-y-6"
        >
          <div className="relative">
            <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-accent animate-spin" />
            <div className="absolute inset-0 blur-xl bg-accent/30 animate-pulse" />
          </div>
          <div className="text-center px-6">
            <h3 className="text-lg sm:text-xl font-medium mb-2">Orquestrando seu projeto...</h3>
            <p className="text-text-secondary text-xs sm:text-sm">Analisando objetivos, mapeando ferramentas e estruturando seu plano.</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="plan"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 sm:space-y-8 pb-32"
        >
          <div className="flex items-center gap-4 mb-8 sm:mb-12">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,246,254,0.4)] shrink-0 border border-accent/30">
              <Sparkles className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight truncate neon-text uppercase">{currentPlan?.goal}</h2>
              <p className="text-text-secondary text-xs sm:text-sm font-mono uppercase tracking-widest">Plan Generated • {currentPlan?.timestamp.toLocaleDateString()}</p>
            </div>
          </div>

            <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl overflow-x-hidden">
              <div className="markdown-body text-sm sm:text-base">
                <ReactMarkdown>{currentPlan?.content || ''}</ReactMarkdown>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  if (currentPlan?.content) {
                    navigator.clipboard.writeText(currentPlan.content);
                    alert('Plano copiado para a área de transferência!');
                  }
                }}
                className="flex-1 bg-black text-accent border border-accent/30 hover:bg-accent/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,246,254,0.2)] hover:scale-105 active:scale-95"
              >
                <Copy size={20} />
                Copiar Plano
              </button>
              <button 
                onClick={() => setGoal('')}
                className="px-8 bg-white/5 hover:bg-white/10 text-text-primary py-4 rounded-2xl font-bold transition-all border border-border flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <Plus size={20} />
                Novo Plano
              </button>
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}

function BibliotecaView({ workflowMode }: { workflowMode: WorkflowMode }) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [detail, setDetail] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleMethodClick = async (method: string) => {
    setSelectedMethod(method);
    setLoading(true);
    setDetail('');
    try {
      const result = await generateLibraryMethodDetail(method, workflowMode);
      setDetail(result || 'Erro ao carregar detalhes.');
    } catch (error) {
      console.error('Error loading method details:', error);
      setDetail('Ocorreu um erro ao carregar os detalhes deste método.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 sm:space-y-12 pb-20"
    >
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Biblioteca de Métodos IA</h2>
        <p className="text-text-secondary text-sm sm:text-base">Explore técnicas avançadas para potencializar seu aprendizado usando inteligência artificial.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {STUDY_METHODS.map((method, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            onClick={() => handleMethodClick(method)}
            className="p-5 sm:p-6 bg-surface border border-border rounded-2xl hover:border-accent/30 transition-all group cursor-pointer neon-border"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent font-bold mb-4 group-hover:bg-black group-hover:border group-hover:border-accent/50 transition-all text-sm sm:text-base relative overflow-hidden">
              <span className="group-hover:opacity-0 transition-opacity">{index + 1}</span>
              <Sparkles size={18} className="absolute opacity-0 group-hover:opacity-100 transition-opacity neon-text" />
            </div>
            <p className="text-text-primary text-sm sm:text-base font-medium leading-relaxed">
              {method.split(':')[0]}:
              <span className="text-text-secondary font-normal block mt-1">
                {method.split(':')[1]}
              </span>
            </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedMethod && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-surface border border-border w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-border flex justify-between items-center bg-surface/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                    <BookOpen size={20} />
                  </div>
                  <h2 className="text-xl font-bold neon-text uppercase tracking-wider truncate max-w-[200px] sm:max-w-md">
                    {selectedMethod.split(':')[0]}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedMethod(null)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-10">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <Loader2 className="w-10 h-10 text-accent animate-spin" />
                    <p className="text-text-secondary animate-pulse">Gerando guia completo...</p>
                  </div>
                ) : (
                  <div className="markdown-body prose prose-invert max-w-none">
                    <ReactMarkdown>{detail}</ReactMarkdown>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-border bg-surface/50 backdrop-blur-md flex justify-end gap-3">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(detail);
                    alert('Guia copiado!');
                  }}
                  className="px-6 py-3 bg-black text-accent border border-accent/30 hover:bg-accent/10 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(0,246,254,0.1)] flex items-center gap-2"
                >
                  <Copy size={18} />
                  Copiar Guia
                </button>
                <button 
                  onClick={() => setSelectedMethod(null)}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 text-text-primary border border-border rounded-xl font-bold transition-all"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AIHubView({ onInfo }: { onInfo: (ai: AIEntry) => void }) {
  const freeAIs = AI_HUB_DATA.filter(ai => !ai.isPaid);
  const paidAIs = AI_HUB_DATA.filter(ai => ai.isPaid);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 sm:space-y-12 pb-20"
    >
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">AI Hub</h2>
        <p className="text-text-secondary text-sm sm:text-base">O diretório definitivo das melhores ferramentas de IA do mercado.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Free Column */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <h3 className="text-lg sm:text-xl font-bold tracking-tight uppercase text-emerald-500">Gratuitas / Freemium</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {freeAIs.map((ai, index) => (
              <AICard key={index} ai={ai} onInfo={() => onInfo(ai)} />
            ))}
          </div>
        </div>

        {/* Paid Column */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <h3 className="text-lg sm:text-xl font-bold tracking-tight uppercase text-amber-500">Pagas / Custo-Benefício</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {paidAIs.map((ai, index) => (
              <AICard key={index} ai={ai} onInfo={() => onInfo(ai)} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AICard({ ai, onInfo }: { ai: AIEntry, onInfo: () => void }) {
  return (
    <div className="group p-4 sm:p-5 bg-surface border border-border rounded-2xl hover:border-accent/30 transition-all flex items-center justify-between gap-3 sm:gap-4 neon-border">
      <div 
        className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 cursor-pointer"
        onClick={onInfo}
      >
        <div 
          className={cn(
            "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-lg font-bold shrink-0 text-white shadow-inner transition-transform group-hover:scale-110",
            ai.isPaid ? "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          )}
        >
          {ai.name[0]}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-text-primary text-sm sm:text-base truncate group-hover:text-accent transition-colors neon-text">{ai.name}</h4>
          <p className="text-[10px] sm:text-xs text-text-secondary truncate">{ai.description}</p>
        </div>
      </div>
      
        <div className="flex items-center gap-1.5 sm:gap-2">
        <button 
          onClick={onInfo}
          className="p-2 sm:p-2.5 bg-black text-accent border border-accent/30 hover:bg-accent/10 rounded-xl transition-all shadow-[0_0_10px_rgba(0,246,254,0.1)]"
          title="Mais informações"
        >
          <Info size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
        <a 
          href={ai.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 sm:p-2.5 bg-black text-accent border border-accent/30 hover:bg-accent/10 rounded-xl transition-all shadow-[0_0_10px_rgba(0,246,254,0.1)]"
          title="Acessar site"
        >
          <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
        </a>
      </div>
    </div>
  );
}

function NewsBanner({ onOpenNews, workflowMode }: { onOpenNews: (news: any) => void, workflowMode: string }) {
  const [news, setNews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchTechNews(workflowMode);
        if (data && data.length > 0) {
          setNews(data);
        } else {
          // Fallback news if API fails
          setNews([
            { title: "NVIDIA H200 revoluciona IA", summary: "Novos chips da NVIDIA prometem dobrar a performance em modelos de linguagem.", content: "A NVIDIA anunciou o lançamento do chip H200, projetado especificamente para acelerar o treinamento e a inferência de modelos de inteligência artificial generativa. Com uma largura de banda de memória significativamente maior, o H200 promete dobrar a performance em relação ao seu antecessor, consolidando a liderança da NVIDIA no mercado de hardware para IA.", category: "Hardware", url: "https://nvidia.com" },
            { title: "Sora: O futuro do vídeo", summary: "OpenAI demonstra novas capacidades de geração de vídeo ultra-realista.", content: "A OpenAI continua a impressionar o mundo com o Sora, seu modelo de geração de vídeo a partir de texto. Novas demonstrações mostram uma compreensão profunda da física do mundo real e uma consistência visual sem precedentes, permitindo a criação de cenas complexas que desafiam a distinção entre o real e o gerado por IA.", category: "IA Vídeo", url: "https://openai.com/sora" },
            { title: "Gemini 1.5 Pro expande contexto", summary: "Google libera janela de 2 milhões de tokens para desenvolvedores.", content: "O Google anunciou uma atualização massiva para o Gemini 1.5 Pro, agora permitindo uma janela de contexto de até 2 milhões de tokens. Isso permite que a IA analise horas de vídeo, milhares de linhas de código ou livros inteiros em uma única consulta, abrindo novas possibilidades para desenvolvedores e pesquisadores.", category: "Modelos", url: "https://deepmind.google" },
            { title: "Apple entra na corrida da IA", summary: "Novos recursos de IA generativa chegam ao iOS em breve.", content: "Rumores indicam que a Apple está integrando profundamente recursos de inteligência artificial generativa no iOS 18. A empresa estaria focada em processamento on-device para garantir a privacidade do usuário, trazendo melhorias significativas para a Siri e ferramentas de edição de fotos e textos.", category: "Tech", url: "https://apple.com" },
            { title: "Novas ferramentas de design IA", summary: "Framer e Canva anunciam integrações profundas com modelos generativos.", content: "O mercado de design está sendo transformado por novas ferramentas de IA. O Framer agora permite gerar sites completos a partir de prompts, enquanto o Canva expandiu seu Magic Studio com ferramentas de edição de imagem e vídeo baseadas em modelos de difusão de última geração.", category: "Design", url: "https://canva.com" }
          ]);
        }
      } catch (e) {
        console.error("Error loading news", e);
      }
    };
    loadNews();
  }, [workflowMode]);

  useEffect(() => {
    if (news.length === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(timer);
  }, [news, currentIndex]);

  const handleNext = () => {
    setIsPulsing(true);
    setCurrentIndex((prev) => (prev + 1) % news.length);
    setTimeout(() => setIsPulsing(false), 1000);
  };

  const handlePrev = () => {
    setIsPulsing(true);
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
    setTimeout(() => setIsPulsing(false), 1000);
  };

  if (news.length === 0) return null;

  const current = news[currentIndex];

  return (
    <div className="relative group">
      {/* Neon Pulsing Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 via-purple-500/50 to-accent/50 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
      
      <div 
        onClick={() => onOpenNews(current)}
        className="relative bg-surface border border-border rounded-2xl p-5 sm:p-6 overflow-hidden shadow-xl cursor-pointer hover:bg-white/5 transition-all min-h-[180px] flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {/* Red Orb with Pulse */}
              <div className="relative">
                <div className={cn(
                  "w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]",
                  isPulsing && "animate-ping"
                )} />
                {isPulsing && (
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-purple-500 rounded-full animate-ping" />
                )}
              </div>
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] neon-text">Live Feed</span>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] ml-2">{current.category}</span>
            </div>
            
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <button onClick={handlePrev} className="p-1.5 bg-black/40 border border-accent/20 hover:border-accent/50 rounded-md text-accent transition-colors shadow-[0_0_10px_rgba(0,246,254,0.1)]">
                <ChevronRight size={16} className="rotate-180" />
              </button>
              <button onClick={handleNext} className="p-1.5 bg-black/40 border border-accent/20 hover:border-accent/50 rounded-md text-accent transition-colors shadow-[0_0_10px_rgba(0,246,254,0.1)]">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-2"
            >
              <h4 className="text-sm sm:text-base font-bold text-text-primary leading-tight line-clamp-2 group-hover:text-accent transition-colors">{current.title}</h4>
              <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">{current.summary}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {news.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === currentIndex ? "w-6 bg-accent" : "w-1.5 bg-border"
                )} 
              />
            ))}
          </div>
          <span className="text-[10px] font-medium text-text-secondary flex items-center gap-1">
            Ver detalhes <ChevronRight size={10} />
          </span>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden",
        active 
          ? "bg-black text-accent border border-accent/30 shadow-[0_0_20px_rgba(0,246,254,0.15)]" 
          : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
      )}
    >
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full shadow-[0_0_10px_rgba(0,246,254,1)]" />
      )}
      <span className={cn("transition-transform group-hover:scale-110", active ? "text-accent neon-text" : "text-text-secondary group-hover:text-accent")}>
        {icon}
      </span>
      <span className={cn(active && "neon-text font-bold")}>{label}</span>
    </button>
  );
}

function ExampleCard({ title, description, onClick }: { title: string, description: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-4 sm:p-5 bg-black border border-border rounded-2xl text-left hover:border-accent/50 hover:bg-accent/5 transition-all group neon-border shadow-[0_0_10px_rgba(0,246,254,0.05)] hover:shadow-[0_0_20px_rgba(0,246,254,0.1)]"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-sm sm:text-base text-text-primary group-hover:text-accent transition-colors uppercase tracking-wider">{title}</h3>
        <ChevronRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
      </div>
      <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 leading-relaxed">{description}</p>
    </button>
  );
}

function VideoGenerationView({ workflowMode }: { workflowMode: WorkflowMode }) {
  const [inputIdea, setInputIdea] = useState('');
  const [productionPlan, setProductionPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputIdea.trim() || loading) return;

    setLoading(true);
    try {
      const result = await generateVideoProductionPlan(inputIdea, workflowMode);
      setProductionPlan(result || 'Erro ao gerar plano de produção.');
    } catch (error) {
      console.error('Error generating video plan:', error);
      alert('Ocorreu um erro ao gerar seu plano de produção. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,246,254,0.2)] border border-accent/20">
          <Video className="w-8 h-8 text-accent neon-text" />
        </div>
        <h2 className="text-3xl font-bold mb-4 neon-text uppercase tracking-tight">Geração de Vídeo Ultra-Realista</h2>
        <p className="text-text-secondary text-sm sm:text-base">
          Transforme suas ideias em planos de produção cinematográfica de Hollywood. Texturas, lentes, iluminação e prompts mestres para resultados épicos.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleGeneratePlan} className="relative group">
          <textarea
            value={inputIdea}
            onChange={(e) => setInputIdea(e.target.value)}
            placeholder="Descreva sua ideia de vídeo (ex: Um astronauta caminhando em um planeta de cristal azul)..."
            className="w-full bg-surface border border-border focus:border-accent/50 focus:ring-4 focus:ring-accent/10 rounded-2xl py-5 px-6 min-h-[150px] text-base sm:text-lg transition-all outline-none placeholder:text-text-secondary/50 resize-none neon-border"
          />
          <button
            type="submit"
            disabled={!inputIdea.trim() || loading}
            className={cn(
              "absolute right-4 bottom-4 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,246,254,0.3)]",
              inputIdea.trim() && !loading ? "bg-black text-accent border border-accent/30 hover:bg-accent/10 hover:scale-105 active:scale-95" : "bg-border text-text-secondary cursor-not-allowed"
            )}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera size={20} />}
            {loading ? 'Processando...' : 'Gerar Plano de Produção'}
          </button>
        </form>
      </div>

      {productionPlan && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto bg-surface border border-border rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-8 border-b border-border pb-6">
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                <Film size={20} />
              </div>
              <h3 className="text-xl font-bold neon-text uppercase tracking-wider">Plano de Produção Cinematográfica</h3>
            </div>
            <div className="markdown-body prose prose-invert max-w-none">
              <ReactMarkdown>{productionPlan}</ReactMarkdown>
            </div>

            <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(productionPlan);
                  alert('Plano de produção copiado!');
                }}
                className="flex-1 bg-black text-accent border border-accent/30 hover:bg-accent/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,246,254,0.2)] hover:scale-105 active:scale-95"
              >
                <Copy size={20} />
                Copiar Plano
              </button>
              <button 
                onClick={() => {
                  setProductionPlan('');
                  setInputIdea('');
                }}
                className="px-8 bg-white/5 hover:bg-white/10 text-text-primary py-4 rounded-2xl font-bold transition-all border border-border flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <Plus size={20} />
                Nova Ideia
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function RoteirosView({ workflowMode }: { workflowMode: WorkflowMode }) {
  const [theme, setTheme] = useState('');
  const [keywords, setKeywords] = useState('');
  const [script, setScript] = useState('');
  const [step, setStep] = useState(1); // 1: Theme, 2: Keywords, 3: Script
  const [loading, setLoading] = useState(false);

  const handleNextToKeywords = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim() || loading) return;

    setLoading(true);
    try {
      const result = await generateKeywords(theme, workflowMode);
      setKeywords(result || '');
      setStep(2);
    } catch (error) {
      console.error('Error generating keywords:', error);
      alert('Erro ao gerar palavras-chave. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateScript = async () => {
    if (!keywords.trim() || loading) return;

    setLoading(true);
    try {
      const result = await generateScript(theme, keywords, workflowMode);
      setScript(result || '');
      setStep(3);
    } catch (error) {
      console.error('Error generating script:', error);
      alert('Erro ao gerar roteiro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTheme('');
    setKeywords('');
    setScript('');
    setStep(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,246,254,0.2)] border border-accent/20">
          <Film className="w-8 h-8 text-accent neon-text" />
        </div>
        <h2 className="text-3xl font-bold mb-4 neon-text uppercase tracking-tight">Arquiteto de Roteiros</h2>
        <p className="text-text-secondary text-sm sm:text-base">
          Transforme ideias em webdocumentários cinematográficos de alta retenção com storytelling profissional.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {step === 1 && (
          <form onSubmit={handleNextToKeywords} className="relative group">
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Digite a ideia e o tema principal do roteiro..."
              className="w-full bg-surface border border-border focus:border-accent/50 focus:ring-4 focus:ring-accent/10 rounded-2xl py-5 px-6 min-h-[150px] text-base sm:text-lg transition-all outline-none placeholder:text-text-secondary/50 resize-none neon-border"
            />
            <button
              type="submit"
              disabled={!theme.trim() || loading}
              className={cn(
                "absolute right-4 bottom-4 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,246,254,0.3)]",
                theme.trim() && !loading ? "bg-black text-accent border border-accent/30 hover:bg-accent/10 hover:scale-105 active:scale-95" : "bg-border text-text-secondary cursor-not-allowed"
              )}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronRight size={20} />}
              {loading ? 'Analisando...' : 'Próximo: Palavras-Chave'}
            </button>
          </form>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles className="text-accent" size={20} />
                Palavras-Chave Estratégicas
              </h3>
              <p className="text-text-secondary text-sm mb-6">
                Ajuste as 7 palavras-chave que guiarão o storytelling do seu roteiro.
              </p>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Palavra 1, Palavra 2, ..."
                className="w-full bg-black/40 border border-border focus:border-accent/50 rounded-xl py-4 px-6 text-base transition-all outline-none neon-border"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-text-primary rounded-2xl font-bold transition-all border border-border flex-1"
              >
                Voltar
              </button>
              <button
                onClick={handleGenerateScript}
                disabled={!keywords.trim() || loading}
                className={cn(
                  "flex-[2] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,246,254,0.3)]",
                  keywords.trim() && !loading ? "bg-black text-accent border border-accent/30 hover:bg-accent/10 hover:scale-105 active:scale-95" : "bg-border text-text-secondary cursor-not-allowed"
                )}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 size={20} />}
                {loading ? 'Escrevendo Roteiro...' : 'Gerar Roteiro Cinematográfico'}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl overflow-x-hidden">
              <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                    <Film size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider neon-text">Roteiro Finalizado</h3>
                    <p className="text-xs text-text-secondary uppercase tracking-widest mt-1">Storytelling de Alta Retenção</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest">
                    Pronto para Produção
                  </div>
                </div>
              </div>

              <div className="markdown-body prose prose-invert max-w-none">
                <ReactMarkdown>{script}</ReactMarkdown>
              </div>

              <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(script);
                    alert('Roteiro copiado com sucesso!');
                  }}
                  className="flex-1 bg-black text-accent border border-accent/30 hover:bg-accent/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,246,254,0.2)] hover:scale-105 active:scale-95"
                >
                  <Copy size={20} />
                  Copiar Roteiro
                </button>
                <button 
                  onClick={handleReset}
                  className="px-8 bg-white/5 hover:bg-white/10 text-text-primary py-4 rounded-2xl font-bold transition-all border border-border flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Plus size={20} />
                  Novo Roteiro
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function PromptsView({ workflowMode }: { workflowMode: WorkflowMode }) {
  const [inputPrompt, setInputPrompt] = useState('');
  const [improvedResult, setImprovedResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImprove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    setLoading(true);
    try {
      const result = await improvePrompt(inputPrompt, workflowMode);
      setImprovedResult(result || 'Erro ao melhorar o prompt.');
    } catch (error) {
      console.error('Error improving prompt:', error);
      alert('Ocorreu um erro ao melhorar seu prompt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 sm:space-y-12 pb-20"
    >
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Melhorar Prompts</h2>
        <p className="text-text-secondary text-sm sm:text-base">
          Transforme comandos simples em prompts profissionais para vídeos, propagandas e sites.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <form onSubmit={handleImprove} className="relative group">
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Escreva seu prompt aqui (ex: Um robô andando de skate)..."
            className="w-full bg-surface border border-border focus:border-accent/50 focus:ring-4 focus:ring-accent/10 rounded-2xl py-5 px-6 min-h-[150px] text-base sm:text-lg transition-all outline-none placeholder:text-text-secondary/50 resize-none neon-border"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || loading}
            className={cn(
              "absolute right-4 bottom-4 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,246,254,0.3)]",
              inputPrompt.trim() && !loading ? "bg-black text-accent border border-accent/30 hover:bg-accent/10 hover:scale-105 active:scale-95" : "bg-border text-text-secondary cursor-not-allowed"
            )}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 size={20} />}
            {loading ? 'Melhorando...' : 'Melhorar Prompt'}
          </button>
        </form>

        <AnimatePresence>
          {improvedResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface border border-border rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-bold">Prompts Otimizados</h3>
              </div>
              <div className="markdown-body text-sm sm:text-base">
                <ReactMarkdown>{improvedResult}</ReactMarkdown>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(improvedResult);
                    alert('Prompt copiado!');
                  }}
                  className="flex-1 bg-black text-accent border border-accent/30 hover:bg-accent/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,246,254,0.2)] hover:scale-105 active:scale-95"
                >
                  <Copy size={20} />
                  Copiar Prompt
                </button>
                <button 
                  onClick={() => {
                    setImprovedResult('');
                    setInputPrompt('');
                  }}
                  className="px-8 bg-white/5 hover:bg-white/10 text-text-primary py-4 rounded-2xl font-bold transition-all border border-border flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Plus size={20} />
                  Limpar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

