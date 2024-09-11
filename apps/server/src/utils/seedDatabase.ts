import {mode, dataseeddev} from '../config/envvars';
import seedRoles from './seedRoles';
import seedUsers from './seedUsers';

async function seedDatabase() {
    const seedData = dataseeddev === 'true';

    try{
        if (seedData) {
            console.log(`Seeding database in ${mode} mode`);
            await seedRoles();
            await seedUsers();
        } else {
            console.log("No seeding required");
        }
    } catch (error: unknown) {
        console.error("Error seeding database", error);
    }
}

export default seedDatabase;