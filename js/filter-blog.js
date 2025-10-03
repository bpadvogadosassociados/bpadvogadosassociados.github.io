<script>
const buttons = document.querySelectorAll(".categories button");
const posts = document.querySelectorAll("post-card");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    // esconder todos
    posts.forEach(post-card => {
      post-card.style.display = "none";
    });

    // mostrar apenas os da categoria clicada
    posts.forEach(post-card => {
      if (post-card.getAttribute("data-category") === category) {
        post-card.style.display = "block";
      }
    });
  });
});
</script>
