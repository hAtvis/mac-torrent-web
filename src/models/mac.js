import { query, getItem, generateMD, save } from '../services/mac'

export default {
  namespace: 'mac',
  state: {
    list: false,
    current: false,
    content: false,
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    *fetch(action, { select, call, put }) {
      const list = yield select(state => state.mac.list)
      if (list === false) {
        const response = yield call(query)
        yield put({
          type: 'save',
          payload: {
            list: response
          }
        })
      }
    },
    *fetchDetail({ payload: { link } }, { call, put }) {
      const response = yield call(getItem, link)
      yield put({
        type: 'save',
        payload: {
          current: response,
        }
      })
    },
    *postMD({ callback }, { select, call, put }) {
      const current = yield select(state => state.mac.current)
      if (current) {
        const response = yield call(generateMD, current)
        if (response && response.rc === 0) {
          yield put({
            type: 'save',
            payload: {
              content: response.data
            }
          })
        }
        if (callback) {
          callback(response)
        }
      } else {
        console.log('no current item selected')
      }
    },
    *saveMD({ callback, payload: { markdown }}, { select, call, put }) {
      const current = yield select(state => state.mac.current)
      if (current) {
        const response = yield call(save, current.title, markdown)
        if (callback) {
          callback(response)
        }
      } else {
        console.log('no current item selected')
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {

    },
  }
}