import React, { useState } from 'react';
import { FileText, Download, X, Loader2 } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { PdfDesligamento } from '../../templates/PdfDesligamento';
import { PdfDesligamentoLocacao } from '../../templates/PdfDesligamentoLocacao';

type FieldConfig = {
  id: string;
  label: string;
  type: 'text' | 'date' | 'select';
  options?: { value: string; label: string }[];
  condition?: (formData: Record<string, string>) => boolean;
};

type DocConfig = {
  name: string;
  href: string;
  type: 'static' | 'dynamic_desligamento' | 'dynamic_locacao_pj';
  fields?: FieldConfig[];
};

export const Documentos: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<DocConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const documentos: DocConfig[] = [
    { name: 'Regulamento Interno', href: '/pdf/Regulamento_Interno.pdf', type: 'static' },
    { name: 'Estatuto Social', href: '/pdf/Estatuto.pdf', type: 'static' },
    
    // 1. DESLIGAMENTO POR ALIENAÇÃO (PF)
    { 
      name: 'Requerimento de Desligamento por Alienação', 
      href: '#', 
      type: 'dynamic_desligamento',
      fields: [
        { id: 'nome', label: 'Nome Completo', type: 'text' },
        { id: 'nacionalidade', label: 'Nacionalidade', type: 'text' },
        { id: 'estadoCivil', label: 'Estado Civil', type: 'text' },
        { id: 'profissao', label: 'Profissão', type: 'text' },
        { id: 'cpf', label: 'CPF', type: 'text' },
        { id: 'rg', label: 'RG', type: 'text' },
        { id: 'endereco', label: 'Endereço Completo', type: 'text' },
        { id: 'municipio', label: 'Município', type: 'text' },
        { id: 'cep', label: 'CEP', type: 'text' },
        { id: 'ruaImovel', label: 'Rua do Imóvel Vendido', type: 'text' },
        { id: 'distritoImovel', label: 'Distrito do Imóvel', type: 'text' },
        { id: 'municipioImovel', label: 'Município do Imóvel', type: 'text' },
        { id: 'matriculaImovel', label: 'Matrícula do Imóvel', type: 'text' },
        { id: 'dataVenda', label: 'Data da Venda', type: 'date' },
        { id: 'nomeAdquirente', label: 'Nome do Comprador', type: 'text' },
        { id: 'estadoCivilAdquirente', label: 'Estado Civil (Comprador)', type: 'text' },
        { id: 'profissaoAdquirente', label: 'Profissão (Comprador)', type: 'text' },
        { id: 'cpfAdquirente', label: 'CPF (Comprador)', type: 'text' },
        { id: 'rgAdquirente', label: 'RG (Comprador)', type: 'text' },
        { id: 'enderecoAdquirente', label: 'Endereço (Comprador)', type: 'text' },
        { id: 'municipioAdquirente', label: 'Município (Comprador)', type: 'text' },
        { id: 'cepAdquirente', label: 'CEP (Comprador)', type: 'text' },
        { id: 'telefoneAdquirente', label: 'Telefone (Comprador)', type: 'text' },
        { id: 'emailAdquirente', label: 'Email (Comprador)', type: 'text' },
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

    // 2. NOVO DOCUMENTO: DESLIGAMENTO POR LOCAÇÃO (PJ)
    {
      name: 'Requerimento de Desligamento por Locação (PJ)',
      href: '#',
      type: 'dynamic_locacao_pj',
      fields: [
        // Comunicante (Empresa)
        { id: 'razaoSocial', label: 'Razão Social (Sua Empresa)', type: 'text' },
        { id: 'cnpj', label: 'CNPJ (Sua Empresa)', type: 'text' },
        { id: 'endereco', label: 'Endereço da Sede', type: 'text' },
        { id: 'municipio', label: 'Município', type: 'text' },
        { id: 'cep', label: 'CEP', type: 'text' },

        // Imóvel
        { id: 'ruaImovel', label: 'Rua do Imóvel Locado', type: 'text' },
        { id: 'distritoImovel', label: 'Distrito do Imóvel', type: 'text' },
        { id: 'municipioImovel', label: 'Município do Imóvel', type: 'text' },
        { id: 'matriculaImovel', label: 'Matrícula do Imóvel', type: 'text' },
        { id: 'dataInicioLocacao', label: 'Início da Locação', type: 'date' },

        // Locatário (Inquilino PJ)
        { id: 'razaoSocialLocatario', label: 'Razão Social (Locatário)', type: 'text' },
        { id: 'cnpjLocatario', label: 'CNPJ (Locatário)', type: 'text' },
        { id: 'enderecoLocatario', label: 'Endereço (Locatário)', type: 'text' },
        { id: 'municipioLocatario', label: 'Município (Locatário)', type: 'text' },
        { id: 'cepLocatario', label: 'CEP (Locatário)', type: 'text' },
        { id: 'telefoneLocatario', label: 'Telefone (Locatário)', type: 'text' },
        { id: 'emailLocatario', label: 'Email (Locatário)', type: 'text' },
      ]
    }
  ];

  const handleDocClick = (e: React.MouseEvent, doc: DocConfig) => {
    if (doc.type !== 'static') {
      e.preventDefault();
      setFormData({}); 
      setSelectedDoc(doc);
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const generateDynamicPdf = async () => {
    if (!selectedDoc) return;
    setIsGenerating(true);

    try {
      let blob: Blob | null = null;

      // LÓGICA 1: DESLIGAMENTO ALIENAÇÃO (PF)
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
      
      // LÓGICA 2: DESLIGAMENTO LOCAÇÃO (PJ)
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

      if (blob) {
        saveAs(blob, `${selectedDoc.name.replace(/\s+/g, '_')}.pdf`);
        setSelectedDoc(null);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar PDF. Verifique se todos os campos estão preenchidos.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-20 bg-light-bg relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto Explicativo */}
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-green mb-4">
              Transparência e Acesso
            </h2>
            <p className="text-lg text-gray-600">
              Acesse e preencha os principais documentos da associação automaticamente.
            </p>
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
                    <label className="text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                    {field.type === 'select' ? (
                      <select 
                        className="border border-gray-300 rounded p-2 outline-none focus:border-green-500"
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
                        className="border border-gray-300 rounded p-2 outline-none focus:border-green-500"
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        value={formData[field.id] || ''}
                      />
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