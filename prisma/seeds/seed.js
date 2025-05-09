const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Seed para Órgãos Públicos
  const orgaos = await prisma.orgaoPublico.createMany({
    data: [
      {
        nome: "Ministério da Saúde",
        titulo: "Serviços Nacionais de Saúde",
        descricao: "Órgão responsável pela saúde pública",
        esfera: "federal",
        uf: "DF",
        totalConjuntosDados: 15,
        totalSeguidores: 2500
      },
      {
        nome: "Secretaria Municipal de Educação",
        titulo: "Educação Básica",
        descricao: "Responsável pelas escolas municipais",
        esfera: "municipal",
        uf: "SP",
        municipio: "São Paulo",
        totalConjuntosDados: 8,
        totalSeguidores: 1200
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ ${orgaos.count} órgãos públicos criados`);

  // Seed para Serviços de Saúde
  const saude = await prisma.saude.createMany({
    data: [
      {
        nomeServico: "Vacinação COVID-19",
        descricao: "Postos de vacinação contra COVID-19",
        orgaoResponsavel: "Ministério da Saúde",
        localizacao: "Postos de saúde em todo país"
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ ${saude.count} serviços de saúde criados`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });