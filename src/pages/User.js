import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Table } from 'antd';

const GET_RATES = gql`
  query GetRates{
    rates(currency: "USD") {
      currency, rate
    }
  }
`;

export const User = () => {
  return (
    <Query query={GET_RATES}>
      {({ loading, data }) => {
        const columns = [
          {
            key: 'currency',
            title: 'Currency',
            dataIndex: 'currency',
          },
          {
            key: 'rate',
            title: 'Rate',
            dataIndex: 'rate',
          },
        ];

        if (data.rates) {
          data.rates.forEach((n, i) => {
            n.key = i;
          });
        }
        const dataSource = data.rates || [];

        return (
          <div style={{ padding: '32px' }}>
            <Table
              size="small"
              loading={loading}
              dataSource={dataSource}
              columns={columns}
            />
          </div>
        );
      }}
    </Query>
  );
};