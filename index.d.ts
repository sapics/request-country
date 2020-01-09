import * as express from 'express';

interface MiddlewareOptions {
	attributeName: string,
	privateIpCountry: string
}

declare function middleware(options: MiddlewareOptions) : express.RequestHandler;

export default function requestCountry(req: express.Request, privateIpCountry: string) : string;
