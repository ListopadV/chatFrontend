import React from 'react';
import {Field, Form, Formik} from 'formik';
import {Box, Button, Checkbox, FormControlLabel, MenuItem, SxProps, TextField, Theme} from '@mui/material';

export type FieldType = 'text' | 'checkbox' | 'select' | 'custom' | "password";

export interface FieldConfig {
    type: FieldType;
    label?: string;
    placeholder?: string;
    visible?: boolean;
    options?: { label: string; value: any }[];
    component?: React.FC<any>;
    props?: Record<string, any>;
}

export interface ButtonConfig {
    label: string;
    onClick?: (values: any) => void;
    variant?: 'contained' | 'outlined';
    sx?: SxProps<Theme>;
    type?: 'submit' | 'button';
}

export interface ModularFormProps {
    fields: Record<string, FieldConfig>;
    buttons?: ButtonConfig[];
    initialValues: Record<string, any>;
    validationSchema: any;
    onSubmit?: (values: any) => void;
    isBig?: boolean;
    extraComponents?: React.ReactNode;
    showButtons?: boolean;
}

export const ModularForm: React.FC<ModularFormProps> = ({
                                                            fields,
                                                            initialValues,
                                                            validationSchema,
                                                            onSubmit,
                                                            buttons = [],
                                                            isBig = false,
                                                            extraComponents,
                                                            showButtons = true
                                                        }) => {
    return (
        <Box
            sx={{
                width: {xs: '85vw', sm: '85vw', md: '65vw', lg: '50vw', xl: '50vw'},
                border: '1px solid #231426',
                mt: 5,
                p: 2,
                maxWidth: '500px',
                textAlign: 'center',
                borderRadius: '25px',
                boxShadow: '1px 2px 6px 6px #231426',
                overflowY: 'auto',
            }}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, formikHelpers) => {
                    onSubmit?.(values);
                    formikHelpers.setSubmitting(false);
                }}
            >
                {({handleChange, handleBlur, values, errors, touched}) => (
                    <Form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                        }}
                    >
                        {Object.entries(fields).map(([name, config]) => {
                            if (config.visible === false) return null;

                            if (config.type === 'checkbox') {
                                return (
                                    <FormControlLabel
                                        key={name}
                                        control={
                                            <Checkbox
                                                name={name}
                                                checked={values[name]}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                {...config.props}
                                            />
                                        }
                                        label={config.label}
                                    />
                                );
                            }

                            if (config.type === 'select') {
                                return (
                                    <Field
                                        key={name}
                                        as={TextField}
                                        variant={"outlined"}
                                        name={name}
                                        select
                                        label={config.label}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values[name]}
                                        error={Boolean(touched[name] && errors[name])}
                                        helperText={touched[name] && errors[name]}
                                        {...config.props}
                                    >
                                        {config.options?.map((opt) => (
                                            <MenuItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                );
                            }

                            if (config.type === 'custom' && config.component) {
                                const CustomComponent = config.component;
                                return (
                                    <CustomComponent
                                        key={name}
                                        name={name}
                                        value={values[name]}
                                        onChange={handleChange}
                                        {...config.props}
                                    />
                                );
                            }

                            return (
                                <Field
                                    key={name}
                                    as={TextField}
                                    variant={"outlined"}
                                    name={name}
                                    type={config.type}
                                    label={config.label}
                                    placeholder={config.placeholder}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[name]}
                                    error={Boolean(touched[name] && errors[name])}
                                    helperText={touched[name] && errors[name]}
                                    {...config.props}
                                    sx={{
                                        mb: 3,
                                        ...config.props?.sx,
                                    }}
                                />
                            );
                        })}

                        {extraComponents}

                        {showButtons && buttons.length > 0 && (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mt: 2,
                                gap: 2,
                            }}>
                                {buttons.map((btn, i) => (
                                    <Button
                                        variant="authFormSecondary"
                                        type={btn.type}
                                        onClick={btn.onClick}
                                        sx={btn.sx}
                                    >
                                        {btn.label}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default ModularForm;