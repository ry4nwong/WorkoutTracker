import React, { useState } from 'react';
import { TextField } from '@mui/material';

const NameInput = ({ nameType, setName }) => {
    const [nameField, setNameField] = useState('');

    return (
        <TextField
            label={nameType}
            variant="outlined"
            value={nameField}
            onChange={(e) => {
                setName(e.target.value);
                setNameField(e.target.value);
            }}
            margin="normal"
            fullWidth
        />
    );
};

export default NameInput;