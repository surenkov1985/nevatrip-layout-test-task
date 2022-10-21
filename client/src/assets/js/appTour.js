"use strict";

import { getTimeString, getTicketsString, getTime } from "./utils";
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
	let minute = durationTime[0] * 60 + parseInt(durationTime[1]);
	let duration = getTimeString(minute);

	let flightDate = data.flight_dates[0];
	const date = new Date();
	let firstTimetable = flightDate.date + " " + flightDate.times[0].time;

	const today = new Date(date.toISOString().slice(0, 10));
	let UTCDate = getTime(firstTimetable, data);
	const TimeableDate = document.createElement("span");
	TimeableDate.className = "timetable__date";

	if (today.toLocaleDateString() === UTCDate.toLocaleDateString()) {
		TimetableDateTitle.textContent = "сегодня";
	} else if (today.toLocaleDateString() < UTCDate.toLocaleDateString()) {
		TimetableDateTitle.textContent = UTCDate.toLocaleDateString();
	} else {
		let newDate;

		for (let item of data.flight_dates) {
			firstTimetable = item.date + " " + item.times[0].time;
			UTCDate = getTime(firstTimetable, data);
			if (UTCDate.toLocaleDateString() == today.toLocaleDateString()) {
				newDate = item;
			}
		}

		if (newDate) {
			TimetableDateTitle.textContent = "сегодня";
			flightDate = newDate;
		}
	}

	BackLink.textContent = "Назад к списку экскурсий";
	Title.textContent = data.title;
	TimeTextDesc.textContent = "Продолжительность: ";
	TimeTextDuration.textContent = duration;
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
			firstTimetable = flightDate.date + " " + res.time.slice(0, 5);
			UTCDate = getTime(firstTimetable, data);
			let time = UTCDate.toLocaleTimeString().slice(0, 5);

			const TimeableItem = document.createElement("button");

			TimeableItem.className = "timetable__item btn";
			TimeableItem.textContent = time;

			if (res.time) {
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
	specialTicketsToggle();
	getTotalsum(data);
}

function setModalValues(obj) {
	const tourRoutes = ["Из A в B", "Из В в А", "Из A в B и обратно в А"];
	let date = null;
	let timeValue = "";
	let data = null;
	let backData = null;
	let UTCDate = null;
	const DateSelect = document.querySelector(".form__date"),
		RouteSelect = document.querySelector(".form__route"),
		TimeSelect = document.querySelector(".form__time"),
		BackTimeSelect = document.querySelector(".form__back-time"),
		AdultPrice = document.querySelector(".adult"),
		KidPrice = document.querySelector(".kid"),
		PreferentialPrice = document.querySelector(".preferential"),
		GroupPrice = document.querySelector(".group"),
		DateOption = document.createElement("option");

	DateOption.value = "";
	DateOption.textContent = "Выберите дату";
	AdultPrice.textContent = obj.action_price;
	KidPrice.textContent = obj.ticket_kid_price;
	PreferentialPrice.textContent = obj.ticket_preferential_price;
	GroupPrice.textContent = obj.ticket_group_price;

	DateSelect.appendChild(DateOption);
	for (let item of obj.flight_dates) {
		const today = new Date();
		let firstTimetable = item.date + " " + item.times[0].time;
		let date = new Date(firstTimetable);
		UTCDate = getTime(firstTimetable, obj);
		let day = UTCDate.toLocaleDateString();
		if (date.toLocaleDateString() >= today.toLocaleDateString()) {
			const DateOption = document.createElement("option");

			DateOption.value = item.date;
			DateOption.textContent = day;
			DateSelect.appendChild(DateOption);
		}
	}

	for (let item of tourRoutes) {
		const RouteOption = document.createElement("option");

		RouteOption.value = item;
		RouteOption.textContent = item;
		RouteSelect.appendChild(RouteOption);
	}

	DateSelect.addEventListener("change", function () {
		date = this.value;
	});
	RouteSelect.addEventListener("change", function () {
		const Option = document.createElement("option");

		Option.value = "";
		Option.textContent = "Выберите время";
		TimeSelect.appendChild(Option);

		if (RouteSelect.value === "Из A в B") {
			data = obj.flight_dates.find((item) => item.date === date);

			TimeSelect.innerHTML = "";
			TimeSelect.appendChild(Option);
			BackTimeSelect.style.display = "none";
			TimeSelect.style.display = "block";
			AdultPrice.textContent = obj.action_price;
			KidPrice.textContent = obj.ticket_kid_price;
			PreferentialPrice.textContent = obj.ticket_preferential_price;
			GroupPrice.textContent = obj.ticket_group_price;

			for (let time of data.times) {
				let firstTimetable = date + " " + time.time.slice(0, 5);
				UTCDate = getTime(firstTimetable, obj);
				let newTime = UTCDate.toLocaleTimeString().slice(0, 5);

				const Option = document.createElement("option");

				Option.value = time.time + "(" + this.value + ")";
				Option.textContent = newTime + "(" + this.value + ")";

				TimeSelect.appendChild(Option);
			}
		} else if (this.value === "Из В в А") {
			data = obj.back_flight_dates.find((item) => item.date === date);

			BackTimeSelect.innerHTML = "";
			BackTimeSelect.appendChild(Option);
			BackTimeSelect.style.display = "block";
			TimeSelect.style.display = "none";
			AdultPrice.textContent = obj.action_price;
			KidPrice.textContent = obj.ticket_kid_price;
			PreferentialPrice.textContent = obj.ticket_preferential_price;
			GroupPrice.textContent = obj.ticket_group_price;

			for (let time of data.times) {
				const Option = document.createElement("option");

				let firstTimetable = date + " " + time.time.slice(0, 5);
				UTCDate = getTime(firstTimetable, obj);
				let newTime = UTCDate.toLocaleTimeString().slice(0, 5);

				Option.value = time.time + "(" + this.value + ")";
				Option.textContent = newTime + "(" + this.value + ")";

				BackTimeSelect.appendChild(Option);
			}
		} else if (this.value === "Из A в B и обратно в А") {
			data = obj.flight_dates.find((item) => item.date === date);
			backData = obj.back_flight_dates.find((item) => item.date === date);

			TimeSelect.innerHTML = "";
			BackTimeSelect.style.display = "block";
			TimeSelect.style.display = "block";
			TimeSelect.appendChild(Option);
			AdultPrice.textContent = obj.round_trip_price;
			KidPrice.textContent = obj.round_trip_kid_price;
			PreferentialPrice.textContent = obj.round_trip_preferential_price;
			GroupPrice.textContent = obj.round_trip_group_price;

			for (let time of data.times) {
				let firstTimetable = date + " " + time.time.slice(0, 5);
				UTCDate = getTime(firstTimetable, obj);
				let newTime = UTCDate.toLocaleTimeString().slice(0, 5);

				const Option = document.createElement("option");

				Option.value = time.time + "(Из A в B)";
				Option.textContent = newTime + "(Из A в B)";

				TimeSelect.appendChild(Option);
			}

			TimeSelect.addEventListener("change", function (e) {
				timeValue = e.target.selectedOptions[0].value;

				BackTimeSelect.textContent = "";
				BackTimeSelect.appendChild(Option);

				for (let time of backData.times) {
					let firstTimetable = null;
					if (!timeValue) {
						firstTimetable = date + " " + time.time.slice(0, 5);
					} else {
						let startTime = new Date(data.date + " " + timeValue.slice(0, 5));
						let duration = obj.duration.split(":");
						let mSecDuration = (parseInt(duration[0]) * 60 + parseInt(duration[1])) * 60000;
						let minBackTime = new Date(startTime.getTime() + mSecDuration);
						let itemTime = new Date(date + " " + time.time.slice(0, 5));

						if (itemTime > minBackTime) {
							firstTimetable = date + " " + time.time.slice(0, 5);
						} else {
							firstTimetable = "";
						}
					}
					if (firstTimetable) {
						UTCDate = getTime(firstTimetable, obj);
						let newTime = UTCDate.toLocaleTimeString().slice(0, 5);

						const Option = document.createElement("option");

						Option.value = time.time + "(Из B в A)";
						Option.textContent = newTime + "(Из B в A)";

						BackTimeSelect.appendChild(Option);
					}
				}
			});

			for (let time of backData.times) {
				let firstTimetable = date + " " + time.time.slice(0, 5);
				UTCDate = getTime(firstTimetable, obj);
				let newTime = UTCDate.toLocaleTimeString().slice(0, 5);

				const Option = document.createElement("option");

				Option.value = time.time + "(Из B в A)";
				Option.textContent = newTime + "(Из B в A)";

				BackTimeSelect.appendChild(Option);
			}
		} else {
			TimeSelect.innerHTML = "";
			TimeSelect.appendChild(Option);
		}
	});

	onFormSubmit(obj);
}

function modalToggleListener() {
	const buttons = document.querySelectorAll(".btn");
	const modal = document.querySelector(".modal");
	const closeBtn = document.querySelector(".modal__close");

	for (let btn of buttons) {
		btn.addEventListener("click", function () {
			const TotalContainer = document.querySelector(".total");
			modal.classList.add("visible");
			TotalContainer.style.display = "none";
			document.body.style.overflowY = "hidden";
		});
	}

	modal.addEventListener("click", function (e) {
		const TotalContainer = document.querySelector(".total");
		if (e.target.classList.contains("modal__background")) {
			modal.classList.remove("visible");
			TotalContainer.style.display = "none";
			document.body.style.overflowY = "initial";
		}
	});

	closeBtn.addEventListener("click", function (e) {
		const TotalContainer = document.querySelector(".total");
		modal.classList.remove("visible");
		TotalContainer.style.display = "none";
		document.body.style.overflowY = "initial";
	});
}

function specialTicketsToggle() {
	const formCheckbox = document.querySelectorAll(".form__checkbox");

	for (let checkbox of formCheckbox) {
		checkbox.addEventListener("click", function (e) {
			const input = checkbox.getElementsByTagName("input");
			if (input[0].checked) {
				checkbox.nextElementSibling.style.display = "flex";
			} else {
				checkbox.nextElementSibling.style.display = "none";
			}
		});
	}
}

function getTotalsum(data) {
	const TotalSumBtn = document.querySelector(".form__total-sum-btn");

	TotalSumBtn.addEventListener("click", function (e) {
		e.preventDefault();

		const TotalContainer = document.querySelector(".total"),
			TotalForward = document.querySelector(".total__forward"),
			TotalBack = document.querySelector(".total__back"),
			TotalTransferText = document.querySelector(".total__transfer-text"),
			Tickets = document.querySelector(".total__tickets"),
			RouteEl = document.querySelector(".total__route"),
			Duration = document.querySelector(".total__duration"),
			Time = document.querySelector(".total__time"),
			TimeArrival = document.querySelector(".total__time-arrival"),
			BackTime = document.querySelector(".total__back-time"),
			BackTimeArrival = document.querySelector(".total__back-time-arrival"),
			Transfer = document.querySelector(".total__transfer"),
			Price = document.querySelector(".total__price"),
			AdultPrice = document.querySelector(".adult"),
			KidPrice = document.querySelector(".kid"),
			PreferentialPrice = document.querySelector(".preferential"),
			GroupPrice = document.querySelector(".group");

		const formData = new FormData(tourForm);
		const FormTime = document.querySelector(".form__time"),
			FormBackTime = document.querySelector(".form__back-time");
		let duration;
		let min;
		let transfer;
		let date = new Date(formData.get("date"));
		const formObj = {
			date: formData.get("date"),
			duration: data.duration,
			route: formData.get("route"),
			time: formData.get("time"),
			back_time: formData.get("back_time"),
			ticket_adult_quantity: formData.get("ticket_adult_quantity"),
			action_price: AdultPrice.textContent,
			ticket_kid_quantity: formData.get("ticket_kid_quantity"),
			ticket_kid_price: KidPrice.textContent,
			ticket_preferential_quantity: formData.get("ticket_preferential_quantity"),
			ticket_preferential_price: PreferentialPrice.textContent,
			ticket_group_quantity: formData.get("ticket_group_quantity"),
			ticket_group_price: GroupPrice.textContent,
		};

		if (formObj.route === "Из A в B и обратно в А") {
			let date = new Date(formObj.date + " " + formObj.time.match(/\d\d:\d\d/)[0]);
			let backDate = new Date(formObj.date + " " + formObj.back_time.match(/\d\d:\d\d/)[0]);
			let timeArr = formObj.duration.split(":");
			let minTransfer = (backDate.getTime() - (date.getTime() + (parseInt(timeArr[0]) * 60 + parseInt(timeArr[1])) * 60000)) / 60000;
			let minSum = parseInt(timeArr[0]) * 60 * 2 + parseInt(timeArr[1]) * 2;

			transfer = getTimeString(minTransfer);
			duration = getTimeString(minSum);
		} else {
			let timeArr = formObj.duration.split(":");
			min = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
			duration = getTimeString(min);
		}

		let total_price =
			+formObj.action_price * +formObj.ticket_adult_quantity +
			+formObj.ticket_kid_quantity * +formObj.ticket_kid_price +
			+formObj.ticket_preferential_quantity * +formObj.ticket_preferential_price +
			+formObj.ticket_group_quantity * +formObj.ticket_group_price;

		const TotalData = {
			duration: duration,
			totalPrice: total_price || 0,
			date: date.toLocaleDateString(),
			time: FormTime.value ? FormTime.value.match(/\d\d:\d\d/)[0] : "",
			back_time: FormBackTime.value ? FormBackTime.value.match(/\d\d:\d\d/)[0] : "",
			route: formObj.route,
			tickets: getTicketsString(
				parseInt(
					+formObj.ticket_adult_quantity +
						+formObj.ticket_kid_quantity +
						+formObj.ticket_preferential_quantity +
						+formObj.ticket_group_quantity
				) || 0
			),
			transfer: transfer,
		};

		let timeArr = TotalData.time.split(":");
		let durationArr = formObj.duration.split(":");
		let minutes = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]) + parseInt(durationArr[0]) * 60 + parseInt(durationArr[1]);
		let timeArrival = String(Math.trunc(minutes / 60)) + ":" + String(minutes % 60);

		let backTimeArr = TotalData.back_time.split(":");
		let backMinutes = parseInt(backTimeArr[0]) * 60 + parseInt(backTimeArr[1]) + parseInt(durationArr[0]) * 60 + parseInt(durationArr[1]);
		let backTimeArrival = String(Math.trunc(backMinutes / 60)) + ":" + String(backMinutes % 60);

		Tickets.textContent = TotalData.tickets;
		RouteEl.textContent = TotalData.route;
		Duration.textContent = TotalData.duration;
		Transfer.textContent = TotalData.transfer;
		Price.textContent = TotalData.totalPrice;

		if (TotalData.time && TotalData.back_time) {
			Time.textContent = TotalData.date + " в " + TotalData.time;
			TimeArrival.textContent = TotalData.date + " в " + timeArrival;
			BackTime.textContent = TotalData.date + " в " + TotalData.back_time;
			BackTimeArrival.textContent = TotalData.date + " в " + backTimeArrival;

			TotalForward.style.display = "block";
			TotalBack.style.display = "block";
			TotalTransferText.style.display = "block";
		} else if (TotalData.time && !TotalData.back_time) {
			Time.textContent = TotalData.date + " в " + TotalData.time;
			TimeArrival.textContent = TotalData.date + " в " + timeArrival;

			TotalForward.style.display = "block";
			TotalBack.style.display = "none";
			TotalTransferText.style.display = "none";
		} else if (!TotalData.time && TotalData.back_time) {
			BackTime.textContent = TotalData.date + " в " + TotalData.back_time;
			BackTimeArrival.textContent = TotalData.date + " в " + backTimeArrival;

			TotalForward.style.display = "none";
			TotalBack.style.display = "block";
			TotalTransferText.style.display = "none";
		} else if (!TotalData.time && !TotalData.back_time) {
			TotalForward.style.display = "none";
			TotalBack.style.display = "none";
			TotalTransferText.style.display = "none";
		}

		TotalContainer.style.display = "flex";
	});
}

///  FORM SUBMIT  ///

function onFormSubmit(data) {
	const Form = document.getElementById("tourForm"),
		FormButton = document.querySelector(".form__submit"),
		FormContent = document.querySelector(".modal__content-form"),
		FormResult = document.querySelector(".result"),
		TourLink = document.querySelector(".tour-link"),
		Modal = document.querySelector(".modal");

	TourLink.href = "./tour.html?id=" + data.id;

	Form.addEventListener("submit", function (e) {
		e.preventDefault();
		FormButton.setAttribute("disabled", true);
		const formData = new FormData(tourForm);

		const AdultPrice = document.querySelector(".adult"),
			KidPrice = document.querySelector(".kid"),
			PreferentialPrice = document.querySelector(".preferential"),
			GroupPrice = document.querySelector(".group"),
			FormError = document.querySelector(".form__error");

		let totalPrice =
			+AdultPrice.textContent * +formData.get("ticket_adult_quantity") +
			+KidPrice.textContent * +formData.get("ticket_kid_quantity") +
			+PreferentialPrice.textContent * +formData.get("ticket_preferential_quantity") +
			+GroupPrice.textContent * +formData.get("ticket_group_quantity");

		let totalTickets =
			+formData.get("ticket_adult_quantity") +
				+formData.get("ticket_kid_quantity") +
				+formData.get("ticket_preferential_quantity") +
				+formData.get("ticket_group_quantity") || 0;
		let equalDate = null;
		let time = formData.get("time") || formData.get("back_time");
		if (!formData.get("date") || !time) {
			equalDate = "";
		} else {
			equalDate = formData.get("date") + " " + time.slice(0, 8);
		}

		const formObj = {
			event_id: data.id,
			ticket_adult_quantity: equalDate,
			date: formData.get("date"),
			duration: data.duration,
			route: formData.get("route"),
			time: formData.get("time").slice(0, 8),
			back_time: formData.get("back_time").slice(0, 8),
			ticket_adult_quantity: formData.get("ticket_adult_quantity"),
			action_price: AdultPrice.textContent,
			ticket_kid_quantity: formData.get("ticket_kid_quantity"),
			ticket_kid_price: KidPrice.textContent,
			ticket_preferential_quantity: formData.get("ticket_preferential_quantity"),
			ticket_preferential_price: PreferentialPrice.textContent,
			ticket_group_quantity: formData.get("ticket_group_quantity"),
			ticket_group_price: GroupPrice.textContent,
			equal_price: totalPrice,
			equal_tickets: totalTickets,
			email: formData.get("email"),
			equal_date: equalDate,
		};

		fetch(Url + "/reserveTickets", {
			method: "POST",
			body: JSON.stringify(formObj),
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data.message) {
					throw new Error(data.message);
				}
				FormButton.removeAttribute("disabled");
				FormContent.style.display = "none";
				FormResult.style.display = "flex";
			})
			.catch((err) => {
				FormError.textContent = err.message;
				FormError.style.display = "block";
				FormButton.removeAttribute("disabled");
				setTimeout(() => {
					FormError.textContent = "";
					FormError.style.display = "none";
				}, 1500);
			});

		TourLink.addEventListener("click", function (e) {
			e.preventDefault();

			Modal.style.display = "none";
			FormContent.style.display = "flex";
			FormResult.style.display = "none";
			document.body.style.overflowY = "initial";

			location.href = Link.href;
		});
	});
}
