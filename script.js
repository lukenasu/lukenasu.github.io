const form = document.getElementById('post-form');
const postsSection = document.getElementById('posts');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const body = formData.get('body');

    await createIssue(title, body);
    form.reset();
});

async function createIssue(title, body) {
    const url = 'https://api.github.com/repos/{username}/{username}.github.io/issues';
    const data = {
        title: title,
        body: body
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'token YOUR_ACCESS_TOKEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    displayPost(result);
}

async function fetchIssues() {
    const url = 'https://api.github.com/repos/{username}/{username}.github.io/issues';
    const response = await fetch(url);
    const data = await response.json();
    data.forEach(issue => {
        displayPost(issue);
    });
}

function displayPost(issue) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <h3>${issue.title}</h3>
        <p>${issue.body}</p>
        <hr>
    `;
    postsSection.appendChild(postElement);
}

// 페이지 로드 시 기존 게시글 불러오기
window.onload = async function() {
    await fetchIssues();
};
