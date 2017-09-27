import {Action, Action} from './Action';
import {Attack} from './actions/Attack';
import {Cast} from './actions/Cast';
import {Craft} from './actions/Craft';
import {EndTurn} from './actions/EndTurn';
import {Examine} from './actions/Examine';
import {Flee} from './actions/Flee';
import {Go} from './actions/Go';
import {Hide} from './actions/Hide';
import {Inventory} from './actions/Inventory';
import {Level} from './actions/Level';
import {Loot} from './actions/Loot';
import {Status} from './actions/Status';
import {Take} from './actions/Take';
import {Use} from './actions/Use';
import {EActionType} from './EActionType';

export class ActionManager {
    public static actions: typeof Action[];

    public static getActions(actionType: EActionType): string[] {
        const actions: string[] = [];

        for (const a of ActionManager.actions) {
            if (a.types.indexOf(actionType) > -1)
                actions.push(a.keyword.substr(1));
        }

        return actions;
    }

    public static actionHasType(action: typeof Action, t: EActionType): boolean {
        return action.types.indexOf(t) > -1;
    }
}

ActionManager.actions = [];
ActionManager.actions.push(Attack);
ActionManager.actions.push(Cast);
ActionManager.actions.push(Craft);
ActionManager.actions.push(EndTurn);
ActionManager.actions.push(Examine);
ActionManager.actions.push(Flee);
ActionManager.actions.push(Go);
ActionManager.actions.push(Hide);
ActionManager.actions.push(Inventory);
ActionManager.actions.push(Level);
ActionManager.actions.push(Loot);
ActionManager.actions.push(Status);
ActionManager.actions.push(Take);
ActionManager.actions.push(Use);
