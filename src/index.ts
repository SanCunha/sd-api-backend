import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const secretKey = '29619b621392f4aae0e7eb8dc83ae746';

app.use(bodyParser.json());

const users: { [key: string]: string } = {
  'kaka': '152computacao',
  'frodo': '121civil'
};

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (users[username] && users[username] === password) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});