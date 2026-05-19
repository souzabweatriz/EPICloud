<template>
    <main class="page-shell">
        <section class="table-card">
            <div class="form-card">
                <div class="card-header">
                    <h2>Nova Entrega</h2><div class="card-subtitle">Registre uma nova saída do estoque</div>
                </div>
                <div class="main-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Funcionário</label>
                            <select v-model="form.id_funcionario" class="custom-select">
                                <option value="">Selecione o funcionário...</option>
                                <option v-for="f in funcionarios" :key="f.id_funcionario || f.id"
                                    :value="f.id_funcionario || f.id">
                                    {{ f.nome }} — {{ f.cargo || f.setor || '' }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>EPI</label>
                            <select v-model="form.id_epi" class="custom-select">
                                <option value="">Selecione o EPI...</option>
                                <option v-for="e in epis" :key="e.id_epi || e.id" :value="e.id_epi || e.id">
                                    {{ e.nome }} (Saldo: {{ estoqueMap[e.id_epi || e.id || e.epi_id] ?? e.estoque ?? 0
                                    }})
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row cols-3">
                        <div class="form-group">
                            <label>Quantidade</label>
                            <input type="number" v-model.number="form.quantidade" min="1" />
                        </div>
                        <div class="form-group">
                            <label>Data de Entrega</label>
                            <input type="date" v-model="form.data_entrega" />
                        </div>
                        <div class="form-group checkbox-group">
                            <label class="checkbox-label"><input type="checkbox" v-model="form.assinatura_digital" />
                                Assinatura digital</label>
                        </div>
                    </div>

                    <div class="action-bar">
                        <button class="btn btn-primary" @click="registrar"
                            :disabled="!form.id_funcionario || !form.id_epi || loading">Registrar</button>
                    </div>

                    <p class="error-msg" v-if="erro">⚠ {{ erro }}</p>
                    <p class="success-msg" v-if="ok">✓ Entrega registrada com sucesso!</p>
                </div>
            </div>

            <div class="history-card">
                <div class="card-header flex-between">
                    <div>
                        <h2>Histórico</h2>
                        <div class="card-subtitle">Últimas entregas registradas</div>
                    </div>
                    <span class="badge badge-blue">{{ entregas.length }} registros</span>
                </div>

                <div v-if="loading" class="text-center-loading">Carregando dados...</div>

                <div v-else class="table-container">
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Funcionário</th>
                                <th>EPI</th>
                                <th>Qtd</th>
                                <th>Data</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="e in entregas" :key="e.id_entrega || e.id">
                                <td data-label="Funcionário">
                                    <div class="text-bold">{{ getFuncionarioNome(e.id_funcionario) }}</div>
                                    <div class="cargo-text">{{ getFuncionarioCargo(e.id_funcionario) }}</div>
                                </td>
                                <td data-label="EPI">
                                    <div class="text-bold">{{ getEpiNome(e.id_epi) }}</div>
                                    <div class="cargo-text">CA: {{ getEpiCa(e.id_epi) }}</div>
                                </td>
                                <td class="text-bold" data-label="Qtd">{{ e.quantidade }}</td>
                                <td class="cargo-text" data-label="Data">{{ formatarData(e.data_entrega) }}</td>
                                <td data-label="Status"><span
                                        :class="e.assinatura_digital ? 'badge badge-ok' : 'badge badge-warn'">{{
                                            e.assinatura_digital ? 'Confirmada' : 'Pendente' }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

async function carregar() {
    loading.value = true
    erro.value = ''
    try {
        const { data: funcs } = await supabase.from('funcionarios').select('*').order('nome')
        funcionarios.value = funcs || []
        funcionarioMap.value = Object.fromEntries((funcs || []).map(funcionario => [funcionario.id_funcionario, funcionario]))

        let res = await supabase.from('epis').select('*').order('nome')
        if (res.error || !res.data || res.data.length === 0) {
            res = await supabase.from('epi').select('*').order('nome')
        }
        epis.value = res.data || []
        epiMap.value = Object.fromEntries((epis.value || []).map(epi => [(epi.id_epi || epi.id || epi.epi_id), epi]))

        const { data: estoqueData } = await supabase.from('estoque').select('epi_id, quantidade')
        if (estoqueData && estoqueData.length) {
            estoqueMap.value = Object.fromEntries(estoqueData.map(e => [e.epi_id, e.quantidade]))
        } else {
            estoqueMap.value = Object.fromEntries((epis.value || []).map(e => [(e.id_epi || e.id || e.epi_id), (e.estoque || 0)]))
        }

        const { data: entData, error: entError } = await supabase.from('entregas')
            .select('*')
            .order('data_entrega', { ascending: false })
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
    const epiKey = form.value.id_epi || form.value.epi_id
    const qtdEstoque = estoqueMap.value[epiKey] ?? estoqueMap.value[String(epiKey)] ?? 0
    if (form.value.quantidade > qtdEstoque) {
        erro.value = `Estoque insuficiente (${qtdEstoque} disponíveis)`
        return
    }

    const payload = {
        id_funcionario: form.value.id_funcionario,
        id_epi: form.value.id_epi,
        quantidade: form.value.quantidade,
        data_entrega: form.value.data_entrega,
        observacoes: form.value.assinatura_digital ? 'Assinatura digital confirmada' : null
    }

    const { data: insertData, error } = await supabase.from('entregas').insert(payload).select()
    if (error) {
        console.error('Insert entregas error:', error)
        erro.value = error.message || JSON.stringify(error)
        return
    }
    console.log('Entrega inserida:', insertData)

    // atualizar estoque: tenta tabela estoque, senão atualiza campo estoque em epi/epis
    const stockCheck = await supabase.from('estoque').select('*').limit(1)
    if (stockCheck.data && stockCheck.data.length) {
        await supabase.from('estoque').update({ quantidade: qtdEstoque - form.value.quantidade }).eq('epi_id', form.value.id_epi)
    } else {
        await supabase.from('epi').update({ estoque: qtdEstoque - form.value.quantidade }).eq('id_epi', form.value.id_epi)
        await supabase.from('epis').update({ estoque: qtdEstoque - form.value.quantidade }).eq('id_epi', form.value.id_epi)
    }

    ok.value = true
    form.value = { id_funcionario: '', id_epi: '', quantidade: 1, data_entrega: hoje, assinatura_digital: false }
    await carregar()
}

function formatarData(d) {
    if (!d) return '—'
    const [y, m, dia] = d.split('-')
    return `${dia}/${m}/${y}`
}

function getFuncionarioNome(idFuncionario) {
    return funcionarioMap.value[idFuncionario]?.nome || '—'
}

function getFuncionarioCargo(idFuncionario) {
    return funcionarioMap.value[idFuncionario]?.cargo || funcionarioMap.value[idFuncionario]?.setor || ''
}

function getEpiNome(idEpi) {
    return epiMap.value[idEpi]?.nome || '—'
}

function getEpiCa(idEpi) {
    return epiMap.value[idEpi]?.numero_ca || epiMap.value[idEpi]?.ca || '—'
}

function scrollToForm() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

onMounted(carregar)
</script>

<style scoped>
/* Layout column-based, responsive, rem-like spacing */
.page-shell {
    width: 96%;
    max-width: 70rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem
}

.top-card,
.table-card {
    border-radius: 1rem;
    border: 0.06rem solid #d7deea;
    background: linear-gradient(180deg, #f8fafc 0%, #eef4fa 100%);
    box-shadow: 0 0.75rem 1.75rem rgba(12, 20, 38, 0.06)
}

.top-card {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap
}

.eyebrow {
    text-transform: uppercase;
    color: #2b8ac8;
    font-weight: 700;
    font-size: 0.78rem;
    margin: 0
}

.top-card h1 {
    margin: 0;
    font-size: 1.25rem;
    color: #123752
}

.top-card p {
    margin: 0;
    color: #4a647b
}

.primary-action {
    border: none;
    border-radius: 0.6rem;
    padding: 0.6rem 0.9rem;
    background: linear-gradient(90deg, #17486b 0%, #2b8ac8 100%);
    color: #fff;
    font-weight: 700
}

.table-card {
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 1rem
}

.form-card,
.history-card {
    background: #fff;
    border-radius: 0.6rem;
    overflow: hidden
}

.card-header {
    padding: 0.8rem 1rem;
    background: #fbfdff;
    border-bottom: 0.06rem solid #eef3f8
}

.main-form {
    padding: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem
}

.form-row {
    display: flex;
    gap: 0.8rem;
    width: 100%
}

.form-row>.form-group {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem
}

.cols-3 {
    flex-direction: column
}

.checkbox-group {
    justify-content: center
}

.checkbox-label {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 1.45rem;
    line-height: 1.2;
    white-space: nowrap
}

.checkbox-label input {
    width: 1rem;
    height: 1rem;
    margin: 0
}

.form-group {
    gap: 0.375rem
}

label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #334155
}

input,
select,
.custom-select {
    padding: 0.75rem 0.8rem;
    border: 0.06rem solid #d2dce6;
    border-radius: 0.5rem;
    font-size: 0.95rem;
    width: 100%
}

.action-bar {
    margin-top: 0.5rem
}

.btn-primary {
    background: #123752;
    color: #fff;
    padding: 0.6rem 1rem;
    border-radius: 0.6rem;
    border: none;
    cursor: pointer;
    font-weight: 700
}

.table-container {
    width: 100%;
    overflow: auto;
    padding: 0.6rem
}

.styled-table {
    width: 100%;
    border-collapse: collapse;
    background: #fff
}

.styled-table th {
    background: #f6fbff;
    padding: 0.75rem 0.9rem;
    text-align: left;
    font-size: 0.85rem;
    color: #214663;
    border-bottom: 0.06rem solid #e6eef6
}

.styled-table td {
    padding: 0.75rem 0.9rem;
    border-top: 0.06rem solid #f1f5f9;
    font-size: 0.95rem;
    color: #234
}

.badge {
    padding: 0.4rem 0.65rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 800
}

.badge-blue {
    background: #e0f2fe;
    color: #0369a1
}

.badge-ok {
    background: #dcfce7;
    color: #166534
}

.badge-warn {
    background: #fef9c3;
    color: #854d0e
}

.text-bold {
    font-weight: 700
}

.cargo-text {
    color: #64748b;
    font-size: 0.82rem
}

.text-center-loading {
    padding: 1.75rem;
    text-align: center
}

/* Visual improvements */
.card-subtitle { font-size: 0.85rem; color: #64748b; margin-top: 0.25rem }
.form-card { border-radius: 0.75rem; box-shadow: 0 8px 24px rgba(18,55,82,0.06); overflow: hidden }
.history-card { border-radius: 0.75rem; box-shadow: 0 6px 20px rgba(12,20,38,0.04); overflow: hidden }
.card-header h2 { margin: 0; font-size: 1.05rem; color: #123752 }
.main-form { background: linear-gradient(180deg,#ffffff 0%, #fbfdff 100%); border-radius: 0.5rem }

.btn-primary { background: linear-gradient(90deg,#1b4b63 0%,#2b8ac8 100%); box-shadow: 0 8px 20px rgba(43,138,200,0.18) }
.btn-primary:hover { transform: translateY(-2px) }

.error-msg, .success-msg { display:inline-block; padding:0.5rem 0.75rem; border-radius:0.5rem; margin-top:0.5rem }
.error-msg { background:#fff5f5; color:#b91c1c; border:1px solid #fecaca }
.success-msg { background:#ecfdf5; color:#065f46; border:1px solid #bbf7d0 }
.error-msg, .success-msg { transition: opacity 220ms ease, transform 220ms ease }

/* Table striped + hover */
.styled-table tbody tr:nth-child(odd) { background: #ffffff }
.styled-table tbody tr:nth-child(even) { background: #fbfdff }
.styled-table tbody tr:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(12,20,38,0.04) }
.styled-table th { position: sticky; top: 0; z-index: 2 }

/* compact badges */
.badge { font-size: 0.75rem; padding: 0.35rem 0.6rem }

@media (max-width: 900px) {
    .form-row {
        flex-direction: column
    }

    .top-card h1 {
        font-size: 1.1rem
    }
}

@media (max-width: 640px) {
    .primary-action {
        padding: 0.5rem 0.6rem;
        font-size: 0.95rem
    }

    .btn-primary {
        width: 100%
    }

    input,
    select,
    .custom-select {
        padding: 0.85rem 1rem;
        font-size: 1rem
    }

    .styled-table thead {
        display: none
    }

    .styled-table tr {
        display: block;
        border-radius: 0.625rem;
        padding: 0.75rem;
        margin-bottom: 0.75rem;
        box-shadow: 0 0.375rem 1.125rem rgba(12, 20, 38, 0.04)
    }

    .styled-table td {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border: none
    }

    .styled-table td::before {
        content: attr(data-label);
        color: #64748b;
        font-weight: 700;
        margin-right: 0.5rem
    }
}
</style>
