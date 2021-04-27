//setando para o mode de desenvolvimento
const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev' :
            return {
                dbString : 'mongodb+srv://thiago:root123@apim1.yin34.mongodb.net/ApiM1?retryWrites=true&w=majority',
                jwtPass : 'starwarsémelhorquestartrek',
                jwtExpires : '1d'
            }
        case 'hml' :
            return {
                dbString : 'mongodb+srv://thiago:root123@apim1.yin34.mongodb.net/ApiM1?retryWrites=true&w=majority',
                jwtPass : 'starwarsémelhorquestartrek',
                jwtExpires : '1d'
            }
        case 'prod' :
            return {
                dbString : 'mongodb+srv://thiago:root123@apim1.yin34.mongodb.net/ApiM1?retryWrites=true&w=majority',
                jwtPass : 'starwarsémelhorquestartrek',
                jwtExpires : '1d'
            }
    }
};

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();