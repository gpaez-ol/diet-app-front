export default interface SearchProps {
  isSearchActive: boolean;
  handleSearchActivation(searchStatus: boolean): void;
}