/** 封裝 Promise 物件
 * @desc 處理 Promise 物件，封裝成好處理的物件
 * @param {Promise} promise promise 異步處理物件
 * @returns [error: Promise.reject(), res: Promise.resolve()]
 */
export const to = (promise) => {
    if (!(promise instanceof Promise)) {
        promise = Promise.resolve(promise);
    }

    return promise.then((res) => [null, res]).catch((error) => [error]);
};
