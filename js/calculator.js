        function calcularAposentadoria() {
            const genero = document.getElementById('genero').value;
            const idade = parseInt(document.getElementById('idade').value);
            const contribuicao = parseInt(document.getElementById('contribuicao').value);
            const salario = parseFloat(document.getElementById('salario').value);
            const resultado = document.getElementById('resultado');

            // Validação
            if (!genero || !idade || !contribuicao || !salario) {
                resultado.innerHTML = '<p class="error">❌ Por favor, preencha todos os campos.</p>';
                return;
            }

            // Requisitos mínimos
            const idadeMinima = genero === 'mulher' ? 62 : 65;
            const contribuicaoMinima = genero === 'mulher' ? 15 : 20;
            const contribuicaoCompleta = genero === 'mulher' ? 35 : 40;
            const contribuicaoBase = genero === 'mulher' ? 15 : 20;

            // Verifica se pode se aposentar
            const podeAposentar = idade >= idadeMinima && contribuicao >= contribuicaoMinima;

            // Calcula o percentual
            let percentual = 60;
            const anosExcedentes = contribuicao - contribuicaoBase;
            if (anosExcedentes > 0) {
                percentual += (anosExcedentes * 2);
            }
            if (percentual > 100) percentual = 100;

            // Calcula o valor estimado
            const valorEstimado = (salario * percentual) / 100;

            // Calcula quanto falta
            const faltaIdade = idadeMinima - idade;
            const faltaContribuicao = contribuicaoMinima - contribuicao;

            // Pontuação atual (para regra de transição)
            const pontos = idade + contribuicao;
            const pontosNecessarios = genero === 'mulher' ? 91 : 101;

            // Monta o resultado
            let html = '<div class="result-content">';

            if (podeAposentar) {
                html += '<h4 class="success">✅ Você já pode se aposentar!</h4>';
                html += `<p class="valor-destaque">Valor estimado: <strong>R$ ${valorEstimado.toFixed(2).replace('.', ',')}</strong></p>`;
                html += `<p class="percentual">Isso representa <strong>${percentual}%</strong> da sua média salarial.</p>`;
                
                if (percentual < 100) {
                    const anosPara100 = contribuicaoCompleta - contribuicao;
                    const novoValor = salario;
                    html += `<div class="dica-box">
                        <p><strong>💡 Dica:</strong> Se você trabalhar mais ${anosPara100} anos, 
                        receberá 100% da média (R$ ${novoValor.toFixed(2).replace('.', ',')}).</p>
                    </div>`;
                }

                // Verifica regra de pontos
                if (pontos < pontosNecessarios) {
                    const faltaPontos = pontosNecessarios - pontos;
                    html += `<div class="info-box">
                        <p><strong>Regra de Pontos:</strong> Você tem ${pontos} pontos. 
                        Com mais ${faltaPontos} pontos, poderia se aposentar pela regra de transição, 
                        potencialmente com valor integral.</p>
                    </div>`;
                }

            } else {
                html += '<h4 class="warning">⏳ Você ainda não pode se aposentar</h4>';
                
                if (faltaIdade > 0) {
                    html += `<p>Faltam <strong>${faltaIdade} anos de idade</strong> (você terá ${idadeMinima} anos em ${new Date().getFullYear() + faltaIdade})</p>`;
                }
                
                if (faltaContribuicao > 0) {
                    html += `<p>Faltam <strong>${faltaContribuicao} anos de contribuição</strong></p>`;
                }

                // Simula valor quando atingir requisitos
                const contribuicaoFutura = Math.max(contribuicao, contribuicaoMinima);
                let percentualFuturo = 60 + ((contribuicaoFutura - contribuicaoBase) * 2);
                if (percentualFuturo > 100) percentualFuturo = 100;
                const valorFuturo = (salario * percentualFuturo) / 100;

                html += `<div class="info-box">
                    <p><strong>Quando você se aposentar:</strong></p>
                    <p>Valor estimado: R$ ${valorFuturo.toFixed(2).replace('.', ',')} 
                    (${percentualFuturo}% da média)</p>
                </div>`;
            }

            html += `<p class="disclaimer">⚠️ Este é um cálculo simplificado. O valor real pode variar 
            conforme suas contribuições específicas, regras de transição aplicáveis e correções do INSS.</p>`;
            html += '</div>';

            resultado.innerHTML = html;
        }