<template>
  <div class="layout-shell">
    <header class="hero-card">
      <div class="hero-top">
        <div class="hero-copy">
          <p class="eyebrow">Controle de EPIs</p>
          <h1>Estoque</h1>
          <p class="hero-text">Gerencie o saldo e a disponibilidade de cada equipamento de proteção.</p>
        </div>
        <div class="hero-metrics">
          <article class="metric-card">
            <i class="ti ti-box metric-icon" aria-hidden="true"></i>
            <span class="metric-label">Itens catalogados</span>
            <strong>{{ estoque.length }}</strong>
          </article>
          <article class="metric-card accent">
            <i class="ti ti-alert-triangle metric-icon" aria-hidden="true"></i>
            <span class="metric-label">Estoque baixo</span>
            <strong>{{ estoqueBaixo }}</strong>
          </article>
          <article class="metric-card accent2">
            <i class="ti ti-forbid metric-icon" aria-hidden="true"></i>
            <span class="metric-label">Sem estoque</span>
            <strong>{{ semEstoque }}</strong>
          </article>
        </div>
      </div>
    </header>

    <main class="content-grid">
      <!-- Formulário de ajuste -->
      <section class="card-form">
        <div class="section-header">
          <div class="section-title-group">
            <i class="ti ti-adjustments header-icon" aria-hidden="true"></i>
            <div>
              <p class="card-kicker">Ajuste</p>
              <h3>Atualizar quantidade em estoque</h3>
            </div>
          </div>
          <button class="btn btn-outline" @click="carregar" :disabled="loading">
            <i class="ti ti-refresh" :class="{ spin: loading }" aria-hidden="true"></i>
            Atualizar
          </button>
        </div>

        <div class="main-form">
          <div class="form-row">
            <div class="form-group">
              <label>EPI</label>
              <select v-model="form.epi_id" class="input-field">
                <option value="">Selecione um EPI...</option>
                <option v-for="item in estoque" :key="item.id_epi" :value="item.id_epi">
                  {{ item.nome }} (Atual: {{ item.estoque ?? 0 }})
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Nova quantidade</label>
              <input type="number" v-model.number="form.quantidade" min="0" placeholder="0" class="input-field">
            </div>
          </div>

          <p v-if="erro" class="form-feedback error">
            <i class="ti ti-alert-circle"></i> {{ erro }}
          </p>
          <p v-if="ok" class="form-feedback success">
            <i class="ti ti-circle-check"></i> Estoque atualizado com sucesso!
          </p>

          <div class="action-bar">
            <button class="btn btn-primary" @click="atualizar" :disabled="!form.epi_id || loading">
              <i class="ti ti-device-floppy" aria-hidden="true"></i>
              Salvar alteração
            </button>
          </div>
        </div>
      </section>

      <!-- Grid de cards -->
      <section class="card-table">
        <div class="section-header">
          <div class="section-title-group">
            <i class="ti ti-layout-grid header-icon" aria-hidden="true"></i>
            <div>
              <p class="card-kicker">Inventário</p>
              <h3>Itens em estoque</h3>
            </div>
          </div>
          <span class="table-count">{{ estoque.length }} itens</span>
        </div>

        <div v-if="loading" class="loading-state">
          <i class="ti ti-loader-2 spin"></i> Carregando estoque...
        </div>

        <div v-else-if="estoque.length === 0" class="empty-state">
          <i class="ti ti-inbox-off empty-icon"></i>
          <span>Nenhum item encontrado no estoque.</span>
        </div>

        <div v-else class="cards-grid">
          <article v-for="item in estoque" :key="item.id_epi" class="stock-card">
            <div class="stock-card-top">
              <div class="stock-photo">
                <img v-if="item.photo" :src="item.photo" :alt="item.nome">
                <div v-else class="photo-placeholder">
                  {{ item.nome?.charAt(0) || 'E' }}
                </div>
              </div>
              <div class="stock-info">
                <p class="ca-tag">CA {{ item.numero_ca }}</p>
                <h3>{{ item.nome }}</h3>
                <span :class="badgeClass(item.estoque)">
                  <span class="status-dot"></span>
                  {{ statusLabel(item.estoque) }}
                </span>
              </div>
            </div>

            <div class="stock-meta">
              <div class="meta-item">
                <span class="meta-label">Tipo</span>
                <strong>{{ item.tipo || '—' }}</strong>
              </div>
              <div class="meta-item">
                <span class="meta-label">Fabricante</span>
                <strong>{{ item.fabricante || '—' }}</strong>
              </div>
              <div class="meta-item">
                <span class="meta-label">Validade</span>
                <strong>{{ formatarData(item.dt_validade) }}</strong>
              </div>
              <div class="meta-item">
                <span class="meta-label">Periodicidade</span>
                <strong>{{ item.periodicidade_meses ? `${item.periodicidade_meses} meses` : '—' }}</strong>
              </div>
            </div>

            <div class="stock-footer">
              <div class="stock-qty">
                <span class="meta-label">Quantidade</span>
                <strong class="qty-num">{{ item.estoque ?? 0 }}</strong>
              </div>
              <button class="btn btn-card" @click="prepararEdicao(item)">
                <i class="ti ti-pencil" aria-hidden="true"></i>
                Ajustar
              </button>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase.js'

const { supabase } = useSupabase()
const estoque = ref([])
const loading = ref(true)
const erro = ref('')
const ok = ref(false)
const form = ref({ epi_id: '', quantidade: 0 })

const estoqueBaixo = computed(() => estoque.value.filter(i => Number(i.estoque) > 0 && Number(i.estoque) < 10).length)
const semEstoque = computed(() => estoque.value.filter(i => Number(i.estoque) === 0).length)

function prepararEdicao(item) {
  form.value = { epi_id: item.id_epi, quantidade: Number(item.estoque) || 0 }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function carregar() {
  loading.value = true
  erro.value = ''
  const { data, error } = await supabase
    .from('epi')
    .select('id_epi, nome, tipo, numero_ca, fabricante, dt_validade, periodicidade_meses, estoque, photo')
    .order('nome')
  if (error) { erro.value = 'Erro ao carregar: ' + error.message; estoque.value = []; loading.value = false; return }
  estoque.value = data || []
  loading.value = false
}

async function atualizar() {
  erro.value = ''; ok.value = false
  const { error } = await supabase.from('epi').update({ estoque: Number(form.value.quantidade) }).eq('id_epi', form.value.epi_id)
  if (error) { erro.value = 'Erro: ' + error.message; return }
  ok.value = true
  form.value = { epi_id: '', quantidade: 0 }
  await carregar()
  setTimeout(() => (ok.value = false), 3000)
}

const statusLabel = (qtd) => {
  const q = Number(qtd) || 0
  if (q === 0) return 'Sem estoque'
  if (q < 10) return 'Estoque baixo'
  return 'Estoque OK'
}

const badgeClass = (qtd) => {
  const q = Number(qtd) || 0
  if (q === 0) return 'status-badge danger'
  if (q < 10) return 'status-badge warn'
  return 'status-badge ok'
}

const formatarData = (valor) => {
  if (!valor) return '—'
  const d = new Date(valor)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('pt-BR')
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
  flex-wrap: wrap;
}

.metric-card {
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  min-width: 8rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.metric-card.accent {
  background: rgba(255, 200, 80, 0.15);
  border-color: rgba(255, 200, 80, 0.25);
}

.metric-card.accent2 {
  background: rgba(255, 100, 100, 0.15);
  border-color: rgba(255, 100, 100, 0.25);
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

/* ── Buttons ── */
.action-bar {
  margin-top: 0.25rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.7rem 1.2rem;
  border-radius: 0.8rem;
  cursor: pointer;
  border: none;
  font-weight: 700;
  font-size: 0.88rem;
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

.btn-outline {
  background: #fff;
  color: #2e5a7a;
  border: 1.5px solid #ccdde8;
}

.btn-card {
  background: #f0f6fb;
  color: #1a6fa8;
  border: 1.5px solid #ccdde8;
  padding: 0.55rem 1rem;
  min-height: 2.2rem;
  font-size: 0.82rem;
}

.btn-card:hover {
  background: #e0eef8;
}

/* ── Cards grid ── */
.cards-grid {
  padding: 1.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 1rem;
}

.stock-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.1rem;
  border-radius: 1rem;
  border: 1px solid #e4edf5;
  background: #fff;
  box-shadow: 0 2px 12px rgba(10, 30, 55, 0.06);
  transition: box-shadow 0.2s, transform 0.2s;
}

.stock-card:hover {
  box-shadow: 0 8px 24px rgba(10, 30, 55, 0.11);
  transform: translateY(-2px);
}

.stock-card-top {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}

.stock-photo {
  flex-shrink: 0;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #dce8f0;
  background: #f0f6fb;
}

.stock-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a6fa8, #0d3a5e);
  color: #fff;
  font-weight: 800;
  font-size: 1.1rem;
}

.stock-info {
  flex: 1;
  min-width: 0;
}

.ca-tag {
  margin: 0 0 0.2rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1a6fa8;
}

.stock-info h3 {
  margin: 0 0 0.45rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f2a3f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Status badge ── */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: 999px;
  padding: 0.25rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 700;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.8;
}

.status-badge.ok {
  background: #e0f4ec;
  color: #1a6e45;
}

.status-badge.warn {
  background: #fff4d6;
  color: #8a6200;
}

.status-badge.danger {
  background: #fff0f0;
  color: #9a2a2a;
}

/* ── Stock meta ── */
.stock-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
  padding: 0.85rem;
  background: #f8fbfd;
  border-radius: 0.75rem;
  border: 1px solid #eef3f8;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.meta-label {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #7a95a8;
}

.meta-item strong {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f2a3f;
}

/* ── Stock footer ── */
.stock-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 0.25rem;
  border-top: 1px solid #f0f5f9;
}

.stock-qty {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.qty-num {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f2a3f;
  font-variant-numeric: tabular-nums;
  line-height: 1;
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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2.5rem;
  color: #8aa0b1;
  font-size: 0.9rem;
  text-align: center;
}

.empty-icon {
  font-size: 2rem;
  opacity: 0.4;
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
    min-width: 0;
  }

  .form-row {
    flex-direction: column;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    padding: 0.85rem;
  }
}
</style>