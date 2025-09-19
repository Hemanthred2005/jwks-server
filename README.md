# 🔐 JWKS Server

A simple **JWKS (JSON Web Key Set)** server built using **Node.js + Express**.  
It serves JSON Web Keys for testing JWT signing and verification.  
It also provides endpoints to issue **valid** and **expired** JWTs to test client behavior.

---

## 📁 Project Structure

jwks-server/
├── src/
│ ├── keys.js
│ ├── routes.js
│ ├── server.js
│ ├── util.js
├── tests/
│ └── server.test.js
├── test-client.js
├── jest.config.js
├── package.json
├── .eslintrc.json
├── .eslintignore
└── README.md


---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Hemanthred2005/jwks-server.git
cd jwks-server
