import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: [
        {
            title: 'PASTE',
            description: 'A clean and modern paste manager like TODO app',
            image: '/preview/paste.png',
            technologies: ['ReactJS', 'Tailwind CSS', 'Redux', 'DaisyUI'],
            github: 'https://github.com/ishantmishra03/paste',
            demo: 'https://paste-eta.vercel.app/'
        },
        {
            title: 'Bynic',
            description: 'A fully functional eCommerce frontend application',
            image: '/preview/bynic.png',
            technologies: ['ReactJS', 'Tailwind CSS', 'Redux', 'DaisyUI', 'Faker.js'],
            github: 'https://github.com/ishantmishra03/bynic',
            demo: 'https://bynic.vercel.app'
        },
        {
            title: 'Coming Soon',
            description: '...............................',
            image: '/coming-soon.avif',
            technologies: ['Coming Soon'],
            github: 'https://github.com/ishantmishra03/',
            demo: ''
        },
    ]
    ,
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
    },
});


export default projectsSlice.reducer;