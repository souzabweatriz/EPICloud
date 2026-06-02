<template>
    <div class="layout-shell">
        <header class="hero-card">
            <div class="hero-top">
                <div class="hero-copy">
                    <p class="eyebrow">Distribuição de EPIs</p>
                    <h1>Registro de entregas</h1>
                    <p class="hero-text">Controle quais EPIs foram entregues a cada funcionário, data e quantidade.</p>
                </div>
                <div class="hero-metrics">
                    <article class="metric-card">
                        <i class="ti ti-package metric-icon"></i>
                        <span class="metric-label">Total de entregas</span>
                        <strong>{{ entregas.length }}</strong>
                    </article>
                    <article class="metric-card accent">
                        <i class="ti ti-users metric-icon"></i>
                        <span class="metric-label">Funcionários beneficiados</span>
                        <strong>{{ funcionariosUnicos }}</strong>
                    </article>
                </div>
            </div>
        </header>

        <main class="content-grid">
            <section class="charts-row">
                <div class="chart-card">
                    <div class="chart-header">
                        <div class="chart-title-group">
                            <i class="ti ti-chart-bar-left header-icon" aria-hidden="true"></i>
                            <div>
                                <p class="card-kicker">Análise</p>
                                <h3>Top EPIs entregues</h3>
                            </div>
                        </div>
                    </div>
                    <div class="chart-body bar-body">
                        <canvas ref="barChartRef" aria-label="Gráfico de barras com top EPIs mais entregues"></canvas>
                    </div>
                </div>

                <div class="chart-card">
                    <div class="chart-header">
                        <div class="chart-title-group">
                            <i class="ti ti-chart-donut header-icon" aria-hidden="true"></i>
                            <div>
                                <p class="card-kicker">Distribuição</p>
                                <h3>Quantidade por EPI</h3>
                            </div>
                        </div>
                    </div>
                    <div ref="legendRef" class="chart-legend"></div>
                    <div class="chart-body donut-body">
                        <canvas ref="donutChartRef"
                            aria-label="Gráfico donut com distribuição de EPIs entregues"></canvas>
                    </div>
                </div>
            </section>

            <section class="card-form">
                <div class="section-header">
                    <div class="section-title-group">
                        <i class="ti ti-plus-circle header-icon" aria-hidden="true"></i>
                        <div>
                            <p class="card-kicker">Registro</p>
                            <h3>Registrar entrega de EPI</h3>
                        </div>
                    </div>
                </div>

                <form @submit.prevent="salvar" class="main-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Funcionário</label>
                            <select v-model="form.id_funcionario" required class="input-field">
                                <option value="" disabled>Selecione o funcionário</option>
                                <option v-for="f in funcionarios" :key="f.id_funcionario" :value="f.id_funcionario">
                                    {{ f.nome }} ({{ f.cargo }})
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>EPI</label>
                            <select v-model="form.id_epi" required class="input-field">
                                <option value="" disabled>Selecione o EPI</option>
                                <option v-for="e in epis" :key="e.id_epi" :value="e.id_epi">
                                    {{ e.nome }} ({{ e.numero_ca }})
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Quantidade</label>
                            <input v-model="form.quantidade" type="number" min="1" step="1" placeholder="Ex: 1" required
                                class="input-field">
                        </div>
                        <div class="form-group">
                            <label>Data da entrega</label>
                            <input v-model="form.data_entrega" type="date" required class="input-field">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group span-2">
                            <label>Observações <span class="label-optional">(opcional)</span></label>
                            <input v-model="form.observacoes" type="text" placeholder="Ex: Entregue no turno da manhã"
                                class="input-field">
                        </div>
                    </div>

                    <p v-if="mensagemErro" class="form-feedback error">
                        <i class="ti ti-alert-circle"></i> {{ mensagemErro }}
                    </p>
                    <p v-if="mensagemSucesso" class="form-feedback success">
                        <i class="ti ti-circle-check"></i> {{ mensagemSucesso }}
                    </p>

                    <div class="action-bar">
                        <button type="submit" class="btn btn-primary">
                            <i class="ti ti-send"></i>
                            Registrar entrega
                        </button>
                    </div>
                </form>
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

                <div class="table-wrap">
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Funcionário</th>
                                <th>EPI</th>
                                <th>Qtd.</th>
                                <th>Data</th>
                                <th>Observações</th>
                                <th class="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="entregas.length === 0">
                                <td colspan="6" class="empty-state">
                                    <i class="ti ti-inbox-off empty-icon"></i>
                                    <span>Nenhuma entrega registrada.</span>
                                </td>
                            </tr>
                            <tr v-for="e in entregas" :key="e.id_entrega">
                                <td>
                                    <div class="funcionario-cell">
                                        <span class="avatar">{{ iniciais(getNomeFuncionario(e.id_funcionario)) }}</span>
                                        <span class="text-bold">{{ getNomeFuncionario(e.id_funcionario) }}</span>
                                    </div>
                                </td>
                                <td><span class="badge-epi">{{ getNomeEpi(e.id_epi) }}</span></td>
                                <td><span class="badge-quantidade">{{ e.quantidade }}</span></td>
                                <td class="text-muted">{{ formatarData(e.data_entrega) }}</td>
                                <td class="text-muted">{{ e.observacoes || '—' }}</td>
                                <td class="text-center">
                                    <button @click="excluir(e.id_entrega)" class="btn-delete" title="Excluir">
                                        <i class="ti ti-trash"></i>
                                    </button>
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
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import Chart from 'chart.js/auto'

const { supabase } = useSupabase()

const funcionarios = ref([])
const epis = ref([])
const entregas = ref([])
const mensagemErro = ref('')
const mensagemSucesso = ref('')

const barChartRef = ref(null)
const donutChartRef = ref(null)
const legendRef = ref(null)
let barChart = null
let donutChart = null

const form = reactive({
    id_funcionario: '',
    id_epi: '',
    quantidade: '',
    data_entrega: '',
    observacoes: ''
})

const funcionariosUnicos = computed(() => new Set(entregas.value.map(e => e.id_funcionario)).size)

const limparMensagens = () => {
    mensagemErro.value = ''
    mensagemSucesso.value = ''
}

const CHART_COLORS = ['#1a6fa8', '#0f4e7a', '#2a9d8f', '#e9c46a', '#e76f51', '#57cc99', '#9b72cf', '#f4a261']

const buildCharts = () => {
    const totaisPorEpi = {}
    for (const e of entregas.value) {
        const nome = getNomeEpi(e.id_epi)
        totaisPorEpi[nome] = (totaisPorEpi[nome] || 0) + Number(e.quantidade)
    }

    const sorted = Object.entries(totaisPorEpi).sort((a, b) => b[1] - a[1]).slice(0, 8)
    const labels = sorted.map(([nome]) => nome)
    const valores = sorted.map(([, qtd]) => qtd)
    const cores = labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length])

    if (barChart) { barChart.destroy(); barChart = null }
    if (donutChart) { donutChart.destroy(); donutChart = null }
    if (!barChartRef.value || !donutChartRef.value) return

    const baseFont = { family: 'inherit', size: 12 }

    barChart = new Chart(barChartRef.value, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Unidades entregues',
                data: valores,
                backgroundColor: cores,
                borderRadius: 6,
                borderSkipped: false,
                barThickness: 20
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0f2a3f',
                    padding: 10,
                    callbacks: { label: ctx => ` ${ctx.parsed.x} unidades` }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(18,55,82,0.06)' },
                    ticks: { font: baseFont, color: '#6b8599' }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { ...baseFont, weight: '600' }, color: '#1a3448' }
                }
            }
        }
    })

    const total = valores.reduce((a, b) => a + b, 0)

    if (legendRef.value) {
        legendRef.value.innerHTML = labels.map((l, i) => {
            const pct = total > 0 ? Math.round((valores[i] / total) * 100) : 0
            return `<span class="legend-item">
                <span class="legend-dot" style="background:${cores[i]}"></span>
                <span class="legend-label">${l}</span>
                <span class="legend-pct">${pct}%</span>
            </span>`
        }).join('')
    }

    donutChart = new Chart(donutChartRef.value, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data: valores,
                backgroundColor: cores,
                borderWidth: 3,
                borderColor: '#ffffff',
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0f2a3f',
                    padding: 10,
                    callbacks: {
                        label: ctx => ` ${ctx.label}: ${ctx.parsed} unidades (${Math.round(ctx.parsed / total * 100)}%)`
                    }
                }
            }
        }
    })
}

const carregarDados = async () => {
    const [{ data: funcData }, { data: epiData }, { data: entregasData }] = await Promise.all([
        supabase.from('funcionarios').select('*').order('nome'),
        supabase.from('epi').select('*').order('nome'),
        supabase.from('entregas').select('*').order('data_entrega', { ascending: false })
    ])
    funcionarios.value = funcData || []
    epis.value = epiData || []
    entregas.value = entregasData || []
    await nextTick()
    buildCharts()
}

const getNomeFuncionario = (id) => funcionarios.value.find(f => f.id_funcionario === id)?.nome || 'Desconhecido'
const getNomeEpi = (id) => epis.value.find(e => e.id_epi === id)?.nome || 'Desconhecido'

const iniciais = (nome) => nome.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase()

const formatarData = (valor) => {
    if (!valor) return '—'
    const data = new Date(valor)
    if (Number.isNaN(data.getTime())) return '—'
    return data.toLocaleDateString('pt-BR')
}

const salvar = async () => {
    limparMensagens()
    if (!form.id_funcionario || !form.id_epi || !form.quantidade || !form.data_entrega) {
        mensagemErro.value = 'Preencha todos os campos obrigatórios.'
        return
    }
    const { error } = await supabase.from('entregas').insert([{
        id_funcionario: Number(form.id_funcionario),
        id_epi: Number(form.id_epi),
        quantidade: Number(form.quantidade),
        data_entrega: form.data_entrega,
        observacoes: form.observacoes || null
    }])
    if (error) { mensagemErro.value = 'Não foi possível registrar a entrega.'; return }
    mensagemSucesso.value = 'Entrega registrada com sucesso.'
    Object.assign(form, { id_funcionario: '', id_epi: '', quantidade: '', data_entrega: '', observacoes: '' })
    carregarDados()
}

const excluir = async (id) => {
    if (!confirm('Deseja remover este registro?')) return
    limparMensagens()
    const { error } = await supabase.from('entregas').delete().eq('id_entrega', id)
    if (error) { mensagemErro.value = 'Não foi possível excluir a entrega.'; return }
    mensagemSucesso.value = 'Entrega removida com sucesso.'
    carregarDados()
}

onMounted(carregarDados)
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
    color: rgba(255, 255, 255, 0.55);
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
    color: rgba(255, 255, 255, 0.65);
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
    gap: 0.25rem;
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
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.6);
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

/* ── Shared card shell ── */
.chart-card,
.card-form,
.card-table {
    border-radius: 1.25rem;
    border: 1px solid rgba(18, 55, 82, 0.09);
    background: #fff;
    box-shadow: 0 4px 20px rgba(10, 30, 55, 0.07);
    overflow: hidden;
}

/* ── Charts row ── */
.charts-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
}

.chart-card {
    flex: 1 1 22rem;
    display: flex;
    flex-direction: column;
}

.chart-header,
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(18, 55, 82, 0.07);
    background: #fafbfc;
}

.chart-title-group,
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

.chart-header h3,
.section-header h3 {
    font-size: 0.97rem;
    font-weight: 700;
    color: #0f2a3f;
    margin: 0;
}

/* ── Chart legend (donut) ── */
.chart-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    padding: 0.75rem 1.25rem 0;
}

.legend-item {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    color: #4a647b;
}

.legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 2px;
    flex-shrink: 0;
}

.legend-label {
    font-weight: 500;
    color: #1a3448;
    max-width: 9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.legend-pct {
    font-weight: 700;
    color: #1a6fa8;
}

/* ── Chart canvas ── */
.chart-body {
    padding: 1rem 1.25rem 1.25rem;
    position: relative;
}

.bar-body {
    height: 300px;
}

.donut-body {
    height: 260px;
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
}

.input-field:focus {
    border-color: #1a6fa8;
    box-shadow: 0 0 0 3px rgba(26, 111, 168, 0.12);
}

.input-field::placeholder {
    color: #9ab0c0;
}

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

.action-bar {
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
    transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
}

.btn:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
}

.btn:active {
    transform: translateY(0);
}

.btn-primary {
    background: linear-gradient(135deg, #0d3a5e, #1a6fa8);
    color: #fff;
    box-shadow: 0 8px 20px rgba(13, 58, 94, 0.28);
}

/* ── Table ── */
.table-count {
    font-size: 0.78rem;
    font-weight: 700;
    color: #1a6fa8;
    background: rgba(26, 111, 168, 0.1);
    padding: 0.35rem 0.8rem;
    border-radius: 999px;
}

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

.funcionario-cell {
    display: flex;
    align-items: center;
    gap: 0.65rem;
}

.avatar {
    width: 2rem;
    height: 2rem;
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

.badge-epi,
.badge-quantidade {
    display: inline-flex;
    align-items: center;
    border-radius: 6px;
    padding: 0.28rem 0.65rem;
    font-weight: 700;
    font-size: 0.78rem;
    white-space: nowrap;
}

.badge-epi {
    background: #e8f3fb;
    color: #1a5a8a;
}

.badge-quantidade {
    background: #e8f0f8;
    color: #1a4a8a;
}

.btn-delete {
    border: none;
    background: transparent;
    color: #b54040;
    cursor: pointer;
    padding: 0.3rem 0.5rem;
    border-radius: 0.5rem;
    font-size: 1.05rem;
    transition: background 0.15s, color 0.15s;
    display: inline-flex;
    align-items: center;
}

.btn-delete:hover {
    background: #fff0f0;
    color: #8a1f1f;
}

.text-center {
    text-align: center;
}

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

    .charts-row {
        flex-direction: column;
    }

    .bar-body {
        height: 240px;
    }

    .donut-body {
        height: 220px;
    }

    .form-row {
        flex-direction: column;
    }

    .form-group {
        flex: 1 1 100%;
    }
}
</style>