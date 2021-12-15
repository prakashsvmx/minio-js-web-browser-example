import * as minio from "minio";
const mc = new minio.Client(/*{
    endPoint: "play.min.io",
    port: 9000,
    useSSL: true,
    accessKey: "Q3AM3UQ867SPQQA43P2F",
    secretKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG"
}*/
    {
            endPoint: "localhost",
            useSSL: false,
            port: 9000,
            accessKey: "minio",
            secretKey: "minio123"
    }
);


export default mc