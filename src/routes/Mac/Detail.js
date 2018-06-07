import React, { Component, Fragment } from 'react';
import { connect } from 'dva'
import queryString from 'query-string'
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Card, Avatar, Divider, Button, Icon, Dropdown, Spin, notification } from 'antd'
import AutoSpin from '../../components/AutoSpin'

const { Description } = DescriptionList;

const ButtonGroup = Button.Group



@connect(({ mac, loading }) => ({
  current: mac.current,
  loading: loading.effects['mac/fetchDetail'],
}))
class Detail extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'mac/fetchDetail',
      payload: queryString.parse(this.props.location.search)
    })
  }

  render() {

    const { current, loading, location } = this.props

    const qs = queryString.parse(location.search)
    
    const action = (
      <Fragment>
        <ButtonGroup>
          <Button onClick={this.props.history.goBack}>返回</Button>
        </ButtonGroup>
        <Button type="primary" href={'/#/mac/confirm'}>生成MD</Button>
      </Fragment>
    );

    const description = (
      <Fragment>
      <DescriptionList size="small" style={{ paddingBottom: 8 }}>
        <Description term="分类">{current.cat}</Description>
        <Description term="文件名">{current.file_name}</Description>
        <Description term="创建日期">{current.create_on}</Description>
        <Description term="大小">{current.size}</Description>
        <Description term="校验码">{current.hashcode}</Description>
      </DescriptionList>
      <DescriptionList size="small" col={1} style={{marginBottom: 32}}>
        <Description term="原文链接"><a href={qs.link} target="_blank">{qs.link}</a></Description>
      </DescriptionList>
      </Fragment>
    )

    return (
      <AutoSpin loading={loading}>
        <PageHeaderLayout
          title={current.title}
          logo={
            <img src={current.img_url} />
          }
          action={action}
          content={description}
        >
          <Card bordered={false} title="详细介绍" style={{ marginBottom: 24 }} loading={loading}>

            <div dangerouslySetInnerHTML={{ __html: current.introduce }}></div>

          </Card>

          <Card bordered={false} title="软件截图" style={{ marginBottom: 24 }} loading={loading}>
            <div>
              {
                current.app_cap_img_url && current.app_cap_img_url.map((r, i) => (
                  <img src={r} key={i} />
                ))
              }
            </div>

          </Card>
        </PageHeaderLayout>
      </AutoSpin>
    );
  }
}

export default Detail;
