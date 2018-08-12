import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import classes from './SymbolSearch.scss';

interface ICountry {
  label: string,
}

const suggestions:ICountry[] = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];

function renderInputComponent(inputProps: Autosuggest.InputProps<ICountry>):React.ReactNode {
  const {
    inputRef = () => { return; },
    ref,
    onChange,
    ...other
  } = inputProps;

  return (
    <TextField
      {...other}
      fullWidth={true}
      InputProps={{
        classes: {
          root: classes.SymbolSearchInput,
        },
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
      }}
      onChange={onChange}
      defaultValue={undefined}
      type="search"
    />
  );
}

function renderSuggestion(suggestion:ICountry, params:Autosuggest.RenderSuggestionParams) {
  const { isHighlighted } = params;

  return (
    <MenuItem selected={isHighlighted} component="div">
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(value:string) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion:ICountry) {
  return suggestion.label;
}

class SymbolSearch extends React.Component {
  public popperNode = null;

  public state = {
    suggestions: [],
    symbol: '',
  };

  public handleSuggestionsFetchRequested = (params:Autosuggest.SuggestionsFetchRequestedParams) => {
    const { value } = params;
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  public handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  public handleChange = (event:React.FormEvent<any>, params:Autosuggest.ChangeEvent) => {
    const { newValue } = params;
    this.setState({
      symbol: newValue,
    });
  };

  public renderSuggestionsContainer(params:Autosuggest.RenderSuggestionsContainerParams) {
    return (
      <Paper {...params.containerProps} square={true}>
        {params.children}
      </Paper>
    );
  }

  public render() {
    const autosuggestProps = {
      getSuggestionValue,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      renderInputComponent,
      renderSuggestion,
      suggestions: this.state.suggestions,
    };

    return (
      <div className={classes.SymbolSearch}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            onChange: this.handleChange,
            placeholder: 'Search',
            value: this.state.symbol,
          }}
          theme={{
            container: classes.SymbolSearchContainer,
            suggestion: classes.SymbolSearchSuggestion,
            suggestionsContainerOpen: classes.SymbolSearchSuggestionsContainerOpen,
            suggestionsList: classes.SymbolSearchSuggestionsList,
          }}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
        />
      </div>
    );
  }
}

export default SymbolSearch;
