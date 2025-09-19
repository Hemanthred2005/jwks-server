/** @returns {number} current unix time (seconds) */
export const nowSeconds = () => Math.floor(Date.now() / 1000);

/** @param {number} m minutes  @returns {number} unix time `m` minutes in the future */
export const minutesFromNow = (m) => nowSeconds() + m * 60;

/** @param {number} expSeconds unix exp  @returns {boolean} whether exp is in the past */
export const isExpired = (expSeconds) => expSeconds <= nowSeconds();
