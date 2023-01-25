
interface SeedData {
    entries : SeedEntry[];
}

interface SeedEntry {
    description: string;
    status:      string;
    createdAt:   number;

}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendientes: Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'En proceso: Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            status: 'in-progress',
            createdAt: Date.now() -100000
        },
        {
            description: 'Finalizada: Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            status: 'finished',
            createdAt: Date.now() -200000
        }
    ]
}