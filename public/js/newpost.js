const newPostHandler = async (event) => {
    event.preventDefault();
  console.log('in the function');
    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
  console.log('befgore post');
    if (title && body) {
      const response = await fetch('/api/post/', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('post post');
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log('failed to view post');
      }
    }
  };

  document
  .querySelector('.post-form')
  .addEventListener('submit', newPostHandler);