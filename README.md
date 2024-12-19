
# Star Wars Weather Service

Este proyecto es una API serverless construida con **Node.js**, **TypeScript** y **AWS** que combina datos de la API de Star Wars (SWAPI) con datos meteorológicos obtenidos de la API de Open-Meteo. Además, utiliza **DynamoDB** como base de datos principal y para almacenar respuestas en caché de las APIs externas durante 30 minutos, optimizando el rendimiento y reduciendo costos.

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

---

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/starwars-weather.git
   cd starwars-weather
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
   HISTORY_TABLE=history-table-dev
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=tu-access-key-id
   AWS_SECRET_ACCESS_KEY=tu-secret-access-key
   ```

2. Asegúrate de que tu cuenta de AWS tenga configuradas las siguientes:
   - **VPC:** Con subnets privadas y un NAT Gateway para acceso externo.
   - **IAM Roles:** Con permisos para DynamoDB y Lambda.

---

## Estructura del Proyecto
```
src/
├── configs/
│   ├── dynamodb.ts       # Configuración de DynamoDB
├── controllers/
│   └── data.controller.ts
├── models/
│   ├── history.model.ts
│   └── product.model.ts
├── services/
│   ├── swapi.service.ts
│   ├── weather.service.ts
│   ├── cache.service.ts  # Manejo de caché con DynamoDB
├── handlers/
│   └── dataService.handler.ts
├── tests/
│   ├── controllers/
│   ├── models/
│   ├── services/
├── utils/
│   └── error.helper.ts
```

---

## Endpoints
### 1. **`GET /data/product-history`**
- **Descripción:** Retorna todos los productos almacenados en DynamoDB.

### 2. **`GET /data/planets/:id`**
- **Descripción:** Combina datos de SWAPI y Open-Meteo para un planeta específico y almacena el resultado en el historial.

### 3. **`GET /data/planets-history`**
- **Descripción:** Retorna los datos históricos de planetas almacenados en DynamoDB.

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
   - **Caché:** Verifica la funcionalidad del almacenamiento y recuperación en DynamoDB.

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

