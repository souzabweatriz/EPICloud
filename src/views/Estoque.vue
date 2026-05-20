<template>
  <div class="layout-container">
    <header class="header-section flex-between">
      <div>
        <h1>Controle de Estoque</h1>
        <p>Gerencie o saldo e a disponibilidade de cada EPI.</p>
      </div>
      <button class="btn btn-outline flex-center" @click="carregar" :disabled="loading">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 8px;">
          <path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
        </svg>
        Atualizar
      </button>
    </header>

    <div class="card-form">
      <div class="card-header">
        <h2>Ajustar Quantidade</h2>
      </div>

      <div class="main-form">
        <div class="form-row">
          <div class="form-group">
            <label>EPI</label>
            <select v-model="form.epi_id" class="custom-select">
              <option value="">Selecione um EPI...</option>
              <option v-for="item in estoque" :key="item.id_epi" :value="item.id_epi">
                {{ item.nome }} (Atual: {{ item.estoque ?? 0 }})
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Nova Quantidade em Estoque</label>
            <input type="number" v-model.number="form.quantidade" min="0" placeholder="0" />
          </div>
        </div>

        <div class="action-bar">
          <button class="btn btn-primary" @click="atualizar" :disabled="!form.epi_id || loading">
            Salvar Alteração
          </button>
        </div>

        <p class="error-msg" v-if="erro">⚠ {{ erro }}</p>
        <p class="success-msg" v-if="ok">✓ Estoque atualizado com sucesso!</p>
      </div>
    </div>

    <div class="card-table">
      <div class="card-header flex-between">
        <h2>Itens em Estoque</h2>
        <span class="badge badge-blue">{{ estoque.length }} itens catalogados</span>
      </div>

      <div v-if="loading" class="text-center" style="padding: 2.5rem;">
        <div class="spinner"></div> Carregando estoque...
      </div>

      <div v-else>
        <div v-if="estoque.length === 0" class="empty-state">
          Nenhum item encontrado no estoque.
        </div>

        <div v-else class="cards-grid">
          <article v-for="item in estoque" :key="item.id_epi" class="stock-card">
            <div class="stock-card-head">
              <div class="stock-photo">
                <img v-if="item.photo" :src="item.photo" :alt="item.nome" />
                <div v-else class="photo-placeholder">
                  {{ item.nome?.charAt(0) || 'E' }}
                </div>
              </div>

              <div>
                <p class="card-kicker">CA {{ item.numero_ca }}</p>
                <h3>{{ item.nome }}</h3>
              </div>
              <span :class="badgeClass(item.estoque)">
                {{ item.estoque === 0 ? 'Sem estoque' : item.estoque < 10 ? 'Estoque Baixo' : 'Estoque OK' }}
              </span>
            </div>

            <div class="stock-meta">
              <div>
                <span class="meta-label">Tipo</span>
                <strong>{{ item.tipo || '—' }}</strong>
              </div>
              <div>
                <span class="meta-label">Fabricante</span>
                <strong>{{ item.fabricante || '—' }}</strong>
              </div>
              <div>
                <span class="meta-label">Validade</span>
                <strong>{{ formatarData(item.dt_validade) }}</strong>
              </div>
              <div>
                <span class="meta-label">Periodicidade</span>
                <strong>{{ item.periodicidade_meses ? `${item.periodicidade_meses} meses` : '—' }}</strong>
              </div>
            </div>

            <div class="stock-footer">
              <div>
                <span class="meta-label">Quantidade</span>
                <strong class="quantia">{{ item.estoque ?? 0 }}</strong>
              </div>
              <button class="btn btn-primary btn-card" @click="prepararEdicao(item)">
                Ajustar
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase.js'

const { supabase } = useSupabase()
const estoque = ref([])
const loading = ref(true)
const erro = ref('')
const ok = ref(false)
const form = ref({ epi_id: '', quantidade: 0 })

function prepararEdicao(item) {
  form.value = {
    epi_id: item.id_epi,
    quantidade: Number(item.estoque) || 0
  }
}

async function carregar() {
  loading.value = true
  erro.value = ''

  const { data, error } = await supabase
    .from('epi')
    .select('id_epi, nome, tipo, numero_ca, fabricante, dt_validade, periodicidade_meses, estoque, photo')
    .order('nome', { ascending: true })

  if (error) {
    erro.value = 'Erro ao carregar: ' + error.message
    estoque.value = []
    loading.value = false
    return
  }

  estoque.value = data || []
  loading.value = false
}

async function atualizar() {
  erro.value = ''
  ok.value = false

  const { error } = await supabase
    .from('epi')
    .update({
      estoque: Number(form.value.quantidade)
    })
    .eq('id_epi', form.value.epi_id)

  if (error) {
    erro.value = 'Erro: ' + error.message
    return
  }

  ok.value = true
  form.value = { epi_id: '', quantidade: 0 }
  await carregar()
  setTimeout(() => (ok.value = false), 3000)
}

function badgeClass(qtd) {
  const quantidade = Number(qtd) || 0

  if (quantidade === 0) return 'badge badge-danger'
  if (quantidade < 10) return 'badge badge-warn'
  return 'badge badge-ok'
}

function formatarData(valor) {
  if (!valor) return '—'

  const data = new Date(valor)
  if (Number.isNaN(data.getTime())) return '—'

  return data.toLocaleDateString('pt-BR')
}

onMounted(carregar)
</script>

<style scoped>
.layout-container {
  max-width: 75rem;
  width: 92%;
  margin: 2rem auto 0;
  padding: 0.8rem 1.1rem 1.8rem;
  font-family: sans-serif;
  background: #ffffff;
  min-height: 100%;
  display: flex;
  border-radius: 1rem;
  flex-direction: column;
  gap: 1rem;
}

.header-section,
.card-header,
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin: 1rem 1rem;
}

.header-section h1,
.card-header h2 {
  margin: 0;
  color: #123752;
}

.header-section p {
  margin: 0.35rem 0 0;
  color: #64748b;
}

.card-form,
.card-table {
  background: #fff;
  border: 1px solid #e5ebf2;
  border-radius: 1rem;
  box-shadow: 0 0.8rem 1.8rem rgba(15, 23, 42, 0.06);
  overflow: hidden;
}

.card-header {
  padding: 1rem 1.1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e5ebf2;
}

.main-form {
  padding: 1.1rem;
}

.form-row {
  display: flex;
  gap: 0.9rem;
  flex-wrap: wrap;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1 1 16rem;
}

label {
  color: #475569;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

input,
select {
  width: 100%;
  min-height: 2.7rem;
  padding: 0.7rem 0.85rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.7rem;
  background: #fff;
  color: #123752;
  font: inherit;
}

.action-bar {
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem;
}

.btn {
  min-height: 2.8rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-weight: 800;
}

.btn-outline {
  background: #fff;
  color: #123752;
  border: 1px solid #cbd5e1;
}

.btn-primary {
  background: linear-gradient(135deg, #123752, #2b8ac8);
  color: #fff;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cards-grid {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.stock-card {
  flex: 0 1 calc(33.333% - 0.67rem);
  max-width: calc(33.333% - 0.67rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #e5ebf2;
  background: linear-gradient(180deg, #ffffff, #f8fafc);
  box-shadow: 0 0.7rem 1.5rem rgba(15, 23, 42, 0.05);
}

.stock-card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.stock-photo {
  flex: 0 0 3.8rem;
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid #dbe6ef;
  background: #f8fafc;
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
  background: linear-gradient(135deg, #e8f3fb, #d7e9f5);
  color: #4a7fa8;
  font-weight: 900;
  font-size: 1rem;
}

.card-kicker {
  margin: 0 0 0.25rem;
  color: #2b8ac8;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stock-card h3 {
  margin: 0;
  color: #123752;
  font-size: 1.05rem;
}

.stock-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.stock-meta > div,
.stock-footer > div {
  flex: 1 1 8rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  color: #64748b;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stock-meta strong,
.stock-footer strong {
  color: #123752;
  font-size: 0.95rem;
}

.stock-footer {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
  padding-top: 0.25rem;
}

.btn-card {
  width: auto;
  min-width: 7rem;
  padding-inline: 1rem;
}

.text-bold {
  font-weight: 800;
  color: #123752;
}

.cargo-text {
  color: #64748b;
  font-size: 0.84rem;
}

.quantia {
  font-family: monospace;
  font-size: 1.05rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.7rem;
  border-radius: 999rem;
  font-size: 0.75rem;
  font-weight: 800;
}

.badge-blue {
  background: #e0f2fe;
  color: #075985;
}

.badge-ok {
  background: #dcfce7;
  color: #166534;
}

.badge-warn {
  background: #fef3c7;
  color: #92400e;
}

.badge-danger {
  background: #fee2e2;
  color: #991b1b;
}

.text-center {
  text-align: center;
}

.empty-state {
  margin: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px dashed #cbd5e1;
  text-align: center;
  color: #64748b;
  background: #f8fafc;
}

.error-msg,
.success-msg {
  margin: 0.85rem 0 0;
  padding: 0.75rem 0.85rem;
  border-radius: 0.75rem;
  font-weight: 700;
}

.error-msg {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

.success-msg {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
}

.spinner {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  border: 0.18rem solid #cbd5e1;
  border-top-color: #2b8ac8;
  display: inline-block;
  vertical-align: middle;
  animation: spin 0.8s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 760px) {
  .layout-container {
    width: 96%;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .header-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-outline {
    width: 100%;
    justify-content: center;
  }

  .form-row {
    flex-direction: column;
  }

  .action-bar {
    flex-direction: column;
  }

  .btn-primary {
    width: 100%;
  }

  .cards-grid {
    padding: 0.85rem;
  }

  .stock-card {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .stock-card-head,
  .stock-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .stock-photo {
    width: 3.2rem;
    height: 3.2rem;
  }

  .btn-card {
    width: 100%;
  }
}
</style>