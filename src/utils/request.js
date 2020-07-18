/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: 'Success',
  201: 'Created',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: 'Success, no content',
  400: 'Malformed Request!',
  401: 'Permission denied',
  403: 'Permission recognized, but access denied!',
  404: 'Wrong URL!',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: 'SEVER ERROR!',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    if (response.status === 401) {
      window.open(
        'https://api.outreach.io/oauth/authorize?client_id=csijgHr1EAq6YIJ2rRne5WGWVnUuL0_t_bRu1HIf2Ho&redirect_uri=https://a.deephire.com/outreach&response_type=code&scope=accounts.all+calls.all',
        '_self',
      );
    }
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `Uh oh! ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'No Network Connection Detected',
      message: 'Network Error!',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
});
export default request;
