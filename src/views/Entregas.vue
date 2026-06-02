<template>
    <div class="layout-shell">
        <header class="hero-card">
            <div class="hero-top">
                <div class="hero-copy">
                    <p class="eyebrow">Distribuição de EPIs</p>
                    <h1>Registro de entregas</h1>
                    <p class="hero-text">Registre saídas do estoque e acompanhe o histórico de distribuição.</p>
                </div>
                <div class="hero-metrics">
                    <article class="metric-card">
                        <i class="ti ti-package metric-icon" aria-hidden="true"></i>
                        <span class="metric-label">Total de entregas</span>
                        <strong>{{ entregas.length }}</strong>
                    </article>
                    <article class="metric-card accent">
                        <i class="ti ti-users metric-icon" aria-hidden="true"></i>
                        <span class="metric-label">Funcionários atendidos</span>
                        <strong>{{ funcionariosUnicos }}</strong>
                    </article>
                </div>
            </div>
        </header>

        <main class="content-grid">
            <section class="card-form">
                <div class="section-header">
                    <div class="section-title-group">
                        <i class="ti ti-plus-circle header-icon" aria-hidden="true"></i>
                        <div>
                            <p class="card-kicker">Nova saída</p>
                            <h3>Registrar entrega de EPI</h3>
                        </div>
                    </div>
                </div>

                <div class="main-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Funcionário</label>
                            <select v-model="form.id_funcionario" class="input-field">
                                <option value="">Selecione o funcionário...</option>
                                <option v-for="f in funcionarios" :key="f.id_funcionario || f.id"
                                    :value="f.id_funcionario || f.id">
                                    {{ f.nome }} — {{ f.cargo || f.setor || '' }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>EPI</label>
                            <select v-model="form.id_epi" class="input-field">
                                <option value="">Selecione o EPI...</option>
                                <option v-for="e in epis" :key="e.id_epi || e.id" :value="e.id_epi || e.id">
                                    {{ e.nome }} (Saldo: {{ estoqueMap[e.id_epi || e.id || e.epi_id] ?? e.estoque ?? 0
                                    }})
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Quantidade</label>
                            <input type="number" v-model.number="form.quantidade" min="1" class="input-field"
                                placeholder="Ex: 1">
                        </div>
                        <div class="form-group">
                            <label>Data de entrega</label>
                            <input type="date" v-model="form.data_entrega" class="input-field">
                        </div>
                        <div class="form-group checkbox-group">
                            <label class="label-check">
                                <input type="checkbox" v-model="form.assinatura_digital" class="check-input">
                                <span class="check-box"><i class="ti ti-check"></i></span>
                                Assinatura digital
                            </label>
                        </div>
                    </div>

                    <p v-if="erro" class="form-feedback error">
                        <i class="ti ti-alert-circle"></i> {{ erro }}
                    </p>
                    <p v-if="ok" class="form-feedback success">
                        <i class="ti ti-circle-check"></i> Entrega registrada com sucesso!
                    </p>

                    <div class="action-bar">
                        <button class="btn btn-primary" @click="registrar"
                            :disabled="!form.id_funcionario || !form.id_epi || loading">
                            <i class="ti ti-send" aria-hidden="true"></i>
                            Registrar entrega
                        </button>
                    </div>
                </div>
            </section>

            <section class="card-table">
                <div class="section-header">
                    <div class="section-title-group">
                        <i class="ti ti-list-details header-icon" aria-hidden="true"></i>
                        <div>
                            <p class="card-kicker">Histórico</p>
                            <h3>Entregas realizadas</h3>
                        </div>
                    </div>
                    <span class="table-count">{{ entregas.length }} registros</span>
                </div>

                <div v-if="loading" class="loading-state">
                    <i class="ti ti-loader-2 spin"></i>
                    Carregando dados...
                </div>

                <div v-else class="table-wrap">
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Funcionário</th>
                                <th>EPI</th>
                                <th>Qtd.</th>
                                <th>Data</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="!entregas.length">
                                <td colspan="5" class="empty-state">
                                    <i class="ti ti-inbox-off empty-icon"></i>
                                    <span>Nenhuma entrega registrada.</span>
                                </td>
                            </tr>
                            <tr v-for="e in entregas" :key="e.id_entrega || e.id">
                                <td>
                                    <div class="colaborador-cell">
                                        <div class="avatar-initials">{{ iniciais(getFuncionarioNome(e.id_funcionario))
                                            }}</div>
                                        <div>
                                            <div class="text-bold">{{ getFuncionarioNome(e.id_funcionario) }}</div>
                                            <div class="sub-text">{{ getFuncionarioCargo(e.id_funcionario) }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="text-bold">{{ getEpiNome(e.id_epi) }}</div>
                                    <div class="sub-text">CA: {{ getEpiCa(e.id_epi) }}</div>
                                </td>
                                <td><span class="badge-quantidade">{{ e.quantidade }}</span></td>
                                <td class="text-muted">{{ formatarData(e.data_entrega) }}</td>
                                <td>
                                    <span :class="e.assinatura_digital ? 'badge-status ok' : 'badge-status warn'">
                                        <i :class="e.assinatura_digital ? 'ti ti-circle-check' : 'ti ti-clock'"></i>
                                        {{ e.assinatura_digital ? 'Confirmada' : 'Pendente' }}
                                    </span>
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
import { ref, computed, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase.js'

const { supabase } = useSupabase()

const funcionarios = ref([])
const epis = ref([])
const entregas = ref([])
const estoqueMap = ref({})
const funcionarioMap = ref({})
const epiMap = ref({})
const loading = ref(true)
const erro = ref('')
const ok = ref(false)

const hoje = new Date().toISOString().slice(0, 10)
const form = ref({ id_funcionario: '', id_epi: '', quantidade: 1, data_entrega: hoje, assinatura_digital: false })

const funcionariosUnicos = computed(() => new Set(entregas.value.map(e => e.id_funcionario)).size)

async function carregar() {
    loading.value = true
    erro.value = ''
    try {
        const { data: funcs } = await supabase.from('funcionarios').select('*').order('nome')
        funcionarios.value = funcs || []
        funcionarioMap.value = Object.fromEntries((funcs || []).map(f => [f.id_funcionario, f]))

        const { data: epiData } = await supabase.from('epi').select('*').order('nome')
        epis.value = epiData || []
        epiMap.value = Object.fromEntries((epis.value).map(e => [(e.id_epi || e.id || e.epi_id), e]))
        estoqueMap.value = Object.fromEntries((epis.value).map(e => [(e.id_epi || e.id || e.epi_id), (e.estoque || 0)]))

        const { data: entData, error: entError } = await supabase.from('entregas').select('*').order('data_entrega', { ascending: false })
        if (entError) throw entError
        entregas.value = entData || []
    } catch (e) {
        erro.value = e.message || String(e)
    } finally {
        loading.value = false
    }
}

async function registrar() {
    erro.value = ''; ok.value = false
    const epiKey = form.value.id_epi
    const qtdEstoque = estoqueMap.value[epiKey] ?? estoqueMap.value[String(epiKey)] ?? 0
    if (form.value.quantidade > qtdEstoque) {
        erro.value = `Estoque insuficiente — apenas ${qtdEstoque} unidades disponíveis.`
        return
    }

    const payload = {
        id_funcionario: form.value.id_funcionario,
        id_epi: form.value.id_epi,
        quantidade: form.value.quantidade,
        data_entrega: form.value.data_entrega,
        observacoes: form.value.assinatura_digital ? 'Assinatura digital confirmada' : null
    }

    const { error } = await supabase.from('entregas').insert(payload).select()
    if (error) { erro.value = error.message || JSON.stringify(error); return }

    const stockCheck = await supabase.from('estoque').select('*').limit(1)
    if (stockCheck.data && stockCheck.data.length) {
        await supabase.from('estoque').update({ quantidade: qtdEstoque - form.value.quantidade }).eq('epi_id', form.value.id_epi)
    } else {
        await supabase.from('epi').update({ estoque: qtdEstoque - form.value.quantidade }).eq('id_epi', form.value.id_epi)
    }

    ok.value = true
    form.value = { id_funcionario: '', id_epi: '', quantidade: 1, data_entrega: hoje, assinatura_digital: false }
    await carregar()
}

const iniciais = (nome) => (nome || '').split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase()
const formatarData = (d) => { if (!d) return '—'; const [y, m, dia] = d.split('-'); return `${dia}/${m}/${y}` }
const getFuncionarioNome = (id) => funcionarioMap.value[id]?.nome || '—'
const getFuncionarioCargo = (id) => funcionarioMap.value[id]?.cargo || funcionarioMap.value[id]?.setor || ''
const getEpiNome = (id) => epiMap.value[id]?.nome || '—'
const getEpiCa = (id) => epiMap.value[id]?.numero_ca || epiMap.value[id]?.ca || '—'

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

.metric-card.accent {
    background: rgba(255, 255, 255, 0.18);
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

/* ── Layout ── */
.content-grid {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

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
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.form-group {
    flex: 1 1 14rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

label {
    font-size: 0.73rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #4a647b;
    text-transform: uppercase;
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

/* ── Checkbox ── */
.checkbox-group {
    justify-content: flex-end;
    padding-bottom: 0.1rem;
}

.label-check {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    cursor: pointer;
    font-size: 0.88rem;
    font-weight: 600;
    color: #2e4a60;
    text-transform: none;
    letter-spacing: 0;
    margin-top: auto;
    padding: 0.75rem 0;
}

.check-input {
    display: none;
}

.check-box {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0.35rem;
    border: 1.5px solid #b0c8da;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, border-color 0.15s;
    flex-shrink: 0;
}

.check-box .ti {
    font-size: 0.8rem;
    color: transparent;
    transition: color 0.15s;
}

.check-input:checked~.check-box {
    background: #1a6fa8;
    border-color: #1a6fa8;
}

.check-input:checked~.check-box .ti {
    color: #fff;
}

/* ── Feedback ── */
.form-feedback {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.88rem;
    font-weight: 600;
    margin: 0;
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
    margin-top: 0.25rem;
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
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    filter: none;
}

.btn-primary {
    background: linear-gradient(135deg, #0d3a5e, #1a6fa8);
    color: #fff;
    box-shadow: 0 8px 20px rgba(13, 58, 94, 0.28);
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

/* ── Cells ── */
.colaborador-cell {
    display: flex;
    align-items: center;
    gap: 0.7rem;
}

.avatar-initials {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #1a6fa8, #0d3a5e);
    color: #fff;
    font-size: 0.68rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.text-bold {
    font-weight: 700;
    color: #0f2a3f;
}

.text-muted {
    color: #7a95a8;
}

.sub-text {
    font-size: 0.78rem;
    color: #7a95a8;
    margin-top: 0.1rem;
}

.badge-quantidade {
    display: inline-flex;
    align-items: center;
    border-radius: 6px;
    padding: 0.28rem 0.65rem;
    font-weight: 700;
    font-size: 0.78rem;
    background: #e8f0f8;
    color: #1a4a8a;
}

.badge-status {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border-radius: 999px;
    padding: 0.3rem 0.7rem;
    font-size: 0.75rem;
    font-weight: 700;
}

.badge-status.ok {
    background: #e0f4ec;
    color: #1a6e45;
}

.badge-status.warn {
    background: #fef9e0;
    color: #8a6200;
}

/* ── States ── */
.loading-state {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 2.5rem;
    color: #7a95a8;
    font-size: 0.9rem;
}

.spin {
    animation: spin 1s linear infinite;
    display: inline-block;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

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

    .checkbox-group {
        justify-content: flex-start;
    }
}
</style>