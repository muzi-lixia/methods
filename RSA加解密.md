### ``jsencrypt.js``进行RSA加解密

RSA加密算法是一种 **非对称加密算法** ，RSA加密使用了"一对"密钥.分别是公钥和私钥，这个公钥和私钥其实就是一组数字!其二进制位长度可以是1024位或者2048位。长度越长其加密强度越大,目前为止公之于众的能破解的最大长度为768位密钥,只要高于768位，相对就比较安全。所以目前为止,这种加密算法一直被广泛使用。

### RSA加密与解密

- 使用 **公钥** 加密的数据,利用 **私钥** 进行解密
- 使用 **私钥** 加密的数据,利用 **公钥** 进行解密

生成私钥，长度为1024bit （命令：``openssl genrsa -out private.pem 1024``）

```csharp
$ openssl genrsa -out private.pem 1024
    Generating RSA private key, 1024 bit long modulus (2 primes)
    ...+++++
    .............................+++++
    e is 65537 (0x010001)
```

从私钥中提取公钥 （命令：``openssl rsa -in private.pem -pubout -out public.pem``）

```csharp
$ openssl rsa -in private.pem -pubout -out public.pem
  writing RSA key
```

这样就生成了private.pem 和 public.pem两个文件，可以利用终端进行查看

命令（``cat private.pem``，``cat public.pem``)

### jsencrypt就是一个基于rsa加解密的js库

##### 1.安装

```nginx
npm install jsencrypt
```

##### 2.引入

```javascript
import JSEncrypt from 'jsencrypt'
```

##### 3.加密

```javascript
var encryptor = new JSEncrypt()  // 创建加密对象实例
  //之前ssl生成的公钥，复制的时候要小心不要有空格
  var pubKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1QQRl0HlrVv6kGqhgonD6A9SU6ZJpnEN+Q0blT/ue6Ndt97WRfxtSAs0QoquTreaDtfC4RRX4o+CU6BTuHLUm+eSvxZS9TzbwoYZq7ObbQAZAY+SYDgAA5PHf1wNN20dGMFFgVS/y0ZWvv1UNa2laEz0I8Vmr5ZlzIn88GkmSiQIDAQAB-----END PUBLIC KEY-----'
  encryptor.setPublicKey(pubKey)//设置公钥
  var rsaPassWord = encryptor.encrypt('要加密的内容')  // 对内容进行加密
```

##### 4.解密

```javascript
var decrypt = new JSEncrypt()//创建解密对象实例
  //之前ssl生成的秘钥
  var priKey  = '-----BEGIN RSA PRIVATE KEY-----MIICXAIBAAKBgQC1QQRl0HlrVv6kGqhgonD6A9SU6ZJpnEN+Q0blT/ue6Ndt97WRfxtSAs0QoquTreaDtfC4RRX4o+CU6BTuHLUm+eSvxZS9TzbwoYZq7ObbQAZAY+SYDgAA5PHf1wNN20dGMFFgVS/y0ZWvv1UNa2laEz0I8Vmr5ZlzIn88GkmSiQIDAQABAoGBAKYDKP4AFlXkVlMEP5hS8FtuSrUhwgKNJ5xsDnFV8sc3yKlmKp1a6DETc7N66t/Wdb3JVPPSAy+7GaYJc7IsBRZgVqhrjiYiTO3ZvJv3nwAT5snCoZrDqlFzNhR8zvUiyAfGD1pExBKLZKNH826dpfoKD2fYlBVOjz6i6dTKBvCJAkEA/GtL6q1JgGhGLOUenFveqOHJKUydBAk/3jLZksQqIaVxoB+jRQNOZjeSO9er0fxgI2kh0NnfXEvH+v326WxjBwJBALfTRar040v71GJq1m8eFxADIiPDNh5JD2yb71FtYzH9J5/d8SUHI/CUFoROOhxr3DpagmrnTn28H0088vubKe8CQDKMOhOwx/tS5lqvN0YQj7I6JNKEaR0ZzRRuEmv1pIpAW1S5gTScyOJnVn1tXxcZ9xagQwlT2ArfkhiNKxjrf5kCQAwBSDN5+r4jnCMxRv/Kv0bUbY5YWVhw/QjixiZTNn81QTk3jWAVr0su4KmTUkg44xEMiCfjI0Ui3Ah3SocUAxECQAmHCjy8WPjhJN8y0MXSX05OyPTtysrdFzm1pwZNm/tWnhW7GvYQpvE/iAcNrNNb5k17fCImJLH5gbdvJJmCWRk=-----END RSA PRIVATE KEY----'
  decrypt.setPrivateKey(priKey)//设置秘钥
  var uncrypted = decrypt.decrypt(encrypted)//解密之前拿公钥加密的内容
```

### 配合 ``crypto-js`` 做数据加解密

```javascript
import {JSEncrypt} from 'jsencrypt' // RAS加解密
import CryptoJS from 'crypto-js'

// 加解密公钥、私钥
const PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCaBfO2ojnE+lP9rWCVPTQFmv8CY3LUcdNxMjh7Lo9/h/V7LvcPdUye/32j7DRAi+Zd0EbGal+UinJFIFAsObD5rEctEfa12UFz3VFMii/Z+c9Gt6noyV21FfqsCu0j0DIyfECaaBnfKNC7awpGLLaoCZL611YI/AFgl33h5Rq5wIDAQAB';
const PRIVATE_key = 'MIICWwIBAAKBgQDCaBfO2ojnE+lP9rWCVPTQFmv8CY3LUcdNxMjh7Lo9/h/V7LvcPdUye/32j7DRAi+Zd0EbGal+UinJFIFAsObD5rEctEfa12UFz3VFMii/Z+c9Gt6noyV21FfqsCu0j0DIyfECaaBnfKNC7awpGLLaoCZL611YI/AFgl33h5Rq5wIDAQABAoGAGFC2sZupxeU6qFK+Lxf7Ks+zH+n9/zEyUWrMiV13ietwBey/LnPZZ6AUirM8NVglpfdBgGc8SN1z9n+HDxVRN3VmAmj0/hiprx3d8SFJRhsBofn8wYVj+bHltj4Mpl7s427aNWE4uum1cvVMaIWLwbMrHtYB7pbL2sMkoIQvDkECQQD01dVP2GPQ+Dezow8vPOZGHx3fUBGr10SkmY1QEY693bVuBg7NtgOjmQ+/J7N99bgcCymWql95tyESmdn/jNbHAkEAy0WQUU87onYuaF3IOj/42pVXTdXewsJvVzTxutTVSV5BPtJdl+oiz7DD0e/+PcFv4J4d1GDguCMrXLP6xvkq4QJAcrR765yFpzGjZxXN12PAvrl1VVo97TQ9hKAsBIc1SN7GUXWlGdtceRkMt5HyFeE5EGpqYZwQfwW9COnrqD5joQJAD9CywNDEWAiP5cjeKkIN75vM9h5cvZR5KzTQVfP3QEUYGHYvmAE8giJDqhLdGhrxxG0o7vw2n70Ew6qxKUf7oQJAfigCQ9WJxi18Q7zBqMtIPWF+CkYIDY1QadRNKuv5vjzNzJlpMezc489OOz9MxA08BOYj/whsXiZ9mWnfCf0xog==';

/*
* 获取16位随机数
* */
const getRandom = function (len) {
    len = len || 32;
    const charsStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';// 字符串
    const maxPos = charsStr.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += charsStr.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
/*
* 根据随机数生成随机key值
* */
const getRsaCode = function (key) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUBLIC_KEY);
    return encrypt.encrypt(key);
}

/*
* 加密数据
* */
const getAesCode = function (data, key) {
    key = CryptoJS.enc.Latin1.parse(key);
    const iv = CryptoJS.enc.Latin1.parse('16-Bytes-String');
    return CryptoJS.AES.encrypt(data, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7}).toString()
}

/*
* 根据key值获取生成的16随机数
* */
const getRsaRandom = function (key) {
    const encrypt = new JSEncrypt();
    encrypt.setPrivateKey(PRIVATE_key);
    return encrypt.decrypt(key);
}

/*
* 解密数据
* */
const getAesData = function (data, key) {
    key = CryptoJS.enc.Latin1.parse(key);
    const iv = CryptoJS.enc.Latin1.parse('16-Bytes-String');
    return CryptoJS.AES.decrypt(data, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8);
}

export default {
    encrypt: function (params) {
        const random = getRandom(16);
        const rasKey = getRsaCode(random);
        const aseVal = {};
        aseVal.data = getAesCode(params, random);
        aseVal.key = rasKey;
        return aseVal;
    },
    decrypt: function (params) {
        const random = getRsaRandom(params.key);
        return getAesData(params.data, random);
    },
    encryptAll: function (params) {
        const random = getRandom(16);
        const rasKey = getRsaCode(random);
        const res = {};
        const data = {}
        for (const key in params) {
            if (params[key] !== 0 && !params[key]) {
                if (typeof params[key] !== 'string') {
                    continue
                }
            }
            let val = params[key] + '';
            val = val.trim();
            data[key] = getAesCode(val, random);
        }
        res.key = rasKey;
        res.data = data;
        return res;
    },
    decryptAll: function (params) {
        const random = getRsaRandom(params.key);
        const res = {};
        for (const key in params.data) {
            if (params.data[key] !== 0 && !params.data[key]) {
                if (typeof params.data[key] !== 'string') {
                    continue
                }
            }
            let val = params.data[key] + '';
            val = val.trim();
            res[key] = getAesCode(val, random);
        }
        return res;
    }
}
```

