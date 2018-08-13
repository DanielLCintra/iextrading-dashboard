import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { Link } from 'react-router-dom';
import { ISymbol, ISymbolsState } from '../../ducks/symbols';
import classes from './SymbolSearch.scss';

export interface ISymbolSearchState {
  symbol: string,
  suggestions: ISymbol[],
}

export interface ISymbolSearchProps {
  symbols: ISymbolsState,
  loadSymbols: () => any,
}

class SymbolSearch extends React.Component<ISymbolSearchProps, ISymbolSearchState> {
  public popperNode = null;

  public state = {
    suggestions: [],
    symbol: '',
  };

  public componentDidMount() {
    this.props.loadSymbols();
  }

  public getSuggestionValue(suggestion:ISymbol) {
    return suggestion.symbol;
  }

  public getSuggestions(value:string) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const suggestions = this.props.symbols.data || [];
    let count = 0;

    return inputLength === 0
      ? []
      : suggestions.filter((suggestion:ISymbol) => {
          const keep = (
            count < 5 && (
              (
                suggestion.symbol
                  .toLowerCase()
                  .slice(0, inputLength) === inputValue
              ) || (
                suggestion.name
                  .toLowerCase()
                  .slice(0, inputLength) === inputValue
              )
            )
          );

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  public handleSuggestionsFetchRequested = (params:Autosuggest.SuggestionsFetchRequestedParams) => {
    const { value } = params;
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  }

  public handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  public handleChange = (event:React.FormEvent<any>, params:Autosuggest.ChangeEvent) => {
    const { newValue } = params;
    this.setState({
      symbol: newValue,
    });
  };

  public renderInputComponent(inputProps: Autosuggest.InputProps<ISymbol>):React.ReactNode {
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

  public renderSuggestion(suggestion:ISymbol, params:Autosuggest.RenderSuggestionParams) {
    const { isHighlighted } = params;
    const text = `${suggestion.symbol}, ${suggestion.name}`;

    return (
      <Link
        to={`/stock/${suggestion.symbol}`}
        title={`See ${text}`}
      >
        <MenuItem
          selected={isHighlighted}
          component="div"
        >
          {text}
        </MenuItem>
      </Link>
    );
  }

  public renderSuggestionsContainer(params:Autosuggest.RenderSuggestionsContainerParams) {
    return (
      <Paper {...params.containerProps} square={true}>
        {params.children}
      </Paper>
    );
  }

  public render() {
    const autosuggestProps = {
      getSuggestionValue: this.getSuggestionValue,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      renderInputComponent: this.renderInputComponent,
      renderSuggestion: this.renderSuggestion,
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
