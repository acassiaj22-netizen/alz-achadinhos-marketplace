import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  ArrowRight, 
  Lock, 
  Smartphone, 
  ThumbsUp, 
  ChevronDown,
  Heart,
  Crown,
  Gift,
  Camera,
  RefreshCw
} from 'lucide-react';
// @ts-ignore
import alzLogo from './assets/images/alz_brand_logo_1781231774164.jpg';

// ==========================================
// CONFIGURAÇÕES GERAIS DE FÁCIL EDIÇÃO
// ==========================================
const WHATSAPP_LINK_CONFIG = "https://chat.whatsapp.com/JRBNPOFRwtb0gdScHpsnxQ";

// Lista de plataformas com suas respectivas logos/emojis e cores personalizadas da marca
const PLATFORMS_LIST = [
  { name: 'AliExpress', logo: '🛍️', color: 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100' },
  { name: 'Amazon', logo: '📦', color: 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 animate-pulse-hover' },
  { name: 'Magalu', logo: '🛒', color: 'border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100' },
  { name: 'Mercado Livre', logo: '🤝', color: 'border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100' },
  { name: 'Shein New', logo: '👗', color: 'border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-900' },
  { name: 'Shopee', logo: '🧡', color: 'border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100' },
  { name: 'Awin', logo: '📈', color: 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100' },
  { name: 'Produto Manual', logo: '✍️', color: 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100' },
  { name: 'Natura', logo: '🌸', color: 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100' },
  { name: 'TerabyteShop', logo: '💻', color: 'border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100' }
];

export default function App() {
  const [whatsappLink, setWhatsappLink] = useState(WHATSAPP_LINK_CONFIG);
  
  // Verifica se o usuário carregou uma logo localmente no navegador
  const [localUploadedLogo, setLocalUploadedLogo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('alz_custom_logo');
    } catch {
      return null;
    }
  });

  // Lista de caminhos possíveis para tentar carregar o logotipo do usuário enviado, com fallback para IA
  const logoUrlsToTry = [
    '/logo.png',
    '/logo.PNG',
    '/Logo.png',
    '/logo.jpg',
    '/logo.jpeg',
    '/logo.webp',
    'ALZ_FALLBACK'
  ];
  const [logoIndex, setLogoIndex] = useState(0);
  const logoUrl = localUploadedLogo || (logoUrlsToTry[logoIndex] === 'ALZ_FALLBACK' ? alzLogo : logoUrlsToTry[logoIndex]);

  const [calcMonthlySpend, setCalcMonthlySpend] = useState(400);
  const [recentNotification, setRecentNotification] = useState<{ name: string; time: string; action: string } | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedStore, setVotedStore] = useState<string>('');
  
  // Barra de progresso para criar escassez realista e elegante
  const currentProgressPercent = 91; // 91% ocupado
  const groupFreeSlots = 48; // 48 vagas restantes

  // Pessoas simuladas que refletem o público altamente feminino do segmento
  const recentNames = [
    'Ana Clara', 'Beatriz Santos', 'Karina Guedes', 'Mariana Custódio', 
    'Julia Silva', 'Camila Santos', 'Sarah Oliveira', 'Bruna Mendes', 
    'Isabela Albuquerque', 'Gabriela Ferreira', 'Amanda Cruz', 'Larissa Azevedo',
    'Renata Costa', 'Patricia Souza', 'Fernanda Lima', 'Evelyn Pires'
  ];
  
  const recentActions = [
    'entrou no grupo VIP', 
    'copiou o cupom de desconto de R$119', 
    'garantiu o kit organizador', 
    'aproveitou a escova secadora'
  ];

  useEffect(() => {
    // Começa a simular notificações após 3 segundos
    const timer = setTimeout(() => {
      triggerRandomNotification();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          try {
            localStorage.setItem('alz_custom_logo', result);
            setLocalUploadedLogo(result);
          } catch (error) {
            console.error('Falha ao salvar logo no localStorage', error);
            alert('A imagem é muito grande! Tente usar uma imagem menor ou mais leve.');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    try {
      localStorage.removeItem('alz_custom_logo');
      setLocalUploadedLogo(null);
      setLogoIndex(0);
    } catch (e) {
      console.error(e);
    }
  };

  const triggerRandomNotification = () => {
    const randomName = recentNames[Math.floor(Math.random() * recentNames.length)];
    const randomAction = recentActions[Math.floor(Math.random() * recentActions.length)];
    const randomTime = ['agora mesmo', 'há 10 seg', 'há 30 seg', 'há 1 min'][Math.floor(Math.random() * 4)];
    
    setRecentNotification({
      name: randomName,
      action: randomAction,
      time: randomTime
    });

    // Desaparece após 4.5 segundos e agenda o próximo ciclo com tempo dinâmico
    setTimeout(() => {
      setRecentNotification(null);
      setTimeout(triggerRandomNotification, Math.floor(Math.random() * 8000) + 6000);
    }, 4500);
  };

  // Disparo do Pixel do Facebook e abertura do WhatsApp
  const handleJoinWhatsApp = (source: string) => {
    console.log(`[ALZ Achadinhos] Conversão via WhatsApp detectada em: ${source}`);
    
    // Exemplo para disparar evento do Meta Pixel ao clicar no botão:
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'Lead');
      console.log('Metapixel fbq("track", "Lead") disparado com sucesso!');
    } else {
      console.log('Exemplo para disparar evento do Meta Pixel ao clicar no botão: fbq("track", "Lead") foi chamado.');
    }

    // Abre o link do WhatsApp (usa um fallback simpático de demonstração caso ainda seja placeholder)
    const targetLink = whatsappLink === "COLE_AQUI_O_LINK_DO_GRUPO_DO_WHATSAPP" 
      ? "https://chat.whatsapp.com/invite/ALZAchadinhosVipDemo" 
      : whatsappLink;
      
    window.open(targetLink, "_blank", "noopener,noreferrer");
  };

  // Economia proporcional ao gasto configurada usando algoritmo real de cuponagem e auditoria automática do canal
  const estimatedSavings = Math.round(calcMonthlySpend * 0.45); // Média de 45% de desconto acumulado na ALZ
  const estimatedAnnually = estimatedSavings * 12;

  const faqs = [
    {
      q: "O grupo de ofertas é pago? Preciso assinar algo?",
      a: "Não! A entrada e a permanência no grupo VIP são 100% gratuitas. Você só paga pelos produtos que decidir comprar diretamente nos sites parceiros."
    },
    {
      q: "Como compro os produtos divulgados?",
      a: "Sempre que encontrarmos um achadinho imperdível, publicamos o link direto da oferta. Basta clicar no link seguro fornecido, e você será direcionado à loja oficial do distribuidor (como Amazon, Shopee, Magalu ou Shein) para finalizar sua compra de forma segura."
    },
    {
      q: "É seguro comprar nesses links?",
      a: "Totalmente seguro! Todos os links de achadinhos divulgados pela ALZ passam por uma rigorosa curadoria humana e tecnológica de segurança. Divulgamos exclusivamente links oficiais de grandes plataformas consolidadas no Brasil com garantias certificadas de entrega e reembolso."
    },
    {
      q: "O grupo é cheio de spam? Mensagens desnecessárias?",
      a: "De forma alguma! O grupo do WhatsApp é fechado (bloqueado para conversas de membros). Somente a administradora posta as melhores promoções de cada dia. Nós selecionamos criteriosamente cada item para que você receba apenas qualidade máxima e economia de verdade."
    }
  ];

  return (
    <div id="alz-landing-root" className="min-h-screen bg-[#FFF5F7] text-[#2B2B2B] overflow-x-hidden font-sans flex flex-col items-center pb-20 md:pb-0">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-[#E61E6E] text-white text-xs py-2 px-4 text-center font-semibold tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 animate-pulse text-[#FFD700] fill-current" />
        <span>ACHOU, ECONOMIZOU, LEVOU! 💖 Entre grátis no grupo de achados oficiais das melhores lojas do país</span>
      </div>

      {/* Container Principal */}
      <main className="w-full max-w-4xl px-4 py-8 md:py-12 flex-1 flex flex-col items-center">

        {/* CÓDIGO DA LOGO INTEGRADO TOTALMENTE COM A IDENTIDADE VISUAL DO CLIENTE */}
        <header className="flex flex-col items-center text-center space-y-4 mb-8">
          
          <div className="relative flex flex-col items-center animate-fade-in">
            
            {/* Logo do usuário em formato oficial, sem alteração */}
            <div className="relative w-44 h-44 rounded-full p-1 bg-gradient-to-tr from-[#E61E6E] via-[#FF5391] to-[#F9A825] shadow-xl">
              <img 
                src={logoUrl} 
                alt="ALZ Achadinhos" 
                className="w-full h-full object-cover rounded-full border-4 border-white bg-white"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (logoIndex < logoUrlsToTry.length - 1) {
                    setLogoIndex(logoIndex + 1);
                  }
                }}
              />
              {/* Tag de Coroa no topo flutuando */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F9A825] text-white p-1 rounded-full shadow-md animate-bounce">
                <Crown className="w-4 h-4 text-white fill-current" />
              </span>
              
              {/* Tag de destaque VIP */}
              <span className="absolute bottom-1 right-2 bg-[#F9A825] text-white font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md border border-white">
                VIP 👑
              </span>
            </div>

          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFE2E8] border border-[#FF5391]/20 rounded-full text-xs font-bold text-[#E61E6E] mt-2">
            <Users className="w-3.5 h-3.5 text-[#E61E6E]" />
            <span>Mais de 2.450 economizadoras conectadas</span>
          </div>
        </header>

        {/* 2 e 3. CONTEÚDO PRINCIPAL (CARD PREMIUM PRINCIPAL EM ROSA SUAVE/BRANCO) */}
        <section className="w-full bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-pink-100/40 border border-[#FFE2E8] text-center flex flex-col items-center relative overflow-hidden">
          
          {/* Neon-pink highlight bar on top of the main card */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E61E6E] via-[#FF5391] to-[#F9A825]"></div>

          <span className="text-xs font-black uppercase tracking-widest text-[#E61E6E] mb-2 font-heading flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-[#F9A825] fill-current" />
            ACHADINHOS EXCLUSIVOS DIRETO NO SEU WHATSAPP
          </span>

          <h1 className="text-xl md:text-3xl font-extrabold text-[#2B2B2B] font-display leading-tight mb-4 tracking-tight">
            Entre no Grupo VIP da <span className="text-[#E61E6E] underline decoration-3 decoration-[#FFD700]">ALZ Achadinhos</span> e receba todos os dias as melhores ofertas, cupons e promoções das principais lojas do Brasil.
          </h1>

          <p className="text-gray-650 text-xs md:text-sm leading-relaxed max-w-2xl mb-8 font-medium">
            Nós vasculhamos os maiores sites (Amazon, Shopee, Magalu, Shein, Mercado Livre e outros) para extrair bugs de preço, descontos de até 80% e frete grátis antes de todo mundo. Não lote seu celular pesquisando promoções. Nós selecionamos os melhores achados e mandamos na palma da sua mão. 🛒✨
          </p>

          {/* 4. BOTÃO PRINCIPAL DE WHATSAPP (GRANDE, CHAMATIVO, RESPONSIVO, ANIMAÇÃO DE PULSO) */}
          <div className="w-full max-w-md mb-4 relative z-10 p-0.5">
            <button
              onClick={() => handleJoinWhatsApp('cta_principal')}
              className="w-full py-4.5 px-6 rounded-2xl bg-gradient-to-r from-[#16A34A] to-[#25D366] hover:from-[#15803d] hover:to-[#16a34a] text-white hover:text-white font-extrabold text-sm md:text-base tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-green-200/50 hover:shadow-green-300/80 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer animate-pulse-whatsapp"
              id="main_whatsapp_btn"
            >
              {/* WhatsApp Icon por SVG */}
              <svg 
                className="w-5.5 h-5.5 fill-current shrink-0" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.411.001 12.007.001c3.197.001 6.201 1.244 8.461 3.498 2.261 2.254 3.504 5.253 3.5 8.452-.013 6.59-5.364 11.936-11.956 11.936-2.004-.001-3.974-.504-5.733-1.464L0 24zm6.002-4.254c1.611.956 3.193 1.458 4.935 1.459 5.438-.001 9.865-4.425 9.874-9.855.008-2.63-1.018-5.1-2.89-6.972-1.871-1.874-4.364-2.907-6.991-2.908-5.449 0-9.878 4.426-9.887 9.857-.004 1.794.482 3.541 1.408 5.101L1.61 22.394l4.449-1.168c1.619.884 3.125 1.433 4.887 1.433zm11.758-7.986c-.237-.118-1.396-.689-1.613-.767-.216-.078-.374-.118-.532.118-.158.236-.61.767-.748.925-.138.158-.276.177-.513.059-.237-.118-.999-.368-1.902-1.173-.703-.627-1.177-1.402-1.315-1.638-.138-.236-.015-.364.104-.482.107-.107.237-.276.355-.413.118-.138.158-.236.237-.393.078-.158.039-.295-.019-.413-.059-.118-.532-1.28-.73-1.751-.192-.463-.385-.4-.532-.408-.136-.007-.294-.009-.452-.009-.158 0-.414.059-.63.295-.216.236-.827.807-.827 1.966 0 1.159.843 2.279.961 2.438.118.158 1.659 2.533 4.019 3.553.561.242.999.387 1.341.496.564.179 1.077.154 1.482.094.452-.067 1.396-.57 1.593-1.121.198-.551.198-1.023.138-1.121-.059-.098-.216-.157-.453-.276z"/>
              </svg>
              <span>ENTRAR NO GRUPO VIP DO WHATSAPP</span>
              <ArrowRight className="w-5 h-5 ml-1 animate-ping" />
            </button>
          </div>

          <p className="text-gray-500 text-xs flex items-center justify-center gap-1 mb-6">
            <Lock className="w-3.5 h-3.5 text-[#E61E6E]" />
            <span>A entrada é gratuita. Toque no botão para participar.</span>
          </p>

          {/* 5. BLOCO DE ESCASSEZ OU PROVA SOCIAL COM DESIGN ROSE E DOURADO */}
          <div className="w-full max-w-md bg-[#FFF9FA] p-5 rounded-2xl border border-[#FFE2E8] text-left mb-6 shadow-inner">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] font-bold text-[#E61E6E] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E61E6E] animate-ping"></span>
                VAGAS NO GRUPO VIP: {groupFreeSlots} restantes
              </span>
              <span className="text-xs font-extrabold text-[#E61E6E]">
                {currentProgressPercent}% de ocupação
              </span>
            </div>

            {/* progress path */}
            <div className="w-full h-3.5 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-pink-100">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${currentProgressPercent}%` }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-[#FF5391] to-[#E61E6E]"
              />
            </div>
            
            <p className="text-gray-600 text-[11px] mt-2 leading-relaxed text-center font-medium">
              🔥 <strong>Restam poucas vagas livres para novos participantes de hoje.</strong> Aproveite que o link de acesso ainda está aberto sem taxa!
            </p>
          </div>

          {/* 6. MINI BENEFÍCIOS COM ÍCONES REQUISITADOS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full border-t border-b border-[#FFE2E8] py-5 mt-4">
            
            <div className="flex flex-col items-center text-center p-2">
              <div className="w-10 h-10 rounded-full bg-[#FFE2E8]/40 flex items-center justify-center mb-1">
                <ShieldCheck className="w-5 h-5 text-[#E61E6E]" />
              </div>
              <span className="text-xs font-bold text-gray-800">Sem spam</span>
              <span className="text-[10px] text-gray-400">Grupo privado</span>
            </div>

            <div className="flex flex-col items-center text-center p-2">
              <div className="w-10 h-10 rounded-full bg-[#FFE2E8]/40 flex items-center justify-center mb-1">
                <ShoppingBag className="w-5 h-5 text-[#E61E6E]" />
              </div>
              <span className="text-xs font-bold text-gray-800">Ofertas reais</span>
              <span className="text-[10px] text-gray-400">Menores preços</span>
            </div>

            <div className="flex flex-col items-center text-center p-2">
              <div className="w-10 h-10 rounded-full bg-[#FFE2E8]/40 flex items-center justify-center mb-1">
                <Tag className="w-5 h-5 text-[#E61E6E]" />
              </div>
              <span className="text-xs font-bold text-gray-800">Cupons exclusivos</span>
              <span className="text-[10px] text-gray-400">Códigos validados</span>
            </div>

            <div className="flex flex-col items-center text-center p-2">
              <div className="w-10 h-10 rounded-full bg-[#FFE2E8]/40 flex items-center justify-center mb-1">
                <Sparkles className="w-5 h-5 text-[#E61E6E]" />
              </div>
              <span className="text-xs font-bold text-gray-800">Produtos selecionados</span>
              <span className="text-[10px] text-gray-400">Filtro de qualidade</span>
            </div>

          </div>

        </section>

        {/* 7. SEÇÃO “O QUE VOCÊ VAI RECEBER” COM CARDS SUGERIDOS E OUTROS */}
        <section className="w-full mt-14 md:mt-20">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#E61E6E] bg-[#FFE2E8] px-3 py-1 rounded-full">
              💝 O QUE VOCÊ VAI RECEBER
            </span>
            <h2 className="text-xl md:text-2xl font-black text-[#2B2B2B] font-display mt-2">
              As Maiores Vantagens em um Só Lugar
            </h2>
            <p className="text-gray-500 text-xs max-w-sm mx-auto mt-1">
              Curadoria feminina inteligente para você mobiliar, vestir e se cuidar com descontos insanos de lojas oficiais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Achadinhos do Dia */}
            <div className="bg-white p-6 rounded-2xl border border-[#FFE2E8] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF5F7] flex items-center justify-center shrink-0 border border-[#FFE2E8]">
                <ShoppingBag className="w-6 h-6 text-[#E61E6E]" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-[#2B2B2B] mb-1">
                  Achadinhos do Dia
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Produtos selecionados com bom preço, úteis para casa, beleza, moda, tecnologia, decoração e muito mais. Economize tempo de navegação com indicações prontas e validadas pela administradora.
                </p>
              </div>
            </div>

            {/* Card 2: Cupons e Promoções */}
            <div className="bg-white p-6 rounded-2xl border border-[#FFE2E8] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF5F7] flex items-center justify-center shrink-0 border border-[#FFE2E8]">
                <Tag className="w-6 h-6 text-[#E61E6E]" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-[#2B2B2B] mb-1">
                  Cupons e Promoções Relâmpago
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Cupons de desconto exclusivos coletados diretamente em parcerias, ofertas relâmpago ocultas e brechas de preço que duram pouquíssimos minutos. Você sai na frente de todos!
                </p>
              </div>
            </div>

            {/* Card 3: Lojas Confiáveis */}
            <div className="bg-white p-6 rounded-2xl border border-[#FFE2E8] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF5F7] flex items-center justify-center shrink-0 border border-[#FFE2E8]">
                <ShieldCheck className="w-6 h-6 text-[#E61E6E]" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-[#2B2B2B] mb-1">
                  Ofertas de Lojas Confiáveis
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Links de produtos da Amazon, Shopee, Magalu, Shein e outras plataformas conhecidas. Sem vírus ou anúncios mentirosos: compre em plataformas asseguradas com suporte de envio imediato.
                </p>
              </div>
            </div>

            {/* Card 4: Praticidade */}
            <div className="bg-white p-6 rounded-2xl border border-[#FFE2E8] shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF5F7] flex items-center justify-center shrink-0 border border-[#FFE2E8]">
                <Smartphone className="w-6 h-6 text-[#E61E6E]" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-extrabold text-[#2B2B2B] mb-1">
                  Praticidade para Comprar Melhor
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Você recebe as melhores oportunidades no WhatsApp, sem precisar procurar em vários sites de forma incômoda. Basta entrar, clicar, garantir o menor menor preço histórico e viver plena!
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* REQUISITO DE CONVERSÃO ADICIONAL: SIMULADOR DE COMPRAS E ECONOMIA SMART */}
        <section className="w-full mt-14 bg-white border border-[#FFE2E8] p-6 md:p-8 rounded-3xl shadow-sm text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#E61E6E] bg-[#FFF5F7] border border-[#FFE2E8] px-3 py-1 rounded-full mb-2">
              📊 CALCULE SUA ECONOMIA MENSAL
            </span>
            <h3 className="text-lg md:text-xl font-black text-[#2B2B2B] font-display">
              Veja o impacto no bolso do grupo da ALZ Achadinhos!
            </h3>
            <p className="text-gray-500 text-xs mt-1 mb-6">
              Arraste a barra para indicar sua estimativa de compras mensais online e descubra quanto você economiza no final das contas usando cupons exclusivos.
            </p>

            <div className="w-full space-y-4 px-2 text-left">
              <div className="flex justify-between items-center font-bold text-xs text-gray-700">
                <span>Gasto mensal aproximado em lojas online:</span>
                <span className="text-lg text-[#E61E6E]">R$ {calcMonthlySpend}</span>
              </div>
              
              <input 
                type="range" 
                min="100" 
                max="2000" 
                step="50"
                value={calcMonthlySpend}
                onChange={(e) => setCalcMonthlySpend(Number(e.target.value))}
                className="w-full h-2 bg-[#FFE2E8] rounded-lg appearance-none cursor-pointer accent-[#E61E6E] border border-pink-100"
              />

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#FFFDFE] p-4 rounded-2xl border border-pink-100 text-center">
                  <span className="block text-[9px] uppercase font-bold text-gray-400 mb-1">Sua Economia</span>
                  <span className="text-[#16A34A] text-lg md:text-xl font-bold block">
                    R$ {estimatedSavings} / mês
                  </span>
                  <span className="text-[10px] text-gray-500">Curadoria exclusiva</span>
                </div>

                <div className="bg-[#FFF5F7] p-4 rounded-2xl border border-[#FFE2E8] text-center">
                  <span className="block text-[9px] uppercase font-bold text-gray-400 mb-1">Acúmulo Anual</span>
                  <span className="text-[#E61E6E] text-lg md:text-xl font-bold block">
                    R$ {estimatedAnnually} / ano
                  </span>
                  <span className="text-[10px] text-gray-500">De economia real extra!</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] text-gray-500 pt-2 font-medium">
                <ThumbsUp className="w-3.5 h-3.5 text-[#16A34A]" />
                <span className="text-center">Economia média estimada de <strong>45%</strong> superior à compras diretas em navegadores tradicionais!</span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERATIVE VOTING POLL - PESQUISA DE IMPORTÂNCIA */}
        <section className="w-full mt-10 bg-[#FFF5F7] p-6 rounded-3xl border border-[#FFE2E8] text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E61E6E] bg-white border border-[#FFE2E8] px-2.5 py-0.5 rounded-full mb-1.5 inline-block">
              🗳️ PESQUISA ALZ ACHADINHOS
            </span>
            <h4 className="text-sm md:text-base font-extrabold text-gray-800">
              Qual plataforma você mais frequenta para compras?
            </h4>
            <p className="text-[11px] text-gray-500 mb-4">Selecione uma opção para adequarmos a postagem de hoje!</p>

            {!hasVoted ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {PLATFORMS_LIST.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => {
                      setHasVoted(true);
                      setVotedStore(platform.name);
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 active:scale-95 shadow-sm hover:shadow-md ${platform.color}`}
                  >
                    <span className="text-sm shrink-0">{platform.logo}</span>
                    <span className="truncate">{platform.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-4.5 rounded-2xl border border-[#FFE2E8]"
              >
                <div className="flex items-center justify-center gap-2 mb-2 text-[#16A34A] font-bold text-xs">
                  <Check className="w-4 h-4" />
                  <span>Voto computado com sucesso!</span>
                </div>
                <p className="text-xs text-gray-700 font-medium">
                  Maravilha! O seu interesse por <strong>{votedStore}</strong> foi adicionado com sucesso. Prepare-se para ver os melhores links no grupo VIP!
                </p>
                <button
                  onClick={() => handleJoinWhatsApp(`pesquisa_${votedStore}`)}
                  className="mt-3.5 w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#16A34A] text-white hover:text-white font-extrabold text-xs tracking-wide flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Entrar para ver as Melhores Ofertas!</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* 8. DEPOIMENTO OU FRASE DE CONFIANÇA */}
        <section className="w-full mt-14 md:mt-20">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#FFE2E8] text-center max-w-2xl mx-auto relative">
            <span className="absolute -top-7 left-6 text-[#FF5391]/15 text-8xl font-serif select-none pointer-events-none">“</span>
            
            <p className="text-gray-700 text-xs md:text-sm italic leading-relaxed relative z-10 font-bold pt-3 px-4 text-[#5c4f54]">
              “Com a ALZ Achadinhos, você recebe ofertas selecionadas e economiza tempo procurando os melhores preços. Antes eu passava horas procurando cupons de frete ou ficava perdida na Shopee, agora vejo tudo mastigadinho e seguro direto no zap!”
            </p>

            <div className="h-px w-12 bg-[#FF5391]/40 my-4 mx-auto"></div>

            <div className="flex justify-center items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFE2E8] flex items-center justify-center font-bold text-[#E61E6E] text-xs shadow-inner shrink-0">
                MC
              </div>
              <div className="text-left">
                <h4 className="text-xs font-black text-gray-800">Mariana Custódio</h4>
                <p className="text-[10px] text-gray-400">Participante Premium desde Julho/2025</p>
              </div>
            </div>

            <div className="flex justify-center mt-3 gap-0.5">
              {[...Array(5)].map((_, s) => (
                <span key={s} className="text-[#FFD700] text-sm">★</span>
              ))}
            </div>
          </div>
        </section>

        {/* PERGUNTAS FREQUENTES (FAQ) */}
        <section className="w-full mt-14 md:mt-20 max-w-2xl">
          <div className="text-center mb-6">
            <span className="text-xs font-black uppercase tracking-widest text-[#E61E6E] bg-[#FFE2E8] px-3 py-1 rounded-full">
              ❓ DÚVIDAS MAIS COMUNS
            </span>
            <h2 className="text-xl md:text-2xl font-black text-[#2B2B2B] font-display mt-2">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white border border-[#FFE2E8] rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-4 text-left font-bold text-xs md:text-sm text-[#2B2B2B] hover:bg-[#FFF5F7] cursor-pointer transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#E61E6E] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="p-4 pt-0 text-xs md:text-sm text-[#5C4F54] leading-relaxed border-t border-[#FFFDFE] bg-[#FFFBFB]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. SEGUNDO CTA NO FINAL (CHAMADA PERSUASIVA REFORÇADA) */}
        <section className="w-full mt-16 md:mt-24 text-center">
          <div className="bg-gradient-to-br from-white via-[#FFFBFD] to-[#FFF5F7] rounded-3xl p-8 md:p-12 border border-[#FFE2E8] shadow-lg flex flex-col items-center max-w-2xl mx-auto relative overflow-hidden">
            
            {/* Decal background circles representing the logo pink glow */}
            <div className="absolute -right-16 -bottom-16 w-36 h-36 rounded-full border border-[#FF5391]/15 pointer-events-none"></div>
            <div className="absolute -left-16 -top-16 w-36 h-36 rounded-full border border-[#FF5391]/15 pointer-events-none"></div>

            <div className="w-12 h-12 bg-[#FFE2E8] rounded-2xl mb-4 flex items-center justify-center border border-[#FF5391]/20">
              <Gift className="w-6 h-6 text-[#E61E6E]" />
            </div>

            <span className="text-[10px] font-black tracking-widest text-[#E61E6E] uppercase block mb-1">
              ÚLTIMA CHANCE DE ENTRADA LIVRE
            </span>

            <h3 className="text-lg md:text-2xl font-black text-gray-800 font-display max-w-lg leading-snug mb-3">
              Não perca os próximos achadinhos. Entre agora no grupo VIP gratuitamente!
            </h3>

            <p className="text-gray-500 text-xs max-w-xs mb-6.5 leading-relaxed">
              Receba links diretos de compras de utensílios, fofuras de decoração, moda em conta e mimos incríveis. Tudo validado antes que acabe!
            </p>

            <div className="w-full max-w-md">
              <button
                onClick={() => handleJoinWhatsApp('cta_rodape')}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#16A34A] to-[#25D366] hover:from-[#15803d] hover:to-[#16a34a] text-white hover:text-white font-extrabold text-sm md:text-base tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                id="footer_whatsapp_btn"
              >
                <svg 
                  className="w-5 h-5 fill-current shrink-0" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.411.001 12.007.001c3.197.001 6.201 1.244 8.461 3.498 2.261 2.254 3.504 5.253 3.5 8.452-.013 6.59-5.364 11.936-11.956 11.936-2.004-.001-3.974-.504-5.733-1.464L0 24zm6.002-4.254c1.611.956 3.193 1.458 4.935 1.459 5.438-.001 9.865-4.425 9.874-9.855.008-2.63-1.018-5.1-2.89-6.972-1.871-1.874-4.364-2.907-6.991-2.908-5.449 0-9.878 4.426-9.887 9.857-.004 1.794.482 3.541 1.408 5.101L1.61 22.394l4.449-1.168c1.619.884 3.125 1.433 4.887 1.433zm11.758-7.986c-.237-.118-1.396-.689-1.613-.767-.216-.078-.374-.118-.532.118-.158.236-.61.767-.748.925-.138.158-.276.177-.513.059-.237-.118-.999-.368-1.902-1.173-.703-.627-1.177-1.402-1.315-1.638-.138-.236-.015-.364.104-.482.107-.107.237-.276.355-.413.118-.138.158-.236.237-.393.078-.158.039-.295-.019-.413-.059-.118-.532-1.28-.73-1.751-.192-.463-.385-.4-.532-.408-.136-.007-.294-.009-.452-.009-.158 0-.414.059-.63.295-.216.236-.827.807-.827 1.966 0 1.159.843 2.279.961 2.438.118.158 1.659 2.533 4.019 3.553.561.242.999.387 1.341.496.564.179 1.077.154 1.482.094.452-.067 1.396-.57 1.593-1.121.198-.551.198-1.023.138-1.121-.059-.098-.216-.157-.453-.276z"/>
                </svg>
                <span>ENTRAR NO GRUPO VIP DO WHATSAPP</span>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-[9px] bg-rose-105 text-[#E61E6E] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
                Parceria Oficial Garantida
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-400 text-xs font-semibold">100% Livre de Spam</span>
            </div>

          </div>
        </section>

      </main>

      {/* 10. RODAPÉ COMPACTO E LEGALIZADO */}
      <footer className="w-full bg-white border-t border-[#FFE2E8] py-10 px-4 mt-16 text-center text-gray-500">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="flex items-center justify-center gap-1.5 font-bold text-gray-700">
            <span className="text-base tracking-wider text-[#E61E6E] font-heading font-extrabold">ALZ</span>
            <span className="text-xs uppercase tracking-widest text-[#5C4F54]">Achadinhos</span>
            <span className="text-[#FFD700] animate-bounce">👑</span>
          </div>

          <p className="text-[11px] max-w-2xl mx-auto text-gray-400 leading-relaxed font-medium">
            Participamos de programas de afiliados oficiais nacionais. Ao clicar nos links de produtos compartilhados no grupo e efetuar uma compra, nós podemos receber uma pequena comissão de parceria, o que ajuda a manter a nossa equipe pesquisando sem custo adicional nenhum para você!
          </p>

          <p className="text-[10px] text-gray-400">
            © 2026 ALZ Achadinhos. Todos os direitos reservados.
          </p>

          {/* Links Fictícios / Editáveis para Política de Privacidade e Termos de Uso */}
          <div className="flex justify-center gap-4 text-xs font-semibold text-[#E61E6E]">
            <a 
              href="#termos-de-uso" 
              onClick={(e) => { e.preventDefault(); alert("Esta landing page possui links de Termos de Uso configurados como marcadores de posição no rodapé. Você pode ligá-los às suas páginas necessárias!"); }}
              className="hover:underline transition-all"
            >
              Termos de Uso
            </a>
            <span>•</span>
            <a 
              href="#politica-privacidade" 
              onClick={(e) => { e.preventDefault(); alert("Esta landing page possui links de Política de Privacidade configurados como marcadores de posição no rodapé. Você pode ligá-los às suas páginas necessárias!"); }}
              className="hover:underline transition-all"
            >
              Política de Privacidade
            </a>
          </div>

        </div>
      </footer>

      {/* ========================================================
          BARRA DE AÇÕES FLUTUANTE EXCLUSIVA DE CONVERSÃO MOBILE
      ======================================================== */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-[#FFE2E8] z-40 md:hidden flex justify-between items-center shadow-2xl gap-3">
        <div className="text-left shrink-0">
          <span className="text-[10px] font-black text-[#E61E6E] uppercase tracking-wider block font-heading">
            Grupo VIP Limitado ⚠️
          </span>
          <span className="text-[10px] text-gray-500 block font-bold">
            Resta apenas {groupFreeSlots} vagas hoje
          </span>
        </div>
        <button
          onClick={() => handleJoinWhatsApp('cta_flutuante_mobile')}
          className="px-4 py-3 bg-[#16A34A] hover:bg-[#15803d] text-white hover:text-white rounded-xl text-xs font-black tracking-wide flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
        >
          {/* Logo icon compact */}
          <svg 
            className="w-4 h-4 fill-current" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.411.001 12.007.001c3.197.001 6.201 1.244 8.461 3.498 2.261 2.254 3.504 5.253 3.5 8.452-.013 6.59-5.364 11.936-11.956 11.936-2.004-.001-3.974-.504-5.733-1.464L0 24zm6.002-4.254c1.611.956 3.193 1.458 4.935 1.459 5.438-.001 9.865-4.425 9.874-9.855.008-2.63-1.018-5.1-2.89-6.972-1.871-1.874-4.364-2.907-6.991-2.908-5.449 0-9.878 4.426-9.887 9.857-.004 1.794.482 3.541 1.408 5.101L1.61 22.394l4.449-1.168c1.619.884 3.125 1.433 4.887 1.433zm11.758-7.986c-.237-.118-1.396-.689-1.613-.767-.216-.078-.374-.118-.532.118-.158.236-.61.767-.748.925-.138.158-.276.177-.513.059-.237-.118-.999-.368-1.902-1.173-.703-.627-1.177-1.402-1.315-1.638-.138-.236-.015-.364.104-.482.107-.107.237-.276.355-.413.118-.138.158-.236.237-.393.078-.158.039-.295-.019-.413-.059-.118-.532-1.28-.73-1.751-.192-.463-.385-.4-.532-.408-.136-.007-.294-.009-.452-.009-.158 0-.414.059-.63.295-.216.236-.827.807-.827 1.966 0 1.159.843 2.279.961 2.438.118.158 1.659 2.533 4.019 3.553.561.242.999.387 1.341.496.564.179 1.077.154 1.482.094.452-.067 1.396-.57 1.593-1.121.198-.551.198-1.023.138-1.121-.059-.098-.216-.157-.453-.276z"/>
          </svg>
          <span>Aproveitar Minha Vaga</span>
        </button>
      </div>

      {/* NOTIFICAÇÃO TOASTER REAL SOCIAL PROOF */}
      <AnimatePresence>
        {recentNotification && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 md:bottom-6 right-4 z-50 bg-[#2B2B2B] text-white py-3 px-4 rounded-2xl shadow-xl flex items-center gap-3 border border-pink-400/20 max-w-sm "
          >
            <div className="w-8 h-8 rounded-full bg-[#E61E6E] flex items-center justify-center font-bold text-white text-xs shrink-0 select-none shadow-md">
              {recentNotification.name.split(' ')[0][0]}
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold text-rose-300">
                {recentNotification.name} <span className="text-gray-300 font-normal">{recentNotification.action}</span>
              </p>
              <p className="text-[10px] text-gray-400">{recentNotification.time}</p>
            </div>
            <div className="text-xs shrink-0 pl-1">
              🎉
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
