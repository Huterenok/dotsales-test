# Dotsales test task

Task description - https://nwamo.notion.site/5692f6d4d5a94e68ba0cd452705e63e3

amoCRM:

email - lebronkukich@gmail.com

password - dotsales

# Deployment

Before deployment, make sure that you have changed AUTHORIZATION_CODE in .env file to your code.

1. Local deployment

```bash
npm install && npm start
```

2. Deployment with Docker

```bash
docker build . -t dotsales && docker run -dp 3000:3000 dotsales
```
