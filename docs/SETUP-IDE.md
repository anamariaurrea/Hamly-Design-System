# IDE Setup & Troubleshooting

## Reiniciar el servidor de TypeScript en VSCode
1. Abre la paleta de comandos (`Cmd+Shift+P`)
2. Busca y ejecuta: `TypeScript: Restart TS server`

## Limpiar caché y reiniciar el bundler
- Si usas Expo:
  ```sh
  expo start -c
  ```
- Si usas React Native CLI:
  ```sh
  npx react-native start --reset-cache
  ```

## Comandos ejecutados para instalar dependencias
```
expo install react-native-paper react-native-vector-icons react-native-safe-area-context
```

## Configuración de TypeScript
- Se actualizaron las opciones en `tsconfig.json`:
  - skipLibCheck
  - allowSyntheticDefaultImports
  - esModuleInterop
  - moduleResolution: node
  - resolveJsonModule

## Notas
- Si sigues viendo errores de tipado, reinicia el servidor de TypeScript y limpia el caché del bundler.
- Si el problema persiste, revisa que las dependencias estén correctamente instaladas en `node_modules`.
