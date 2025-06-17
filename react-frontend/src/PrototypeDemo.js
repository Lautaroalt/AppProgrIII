import React, { useEffect, useState } from 'react';

function PrototypeDemo() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  // Carga la lista de usuarios clonados
  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost:3001/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
        setMessage(data.message || '');
      })
      .catch(() => setMessage('Error al cargar usuarios'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envía nuevo usuario al backend para clonar
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setMessage('Por favor ingresa nombre y email');
      return;
    }
    setLoading(true);
    fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
        setMessage(data.message || '');
        setForm({ name: '', email: '' });
      })
      .catch(() => setMessage('Error al clonar usuario'))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h2>Prototype Pattern Demo</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <button type="submit" disabled={loading}>
          Clonar Usuario
        </button>
      </form>

      {message && <p><strong>Mensaje:</strong> {message}</p>}

      <h3>Usuarios Clonados (JSON):</h3>
      <pre>{JSON.stringify(users, null, 2)}</pre>

      <h3>Usuarios Clonados (Lista):</h3>
      {users.length === 0 ? (
        <p>No hay usuarios clonados aún.</p>
      ) : (
        <ul>
          {users.map((u, idx) => (
            <li key={idx}>
              <strong>Nombre:</strong> {u.name} <br />
              <strong>Email:</strong> {u.email}
            </li>
          ))}
        </ul>
      )}

      {loading && <p>Cargando...</p>}
    </div>
  );
}

export default PrototypeDemo;
