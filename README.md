
# Star Wars Service

- Este proyecto es una API serverless construida con **Node.js**, **TypeScript**, **Express**, **Serverless Framework** y **AWS**
- Integra la **API de Star Wars (SWAPI)**.
- Se uso **DynamoDB** para almacenar en cache por 30 minutos las respuestas de **API de Star Wars (SWAPI)**,  optimizando el rendimiento y reduciendo costos.
- Crea y obtiene productos, utilizando **DynamoDB** como base de datos y **Joi** para validar el request POST.
- Los keys devueltos por **API de Star Wars (SWAPI)** son todos traducidos al español
- Se uso **Jest** para las pruebas unitarias de un modelo,controlador y servicio
- Ha sido desplegado en AWS sin errores

---

## Tabla de Contenidos
- [Requisitos](#requisitos)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints](#endpoints)
- [Pruebas Unitarias](#pruebas-unitarias)
- [Despliegue a AWS](#despliegue-a-aws)

---

## Requisitos
- **Node.js** >= 20.x
- **AWS CLI** configurado con permisos para Lambda, DynamoDB y VPC
- **Serverless Framework** >= 3.x

---

## Tecnologías Utilizadas
- **Node.js**: Motor de JavaScript para el backend.
- **TypeScript**: Tipado estático y desarrollo robusto.
- **AWS Lambda**: Para ejecutar la API serverless.
- **AWS DynamoDB**:
   - Como base de datos principal para almacenar productos e historial.
   - Como sistema de caché para respuestas de las APIs externas.
- **Serverless Framework**: Para la administración y despliegue de la infraestructura.
- **Jest**: Framework de pruebas unitarias.
- **Axios**: Cliente HTTP para consumir las APIs externas (SWAPI y Open-Meteo).
- **Joi**: Para validar los request.

---

## Instalación
1. Clona el repositorio:
   ```bash
   git clone git@github.com:anthonycv/starwars.git
   cd starwars
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

---

## Configuración
1. Crea un archivo `.env` en el directorio raíz con las siguientes variables:
   ```env
   PRODUCTS_TABLE=products-table-dev
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=tu-access-key-id
   AWS_SECRET_ACCESS_KEY=tu-secret-access-key
   ```

2. Asegúrate de que tu cuenta de AWS tenga configuradas las siguientes:
   - **IAM Roles:** Con permisos para DynamoDB y Lambda.

---

## Estructura del Proyecto
```
src/
├── configs/
│   ├── dynamodb.ts       # Configuración de DynamoDB
├── controllers/
│   └── data.controller.ts
│   └── product.controller.ts
├── models/
│   └── product.model.ts
├── services/
│   ├── swapi.service.ts
│   ├── cache.service.ts  # Manejo de caché con DynamoDB
├── schemas/
│   ├── store.schema.ts
├── handlers/
│   └── dataService.handler.ts
├── tests/
│   ├── controllers/
│   ├── models/
│   ├── services/
├── translations/ # Definicion de traducciones
├── utils/
│   └── error.helper.ts
```

--- 
## Endpoints
### 1. **`POST https://cvw0jor919.execute-api.us-east-1.amazonaws.com/store`**
- **Descripción:** Crea productos en una base de datos DynamoDB.
- **Params:** 
  ```
    {
       "name": "table",
       "color": "yellow",
       "quantity": 200,
       "price": 30.00
    }
  ```
### 2. **`https://cvw0jor919.execute-api.us-east-1.amazonaws.com/data/product-history`**
- **Descripción:** Retorna todos los productos almacenados en DynamoDB.

### 3. **`GET https://cvw0jor919.execute-api.us-east-1.amazonaws.com/data/planets/:id`**
- **Descripción:** Retorna la informacion de un planeta segun su ID.

### 4. **`GET https://cvw0jor919.execute-api.us-east-1.amazonaws.com/data/planets`**
- **Descripción:** Obtiene la informacion de los planetas.

---

## Pruebas Unitarias
1. **Framework utilizado:** Jest con soporte para TypeScript.
2. **Comando para ejecutar las pruebas:**
   ```bash
   npm test
   ```
3. **Cobertura de pruebas:**
   - **Controladores:** Verifica el correcto manejo de las peticiones.
   - **Modelos:** Asegura el funcionamiento de las interacciones con DynamoDB.
   - **Servicios:** Mockea las respuestas de las APIs externas para simular diferentes escenarios.

---

## Despliegue a AWS
1. Instala el **Serverless Framework**:
   ```bash
   npm install -g serverless
   ```

2. Despliega el proyecto:
   ```bash
   serverless deploy
   ```

3. Verifica los endpoints desplegados:
   ```bash
   serverless info
   ```

4. Configura un **NAT Gateway** y **VPC** en AWS si necesitas acceso a APIs externas desde Lambda.

