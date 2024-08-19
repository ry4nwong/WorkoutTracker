import React, { useState } from 'react';
import { TextField } from '@mui/material';

const NameInput = ({ nameType, setName, nameField }) => {
    return (
        <TextField
            label={nameType}
            variant="outlined"
            value={nameField}
            onChange={(e) => {
                setName(e.target.value);
            }}
            margin="normal"
        />
    );
};

export default NameInput;