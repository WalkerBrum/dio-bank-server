export interface User {
  name: string
  email: string
}

let db = [
  {
    name: "Walker",
    email: "walker.b.lobato@gmail.com"
  }
];

export class UserService {
  db: User[];

  constructor(database = db) {
    this.db = database;
  }

  createUser = (name: string, email: string) => {
    const user = {
      name,
      email
    };

    this.db.push(user);
    console.log('DB atualizado', this.db);
  }

  getAllUsers = () => {
    return this.db;
  }

  deleteUser = (email: string) => {
    const deleteUser = this.db.filter(user => user.email !== email);

    this.db = deleteUser;
  }
}