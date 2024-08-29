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

5. Levantar el server

   ```
   npm run dev
   ```

6. Ejecutar el SEED para [crear la base de datos](localhost:3000/api/seed)

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

## Prod

## Stage
