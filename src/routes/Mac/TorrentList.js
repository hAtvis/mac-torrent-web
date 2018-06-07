import React, { Component } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
} from 'antd';
import { Link } from 'dva/router'

@connect(({ mac, loading }) => ({
  list: mac.list,
  loading: loading.models.mac
}))
class TorrentList extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'mac/fetch'
    })
  }
  
  render() {
    const { list, loading } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 20,
      total: list.length,
    };

    return (
      <PageHeaderLayout>
        <Card>
          <List
            size="large"
            rowKey="id"
            loading={loading}
            dataSource={list}
            pagination={paginationProps}
            renderItem={ item => (
              <List.Item actions={[<Link to={{ pathname: '/mac/detail', search: '?link=' + encodeURIComponent(item.href)}}>预览</Link>]}>
                <List.Item.Meta
                  avatar={<Avatar src={item.img_url} shape="square" size="large" />}
                  title={<Link to={{ pathname: '/mac/detail', search: '?link=' + encodeURIComponent(item.href)}}>{item.title}</Link>}
                  description={item.desc}
                />
                <div style={{textAlign: 'right'}}>
                <p>
                  {item.cat}
                </p>
                <p>
                  {item.create_on}
                </p>
                </div>
              </List.Item>
            )}
          >
          </List>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default TorrentList;
