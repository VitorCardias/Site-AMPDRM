import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const getDateParts = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return { day, month, year };
};

interface IDadosAtualizacao { nome: string; cpf: string; telefone: string; email: string; }

const styles = StyleSheet.create({
  page: { paddingTop: 60, paddingBottom: 60, paddingLeft: 60, paddingRight: 60, fontSize: 12, fontFamily: 'Times-Roman', lineHeight: 1.5 },
  header: { fontSize: 12, textAlign: 'center', marginBottom: 30, fontFamily: 'Times-Bold', textTransform: 'uppercase' },
  paragraph: { marginBottom: 15, textAlign: 'justify', textIndent: 40 },
  list: { marginLeft: 40, marginBottom: 15 },
  bold: { fontFamily: 'Times-Bold' },
  signatureSection: { marginTop: 50, alignItems: 'center', gap: 10 },
  line: { width: 350, borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 5 },
  signatureText: { fontSize: 10, textAlign: 'center' },
  dateLocation: { marginTop: 30, textAlign: 'right' },
  footer: { marginTop: 40, fontSize: 10 }
});

export const PdfAtualizacaoCadastral: React.FC<{ data: IDadosAtualizacao }> = ({ data }) => {
  const today = getDateParts();
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>DECLARAÇÃO DE ATUALIZAÇÃO CADASTRAL - ASSOCIAÇÃO DE MORADORES E PROPRIETÁRIOS DO DISTRITO RECANTO MAESTRO (AMPRM)</Text>
        <Text style={styles.paragraph}>Eu <Text style={styles.bold}>{data.nome ? data.nome.toUpperCase() : '_____________________________________________________'}</Text>, associado(a) da Associação de Moradores e Proprietários do Distrito do Recanto Maestro, em atenção à solicitação da Diretoria da AMPRM, venho por meio deste documento atualizar os seguintes dados pessoais para contato:</Text>
        <View style={styles.list}>
          <Text>- Telefone (WhatsApp): <Text style={styles.bold}>{data.telefone}</Text></Text>
          <Text>- E-mail: <Text style={styles.bold}>{data.email}</Text></Text>
        </View>
        <Text style={styles.paragraph}>Atenciosamente,</Text>
        <Text style={styles.dateLocation}>Recanto Maestro/São João do Polêsine (RS), dia {today.day}, de {today.month}, de {today.year}.</Text>
        <View style={styles.signatureSection}><View style={styles.line} /><Text style={styles.bold}>{data.nome ? data.nome.toUpperCase() : ''}</Text><Text style={styles.signatureText}>CPF {data.cpf}</Text></View>
        <Text style={styles.footer}>Recebido em: ______/______/__________.</Text>
      </Page>
    </Document>
  );
};