import AsyncStorage from '@react-native-async-storage/async-storage';
export const ORDERS_KEY='ESA_PRINT_ORDERS';
export type Order={id:string;titolo:string;descrizione:string;materiale:string;colore:string;quantita:number;stato:string;dataCreazione:string};
export async function getOrders(){const r=await AsyncStorage.getItem(ORDERS_KEY);return r?JSON.parse(r):[];}
export async function saveOrder(order:Order){const o=await getOrders();o.unshift(order);await AsyncStorage.setItem(ORDERS_KEY,JSON.stringify(o));}
