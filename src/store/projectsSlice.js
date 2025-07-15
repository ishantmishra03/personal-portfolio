import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: [
        {
            title: 'Vexor',
            description: 'A sleek and modern blog platform powered by the MERN stack',
            image: '/preview/vexor.png',
            technologies: ['ReactJS', 'Tailwind CSS', 'MERN',],
            github: 'https://github.com/ishantmishra03/vexor',
            demo: 'https://vexor.vercel.app/'
        },
        {
            title: 'Stayza',
            description: 'Hotel Booking SAAS',
            image: '/preview/stayza.png',
            technologies: ['ReactJS', 'Tailwind CSS', 'MERN', 'Stripe'],
            github: 'https://github.com/ishantmishra03/stayza',
            demo: 'https://stayza.vercel.app'
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