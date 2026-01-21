const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Determine if running on Vercel (read-only source, writable /tmp)
const IS_VERCEL = process.env.VERCEL === '1';
const SOURCE_FILE = path.join(__dirname, 'products.json');
const DATA_FILE = IS_VERCEL ? '/tmp/products.json' : SOURCE_FILE;

app.use(cors());
app.use(bodyParser.json());

// Initialize data in /tmp if needed
const initializeData = () => {
    if (IS_VERCEL && !fs.existsSync(DATA_FILE)) {
        try {
            const seedData = fs.readFileSync(SOURCE_FILE, 'utf8');
            fs.writeFileSync(DATA_FILE, seedData);
            console.log("Initialized /tmp/products.json from source.");
        } catch (err) {
            console.error("Failed to initialize data:", err);
        }
    }
};

// Helper to read data
const readData = () => {
    try {
        if (IS_VERCEL) initializeData(); // Ensure exists before read

        if (!fs.existsSync(DATA_FILE)) {
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data:", err);
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error("Error writing data:", err);
        return false;
    }
};

// GET /products
app.get('/products', (req, res) => {
    const products = readData();
    // Simulate slight delay for loading state demo
    setTimeout(() => {
        res.json(products);
    }, 300);
});

// POST /update-stock
app.post('/update-stock', (req, res) => {
    const { id, newQuantity } = req.body;

    if (newQuantity < 0) {
        return res.status(400).json({ error: "Stock cannot be negative" });
    }

    const products = readData();
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ error: "Product not found" });
    }

    products[productIndex].stockQuantity = newQuantity;

    if (writeData(products)) {
        // Simulate network delay
        setTimeout(() => {
            res.json(products[productIndex]);
        }, 500);
    } else {
        res.status(500).json({ error: "Failed to save data" });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
