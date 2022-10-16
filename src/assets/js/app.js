const CardContainer = document.querySelector(".container");

getdata();
setTitleWidth();
setTimesWidth();

window.addEventListener("resize", (e) => {
	setTitleWidth();
	setTimesWidth();
});

function setTimesWidth() {
	const CardContent = document.querySelectorAll(".content");
	let VisibleItems;
	const visibleBtn = document.createElement("button");
	visibleBtn.className = "timetable__btn";
	visibleBtn.textContent = "еще...";

	CardContent.forEach((content) => {
		const TimetableList = content.querySelector(".timetable__list");
		const TimetableItems = content.querySelectorAll(".timetable__item");

		TimetableItems.forEach((item) => {
			if (item.getBoundingClientRect().y > TimetableList.getBoundingClientRect().y) {
				item.classList.add("visible");
				// item.style.display = "none";
			} else {
				item.classList.remove("visible");
				// item.style.display = "block";
			}
		});

		VisibleItems = content.querySelectorAll(".visible");
	});
}

function setTitleWidth() {
	const Cards = document.querySelectorAll(".card");
	const CardTitle = document.querySelectorAll(".content__title > h2");

	Cards.forEach((Card) => {
		if (Card.scrollWidth >= 500) {
			CardTitle.forEach((Title) => {
				Title.style.fontSize = "24px";
				Title.style.lineHeight = "34px";
			});
		} else {
			CardTitle.forEach((Title) => {
				Title.style.fontSize = "14px";
				Title.style.lineHeight = "22px";
			});
		}
	});
}

function getdata() {
	fetch("./data.json")
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			buildCards(data);
		})
		.catch((error) => {
			return error;
		});
}

function buildCards(data) {
	data.map((obj) => {
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
			ContentList = document.createElement("ul");

		TimeIcon.src = "./assets/img/clock-circular-outline.svg";
		TimeIcon.alt = "clock-icon";

		CardElem.className = "card";
		ImageBlock.className = "card__img";
		ContentDesc.className = "content__desc";
		AdvElem.className = "card__img-adv";
		ImageLink.href = "";
		ImageLink.target = "_self";
		Image.src = obj.image;
		Image.alt = obj.title;
		TitleBlock.className = "content__title-block";
		TimeElem.className = "content__time";
		TimeText.className = "content__time-text";
		Content.className = "card__content content";
		TitleLink.className = "content__title";
		(TitleLink.href = ""), (TitleLink.target = "_self");
		Title.textContent = obj.title;
		ContentList.className = "content__list";

		TitleLink.appendChild(Title);
		TimeText.textContent = obj.duration;

		AdvElem.textContent = obj.adv;
		ImageBlock.appendChild(AdvElem);
		ImageBlock.appendChild(ImageLink);
		ImageLink.appendChild(Image);

		TimeElem.appendChild(TimeIcon);
		TimeElem.appendChild(TimeText);
		TitleBlock.appendChild(TimeElem);
		TitleBlock.appendChild(TitleLink);

		obj.puncts.map((item, index) => {
			const ContentItem = document.createElement("li"),
				ContentIconBlock = document.createElement("div"),
				ArrowIcon = document.createElement("img");

			ArrowIcon.src = "./assets/img/arrow.svg";
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

				const flightDate = obj.flightDates[0];
				const date = new Date().toLocaleDateString();
				const resDate = flightDate.date;
				const TimeableDate = document.createElement("span");
				TimeableDate.className = "timetable__date";
				TimeableDate.textContent = date === resDate ? "сегодня" : resDate;
				ContentTimeableText.appendChild(TimeableDate);

				flightDate.times.map((res) => {
					const TimeableItem = document.createElement("a");
					TimeableItem.href = "";
					TimeableItem.target = "_self";
					TimeableItem.className = "timetable__item";
					TimeableItem.textContent = res;

					if (res) {
						TimeableList.appendChild(TimeableItem);
					}
				});
				ContentTimeableBlock.appendChild(TimeableList);

				ContentItem.appendChild(ContentIconBlock);
				ContentItem.appendChild(ContentTimeableBlock);
			}

			ContentList.appendChild(ContentItem);
		});

		ContentDesc.appendChild(TitleBlock);
		ContentDesc.appendChild(ContentList);

		Content.appendChild(ContentDesc);

		CardElem.appendChild(ImageBlock);
		CardElem.appendChild(Content);
		CardContainer.appendChild(CardElem);
		setTimesWidth();
	});
}
