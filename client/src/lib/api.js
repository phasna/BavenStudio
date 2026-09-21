const BASE_URL = '/api';

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Erreur API (${res.status}) sur ${path}`);
  }
  return res.json();
}

export function getProducts({ category, featured, gender, search } = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (featured) params.set('featured', 'true');
  if (gender) params.set('gender', gender);
  if (search) params.set('search', search);
  const query = params.toString() ? `?${params.toString()}` : '';
  return request(`/products${query}`);
}

export function getProduct(slug) {
  return request(`/products/${slug}`);
}

export function getCategories() {
  return request('/categories');
}
