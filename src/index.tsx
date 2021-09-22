import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Peças para o carro',
          type: 'withdraw',
          category: 'Despesas',
          amount: 550,
          createdAt: new Date('2021-06-25 19:00:00'),
        },
        {
          id: 2,
          title: 'Venda de TV',
          type: 'deposit',
          category: 'Vendas',
          amount: 1250,
          createdAt: new Date('2021-06-15 09:00:00'),
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })


    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);