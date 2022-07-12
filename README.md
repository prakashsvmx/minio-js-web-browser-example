spin up a local minio server

Guide: https://docs.min.io/docs/distributed-minio-quickstart-guide.html

This assumes the minio executable is in PATH variable. 

```
MINIO_CI_CD=on MINIO_ROOT_USER=minio MINIO_ROOT_PASSWORD=minio123 minio server /tmp/d{1...4}

#### The output would be like:

MinIO Object Storage Server
Copyright: 2015-2022 MinIO, Inc.
License: GNU AGPLv3 <https://www.gnu.org/licenses/agpl-3.0.html>
Version: DEVELOPMENT.2022-07-12T00-30-56Z (go1.18.3 linux/amd64)

Status:         4 Online, 0 Offline. 
API: http://192.168.125.64:9000  http://172.17.0.1:9000  http://172.18.0.1:9000  http://127.0.0.1:9000               
RootUser: minio 
RootPass: minio123 
Console: http://192.168.125.64:37263 http://172.17.0.1:37263 http://172.18.0.1:37263 http://127.0.0.1:37263        
RootUser: minio 
RootPass: minio123 

Command-line: https://docs.min.io/docs/minio-client-quickstart-guide

```

Or Download and run  (https://docs.min.io/docs/minio-quickstart-guide.html)
```
wget https://dl.min.io/server/minio/release/darwin-amd64/minio
chmod +x minio
MINIO_CI_CD=on MINIO_ROOT_USER=minio MINIO_ROOT_PASSWORD=minio123 ./minio server /tmp/d{1...4}
```




```
npm install
npm start
```


`mc.js` contains the credentials to connect to an endpoint
