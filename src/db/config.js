import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

const {PORT, HOST, HOST_URL, SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER, JWT_SECRET} = process.env;
const SQL_ENCRYPT = process.env.SQL_ENCRYPT === 'true';


assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

const config = { 
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        options: {
            encrypt: SQL_ENCRYPT,
            enableArithAbort: true,
            trustedConnection: true,
            trustServerCertificate: true,

        }
    },
    jwt_secret: JWT_SECRET
};

export default config;