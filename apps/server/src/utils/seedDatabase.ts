import {mode, dataseeddev} from '../config/envvars';
import clearDatabase from './clearDatabase';
import seedRoles from './seedRoles';
import seedUsers from './seedUsers';
import seedCategories from './seedCategories';
import seedProducts from './seedProducts';

async function seedDatabase() {
    try{
        if (dataseeddev) {
            await clearDatabase();
            console.log(`Seeding database in ${mode} mode`);
            await seedRoles();
            await seedUsers();
            await seedCategories();
            await seedProducts();
        } else {
            console.log("No seeding required");
        }
    } catch (error: unknown) {
        console.error("Error seeding database", error);
    }
}

export default seedDatabase;