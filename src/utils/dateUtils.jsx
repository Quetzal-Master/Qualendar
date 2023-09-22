export function joursFeries(year) {
	return {
		"Jour de l'an": new Date(year, 0, 1), // January 1st
		"Fête du travail": new Date(year, 4, 1), // May 1st
		"Victoire des alliés": new Date(year, 4, 8), // May 8th
		"Fête Nationale": new Date(year, 6, 14), // July 14th
		Assomption: new Date(year, 7, 15), // August 15th
		Toussaint: new Date(year, 10, 1), // November 1st
		Armistice: new Date(year, 10, 11), // November 11th
		Noël: new Date(year, 11, 25), // December 25th
		"Lundi de Pâques": computeEasterMonday(year), // Compute based on Easter Sunday
		Ascension: computeAscensionDay(year), // Compute based on Easter Sunday
		"Lundi de Pentecôte": computePentecostMonday(year), // Compute based on Easter Sunday
		"Vendredi Saint": computeGoodFriday(year), // Compute based on Easter Sunday
		"Saint Étienne": new Date(year, 11, 26), // December 26th
	};
}

function computeEasterSunday(year) {
	const a = year % 19;
	const b = Math.floor(year / 100);
	const c = year % 100;
	const d = Math.floor(b / 4);
	const e = b % 4;
	const f = Math.floor((b + 8) / 25);
	const g = Math.floor((b - f + 1) / 3);
	const h = (19 * a + b - d - g + 15) % 30;
	const i = Math.floor(c / 4);
	const k = c % 4;
	const l = (32 + 2 * e + 2 * i - h - k) % 7;
	const m = Math.floor((a + 11 * h + 22 * l) / 451);
	const month = Math.floor((h + l - 7 * m + 114) / 31);
	const day = ((h + l - 7 * m + 114) % 31) + 1;
	return new Date(year, month - 1, day);
}

function computeGoodFriday(year) {
	const easterSunday = computeEasterSunday(year);
	easterSunday.setDate(easterSunday.getDate() - 2);
	return easterSunday;
}

function computeEasterMonday(year) {
	const easterSunday = computeEasterSunday(year);
	easterSunday.setDate(easterSunday.getDate() + 1);
	return easterSunday;
}

function computeAscensionDay(year) {
	const easterSunday = computeEasterSunday(year);
	easterSunday.setDate(easterSunday.getDate() + 39);
	return easterSunday;
}

function computePentecostMonday(year) {
	const easterSunday = computeEasterSunday(year);
	easterSunday.setDate(easterSunday.getDate() + 50);
	return easterSunday;
}

export function getDaysInMonth(year, month) {
	return new Date(year, month + 1, 0).getDate();
}
