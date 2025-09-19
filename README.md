# 🔐 JWKS Server

A simple **JWKS (JSON Web Key Set) server** built using **Node.js + Express**.  
It serves JSON Web Keys for testing JWT signing and verification, and provides endpoints to issue both **valid** and **expired JWTs** for client testing.

---

## 📂 Project Structure


jwks-server/
├── src/
│ ├── keys.js
│ ├── routes.js
│ ├── server.js
│ ├── util.js
│ ├── tests/
│ │ └── server.test.js
│ ├── screenshots/
│ │ └── *.png # proof screenshots
├── test-client.js
├── jest.config.js
├── package.json
├── .eslintrc.json
├── .eslintignore
└── README.md
---

## ⚙️ Setup & Installation


---

## ⚙️ Requirements
- Node.js **v18+**
- npm (comes with Node.js)

---

## 🚀 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hemanthred2005/jwks-server.git
   cd jwks-server


## 📸 Screenshots

Here are the required proof screenshots for the JWKS server:

1. **Server running (`npm start`)**  
   ![Server Running](./src/screenshots/npm-start.png)

2. **Tests passing (`npm test`)**  
   ![Tests Passing](./src/screenshots/npm-test.png)

3. **Test coverage (`npm run coverage`)**  
   ![Coverage Report](./src/screenshots/npm-coverage.png)

4. **Blackbox test client (`node test-client.js`)**  
   ![Test Client](./src/screenshots/test-client.png)

