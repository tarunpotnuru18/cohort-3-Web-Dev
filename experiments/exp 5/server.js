import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory user storage (replace with a database in production)
const users = [];

// JWT secret (use a strong, randomly generated key in production)
const JWT_SECRET = 'your-secret-key';

// Routes
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user
    users.push({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
});

app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = users.find(user => user.email === email);

    if (user && await bcrypt.compare(password, user.password)) {
        // Create and send JWT
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/api/logout', (req, res) => {
    // In a real-world scenario, you might want to invalidate the token here
    res.status(200).json({ message: 'Logged out successfully' });
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.get('/home', authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// For demonstration purposes
console.log('Server is set up. You can now test the authentication flow:');
console.log('1. Open http://localhost:3000 in your browser');
console.log('2. Sign up with a new account');
console.log('3. Sign in with the created account');
console.log('4. You will be redirected to the home page upon successful login');