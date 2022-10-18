"use strict";

const Url = "http://localhost:5000";

const CardContainer = document.querySelector(".container");

CardContainer.innerHTML = "";
getdata();

window.addEventListener("resize", function (e) {
	setTitleWidth();
	setTimesWidth();
});

function setTimesWidth() {
	const CardContent = document.querySelectorAll(".content");
	const visibleBtn = document.createElement("button");
	visibleBtn.className = "timetable__btn";
	visibleBtn.textContent = "еще...";

	for (let item of CardContent) {
		const TimetableList = item.querySelector(".timetable__list");
		const TimetableItems = item.querySelectorAll(".timetable__item");
		const TimetableItemMore = TimetableList.querySelector(".timetable__more");

		let lastVisibleIndex = 0;

		for (let ind = 0; ind < TimetableItems.length; ind++) {
			let item = TimetableItems[ind];

			item.style.display = "block";

			if (item.getBoundingClientRect().y > TimetableList.getBoundingClientRect().y) {
				item.style.display = "none";

				if (!lastVisibleIndex && ind > 0) lastVisibleIndex = ind - 1;
			}
		}

		if (lastVisibleIndex && lastVisibleIndex > 0 && TimetableItemMore) {
			TimetableItems[lastVisibleIndex].style.display = "none";
			TimetableItemMore.style.display = "block";

			if (
				TimetableItemMore.getBoundingClientRect().y >
				TimetableList.getBoundingClientRect().y + TimetableItems[lastVisibleIndex].offsetHeight
			) {
				if (lastVisibleIndex - 1 > 0) {
					TimetableItems[lastVisibleIndex - 1].style.display = "none";
				}
			}
		}

		TimetableItemMore.addEventListener("click", function (e) {
			e.preventDefault();

			for (let ind = 0; ind < TimetableItems.length; ind++) {
				let item = TimetableItems[ind];

				item.style.display = "block";
				TimetableItemMore.style.display = "none";
			}
		});
	}
}

function setTitleWidth() {
	const Cards = document.querySelectorAll(".card");
	const CardTitle = document.querySelectorAll(".content__title > h2");

	for (let Card of Cards) {
		if (Card.scrollWidth >= 500) {
			CardTitle.forEach(function (Title) {
				Title.style.fontSize = "24px";
				Title.style.lineHeight = "34px";
			});
		} else {
			CardTitle.forEach(function (Title) {
				Title.style.fontSize = "14px";
				Title.style.lineHeight = "22px";
			});
		}
	}
}

function getdata() {
	fetch(Url + "/")
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			console.log(data);
			buildCards(data);
		})
		.catch(function (error) {
			console.log(error);
		});
}

function setLinksListener() {
	const Links = document.getElementsByTagName("a");

	for (let Link of Links) {
		Link.addEventListener("click", function (e) {
			e.preventDefault();

			console.log(Link.href);

			location.href = Link.href;
			// fetch(Link.href, { method: "GET", headers: { "Content-type": "application/json" } })
			// 	.then(function (res) {
			// 		return res.json();
			// 	})
			// 	.then(function (data) {
			// 		console.log(data);
			// 	})
			// 	.catch(function (error) {
			// 		console.log(error);
			// 	});
		});
	}
}

function buildCards(data) {
	data.map(function (obj) {
		const CardElem = document.createElement("article"),
			ImageBlock = document.createElement("div"),
			AdvElem = document.createElement("div"),
			ImageLink = document.createElement("a"),
			Image = document.createElement("img"),
			Content = document.createElement("div"),
			ContentDesc = document.createElement("div"),
			TitleBlock = document.createElement("div"),
			TimeElem = document.createElement("div"),
			TimeText = document.createElement("p"),
			TimeIcon = document.createElement("img"),
			TitleLink = document.createElement("a"),
			Title = document.createElement("h2"),
			ContentList = document.createElement("ul"),
			ContentControl = document.createElement("div"),
			ContentControlDesc = document.createElement("div"),
			ContentSum = document.createElement("div"),
			ContentSumNumb = document.createElement("p"),
			ContentSumValute = document.createElement("img"),
			ContentBtn = document.createElement("a");

		CardElem.className = "card";
		ImageBlock.className = "card__img";
		ContentDesc.className = "content__desc";
		AdvElem.className = "card__img-adv";
		TitleBlock.className = "content__title-block";
		TimeElem.className = "content__time";
		TimeText.className = "content__time-text";
		Content.className = "card__content content";
		TitleLink.className = "content__title";
		ContentList.className = "content__list";
		ContentControl.className = "content__control";
		ContentControlDesc.className = "content__control-desc";
		ContentSum.className = "content__sum";
		ContentSumNumb.className = "content__sum-numb";
		ContentBtn.className = "content__btn";

		TimeIcon.src = "./clock-circular-outline.svg";
		TimeIcon.alt = "clock-icon";
		Image.src = obj.image;
		Image.alt = obj.title;
		ContentSumValute.src = "./valute.svg";
		ContentSumValute.alt = "rub";

		TitleLink.href = "./tour.html?id=" + obj.id;
		TitleLink.target = "_self";
		ImageLink.href = "./tour.html?id=" + obj.id;
		ImageLink.target = "_self";
		ContentBtn.href = "./tour.html?id=" + obj.id;
		ContentBtn.target = "_self";

		ContentBtn.textContent = "Подробнее";
		Title.textContent = obj.title;
		TimeText.textContent = obj.duration;
		ContentSumNumb.textContent = obj.action_price;
		AdvElem.textContent = obj.adv;

		TitleLink.appendChild(Title);
		ImageLink.appendChild(Image);
		ImageBlock.appendChild(AdvElem);
		ImageBlock.appendChild(ImageLink);

		TimeElem.appendChild(TimeIcon);
		TimeElem.appendChild(TimeText);
		TitleBlock.appendChild(TimeElem);
		TitleBlock.appendChild(TitleLink);

		obj.puncts.map((item, index) => {
			const ContentItem = document.createElement("li"),
				ContentIconBlock = document.createElement("div"),
				ArrowIcon = document.createElement("img");

			ArrowIcon.src = "./arrow.svg";
			ArrowIcon.alt = "arrow-icon";
			ContentItem.className = "content__item";
			ContentIconBlock.className = "content__arr-icon";

			ContentIconBlock.appendChild(ArrowIcon);

			if (index < obj.puncts.length - 1) {
				const ContentItemText = document.createElement("p");
				ContentItemText.className = "content__item-text";
				ContentItemText.textContent = item;

				ContentItem.appendChild(ContentIconBlock);
				ContentItem.appendChild(ContentItemText);
			} else if (index === obj.puncts.length - 1) {
				const ContentTimeableBlock = document.createElement("div"),
					ContentTimeableText = document.createElement("p"),
					TimeableList = document.createElement("div"),
					TimeTableText = document.createElement("span");

				ContentTimeableBlock.className = "content__item-timetable";
				TimeableList.className = "timetable__list";

				ContentTimeableText.className = "content__item-text-timetable timetable";

				TimeTableText.textContent = item;

				ContentTimeableText.appendChild(TimeTableText);

				ContentTimeableBlock.appendChild(ContentTimeableText);

				const flightDate = obj.flight_dates[0];
				const date = new Date();
				const today = new Date(date.toISOString().slice(0, 10));
				const resDate = new Date(flightDate.date);
				const TimeableDate = document.createElement("span");
				TimeableDate.className = "timetable__date";

				if (today === resDate) {
					TimeableDate.textContent = "сегодня";
				} else if (today < resDate) {
					TimeableDate.textContent = resDate.toLocaleDateString();
				} else {
					let newDate;
					for (let item of obj.flight_dates) {
						let date = new Date(item.date);

						if (date.toLocaleDateString() == today.toLocaleDateString()) {
							newDate = item;
						}
					}

					let resDate = new Date(newDate.date);
					TimeableDate.textContent = resDate.toLocaleDateString();
				}
				ContentTimeableText.appendChild(TimeableDate);

				flightDate.times.map(function (res) {
					const TimeableItem = document.createElement("a");
					TimeableItem.href = "./tour.html?id=" + obj.id;
					TimeableItem.target = "_self";
					TimeableItem.className = "timetable__item";
					TimeableItem.textContent = res;

					if (res) {
						TimeableList.appendChild(TimeableItem);
					}
				});
				const TimeableItemMore = document.createElement("a");
				TimeableItemMore.href = "";
				TimeableItemMore.target = "_self";
				TimeableItemMore.className = "timetable__item timetable__more";
				TimeableItemMore.textContent = "...ещё";
				TimeableItemMore.style.display = "none";
				TimeableList.appendChild(TimeableItemMore);

				ContentTimeableBlock.appendChild(TimeableList);

				ContentItem.appendChild(ContentIconBlock);
				ContentItem.appendChild(ContentTimeableBlock);
			}

			ContentList.appendChild(ContentItem);
		});

		ContentSum.appendChild(ContentSumNumb);
		ContentSum.appendChild(ContentSumValute);
		ContentControlDesc.appendChild(ContentSum);
		if (obj.norm_price) {
			const ContentSumHint = document.createElement("div");
			ContentSumHint.className = "content__sum-hint";
			ContentSumHint.textContent = obj.norm_price + " ₽ " + obj.place_norm_price;
			ContentControlDesc.appendChild(ContentSumHint);
		}
		ContentControl.appendChild(ContentControlDesc);
		ContentControl.appendChild(ContentBtn);

		ContentDesc.appendChild(TitleBlock);
		ContentDesc.appendChild(ContentList);

		Content.appendChild(ContentDesc);
		Content.appendChild(ContentControl);

		CardElem.appendChild(ImageBlock);
		CardElem.appendChild(Content);
		CardContainer.appendChild(CardElem);
		setTimesWidth();
	});
	setLinksListener();
}
