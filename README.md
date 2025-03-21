# Challenge AWS 🚀  
Este proyecto es una API Serverless que combina datos de personajes de **Star Wars** con información meteorológica. Se implementa en **AWS Lambda** con **Serverless Framework** y se protege mediante **autenticación JWT**.  

---

## 📌 **Tecnologías utilizadas**
- **Node.js 20.x** con TypeScript  
- **Serverless Framework**  
- **AWS Lambda** y **API Gateway**  
- **DynamoDB**  
- **AWS X-Ray** para trazabilidad  
- **Rate-limiting con API Key**  
- **Autenticación con JWT**  

---

## ⚙️ **Configuración del Proyecto**
### **1️⃣ Instalación**
Clona el repositorio y ejecuta:
```sh
npm install
```

---

## 🏗 **Arquitectura de los Endpoints**
### **Endpoints disponibles**
| Método | Endpoint      | Descripción |
|--------|-------------|-------------|
| `GET`  | `/fusionados` | Obtiene datos de Star Wars y clima. (🔒 Requiere JWT) |
| `POST` | `/almacenar` | Guarda datos en DynamoDB. (🔒 Requiere JWT) |
| `GET`  | `/historial` | Obtiene historial de datos guardados. (🔒 Requiere JWT) |

---

## 🔐 **Autenticación con JWT**
### **1️⃣ Generar Token JWT**
Ejecuta este script para generar un token válido:
```ts
import jwt from "jsonwebtoken";

const SECRET_KEY = "super_secreto_seguro";
const token = jwt.sign({ sub: "usuario123" }, SECRET_KEY, { expiresIn: "1h" });

console.log("Token JWT:", token);
```

---

## 🔑 **Rate-Limiting con API Key**
En `serverless.yml`, habilita API Keys:
```yaml
provider:
  name: aws
  runtime: nodejs20.x
  apiGateway:
    apiKeys:
      - ChallengeApiKey
    usagePlan:
      quota:
        limit: 1000
        period: MONTH
      throttle:
        rateLimit: 10
        burstLimit: 20
```

Los endpoints protegidos requieren una **API Key** en el header:
```sh
curl -X GET "https://tu-api.execute-api.us-east-1.amazonaws.com/dev/historial" \
     -H "x-api-key: TU_API_KEY"
```

---

## 📡 **Habilitar X-Ray para Monitoreo**
Añadir en `serverless.yml`:
```yaml
provider:
  tracing:
    apiGateway: true
    lambda: true
```

---

## 🚀 **Despliegue en AWS**
### **1️⃣ Configurar Credenciales de AWS**
Ejecuta:
```sh
aws configure
```

### **2️⃣ Desplegar con Serverless**
```sh
serverless deploy
```

---

## 🛠 **Solución de Errores Comunes**
### ❌ `ApiKey already exists`
Si al desplegar obtienes este error:
```sh
Resource handler returned message: "ApiKey with name ChallengeApiKey already exists"
```
Solución:
```sh
serverless remove
serverless deploy
```

### ❌ `403 Permission Denied en GitHub`
Si no puedes hacer `push`, actualiza usuario y correo:
```sh
git config --global user.name "TuNombre"
git config --global user.email "tuemail@example.com"
```

---
## Autor

Desarrollado por DominicAVS.
Correo: [partner.dominic@hotmail.com]
GitHub: [https://github.com/DominicVillanueva](https://github.com/DominicVillanueva)
