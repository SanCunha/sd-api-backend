import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import jwt from 'jsonwebtoken';

const secretKey = '29619b621392f4aae0e7eb8dc83ae746';

// Sample user data
const users: { [key: string]: string } = {
    'kaka': '152computacao',
    'frodo': '121civil'
  };

interface LoginRequestBody {
    username: string;
    password: string;
}

export async function loginHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const body: LoginRequestBody = await request.json() as LoginRequestBody;
    const { username, password } = body;


    if (users[username] && users[username] === password) {

        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        return {
            status: 200,
            jsonBody: { token }
        };
    } else {

        return {
            status: 401,
            jsonBody: { message: 'Invalid credentials' }
        };
    }
};


app.http('loginHandler', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: loginHandler
});
