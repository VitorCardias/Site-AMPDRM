import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Função auxiliar para formatar data (ex: 2024-05-20 -> 20/05/2024)
const formatDate = (dateString?: string) => {
  if (!dateString) return '___/___/____';
  try {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  } catch {
    return dateString;
  }
};

// Função para pegar dia, mês e ano separados para a data por extenso
const getDateParts = (dateString?: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return { day, month, year };
};

// Interface expandida com TODOS os campos que o texto pede
interface IDadosDesligamento {
  // Associado
  nome: string;
  nacionalidade: string;
  estadoCivil: string;
  profissao: string;
  cpf: string;
  rg: string;
  endereco: string;
  municipio: string;
  cep: string;

  // Imóvel
  ruaImovel: string;
  distritoImovel: string;
  municipioImovel: string;
  matriculaImovel: string;
  dataVenda: string;

  // Adquirente (Comprador)
  nomeAdquirente: string;
  estadoCivilAdquirente: string;
  profissaoAdquirente: string;
  cpfAdquirente: string;
  rgAdquirente: string;
  enderecoAdquirente: string;
  municipioAdquirente: string;
  cepAdquirente: string;
  telefoneAdquirente: string;
  emailAdquirente: string;

  // Lógica
  tipoPendencia: 'nenhuma' | 'com_data' | 'a_apurar';
  dataQuitacao?: string;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingLeft: 60,
    paddingRight: 60,
    fontSize: 12,
    fontFamily: 'Times-Roman', // Fonte padrão jurídica
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
    textAlign: 'justify', // Texto justificado como na foto
    textIndent: 40, // Recuo da primeira linha
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

export const PdfDesligamento: React.FC<{ data: IDadosDesligamento }> = ({ data }) => {
  const today = getDateParts();
  const quitacaoParts = data.dataQuitacao ? getDateParts(data.dataQuitacao) : { day: '___', month: '_________', year: '202_' };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <Text style={styles.header}>
          REQUERIMENTO DE DESLIGAMENTO DE ASSOCIADO(A) À ASSOCIAÇÃO DE MORADORES DO DISTRITO RECANTO MAESTRO EM RAZÃO DE ALIENAÇÃO DE IMÓVEL
        </Text>

        <Text style={styles.paragraph}>
          EU, <Text style={styles.bold}>{data.nome.toUpperCase()}</Text>, brasileiro(a), {data.estadoCivil}, {data.profissao}, 
          inscrito no CPF sob o n.° {data.cpf} e RG sob o n.° {data.rg}, residente e domiciliado à {data.endereco}, 
          em {data.municipio}, CEP {data.cep}, venho através deste <Text style={styles.bold}>REQUERIMENTO</Text> manifestar 
          à Associação de Moradores do Distrito Recanto Maestro, inscrita no CNPJ n.º 15.394.096/0001-97, o meu interesse de 
          <Text style={styles.bold}> desligamento</Text> imediato do quadro de associados, diante da alienação do meu imóvel sito à Rua {data.ruaImovel}, 
          distrito de {data.distritoImovel}, município de {data.municipioImovel}, RS, matriculado no Cartório de Registro de Imóveis 
          de Faxinal do Soturno sob o n.º {data.matriculaImovel}, cuja venda foi realizada em {formatDate(data.dataVenda)}.
        </Text>

        <Text style={styles.paragraph}>
          Assim, a partir desta data, <Text style={styles.bold}>DECLARO</Text> nada mais ter a exigir da Associação de Moradores do 
          Distrito Recanto Maestro, retirando-me em caráter irrevogável do quadro de associados.
        </Text>

        {/* LÓGICA CONDICIONAL */}
        
        {data.tipoPendencia === 'com_data' && (
          <Text style={styles.paragraph}>
            Igualmente, <Text style={styles.bold}>DECLARO</Text> que possuo pendências financeiras com a entidade, conforme os valores 
            discriminados em anexo a este desligamento, comprometendo-me a quitá-las até o dia <Text style={styles.bold}>{quitacaoParts.day}</Text>, 
            do mês de <Text style={styles.bold}>{quitacaoParts.month}</Text>, de <Text style={styles.bold}>{quitacaoParts.year}</Text>, 
            manifestando ciência de que a existências de valores em aberto justificam a não emissão de Declaração de Quitação de Débitos por esta Associação.
          </Text>
        )}

        {data.tipoPendencia === 'a_apurar' && (
          <Text style={styles.paragraph}>
            Igualmente, <Text style={styles.bold}>DECLARO</Text> que possuo pendências financeiras com a entidade, conforme valores 
            a serem por esta apurados em até 5 (cinco) dias úteis do recebimento deste Requerimento, comprometendo-me a quitá-las o 
            mais breve possível, tendo em vista a manifesta ciência de que a existências de valores em aberto justificam a não emissão 
            de Declaração de Quitação de Débitos por esta Associação.
          </Text>
        )}

        <Text style={styles.paragraph}>
          Por fim, neste mesmo ato, <Text style={styles.bold}>DECLARO</Text> que comuniquei ao(à) adquirente, 
          Sr.(a) <Text style={styles.bold}>{data.nomeAdquirente.toUpperCase()}</Text>, {data.estadoCivilAdquirente}, {data.profissaoAdquirente}, 
          inscrito(a) no CPF sob o n.° {data.cpfAdquirente} e RG sob o n.° {data.rgAdquirente}, residente e domiciliado à {data.enderecoAdquirente}, 
          em {data.municipioAdquirente}, CEP {data.cepAdquirente}, telefone {data.telefoneAdquirente}, e-mail {data.emailAdquirente}, 
          da responsabilidade de continuar a contribuir com as contribuições destinadas ao atendimento das finalidades propostas pela Associação 
          de Moradores do Distrito Recanto Maestro, o(a) qual assina este documento, confirmando ciência e concordância aos pagamentos, uma vez 
          que beneficiário de todos os serviços prestados pela entidade.
        </Text>

        <Text style={styles.paragraph}>
          Atenciosamente,
        </Text>

        <Text style={styles.dateLocation}>
          Recanto Maestro/São João do Polêsine (RS), dia {today.day}, de {today.month}, de {today.year}.
        </Text>

        <View style={styles.signatureSection}>
            <View style={styles.signatureBlock}>
                <View style={styles.line} />
                <Text style={styles.bold}>{data.nome.toUpperCase()}</Text>
                <Text style={styles.signatureText}>CPF: {data.cpf} (Comunicante)</Text>
            </View>

            <View style={styles.signatureBlock}>
                <View style={styles.line} />
                <Text style={styles.bold}>{data.nomeAdquirente.toUpperCase()}</Text>
                <Text style={styles.signatureText}>CPF: {data.cpfAdquirente} (Adquirente/Anuente)</Text>
            </View>
        </View>

        <Text style={styles.footer}>
          Recebido em: ______/______/__________.
        </Text>

      </Page>
    </Document>
  );
};