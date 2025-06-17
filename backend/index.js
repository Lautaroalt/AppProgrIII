const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// --- Prototype ---
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  clone() {
    return new User(this.name, this.email);
  }
}

// --- Observer ---
class Observer {
  update(message) {
    console.log('Observer:', message);
  }
}

const observer = new Observer();
const clonedUsers = []; // Guardamos aquí los usuarios clonados en memoria

// Ruta GET para obtener todos los usuarios clonados
app.get('/api/users', (req, res) => {
  res.json({
    users: clonedUsers,
    message: 'Lista de usuarios clonados',
  });
});

// Ruta POST para clonar un usuario nuevo
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Faltan parámetros name o email' });
  }

  const baseUser = new User(name, email);
  const clonedUser = baseUser.clone();

  clonedUsers.push(clonedUser);
  observer.update(`Usuario clonado correctamente: ${name} - ${email}`);

  res.json({
    users: clonedUsers,
    message: 'Usuario clonado y Observer notificado',
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
