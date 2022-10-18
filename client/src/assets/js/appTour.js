const Url = "http://localhost:5000";
const loclUrl = new URL(location.href);
const searchParams = new URLSearchParams(loclUrl.search);
const id = searchParams.get("id");
const Container = document.querySelector(".container");

function getData() {
	fetch(Url + "/tour" + String(id), { method: "GET", headers: { "Content-type": "application/json" } })
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			buildCard(data);
		})
		.catch(function (error) {
			console.log(error);
		});
}

getData();

function buildCard(data) {
	Container.innerHTML = "";

	const Content = document.createElement("div"),
		TitleBlock = document.createElement("div"),
		Title = document.createElement("h1"),
		BackLink = document.createElement("a"),
		ImageBlock = document.createElement("div"),
		Image = document.createElement("img"),
		TimeBlock = document.createElement("div"),
		TimeIconBlock = document.createElement("div"),
		TimeIcon = document.createElement("img"),
		TimeText = document.createElement("p"),
		TimeTextDesc = document.createElement("span"),
		TimeTextDuration = document.createElement("span"),
		TourDescBlock = document.createElement("div"),
		TourDescTitle = document.createElement("h3"),
		TourDesc = document.createElement("p"),
		BookTourBtn = document.createElement("button"),
		TimetableBlock = document.createElement("div"),
		TimetableTitle = document.createElement("h3"),
		TimetableDate = document.createElement("div"),
		TimetableDateTitle = document.createElement("p");

	const durationTime = data.duration.split(":");
	let huorText = "";
	let minText = "";
	if (parseInt(durationTime[0]) === 1 || (parseInt(durationTime[0]) - 1) % 10 === 0) {
		huorText = " час ";
	} else if (/[2-4]$/.test(durationTime[0])) {
		huorText = " часа ";
	} else if (/[5-90]$/.test(durationTime[0])) {
		huorText = " часа ";
	}
	if (parseInt(durationTime[1]) === 1 || (parseInt(durationTime[1]) - 1) % 10 === 0) {
		minText = " минута";
	} else if (/[2-4]$/.test(durationTime[1])) {
		minText = " минуты";
	} else if (/[5-90]$/.test(durationTime[1])) {
		minText = " минут";
	}

	let flightDate = data.flight_dates[0];
	const date = new Date();
	let firstTimetable = flightDate.date + " " + flightDate.times[0];

	const timeZoneSec = -date.getTimezoneOffset() * 60000;
	const timeZoneDefault = data.time_zone * 60000;
	const today = new Date(date.toISOString().slice(0, 10));
	const resDate = new Date(firstTimetable);
	let DateTime = resDate.getTime();
	let UTCDate = new Date(DateTime - timeZoneDefault + timeZoneSec);
	console.log(firstTimetable, DateTime, timeZoneSec, new Date(DateTime - timeZoneDefault + timeZoneSec));
	const TimeableDate = document.createElement("span");
	TimeableDate.className = "timetable__date";

	if (today.toLocaleDateString() === UTCDate.toLocaleDateString()) {
		TimetableDateTitle.textContent = "сегодня";
	} else if (today.toLocaleDateString() < UTCDate.toLocaleDateString()) {
		TimetableDateTitle.textContent = UTCDate.toLocaleDateString();
	} else {
		let newDate;

		for (let item of data.flight_dates) {
			firstTimetable = item.date + " " + item.times[0];
			let date = new Date(firstTimetable);
			DateTime = date.getTime();
			UTCDate = new Date(DateTime - timeZoneDefault + timeZoneSec);
			if (UTCDate.toLocaleDateString() == today.toLocaleDateString()) {
				newDate = item;
			}
		}

		if (newDate) {
			TimetableDateTitle.textContent = "сегодня";
			flightDate = newDate;
		}
	}
	const hour = parseInt(durationTime[0]) ? parseInt(durationTime[0]) + huorText : "";
	const min = parseInt(durationTime[1]) ? durationTime[1] + minText : "";

	BackLink.textContent = "Назад к списку экскурсий";
	Title.textContent = data.title;
	TimeTextDesc.textContent = "Продолжительность: ";
	TimeTextDuration.textContent = hour + min;
	TourDescTitle.textContent = "Подробнее об экскурсии";
	TourDesc.textContent = data.description;
	BookTourBtn.textContent = "Забронировать";
	TimetableTitle.textContent = "Ближайший рейс:";

	BackLink.className = "container__link";
	Content.className = "tour";
	TitleBlock.className = "tour__title-block";
	Title.className = "tour__title";
	ImageBlock.className = "tour__img-block";
	Image.className = "tour__img";
	TimeBlock.className = "tour__time-block";
	TimeIconBlock.className = "tour__time-icon-block";
	TimeText.className = "tour__time-text";
	TimeTextDuration.className = "tour__time-duration";
	TimeTextDesc.className = "tour__time-desc";
	TourDescBlock.className = "tour__desc-block";
	TourDescTitle.className = "tour__desc-title";
	TourDesc.className = "tour__desc";
	BookTourBtn.className = "tour__btn btn";
	TimetableBlock.className = "tour__timetable timetable";
	TimetableTitle.className = "timetable__title";
	TimetableDate.className = "timetable__date";
	TimetableDateTitle.className = "timetable__date-text";

	Image.src = data.image;
	Image.alt = data.title;
	TimeIcon.src = "./clock-circular-outline.svg";
	TimeIcon.alt = " clock-icon";

	BackLink.href = "./index.html";
	BackLink.target = "_self";

	if (TimetableDateTitle.textContent) {
		TimetableDate.appendChild(TimetableDateTitle);
		flightDate.times.map(function (res) {
			firstTimetable = flightDate.date + " " + res;
			let date = new Date(firstTimetable);
			DateTime = date.getTime();
			UTCDate = new Date(DateTime - timeZoneDefault + timeZoneSec);
			let time = UTCDate.toLocaleTimeString().slice(0, 5);

			const TimeableItem = document.createElement("button");

			TimeableItem.className = "timetable__item btn";
			TimeableItem.textContent = time;

			if (res) {
				TimetableDate.appendChild(TimeableItem);
			}
		});
	}

	TitleBlock.appendChild(Title);
	ImageBlock.appendChild(Image);
	TimeIconBlock.appendChild(TimeIcon);
	TimeBlock.appendChild(TimeIconBlock);
	TimeText.appendChild(TimeTextDesc);
	TimeText.appendChild(TimeTextDuration);
	TimeBlock.appendChild(TimeText);
	TourDescBlock.appendChild(TourDescTitle);
	TourDescBlock.appendChild(TourDesc);
	TimetableBlock.appendChild(TimetableTitle);

	TimetableBlock.appendChild(TimetableDate);

	Content.appendChild(TitleBlock);
	Content.appendChild(ImageBlock);
	Content.appendChild(TimeBlock);
	Content.appendChild(TourDescBlock);
	Content.appendChild(TimetableBlock);
	Content.appendChild(BookTourBtn);

	Container.appendChild(BackLink);
	Container.appendChild(Content);

	modalToggleListener();
	setModalValues(data);
}

function setModalValues(obj) {
	const tourRoutes = ["Из A в B", "Из В в А", "Из A в B и обратно в А"];
	let date;
	let times = [];
	let data;
	let backData;
	const DateSelect = document.querySelector(".form__date"),
		RouteSelect = document.querySelector(".form__route"),
		TimeSelect = document.querySelector(".form__time"),
		BackTimeSelect = document.querySelector(".form__back-time");
	(DateOption = document.createElement("option")), (RouteOption = document.createElement("option"));

	DateOption.value = "";
	RouteOption.value = "";
	DateOption.textContent = "Выберите дату";
	RouteOption.textContent = "Выберите направление";

	DateSelect.appendChild(DateOption);
	RouteSelect.appendChild(RouteOption);

	for (item of obj.flight_dates) {
		const today = new Date();
		const timeZoneSec = -today.getTimezoneOffset() * 60000;
		const timeZoneDefault = obj.time_zone * 60000;
		let firstTimetable = item.date + " " + item.times[0];
		let date = new Date(firstTimetable);
		let DateTime = date.getTime();
		let UTCDate = new Date(DateTime - timeZoneDefault + timeZoneSec);
		let day = UTCDate.toLocaleDateString();
		if (date.toLocaleDateString() >= today.toLocaleDateString()) {
			const DateOption = document.createElement("option");

			DateOption.value = item.date;
			DateOption.textContent = day;

			DateSelect.appendChild(DateOption);
		}
	}

	for (item of tourRoutes) {
		const RouteOption = document.createElement("option");

		RouteOption.value = item;
		RouteOption.textContent = item;

		RouteSelect.appendChild(RouteOption);
	}

	DateSelect.addEventListener("change", function () {
		console.log(this.name, this.value);
		date = this.value;
	});
	RouteSelect.addEventListener("change", function () {
		const Option = document.createElement("option");

		Option.value = "";
		Option.textContent = "Выберите время";
		TimeSelect.appendChild(Option);
		if (this.value === "Из A в B") {
			data = obj.flight_dates.find((item) => item.date === date);
			times = data.times;
			console.log(times);
			TimeSelect.innerHTML = "";
			TimeSelect.appendChild(Option);
			BackTimeSelect.style.display = "none";
			TimeSelect.style.display = "block";
			for (let time of data.times) {
				const Option = document.createElement("option");

				Option.value = time + "(" + this.value + ")";
				Option.textContent = time + "(" + this.value + ")";

				TimeSelect.appendChild(Option);
			}
		} else if (this.value === "Из В в А") {
			data = obj.back_flight_dates.find((item) => item.date === date);
			BackTimeSelect.innerHTML = "";
			BackTimeSelect.appendChild(Option);
			BackTimeSelect.style.display = "block";
			TimeSelect.style.display = "none";
			for (let time of data.times) {
				const Option = document.createElement("option");

				Option.value = time + "(" + this.value + ")";
				Option.textContent = time + "(" + this.value + ")";

				BackTimeSelect.appendChild(Option);
			}
		} else if (this.value === "Из A в B и обратно в А") {
			data = obj.flight_dates.find((item) => item.date === date);
			backData = obj.back_flight_dates.find((item) => item.date === date);
			TimeSelect.innerHTML = "";
			BackTimeSelect.style.display = "block";
			TimeSelect.style.display = "block";
			TimeSelect.appendChild(Option);
			for (let time of data.times) {
				const Option = document.createElement("option");

				Option.value = time + "(Из A в B)";
				Option.textContent = time + "(Из A в B)";

				TimeSelect.appendChild(Option);
			}
			for (let time of backData.times) {
				const Option = document.createElement("option");

				Option.value = time + "(Из B в A)";
				Option.textContent = time + "(Из B в A)";

				BackTimeSelect.appendChild(Option);
			}
		} else {
			TimeSelect.innerHTML = "";
			TimeSelect.appendChild(Option);
		}
	});
}

function modalToggleListener() {
	const buttons = document.querySelectorAll(".btn");
	const modal = document.querySelector(".modal");
	const closeBtn = document.querySelector(".modal__close");

	for (let btn of buttons) {
		btn.addEventListener("click", function () {
			modal.classList.add("visible");
		});
	}

	modal.addEventListener("click", function (e) {
		if (e.target.classList.contains("modal__background")) {
			modal.classList.remove("visible");
		}
	});

	closeBtn.addEventListener("click", function (e) {
		modal.classList.remove("visible");
	});
}
