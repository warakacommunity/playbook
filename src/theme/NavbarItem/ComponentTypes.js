import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
// Named PlaybookSearchNavbarItem so it does not shadow Docusaurus's own
// @theme/NavbarItem/SearchNavbarItem (the Algolia DocSearch item).
import PlaybookSearchNavbarItem from './PlaybookSearchNavbarItem';
import LocaleNavbarItem from './LocaleNavbarItem';
import ResourcesNavbarItem from './ResourcesNavbarItem';

export default {
  ...ComponentTypes,
  'custom-SearchNavbarItem': PlaybookSearchNavbarItem,
  'custom-LocaleNavbarItem': LocaleNavbarItem,
  'custom-ResourcesNavbarItem': ResourcesNavbarItem,
};
