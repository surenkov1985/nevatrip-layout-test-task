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
		TimeText = document.createElement("p");

	BackLink.textContent = "Назад к списку экскурсий";
	Title.textContent = data.title;
	TimeText.textContent = data.duration;

	BackLink.className = "container__link";
	Content.className = "tour";
	TitleBlock.className = "tour__title-block";
	Title.className = "tour__title";
	ImageBlock.className = "tour__img-block";
	Image.className = "tour__img";
	TimeBlock.className = "tour__time-block";
	TimeIconBlock.className = "tour__time-icon-block";
	TimeText.className = "tour__time-text";

	const date = new Date("2022.10.16");
	console.log(date.toLocaleDateString());

	Image.src = data.image;
	Image.alt = data.title;
	TimeIcon.src = "./clock-circular-outline.svg";
	TimeIcon.alt = " clock-icon";

	BackLink.href = "./index.html";
	BackLink.target = "_self";

	TitleBlock.appendChild(Title);
	ImageBlock.appendChild(Image);
	TimeIconBlock.appendChild(TimeIcon);
	TimeBlock.appendChild(TimeIconBlock);
	TimeBlock.appendChild(TimeText);

	Content.appendChild(TitleBlock);
	Content.appendChild(ImageBlock);
	Content.appendChild(TimeBlock);

	Container.appendChild(BackLink);
	Container.appendChild(Content);
}
