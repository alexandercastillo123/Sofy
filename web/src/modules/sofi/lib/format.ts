import { Currency, CurrencyOption } from '../domain/types';

const NUMBER_FORMATTER = new Intl.NumberFormat('es-PE', {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1
});

const INTEGER_FORMATTER = new Intl.NumberFormat('es-PE', {
	maximumFractionDigits: 0
});

export function formatNumber(value: number, digits = 1): string {
	if (!Number.isFinite(value)) {
		return '—';
	}

	if (digits === 0) {
		return INTEGER_FORMATTER.format(value);
	}

	return new Intl.NumberFormat('es-PE', {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	}).format(value);
}

export function formatDecimal(value: number): string {
	return NUMBER_FORMATTER.format(value);
}

export function formatMoney(amountInSoles: number, currency: CurrencyOption): string {
	const converted = amountInSoles * currency.rate;

	return `${currency.symbol} ${new Intl.NumberFormat('es-PE', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(converted)}`;
}

export function currencyOption(currency: Currency, options: CurrencyOption[]): CurrencyOption {
	return options.find((item) => item.id === currency) ?? options[0];
}

export function formatDate(isoDate: string): string {
	return new Intl.DateTimeFormat('es-PE', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}).format(new Date(isoDate));
}

export function formatDateTime(date: Date): string {
	return new Intl.DateTimeFormat('es-PE', {
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit'
	}).format(date);
}
