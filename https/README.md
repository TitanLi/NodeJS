# 建立https服務
## 介紹
https即 HTTP + SSL
## 建立方式
在使用之前需要建立公開金鑰、私密金曜及憑證，以上都可透過openSSL工具來完成工具來完成

步驟一
```
$ openssl genrsa -out server-key.pem 1024

Generating RSA private key, 1024 bit long modulus
.....++++++
.................++++++
e is 65537 (0x10001)
```

步棸二
```
$ openssl req -new -key server-key.pem -out server-csr.pem

You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:
State or Province Name (full name) []:
Locality Name (eg, city) []:
Organization Name (eg, company) []:
Organizational Unit Name (eg, section) []:
Common Name (eg, fully qualified host name) []:localhost
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
```
> 需注意Common Name如果開發者是在本機工作，那麼就直接輸入localhost即可，其他選項留空即可

步驟三
```
$ openssl x509 -req -in server-csr.pem -signkey server-key.pem -out server-cert.pem

Signature ok
subject=/CN=localhost
Getting Private key
```