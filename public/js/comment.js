const newCommentHandler = async (event) => {
    event.preventDefault();

    const body = document.querySelector('#comment-body').value.trim();
    const post_id = window.location.href.toString().split("/").pop();

    if (body && post_id) {
      const response = await fetch('/api/comment/', {
        method: 'POST',
        body: JSON.stringify({ body, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        console.log('failed to post comment');
      }
    }
  };

  document
  .querySelector('.comment-form')
  .addEventListener('submit', newCommentHandler);