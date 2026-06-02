<template>
    <div class="layout-shell">
        <header class="hero-card">
            <div class="hero-top">
                <div class="hero-copy">
                    <p class="eyebrow">Controle de efetivo</p>
                    <h1>{{ editandoId ? 'Editar funcionário' : 'Funcionários' }}</h1>
                    <p class="hero-text">Gerencie o cadastro de colaboradores, cargos e departamentos.</p>
                </div>
                <div class="hero-metrics">
                    <article class="metric-card">
                        <i class="ti ti-users metric-icon" aria-hidden="true"></i>
                        <span class="metric-label">Total cadastrado</span>
                        <strong>{{ funcionarios.length }}</strong>
                    </article>
                    <article class="metric-card accent">
                        <i class="ti ti-building metric-icon" aria-hidden="true"></i>
                        <span class="metric-label">Departamentos</span>
                        <strong>{{ departamentos.length }}</strong>
                    </article>
                </div>
            </div>
        </header>

        <main class="content-grid">
            <section class="card-form">
                <div class="section-header">
                    <div class="section-title-group">
                        <i class="ti ti-user-plus header-icon" aria-hidden="true"></i>
                        <div>
                            <p class="card-kicker">Registro</p>
                            <h3>{{ editandoId ? 'Alterar dados do funcionário' : 'Novo funcionário' }}</h3>
                        </div>
                    </div>
                    <span v-if="editandoId" class="badge-editing">Em edição</span>
                </div>

                <form @submit.prevent="salvar" class="main-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nome completo</label>
                            <input v-model="form.nome" type="text" placeholder="Digite o nome completo" required class="input-field">
                        </div>
                        <div class="form-group">
                            <label>E-mail</label>
                            <input v-model="form.email" type="email" placeholder="nome@empresa.com" required class="input-field">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Cargo</label>
                            <input v-model="form.cargo" type="text" placeholder="Ex: Analista de segurança" required class="input-field">
                        </div>
                        <div class="form-group">
                            <label>Departamento</label>
                            <select v-model="form.id_departamento" required class="input-field">
                                <option value="" disabled>Selecione o departamento</option>
                                <option v-for="d in departamentos" :key="d.id_departamento" :value="d.id_departamento">
                                    {{ d.nome_departamento }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Data de nascimento</label>
                            <input v-model="form.data_nascimento" type="date" required class="input-field">
                        </div>
                        <div class="form-group">
                            <label>Senha</label>
                            <div class="password-wrap">
                                <input v-model="form.senha" :type="mostrarSenha ? 'text' : 'password'"
                                    placeholder="Mínimo 6 caracteres" required minlength="6" class="input-field">
                                <button type="button" class="btn-toggle-pass" @click="mostrarSenha = !mostrarSenha"
                                    :aria-label="mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'">
                                    <i class="ti" :class="mostrarSenha ? 'ti-eye-off' : 'ti-eye'"></i>
                                </button>
                            </div>
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
                            {{ loading ? 'Salvando...' : (editandoId ? 'Salvar alterações' : 'Cadastrar funcionário') }}
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
                            <p class="card-kicker">Equipe</p>
                            <h3>Funcionários cadastrados</h3>
                        </div>
                    </div>
                    <span class="table-count">{{ funcionarios.length }} registros</span>
                </div>

                <div class="table-wrap">
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Colaborador</th>
                                <th>E-mail</th>
                                <th>Cargo / Departamento</th>
                                <th>Nascimento</th>
                                <th class="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="!funcionarios.length">
                                <td colspan="5" class="empty-state">
                                    <i class="ti ti-users-off empty-icon"></i>
                                    <span>Nenhum funcionário cadastrado ainda.</span>
                                </td>
                            </tr>
                            <tr v-for="f in funcionarios" :key="getRowId(f)">
                                <td>
                                    <div class="colaborador-cell">
                                        <img
                                            v-if="f.foto"
                                            :src="f.foto"
                                            :alt="f.nome"
                                            class="avatar-img"
                                            @click="abrirFoto(f)"
                                            title="Clique para ampliar"
                                        >
                                        <div v-else class="avatar-initials">{{ iniciais(f.nome) }}</div>
                                        <span class="text-bold">{{ f.nome }}</span>
                                    </div>
                                </td>
                                <td class="text-muted">{{ f.email }}</td>
                                <td>
                                    <div class="cargo-cell">
                                        <span class="badge-depto">{{ getDepartamentoNome(f.id_departamento) }}</span>
                                        <span class="cargo-text">{{ f.cargo }}</span>
                                    </div>
                                </td>
                                <td class="text-muted">{{ formatarData(f.data_nascimento) }}</td>
                                <td class="text-center">
                                    <div class="row-actions">
                                        <button @click="prepararEdicao(f)" class="btn-icon edit" title="Editar">
                                            <i class="ti ti-pencil"></i>
                                        </button>
                                        <button @click="excluir(getRowId(f))" class="btn-icon delete" title="Excluir">
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

        <!-- Lightbox -->
        <Transition name="lightbox">
            <div v-if="fotoAberta" class="lightbox-overlay" @click="fecharFoto">
                <div class="lightbox-box" @click.stop>
                    <button class="lightbox-close" @click="fecharFoto" aria-label="Fechar">
                        <i class="ti ti-x"></i>
                    </button>
                    <img :src="fotoAberta.src" :alt="fotoAberta.nome" class="lightbox-img">
                    <div class="lightbox-info">
                        <div class="lightbox-avatar-initials">{{ iniciais(fotoAberta.nome) }}</div>
                        <div>
                            <p class="lightbox-nome">{{ fotoAberta.nome }}</p>
                            <p class="lightbox-cargo">{{ fotoAberta.cargo }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useSupabase } from '../composables/useSupabase.js'

const { supabase } = useSupabase()

const loading = ref(false)
const message = ref('')
const messageType = ref('')
const funcionarios = ref([])
const departamentos = ref([])
const editandoId = ref(null)
const mostrarSenha = ref(false)
const fotoAberta = ref(null)

const form = reactive({
    nome: '', cargo: '', email: '', senha: '',
    data_nascimento: '', id_departamento: '', foto: ''
})

function abrirFoto(f) {
    if (!f.foto) return
    fotoAberta.value = { src: f.foto, nome: f.nome, cargo: f.cargo || '' }
    document.body.style.overflow = 'hidden'
}

function fecharFoto() {
    fotoAberta.value = null
    document.body.style.overflow = ''
}

function onKeydown(e) {
    if (e.key === 'Escape') fecharFoto()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

function limparForm() {
    Object.assign(form, { nome: '', cargo: '', email: '', senha: '', data_nascimento: '', id_departamento: '', foto: '' })
    mostrarSenha.value = false
    message.value = ''
    messageType.value = ''
}

function getRowId(row) {
    return row?.id ?? row?.id_funcionario ?? null
}

function getDepartamentoNome(id) {
    if (!id) return '—'
    return departamentos.value.find(d => String(d.id_departamento) === String(id))?.nome_departamento || '—'
}

function iniciais(nome) {
    return (nome || '').split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase()
}

function formatarData(valor) {
    if (!valor) return '—'
    const d = new Date(valor)
    if (Number.isNaN(d.getTime())) return valor
    return d.toLocaleDateString('pt-BR')
}

function cancelarEdicao() {
    editandoId.value = null
    limparForm()
}

function prepararEdicao(f) {
    editandoId.value = getRowId(f)
    Object.assign(form, {
        nome: f.nome || '', cargo: f.cargo || '', email: f.email || '',
        senha: f.senha || '', data_nascimento: f.data_nascimento || '',
        id_departamento: f.id_departamento ?? '', foto: f.foto || ''
    })
    mostrarSenha.value = false
    message.value = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function carregar() {
    const { data, error } = await supabase.from('funcionarios').select('*').order('nome')
    if (error) { message.value = 'Erro ao carregar funcionários.'; messageType.value = 'error'; return }
    funcionarios.value = data || []
}

async function carregarDepartamentos() {
    const { data, error } = await supabase.from('departamento').select('id_departamento, nome_departamento').order('id_departamento')
    if (error) { message.value = 'Erro ao carregar departamentos.'; messageType.value = 'error'; return }
    departamentos.value = data || []
}

async function salvar() {
    loading.value = true
    message.value = ''

    const payload = {
        nome: form.nome, cargo: form.cargo, email: form.email,
        senha: form.senha, data_nascimento: form.data_nascimento,
        id_departamento: form.id_departamento || null,
        foto: form.foto || null
    }

    if (editandoId.value) {
        const { error } = await supabase.from('funcionarios').update(payload).eq('id_funcionario', editandoId.value)
        loading.value = false
        if (error) { message.value = `Não foi possível atualizar. (${error.message})`; messageType.value = 'error'; return }
        message.value = 'Cadastro atualizado com sucesso.'
        messageType.value = 'success'
        await carregar()
        cancelarEdicao()
        return
    }

    const { error } = await supabase.from('funcionarios').insert([payload])
    loading.value = false
    if (error) { message.value = `Não foi possível cadastrar. (${error.message})`; messageType.value = 'error'; return }
    message.value = 'Funcionário cadastrado com sucesso.'
    messageType.value = 'success'
    limparForm()
    await carregar()
}

async function excluir(id) {
    if (!confirm('Deseja realmente remover este registro?')) return
    if (!id) { message.value = 'Não foi possível identificar o registro.'; messageType.value = 'error'; return }
    const { error } = await supabase.from('funcionarios').delete().eq('id_funcionario', id)
    if (error) { message.value = `Não foi possível excluir. (${error.message})`; messageType.value = 'error'; return }
    message.value = 'Funcionário removido com sucesso.'
    messageType.value = 'success'
    await carregar()
}

onMounted(carregar)
onMounted(carregarDepartamentos)
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

/* ── Password ── */
.password-wrap {
    position: relative;
}

.password-wrap .input-field {
    padding-right: 2.8rem;
}

.btn-toggle-pass {
    position: absolute;
    right: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    color: #6b8599;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1rem;
    padding: 0.25rem;
    transition: color 0.15s;
}

.btn-toggle-pass:hover {
    color: #0f2a3f;
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

/* ── Colaborador cell ── */
.colaborador-cell {
    display: flex;
    align-items: center;
    gap: 0.7rem;
}

.avatar-img {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #dce8f0;
    flex-shrink: 0;
    cursor: zoom-in;
    transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
}

.avatar-img:hover {
    transform: scale(1.12);
    border-color: #1a6fa8;
    box-shadow: 0 4px 14px rgba(26, 111, 168, 0.28);
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

/* ── Cargo cell ── */
.cargo-cell {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.badge-depto {
    display: inline-flex;
    align-items: center;
    padding: 0.22rem 0.6rem;
    border-radius: 999px;
    background: #e0f4ec;
    color: #1a6e45;
    font-size: 0.72rem;
    font-weight: 700;
    width: fit-content;
}

.cargo-text {
    font-size: 0.8rem;
    color: #6b8599;
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

.btn-icon.edit { color: #1a6fa8; }
.btn-icon.edit:hover { background: #e8f3fb; color: #0d3a5e; }
.btn-icon.delete { color: #b54040; }
.btn-icon.delete:hover { background: #fff0f0; color: #8a1f1f; }

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

.text-center { text-align: center; }

/* ── Lightbox ── */
.lightbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(8, 20, 40, 0.72);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
}

.lightbox-box {
    position: relative;
    background: #fff;
    border-radius: 1.25rem;
    box-shadow: 0 32px 80px rgba(8, 20, 40, 0.4);
    overflow: hidden;
    max-width: 28rem;
    width: 100%;
}

.lightbox-close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 1;
    border: none;
    background: rgba(15, 42, 63, 0.65);
    color: #fff;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.95rem;
    transition: background 0.15s;
}

.lightbox-close:hover {
    background: rgba(15, 42, 63, 0.9);
}

.lightbox-img {
    width: 100%;
    max-height: 22rem;
    object-fit: cover;
    display: block;
}

.lightbox-info {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1rem 1.25rem;
    border-top: 1px solid #f0f5f9;
}

.lightbox-avatar-initials {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #1a6fa8, #0d3a5e);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.lightbox-nome {
    font-weight: 700;
    font-size: 0.95rem;
    color: #0f2a3f;
    margin: 0 0 0.15rem;
}

.lightbox-cargo {
    font-size: 0.8rem;
    color: #7a95a8;
    margin: 0;
}

/* ── Lightbox transition ── */
.lightbox-enter-active,
.lightbox-leave-active {
    transition: opacity 0.22s ease;
}

.lightbox-enter-active .lightbox-box,
.lightbox-leave-active .lightbox-box {
    transition: transform 0.22s ease, opacity 0.22s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
    opacity: 0;
}

.lightbox-enter-from .lightbox-box,
.lightbox-leave-to .lightbox-box {
    transform: scale(0.92);
    opacity: 0;
}

/* ── Responsive ── */
@media (max-width: 760px) {
    .layout-shell {
        width: 96%;
        margin: 1rem auto 2rem;
    }

    .hero-top { flex-direction: column; }
    .hero-metrics { flex-direction: row; width: 100%; }
    .metric-card { flex: 1; }
    .form-row { flex-direction: column; }
    .form-group { flex: 1 1 100%; }

    .action-bar { flex-direction: column; }
    .btn-primary, .btn-outline { width: 100%; justify-content: center; }
}
</style>