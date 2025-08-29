import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

// ==============================================================================
// SUAS FUNÇÕES DE MENU
// ==============================================================================
function cabecalho() {
    console.clear();
    console.log("***********************************************");
    console.log("               Sorveteria do Bairro            ");
    console.log("***********************************************\n");
}

function menuPrincipal() {
    console.log("===============================");
    console.log("       MENU PRINCIPAL          ");
    console.log("===============================");
    console.log("1 - Já sou cliente");
    console.log("2 - Novo cliente");
    console.log("3 - Sair");
    console.log("===============================");
}

function produtos() {
    console.clear();
    cabecalho();
    console.log("Escolha o tipo de produto: ");
    console.log("- casquinha (R$5)");
    console.log("- pote (R$7)");
    console.log("========================================");
}

function sabores() {
    console.clear();
    cabecalho();
    console.log("Escolha o sabor desejado: ");
    console.log("- creme");
    console.log("- morango");
    console.log("- chocolate");
    console.log("- doce de leite");
    console.log("========================================");
}

function adicionais() {
    console.clear();
    cabecalho();
    console.log("Escolha seu adicional: ");
    console.log("- biscoito (+R$2)");
    console.log("- paçoca (+R$2)");
    console.log("- jujuba (+R$2)");
    console.log("- sem adicionais");
    console.log("========================================");
}

function caldas() {
    console.clear();
    cabecalho();
    console.log("Escolha sua calda: ");
    console.log("- morango (+R$1)");
    console.log("- chocolate (+R$1)");
    console.log("- sem calda");
    console.log("========================================");
}

// ==============================================================================
// NOVA FUNÇÃO DE PAGAMENTO
// ==============================================================================
function pagamento(valorTotal) {
    console.log("\n=== Formas de Pagamento ===");
    console.log("1 - Dinheiro");
    console.log("2 - Cartão");
    console.log("3 - Pix");
    const opcao = prompt("Escolha a forma de pagamento: ");

    switch (opcao) {
        case '1': {
            const valorPago = parseFloat(prompt("Digite o valor pago: R$ "));
            if (valorPago >= valorTotal) {
                const troco = valorPago - valorTotal;
                console.log(`✅ Pagamento realizado! Troco: R$ ${troco.toFixed(2)}`);
            } else {
                console.log("❌ Valor insuficiente! Pedido cancelado.");
            }
            break;
        }
        case '2':
            console.log("💳 Pagamento no cartão aprovado!");
            break;
        case '3':
            console.log("📱 Pagamento via Pix confirmado!");
            break;
        default:
            console.log("⚠️ Opção inválida. Tente novamente.");
            pagamento(valorTotal); // chama de novo até escolher corretamente
            break;
    }
}

// ==============================================================================
// LÓGICA PRINCIPAL DO PROGRAMA
// ==============================================================================

// Array de clientes inicial
let clientes = [
    ["00000000000", "José da Silva"],
    ["11111111111", "Maria José"]
];

let sair = false;
while (!sair) {
    cabecalho();
    menuPrincipal();
    let opcao = prompt("Digite o número da sua opção: ");

    switch (opcao) {
        case '1': {
            console.log("\n--- Login de Cliente ---");
            const cpf = prompt("Digite seu CPF para login: ");
            let clienteEncontrado = null;

            for (let i = 0; i < clientes.length; i++) {
                if (clientes[i][0] === cpf) {
                    clienteEncontrado = clientes[i];
                    break;
                }
            }

            if (clienteEncontrado) {
                console.log(`\nBem-vindo(a) de volta, ${clienteEncontrado[1]}!`);
                prompt("Pressione Enter para montar seu sorvete...");

                const pedido = [];
                let total = 0;

                produtos();
                const tipoProduto = prompt("Digite o tipo escolhido: ");
                pedido.push(tipoProduto);
                total += (tipoProduto === "casquinha") ? 5 : 7;

                sabores();
                const saborEscolhido = prompt("Digite o sabor escolhido: ");
                pedido.push(saborEscolhido);

                adicionais();
                const adicionalEscolhido = prompt("Digite o adicional escolhido: ");
                pedido.push(adicionalEscolhido);
                if (adicionalEscolhido !== "sem adicionais") total += 2;

                caldas();
                const caldaEscolhida = prompt("Digite a calda escolhida: ");
                pedido.push(caldaEscolhida);
                if (caldaEscolhida !== "sem calda") total += 1;

                cabecalho();
                console.log(`\n--- Resumo do Pedido de ${clienteEncontrado[1]} ---`);
                console.log(`Produto: ${pedido[0]}`);
                console.log(`Sabor: ${pedido[1]}`);
                console.log(`Adicional: ${pedido[2]}`);
                console.log(`Calda: ${pedido[3]}`);
                console.log(`Total a pagar: R$ ${total.toFixed(2)}`);

                pagamento(total); // 🔥 chama a função de pagamento
            } else {
                console.log("\nCPF não encontrado.");
            }
            prompt("\nPressione Enter para voltar ao menu principal...");
            break;
        }

        case '2': {
            console.log("\n--- Cadastro de Novo Cliente ---");
            const novoNome = prompt("Digite seu nome completo: ");
            const novoCpf = prompt("Digite seu CPF (apenas números): ");

            const novoCliente = [novoCpf, novoNome];
            clientes.push(novoCliente);

            console.log(`Cadastro realizado com sucesso, ${novoNome}!`);
            prompt("Pressione Enter para montar seu sorvete...");

            const pedido = [];
            let total = 0;

            produtos();
            const tipoProduto = prompt("Digite o tipo escolhido: ");
            pedido.push(tipoProduto);
            total += (tipoProduto === "casquinha") ? 5 : 7;

            sabores();
            const saborEscolhido = prompt("Digite o sabor escolhido: ");
            pedido.push(saborEscolhido);

            adicionais();
            const adicionalEscolhido = prompt("Digite o adicional escolhido: ");
            pedido.push(adicionalEscolhido);
            if (adicionalEscolhido !== "sem adicionais") total += 2;

            caldas();
            const caldaEscolhida = prompt("Digite a calda escolhida: ");
            pedido.push(caldaEscolhida);
            if (caldaEscolhida !== "sem calda") total += 1;

            cabecalho();
            console.log(`\n--- Resumo do Pedido de ${novoNome} ---`);
            console.log(`Produto: ${pedido[0]}`);
            console.log(`Sabor: ${pedido[1]}`);
            console.log(`Adicional: ${pedido[2]}`);
            console.log(`Calda: ${pedido[3]}`);
            console.log(`Total a pagar: R$ ${total.toFixed(2)}`);

            pagamento(total); // 🔥 chama a função de pagamento

            prompt("\nPressione Enter para voltar ao menu principal...");
            break;
        }

        case '3':
            sair = true;
            break;

        default:
            console.log("\nERRO! Opção inválida.");
            prompt("Pressione Enter para tentar novamente...");
            break;
    }
}

console.log("\nSaindo do programa. Volte sempre!");
