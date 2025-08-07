import { IngredientsActionTypes } from './constants';

type IngredientDailyList = {
    business_id: string;
    start_date: string;
    end_date: string;
    outlet_id?: string;
};

export const ingredientDailyList = (data: IngredientDailyList) => ({
    type: IngredientsActionTypes.INGREDIENT_DAILY_LIST,
    payload: { data },
});

export const ingredientDailyListSuccess = (data: any) => ({
    type: IngredientsActionTypes.INGREDIENT_DAILY_LIST,
    payload: data,
});

export const ingredientDailyListError = (error: any) => ({
    type: IngredientsActionTypes.INGREDIENT_DAILY_LIST,
    payload: error,
});
