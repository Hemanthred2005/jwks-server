# JWKS Server

A simple JWKS (JSON Web Key Set) server built with :contentReference[oaicite:2]{index=2} and :contentReference[oaicite:3]{index=3}.  
This project serves JSON Web Keys for testing JWT signing and verification.  
It also provides endpoints to issue valid and expired JWTs for testing client behavior.

---

## 📁 Project Structure

jwks-server/
├── src/
│ ├── keys.js
│ ├── routes.js
│ ├── server.js
│ ├── util.js
│ └── tests/
│ └── server.test.js
├── test-client.js
├── jest.config.js
├── .eslintrc.json
├── .eslintignore
├── package.json
└── README.md


---

## ⚙️ Setup & Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd jwks-server

# Install dependencies
npm install
