import {Class} from './Class';
import {Artisan} from './classes/Artisan';
import {Chemist} from './classes/Chemist';
import {Cleric} from './classes/Cleric';
import {Fighter} from './classes/Fighter';
import {Knight} from './classes/Knight';
import {Ranger} from './classes/Ranger';
import {Rogue} from './classes/Rogue';
import {Wizard} from './classes/Wizard';

export class ClassManager {
    public static classes: typeof Class[];

    public static getClass(cls: string, level: number): Class | null {
        for (const c of ClassManager.classes)
            if (c.keyword === cls)
                return new (c as any)(level);

        return null;
    }
}

ClassManager.classes = [];
ClassManager.classes.push(Artisan);
ClassManager.classes.push(Fighter);
ClassManager.classes.push(Chemist);
ClassManager.classes.push(Cleric);
ClassManager.classes.push(Knight);
ClassManager.classes.push(Ranger);
ClassManager.classes.push(Rogue);
ClassManager.classes.push(Wizard);
