import { ServiceCategory, SpecificService, User, UserType, Booking, BookingStatus } from '../types';
import { BoltIcon } from '../components/icons/BoltIcon';
import { PaintBrushIcon } from '../components/icons/PaintBrushIcon';
import { WrenchIcon } from '../components/icons/WrenchIcon';
import { WrenchScrewdriverIcon } from '../components/icons/WrenchScrewdriverIcon';


export const MOCK_CATEGORIES: ServiceCategory[] = [
  { id: 'cat1', name: 'Elétrica', icon: BoltIcon },
  { id: 'cat2', name: 'Hidráulica', icon: WrenchIcon },
  { id: 'cat3', name: 'Pintura', icon: PaintBrushIcon },
  { id: 'cat4', name: 'Montagem', icon: WrenchScrewdriverIcon },
  { id: 'cat5', name: 'Jardinagem', icon: WrenchScrewdriverIcon },
  { id: 'cat6', name: 'Manutenção Geral', icon: WrenchScrewdriverIcon },
  { id: 'cat7', name: 'Limpeza Residencial', icon: WrenchScrewdriverIcon },
  { id: 'cat8', name: 'Reparos de Portas/Janelas', icon: WrenchScrewdriverIcon },
  { id: 'cat9', name: 'Pequenos Reparos de Informática', icon: BoltIcon },
];

export const MOCK_SPECIFIC_SERVICES: SpecificService[] = [
  // Elétrica - cat1
  { id: 's1', categoryId: 'cat1', name: 'Instalação de Tomadas', description: 'Instalação ou substituição de tomadas e interruptores.', minPrice: 35, maxPrice: 60, estimatedTime: '1h' },
  { id: 's37', categoryId: 'cat1', name: 'Troca de Interruptor', description: 'Instalação ou substituição de interruptores de luz.', minPrice: 40, maxPrice: 65, estimatedTime: '1h' },
  { id: 's2', categoryId: 'cat1', name: 'Troca de Disjuntores', description: 'Substituição de disjuntores no quadro de força.', minPrice: 45, maxPrice: 75, estimatedTime: '1.5h' },
  { id: 's3', categoryId: 'cat1', name: 'Instalação de Ventilador de Teto', description: 'Montagem e instalação completa de ventiladores de teto.', minPrice: 80, maxPrice: 130, estimatedTime: '2.5h' },
  { id: 's4', categoryId: 'cat1', name: 'Iluminação Inteligente', description: 'Instalação de lâmpadas e sistemas de iluminação smart.', minPrice: 70, maxPrice: 120, estimatedTime: '2h' },
  { id: 's5', categoryId: 'cat1', name: 'Manutenção Elétrica Geral', description: 'Revisão de fiação, conexões e quadro de energia.', minPrice: 100, maxPrice: 180, estimatedTime: '3h' },

  // Hidráulica - cat2
  { id: 's6', categoryId: 'cat2', name: 'Reparo Hidráulico Pequeno', description: 'Localização e reparo de vazamentos em canos e torneiras.', minPrice: 120, maxPrice: 250, estimatedTime: '2.5h' },
  { id: 's7', categoryId: 'cat2', name: 'Troca de Torneiras', description: 'Substituição de torneiras de pias, tanques e chuveiros.', minPrice: 60, maxPrice: 100, estimatedTime: '1h' },
  { id: 's8', categoryId: 'cat2', name: 'Desentupimento Leve', description: 'Desobstrução de pias, ralos e vasos sanitários.', minPrice: 80, maxPrice: 150, estimatedTime: '1.5h' },
  { id: 's9', categoryId: 'cat2', name: 'Instalação de Chuveiro', description: 'Instalação ou troca de chuveiros elétricos.', minPrice: 90, maxPrice: 160, estimatedTime: '1.5h' },

  // Pintura - cat3
  { id: 's11', categoryId: 'cat3', name: 'Pintura Simples (até 15m²)', description: 'Pintura de paredes internas com preparação básica.', minPrice: 180, maxPrice: 350, estimatedTime: '4h' },
  { id: 's12', categoryId: 'cat3', name: 'Retoques de Pintura', description: 'Correção de pequenas falhas e arranhões na pintura.', minPrice: 70, maxPrice: 120, estimatedTime: '1.5h' },
  { id: 's14', categoryId: 'cat3', name: 'Pintura de Portões', description: 'Lixamento e pintura de portões de metal ou madeira.', minPrice: 130, maxPrice: 250, estimatedTime: '3.5h' },

  // Montagem - cat4
  { id: 's16', categoryId: 'cat4', name: 'Montagem de Móvel', description: 'Montagem de estantes, mesas de cabeceira, etc.', minPrice: 70, maxPrice: 140, estimatedTime: '2.5h' },
  { id: 's17', categoryId: 'cat4', name: 'Instalação de Prateleiras', description: 'Fixação de até 3 prateleiras e nichos em paredes.', minPrice: 50, maxPrice: 80, estimatedTime: '1h' },
  { id: 's19', categoryId: 'cat4', name: 'Instalação de Cortinas', description: 'Fixação de varões e instalação de cortinas (por janela).', minPrice: 45, maxPrice: 75, estimatedTime: '1h' },
  { id: 's20', categoryId: 'cat4', name: 'Suporte para TV', description: 'Instalação de suportes fixos ou articulados para TVs.', minPrice: 70, maxPrice: 130, estimatedTime: '1h' },

  // Jardinagem - cat5
  { id: 's21', categoryId: 'cat5', name: 'Jardinagem Básica (até 50m²)', description: 'Corte e aparo de gramados.', minPrice: 50, maxPrice: 100, estimatedTime: '1.5h' },
  { id: 's22', categoryId: 'cat5', name: 'Poda de Plantas', description: 'Poda de limpeza para arbustos e árvores pequenas.', minPrice: 50, maxPrice: 100, estimatedTime: '1h' },
  { id: 's23', categoryId: 'cat5', name: 'Manutenção de Jardim', description: 'Limpeza, adubação e cuidados gerais com o jardim.', minPrice: 90, maxPrice: 160, estimatedTime: '2h' },

  // Manutenção Geral - cat6
  { id: 's26', categoryId: 'cat6', name: 'Pequenos Reparos Domésticos', description: 'Ajustes como reaperto de parafusos e dobradiças.', minPrice: 70, maxPrice: 150, estimatedTime: '1h' },
  { id: 's27', categoryId: 'cat6', name: 'Troca de Fechaduras', description: 'Substituição de fechaduras e maçanetas de portas.', minPrice: 80, maxPrice: 140, estimatedTime: '1.5h' },
  { id: 's28', categoryId: 'cat6', name: 'Instalação de Quadros e Espelhos', description: 'Furação e instalação de até 5 itens de decoração.', minPrice: 60, maxPrice: 100, estimatedTime: '1h' },
  
  // Limpeza Residencial - cat7
  { id: 's31', categoryId: 'cat7', name: 'Limpeza Leve (1Q/1B)', description: 'Faxina leve para apartamento de 1 quarto e 1 banheiro.', minPrice: 90, maxPrice: 150, estimatedTime: '3h' },
  { id: 's32', categoryId: 'cat7', name: 'Limpeza Pesada (Pós-obra)', description: 'Limpeza detalhada para remoção de sujeira de construção.', minPrice: 280, maxPrice: 450, estimatedTime: '6h' },
  { id: 's40', categoryId: 'cat7', name: 'Limpeza de Vidros e Janelas', description: 'Limpeza de faces internas e externas de janelas.', minPrice: 70, maxPrice: 130, estimatedTime: '2h' },
  { id: 's41', categoryId: 'cat7', name: 'Higienização de Estofados', description: 'Limpeza e higienização de sofás e poltronas (por assento).', minPrice: 80, maxPrice: 140, estimatedTime: '2.5h' },
  
  // Reparos de Portas/Janelas - cat8
  { id: 's33', categoryId: 'cat8', name: 'Reparo de Portas e Janelas', description: 'Ajustes em portas e janelas que não fecham corretamente.', minPrice: 60, maxPrice: 120, estimatedTime: '2h' },
  { id: 's34', categoryId: 'cat8', name: 'Troca de Dobradiças', description: 'Substituição de dobradiças em portas e armários.', minPrice: 50, maxPrice: 90, estimatedTime: '1.5h' },
  { id: 's42', categoryId: 'cat8', name: 'Instalação de Telas Mosquiteiras', description: 'Instalação de tela de proteção contra insetos (por janela).', minPrice: 60, maxPrice: 110, estimatedTime: '1.5h' },
  { id: 's43', categoryId: 'cat8', name: 'Vedação de Janelas', description: 'Aplicação de silicone ou vedantes para evitar infiltração.', minPrice: 50, maxPrice: 90, estimatedTime: '1h' },

  // Reparos de Informática - cat9
  { id: 's35', categoryId: 'cat9', name: 'Formatação e Instalação', description: 'Formatação de computador e instalação de sistema operacional.', minPrice: 80, maxPrice: 140, estimatedTime: '2.5h' },
  { id: 's36', categoryId: 'cat9', name: 'Remoção de Vírus', description: 'Limpeza de malwares e otimização do sistema.', minPrice: 90, maxPrice: 150, estimatedTime: '2h' },
  { id: 's44', categoryId: 'cat9', name: 'Configuração de Roteador Wi-Fi', description: 'Instalação e configuração de rede sem fio.', minPrice: 70, maxPrice: 110, estimatedTime: '1h' },
  { id: 's45', categoryId: 'cat9', name: 'Backup de Dados', description: 'Cópia de segurança de arquivos importantes para nuvem ou HD externo.', minPrice: 60, maxPrice: 100, estimatedTime: '1.5h' },
];


let MOCK_USERS: User[] = [
  // Clients
  { id: 'c1', name: 'Ana Silva', email: 'ana@cliente.com', phone: '11987654321', address: 'Rua das Flores, 123, São Paulo', latitude: -23.5505, longitude: -46.6333, type: UserType.Client, reputation: 4.8 },
  { id: 'c2', name: 'Bruno Costa', email: 'bruno@cliente.com', phone: '21912345678', address: 'Avenida Copacabana, 456, Rio de Janeiro', latitude: -22.9697, longitude: -43.1868, type: UserType.Client, reputation: 4.5 },

  // Workers
  { id: 'w1', name: 'Carlos Pereira', email: 'carlos@worker.com', phone: '11911112222', address: 'Rua Augusta, 789, São Paulo', latitude: -23.556, longitude: -46.642, type: UserType.Worker, reputation: 4.9, areas: ['Instalação de Tomadas', 'Instalação de Ventilador de Teto', 'Manutenção Elétrica Geral', 'Troca de Interruptor'], profilePictureUrl: 'https://i.pravatar.cc/150?img=1', priceMargin: 1.05 },
  { id: 'w2', name: 'Daniela Lima', email: 'daniela@worker.com', phone: '21933334444', address: 'Rua do Catete, 101, Rio de Janeiro', latitude: -22.925, longitude: -43.178, type: UserType.Worker, reputation: 4.2, areas: ['Pintura Simples (até 15m²)', 'Retoques de Pintura'], profilePictureUrl: 'https://i.pravatar.cc/150?img=2' },
  { id: 'w3', name: 'Eduardo Souza', email: 'eduardo@worker.com', phone: '11955556666', address: 'Avenida Paulista, 1500, São Paulo', latitude: -23.561, longitude: -46.656, type: UserType.Worker, reputation: 3.1, areas: ['Reparo Hidráulico Pequeno', 'Troca de Torneiras', 'Instalação de Tomadas'], profilePictureUrl: 'https://i.pravatar.cc/150?img=3', priceMargin: 0.98 },
  { id: 'w4', name: 'Fernanda Alves', email: 'fernanda@worker.com', phone: '11977778888', address: 'Rua Oscar Freire, 200, São Paulo', latitude: -23.559, longitude: -46.668, type: UserType.Worker, reputation: 2.2, areas: ['Montagem de Móvel', 'Instalação de Prateleiras', 'Suporte para TV', 'Limpeza Leve (1Q/1B)'], profilePictureUrl: 'https://i.pravatar.cc/150?img=4', priceMargin: 1.10 },
  { id: 'w5', name: 'Gustavo Borges', email: 'gustavo@worker.com', phone: '11988889999', address: 'Avenida Faria Lima, 4500, São Paulo', latitude: -23.587, longitude: -46.683, type: UserType.Worker, reputation: 4.6, areas: ['Formatação e Instalação', 'Remoção de Vírus', 'Configuração de Roteador Wi-Fi', 'Backup de Dados'], profilePictureUrl: 'https://i.pravatar.cc/150?img=5' },
  { id: 'w6', name: 'Ricardo Mendes', email: 'ricardo@worker.com', phone: '11987651234', address: 'Rua da Consolação, 222, São Paulo', latitude: -23.549, longitude: -46.652, type: UserType.Worker, reputation: 4.8, areas: ['Instalação de Chuveiro', 'Reparo Hidráulico Pequeno', 'Troca de Torneiras'], profilePictureUrl: 'https://i.pravatar.cc/150?img=6' },
  
  // More workers
  { id: 'w7', name: 'Juliana Martins', email: 'juliana@worker.com', phone: '11912345678', address: 'Rua Harmonia, 500, São Paulo', latitude: -23.551, longitude: -46.685, type: UserType.Worker, reputation: 4.5, areas: ['Jardinagem Básica (até 50m²)', 'Poda de Plantas', 'Manutenção de Jardim'], profilePictureUrl: 'https://i.pravatar.cc/150?img=7' },
  { id: 'w8', name: 'Pedro Rocha', email: 'pedro@worker.com', phone: '11987654321', address: 'Avenida Brigadeiro Luís Antônio, 2000, São Paulo', latitude: -23.568, longitude: -46.65, type: UserType.Worker, reputation: 4.9, areas: ['Pintura de Portões', 'Pintura Simples (até 15m²)', 'Pequenos Reparos Domésticos'], profilePictureUrl: 'https://i.pravatar.cc/150?img=8', priceMargin: 1.1 },
  { id: 'w9', name: 'Mariana Ferreira', email: 'mariana@worker.com', phone: '11923456789', address: 'Rua Vergueiro, 1500, São Paulo', latitude: -23.588, longitude: -46.634, type: UserType.Worker, reputation: 3.8, areas: ['Reparo de Portas e Janelas', 'Troca de Dobradiças', 'Vedação de Janelas'], profilePictureUrl: 'https://i.pravatar.cc/150?img=9' },
  { id: 'w10', name: 'Lucas Almeida', email: 'lucas@worker.com', phone: '19988776655', address: 'Avenida Brasil, 300, Campinas', latitude: -22.905, longitude: -47.06, type: UserType.Worker, reputation: 2.8, areas: ['Iluminação Inteligente', 'Configuração de Roteador Wi-Fi', 'Instalação de Tomadas'], profilePictureUrl: 'https://i.pravatar.cc/150?img=10' },
  { id: 'w11', name: 'Beatriz Santos', email: 'beatriz@worker.com', phone: '11934567890', address: 'Largo da Batata, 10, São Paulo', latitude: -23.566, longitude: -46.694, type: UserType.Worker, reputation: 4.7, areas: ['Montagem de Móvel', 'Instalação de Cortinas', 'Pequenos Reparos Domésticos', 'Instalação de Quadros e Espelhos'], profilePictureUrl: 'https://i.pravatar.cc/150?img=11' },
  { id: 'w12', name: 'Thiago Ribeiro', email: 'thiago@worker.com', phone: '11945678901', address: 'Avenida Santo Amaro, 5000, São Paulo', latitude: -23.613, longitude: -46.684, type: UserType.Worker, reputation: 5.0, areas: ['Desentupimento Leve', 'Instalação de Chuveiro', 'Reparo Hidráulico Pequeno'], profilePictureUrl: 'https://i.pravatar.cc/150?img=12' },
  { id: 'w13', name: 'Camila Gomes', email: 'camila@worker.com', phone: '11956789012', address: 'Alameda Santos, 2200, São Paulo', latitude: -23.559, longitude: -46.662, type: UserType.Worker, reputation: 4.3, areas: ['Limpeza Leve (1Q/1B)', 'Limpeza de Vidros e Janelas', 'Higienização de Estofados'], profilePictureUrl: 'https://i.pravatar.cc/150?img=13' },
  { id: 'w14', name: 'Rafael Oliveira', email: 'rafael@worker.com', phone: '11967890123', address: 'Rodovia Raposo Tavares, km 22, Cotia', latitude: -23.597, longitude: -46.84, type: UserType.Worker, reputation: 3.5, areas: ['Montagem de Móvel', 'Instalação de Prateleiras'], profilePictureUrl: 'https://i.pravatar.cc/150?img=14' },
  { id: 'w15', name: 'Sofia Costa', email: 'sofia@worker.com', phone: '11978901234', address: 'Rua Itapeva, 500, São Paulo', latitude: -23.565, longitude: -46.654, type: UserType.Worker, reputation: 2.1, areas: ['Poda de Plantas', 'Jardinagem Básica (até 50m²)'], profilePictureUrl: 'https://i.pravatar.cc/150?img=15' },
  { id: 'w16', name: 'André Lima', email: 'andre@worker.com', phone: '11989012345', address: 'Avenida Angélica, 2500, São Paulo', latitude: -23.548, longitude: -46.66, type: UserType.Worker, reputation: 4.8, areas: ['Troca de Fechaduras', 'Reparo de Portas e Janelas', 'Manutenção Elétrica Geral'], profilePictureUrl: 'https://i.pravatar.cc/150?img=16' },
  { id: 'w17', name: 'Larissa Dias', email: 'larissa@worker.com', phone: '11990123456', address: 'Rua Teodoro Sampaio, 1000, São Paulo', latitude: -23.563, longitude: -46.68, type: UserType.Worker, reputation: 4.1, areas: ['Remoção de Vírus', 'Formatação e Instalação', 'Backup de Dados'], profilePictureUrl: 'https://i.pravatar.cc/150?img=17' },
  { id: 'w18', name: 'Fábio Nunes', email: 'fabio@worker.com', phone: '11901234567', address: 'Rua Maria Antônia, 200, São Paulo', latitude: -23.543, longitude: -46.643, type: UserType.Worker, reputation: 3.3, areas: ['Pintura Simples (até 15m²)', 'Instalação de Quadros e Espelhos', 'Retoques de Pintura'], profilePictureUrl: 'https://i.pravatar.cc/150?img=18' },
  { id: 'w19', name: 'Amanda Jesus', email: 'amanda@worker.com', phone: '11912345678', address: 'Avenida Ibirapuera, 3000, São Paulo', latitude: -23.601, longitude: -46.666, type: UserType.Worker, reputation: 4.9, areas: ['Limpeza Pesada (Pós-obra)', 'Higienização de Estofados'], profilePictureUrl: 'https://i.pravatar.cc/150?img=19' },
  { id: 'w20', name: 'Igor Santos', email: 'igor@worker.com', phone: '11923456789', address: 'Avenida Morumbi, 7000, São Paulo', latitude: -23.615, longitude: -46.722, type: UserType.Worker, reputation: 2.9, areas: ['Instalação de Telas Mosquiteiras', 'Vedação de Janelas', 'Troca de Dobradiças'], profilePictureUrl: 'https://i.pravatar.cc/150?img=20' },
  
  // Electricians (cat1)
  { id: 'w21', name: 'Roberto Almeida', email: 'roberto.a@worker.com', phone: '11988881111', address: 'Rua dos Pinheiros, 123, São Paulo', latitude: -23.565, longitude: -46.685, type: UserType.Worker, reputation: 4.7, areas: ['Instalação de Tomadas', 'Troca de Disjuntores', 'Iluminação Inteligente'], profilePictureUrl: 'https://i.pravatar.cc/150?img=21' },
  { id: 'w22', name: 'Cláudia Martins', email: 'claudia.m@worker.com', phone: '11988882222', address: 'Alameda Jaú, 456, São Paulo', latitude: -23.558, longitude: -46.663, type: UserType.Worker, reputation: 4.4, areas: ['Manutenção Elétrica Geral', 'Instalação de Ventilador de Teto'], profilePictureUrl: 'https://i.pravatar.cc/150?img=22', priceMargin: 1.03 },
  { id: 'w23', name: 'Sérgio Reis', email: 'sergio.r@worker.com', phone: '11988883333', address: 'Rua Bela Cintra, 789, São Paulo', latitude: -23.555, longitude: -46.660, type: UserType.Worker, reputation: 3.9, areas: ['Instalação de Tomadas', 'Troca de Interruptor'], profilePictureUrl: 'https://i.pravatar.cc/150?img=23' },
  { id: 'w24', name: 'Paula Fernandes', email: 'paula.f@worker.com', phone: '11988884444', address: 'Rua Haddock Lobo, 1011, São Paulo', latitude: -23.559, longitude: -46.666, type: UserType.Worker, reputation: 5.0, areas: ['Iluminação Inteligente', 'Manutenção Elétrica Geral'], profilePictureUrl: 'https://i.pravatar.cc/150?img=24' },
  
  // Plumbers (cat2)
  { id: 'w25', name: 'Márcio Garcia', email: 'marcio.g@worker.com', phone: '11988885555', address: 'Avenida Rebouças, 1213, São Paulo', latitude: -23.562, longitude: -46.678, type: UserType.Worker, reputation: 4.8, areas: ['Reparo Hidráulico Pequeno', 'Instalação de Chuveiro', 'Desentupimento Leve'], profilePictureUrl: 'https://i.pravatar.cc/150?img=25', priceMargin: 1.08 },
  { id: 'w26', name: 'Vanessa Ramos', email: 'vanessa.r@worker.com', phone: '11988886666', address: 'Rua Cardeal Arcoverde, 1415, São Paulo', latitude: -23.559, longitude: -46.689, type: UserType.Worker, reputation: 4.1, areas: ['Troca de Torneiras', 'Desentupimento Leve'], profilePictureUrl: 'https://i.pravatar.cc/150?img=26' },
  { id: 'w27', name: 'Fernando Pires', email: 'fernando.p@worker.com', phone: '11988887777', address: 'Rua Artur de Azevedo, 1617, São Paulo', latitude: -23.563, longitude: -46.685, type: UserType.Worker, reputation: 3.2, areas: ['Instalação de Chuveiro', 'Troca de Torneiras'], profilePictureUrl: 'https://i.pravatar.cc/150?img=27', priceMargin: 0.95 },

  // Painters (cat3)
  { id: 'w28', name: 'Cristina Rocha', email: 'cristina.r@worker.com', phone: '11977771111', address: 'Rua dos Vianas, 1819, São Bernardo do Campo', latitude: -23.682, longitude: -46.565, type: UserType.Worker, reputation: 4.9, areas: ['Pintura Simples (até 15m²)', 'Pintura de Portões', 'Retoques de Pintura'], profilePictureUrl: 'https://i.pravatar.cc/150?img=28' },
  { id: 'w29', name: 'Jorge Ben', email: 'jorge.b@worker.com', phone: '11977772222', address: 'Avenida do Estado, 2021, Santo André', latitude: -23.649, longitude: -46.531, type: UserType.Worker, reputation: 4.5, areas: ['Pintura Simples (até 15m²)', 'Retoques de Pintura'], profilePictureUrl: 'https://i.pravatar.cc/150?img=29', priceMargin: 1.04 },

  // Assemblers (cat4)
  { id: 'w30', name: 'Adriana Calcanhoto', email: 'adriana.c@worker.com', phone: '11977773333', address: 'Rua Frei Caneca, 2223, São Paulo', latitude: -23.552, longitude: -46.654, type: UserType.Worker, reputation: 4.6, areas: ['Montagem de Móvel', 'Suporte para TV', 'Instalação de Prateleiras', 'Instalação de Cortinas'], profilePictureUrl: 'https://i.pravatar.cc/150?img=30' },
  { id: 'w31', name: 'Gilberto Gil', email: 'gilberto.g@worker.com', phone: '11977774444', address: 'Praça da República, 2425, São Paulo', latitude: -23.543, longitude: -46.641, type: UserType.Worker, reputation: 3.7, areas: ['Montagem de Móvel', 'Instalação de Prateleiras'], profilePictureUrl: 'https://i.pravatar.cc/150?img=31' },

  // Gardeners (cat5)
  { id: 'w32', name: 'Maria Bethânia', email: 'maria.b@worker.com', phone: '11966661111', address: 'Parque Ibirapuera, Portão 3, São Paulo', latitude: -23.587, longitude: -46.657, type: UserType.Worker, reputation: 4.8, areas: ['Jardinagem Básica (até 50m²)', 'Manutenção de Jardim', 'Poda de Plantas'], profilePictureUrl: 'https://i.pravatar.cc/150?img=32' },
  { id: 'w33', name: 'Caetano Veloso', email: 'caetano.v@worker.com', phone: '11966662222', address: 'Avenida 23 de Maio, 2627, São Paulo', latitude: -23.578, longitude: -46.653, type: UserType.Worker, reputation: 4.2, areas: ['Poda de Plantas', 'Jardinagem Básica (até 50m²)'], profilePictureUrl: 'https://i.pravatar.cc/150?img=33', priceMargin: 1.06 },
  
  // General Maintenance (cat6)
  { id: 'w34', name: 'Elis Regina', email: 'elis.r@worker.com', phone: '11966663333', address: 'Rua da Mooca, 2829, São Paulo', latitude: -23.554, longitude: -46.609, type: UserType.Worker, reputation: 4.9, areas: ['Pequenos Reparos Domésticos', 'Troca de Fechaduras', 'Instalação de Quadros e Espelhos'], profilePictureUrl: 'https://i.pravatar.cc/150?img=34' },
  { id: 'w35', name: 'Tim Maia', email: 'tim.m@worker.com', phone: '11966664444', address: 'Avenida do Cursino, 3031, São Paulo', latitude: -23.626, longitude: -46.621, type: UserType.Worker, reputation: 4.0, areas: ['Pequenos Reparos Domésticos', 'Troca de Fechaduras'], profilePictureUrl: 'https://i.pravatar.cc/150?img=35' },
  
  // Cleaners (cat7)
  { id: 'w36', name: 'Gal Costa', email: 'gal.c@worker.com', phone: '11955551111', address: 'Rua Turiassu, 3233, São Paulo', latitude: -23.536, longitude: -46.670, type: UserType.Worker, reputation: 4.7, areas: ['Limpeza Leve (1Q/1B)', 'Limpeza de Vidros e Janelas', 'Higienização de Estofados'], profilePictureUrl: 'https://i.pravatar.cc/150?img=36' },
  { id: 'w37', name: 'Nara Leão', email: 'nara.l@worker.com', phone: '11955552222', address: 'Rua Heitor Penteado, 3435, São Paulo', latitude: -23.545, longitude: -46.683, type: UserType.Worker, reputation: 4.9, areas: ['Limpeza Pesada (Pós-obra)', 'Limpeza Leve (1Q/1B)'], profilePictureUrl: 'https://i.pravatar.cc/150?img=37', priceMargin: 1.15 },
  
  // Door/Window Repair (cat8)
  { id: 'w38', name: 'João Gilberto', email: 'joao.g@worker.com', phone: '11955553333', address: 'Avenida Pacaembu, 3637, São Paulo', latitude: -23.535, longitude: -46.663, type: UserType.Worker, reputation: 4.3, areas: ['Reparo de Portas e Janelas', 'Troca de Dobradiças', 'Instalação de Telas Mosquiteiras'], profilePictureUrl: 'https://i.pravatar.cc/150?img=38' },
  { id: 'w39', name: 'Vinicius de Moraes', email: 'vinicius.m@worker.com', phone: '11955554444', address: 'Rua Ipanema, 3839, São Paulo', latitude: -23.551, longitude: -46.602, type: UserType.Worker, reputation: 3.6, areas: ['Vedação de Janelas', 'Reparo de Portas e Janelas'], profilePictureUrl: 'https://i.pravatar.cc/150?img=39' },
  
  // IT Repair (cat9)
  { id: 'w40', name: 'Tom Jobim', email: 'tom.j@worker.com', phone: '11944441111', address: 'Avenida Europa, 4041, São Paulo', latitude: -23.570, longitude: -46.674, type: UserType.Worker, reputation: 5.0, areas: ['Formatação e Instalação', 'Remoção de Vírus', 'Configuração de Roteador Wi-Fi', 'Backup de Dados'], profilePictureUrl: 'https://i.pravatar.cc/150?img=40' },
  { id: 'w41', name: 'Chico Buarque', email: 'chico.b@worker.com', phone: '11944442222', address: 'Rua do Bixiga, 4243, São Paulo', latitude: -23.555, longitude: -46.647, type: UserType.Worker, reputation: 4.8, areas: ['Configuração de Roteador Wi-Fi', 'Remoção de Vírus'], profilePictureUrl: 'https://i.pravatar.cc/150?img=41' },
];

let MOCK_BOOKINGS_DATA: Booking[] = [
    { id: 'b1', client: MOCK_USERS[0], worker: MOCK_USERS[2], service: MOCK_SPECIFIC_SERVICES[0], date: '25/07/2024', time: '14:00', distance: 5.2, totalValue: 105.50, status: BookingStatus.Completed },
    { id: 'b2', client: MOCK_USERS[0], worker: MOCK_USERS[3], service: MOCK_SPECIFIC_SERVICES[16], date: '28/07/2024', time: '10:00', distance: 8.1, totalValue: 155.00, status: BookingStatus.Accepted },
    { id: 'b3', client: MOCK_USERS[1], worker: MOCK_USERS[3], service: MOCK_SPECIFIC_SERVICES[5], date: '30/07/2024', time: '09:00', distance: 12.5, totalValue: 160.75, status: BookingStatus.Requested },
    { id: 'b4', client: MOCK_USERS[1], worker: MOCK_USERS[0], service: MOCK_SPECIFIC_SERVICES[1], date: '22/07/2024', time: '11:00', distance: 2.1, totalValue: 85.00, status: BookingStatus.Completed },
];

// --- API Functions ---

export const findUserByEmail = (email: string): User | undefined => {
  return MOCK_USERS.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
};

export const findUserById = (id: string): User | undefined => {
  return MOCK_USERS.find(u => u.id === id);
};

export const findServiceById = (id: string): SpecificService | undefined => {
  return MOCK_SPECIFIC_SERVICES.find(s => s.id === id);
};

export const getSpecificServicesByCategory = (categoryId: string): SpecificService[] => {
    return MOCK_SPECIFIC_SERVICES.filter(s => s.categoryId === categoryId);
}

export const getWorkersByService = (serviceName: string): User[] => {
    return MOCK_USERS.filter(user => user.type === UserType.Worker && user.areas?.includes(serviceName));
}

export const getClientBookings = (clientId: string): Booking[] => {
    return MOCK_BOOKINGS_DATA.filter(b => b.client.id === clientId);
}

export const getWorkerBookings = (workerId: string): Booking[] => {
    return MOCK_BOOKINGS_DATA.filter(b => b.worker.id === workerId);
}

export const findBookingById = (bookingId: string): Booking | undefined => {
    return MOCK_BOOKINGS_DATA.find(b => b.id === bookingId);
}

// Cria uma SOLICITAÇÃO de agendamento
export const createBooking = (bookingData: Omit<Booking, 'id' | 'status'>): Booking => {
    const newBooking: Booking = {
        ...bookingData,
        id: `b${Date.now()}`, // unique id
        status: BookingStatus.Requested
    };
    MOCK_BOOKINGS_DATA.push(newBooking);
    console.log('New booking request created:', newBooking);
    return newBooking;
}

// Atualiza o status de um agendamento
export const updateBookingStatus = (bookingId: string, status: BookingStatus): Booking | undefined => {
    const bookingIndex = MOCK_BOOKINGS_DATA.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
        MOCK_BOOKINGS_DATA[bookingIndex].status = status;
        console.log(`Booking ${bookingId} status updated to ${status}`);
        return MOCK_BOOKINGS_DATA[bookingIndex];
    }
    return undefined;
};

// Confirma o pagamento e atualiza o status para Aceito
export const confirmPayment = (bookingId: string, paymentMethod: 'pix' | 'card' | 'cash'): Booking | undefined => {
    const bookingIndex = MOCK_BOOKINGS_DATA.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
        MOCK_BOOKINGS_DATA[bookingIndex].status = BookingStatus.Accepted;
        MOCK_BOOKINGS_DATA[bookingIndex].paymentMethod = paymentMethod;
        console.log(`Payment confirmed for booking ${bookingId} via ${paymentMethod}. Status updated to ACEITO.`);
        return MOCK_BOOKINGS_DATA[bookingIndex];
    }
    return undefined;
}

// Simula a criação de um novo usuário
export const registerUser = (userData: Omit<User, 'id' | 'reputation' | 'latitude' | 'longitude'>): User => {
    const newUser: User = {
        ...userData,
        id: `u${Date.now()}`, // Simple unique ID
        reputation: userData.type === UserType.Worker ? 3.0 : 5.0, // Default reputation
        // Dummy coordinates for new users in São Paulo
        latitude: -23.5505 + (Math.random() - 0.5) * 0.1, 
        longitude: -46.6333 + (Math.random() - 0.5) * 0.1,
    };
    MOCK_USERS.push(newUser);
    console.log("New user registered:", newUser);
    console.log("Current user list:", MOCK_USERS);
    return newUser;
};
