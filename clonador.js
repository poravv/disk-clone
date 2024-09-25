// clonador.js
const { spawn } = require('child_process');
const cron = require('node-cron');
const path = require('path');

const sourceDisk = '/dev/sda'; // Cambia esto según tu SSD
const targetDisk = '/dev/sdb'; // Cambia esto según tu HDD

const cloneDisk = () => {
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
        } else {
            console.log('Clonación finalizada sin errores.');
        }
    });
};

// Definir la tarea cron para que se ejecute los domingos a las 01:00 am
cron.schedule('0 1 * * 0', () => {
    console.log('Iniciando clonación del SSD al HDD...');
    cloneDisk();
}, {
    scheduled: true,
    timezone: "America/Asuncion" // Ajusta la zona horaria si es necesario
});

//cloneDisk();

console.log("Servicio de clonación programado para los domingos a las 01:00 am");
