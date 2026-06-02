<template>
    <div class="layout-shell">
        <header class="hero-card">
            <div class="hero-top">
                <div class="hero-copy">
                    <p class="eyebrow">Cadastro de EPIs</p>
                    <h1>{{ editandoId ? 'Editar equipamento' : 'Catálogo de EPIs' }}</h1>
                    <p class="hero-text">Controle C.A., fabricante, vencimento e quantidade em um fluxo visual mais claro e objetivo.</p>
                </div>
                <div class="hero-metrics">
                    <article class="metric-card">
                        <i class="ti ti-shield metric-icon" aria-hidden="true"></i>
                        <span class="metric-label">Itens cadastrados</span>
                        <strong>{{ epis.length }}</strong>
                    </article>
                    <article class="metric-card accent-warning">
                        <i class="ti ti-alert-triangle metric-icon" aria-hidden="true"></i>
                        <span class="metric-label">Estoque baixo</span>
                        <strong>{{ quantidadeBaixa }}</strong>
                    </article>
                    <article class="metric-card accent-success">
                        <i class="ti ti-circle-check metric-icon" aria-hidden="true"></i>
                        <span class="metric-label">Estoque ok</span>
                        <strong>{{ quantidadeOk }}</strong>
                    </article>
                </div>
            </div>
        </header>

        <main class="content-grid">
            <section class="card-form">
                <div class="section-header">
                    <div class="section-title-group">
                        <i class="ti ti-shield-plus header-icon" aria-hidden="true"></i>
                        <div>
                            <p class="card-kicker">Registro</p>
                            <h3>{{ editandoId ? 'Editar equipamento' : 'Novo equipamento' }}</h3>
                        </div>
                    </div>
                    <span v-if="editandoId" class="badge-editing">Em edição</span>
                </div>

                <form @submit.prevent="salvar" class="main-form">
                    <div class="form-row">
                        <div class="form-group span-2">
                            <label>Nome do EPI</label>
                            <input v-model="form.nome" type="text" placeholder="Ex: Capacete de Segurança" required class="input-field">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Número do C.A.</label>
                            <input v-model="form.numero_ca" type="text" placeholder="Ex: CA12345" required class="input-field">
                        </div>
                        <div class="form-group">
                            <label>Estoque</label>
                            <input v-model="form.estoque" type="number" min="0" step="1" placeholder="Ex: 25" required class="input-field">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Tipo / Proteção</label>
                            <input v-model="form.tipo" type="text" placeholder="Ex: Proteção da cabeça" class="input-field">
                        </div>
                        <div class="form-group">
                            <label>Fabricante</label>
                            <input v-model="form.fabricante" type="text" placeholder="Ex: 3M" class="input-field">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Data de validade</label>
                            <input v-model="form.dt_validade" type="date" required class="input-field">
                        </div>
                        <div class="form-group">
                            <label>Periodicidade (meses)</label>
                            <input v-model="form.periodicidade_meses" type="number" min="1" step="1" placeholder="Ex: 12" class="input-field">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group span-2">
                            <label>URL da foto <span class="label-optional">(opcional)</span></label>
                            <input v-model="form.foto" type="text" placeholder="https://..." class="input-field">
                        </div>
                    </div>

                    <p v-if="message" class="form-feedback" :class="messageType">
                        <i class="ti" :class="messageType === 'success' ? 'ti-circle-check' : 'ti-alert-circle'"></i>
                        {{ message }}
                    </p>

                    <div class="action-bar">
                        <button type="submit" class="btn btn-primary" :disabled="loading">
                            <i class="ti ti-send" aria-hidden="true"></i>
                            {{ loading ? 'Salvando...' : (editandoId ? 'Salvar alterações' : 'Cadastrar EPI') }}
                        </button>
                        <button type="button" class="btn btn-outline" @click="cancelarEdicao">
                            <i class="ti" :class="editandoId ? 'ti-x' : 'ti-eraser'" aria-hidden="true"></i>
                            {{ editandoId ? 'Cancelar' : 'Limpar' }}
                        </button>
                    </div>
                </form>
            </section>

            <section class="card-table">
                <div class="section-header">
                    <div class="section-title-group">
                        <i class="ti ti-list-details header-icon" aria-hidden="true"></i>
                        <div>
                            <p class="card-kicker">Lista</p>
                            <h3>EPIs cadastrados</h3>
                        </div>
                    </div>
                    <span class="table-count">{{ epis.length }} registros</span>
                </div>

                <div class="table-wrap">
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Equipamento</th>
                                <th>C.A.</th>
                                <th>Tipo</th>
                                <th>Validade</th>
                                <th>Periodicidade</th>
                                <th>Estoque</th>
                                <th class="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="epis.length === 0">
                                <td colspan="7" class="empty-state">
                                    <i class="ti ti-shield-off empty-icon"></i>
                                    <span>Nenhum EPI cadastrado ainda.</span>
                                </td>
                            </tr>
                            <tr v-for="e in epis" :key="e.id_epi">
                                <td>
                                    <div class="text-bold">{{ e.nome }}</div>
                                    <div class="text-muted small">{{ e.fabricante || 'Fabricante não informado' }}</div>
                                </td>
                                <td><span class="badge-ca">{{ e.numero_ca }}</span></td>
                                <td class="text-muted">{{ e.tipo || '—' }}</td>
                                <td class="text-muted">{{ formatarData(e.dt_validade) }}</td>
                                <td class="text-muted">{{ e.periodicidade_meses ? `${e.periodicidade_meses} meses` : '—' }}</td>
                                <td>
                                    <span :class="['badge-estoque', classeEstoque(e.estoque)]">
                                        <span class="stock-dot"></span>
                                        {{ e.estoque ?? 0 }} · {{ rotuloEstoque(e.estoque) }}
                                    </span>
                                </td>
                                <td class="text-center">
                                    <div class="row-actions">
                                        <button @click="prepararEdicao(e)" class="btn-icon edit" title="Editar">
                                            <i class="ti ti-pencil"></i>
                                        </button>
                                        <button @click="excluir(e.id_epi)" class="btn-icon delete" title="Excluir">
                                            <i class="ti ti-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase.js'

const { supabase } = useSupabase()

const epis = ref([])
const editandoId = ref(null)
const loading = ref(false)
const message = ref('')
const messageType = ref('')
const quantidadeBaixa = ref(0)
const quantidadeOk = ref(0)

const form = reactive({
    nome: '',
    numero_ca: '',
    tipo: '',
    fabricante: '',
    dt_validade: '',
    periodicidade_meses: '',
    estoque: '',
    foto: ''
})

function limparForm() {
    Object.assign(form, {
        nome: '', numero_ca: '', tipo: '', fabricante: '',
        dt_validade: '', periodicidade_meses: '', estoque: '', foto: ''
    })
    message.value = ''
    messageType.value = ''
}

function cancelarEdicao() {
    editandoId.value = null
    limparForm()
}

function prepararEdicao(e) {
    editandoId.value = e.id_epi
    Object.assign(form, {
        nome: e.nome || '',
        numero_ca: e.numero_ca || '',
        tipo: e.tipo || '',
        fabricante: e.fabricante || '',
        dt_validade: e.dt_validade || '',
        periodicidade_meses: e.periodicidade_meses ?? '',
        estoque: e.estoque ?? 0,
        foto: e.photo || ''
    })
    message.value = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function formatarData(valor) {
    if (!valor) return '—'
    const d = new Date(valor)
    return Number.isNaN(d.getTime()) ? valor : d.toLocaleDateString('pt-BR')
}

function rotuloEstoque(valor) {
    const n = Number(valor) || 0
    if (n < 10) return 'Baixo'
    if (n <= 50) return 'Médio'
    return 'OK'
}

function classeEstoque(valor) {
    const n = Number(valor) || 0
    if (n < 10) return 'baixo'
    if (n <= 50) return 'medio'
    return 'ok'
}

async function carregar() {
    const { data, error } = await supabase.from('epi').select('*').order('nome')
    if (error) { message.value = 'Não foi possível carregar os EPIs.'; messageType.value = 'error'; return }
    epis.value = data || []
    quantidadeBaixa.value = epis.value.filter(i => classeEstoque(i.estoque) === 'baixo').length
    quantidadeOk.value = epis.value.filter(i => classeEstoque(i.estoque) === 'ok').length
}

async function salvar() {
    loading.value = true
    message.value = ''

    const payload = {
        nome: form.nome.trim(),
        numero_ca: form.numero_ca.trim(),
        tipo: form.tipo.trim() || null,
        fabricante: form.fabricante.trim() || null,
        dt_validade: form.dt_validade,
        periodicidade_meses: form.periodicidade_meses === '' ? null : Number(form.periodicidade_meses),
        estoque: Number(form.estoque),
        photo: form.foto.trim() || null
    }

    if (editandoId.value) {
        const { error } = await supabase.from('epi').update(payload).eq('id_epi', editandoId.value)
        loading.value = false
        if (error) { message.value = `Não foi possível atualizar. (${error.message})`; messageType.value = 'error'; return }
        message.value = 'EPI atualizado com sucesso.'
        messageType.value = 'success'
        await carregar()
        cancelarEdicao()
        return
    }

    const { error } = await supabase.from('epi').insert([payload])
    loading.value = false
    if (error) { message.value = `Não foi possível cadastrar. (${error.message})`; messageType.value = 'error'; return }
    message.value = 'EPI cadastrado com sucesso.'
    messageType.value = 'success'
    limparForm()
    await carregar()
}

async function excluir(id) {
    if (!confirm('Deseja excluir este equipamento?')) return
    const { error } = await supabase.from('epi').delete().eq('id_epi', id)
    if (error) { message.value = `Não foi possível excluir. (${error.message})`; messageType.value = 'error'; return }
    message.value = 'EPI excluído com sucesso.'
    messageType.value = 'success'
    await carregar()
}

onMounted(carregar)
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

* {
    box-sizing: border-box;
}

.layout-shell {
    width: 92%;
    max-width: 62rem;
    margin: 2rem auto 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    font-family: 'Inter', system-ui, sans-serif;
}

/* ── Hero ── */
.hero-card {
    padding: 1.75rem;
    border-radius: 1.5rem;
    background: linear-gradient(135deg, #0d2f47 0%, #1a5a8a 100%);
    box-shadow: 0 20px 48px rgba(10, 30, 55, 0.22);
    color: #fff;
}

.hero-top {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: space-between;
    align-items: flex-start;
}

.eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 0.72rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.5);
    margin: 0 0 0.5rem;
}

.hero-card h1 {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800;
    line-height: 1.1;
    margin: 0 0 0.5rem;
    color: #fff;
}

.hero-text {
    color: rgba(255, 255, 255, 0.62);
    font-size: 0.93rem;
    line-height: 1.6;
    margin: 0;
    max-width: 36rem;
}

.hero-metrics {
    display: flex;
    gap: 0.8rem;
    flex-shrink: 0;
}

.metric-card {
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    min-width: 9rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.metric-card.accent-warning {
    background: rgba(255, 200, 80, 0.15);
    border-color: rgba(255, 200, 80, 0.25);
}

.metric-card.accent-success {
    background: rgba(80, 220, 140, 0.15);
    border-color: rgba(80, 220, 140, 0.25);
}

.metric-icon {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.1rem;
}

.metric-label {
    font-size: 0.74rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.58);
    line-height: 1.3;
}

.metric-card strong {
    font-size: 2rem;
    font-weight: 800;
    color: #fff;
    line-height: 1;
}

/* ── Content grid ── */
.content-grid {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

/* ── Cards ── */
.card-form,
.card-table {
    border-radius: 1.25rem;
    border: 1px solid rgba(18, 55, 82, 0.09);
    background: #fff;
    box-shadow: 0 4px 20px rgba(10, 30, 55, 0.07);
    overflow: hidden;
}

/* ── Section header ── */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(18, 55, 82, 0.07);
    background: #fafbfc;
}

.section-title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.header-icon {
    font-size: 1.25rem;
    color: #1a6fa8;
    flex-shrink: 0;
}

.card-kicker {
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.68rem;
    font-weight: 700;
    color: #1a6fa8;
    margin: 0 0 0.15rem;
}

.section-header h3 {
    font-size: 0.97rem;
    font-weight: 700;
    color: #0f2a3f;
    margin: 0;
}

.badge-editing {
    font-size: 0.73rem;
    font-weight: 700;
    color: #a86d00;
    background: #fff4d6;
    border: 1px solid #f0d080;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
}

.table-count {
    font-size: 0.78rem;
    font-weight: 700;
    color: #1a6fa8;
    background: rgba(26, 111, 168, 0.1);
    padding: 0.35rem 0.8rem;
    border-radius: 999px;
}

/* ── Form ── */
.main-form {
    padding: 1.25rem;
}

.form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-group {
    flex: 1 1 16rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.span-2 {
    flex: 1 1 100%;
}

label {
    font-size: 0.73rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #4a647b;
    text-transform: uppercase;
}

.label-optional {
    text-transform: none;
    font-weight: 500;
    color: #8aa0b1;
    font-size: 0.7rem;
    letter-spacing: 0;
}

.input-field {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid #dce8f0;
    border-radius: 0.75rem;
    background: #fff;
    color: #0f2a3f;
    font-family: inherit;
    font-size: 0.92rem;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
    appearance: auto;
    height: 2.85rem;
}

.input-field:focus {
    border-color: #1a6fa8;
    box-shadow: 0 0 0 3px rgba(26, 111, 168, 0.12);
}

.input-field::placeholder {
    color: #9ab0c0;
}

/* ── Feedback ── */
.form-feedback {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.88rem;
    font-weight: 600;
}

.form-feedback.error {
    background: #fff1f0;
    color: #9a2a2a;
    border: 1px solid #f5c6c6;
}

.form-feedback.success {
    background: #f0faf4;
    color: #1a6e3f;
    border: 1px solid #c2e8cf;
}

/* ── Action bar ── */
.action-bar {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 2.75rem;
    padding: 0.7rem 1.4rem;
    border-radius: 0.8rem;
    cursor: pointer;
    border: none;
    font-weight: 700;
    font-size: 0.9rem;
    font-family: inherit;
    transition: transform 0.15s, filter 0.15s;
}

.btn:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
}

.btn:active {
    transform: translateY(0);
}

.btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
}

.btn-primary {
    background: linear-gradient(135deg, #0d3a5e, #1a6fa8);
    color: #fff;
    box-shadow: 0 8px 20px rgba(13, 58, 94, 0.28);
    flex: 1;
}

.btn-outline {
    background: #f0f6fb;
    color: #2e5a7a;
    border: 1.5px solid #ccdde8;
}

/* ── Table ── */
.table-wrap {
    overflow-x: auto;
}

.styled-table {
    width: 100%;
    border-collapse: collapse;
}

.styled-table th {
    padding: 0.8rem 1rem;
    text-align: left;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #6d8394;
    text-transform: uppercase;
    border-bottom: 1px solid #e8eef4;
    white-space: nowrap;
    background: #fafbfc;
}

.styled-table td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid #f0f5f9;
    font-size: 0.88rem;
    color: #2e4a60;
    vertical-align: middle;
}

.styled-table tbody tr:last-child td {
    border-bottom: none;
}

.styled-table tbody tr:hover td {
    background: rgba(26, 111, 168, 0.03);
}

.text-bold {
    font-weight: 700;
    color: #0f2a3f;
}

.text-muted {
    color: #7a95a8;
}

.small {
    font-size: 0.8rem;
    margin-top: 0.15rem;
}

/* ── Badges ── */
.badge-ca {
    display: inline-flex;
    align-items: center;
    padding: 0.22rem 0.6rem;
    border-radius: 999px;
    background: #e8f3fb;
    color: #1a5a8a;
    font-size: 0.72rem;
    font-weight: 700;
}

.badge-estoque {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border-radius: 999px;
    padding: 0.28rem 0.65rem;
    font-weight: 700;
    font-size: 0.75rem;
    white-space: nowrap;
    border: 1px solid transparent;
}

.badge-estoque.baixo {
    background: #fff1f0;
    color: #9a2a2a;
    border-color: #f5c6c6;
}

.badge-estoque.medio {
    background: #fff8e6;
    color: #a86d00;
    border-color: #f0d080;
}

.badge-estoque.ok {
    background: #e0f4ec;
    color: #1a6e45;
    border-color: #b6e8cc;
}

.stock-dot {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 999px;
    background: currentColor;
    opacity: 0.9;
    flex-shrink: 0;
}

/* ── Row actions ── */
.row-actions {
    display: inline-flex;
    gap: 0.4rem;
    justify-content: center;
}

.btn-icon {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0.35rem 0.45rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    transition: background 0.15s, color 0.15s;
}

.btn-icon.edit {
    color: #1a6fa8;
}

.btn-icon.edit:hover {
    background: #e8f3fb;
    color: #0d3a5e;
}

.btn-icon.delete {
    color: #b54040;
}

.btn-icon.delete:hover {
    background: #fff0f0;
    color: #8a1f1f;
}

/* ── Empty state ── */
.empty-state {
    text-align: center;
    padding: 2.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #8aa0b1;
    font-size: 0.9rem;
}

.empty-icon {
    font-size: 2rem;
    opacity: 0.4;
}

.text-center {
    text-align: center;
}

/* ── Responsive ── */
@media (max-width: 760px) {
    .layout-shell {
        width: 96%;
        margin: 1rem auto 2rem;
    }

    .hero-top {
        flex-direction: column;
    }

    .hero-metrics {
        flex-direction: row;
        width: 100%;
    }

    .metric-card {
        flex: 1;
    }

    .form-row {
        flex-direction: column;
    }

    .form-group {
        flex: 1 1 100%;
    }

    .action-bar {
        flex-direction: column;
    }

    .btn-primary,
    .btn-outline {
        width: 100%;
        justify-content: center;
    }
}
</style>