import React, { useState } from 'react';
import { Menu, X, Plus, Search, Users, Wrench, Package, DollarSign, Calendar, Droplet, LayoutDashboard, ChevronLeft, Phone, Car, Trash2, Bell } from 'lucide-react';

const initialClientes = [
  { id: 1, nome: 'Marcos Silva', telefone: '(11) 98221-3344', placa: 'FZK-1A22', modelo: 'Onix 2021' },
  { id: 2, nome: 'Renata Alves', telefone: '(11) 97733-1290', placa: 'RTB-9D01', modelo: 'HB20 2019' },
  { id: 3, nome: 'Diego Nunes', telefone: '(11) 91122-4455', placa: 'PLK-3C77', modelo: 'Compass 2022' },
];

const servicos = [
  { id: 1, nome: 'Lavagem completa', duracao: 60, preco: 80 },
  { id: 2, nome: 'Polimento técnico', duracao: 180, preco: 350 },
  { id: 3, nome: 'Higienização interna', duracao: 90, preco: 150 },
];

const initialAgendamentos = [
  { id: 1, clienteId: 1, servicoId: 1, data: '2026-08-18', hora: '09:00', obs: '' },
  { id: 2, clienteId: 2, servicoId: 2, data: '2026-08-18', hora: '11:00', obs: 'Cliente pediu atenção no capô' },
  { id: 3, clienteId: 3, servicoId: 3, data: '2026-08-18', hora: '14:30', obs: '' },
];

const produtos = [
  { id: 1, nome: 'Shampoo automotivo', proporcao: '1:40', estoque: 2.4, minimo: 1 },
  { id: 2, nome: 'Cera de polimento', proporcao: '1:10', estoque: 0.6, minimo: 1 },
  { id: 3, nome: 'APC multiuso', proporcao: '1:100', estoque: 3.1, minimo: 1.5 },
];

const menuItems = [
  { id: 'dashboard', label: 'Painel', icon: LayoutDashboard },
  { id: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'servicos', label: 'Serviços', icon: Wrench },
  { id: 'diluicao', label: 'Diluição', icon: Droplet },
  { id: 'estoque', label: 'Estoque', icon: Package },
  { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
  { id: 'busca', label: 'Buscar', icon: Search },
];

const screenTitles = {
  dashboard: 'Painel',
  agenda: 'Agenda',
  clientes: 'Clientes',
  servicos: 'Serviços',
  diluicao: 'Cálculo de diluição',
  estoque: 'Estoque',
  financeiro: 'Financeiro',
  busca: 'Buscar',
};

function TopBar({ title, onMenu, onAdd, onBack }) {
  return (
    <div className="flex items-center justify-between px-4 h-14 bg-slate-900 text-white shrink-0">
      <div className="flex items-center gap-3">
        {onBack ? (
          <button onClick={onBack} aria-label="Voltar" className="p-1">
            <ChevronLeft size={22} />
          </button>
        ) : (
          <button onClick={onMenu} aria-label="Abrir menu" className="p-1">
            <Menu size={22} />
          </button>
        )}
        <span className="text-base font-medium">{title}</span>
      </div>
      {onAdd && (
        <button onClick={onAdd} aria-label="Adicionar" className="p-1.5 rounded-full bg-amber-500 text-slate-900">
          <Plus size={18} />
        </button>
      )}
    </div>
  );
}

function Sidebar({ open, onClose, screen, onSelect }) {
  return (
    <>
      {open && (
        <div
          className="absolute inset-0 z-20"
          style={{ backgroundColor: 'rgba(15,23,42,0.55)' }}
          onClick={onClose}
        />
      )}
      <div
        className="absolute top-0 left-0 h-full w-64 bg-white z-30 transition-transform duration-200 flex flex-col"
        style={{ transform: open ? 'translateX(0)' : 'translateX(-105%)' }}
      >
        <div className="h-14 flex items-center justify-between px-4 bg-slate-900 text-white shrink-0">
          <span className="font-medium">Estética Auto</span>
          <button onClick={onClose} aria-label="Fechar menu"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = screen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
                style={{ backgroundColor: active ? '#fef3c7' : 'transparent' }}
              >
                <Icon size={18} color={active ? '#92400e' : '#475569'} />
                <span className={active ? 'text-amber-900 font-medium' : 'text-slate-600'} style={{ fontSize: 14 }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ModalShell({ title, onClose, children }) {
  return (
    <div
      className="absolute inset-0 z-40 flex items-end justify-center"
      style={{ backgroundColor: 'rgba(15,23,42,0.5)' }}
    >
      <div className="w-full bg-white rounded-t-2xl p-5 max-h-full overflow-y-auto" style={{ maxHeight: '85%' }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-medium text-slate-900">{title}</span>
          <button onClick={onClose} aria-label="Fechar"><X size={20} color="#475569" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-slate-500 mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputClass = 'w-full h-10 px-3 rounded-lg border border-slate-300 text-sm text-slate-900';

export default function App() {
  const [screen, setScreen] = useState('agenda');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clientes, setClientes] = useState(initialClientes);
  const [agendamentos, setAgendamentos] = useState(initialAgendamentos);

  const [agendaModal, setAgendaModal] = useState(null);
  const [clienteModal, setClienteModal] = useState(null);

  const goTo = (id) => {
    setScreen(id);
    setSidebarOpen(false);
  };

  const clienteNome = (id) => clientes.find((c) => c.id === id)?.nome || '—';
  const servicoNome = (id) => servicos.find((s) => s.id === id)?.nome || '—';

  const openNovoAgendamento = () =>
    setAgendaModal({ id: null, clienteId: clientes[0]?.id || '', servicoId: servicos[0]?.id || '', data: '2026-08-18', hora: '10:00', obs: '' });
  const openEditAgendamento = (ag) => setAgendaModal({ ...ag });

  const salvarAgendamento = () => {
    if (!agendaModal.clienteId || !agendaModal.data || !agendaModal.hora) return;
    if (agendaModal.id) {
      setAgendamentos((prev) => prev.map((a) => (a.id === agendaModal.id ? agendaModal : a)));
    } else {
      setAgendamentos((prev) => [...prev, { ...agendaModal, id: Date.now() }]);
    }
    setAgendaModal(null);
  };

  const excluirAgendamento = () => {
    setAgendamentos((prev) => prev.filter((a) => a.id !== agendaModal.id));
    setAgendaModal(null);
  };

  const openNovoCliente = () => setClienteModal({ id: null, nome: '', telefone: '', placa: '', modelo: '' });
  const salvarCliente = () => {
    if (!clienteModal.nome || !clienteModal.telefone) return;
    if (clienteModal.id) {
      setClientes((prev) => prev.map((c) => (c.id === clienteModal.id ? clienteModal : c)));
    } else {
      setClientes((prev) => [...prev, { ...clienteModal, id: Date.now() }]);
    }
    setClienteModal(null);
  };

  const screenAddHandler = { agenda: openNovoAgendamento, clientes: openNovoCliente }[screen];

  return (
    <div className="flex justify-center py-4" style={{ background: 'var(--surface-0, #f1f5f9)' }}>
      <div className="relative w-full bg-slate-50 overflow-hidden rounded-2xl border border-slate-300" style={{ maxWidth: 380, height: 680 }}>
        <TopBar
          title={screenTitles[screen]}
          onMenu={() => setSidebarOpen(true)}
          onAdd={screenAddHandler}
        />

        <div className="overflow-y-auto" style={{ height: 'calc(100% - 56px)' }}>
          {screen === 'dashboard' && <DashboardScreen agendamentos={agendamentos} produtos={produtos} />}
          {screen === 'agenda' && (
            <AgendaScreen
              agendamentos={agendamentos}
              clienteNome={clienteNome}
              servicoNome={servicoNome}
              onSelect={openEditAgendamento}
            />
          )}
          {screen === 'clientes' && (
            <ClientesScreen clientes={clientes} onSelect={(c) => setClienteModal({ ...c })} onAdd={openNovoCliente} />
          )}
          {screen === 'servicos' && <ServicosScreen />}
          {screen === 'diluicao' && <DiluicaoScreen />}
          {screen === 'estoque' && <EstoqueScreen produtos={produtos} />}
          {screen === 'financeiro' && <FinanceiroScreen agendamentos={agendamentos} servicoNome={servicoNome} />}
          {screen === 'busca' && <BuscaScreen clientes={clientes} />}
        </div>

        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} screen={screen} onSelect={goTo} />

        {agendaModal && (
          <ModalShell title={agendaModal.id ? 'Editar agendamento' : 'Novo agendamento'} onClose={() => setAgendaModal(null)}>
            <Field label="Cliente">
              <select className={inputClass} value={agendaModal.clienteId} onChange={(e) => setAgendaModal({ ...agendaModal, clienteId: Number(e.target.value) })}>
                {clientes.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </Field>
            <Field label="Serviço">
              <select className={inputClass} value={agendaModal.servicoId} onChange={(e) => setAgendaModal({ ...agendaModal, servicoId: Number(e.target.value) })}>
                {servicos.map((s) => <option key={s.id} value={s.id}>{s.nome} · R$ {s.preco}</option>)}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Data">
                <input type="date" className={inputClass} value={agendaModal.data} onChange={(e) => setAgendaModal({ ...agendaModal, data: e.target.value })} />
              </Field>
              <Field label="Hora">
                <input type="time" className={inputClass} value={agendaModal.hora} onChange={(e) => setAgendaModal({ ...agendaModal, hora: e.target.value })} />
              </Field>
            </div>
            <Field label="Observações">
              <textarea className={inputClass} style={{ height: 70, paddingTop: 8 }} value={agendaModal.obs} onChange={(e) => setAgendaModal({ ...agendaModal, obs: e.target.value })} />
            </Field>
            <div className="flex gap-2 mt-4">
              {agendaModal.id && (
                <button onClick={excluirAgendamento} className="flex items-center justify-center gap-1 h-11 px-4 rounded-lg border border-red-300 text-red-600 text-sm">
                  <Trash2 size={16} /> Excluir
                </button>
              )}
              <button onClick={salvarAgendamento} className="flex-1 h-11 rounded-lg bg-amber-500 text-slate-900 text-sm font-medium">
                Salvar
              </button>
            </div>
          </ModalShell>
        )}

        {clienteModal && (
          <ModalShell title={clienteModal.id ? 'Editar cliente' : 'Cadastrar cliente'} onClose={() => setClienteModal(null)}>
            <Field label="Nome">
              <input className={inputClass} value={clienteModal.nome} onChange={(e) => setClienteModal({ ...clienteModal, nome: e.target.value })} placeholder="Nome do cliente" />
            </Field>
            <Field label="Telefone">
              <input className={inputClass} value={clienteModal.telefone} onChange={(e) => setClienteModal({ ...clienteModal, telefone: e.target.value })} placeholder="(11) 90000-0000" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Placa">
                <input className={inputClass} value={clienteModal.placa} onChange={(e) => setClienteModal({ ...clienteModal, placa: e.target.value })} placeholder="ABC-1D23" />
              </Field>
              <Field label="Modelo">
                <input className={inputClass} value={clienteModal.modelo} onChange={(e) => setClienteModal({ ...clienteModal, modelo: e.target.value })} placeholder="Onix 2021" />
              </Field>
            </div>
            <button onClick={salvarCliente} className="w-full h-11 rounded-lg bg-amber-500 text-slate-900 text-sm font-medium mt-4">
              Salvar cliente
            </button>
          </ModalShell>
        )}
      </div>
    </div>
  );
}

function DashboardScreen({ agendamentos, produtos }) {
  const hoje = agendamentos.length;
  const faturamento = 420;
  const baixo = produtos.filter((p) => p.estoque <= p.minimo);
  return (
    <div className="p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <p className="text-xs text-slate-500">Agendamentos hoje</p>
          <p className="text-xl font-medium text-slate-900 mt-1">{hoje}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-3">
          <p className="text-xs text-slate-500">Faturamento hoje</p>
          <p className="text-xl font-medium text-slate-900 mt-1">R$ {faturamento}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Bell size={16} color="#b45309" />
          <p className="text-sm font-medium text-slate-900">Produtos em baixa</p>
        </div>
        {baixo.length === 0 && <p className="text-xs text-slate-500">Nenhum alerta no momento.</p>}
        {baixo.map((p) => (
          <p key={p.id} className="text-xs text-slate-600 py-1">{p.nome} · {p.estoque}L restantes</p>
        ))}
      </div>
    </div>
  );
}

function AgendaScreen({ agendamentos, clienteNome, servicoNome, onSelect }) {
  const ordenados = [...agendamentos].sort((a, b) => a.hora.localeCompare(b.hora));
  return (
    <div className="p-4 space-y-2">
      <p className="text-xs text-slate-500 mb-1">Terça-feira, 18 de agosto</p>
      {ordenados.map((ag) => (
        <button
          key={ag.id}
          onClick={() => onSelect(ag)}
          className="w-full text-left bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-3"
        >
          <div className="w-14 text-sm font-medium text-slate-900">{ag.hora}</div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">{clienteNome(ag.clienteId)}</p>
            <p className="text-xs text-slate-500">{servicoNome(ag.servicoId)}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function ClientesScreen({ clientes, onSelect, onAdd }) {
  return (
    <div className="p-4 space-y-2">
      <button onClick={onAdd} className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-amber-500 text-slate-900 text-sm font-medium mb-2">
        <Plus size={16} /> Cadastrar novo cliente
      </button>
      {clientes.map((c) => (
        <button key={c.id} onClick={() => onSelect(c)} className="w-full text-left bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <Users size={16} color="#475569" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">{c.nome}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1"><Phone size={11} />{c.telefone}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 flex items-center gap-1"><Car size={11} />{c.placa}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function ServicosScreen() {
  return (
    <div className="p-4 space-y-2">
      {servicos.map((s) => (
        <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900">{s.nome}</p>
            <p className="text-xs text-slate-500">{s.duracao} min</p>
          </div>
          <p className="text-sm font-medium text-slate-900">R$ {s.preco}</p>
        </div>
      ))}
    </div>
  );
}

function DiluicaoScreen() {
  const [produto, setProduto] = useState(produtos[0].id);
  const [volume, setVolume] = useState(5);
  const p = produtos.find((x) => x.id === produto);
  const parte = Number(p.proporcao.split(':')[1]);
  const qtdProduto = (volume / (parte + 1)).toFixed(2);
  const qtdAgua = (volume - qtdProduto).toFixed(2);
  return (
    <div className="p-4 space-y-3">
      <div className="bg-white rounded-xl border border-slate-200 p-3">
        <Field label="Produto">
          <select className={inputClass} value={produto} onChange={(e) => setProduto(Number(e.target.value))}>
            {produtos.map((x) => <option key={x.id} value={x.id}>{x.nome} · {x.proporcao}</option>)}
          </select>
        </Field>
        <Field label="Volume final desejado (L)">
          <input type="number" className={inputClass} value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
        </Field>
      </div>
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-3">
        <p className="text-xs text-amber-800 mb-1">Resultado do cálculo</p>
        <p className="text-sm text-amber-900">Produto: <span className="font-medium">{qtdProduto} L</span></p>
        <p className="text-sm text-amber-900">Água: <span className="font-medium">{qtdAgua} L</span></p>
      </div>
    </div>
  );
}

function EstoqueScreen({ produtos }) {
  return (
    <div className="p-4 space-y-2">
      {produtos.map((p) => {
        const baixo = p.estoque <= p.minimo;
        return (
          <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">{p.nome}</p>
              <p className="text-xs text-slate-500">Diluição {p.proporcao}</p>
            </div>
            <p className={'text-sm font-medium ' + (baixo ? 'text-red-600' : 'text-slate-900')}>{p.estoque} L</p>
          </div>
        );
      })}
    </div>
  );
}

function FinanceiroScreen({ agendamentos, servicoNome }) {
  const total = agendamentos.reduce((acc, ag) => acc + (servicos.find((s) => s.id === ag.servicoId)?.preco || 0), 0);
  return (
    <div className="p-4 space-y-2">
      <div className="bg-white rounded-xl border border-slate-200 p-3 mb-2">
        <p className="text-xs text-slate-500">Receita prevista hoje</p>
        <p className="text-xl font-medium text-slate-900 mt-1">R$ {total}</p>
      </div>
      {agendamentos.map((ag) => (
        <div key={ag.id} className="bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-between">
          <p className="text-sm text-slate-900">{servicoNome(ag.servicoId)}</p>
          <p className="text-sm text-green-700">+ R$ {servicos.find((s) => s.id === ag.servicoId)?.preco}</p>
        </div>
      ))}
    </div>
  );
}

function BuscaScreen({ clientes }) {
  const [q, setQ] = useState('');
  const filtrados = clientes.filter((c) => c.nome.toLowerCase().includes(q.toLowerCase()) || c.placa.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="p-4 space-y-2">
      <input className={inputClass} placeholder="Buscar por nome ou placa" value={q} onChange={(e) => setQ(e.target.value)} />
      {filtrados.map((c) => (
        <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-3">
          <p className="text-sm font-medium text-slate-900">{c.nome}</p>
          <p className="text-xs text-slate-500">{c.placa} · {c.modelo}</p>
        </div>
      ))}
    </div>
  );
}
