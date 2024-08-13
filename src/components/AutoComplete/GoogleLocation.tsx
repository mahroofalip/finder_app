import React, { useState, useCallback, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { loadGooglePlaces } from '../../action/googleMapPlaceAction';

interface PlaceType {
    description: string;
    place_id: string;
}

interface GooglePlacesAutocompleteProps {
    onSelect: (selectedPlace: PlaceType | null) => void;
    initialValue?: PlaceType | string;
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({ onSelect, initialValue }) => {
    const [options, setOptions] = useState<PlaceType[]>([]);
    const [inputValue, setInputValue] = useState<string | PlaceType>(initialValue || '');
    const [error, setError] = useState<string | null>(null);
    const { places, loading } = useSelector((state: RootState) => state.googlePlaces);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (places.length !== 0) {
            setOptions(places.map((prediction: any) => ({
                description: prediction.description,
                place_id: prediction.place_id,
            })));
        }
    }, [loading, places]);

    const fetchPlaces = useCallback(
        debounce(async (input: string) => {
            if (input.trim().length > 0) {
                try {
                    dispatch(loadGooglePlaces(input));
                } catch (error) {
                    setError('Failed to fetch places. Please try again later.');
                    console.error(error);
                }
            }
        }, 300),
        [dispatch]
    );

    useEffect(() => {
        if (initialValue && typeof initialValue !== 'string') {
            setOptions([initialValue]);
            setInputValue(initialValue);
        } else if (typeof initialValue === 'string') {
            setInputValue(initialValue);
        }
    }, [initialValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        fetchPlaces(value);
    };

    const getOptionLabel = (option: PlaceType | string) => {
        if (typeof option === 'string') {
            return option;
        }
        return option?.description || '';
    };

    const handleChange = (
        event: React.SyntheticEvent,
        value: string | PlaceType | null,
        reason: any
    ) => {
        if (typeof value === 'string') {
            onSelect(null); // Handle the case where the input is a free text
        } else {
            onSelect(value); // Pass the selected place to the parent component
            setInputValue(value || '');
        }
    };

    return (
        <div>
            <Autocomplete
                key={typeof initialValue === 'string' ? initialValue : initialValue?.place_id || 'default_key'}
                freeSolo
                options={options as (PlaceType | string)[]}
                getOptionLabel={getOptionLabel}
                onChange={handleChange} // Handle selection change
                inputValue={typeof inputValue === 'string' ? inputValue : inputValue.description} // Set the value of the input
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        onChange={handleInputChange}
                        value={typeof inputValue === 'string' ? inputValue : inputValue.description}
                        size='small'
                        placeholder='Location'
                        error={Boolean(error)}
                        helperText={error}
                    />
                )}
            />
        </div>
    );
};

export default GooglePlacesAutocomplete;
