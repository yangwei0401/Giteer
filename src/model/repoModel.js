import Taro from '@tarojs/taro';
import * as repo from '../pages/mine/repo/service';

export default {
  namespace: 'repo',
  state: {
    repo_list: []
  },
  effects: {
    *getRepoList({payload, callback}, {call, put, select}){
      const { repo_list } = yield select(state => state.repo);
      const { page } = payload;
      const res = yield call(repo.getRepoList,payload);
      console.log(res);
      if(res.length > 0){
        callback(res);
        yield put({
          type: 'save',
          payload: {
            repo_list: page > 1 ? [...repo_list, ...res] : res,
          },
        });
      }
    }
  },
  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
}
