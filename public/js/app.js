async function loadUser() {
  try {
    const res = await fetch('/api/user');
    if (!res.ok) throw new Error('Not authenticated');
    const user = await res.json();
    document.getElementById('name').textContent = user.displayName;
    document.getElementById('email').textContent = user.email;
    document.getElementById('avatar').src = user.avatar || '/img/default-avatar.png';
  } catch (err) {
    window.location.href = '/';
  }
}

loadUser();
