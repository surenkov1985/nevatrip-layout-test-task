export function getTimeString(minute) {
	let hour = Math.trunc(minute / 60);
	let min = minute % 60;
	let minText = "";
	let hourText = "";

	if (hour === 1 || (hour - 1) % 10 === 0) {
		hourText = " час ";
	} else if (/[2-4]$/.test(String(hour))) {
		hourText = " часа ";
	} else if (/[5-90]$/.test(String(hour))) {
		hourText = " часов ";
	}
	if (min === 1 || (min - 1) % 10 === 0) {
		minText = " минута";
	} else if (/[2-4]$/.test(String(min))) {
		minText = " минуты";
	} else if (/[5-90]$/.test(String(min))) {
		minText = " минут";
	}

	let durationHour = hour ? hour + hourText : "";
	let durationMin = min ? min + minText : "";
	return durationHour + durationMin;
}

export function getTicketsString(num) {
	let string = "";

	if (num === 1 || (num - 1) % 10 === 0) {
		string = " билет";
	} else if (/[2-4]$/.test(String(num))) {
		string = " билета";
	} else if (/[5-90]$/.test(String(num))) {
		string = " билетов";
	}

	return num + string;
}

export function getTime(dateTime, data) {
	const date = new Date();

	const timeZoneSec = -date.getTimezoneOffset() * 60000;
	const timeZoneDefault = data.time_zone * 60000;
	const resDate = new Date(dateTime);
	let DateTime = resDate.getTime();
	let UTCDate = new Date(DateTime - timeZoneDefault + timeZoneSec);

	return UTCDate;
}
