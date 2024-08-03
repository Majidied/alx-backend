import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const listProducts = [
    { Id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
    { Id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
    { Id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
    { Id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
];

const client = createClient();

client.on('error', (err) => console.error('Redis Client Error', err));

client.on('connect', async () => {
    await Promise.all(
        listProducts.map((product) => client.set(product.Id, product.stock))
    );
    console.log('Redis client connected to the server');
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

function getItemById(id) {
    return listProducts.find((product) => product.Id === id);
}

async function reserveStockById(itemId, stock) {
    const reply = await getAsync(itemId);
    const currentStock = parseInt(reply);

    if (stock > currentStock) {
        throw new Error('Not enough stock available');
    }

    await setAsync(itemId, currentStock - stock);
}

async function getCurrentReservedStockById(itemId) {
    const reply = await getAsync(itemId);
    return parseInt(reply);
}

const server = express();
const port = 1245;

server.get('/list_products', (req, res) => {
    const response = listProducts.map((product) => ({
        itemId: product.Id,
        itemName: product.name,
        price: product.price,
        initialAvailableQuantity: product.stock,
    }));

    res.json(response);
});

server.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const item = getItemById(itemId);

    if (!item) {
        res.status(404).json({ status: 'Product not found' });
        return;
    }

    try {
        const stock = await getCurrentReservedStockById(itemId);
        res.json({
            itemId,
            itemName: item.name,
            price: item.price,
            initialAvailableQuantity: item.stock,
            currentQuantity: stock,
        });
    } catch (err) {
        res.status(500).json({ status: 'Error retrieving stock', error: err.message });
    }
});

server.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const item = getItemById(itemId);

    if (!item) {
        res.status(404).json({ status: 'Product not found' });
        return;
    }

    try {
        await reserveStockById(itemId, 1);
        const stock = await getCurrentReservedStockById(itemId);
        res.json({ status: 'Reservation confirmed', itemId: itemId, currentQuantity: stock });
    } catch (err) {
        res.status(500).json({ status: err.message, itemId: itemId });
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
