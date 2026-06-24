// Configuração Inicial do Supabase para Sites Estáticos
// Importante: Substitua as chaves abaixo pelas chaves reais do seu painel do Supabase.

const _SUPABASE_URL = 'sua_url_do_supabase_aqui';
const _SUPABASE_ANON_KEY = 'sua_chave_anon_do_supabase_aqui';

// Inicializa o cliente do Supabase
// A variável 'supabase' foi carregada pelo script CDN no index.html
const supabaseClient = supabase.createClient(_SUPABASE_URL, _SUPABASE_ANON_KEY);

console.log('Supabase configurado com sucesso e pronto para uso!');
