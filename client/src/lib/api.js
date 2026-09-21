import mockData from '../data/mockData.json';

const BASE_URL = '/api';

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Erreur API (${res.status}) sur ${path}`);
  }
  return res.json();
}

function mockProducts({ category, featured, gender, search } = {}) {
  let products = mockData.products;

  if (featured) products = products.filter((p) => p.featured);
  if (gender === 'homme' || gender === 'femme') {
    products = products.filter((p) => p.gender === gender || p.gender === 'unisexe');
  }
  if (category) products = products.filter((p) => p.category?.slug === category);
  if (search) {
    const query = search.toLowerCase();
    products = products.filter((p) => p.name.toLowerCase().includes(query));
  }

  return products;
}

export async function getProducts(filters = {}) {
  const { category, featured, gender, search } = filters;
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (featured) params.set('featured', 'true');
  if (gender) params.set('gender', gender);
  if (search) params.set('search', search);
  const query = params.toString() ? `?${params.toString()}` : '';

  try {
    return await request(`/products${query}`);
  } catch {
    return mockProducts(filters);
  }
}

export async function getProduct(slug) {
  try {
    return await request(`/products/${slug}`);
  } catch {
    const product = mockData.products.find((p) => p.slug === slug);
    if (!product) throw new Error('Produit introuvable');
    return product;
  }
}

export async function getCategories() {
  try {
    return await request('/categories');
  } catch {
    return mockData.categories;
  }
}
