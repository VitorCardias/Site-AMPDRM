import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const getDateParts = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return { day, month, year };
};

interface IDadosLocacaoPF {
  nome: string;
  nacionalidade: string;
  estadoCivil: string;
  profissao: string;
  cpf: string;
  rgPassaporte: string;
  endereco: string;
  municipio: string;
  pais: string;
  cep: string;
  telefone: string;
  email: string;
  matriculaImovel: string;
  titularConta: string;
  banco: string;
  agencia: string;
  contaBancaria: string;
  cpfConta: string;
  chavePix: string;
}

const styles = StyleSheet.create({
  page: { paddingTop: 54, paddingBottom: 54, paddingLeft: 58, paddingRight: 58, fontSize: 11, fontFamily: 'Times-Roman', lineHeight: 1.45 },
  header: { fontSize: 12, textAlign: 'center', marginBottom: 24, fontFamily: 'Times-Bold', textTransform: 'uppercase' },
  clauseTitle: { marginTop: 8, marginBottom: 6, fontFamily: 'Times-Bold' },
  paragraph: { marginBottom: 9, textAlign: 'justify', textIndent: 32 },
  noIndentParagraph: { marginBottom: 8, textAlign: 'justify' },
  bold: { fontFamily: 'Times-Bold' },
  bankBox: { marginLeft: 32, marginBottom: 9 },
  bankLine: { marginBottom: 2 },
  dateLocation: { marginTop: 18, textAlign: 'right' },
  signatureSection: { marginTop: 36, alignItems: 'center', gap: 8 },
  line: { width: 330, borderBottomWidth: 1, borderBottomColor: 'black', marginBottom: 5 },
  signatureText: { fontSize: 10, textAlign: 'center' }
});

export const PdfLocacaoPF: React.FC<{ data: IDadosLocacaoPF }> = ({ data }) => {
  const today = getDateParts();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>TERMO DE AUTORIZAÇÃO DE LOCAÇÃO DOS IMÓVEIS</Text>

        <Text style={styles.paragraph}>
          Pelo presente Termo, o(a) associado(a) <Text style={styles.bold}>{data.nome ? data.nome.toUpperCase() : '________________________________________________'}</Text>, {data.nacionalidade}, {data.estadoCivil}, {data.profissao}, inscrito no CPF sob o n.° {data.cpf} e RG sob o n.° (ou Passaporte n.°) {data.rgPassaporte}, residente e domiciliado à {data.endereco}, em {data.municipio} (Município), {data.pais} (País), CEP {data.cep}, telefone {data.telefone}, e-mail {data.email}, autoriza a Associação de Moradores e Proprietários do Distrito Recanto Maestro - AMPRM, CNPJ n.º 15.394.096/0001-97, a intermediar a locação do(s) seu(s) imóvel(is), registrado sob a matrícula de n.° {data.matriculaImovel}, a terceiros, conforme previsão no art. 7, V, do Regimento Interno da AMPRM e de acordo com as condições a seguir expostas:
        </Text>

        <Text style={styles.clauseTitle}>Cláusula Primeira: Autorização de Locação</Text>
        <Text style={styles.paragraph}>O(a) associado(a) confere à Associação de Moradores poderes para negociar, intermediar e firmar contratos de locação com interessados, brasileiros ou estrangeiros, conforme a legislação vigente.</Text>

        <Text style={styles.clauseTitle}>Cláusula Segunda: Administração do Imóvel</Text>
        <Text style={styles.noIndentParagraph}>A Associação de Moradores fica autorizada a realizar a administração da locação, que inclui, mas não se limita, a:</Text>
        <Text style={styles.paragraph}>Parágrafo primeiro: Cuidar da publicidade do imóvel e intermediação de contatos com potenciais locatários;</Text>
        <Text style={styles.paragraph}>Parágrafo segundo: Negociar valores, prazo e condições de locação;</Text>
        <Text style={styles.paragraph}>Parágrafo terceiro: Acompanhar o cumprimento de contrato de locação e fiscalizar a ocupação do imóvel;</Text>
        <Text style={styles.paragraph}>Parágrafo quarto: Receber mensalmente o pagamento integral referente à locação do imóvel na conta bancária da Associação de Moradores e Proprietários do Distrito Recanto Maestro, descrita abaixo, como compensação às despesas de taxas e comissões pela gestão do imóvel e outros débitos relativos à manutenção e uso do imóvel;</Text>
        <Text style={styles.paragraph}>Parágrafo quarto: Receber mensalmente o pagamento integral referente à locação do imóvel na conta bancária da Associação de Moradores e Proprietários do Distrito Recanto Maestro. Conta bancária:</Text>

        <View style={styles.bankBox}>
          <Text style={styles.bankLine}>Titular: <Text style={styles.bold}>{data.titularConta}</Text></Text>
          <Text style={styles.bankLine}>Banco: <Text style={styles.bold}>{data.banco}</Text></Text>
          <Text style={styles.bankLine}>Agência: <Text style={styles.bold}>{data.agencia}</Text></Text>
          <Text style={styles.bankLine}>Conta Bancária: <Text style={styles.bold}>{data.contaBancaria}</Text></Text>
          <Text style={styles.bankLine}>CPF: <Text style={styles.bold}>{data.cpfConta}</Text></Text>
          <Text style={styles.bankLine}>Chave Pix: <Text style={styles.bold}>{data.chavePix}</Text></Text>
        </View>

        <Text style={styles.paragraph}>Parágrafo quinto: Em se tratando de Associado(a) estrangeiro(a), por acordo entre as partes, fica, desde já, a AMPRM autorizada a receber a integralidade do valor objeto do contrato de locação, como compensação pela gestão do imóvel;</Text>
        <Text style={styles.paragraph}>Parágrafo sexto: Fiscalizar a manutenção e conservação do imóvel locado, bem como comunicar o locatário e/ou o proprietário, em caso de mau uso do bem objeto da locação;</Text>

        <Text style={styles.clauseTitle}>Cláusula Terceira: Comunicação com Locatários</Text>
        <Text style={styles.paragraph}>A Associação de Moradores terá o direito de entrar em contato diretamente com o locatário para tratar de quaisquer questões relacionadas à locação de imóvel, incluindo manutenções e eventuais problemas que possam surgir durante o período de locação, bem como a cobrança das taxas mensais de associado.</Text>

        <Text style={styles.clauseTitle}>Cláusula Quarta: Obrigações do(a) Associado(a)</Text>
        <Text style={styles.paragraph}>O(a) associado(a) se compromete a fornecer todas as informações necessárias e manter a documentação do imóvel regularizada para fins de locação e compromete-se a informar a Associação sobre qualquer alteração na propriedade ou na situação legal do imóvel.</Text>

        <Text style={styles.clauseTitle}>Cláusula Quinta: Vigência</Text>
        <Text style={styles.paragraph}>Este termo tem validade de 12 (doze) meses a partir da data de assinatura, ultrapassando tal prazo enquanto perdurar o contrato de locação intermediado pela AMPRM, podendo, ainda, ser renovado ou resilido, por quaisquer das partes, mediante aviso prévio de 30 dias.</Text>

        <Text style={styles.clauseTitle}>Cláusula Sexta: Excludente de Responsabilidade</Text>
        <Text style={styles.paragraph}>A Associação de Moradores e Proprietários do Distrito Recanto Maestro não se responsabiliza quanto à inadimplência do valor da locação, que é de responsabilidade do locatário, bem como a qualquer eventual dano ou prejuízo que o(a) associado(a) tiver em relação ao imóvel ou locação.</Text>

        <Text style={styles.clauseTitle}>Cláusula Sétima: Da Outorga de Poderes</Text>
        <Text style={styles.paragraph}>O(A) Associado(a) outorga poderes à Associação de Moradores e Proprietários do Distrito Recanto Maestro (AMPRM), para que esta possa representá-lo(a) nas cobranças administrativas e/ou judiciais de eventuais débitos do(a) locatário(a) em relação ao imóvel objeto deste termo de autorização.</Text>

        <Text style={styles.clauseTitle}>Cláusula Oitava: Da não equiparação às empresas intermediadoras de locação</Text>
        <Text style={styles.paragraph}>As partes reconhecem e declaram que a Associação de Moradores e Proprietários do Distrito Recanto Maestro não é empresa intermediadora de locação para os fins previstos na Instrução Normativa RFB n.º 1115, de 28 de dezembro de 2010, imiscuindo-se esta do fornecimento da Declaração de Informações sobre Atividades Imobiliárias (Dimob).</Text>

        <Text style={styles.dateLocation}>Recanto Maestro/São João do Polêsine (RS), dia {today.day}, de {today.month}, de {today.year}.</Text>
        <View style={styles.signatureSection}>
          <Text>Associado(a):</Text>
          <View style={styles.line} />
          <Text style={styles.bold}>{data.nome ? data.nome.toUpperCase() : ''}</Text>
          <Text style={styles.signatureText}>CPF {data.cpf}</Text>
        </View>
      </Page>
    </Document>
  );
};
