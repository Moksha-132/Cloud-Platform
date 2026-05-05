const BASE_URL = 'http://localhost:5000/api/files';

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem('shnoor_user'));
  return {
    'Authorization': `Bearer ${user?.token}`
  };
};

export const getFiles = async (parentId = '', tab = '') => {
  const res = await fetch(`${BASE_URL}?parentId=${parentId}&tab=${tab}`, {
    headers: getHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch files');
  return data;
};

export const uploadFile = async (file, parentId = '') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('parentId', parentId);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: getHeaders(),
    body: formData
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data;
};

export const createFolder = async (name, parentId = '') => {
  const res = await fetch(`${BASE_URL}/folder`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, parentId })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create folder');
  return data;
};

export const renameFile = async (id, name) => {
  const res = await fetch(`${BASE_URL}/rename`, {
    method: 'PUT',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, name })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Rename failed');
  return data;
};

export const deleteFile = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Delete failed');
  return data;
};

export const moveFile = async (id, parentId) => {
  const res = await fetch(`${BASE_URL}/move`, {
    method: 'PUT',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, parentId })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Move failed');
  return data;
};

export const shareFile = async (id, permission = 'view') => {
  const res = await fetch(`${BASE_URL}/share`, {
    method: 'POST',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, permission })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Share failed');
  return data;
};

export const getSharedFile = async (token) => {
  const res = await fetch(`${BASE_URL}/share/${token}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'File not found');
  return data;
};

export const renameSharedFile = async (token, name) => {
  const res = await fetch(`${BASE_URL}/share/rename`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, name })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Rename failed');
  return data;
};

export const toggleStar = async (id) => {
  const res = await fetch(`${BASE_URL}/star/${id}`, {
    method: 'PUT',
    headers: getHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Action failed');
  return data;
};

export const restoreFile = async (id) => {
  const res = await fetch(`${BASE_URL}/restore/${id}`, {
    method: 'PUT',
    headers: getHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Restore failed');
  return data;
};

export const deleteForever = async (id) => {
  const res = await fetch(`${BASE_URL}/forever/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Action failed');
  return data;
};

export const updateFileContent = async (id, content) => {
  const res = await fetch(`${BASE_URL}/content/${id}`, {
    method: 'PUT',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, content })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Save failed');
  return data;
};

export const updateSharedFileContent = async (token, content) => {
  const res = await fetch(`${BASE_URL}/share/content`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, content })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Save failed');
  return data;
};
