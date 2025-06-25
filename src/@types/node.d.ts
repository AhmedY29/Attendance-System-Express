declare module "node:*" {
  const value: any;
  export default value;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: string;
    MONGO_URI: string;
  }
}