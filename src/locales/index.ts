import en from './en.json';
import ro from './ro.json';
import ru from './ru.json';
import { Language } from '../types';

export type Translations = typeof ro;

export const LOCALES: Record<Language, Translations> = {
  ro,
  ru,
  en,
};
