const updateHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#update-title').value.trim();
    const body = document.querySelector('#update-body').value.trim();
    const post_id = window.location.href.toString().split("/").pop();

    if ((title || body) && post_id) {
      const response = await fetch(`/api/post/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        document.location.replace(`/post/${post_id}`);
      } else {
        console.log('failed to update post');
      }
    }
  };

  document
  .querySelector('.update-form')
  .addEventListener('submit', updateHandler);