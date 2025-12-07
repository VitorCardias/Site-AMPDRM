import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const formatDate = (dateString?: string) => {
  if (!dateString) return '___/___/____';
  try {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  } catch { return dateString; }
};

const getDateParts = (dateString?: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return { day, month, year };
};

interface IDadosAdmissaoPF {
  nome: string; nacionalidade: string; estadoCivil: string; profissao: string; cpf: string; rg: string; endereco: string; municipio: string; cep: string; telefone: string; email: string;
  tipoVinculo: 'proprietario' | 'morador' | 'locatario' | 'empresario';
  dataInicioVinculo: string;
}

const styles = StyleSheet.create({
  page: { paddingTop: 60, paddingBottom: 60, paddingLeft: 60, paddingRight: 60, fontSize: 12, fontFamily: 'Times-Roman', lineHeight: 1.5 },
  header: { fontSize: 12, textAlign: 'center', marginBottom: 30, fontFamily: 'Times-Bold', textTransform: 'uppercase' },
  paragraph: { marginBottom: 15, textAlign: 'justify', textIndent: 40 },
  bold: { fontFamily: 'Times-Bold' },
  signatureSection: { marginTop: 50, alignItems: 'center', gap: 10 },
  line: { width: 350, borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 5 },
  signatureText: { fontSize: 10, textAlign: 'center' },
  dateLocation: { marginTop: 30, textAlign: 'right' },
  footer: { marginTop: 40, fontSize: 10 }
});

export const PdfAdmissaoPF: React.FC<{ data: IDadosAdmissaoPF }> = ({ data }) => {
  const today = getDateParts();
  const renderOption = (type: string, label: string) => {
    const isSelected = data.tipoVinculo === type;
    return <Text>{isSelected ? '( X )' : '(   )'} {label}</Text>;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>REQUERIMENTO DE INGRESSO/PERMANÊNCIA NO QUADRO DE ASSOCIADOS(AS) DA ASSOCIAÇÃO DE MORADORES DO DISTRITO RECANTO MAESTRO - AMRM</Text>
        <Text style={styles.paragraph}>EU, <Text style={styles.bold}>{data.nome.toUpperCase()}</Text>, {data.nacionalidade}, {data.estadoCivil}, {data.profissao}, inscrito no CPF sob o n.° {data.cpf} e RG sob o n.° {data.rg}, residente e domiciliado à {data.endereco}, em {data.municipio} (Município), CEP {data.cep}, telefone {data.telefone}, e-mail {data.email}, venho através deste <Text style={styles.bold}>REQUERIMENTO</Text> manifestar à Associação de Moradores do Distrito Recanto Maestro, inscrita no CNPJ n.º 15.394.096/0001-97, o meu interesse de compor o quadro de associados, tendo em vista ser:</Text>
        <Text style={styles.paragraph}>{renderOption('proprietario', 'proprietário de imóvel')} / {renderOption('morador', 'morador')} / {renderOption('locatario', 'locatário')} / {renderOption('empresario', 'empresário')} no Distrito de Recanto Maestro, na área de circunscrição desta Associação, desde {formatDate(data.dataInicioVinculo)}.</Text>
        <Text style={styles.paragraph}>Neste mesmo ato <Text style={styles.bold}>DECLARO</Text> ter ciência do Estatuto e do Regimento Interno desta Associação, comprometendo-me com seus deveres e obrigações, em todos os seus termos.</Text>
        <Text style={styles.paragraph}>Atenciosamente,</Text>
        <Text style={styles.dateLocation}>Recanto Maestro/São João do Polêsine (RS), dia {today.day}, de {today.month}, de {today.year}.</Text>
        <View style={styles.signatureSection}><View style={styles.line} /><Text style={styles.bold}>{data.nome.toUpperCase()}</Text><Text style={styles.signatureText}>CPF {data.cpf}</Text></View>
        <Text style={styles.footer}>Recebido em: ______/______/__________.</Text>
      </Page>
    </Document>
  );
};