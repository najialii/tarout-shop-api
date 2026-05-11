import { randomUUID } from "node:crypto";
import cors from "cors";
import express from "express";
import { findProduct, products } from "./products.js";

const app = express();
app.use(express.json());

// CORS — allow the frontend origin. Set ALLOWED_ORIGIN to your deployed
// frontend URL in production; defaults to "*" so local dev "just works".
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({ origin: allowedOrigin }));

// Health check — handy for platform probes.
app.get("/health", (_req, res) => {
	res.json({ status: "ok", service: "tarout-shop-api", time: new Date().toISOString() });
});

// List all products.
app.get("/api/products", (_req, res) => {
	res.json(products);
});

// Single product by id.
app.get("/api/products/:id", (req, res) => {
	const product = findProduct(req.params.id);
	if (!product) return res.status(404).json({ error: "Product not found" });
	res.json(product);
});

// Create an order. This demo doesn't persist anything — it validates the
// cart against the catalog, computes the total, and echoes back an order
// confirmation. Swap the body for a DB write when you have one.
app.post("/api/orders", (req, res) => {
	const items = Array.isArray(req.body?.items) ? req.body.items : null;
	if (!items || items.length === 0) {
		return res.status(400).json({ error: "Order must contain at least one item" });
	}

	const lineItems = [];
	for (const item of items) {
		const product = findProduct(item?.productId);
		const qty = Number.parseInt(item?.quantity, 10);
		if (!product) {
			return res.status(400).json({ error: `Unknown product: ${item?.productId}` });
		}
		if (!Number.isInteger(qty) || qty < 1) {
			return res.status(400).json({ error: `Invalid quantity for ${product.id}` });
		}
		if (qty > product.stock) {
			return res.status(409).json({ error: `Only ${product.stock} of ${product.name} in stock` });
		}
		lineItems.push({
			productId: product.id,
			name: product.name,
			unitPrice: product.price,
			quantity: qty,
			lineTotal: product.price * qty,
		});
	}

	const total = lineItems.reduce((sum, li) => sum + li.lineTotal, 0);
	res.status(201).json({
		orderId: randomUUID(),
		createdAt: new Date().toISOString(),
		currency: "USD",
		items: lineItems,
		total,
	});
});

// Root — tiny landing so hitting the bare URL isn't a 404.
app.get("/", (_req, res) => {
	res.type("text/plain").send(
		"tarout-shop-api — try GET /api/products, GET /api/products/:id, POST /api/orders, GET /health",
	);
});

const port = Number.parseInt(process.env.PORT, 10) || 3000;
app.listen(port, () => {
	console.log(`tarout-shop-api listening on :${port} (CORS origin: ${allowedOrigin})`);
});
