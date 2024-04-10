# Sample block chain project Project

This project to demonstrate a simple blockchain solution including login/signup page and transfer token page 

This project contain 3 part : backend, frontend , contract 

Toke Contract has been deployed in bsc testnet with address : 0x026C63f4741242E7ac1C83fc9669C52E93cd7D50 under the name of HLTHY token
We use bsc testnet for easy for deployment and faucet. Ropsten or Rinkeby testnet has been terminated since may 2022

# Backend deployment
  - Framework: NestJS
  - Database: PostgreSQL
  - Others: TypeScript + TypeOrm
  - Installation: 
    + Step 1: Clone the repository
    + Step 2: Install dependencies: `npm install`
    + Step 3: Create the Environment  File name `.env` with values
      `DB_HOST=127.0.0.1
      DB_PORT=5432
      DB_USERNAME=your_database_username
      DB_PASSWORD=your_database_password
      DB_NAME=your_database_name
      JWT_SECRET_KEY="your_strong_jwt_secret_key"`
    + Step 4: Start the development server: `npm run start:dev`
# Frontend Deployment
  - React Vite
  - Library: 
    + wagmi v2
    + web3modal
    + Tailwind CSS
  - Installation: 
    + Step 1: Clone the repository
    + Step 2: Install dependencies: `npm install`
    + Step 3: Create the Environment  File name `.env` with values
     `VITE_BASE_URL=your_backend_url
      VITE_CONTRACT_ADDRESS=your_contract_address
      VITE_CONTRACT_NETWORK=your_contract_network_id_deployed`
    + Step 4: Start the development server: `npm run dev`
# Testing
case 1 : 
prerequisite : user need tobe whitelisted (contact me to add your wallets to whitelist)
  - sign up with your email address and choose password
  - login and go to the transfer page
  - connect your wallet. THe page should display balance of HLTHY token
  - transfer your HLTHY token to other wallet 
  - display success

case 2 : 
prerequisite : user not whitelisted 
  - sign up with your email address and choose password
  - login and go to the transfer page
  - connect your wallet. THe page should display balance of HLTHY token
  - transfer your HLTHY token to other wallet 
  - display failed(error message will show below SEND NOW button)
