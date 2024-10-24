/* eslint-disable no-unused-vars */
exports.ProxyIps = class ProxyIps {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let { url } = params.query;
    let res = await fetch(url);
    let data = await res.json();
    return data;
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    const url = params.query.url;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}. Detalles: ${errorText}`);
      }
      const res = await response.text();
      return res;
    } catch (error) {
      console.error('Error al realizar el POST:', error);
      throw new Error(error);
    }
  }
  

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
