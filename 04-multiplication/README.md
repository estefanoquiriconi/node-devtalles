# Multiplicación CLI

Una aplicación de línea de comandos que genera tablas de multiplicación y las guarda en archivos de texto.

## Descripción

Esta aplicación permite generar tablas de multiplicación personalizadas y guardarlas en archivos de texto. Puedes especificar:
- El número base para la tabla
- El límite de multiplicaciones
- Si deseas ver la tabla en consola
- El nombre del archivo de salida
- La carpeta de destino

## Instalación

```bash
# Instalar dependencias
pnpm install
```

## Uso

La aplicación se puede ejecutar con varios argumentos:

```bash
pnpm start -- --base 5 --limit 10 --show --name "tabla-5" --destination "mis-tablas"
```

### Argumentos disponibles

| Argumento | Alias | Descripción | Tipo | Por defecto | Requerido |
|-----------|-------|-------------|------|-------------|-----------|
| --base | -b | Número base para la tabla | number | - | Sí |
| --limit | -l | Límite de multiplicaciones | number | 10 | No |
| --show | -s | Mostrar tabla en consola | boolean | false | No |
| --name | -n | Nombre del archivo | string | "table" | No |
| --destination | -d | Carpeta de destino | string | "outputs" | No |

### Ejemplos

1. Generar tabla básica del 5:
```bash
pnpm start -- --base 5
```

2. Generar tabla del 3 hasta el 20:
```bash
pnpm start -- -b 3 -l 20
```

3. Generar y mostrar tabla del 7:
```bash
pnpm start -- -b 7 -s
```

4. Generar tabla con nombre personalizado:
```bash
pnpm start -- -b 4 -n "tabla-del-cuatro"
```

5. Generar tabla en carpeta específica:
```bash
pnpm start -- -b 6 -d "mis-tablas"
```

## Estructura del proyecto

```
src/
├── app.ts                         # Punto de entrada
├── domain/
│   └── use-cases/                # Casos de uso
│       ├── create-table.use-case.ts
│       └── save-file.use-case.ts
├── config/
│   └── plugins/
│       └── args.plugin.ts        # Configuración de argumentos
└── presentation/
    └── server-app.ts            # Lógica principal
```

## Notas

- La aplicación creará automáticamente la carpeta de destino si no existe
- Los archivos se guardan en formato .txt
- El número base debe ser positivo