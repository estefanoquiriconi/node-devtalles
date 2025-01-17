import type { Context } from '@netlify/functions';

export default async (req: Request, context: Context) => {
  const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;
  
  console.log('Hola mundo desde los logs');

  return new Response(myImportantVariable);
};
