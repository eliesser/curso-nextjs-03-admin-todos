## Development

1. Descargar imagen de mongo y de postgres (si no las tiene descargadas)

```bash
docker pull mongo:6.0.6
docker pull postgres:15.3
```

2. Levantar la base de datos:

```bash
docker compose up -d
```

3. Reemplazar el .env.template a .env

4. Reemplazar las variables de entorno

# Prisma commands

inicializar prisma

```bash
npx prisma init
```

```bash
npx prisma migrate dev
```

```bash
npx prisma generate
```

## Prod

## Stage
