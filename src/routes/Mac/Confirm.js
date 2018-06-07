import React, { Component, Fragment } from 'react';
import { connect } from 'dva'
import AutoSpin from '../../components/AutoSpin'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import { Card, Button, notification } from 'antd'

import ReactMde, { ReactMdeTypes } from 'react-mde'
import * as Showdown from "showdown"
import 'react-mde/lib/styles/css/react-mde-all.css';

@connect(({ mac, loading }) => ({
  content: mac.content,
  current: mac.current,
  loading: loading.effects['mac/postMD'],
  saveLoading: loading.effects['mac/saveMD'],
}))
class Confirm extends Component {
  constructor(props) {
    super(props)
    this.converter = new Showdown.Converter({ tables: true, simplifiedAutoLink: true });
    this.state = {
      mdeState: {
        markdown: props.content || '',
      }
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'mac/postMD'
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content != this.props.content) {
      this.setState({
        mdeState: {
          markdown: nextProps.content || ''
        }
      })
    }
  }

  handleValueChange = (mdeState) => {
    this.setState({ mdeState })
  }

  handleSave = () => {
    this.props.dispatch({
      type: 'mac/saveMD',
      payload: {
        markdown: this.state.mdeState.markdown,
      },
      callback: (res) => {
        if (res && res.rc === 0) {
          notification.success({
            message: '操作成功',
            description: res.message,
          })
        }
      }
    })
  }

  render() {
    const { loading, current, saveLoading } = this.props
    const { mdeState } = this.state
    return (
      <AutoSpin loading={loading}>
        <PageHeaderLayout>
          <Card title={current.title} loading={loading} bordered={false} extra={<Fragment>
            <Button type="primary" onClick={this.handleSave} loading={saveLoading}>保存</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.props.history.goBack}>返回</Button>
          </Fragment>}>
            {
              current ? <ReactMde onChange={this.handleValueChange}
                editorState={mdeState}
                generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
                layout="tabbed"
              /> : null
            }
          </Card>
        </PageHeaderLayout>
      </AutoSpin>
    );
  }
}

export default Confirm;
