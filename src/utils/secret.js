const CryptoJS = require("crypto-js"); //引用AES源码js

const keyx = CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); //十六位十六进制数作为密钥
const ivx = CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); //十六位十六进制数作为密钥偏移量
//**************************************************************
//*字符串加密
//*   str：需要解密的字符串
//****************************************************************/
function Encrypt_AES(o, key, iv) {
  if (typeof o === "string") {
    if (o) {
      let srcs = CryptoJS.enc.Utf8.parse(o);
      return CryptoJS.AES.encrypt(srcs, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
    }
  } else if (typeof o === "object") {
    for (let _o in o) {
      if (o[_o]) {
        let srcs = CryptoJS.enc.Utf8.parse(o[_o]);
        o[_o] = CryptoJS.AES.encrypt(srcs, key, {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }).toString();
      }
    }
  }
  return o;
}

const Decrypt = (word) => {
  return Encrypt_AES(word, keyx, ivx);
};
export default Decrypt;

//**************************************************************
//*字符串解密
//*   str：需要解密的字符串
//****************************************************************/
export function Decrypt_AES(str, key, iv) {
  var decrypt = CryptoJS.AES.decrypt(str, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr;
}
export const Decrypt_JM = (word) => {
  return Decrypt_AES(word, keyx, ivx);
};
