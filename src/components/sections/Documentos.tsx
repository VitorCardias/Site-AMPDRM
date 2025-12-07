import React, { useState } from 'react';
import { FileText, Download, X, Loader2, AlertCircle } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { PdfDesligamento } from '../../templates/PdfDesligamento';
import { PdfDesligamentoLocacao } from '../../templates/PdfDesligamentoLocacao';
import { PdfAdmissaoPF } from '../../templates/PdfAdmissaoPF';
import { PdfAdmissaoPJ } from '../../templates/PdfAdmissaoPJ';
import { PdfAtualizacaoCadastral } from '../../templates/PdfAtualizaCadastro';

// --- MÁSCARAS ---
const masks = {
  cpf: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  },
  cnpj: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  },
  phone: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4,5})(\d{4})/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  },
  cep: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  },
  date: (value: string) => value // Datas HTML já tem máscara nativa
};

// --- VALIDAÇÕES ---
const validators = {
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  textOnly: (value: string) => /^[a-zA-ZÀ-ÿ\s]*$/.test(value),
  numberOnly: (value: string) => /^\d*$/.test(value),
};

type FieldConfig = {
  id: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'email' | 'tel';
  mask?: 'cpf' | 'cnpj' | 'phone' | 'cep';
  validation?: 'email' | 'textOnly' | 'numberOnly';
  options?: { value: string; label: string }[];
  condition?: (formData: Record<string, string>) => boolean;
  required?: boolean;
};

type DocConfig = {
  name: string;
  href: string;
  type: 'static' | 'dynamic_desligamento' | 'dynamic_locacao_pj' | 'dynamic_admissao_pf' | 'dynamic_admissao_pj' | 'dynamic_atualizacao';
  fields?: FieldConfig[];
};

export const Documentos: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<DocConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({}); // Estado para erros
  const [isGenerating, setIsGenerating] = useState(false);

  // --- CONFIGURAÇÃO DOS DOCUMENTOS COM MÁSCARAS E VALIDAÇÕES ---
  const documentos: DocConfig[] = [
    { name: 'Regulamento Interno', href: '/pdf/Regulamento_Interno.pdf', type: 'static' },
    { name: 'Estatuto Social', href: '/pdf/Estatuto.pdf', type: 'static' },
    
    // 1. DESLIGAMENTO PF
    { 
      name: 'Requerimento de Desligamento por Alienação', 
      href: '#', 
      type: 'dynamic_desligamento',
      fields: [
        { id: 'nome', label: 'Nome Completo', type: 'text', validation: 'textOnly', required: true },
        { id: 'nacionalidade', label: 'Nacionalidade', type: 'text', validation: 'textOnly', required: true },
        { id: 'estadoCivil', label: 'Estado Civil', type: 'text', validation: 'textOnly', required: true },
        { id: 'profissao', label: 'Profissão', type: 'text', validation: 'textOnly', required: true },
        { id: 'cpf', label: 'CPF', type: 'text', mask: 'cpf', required: true },
        { id: 'rg', label: 'RG', type: 'text', validation: 'numberOnly', required: true },
        { id: 'endereco', label: 'Endereço Completo', type: 'text', required: true },
        { id: 'municipio', label: 'Município', type: 'text', validation: 'textOnly', required: true },
        { id: 'cep', label: 'CEP', type: 'text', mask: 'cep', required: true },
        { id: 'ruaImovel', label: 'Rua do Imóvel Vendido', type: 'text', required: true },
        { id: 'distritoImovel', label: 'Distrito do Imóvel', type: 'text', required: true },
        { id: 'municipioImovel', label: 'Município do Imóvel', type: 'text', validation: 'textOnly', required: true },
        { id: 'matriculaImovel', label: 'Matrícula do Imóvel', type: 'text', required: true },
        { id: 'dataVenda', label: 'Data da Venda', type: 'date', required: true },
        { id: 'nomeAdquirente', label: 'Nome do Comprador', type: 'text', validation: 'textOnly', required: true },
        { id: 'estadoCivilAdquirente', label: 'Estado Civil (Comprador)', type: 'text', validation: 'textOnly' },
        { id: 'profissaoAdquirente', label: 'Profissão (Comprador)', type: 'text', validation: 'textOnly' },
        { id: 'cpfAdquirente', label: 'CPF (Comprador)', type: 'text', mask: 'cpf', required: true },
        { id: 'rgAdquirente', label: 'RG (Comprador)', type: 'text', validation: 'numberOnly' },
        { id: 'enderecoAdquirente', label: 'Endereço (Comprador)', type: 'text' },
        { id: 'municipioAdquirente', label: 'Município (Comprador)', type: 'text', validation: 'textOnly' },
        { id: 'cepAdquirente', label: 'CEP (Comprador)', type: 'text', mask: 'cep' },
        { id: 'telefoneAdquirente', label: 'Telefone (Comprador)', type: 'tel', mask: 'phone' },
        { id: 'emailAdquirente', label: 'Email (Comprador)', type: 'email', validation: 'email' },
        { 
          id: 'tipoPendencia', 
          label: 'Situação de Pendências Financeiras', 
          type: 'select',
          options: [
            { value: 'nenhuma', label: 'Não possuo pendências' },
            { value: 'com_data', label: 'Possuo pendências (Informar data de pagamento)' },
            { value: 'a_apurar', label: 'Possuo pendências (Apurar valores em 5 dias)' }
          ]
        },
        { 
          id: 'dataQuitacao', 
          label: 'Data Prevista para Quitação', 
          type: 'date',
          condition: (data) => data.tipoPendencia === 'com_data' 
        },
      ]
    },

    // 2. DESLIGAMENTO PJ
    {
      name: 'Requerimento de Desligamento por Locação (PJ)',
      href: '#',
      type: 'dynamic_locacao_pj',
      fields: [
        { id: 'razaoSocial', label: 'Razão Social (Sua Empresa)', type: 'text', required: true },
        { id: 'cnpj', label: 'CNPJ (Sua Empresa)', type: 'text', mask: 'cnpj', required: true },
        { id: 'endereco', label: 'Endereço da Sede', type: 'text', required: true },
        { id: 'municipio', label: 'Município', type: 'text', validation: 'textOnly' },
        { id: 'cep', label: 'CEP', type: 'text', mask: 'cep' },
        { id: 'ruaImovel', label: 'Rua do Imóvel Locado', type: 'text' },
        { id: 'distritoImovel', label: 'Distrito do Imóvel', type: 'text' },
        { id: 'municipioImovel', label: 'Município do Imóvel', type: 'text', validation: 'textOnly' },
        { id: 'matriculaImovel', label: 'Matrícula do Imóvel', type: 'text' },
        { id: 'dataInicioLocacao', label: 'Início da Locação', type: 'date', required: true },
        { id: 'razaoSocialLocatario', label: 'Razão Social (Locatário)', type: 'text', required: true },
        { id: 'cnpjLocatario', label: 'CNPJ (Locatário)', type: 'text', mask: 'cnpj', required: true },
        { id: 'enderecoLocatario', label: 'Endereço (Locatário)', type: 'text' },
        { id: 'municipioLocatario', label: 'Município (Locatário)', type: 'text', validation: 'textOnly' },
        { id: 'cepLocatario', label: 'CEP (Locatário)', type: 'text', mask: 'cep' },
        { id: 'telefoneLocatario', label: 'Telefone (Locatário)', type: 'tel', mask: 'phone' },
        { id: 'emailLocatario', label: 'Email (Locatário)', type: 'email', validation: 'email' },
      ]
    },

    // 3. ADMISSÃO PF
    {
      name: 'Requerimento de Ingresso/Permanência (PF)',
      href: '#',
      type: 'dynamic_admissao_pf',
      fields: [
        { id: 'nome', label: 'Nome Completo', type: 'text', validation: 'textOnly', required: true },
        { id: 'nacionalidade', label: 'Nacionalidade', type: 'text', validation: 'textOnly' },
        { id: 'estadoCivil', label: 'Estado Civil', type: 'text', validation: 'textOnly' },
        { id: 'profissao', label: 'Profissão', type: 'text', validation: 'textOnly' },
        { id: 'cpf', label: 'CPF', type: 'text', mask: 'cpf', required: true },
        { id: 'rg', label: 'RG', type: 'text', validation: 'numberOnly' },
        { id: 'endereco', label: 'Endereço Completo', type: 'text' },
        { id: 'municipio', label: 'Município', type: 'text', validation: 'textOnly' },
        { id: 'cep', label: 'CEP', type: 'text', mask: 'cep' },
        { id: 'telefone', label: 'Telefone', type: 'tel', mask: 'phone', required: true },
        { id: 'email', label: 'Email', type: 'email', validation: 'email', required: true },
        { 
            id: 'tipoVinculo', 
            label: 'Tipo de Vínculo', 
            type: 'select',
            required: true,
            options: [
                { value: 'proprietario', label: 'Proprietário de Imóvel' },
                { value: 'morador', label: 'Morador' },
                { value: 'locatario', label: 'Locatário' },
                { value: 'empresario', label: 'Empresário no Distrito' }
            ]
        },
        { id: 'dataInicioVinculo', label: 'Vínculo desde (Data)', type: 'date', required: true },
      ]
    },

    // 4. ADMISSÃO PJ
    {
      name: 'Requerimento de Ingresso/Permanência (PJ)',
      href: '#',
      type: 'dynamic_admissao_pj',
      fields: [
        { id: 'razaoSocial', label: 'Razão Social (Empresa)', type: 'text', required: true },
        { id: 'cnpj', label: 'CNPJ', type: 'text', mask: 'cnpj', required: true },
        { id: 'endereco', label: 'Endereço da Sede', type: 'text' },
        { id: 'municipio', label: 'Município', type: 'text', validation: 'textOnly' },
        { id: 'cep', label: 'CEP', type: 'text', mask: 'cep' },
        { id: 'telefone', label: 'Telefone', type: 'tel', mask: 'phone', required: true },
        { id: 'email', label: 'Email', type: 'email', validation: 'email', required: true },
        { 
            id: 'tipoVinculo', 
            label: 'Tipo de Vínculo', 
            type: 'select',
            required: true,
            options: [
                { value: 'proprietario', label: 'Proprietário de Imóvel' },
                { value: 'morador', label: 'Morador' },
                { value: 'locatario', label: 'Locatário' },
                { value: 'empresario', label: 'Empresário no Distrito' }
            ]
        },
        { id: 'dataInicioVinculo', label: 'Vínculo desde (Data)', type: 'date', required: true },
      ]
    },

    // 5. ATUALIZAÇÃO CADASTRAL
    {
      name: 'Declaração de Atualização Cadastral',
      href: '#',
      type: 'dynamic_atualizacao',
      fields: [
        { id: 'nome', label: 'Nome do Associado', type: 'text', validation: 'textOnly', required: true },
        { id: 'cpf', label: 'CPF', type: 'text', mask: 'cpf', required: true },
        { id: 'telefone', label: 'Telefone (WhatsApp)', type: 'tel', mask: 'phone', required: true },
        { id: 'email', label: 'E-mail Atualizado', type: 'email', validation: 'email', required: true },
      ]
    }
  ];

  const handleDocClick = (e: React.MouseEvent, doc: DocConfig) => {
    if (doc.type !== 'static') {
      e.preventDefault();
      setFormData({});
      setFormErrors({}); 
      setSelectedDoc(doc);
    }
  };

  const handleInputChange = (id: string, rawValue: string, mask?: FieldConfig['mask']) => {
    let value = rawValue;

    // Aplica máscara se existir
    if (mask && masks[mask]) {
      value = masks[mask](rawValue);
    }

    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Limpa erro ao digitar
    if (formErrors[id]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    if (!selectedDoc?.fields) return true;
    
    const newErrors: Record<string, string> = {};
    let isValid = true;

    selectedDoc.fields.forEach(field => {
      // Pula validação se o campo estiver oculto (conditional)
      if (field.condition && !field.condition(formData)) return;

      const value = formData[field.id] || '';

      // 1. Validação de Obrigatório
      if (field.required && !value.trim()) {
        newErrors[field.id] = 'Este campo é obrigatório.';
        isValid = false;
      } 
      // 2. Validações Específicas (apenas se tiver valor)
      else if (value && field.validation) {
        if (field.validation === 'email' && !validators.email(value)) {
          newErrors[field.id] = 'Formato de e-mail inválido.';
          isValid = false;
        }
        if (field.validation === 'textOnly' && !validators.textOnly(value)) {
          newErrors[field.id] = 'Use apenas letras.';
          isValid = false;
        }
        if (field.validation === 'numberOnly' && !validators.numberOnly(value)) {
          newErrors[field.id] = 'Use apenas números.';
          isValid = false;
        }
      }
      // 3. Validação de Tamanho mínimo para máscaras (opcional, mas bom UX)
      if (value && field.mask === 'cpf' && value.length < 14) {
        newErrors[field.id] = 'CPF incompleto.';
        isValid = false;
      }
      if (value && field.mask === 'cnpj' && value.length < 18) {
        newErrors[field.id] = 'CNPJ incompleto.';
        isValid = false;
      }
    });

    setFormErrors(newErrors);
    return isValid;
  };

  const generateDynamicPdf = async () => {
    if (!selectedDoc) return;
    
    // Roda validação antes de gerar
    if (!validateForm()) {
      return; 
    }

    setIsGenerating(true);

    try {
      let blob: Blob | null = null;

      // ... (LÓGICA DE GERAÇÃO IGUAL AO ANTERIOR) ...
      // 1. DESLIGAMENTO PF
      if (selectedDoc.type === 'dynamic_desligamento') {
        const dados = {
            nome: formData.nome,
            nacionalidade: formData.nacionalidade,
            estadoCivil: formData.estadoCivil,
            profissao: formData.profissao,
            cpf: formData.cpf,
            rg: formData.rg,
            endereco: formData.endereco,
            municipio: formData.municipio,
            cep: formData.cep,
            ruaImovel: formData.ruaImovel,
            distritoImovel: formData.distritoImovel,
            municipioImovel: formData.municipioImovel,
            matriculaImovel: formData.matriculaImovel,
            dataVenda: formData.dataVenda,
            nomeAdquirente: formData.nomeAdquirente,
            estadoCivilAdquirente: formData.estadoCivilAdquirente,
            profissaoAdquirente: formData.profissaoAdquirente,
            cpfAdquirente: formData.cpfAdquirente,
            rgAdquirente: formData.rgAdquirente,
            enderecoAdquirente: formData.enderecoAdquirente,
            municipioAdquirente: formData.municipioAdquirente,
            cepAdquirente: formData.cepAdquirente,
            telefoneAdquirente: formData.telefoneAdquirente,
            emailAdquirente: formData.emailAdquirente,
            tipoPendencia: (formData.tipoPendencia || 'nenhuma') as 'nenhuma' | 'com_data' | 'a_apurar',
            dataQuitacao: formData.dataQuitacao
        };
        blob = await pdf(<PdfDesligamento data={dados} />).toBlob();
      } 
      
      // 2. DESLIGAMENTO PJ
      else if (selectedDoc.type === 'dynamic_locacao_pj') {
        const dadosLocacao = {
          razaoSocial: formData.razaoSocial,
          cnpj: formData.cnpj,
          endereco: formData.endereco,
          municipio: formData.municipio,
          cep: formData.cep,
          ruaImovel: formData.ruaImovel,
          distritoImovel: formData.distritoImovel,
          municipioImovel: formData.municipioImovel,
          matriculaImovel: formData.matriculaImovel,
          dataInicioLocacao: formData.dataInicioLocacao,
          razaoSocialLocatario: formData.razaoSocialLocatario,
          cnpjLocatario: formData.cnpjLocatario,
          enderecoLocatario: formData.enderecoLocatario,
          municipioLocatario: formData.municipioLocatario,
          cepLocatario: formData.cepLocatario,
          telefoneLocatario: formData.telefoneLocatario,
          emailLocatario: formData.emailLocatario,
        };
        blob = await pdf(<PdfDesligamentoLocacao data={dadosLocacao} />).toBlob();
      }

      // 3. ADMISSÃO PF
      else if (selectedDoc.type === 'dynamic_admissao_pf') {
        const dadosAdmissao = {
            nome: formData.nome,
            nacionalidade: formData.nacionalidade,
            estadoCivil: formData.estadoCivil,
            profissao: formData.profissao,
            cpf: formData.cpf,
            rg: formData.rg,
            endereco: formData.endereco,
            municipio: formData.municipio,
            cep: formData.cep,
            telefone: formData.telefone,
            email: formData.email,
            tipoVinculo: (formData.tipoVinculo || 'morador') as 'morador' | 'proprietario' | 'locatario' | 'empresario',
            dataInicioVinculo: formData.dataInicioVinculo
        };
        blob = await pdf(<PdfAdmissaoPF data={dadosAdmissao} />).toBlob();
      }

      // 4. ADMISSÃO PJ
      else if (selectedDoc.type === 'dynamic_admissao_pj') {
        const dadosAdmissaoPJ = {
            razaoSocial: formData.razaoSocial,
            cnpj: formData.cnpj,
            endereco: formData.endereco,
            municipio: formData.municipio,
            cep: formData.cep,
            telefone: formData.telefone,
            email: formData.email,
            tipoVinculo: (formData.tipoVinculo || 'empresario') as 'empresario' | 'proprietario' | 'locatario' | 'morador',
            dataInicioVinculo: formData.dataInicioVinculo
        };
        blob = await pdf(<PdfAdmissaoPJ data={dadosAdmissaoPJ} />).toBlob();
      }

      // 5. ATUALIZAÇÃO CADASTRAL
      else if (selectedDoc.type === 'dynamic_atualizacao') {
        const dadosAtualizacao = {
            nome: formData.nome,
            cpf: formData.cpf,
            telefone: formData.telefone,
            email: formData.email
        };
        blob = await pdf(<PdfAtualizacaoCadastral data={dadosAtualizacao} />).toBlob();
      }

      if (blob) {
        saveAs(blob, `${selectedDoc.name.replace(/\s+/g, '_')}.pdf`);
        setSelectedDoc(null);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id='documentos' className="py-20 bg-light-bg relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-green mb-4">
              Canais para Envio de Documentos:
            </h2>
            <p className="text-lg text-gray-600">
              Acesse e preencha os principais documentos da associação automaticamente.
            </p>
            <ul className="mt-6 text-gray-700 list list-inside space-y-2">
                <li><strong>Email:</strong> <a href="mailto:amrm@recantomaestro.com.br">amrm@recantomaestro.com.br</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/555596803636" target="_blank" rel="noopener noreferrer">(55) 9680-3636</a></li>
            </ul>
          </div>
         <div className="space-y-4">
            {documentos.map((doc) => (
              <a 
                key={doc.name}
                href={doc.href}
                onClick={(e) => handleDocClick(e, doc)}
                target={doc.type === 'static' ? "_blank" : undefined}
                className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <FileText className="w-6 h-6 text-accent-gold" />
                  <span className="text-gray-700 font-medium">{doc.name}</span>
                </div>
                <Download className="w-6 h-6 text-gray-400" />
              </a>
            ))}
         </div>
        </div> 
      </div>

      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-green-700 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">{selectedDoc.name}</h3>
              <button onClick={() => setSelectedDoc(null)}><X size={24} /></button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {selectedDoc.fields?.map((field) => {
                if (field.condition && !field.condition(formData)) return null;

                return (
                  <div key={field.id} className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    
                    {field.type === 'select' ? (
                      <select 
                        className={`border rounded p-2 outline-none focus:border-green-500 ${formErrors[field.id] ? 'border-red-500' : 'border-gray-300'}`}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        value={formData[field.id] || ''}
                      >
                        <option value="">Selecione...</option>
                        {field.options?.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        className={`border rounded p-2 outline-none focus:border-green-500 ${formErrors[field.id] ? 'border-red-500' : 'border-gray-300'}`}
                        // AQUI É APLICADA A MÁSCARA AUTOMATICAMENTE
                        onChange={(e) => handleInputChange(field.id, e.target.value, field.mask)}
                        value={formData[field.id] || ''}
                        // Limitar tamanho máximo para campos mascarados
                        maxLength={field.mask === 'cpf' ? 14 : field.mask === 'cnpj' ? 18 : field.mask === 'phone' ? 15 : undefined}
                        placeholder={field.mask === 'phone' ? '(99) 99999-9999' : ''}
                      />
                    )}
                    
                    {/* EXIBE MENSAGEM DE ERRO SE HOUVER */}
                    {formErrors[field.id] && (
                      <span className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {formErrors[field.id]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button 
                onClick={generateDynamicPdf}
                disabled={isGenerating}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="animate-spin" /> : <Download />}
                {isGenerating ? "Gerando..." : "Baixar PDF"}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
};