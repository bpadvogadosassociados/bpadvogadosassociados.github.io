<script>
const buttons = document.querySelectorAll(".filters button");
const posts = document.querySelectorAll(".post");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    // esconder todos
    posts.forEach(post => {
      post.style.display = "none";
    });

    // mostrar apenas os da categoria clicada
    posts.forEach(post => {
      if (post.getAttribute("data-category") === category) {
        post.style.display = "block";
      }
    });
  });
});
</script>
