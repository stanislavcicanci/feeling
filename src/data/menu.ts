import { MenuDrink } from '../types';

export const MENU_DRINKS: MenuDrink[] = [
  // ESPRESSO
  { id: 'espresso', name: 'Espresso', volume: '25 ml', category: 'espresso' },
  { id: 'doppio', name: 'Doppio', volume: '40 ml', category: 'espresso' },
  { id: 'long-black', name: 'Long Black', volume: '250 ml', category: 'espresso' },
  { id: 'cortado', name: 'Cortado', volume: '150 ml', category: 'espresso' },
  { id: 'cappuccino', name: 'Cappuccino', volume: '200 ml', category: 'espresso' },
  { id: 'flat-white', name: 'Flat White', volume: '200 ml', category: 'espresso' },
  { id: 'latte', name: 'Latte', volume: '250 ml', category: 'espresso' },
  { id: 'raff-coffee', name: 'Raff Coffee', volume: '300 ml', category: 'espresso' },

  // POUR-OVER COFFEE
  { id: 'chemex', name: 'Chemex', volume: '300 ml', category: 'pourover' },
  { id: 'v60', name: 'V60', volume: '250 ml', category: 'pourover' },

  // BLENDED AND OTHER COFFEE
  { id: 'affogato', name: 'Affogato', volume: '150 ml', category: 'blended' },
  { id: 'espresso-tonic', name: 'Espresso Tonic', volume: '300 ml', category: 'blended' },
  { id: 'cold-brew', name: 'Cold Brew', volume: '500 ml', category: 'blended' },
  { id: 'bumble-coffee', name: 'Bumble Coffee', volume: '300 ml', category: 'blended' },
  { id: 'iced-coffee', name: 'Iced Coffee', volume: '300 ml', category: 'blended' },
  { id: 'iced-tea', name: 'Iced Tea', volume: '500 ml', category: 'blended' },
  { id: 'frappe', name: 'Frappe', volume: '500 ml', category: 'blended' },
  { id: 'fresh', name: 'Fresh', volume: '300 ml', category: 'blended' },
  { id: 'matcha-latte', name: 'Matcha Latte', volume: '300 ml', category: 'blended' },
  { id: 'hot-chocolate', name: 'Hot Chocolate', volume: '300 ml', category: 'blended' },
];

export const POUR_OVER_PROCESSING = ['washed', 'natural', 'anaerobic'] as const;
