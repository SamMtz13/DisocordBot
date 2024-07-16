require('dotenv').config();
const {REST, Routes,ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'hola',
        description: 'Saluda al bot',
    },
    {
        name: 'ola',
        description: 'Saluda al bot',
    },
    {
        name : 'ping',
        description: 'Muestra la latencia del bot',
    },
    {
    name: 'agregar',
    description: 'Agrega dos números',
    options: [
        {
            name: 'num1',
            description: 'Primer número a sumar',
            type: ApplicationCommandOptionType.Number,
            choices:[
                {
                    name: 'Uno',
                    value: 1,
                },
                {
                    name: 'Dos',
                    value: 2,
                },
                {
                    name: 'Tres',
                    value: 3,
                },
                {
                    name: 'Cuatro',
                    value: 4,
                },
                {
                    name: 'Cinco',
                    value: 5,
                },
                {
                    name: 'Seis',
                    value: 6,
                },
                {
                    name: 'Siete',
                    value: 7,
                },
                {
                    name: 'Ocho',
                    value: 8,
                },
                {
                    name: 'Nueve',
                    value: 9,
                },
                {
                    name: 'Diez',
                    value: 10,
                },
            ],
            required: true,
        },
        {
            name: 'num2',
            description: 'Segundo número a sumar',
            type: ApplicationCommandOptionType.Number,
            choices:[
                {
                    name: 'Uno',
                    value: 1,
                },
                {
                    name: 'Dos',
                    value: 2,
                },
                {
                    name: 'Tres',
                    value: 3,
                },
                {
                    name: 'Cuatro',
                    value: 4,
                },
                {
                    name: 'Cinco',
                    value: 5,
                },
                {
                    name: 'Seis',
                    value: 6,
                },
                {
                    name: 'Siete',
                    value: 7,
                },
                {
                    name: 'Ocho',
                    value: 8,
                },
                {
                    name: 'Nueve',
                    value: 9,
                },
                {
                    name: 'Diez',
                    value: 10,
                },
            ],
            required: true,
        },
    ],
    },
    {
        name: 'embed',
        description: 'Muestra un mensaje embebido',
        
    }
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log('Iniciando el registro de comandos');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands},
        );
        console.log('Comandos registrados correctamente');
    }
    catch(error){
        console.error(`Hubo un error: ${error}`);
    }
}
)();