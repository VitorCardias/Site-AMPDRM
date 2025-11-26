import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// --- Funções Auxiliares ---
const formatDate = (dateString?: string) => {
  if (!dateString) return '___/___/____';
  try {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  } catch {
    return dateString;
  }
};

const getDateParts = (dateString?: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return { day, month, year };
};

// --- Interface dos Dados ---
interface IDadosLocacao {
  // Comunicante (Empresa que sai)
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  municipio: string;
  cep: string;

  // Imóvel
  ruaImovel: string;
  distritoImovel: string; // Recanto Maestro
  municipioImovel: string;
  matriculaImovel: string;
  dataInicioLocacao: string;

  // Locatário (Empresa que entra)
  razaoSocialLocatario: string;
  cnpjLocatario: string;
  enderecoLocatario: string;
  municipioLocatario: string;
  cepLocatario: string;
  telefoneLocatario: string;
  emailLocatario: string;
}

// --- Estilos (Padrão Jurídico) ---
const styles = StyleSheet.create({
  page: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingLeft: 60,
    paddingRight: 60,
    fontSize: 12,
    fontFamily: 'Times-Roman',
    lineHeight: 1.5,
  },
  header: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
  },
  paragraph: {
    marginBottom: 15,
    textAlign: 'justify',
    textIndent: 40,
  },
  bold: {
    fontFamily: 'Times-Bold',
  },
  signatureSection: {
    marginTop: 50,
    gap: 40,
  },
  signatureBlock: {
    alignItems: 'center',
  },
  line: {
    width: 350,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 10,
    textAlign: 'center',
  },
  dateLocation: {
    marginTop: 30,
    textAlign: 'right',
  },
  footer: {
    marginTop: 40,
    fontSize: 10,
  }
});

export const PdfDesligamentoLocacao: React.FC<{ data: IDadosLocacao }> = ({ data }) => {
  const today = getDateParts();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <Text style={styles.header}>
          REQUERIMENTO DE DESLIGAMENTO DE ASSOCIADO(A) À ASSOCIAÇÃO DE MORADORES E PROPRIETÁRIOS DO DISTRITO RECANTO MAESTRO EM RAZÃO DE LOCAÇÃO DE IMÓVEL
        </Text>

        {/* PARÁGRAFO 1: Qualificação */}
        <Text style={styles.paragraph}>
          A <Text style={styles.bold}>{data.razaoSocial ? data.razaoSocial.toUpperCase() : '____________________'}</Text>, pessoa jurídica de direito privado, 
          inscrita no CNPJ sob o n.° {data.cnpj}, situada na Rua {data.endereco}, em {data.municipio}, CEP {data.cep}, 
          vem, por meio dos seus representantes legais, através deste <Text style={styles.bold}>REQUERIMENTO</Text>, manifestar à 
          Associação de Moradores e Proprietários do Distrito Recanto Maestro, inscrita no CNPJ n.º 15.394.096/0001-97, 
          o interesse de <Text style={styles.bold}>desligamento</Text> imediato do quadro de associados, diante da locação do imóvel sito à 
          Rua {data.ruaImovel}, distrito de {data.distritoImovel}, município de {data.municipioImovel}, RS, matriculado no 
          Cartório de Registro de Imóveis de Faxinal do Soturno sob o n.º {data.matriculaImovel}, cuja locação iniciará 
          em {formatDate(data.dataInicioLocacao)}.
        </Text>

        {/* PARÁGRAFO 2: Declaração de Quitação */}
        <Text style={styles.paragraph}>
          Assim, a partir desta data, <Text style={styles.bold}>DECLARO</Text> nada mais ter a exigir da Associação de Moradores e 
          Proprietários do Distrito Recanto Maestro, cujas obrigações enquanto associado foram integralmente quitadas, 
          retirando-me em caráter irrevogável do quadro de associados.
        </Text>

        {/* PARÁGRAFO 3: Dados do Locatário */}
        <Text style={styles.paragraph}>
          Por fim, neste mesmo ato, <Text style={styles.bold}>DECLARO</Text> que comuniquei ao Locatário, empresa <Text style={styles.bold}>{data.razaoSocialLocatario ? data.razaoSocialLocatario.toUpperCase() : '____________________'}</Text>, 
          pessoa jurídica de direito privado, inscrita no CNPJ sob o n.° {data.cnpjLocatario}, situada na Rua {data.enderecoLocatario}, 
          em {data.municipioLocatario}, CEP {data.cepLocatario}, telefone {data.telefoneLocatario}, e-mail {data.emailLocatario}, 
          da responsabilidade de continuar a contribuir com as contribuições destinadas ao atendimento das finalidades propostas pela 
          Associação de Moradores e Proprietários do Distrito Recanto Maestro, a qual assina este documento, confirmando ciência e 
          concordância aos pagamentos, bem como concorda em assinar imediatamente o termo de associação, uma vez que beneficiário de 
          todos os serviços prestados pela entidade.
        </Text>

        <Text style={styles.paragraph}>
          Atenciosamente,
        </Text>

        <Text style={styles.dateLocation}>
          Recanto Maestro/São João do Polêsine (RS), dia {today.day}, de {today.month}, de {today.year}.
        </Text>

        {/* Assinaturas */}
        <View style={styles.signatureSection}>
            {/* Assinatura do Comunicante */}
            <View style={styles.signatureBlock}>
                <View style={styles.line} />
                <Text style={styles.bold}>{data.razaoSocial ? data.razaoSocial.toUpperCase() : ''}</Text>
                <Text style={styles.signatureText}>CNPJ n.° {data.cnpj} (Comunicante)</Text>
            </View>

            {/* Assinatura do Locatário */}
            <View style={styles.signatureBlock}>
                <View style={styles.line} />
                <Text style={styles.bold}>{data.razaoSocialLocatario ? data.razaoSocialLocatario.toUpperCase() : ''}</Text>
                <Text style={styles.signatureText}>CNPJ n.° {data.cnpjLocatario} (Locatário)</Text>
            </View>
        </View>

        <Text style={styles.footer}>
          Recebido em: ______/______/__________.
        </Text>

      </Page>
    </Document>
  );
};