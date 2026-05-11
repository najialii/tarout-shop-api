// Seed catalog. In a real app this would come from a database; for a minimal
// demo an in-memory array is plenty. Prices are in cents.
export const products = [
	{
		id: "p1",
		name: "Aurora Headphones",
		description: "Over-ear wireless headphones with active noise cancellation.",
		price: 14900,
		image: "https://picsum.photos/seed/aurora/600/400",
		stock: 24,
	},
	{
		id: "p2",
		name: "Nimbus Mechanical Keyboard",
		description: "65% hot-swappable keyboard, gasket-mounted, RGB.",
		price: 9900,
		image: "https://picsum.photos/seed/nimbus/600/400",
		stock: 12,
	},
	{
		id: "p3",
		name: "Lumen Desk Lamp",
		description: "Aluminium LED lamp with adjustable colour temperature.",
		price: 4500,
		image: "https://picsum.photos/seed/lumen/600/400",
		stock: 40,
	},
	{
		id: "p4",
		name: "Vega 4K Webcam",
		description: "4K/30fps webcam with auto-framing and dual mics.",
		price: 11900,
		image: "https://picsum.photos/seed/vega/600/400",
		stock: 8,
	},
	{
		id: "p5",
		name: "Orbit Wireless Mouse",
		description: "Ergonomic mouse, 8000 DPI, 70-day battery.",
		price: 5900,
		image: "https://picsum.photos/seed/orbit/600/400",
		stock: 31,
	},
	{
		id: "p6",
		name: "Cobalt USB-C Hub",
		description: "7-in-1 hub: HDMI, 100W PD, 3x USB-A, SD/microSD.",
		price: 3900,
		image: "https://picsum.photos/seed/cobalt/600/400",
		stock: 50,
	},
];

export function findProduct(id) {
	return products.find((p) => p.id === id) ?? null;
}
