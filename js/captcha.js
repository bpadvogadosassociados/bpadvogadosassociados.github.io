<script>
  const form = document.getElementById("myForm");
  const captchaLabel = document.getElementById("captchaLabel");
  const captchaInput = document.getElementById("captchaInput");
  const captchaErro = document.getElementById("captchaErro");

  let resultado;

  function gerarCaptcha() {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    resultado = n1 + n2;
    captchaLabel.textContent = `${n1} + ${n2} = ?`;
    captchaInput.value = "";
    captchaErro.style.display = "none"; // esconde mensagem de erro quando gera novo
  }

  gerarCaptcha();

  form.addEventListener("submit", function(e) {
    const valor = parseInt(captchaInput.value, 10);

    if (valor !== resultado) {
      e.preventDefault(); // bloqueia envio
      captchaErro.textContent = "Resposta incorreta. Tente novamente:";
      captchaErro.style.display = "block";
      gerarCaptcha(); // gera nova conta
    }
  });
</script>
