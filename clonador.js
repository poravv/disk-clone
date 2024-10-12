const { spawn } = require('child_process');
const cron = require('node-cron');
const path = require('path');

const sourceDisk = '/dev/sda'; // Cambia esto según tu SSD
const targetDisk = '/dev/sdb'; // Cambia esto según tu HDD

// Función para clonar discos
const cloneDisk = () => {
    return new Promise((resolve, reject) => {
        const command = `dd`;
        const args = [`if=${sourceDisk}`, `of=${targetDisk}`, `bs=64K`, `conv=noerror,sync`, `status=progress`];

        const ddProcess = spawn(command, args);

        ddProcess.stdout.on('data', (data) => {
            console.log(`Resultado de la clonación:\n${data}`);
        });

        ddProcess.stderr.on('data', (data) => {
            console.error(`Errores:\n${data}`);
        });

        ddProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error durante la clonación, código de salida: ${code}`);
                reject(code);
            } else {
                console.log('Clonación finalizada sin errores.');
                resolve();
            }
        });
    });
};

// Función para iniciar el proceso de clonación y luego cerrar el script
const startCloneAndExit = async () => {
    try {
        await cloneDisk();
        console.log('Clonación completada. Cerrando el script...');
        process.exit(0); // Finalizar el proceso
    } catch (err) {
        console.error('Hubo un problema al clonar el disco. Código:', err);
        process.exit(1); // Finalizar con error
    }
};

// Definir la tarea cron para que se ejecute los domingos a las 01:00 am
cron.schedule('0 1 * * 0', () => {
    console.log('Iniciando clonación programada del SSD al HDD...');
    startCloneAndExit();
}, {
    scheduled: true,
    timezone: "America/Asuncion" // Ajusta la zona horaria si es necesario
});

// Verificar si se ejecutó manualmente o por cron
if (process.argv.includes('--manual')) {
    console.log('Iniciando clonación manual del SSD al HDD...');
    startCloneAndExit(); // Ejecuta la clonación manual
} else {
    console.log("Servicio de clonación programado para los domingos a las 01:00 am.");
}
