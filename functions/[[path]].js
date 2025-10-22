import { app } from '../src/app';

export async function onRequest(context) {
  return app(context.request, context.env, context);
}
