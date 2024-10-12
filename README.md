# Preparar un Disco HDD para Usar en un Servidor Ubuntu

Este documento detalla cómo eliminar el formato de un disco HDD en Windows y prepararlo para ser utilizado en un servidor Ubuntu.

## Paso 1: Eliminar el Formato del Disco en Windows

1. **Conecta el disco HDD a tu PC con Windows**.
2. **Accede a "Administración de discos"**:
   - Haz clic derecho en el botón de "Inicio" y selecciona **"Administración de discos"**.
3. **Localiza el disco HDD** en la lista de discos.
4. **Eliminar particiones**:
   - Haz clic derecho en cada partición del disco y selecciona **"Eliminar volumen"** o **"Eliminar partición"**.
   - Repite este proceso hasta que todo el disco aparezca como espacio sin asignar.
5. **Omitir el formateo**: No formatees el disco en Windows, ya que lo formatearás en Ubuntu más adelante.

## Paso 2: Conectar y Preparar el Disco en Ubuntu

1. **Conecta el disco HDD al servidor Ubuntu**.

2. **Verifica que Ubuntu reconozca el disco**:
   Abre una terminal y ejecuta el siguiente comando para ver los discos conectados:

   ```
   sudo fdisk -l
   ```


Deberías ver el disco HDD listado, probablemente como /dev/sdb (o un nombre similar).

3. **Crear una nueva tabla de particiones:**

Si el disco no tiene una tabla de particiones, crea una nueva usando fdisk:

```
sudo fdisk /dev/sdb
```

Luego, sigue estos pasos:

Presiona n para crear una nueva partición.
Elige las opciones predeterminadas para utilizar todo el espacio disponible.
Presiona w para escribir los cambios y salir.

4. **Formatear el disco:**

Una vez creada la partición, debes formatear el disco con un sistema de archivos compatible, como ext4:

```
sudo mkfs.ext4 /dev/sdb1
```

Esto formateará la primera partición del disco (/dev/sdb1) con el sistema de archivos ext4.

5. **Montar el disco:**

Monta el disco recién formateado en una carpeta para verificar su correcto funcionamiento:

```
sudo mkdir /mnt/hdd
sudo mount /dev/sdb1 /mnt/hdd
```

Ahora el disco estará montado y podrás acceder a él desde la carpeta /mnt/hdd.

6. **Verificar el montaje:**

Puedes usar el siguiente comando para asegurarte de que el disco esté correctamente montado:

```
df -h
```

Busca la línea correspondiente a /dev/sdb1 y asegúrate de que esté montado en /mnt/hdd.

7. **Configurar el montaje automático (opcional):**


Si deseas que el disco se monte automáticamente al reiniciar el servidor, edita el archivo /etc/fstab y añade una línea como la siguiente:

```
/dev/sdb1 /mnt/hdd ext4 defaults 0 2
```


# Verificar si dd está instalado

## Abre la terminal y ejecuta el siguiente comando para verificar si dd está instalado:

```
which dd
```

Si ves una ruta de salida (como /bin/dd), entonces dd está instalado. Si no está instalado, continúa con el siguiente paso para instalarlo.

## Instalar dd (si no está instalado)

En la mayoría de los sistemas Linux, dd debería estar preinstalado. Si no es así, puedes instalarlo (aunque en Ubuntu esto es muy raro). Aún así, puedes actualizar o instalar las utilidades base de GNU.

1. **Ejecuta el siguiente comando para instalar las herramientas esenciales:**

```
sudo apt update
sudo apt install coreutils
```
dd es parte del paquete coreutils, por lo que este comando garantizará que esté disponible en tu sistema.

## Verificar la ruta del disco HDD

** Para identificar la ruta del disco SSD y del disco HDD, usa:
```
sudo fdisk -l
```

- El disco de origen (SSD) será algo como /dev/sda.
- El disco de destino (HDD) será algo como /dev/sdb.

Asegúrate de identificar correctamente estos discos antes de proceder con el clonado.

# Ejecutar manualmente 

```
node clonador.js --manual
```
