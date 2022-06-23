const into_text = document.querySelectorAll(".card-body-parent p.card-text");

const animation = anime.timeline({
	targets: [".card-text span"],
	// easing: "easeInOutExpo",
	direction: "alternate",
	// direction: 'normal',
	// direction: 'reverse',
	autoplay: false,
});

into_text.forEach((t) => {
	t.onclick = animation.play;
	// t.textContent = words[random_number]
	t.innerHTML = t.textContent.replace(/\S/g, "<span>$&</span>");
});

animation.add({
	rotate: () => anime.random(360, -360),
	translateX: () => anime.random(200, -200),
	translateY: () => anime.random(200, -200),
	opacity: [1, 0],
	duration: 3000,
	easing: "easeInOutSine",
	delay: anime.stagger(20),
});


// initial appearance animation
anime({
	targets: [".card-text span"],
	direction: 'reverse',
	autoplay: true,
	rotate: () => anime.random(360, -360),
	translateX: () => anime.random(200, -200),
	translateY: () => anime.random(200, -200),
	opacity: [1, 0],
	duration: 3000,
	easing: "easeInOutSine",
	delay: anime.stagger(20),
});