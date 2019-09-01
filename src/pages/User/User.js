import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const GET_BOOKS = gql`
  query {
    books {
      title, author, id,
    }
  }
`;

export const User = () => {
  return (
    <Query query={GET_BOOKS}>
      {({ loading, data }) => {
        const columns = [
          {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
            render: id => (
              <Link to={`/user/${id}`} style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{id}</Link>
            ),
          },
          {
            key: 'title',
            title: 'Title',
            dataIndex: 'title',
            width: 500,
          },
          {
            key: 'author',
            title: 'Author',
            dataIndex: 'author',
          },
        ];

        if (data.books) {
          data.books.forEach((n, i) => {
            n.key = i;
          });
        }
        const dataSource = data.books || [];

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