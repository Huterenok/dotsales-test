# Dotsales test task

Task description - https://nwamo.notion.site/5692f6d4d5a94e68ba0cd452705e63e3

amoCRM:
email - lebronkukich@gmail.com
password - dotsales

# Skill issues

1. Couldn't resolve how to add additional contact info to deals.
   In src/modules/crm/crm.service in createDeal method tried to use custom_fields_values,
   but it didn't help

# Deployment

This project can be deployed in two ways

1. Local deployment

Just replace variables to your values and

```bash
npm install && npm start:dev
```

2. Deployment on VPS with Docker

Make sure that you have docker on VPS and run

```bash
docker build . -t dotsales
docker run -dp 3000:3000 dotsales
```
