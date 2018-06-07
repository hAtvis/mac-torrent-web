import request from '../utils/request';

export async function query() {
  return request('/mt/tor/items')
}

export async function getItem(url) {
  return request(`/mt/tor/item/${encodeURIComponent(url)}`)
}

export async function generateMD(current) {
  return request(`/mt/g/md`, {
    method: 'POST',
    body: current,
  })
}

export async function save(title, markdown) {
  return request('/mt/g/save', {
    method: 'POST',
    body: {
      title, markdown
    }
  })
}