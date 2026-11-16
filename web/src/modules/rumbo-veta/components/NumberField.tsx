import { Control, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormValues, NumericFieldName } from '../model/formSchema';

type NumberFieldProps = {
	control: Control<FormValues>;
	name: NumericFieldName;
	label: string;
	unit?: string;
	step?: string;
};

function NumberField({ control, name, label, unit, step = '0.1' }: NumberFieldProps) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<TextField
					name={field.name}
					inputRef={field.ref}
					value={field.value ?? ''}
					onBlur={field.onBlur}
					onChange={(event) =>
						field.onChange(event.target.value === '' ? undefined : Number(event.target.value))
					}
					fullWidth
					size="small"
					type="number"
					label={label}
					error={!!fieldState.error}
					helperText={fieldState.error?.message}
					slotProps={{
						inputLabel: { shrink: true },
						htmlInput: { step },
						input: unit
							? {
									endAdornment: (
										<Typography
											className="ml-1 shrink-0"
											color="text.secondary"
										>
											{unit}
										</Typography>
									)
								}
							: undefined
					}}
				/>
			)}
		/>
	);
}

export default NumberField;
