import {FeatureType, UserTypeActionType} from "src/types";

type Return = { [key: string]: FeatureType[] };
type Default = { [key: string]: UserTypeActionType['permission'] | 'none' };

export function featuresToGroups(features: FeatureType[]): [Return, Default] {

    const groups: Return = {}
    const default_data: Default = {}
    features.forEach(feature => {
            if (feature.category in groups)
                groups[feature.category].push(feature);
            else
                groups[feature.category] = [feature]
            default_data[feature.id + '_view'] = 'none';
            default_data[feature.id + '_new'] = 'none';
            default_data[feature.id + '_edit'] = 'none';
            default_data[feature.id + '_delete'] = 'none';
            default_data[feature.id + '_share'] = 'none';
        }
    );
    return [groups, default_data];
}