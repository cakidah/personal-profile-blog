function publishPost() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (title && content) {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const newPost = {
      id: Date.now(), // Unique ID
      title,
      content,
      time: new Date().toISOString()
    };
    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    displayPosts(); // Re-render posts
  } else {
    alert("Title and content cannot be empty.");
  }
}

function deletePost(id) {
  let posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts = posts.filter(post => post.id !== id);
  localStorage.setItem("posts", JSON.stringify(posts));
  displayPosts();
}

function displayPosts() {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  const postSection = document.getElementById("blog-posts");
  postSection.innerHTML = "<h2>My Blog</h2>"; // Clear existing posts

  posts.forEach(post => {
    const article = document.createElement("article");
    article.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>Published on ${new Date(post.time).toLocaleString()}</small><br/>
      <button onclick="deletePost(${post.id})" class="delete-btn">Delete</button>
    `;
    postSection.appendChild(article);
  });
}

window.onload = displayPosts;

// Optional: Auto publish predefined posts
function autoPublish() {
  const scheduled = [
    { title: "Lessons from the Field", content: "Today I trained 10 sub-agents and closed 3 deals." },
    { title: "What I’ve Learned from Customer Service", content: "Listening is key. Feedback is gold." }
  ];

  scheduled.forEach(post => {
    savePost(post.title, post.content);
  });

  loadPosts();
}

// Uncomment to auto publish
// autoPublish();