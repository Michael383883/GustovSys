# Proyecto Backend - Laravel 11 (GUSTOVSYS)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos en tu sistema:

- **PHP 8.2 o superior**
- **Composer**
- **Base de datos PostgreSQL**

## Instalación y Configuración

### 1. Clonar el Repositorio
```sh
  git clone https://github.com/Michael383883/GustovSys.git
  cd gustovSys
```

### 2. Instalar Dependencias
```sh
  composer install
```

### 3. Configurar Variables de Entorno
```sh
  cp .env.example .env
```
Edita el archivo `.env` y configura la conexión a la base de datos:
```sh
  DB_CONNECTION=pgsql
  DB_HOST=127.0.0.1
  DB_PORT=5432
  DB_DATABASE=nombre_base_datos
  DB_USERNAME=usuario
  DB_PASSWORD=contraseña
```

### 4. Generar la Clave de Aplicación
```sh
  php artisan key:generate
```

### 5. Migrar la Base de Datos con Datos Iniciales
```sh
  php artisan migrate --seed
```

### 6. Cargar Imágenes de Productos
1. Asegúrate de que la carpeta de almacenamiento esté enlazada:
   ```sh
   php artisan storage:link
   ```
2.  Ejecuta el seeder para cargar los datos y mover las imágenes a la ubicación correcta:
   ```sh
   php artisan db:seed --class=ProductSeeder
   ```

### 7. Iniciar el Servidor
```sh
  php artisan serve
```
Por defecto, Laravel se ejecutará en `http://127.0.0.1:8000`.

## 8. Pruebas y Desarrollo
- Puedes usar **Postman** o herramientas como **Insomnia** para probar la API.
- Para ejecutar las pruebas unitarias:
```sh
  php artisan test
```

## Consideraciones Finales
- Mantén tu entorno `.env` seguro y fuera del control de versiones.
