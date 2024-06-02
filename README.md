# PayTM@IIT : A Fintech Project

# Steps
- Clone the repository ``` git clone https://github.com/NailwalLakshay/paytm-wallet-project.git ```
- Install Dependency  ``` npm install ```
- Create the .env files and secrets similar to .env.example
- Get yourself a postgress db url from neon or could create one using docker
- First migrate db ``` npm run db:migrate ```
- Generate the clients ``` npm run db:generate ```
- replace url in index.ejs of bank with http://localhost:2000
- replace url in index.ts of bank-webhook with http://localhost:4000
- replace url in User/app/components/addmoney with http://localhost:4000
- Finally run ``` npm run build ``` it will start all your apps