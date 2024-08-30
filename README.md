## Development

1. Descargar imagen de mongo y de postgres (si no las tiene descargadas)

   ```
   docker pull mongo:6.0.6
   docker pull postgres:15.3
   ```

2. Levantar la base de datos:

   ```
   docker compose up -d
   ```

3. Reemplazar el .env.template a .env

4. Reemplazar las variables de entorno

5. Instalar las dependencias

   ```
   npm install
   ```

6. Migrar prisma

   ```
   npx prisma migrate dev
   ```

7. generar prisma

   ```
   npx prisma generate
   ```

8. Levantar el server

   ```
   npm run dev
   ```

9. Ejecutar el SEED para [crear la base de datos](localhost:3000/api/seed)

# Nota:

usuario: test1@google.com
password: 123456

# Prisma commands

inicializar prisma

```
npx prisma init
```

migrar prisma

```
npx prisma migrate dev
```

generar prisma

```
npx prisma generate
```

Traer los models de la base de datos

```
npx prisma db pull
```

## Prod

## Stage
